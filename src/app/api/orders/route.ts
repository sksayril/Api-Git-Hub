import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { getUserSession, getAdminSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Please log in first." }, { status: 401 });
    }

    const {
      billingDetails,
      items,
      subtotal,
      tax,
      discount,
      total,
      paymentMethod,
      paymentDetails,
    } = await req.json();

    if (!billingDetails || !items || items.length === 0 || !total || !paymentMethod) {
      return NextResponse.json({ error: "Missing order information." }, { status: 400 });
    }

    const newOrder = await Order.create({
      user: session.userId,
      billingDetails,
      items,
      subtotal,
      tax,
      discount: discount || 0,
      total,
      paymentMethod,
      paymentDetails: paymentDetails || {},
      status: "completed",
    });

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    // Retrieve all orders and populate user information
    const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error("Get orders error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
