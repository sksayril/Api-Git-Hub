import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import Seller from "@/models/Seller";
import { signSellerToken, SELLER_COOKIE } from "@/lib/auth";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function uploadToS3(file: File, folder: string): Promise<string> {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION;
  const bucket = process.env.AWS_S3_BUCKET;

  if (!accessKeyId || !secretAccessKey || !region || !bucket) {
    throw new Error("AWS S3 configuration is missing.");
  }

  const client = new S3Client({ region, credentials: { accessKeyId, secretAccessKey } });
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const key = `${folder}/${Date.now()}-${slugify(file.name)}-${Math.random().toString(36).slice(2, 8)}`;

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: file.type || "application/octet-stream",
    })
  );

  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const formData = await request.formData();

    const name              = formData.get("name") as string;
    const email             = formData.get("email") as string;
    const password          = formData.get("password") as string;
    const idProofNumber     = formData.get("idProofNumber") as string;
    const address           = formData.get("address") as string;
    const bankAccountNumber = formData.get("bankAccountNumber") as string;
    const bankAccountName   = formData.get("bankAccountName") as string;
    const bankIFSC          = formData.get("bankIFSC") as string;
    const idProofFile       = formData.get("idProofImage") as File | null;
    const passbookFile      = formData.get("bankPassbookImage") as File | null;

    if (!name || !email || !password || !idProofNumber || !address ||
        !bankAccountNumber || !bankAccountName || !bankIFSC || !idProofFile || !passbookFile) {
      return NextResponse.json({ error: "All fields and documents are required." }, { status: 400 });
    }

    const existing = await Seller.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "A seller account with this email already exists." }, { status: 409 });
    }

    // Upload documents to S3
    const [idProofImage, bankPassbookImage] = await Promise.all([
      uploadToS3(idProofFile, "seller-docs/id-proof"),
      uploadToS3(passbookFile, "seller-docs/passbook"),
    ]);

    const seller = await Seller.create({
      name,
      email,
      password: hashPassword(password),
      idProofNumber,
      idProofImage,
      address,
      bankAccountNumber,
      bankAccountName,
      bankIFSC,
      bankPassbookImage,
      status: "pending",
      verified: false,
    });

    const token = await signSellerToken({
      sellerId: seller._id.toString(),
      email: seller.email,
      name: seller.name,
      status: "pending",
      verified: false,
    });

    const response = NextResponse.json({
      seller: { sellerId: seller._id.toString(), name: seller.name, email: seller.email, status: "pending", verified: false },
    });

    response.cookies.set(SELLER_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Seller signup error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
