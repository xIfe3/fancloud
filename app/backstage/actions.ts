"use server";

import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { logout } from "@/lib/auth";
import { createEvent, deleteEvent, updateEvent } from "@/lib/events";
import {
  DEFAULT_EVENT_COLOR,
  type EventInput,
  type EventStatus,
} from "@/lib/types";

const STATUSES: EventStatus[] = ["upcoming", "past", "cancelled"];

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_IMAGE_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/avif",
]);

export interface EventFormState {
  error?: string;
}

function revalidateAll(slug?: string) {
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/backstage");
  if (slug) revalidatePath(`/events/${slug}`);
}

async function saveUpload(file: File): Promise<string> {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Image is too large. Max 5 MB.");
  }
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Unsupported image type. Use PNG, JPEG, WEBP, GIF, or AVIF.");
  }
  const ext = file.type.split("/")[1] ?? "bin";
  const filename = `${randomUUID()}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);
  return `/uploads/${filename}`;
}

export async function saveEventAction(
  _prevState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const idRaw = String(formData.get("id") ?? "").trim();
  const id = idRaw ? Number(idRaw) : null;

  const title = String(formData.get("title") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const venue = String(formData.get("venue") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim() || "USA";
  const startDate = String(formData.get("startDate") ?? "").trim();
  const endDate = String(formData.get("endDate") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const colorRaw = String(formData.get("color") ?? "").trim();
  const color = /^#[0-9a-f]{6}$/i.test(colorRaw) ? colorRaw : DEFAULT_EVENT_COLOR;
  const statusRaw = String(formData.get("status") ?? "upcoming").trim();

  const heroImageUrl = String(formData.get("heroImage") ?? "").trim();
  const heroImageFile = formData.get("heroImageFile") as File | null;
  const removeHeroImage = formData.get("removeHeroImage") === "on";

  const ticketUrl = String(formData.get("ticketUrl") ?? "").trim() || null;
  const attendanceRaw = String(formData.get("attendance") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const featured = formData.get("featured") === "on";

  if (!title || !city || !venue || !startDate || !endDate || !category) {
    return {
      error: "Title, city, venue, category, and both dates are required.",
    };
  }
  if (endDate < startDate) {
    return { error: "End date can't be before the start date." };
  }
  const status: EventStatus = STATUSES.includes(statusRaw as EventStatus)
    ? (statusRaw as EventStatus)
    : "upcoming";

  const attendance =
    attendanceRaw && !Number.isNaN(Number(attendanceRaw))
      ? Math.max(0, Math.round(Number(attendanceRaw)))
      : null;

  let heroImage: string | null;
  if (removeHeroImage) {
    heroImage = null;
  } else if (heroImageFile && heroImageFile.size > 0) {
    try {
      heroImage = await saveUpload(heroImageFile);
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Image upload failed." };
    }
  } else {
    heroImage = heroImageUrl || null;
  }

  const input: EventInput = {
    title,
    city,
    venue,
    country,
    startDate,
    endDate,
    category,
    color,
    heroImage,
    attendance,
    description,
    ticketUrl,
    featured,
    status,
  };

  const saved = id ? await updateEvent(id, input) : await createEvent(input);
  if (!saved) {
    return { error: "That event no longer exists." };
  }

  revalidateAll(saved.slug);
  redirect("/backstage");
}

export async function deleteEventAction(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  if (id) {
    await deleteEvent(id);
    revalidateAll();
  }
  redirect("/backstage");
}

export async function logoutAction(): Promise<void> {
  await logout();
  redirect("/backstage/login");
}
