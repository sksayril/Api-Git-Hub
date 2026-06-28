import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Order from "@/models/Order";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const users = await User.find().sort({ createdAt: -1 });

    const clients = await Promise.all(
      users.map(async (u) => {
        const userOrders = await Order.find({ user: u._id });
        const projectsCount = userOrders.reduce((sum, order) => sum + order.items.length, 0);
        const totalRevenue = userOrders.reduce((sum, order) => sum + order.total, 0);
        
        // Find last phone number from billing details if available
        const lastOrder = userOrders[0]; // because sorted by default? No, let's just find one
        const phone = lastOrder?.billingDetails?.phone || "N/A";
        const company = lastOrder?.billingDetails?.fullName ? "Personal" : "Individual";
        const location = "N/A";

        return {
          id: u._id.toString(),
          name: u.name,
          company,
          email: u.email,
          phone,
          location,
          status: userOrders.length > 0 ? "Active" : "Lead",
          plan: "Starter",
          projects: projectsCount,
          revenue: `$${totalRevenue.toFixed(2)}`,
          joined: new Date(u.createdAt).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          }),
          lastContact: lastOrder
            ? new Date(lastOrder.createdAt).toLocaleDateString()
            : "Never",
          rating: userOrders.length > 0 ? 5 : 0,
        };
      })
    );

    return NextResponse.json({ clients });
  } catch (error: any) {
    console.error("Fetch clients error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
