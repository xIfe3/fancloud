"use server";

import { redirect } from "next/navigation";
import { login } from "@/lib/auth";

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!password) return { error: "Enter your password." };

  let ok = false;
  try {
    ok = await login(password);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Login failed." };
  }
  if (!ok) return { error: "Wrong password." };

  const fromRaw = String(formData.get("from") ?? "/backstage");
  // Only allow internal /backstage redirects.
  const target = fromRaw.startsWith("/backstage") ? fromRaw : "/backstage";
  redirect(target);
}
