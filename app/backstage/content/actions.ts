"use server";

import { revalidatePath } from "next/cache";
import { CONTENT_KEYS, type ContentKey, setContentBulk } from "@/lib/content";

export interface ContentFormState {
  ok?: boolean;
  error?: string;
}

const KEYS = Object.keys(CONTENT_KEYS) as ContentKey[];

export async function saveContentAction(
  _prev: ContentFormState,
  formData: FormData,
): Promise<ContentFormState> {
  const entries: { key: string; value: string }[] = [];
  for (const key of KEYS) {
    const raw = formData.get(key);
    if (raw === null) continue;
    const value = String(raw).trim();
    if (!value) {
      return { error: `"${CONTENT_KEYS[key].label}" can't be empty.` };
    }
    entries.push({ key, value });
  }

  try {
    await setContentBulk(entries);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Save failed." };
  }

  // Revalidate the entire layout — content is read across many pages
  // (home, about, contact, fan-card, event details, footer in root layout),
  // so refreshing the whole tree is the safest, simplest move.
  revalidatePath("/", "layout");
  revalidatePath("/backstage/content");
  return { ok: true };
}
