"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { saveEventAction, type EventFormState } from "@/app/backstage/actions";
import {
  DEFAULT_EVENT_COLOR,
  EVENT_CATEGORIES,
  EVENT_COLOR_PRESETS,
  EVENT_TYPES,
  EVENT_TYPE_LABELS,
  type FanEvent,
} from "@/lib/types";
import { readableText } from "@/lib/format";

const STATUSES = ["upcoming", "past", "cancelled"] as const;

const field =
  "w-full border border-border bg-card px-3.5 py-2.5 text-sm font-medium outline-none transition placeholder:text-muted focus:border-brand";
const labelClass =
  "mb-2 block font-mono text-xs uppercase tracking-widest text-muted";
const sectionHeading =
  "border-b border-border pb-3 text-xl font-bold tracking-tight";
const sectionKicker = "font-mono text-xs uppercase tracking-[0.3em] text-muted";

export function EventForm({ event }: { event?: FanEvent }) {
  const [state, formAction, pending] = useActionState<EventFormState, FormData>(
    saveEventAction,
    {},
  );
  const [color, setColor] = useState(event?.color ?? DEFAULT_EVENT_COLOR);

  return (
    <form action={formAction} className="space-y-10">
      {event && <input type="hidden" name="id" value={event.id} />}

      {/* --- BASIC INFO --- */}
      <section className="space-y-5">
        <header>
          <p className={sectionKicker}>01 · Basics</p>
          <h2 className={`mt-2 ${sectionHeading}`}>Event details</h2>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="title" className={labelClass}>
              Event title
            </label>
            <input
              id="title"
              name="title"
              required
              defaultValue={event?.title}
              className={field}
              placeholder="Stranger Things — Cast Meet & Greet"
            />
          </div>

          <div>
            <label htmlFor="eventType" className={labelClass}>
              Event type
            </label>
            <select
              id="eventType"
              name="eventType"
              defaultValue={event?.eventType ?? "convention"}
              className={field}
            >
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {EVENT_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="category" className={labelClass}>
              Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue={event?.category ?? EVENT_CATEGORIES[0]}
              className={field}
            >
              {EVENT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="city" className={labelClass}>
              City
            </label>
            <input
              id="city"
              name="city"
              required
              defaultValue={event?.city}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="country" className={labelClass}>
              Country
            </label>
            <input
              id="country"
              name="country"
              defaultValue={event?.country ?? "USA"}
              className={field}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="venue" className={labelClass}>
              Venue
            </label>
            <input
              id="venue"
              name="venue"
              required
              defaultValue={event?.venue}
              className={field}
              placeholder="Navy Pier Grand Ballroom"
            />
          </div>

          <div>
            <label htmlFor="startDate" className={labelClass}>
              Start date
            </label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              required
              defaultValue={event?.startDate}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="endDate" className={labelClass}>
              End date
            </label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              required
              defaultValue={event?.endDate}
              className={field}
            />
          </div>

          <div>
            <label htmlFor="status" className={labelClass}>
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={event?.status ?? "upcoming"}
              className={field}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s[0].toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="attendance" className={labelClass}>
              Attendance <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <input
              id="attendance"
              name="attendance"
              type="number"
              min="0"
              defaultValue={event?.attendance ?? ""}
              className={field}
              placeholder="50000"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={event?.featured}
                className="size-4 rounded border-border text-brand focus:ring-brand"
              />
              Feature on homepage
            </label>
          </div>
        </div>

        {/* Color picker */}
        <div>
          <label className={labelClass}>Block color</label>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="color"
              name="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              aria-label="Event block color"
              className="h-10 w-14 cursor-pointer rounded-lg border border-border bg-card p-1"
            />
            <div className="flex flex-wrap gap-2">
              {EVENT_COLOR_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setColor(preset)}
                  aria-label={`Use ${preset}`}
                  className={`size-7 rounded-full border-2 transition ${
                    color.toLowerCase() === preset.toLowerCase()
                      ? "border-foreground"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: preset }}
                />
              ))}
            </div>
            <span
              className="inline-flex items-center rounded-md px-3 py-1 text-xs font-bold uppercase tracking-wide"
              style={{ backgroundColor: color, color: readableText(color) }}
            >
              {color}
            </span>
          </div>
        </div>

        {/* Hero image */}
        <div>
          <label className={labelClass}>
            Hero image <span className="normal-case tracking-normal">(optional)</span>
          </label>

          {event?.heroImage && (
            <div className="mb-3 flex items-start gap-4 border border-border bg-card p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.heroImage}
                alt=""
                className="h-20 w-32 object-cover"
              />
              <div className="flex-1 text-xs text-muted">
                <p className="font-mono uppercase tracking-widest">Current image</p>
                <p className="mt-1 break-all">{event.heroImage}</p>
                <label className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-red-300">
                  <input
                    type="checkbox"
                    name="removeHeroImage"
                    className="size-3.5"
                  />
                  Remove this image
                </label>
              </div>
            </div>
          )}

          <input
            id="heroImageFile"
            name="heroImageFile"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
            className="block w-full text-sm text-muted file:mr-4 file:border-0 file:bg-brand file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-wide file:text-black hover:file:bg-brand-dark"
          />
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted">
            PNG, JPEG, WEBP, GIF, or AVIF · Max 5 MB · Leave blank to keep the block color
          </p>

          <details className="mt-3">
            <summary className="cursor-pointer font-mono text-xs uppercase tracking-widest text-muted">
              Or use an image URL
            </summary>
            <input
              id="heroImage"
              name="heroImage"
              type="url"
              defaultValue={event?.heroImage ?? ""}
              className={`${field} mt-2`}
              placeholder="https://…"
            />
          </details>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className={labelClass}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            defaultValue={event?.description}
            className={`${field} resize-y`}
          />
        </div>
      </section>

      {/* --- CELEBRITY --- */}
      <section className="space-y-5">
        <header>
          <p className={sectionKicker}>02 · Celebrity</p>
          <h2 className={`mt-2 ${sectionHeading}`}>
            Celebrity guest <span className="text-muted">(optional)</span>
          </h2>
          <p className="mt-2 text-sm text-muted">
            Best for meet-and-greet, tour, panel, or signing events. Leave blank
            for general conventions.
          </p>
        </header>

        <div>
          <label htmlFor="celebrityName" className={labelClass}>
            Name
          </label>
          <input
            id="celebrityName"
            name="celebrityName"
            defaultValue={event?.celebrityName ?? ""}
            className={field}
            placeholder="Pedro Pascal"
          />
        </div>

        <div>
          <label htmlFor="celebrityBio" className={labelClass}>
            Short bio
          </label>
          <textarea
            id="celebrityBio"
            name="celebrityBio"
            rows={3}
            defaultValue={event?.celebrityBio ?? ""}
            className={`${field} resize-y`}
            placeholder="Two or three sentences fans will recognize them from."
          />
        </div>

        <div>
          <label className={labelClass}>Photo</label>

          {event?.celebrityImage && (
            <div className="mb-3 flex items-start gap-4 border border-border bg-card p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.celebrityImage}
                alt=""
                className="h-20 w-20 object-cover"
              />
              <div className="flex-1 text-xs text-muted">
                <p className="font-mono uppercase tracking-widest">Current photo</p>
                <p className="mt-1 break-all">{event.celebrityImage}</p>
                <label className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-red-300">
                  <input
                    type="checkbox"
                    name="removeCelebrityImage"
                    className="size-3.5"
                  />
                  Remove this photo
                </label>
              </div>
            </div>
          )}

          <input
            name="celebrityImageFile"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
            className="block w-full text-sm text-muted file:mr-4 file:border-0 file:bg-brand file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-wide file:text-black hover:file:bg-brand-dark"
          />

          <details className="mt-3">
            <summary className="cursor-pointer font-mono text-xs uppercase tracking-widest text-muted">
              Or use a photo URL
            </summary>
            <input
              name="celebrityImage"
              type="url"
              defaultValue={event?.celebrityImage ?? ""}
              className={`${field} mt-2`}
              placeholder="https://…"
            />
          </details>
        </div>
      </section>

      {state.error && (
        <p className="border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-300">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={pending} className="btn btn-primary btn-md">
          {pending ? "Saving…" : event ? "Save changes" : "Create event"}
        </button>
        <Link href="/backstage" className="btn btn-secondary btn-md">
          Cancel
        </Link>
      </div>
    </form>
  );
}
