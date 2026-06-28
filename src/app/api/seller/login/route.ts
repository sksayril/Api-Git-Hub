import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import Seller from "@/models/Seller";
import { signSellerToken, SELLER_COOKIE } from "@/lib/auth";

function hashPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const seller = await Seller.findOne({ email: email.toLowerCase().trim() });
    if (!seller || seller.password !== hashPassword(password)) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    if (seller.status === "pending") {
      return NextResponse.json(
        { error: "Your seller account is under review. You will be notified once approved.", status: "pending" },
        { status: 403 }
      );
    }

    if (seller.status === "rejected") {
      return NextResponse.json(
        { error: "Your seller application was rejected. Please contact support.", status: "rejected" },
        { status: 403 }
      );
    }

    const token = await signSellerToken({
      sellerId: seller._id.toString(),
      email: seller.email,
      name: seller.name,
      status: seller.status,
      verified: seller.verified,
    });

    const response = NextResponse.json({
      seller: {
        sellerId: seller._id.toString(),
        name: seller.name,
        email: seller.email,
        status: seller.status,
        verified: seller.verified,
      },
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
    console.error("Seller login error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
