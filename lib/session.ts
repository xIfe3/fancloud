import { createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "fc_session";
const SESSION_DURATION_SEC = 60 * 60 * 24 * 7; // 7 days

function b64url(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromB64url(str: string): Buffer {
  return Buffer.from(str.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

function getSecret(): string {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET is not set");
  return s;
}

function sign(payload: string): string {
  return b64url(createHmac("sha256", getSecret()).update(payload).digest());
}

export function createSessionToken(): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_DURATION_SEC;
  const payload = b64url(Buffer.from(JSON.stringify({ exp })));
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [payload, sig] = parts;
    const expected = sign(payload);
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    if (!timingSafeEqual(a, b)) return false;
    const decoded = JSON.parse(fromB64url(payload).toString("utf8")) as {
      exp: number;
    };
    if (typeof decoded.exp !== "number") return false;
    return decoded.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export { SESSION_DURATION_SEC };
