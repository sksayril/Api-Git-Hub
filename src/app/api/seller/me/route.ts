import { NextResponse } from "next/server";
import { getSellerSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSellerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    return NextResponse.json({ seller: session });
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
