"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { logout } from "@/lib/auth";
import { createEvent, deleteEvent, updateEvent } from "@/lib/events";
import {
  DEFAULT_EVENT_COLOR,
  EVENT_TYPES,
  type EventInput,
  type EventStatus,
  type EventType,
  type TicketOption,
} from "@/lib/types";

const STATUSES: EventStatus[] = ["upcoming", "past", "cancelled"];

export interface EventFormState {
  error?: string;
}

function revalidateAll(slug?: string) {
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/backstage");
  if (slug) revalidatePath(`/events/${slug}`);
}

function parseTicketOptions(formData: FormData): TicketOption[] {
  const labels = formData.getAll("ticketOptionLabel").map((v) => String(v).trim());
  const urls = formData.getAll("ticketOptionUrl").map((v) => String(v).trim());
  const len = Math.max(labels.length, urls.length);
  const out: TicketOption[] = [];
  for (let i = 0; i < len; i++) {
    const label = labels[i] ?? "";
    const url = urls[i] ?? "";
    if (label && url) out.push({ label, url });
  }
  return out;
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
  const eventTypeRaw = String(formData.get("eventType") ?? "convention").trim();

  // Images are URL strings only — no filesystem writes. The runtime filesystem
  // is read-only on Vercel, so any disk-write attempt would crash with ENOENT.
  // For hosted upload, add a separate route handler that pushes to Vercel Blob
  // (or similar) and writes the returned URL into these fields.
  const heroImage = String(formData.get("heroImage") ?? "").trim() || null;
  const celebrityImage =
    String(formData.get("celebrityImage") ?? "").trim() || null;

  const attendanceRaw = String(formData.get("attendance") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const featured = formData.get("featured") === "on";

  const celebrityName =
    String(formData.get("celebrityName") ?? "").trim() || null;
  const celebrityBio =
    String(formData.get("celebrityBio") ?? "").trim() || null;

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
  const eventType: EventType = EVENT_TYPES.includes(eventTypeRaw as EventType)
    ? (eventTypeRaw as EventType)
    : "convention";

  const attendance =
    attendanceRaw && !Number.isNaN(Number(attendanceRaw))
      ? Math.max(0, Math.round(Number(attendanceRaw)))
      : null;

  const ticketOptions = parseTicketOptions(formData);

  const input: EventInput = {
    title,
    city,
    venue,
    country,
    startDate,
    endDate,
    category,
    eventType,
    color,
    heroImage,
    attendance,
    description,
    ticketUrl: null, // legacy field — ticketOptions replaces it
    ticketOptions,
    celebrityName,
    celebrityBio,
    celebrityImage,
    featured,
    status,
  };

  let saved: Awaited<ReturnType<typeof updateEvent>>;
  try {
    saved = id ? await updateEvent(id, input) : await createEvent(input);
  } catch (err) {
    console.error("Save event failed:", err);
    return {
      error:
        err instanceof Error
          ? `Save failed: ${err.message}`
          : "Save failed. Check the server log for details.",
    };
  }
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
