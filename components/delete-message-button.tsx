"use client";

import { deleteMessageAction } from "@/app/backstage/messages/actions";

export function DeleteMessageButton({
  id,
  from,
}: {
  id: number;
  from: string;
}) {
  return (
    <form
      action={deleteMessageAction}
      onSubmit={(e) => {
        if (!confirm(`Delete the message from ${from}? This can't be undone.`)) {
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
