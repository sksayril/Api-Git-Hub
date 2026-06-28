import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "admin_token";

export interface AdminTokenPayload {
  adminId: string;
  email: string;
  name: string;
  role: string;
}

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Please define JWT_SECRET in .env.local");
  }
  return new TextEncoder().encode(secret);
}

export async function signAdminToken(payload: AdminTokenPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyAdminToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret());
  return payload as unknown as AdminTokenPayload;
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return null;

  try {
    return await verifyAdminToken(token);
  } catch {
    return null;
  }
}

export const USER_COOKIE = "user_token";

export interface UserTokenPayload {
  userId: string;
  email: string;
  name: string;
}

export async function signUserToken(payload: UserTokenPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getSecret());
}

export async function verifyUserToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret());
  return payload as unknown as UserTokenPayload;
}

export async function getUserSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(USER_COOKIE)?.value;
  if (!token) return null;

  try {
    return await verifyUserToken(token);
  } catch {
    return null;
  }
}

// ─── Seller Auth ──────────────────────────────────────────────────────────────

export const SELLER_COOKIE = "seller_token";

export interface SellerTokenPayload {
  sellerId: string;
  email: string;
  name: string;
  status: string;
  verified: boolean;
}

export async function signSellerToken(payload: SellerTokenPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getSecret());
}

export async function verifySellerToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret());
  return payload as unknown as SellerTokenPayload;
}

export async function getSellerSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SELLER_COOKIE)?.value;
  if (!token) return null;

  try {
    return await verifySellerToken(token);
  } catch {
    return null;
  }
}

