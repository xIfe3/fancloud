import "server-only";
import { sql } from "drizzle-orm";
import { db } from "./db";
import { siteContent } from "./schema";

/**
 * Every editable string on the site lives here. The `defaultValue` is rendered
 * if nothing has been saved in the DB yet — so the site always has copy even
 * before anyone touches the content editor.
 */
export const CONTENT_KEYS = {
  "home.kicker": {
    label: "Kicker (small line above the headline)",
    defaultValue: "Season 2026 · Now booking",
    multiline: false,
  },
  "home.headline.line1": {
    label: "Hero headline · line 1",
    defaultValue: "Meet",
    multiline: false,
  },
  "home.headline.line2": {
    label: "Hero headline · line 2",
    defaultValue: "your",
    multiline: false,
  },
  "home.headline.line3": {
    label: "Hero headline · line 3 (yellow accent)",
    defaultValue: "heroes.",
    multiline: false,
  },
  "home.subcopy": {
    label: "Hero subcopy",
    defaultValue:
      "FANCLOUD brings the actors, voice talent, and creators behind your favorite films, shows, comics, and games face-to-face with the fans who love them. Photo ops, autographs, live Q&A panels — twelve cities a year.",
    multiline: true,
  },
  "home.cta.title": {
    label: "Bottom CTA · title (use | for line break)",
    defaultValue: "Don't miss|who's coming.",
    multiline: false,
  },
  "home.cta.subcopy": {
    label: "Bottom CTA · subcopy",
    defaultValue:
      "Guest announcements drop all year. Lock in early-bird tickets and photo-op slots before your favorite stars sell out.",
    multiline: true,
  },
  "about.kicker": {
    label: "About · kicker",
    defaultValue: "About FANCLOUD",
    multiline: false,
  },
  "about.headline.line1": {
    label: "About headline · line 1",
    defaultValue: "Where fans",
    multiline: false,
  },
  "about.headline.line2": {
    label: "About headline · line 2 (yellow accent)",
    defaultValue: "meet stars.",
    multiline: false,
  },
  "about.subcopy": {
    label: "About subcopy",
    defaultValue:
      "FANCLOUD started with a simple idea: the best conventions aren't about merch tables — they're about the moment you finally meet the people behind the work you love. Today we bring hundreds of celebrity guests face-to-face with fans across a dozen cities a year.",
    multiline: true,
  },
  "footer.tagline.big": {
    label: "Footer · big tagline (in the mega-wordmark band)",
    defaultValue:
      "The fan event network. Photo ops, autograph alleys, and live panels with the actors, voice talent, and creators behind your favorite films, shows, comics, and games.",
    multiline: true,
  },
  "footer.tagline.small": {
    label: "Footer · small tagline (under the logo in the link columns)",
    defaultValue: "Where fans meet their heroes.",
    multiline: false,
  },
} as const;

export type ContentKey = keyof typeof CONTENT_KEYS;

export async function getAllContent(): Promise<Map<string, string>> {
  const rows = await db.select().from(siteContent);
  return new Map(rows.map((r) => [r.key, r.value]));
}

export function pick(
  map: Map<string, string>,
  key: ContentKey,
): string {
  return map.get(key) ?? CONTENT_KEYS[key].defaultValue;
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
