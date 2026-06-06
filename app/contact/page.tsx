import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { getAllContent, pick } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with FANCLOUD about tickets, exhibiting, press, or partnerships.",
};

export default async function ContactPage() {
  const content = await getAllContent();

  const details = [
    { label: "Hello", value: pick(content, "admin.email") },
    { label: "Support", value: pick(content, "admin.email.support") },
  ];

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Get in touch
          </p>
          <h1 className="mt-4 text-5xl font-extrabold uppercase leading-[0.92] tracking-tight sm:text-7xl">
            Talk to us.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Tickets, talent booking, exhibiting, or bringing FANCLOUD to your
            city — send us a note and the right person will reply.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
              Direct lines
            </p>
            <dl className="mt-6 divide-y divide-border border-y border-border">
              {details.map((d) => (
                <div
                  key={d.label}
                  className="flex items-center justify-between gap-4 py-5"
                >
                  <dt className="font-mono text-xs uppercase tracking-widest text-muted">
                    {d.label}
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${d.value}`}
                      className="font-bold text-brand transition hover:text-brand-dark"
                    >
                      {d.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}
