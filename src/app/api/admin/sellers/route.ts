import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Seller from "@/models/Seller";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const sellers = await Seller.find().sort({ createdAt: -1 }).select("-password");
    return NextResponse.json({ sellers });
  } catch (error: any) {
    console.error("Fetch sellers error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
