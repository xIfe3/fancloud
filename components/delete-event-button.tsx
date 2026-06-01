"use client";

import { deleteEventAction } from "@/app/backstage/actions";

export function DeleteEventButton({
  id,
  title,
}: {
  id: number;
  title: string;
}) {
  return (
    <form
      action={deleteEventAction}
      onSubmit={(e) => {
        if (!confirm(`Delete “${title}”? This can't be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-red-300 transition hover:bg-red-500/10"
      >
        Delete
      </button>
    </form>
  );
}
