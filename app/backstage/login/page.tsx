import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { StarburstMark } from "@/components/logo";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  if (await isLoggedIn()) {
    redirect(from && from.startsWith("/backstage") ? from : "/backstage");
  }

  return (
    <div className="mx-auto flex min-h-[78vh] max-w-md flex-col justify-center px-4 py-12">
      <StarburstMark className="size-9 text-brand" />
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-muted">
        Backstage · Sign in
      </p>
      <h1 className="mt-3 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
        Stage door.
      </h1>
      <p className="mt-3 text-muted">
        Enter the backstage password to manage events and page content.
      </p>

      <div className="mt-10">
        <LoginForm from={from ?? "/backstage"} />
      </div>
    </div>
  );
}
