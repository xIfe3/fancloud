import Link from "next/link";
import { Logo } from "@/components/logo";
import { isLoggedIn } from "@/lib/auth";
import { logoutAction } from "./actions";

export default async function BackstageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loggedIn = await isLoggedIn();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Logo size="md" href={loggedIn ? "/backstage" : "/backstage/login"} />
            <span className="hidden border border-border bg-card px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted sm:inline">
              Backstage
            </span>
          </div>
          {loggedIn && (
            <nav className="flex items-center gap-1">
              <Link
                href="/backstage"
                className="px-3 py-2 font-mono text-xs uppercase tracking-widest text-foreground transition hover:text-brand"
              >
                Events
              </Link>
              <Link
                href="/backstage/content"
                className="px-3 py-2 font-mono text-xs uppercase tracking-widest text-foreground transition hover:text-brand"
              >
                Content
              </Link>
              <Link
                href="/backstage/messages"
                className="px-3 py-2 font-mono text-xs uppercase tracking-widest text-foreground transition hover:text-brand"
              >
                Messages
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="ml-2 px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted transition hover:text-brand"
                >
                  Sign out
                </button>
              </form>
            </nav>
          )}
        </div>
      </header>
      {children}
    </div>
  );
}
