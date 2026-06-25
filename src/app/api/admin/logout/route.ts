import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/auth";

const cookieClearOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 0,
  expires: new Date(0),
};

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully." });
  response.cookies.set(ADMIN_COOKIE, "", cookieClearOptions);
  return response;
}
