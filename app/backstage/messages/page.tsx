import type { Metadata } from "next";
import { getAllMessages } from "@/lib/messages";
import { formatRelative, formatTimestamp } from "@/lib/format";
import { DeleteMessageButton } from "@/components/delete-message-button";

export const metadata: Metadata = {
  title: "Messages",
  robots: { index: false },
};

export default async function MessagesPage() {
  const messages = await getAllMessages();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Backstage · Inbox
          </p>
          <h1 className="mt-3 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
            Messages
          </h1>
          <p className="mt-2 text-muted">
            Every message sent through the contact form on /contact.
          </p>
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          {messages.length} message{messages.length === 1 ? "" : "s"}
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="mt-12 border border-dashed border-border py-20 text-center">
          <p className="text-2xl font-bold tracking-tight">Inbox zero.</p>
          <p className="mt-2 text-muted">
            No one has used the contact form yet. New messages land here.
          </p>
        </div>
      ) : (
        <ul className="mt-10 space-y-4">
          {messages.map((m) => {
            const subject = m.subject?.trim() || `Message from ${m.name}`;
            const replyHref = `mailto:${encodeURIComponent(m.email)}?subject=${encodeURIComponent("Re: " + subject)}&body=${encodeURIComponent(
              `Hi ${m.name},\n\nThanks for reaching out.\n\n— — — — — — — — — —\nYour original message:\n${m.message}\n— — — — — — — — — —`,
            )}`;
            return (
              <li
                key={m.id}
                className="border border-border bg-card p-6 transition hover:border-foreground/30"
              >
                <header className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-lg font-bold tracking-tight">{m.name}</p>
                    <a
                      href={`mailto:${m.email}`}
                      className="break-all font-mono text-xs text-brand transition hover:text-brand-dark"
                    >
                      {m.email}
                    </a>
                  </div>
                  <span
                    title={formatTimestamp(m.createdAt)}
                    className="shrink-0 font-mono text-xs uppercase tracking-widest text-muted"
                  >
                    {formatRelative(m.createdAt)}
                  </span>
                </header>

                {m.subject && (
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted">
                    Subject
                  </p>
                )}
                {m.subject && (
                  <p className="mt-1 font-bold">{m.subject}</p>
                )}

                <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted">
                  Message
                </p>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/90">
                  {m.message}
                </p>

                <div className="mt-6 flex items-center gap-2 border-t border-border pt-4">
                  <a
                    href={replyHref}
                    className="btn btn-primary btn-sm"
                  >
                    Reply →
                  </a>
                  <DeleteMessageButton id={m.id} from={m.name} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
