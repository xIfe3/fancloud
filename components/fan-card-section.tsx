import { StarburstMark } from "./logo";
import { MailToButton } from "./mailto-button";

interface FanCardSectionProps {
  variant: "regular" | "vip";
  name: string;
  tagline: string;
  price: string;
  perks: string;
  adminEmail: string;
  bodyTemplate: string;
}

export function FanCardSection(props: FanCardSectionProps) {
  const { variant, name, tagline, price, perks, adminEmail, bodyTemplate } = props;
  const isVip = variant === "vip";
  const perkList = perks.split("\n").map((p) => p.trim()).filter(Boolean);

  // Visual treatment per tier — solid colors only, no gradients.
  const cardClass = isVip
    ? "bg-brand text-black border-brand"
    : "bg-[#0f0f0f] text-foreground border-border";

  return (
    <div className="flex h-full flex-col">
      {/* The physical-card visual */}
      <div
        className={`relative flex aspect-[16/10] flex-col justify-between border p-6 ${cardClass}`}
      >
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em]">
            <StarburstMark className="size-3.5" />
            Fancloud
          </span>
          <span
            className={`text-[10px] font-bold uppercase tracking-[0.3em] ${
              isVip ? "text-black/70" : "text-muted"
            }`}
          >
            Member
          </span>
        </div>

        <div>
          <p
            className={`text-[10px] font-bold uppercase tracking-[0.35em] ${
              isVip ? "text-black/70" : "text-muted"
            }`}
          >
            {isVip ? "Tier · VIP" : "Tier · Regular"}
          </p>
          <p className="mt-1 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
            {name}
          </p>
        </div>

      </div>

      {/* Header band */}
      <div className="mt-6 flex items-baseline justify-between gap-4">
        <h2 className="text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
          {name}
        </h2>
        <span className="font-mono text-xs uppercase tracking-widest text-brand">
          {price}
        </span>
      </div>
      <p className="mt-2 text-muted">{tagline}</p>

      {/* Perks */}
      <ul className="mt-6 space-y-2.5 border-t border-border pt-6 text-sm">
        {perkList.map((perk, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="mt-1 inline-block size-1.5 shrink-0 bg-brand"
              aria-hidden
            />
            <span>{perk}</span>
          </li>
        ))}
      </ul>

      {/* Apply button — pinned to bottom so both cards align regardless of perks count */}
      <div className="mt-auto pt-8">
        <MailToButton
          adminEmail={adminEmail}
          subject={`Fan Card application · ${name}`}
          bodyTemplate={bodyTemplate}
          replacements={{ card: name, price }}
          triggerLabel={isVip ? `Apply for ${name} →` : `Get the ${name} card →`}
          triggerClassName={
            isVip
              ? "btn btn-primary btn-md w-full"
              : "btn btn-secondary btn-md w-full"
          }
          kicker="Become a member"
          title={`Apply for the ${name} Fan Card`}
          description={`Drop in your email and we'll open your mail app with a draft. We'll reply with the next steps to activate your ${name} membership.`}
        />
      </div>
    </div>
  );
}
