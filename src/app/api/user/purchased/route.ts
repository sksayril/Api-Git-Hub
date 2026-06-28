import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { getUserSession } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await Order.find({ user: session.userId }).sort({ createdAt: -1 });

    // Collect all purchased items across all orders
    const items = [];
    for (const order of orders) {
      for (const item of order.items) {
        items.push({
          id: item.projectId,
          name: item.title,
          price: `$${item.price.toFixed(2)}`,
          image: item.image,
          date: new Date(order.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          license: "Commercial License",
          version: "v1.0.0",
          color: "from-violet-600 to-indigo-500",
        });
      }
    }

    return NextResponse.json({
      purchased: items,
      orders: orders.map((o) => ({
        id: o._id.toString(),
        total: `$${o.total.toFixed(2)}`,
        date: new Date(o.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        status: o.status,
        itemCount: o.items.length,
      })),
    });
  } catch (error: any) {
    console.error("Get purchased items error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
