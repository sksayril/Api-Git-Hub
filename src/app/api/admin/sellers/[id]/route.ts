import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Seller from "@/models/Seller";
import { getAdminSession } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const { action } = await request.json(); // "approve" | "reject"

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid action. Use 'approve' or 'reject'." }, { status: 400 });
    }

    const update =
      action === "approve"
        ? { status: "approved", verified: true }
        : { status: "rejected", verified: false };

    const seller = await Seller.findByIdAndUpdate(id, update, { new: true }).select("-password");
    if (!seller) {
      return NextResponse.json({ error: "Seller not found." }, { status: 404 });
    }

    return NextResponse.json({ seller });
  } catch (error: any) {
    console.error("Seller action error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
