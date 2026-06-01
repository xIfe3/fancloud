import "server-only";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  SESSION_DURATION_SEC,
  createSessionToken,
  verifySessionToken,
} from "./session";

export async function isLoggedIn(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

function decodeStoredHash(stored: string): string {
  // The hash is stored base64-encoded in .env because Next.js's env loader
  // does variable expansion on `$VAR` patterns and mangles raw bcrypt hashes
  // (which start with `$2b$12$...`). Quoting/escaping doesn't help — we have
  // to keep the `$` out of the env value entirely.
  if (stored.startsWith("$2")) return stored; // legacy raw form, if ever used
  return Buffer.from(stored, "base64").toString("utf8");
}

export async function login(password: string): Promise<boolean> {
  const stored = process.env.ADMIN_PASSWORD_HASH;
  if (!stored) {
    throw new Error(
      "ADMIN_PASSWORD_HASH is not set. Run `npm run admin:hash <password>` and put the result in .env.local.",
    );
  }
  const hash = decodeStoredHash(stored);
  const ok = await bcrypt.compare(password, hash);
  if (!ok) return false;

  const token = createSessionToken();
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SEC,
  });
  return true;
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
