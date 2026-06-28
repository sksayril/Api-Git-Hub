import { NextResponse } from "next/server";
import { SELLER_COOKIE } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully." });
  response.cookies.set(SELLER_COOKIE, "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return response;
}
