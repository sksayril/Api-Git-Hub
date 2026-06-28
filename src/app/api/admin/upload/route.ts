import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll("files");

    if (!files.length) {
      return NextResponse.json({ error: "No files provided." }, { status: 400 });
    }

    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const region = process.env.AWS_REGION;
    const bucket = process.env.AWS_S3_BUCKET;

    if (!accessKeyId || !secretAccessKey || !region || !bucket) {
      return NextResponse.json({ error: "AWS S3 configuration is missing." }, { status: 500 });
    }

    const client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const uploadedUrls: string[] = [];

    for (const entry of files) {
      if (typeof entry === "string" || !(entry instanceof File)) {
        continue;
      }

      const arrayBuffer = await entry.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const key = `uploads/${Date.now()}-${slugify(entry.name)}-${Math.random().toString(36).slice(2, 10)}`;

      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: buffer,
          ContentType: entry.type || "application/octet-stream",
        })
      );

      uploadedUrls.push(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);
    }

    return NextResponse.json({ urls: uploadedUrls });
  } catch (error) {
    console.error("S3 upload error:", error);
    return NextResponse.json({ error: "Failed to upload files to S3." }, { status: 500 });
  }
}
