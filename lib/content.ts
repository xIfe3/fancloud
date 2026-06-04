import "server-only";
import { sql } from "drizzle-orm";
import { db } from "./db";
import { siteContent } from "./schema";

// Re-export the client-safe catalog so existing server-side imports keep
// working (`import { CONTENT_KEYS, pick } from "@/lib/content"`).
// Client components must import from "@/lib/content-keys" directly to avoid
// pulling in this server-only module.
export { CONTENT_KEYS, pick, type ContentKey } from "./content-keys";

export async function getAllContent(): Promise<Map<string, string>> {
  const rows = await db.select().from(siteContent);
  return new Map(rows.map((r) => [r.key, r.value]));
}

export async function setContentBulk(
  entries: { key: string; value: string }[],
): Promise<void> {
  if (entries.length === 0) return;
  await db
    .insert(siteContent)
    .values(entries)
    .onConflictDoUpdate({
      target: siteContent.key,
      set: {
        value: sql`excluded.value`,
        updatedAt: sql`now()`,
      },
    });
}
