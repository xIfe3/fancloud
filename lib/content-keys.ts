/**
 * Catalog of every editable string on the site, with default values used
 * when nothing has been saved in the DB yet. This file is intentionally
 * free of server-only imports so it can be used in client components too
 * (e.g. the backstage content form).
 */
export interface ContentKeyDef {
  label: string;
  defaultValue: string;
  multiline: boolean;
  /** Optional help text shown below the label. */
  hint?: string;
  /** Placeholders available in this field, rendered as chips. */
  placeholders?: readonly string[];
  /** Override row count for textareas (defaults to 6 when multiline). */
  rows?: number;
}

export const CONTENT_KEYS = {
  // -------------------- HOME --------------------
  "home.kicker": {
    label: "Kicker",
    hint: "The small line above the headline.",
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
    label: "Hero headline · line 3",
    hint: "Rendered in the yellow accent color.",
    defaultValue: "heroes.",
    multiline: false,
  },
  "home.subcopy": {
    label: "Hero subcopy",
    hint: "Paragraph below the big headline.",
    defaultValue:
      "FANCLOUD brings the actors, voice talent, and creators behind your favorite films, shows, comics, and games face-to-face with the fans who love them. Photo ops, autographs, live Q&A panels — twelve cities a year.",
    multiline: true,
    rows: 6,
  },
  "home.cta.title": {
    label: "Bottom CTA · title",
    hint: "Use a pipe character | for a line break.",
    defaultValue: "Don't miss|who's coming.",
    multiline: false,
  },
  "home.cta.subcopy": {
    label: "Bottom CTA · subcopy",
    defaultValue:
      "Guest announcements drop all year. Lock in early-bird tickets and photo-op slots before your favorite stars sell out.",
    multiline: true,
    rows: 5,
  },

  // -------------------- ABOUT --------------------
  "about.kicker": {
    label: "Kicker",
    defaultValue: "About FANCLOUD",
    multiline: false,
  },
  "about.headline.line1": {
    label: "Headline · line 1",
    defaultValue: "Where fans",
    multiline: false,
  },
  "about.headline.line2": {
    label: "Headline · line 2",
    hint: "Rendered in the yellow accent color.",
    defaultValue: "meet stars.",
    multiline: false,
  },
  "about.subcopy": {
    label: "Hero subcopy",
    defaultValue:
      "FANCLOUD started with a simple idea: the best conventions aren't about merch tables — they're about the moment you finally meet the people behind the work you love. Today we bring hundreds of celebrity guests face-to-face with fans across a dozen cities a year.",
    multiline: true,
    rows: 6,
  },

  // -------------------- FOOTER --------------------
  "footer.tagline.big": {
    label: "Big tagline",
    hint: "Sits in the giant FANCLOUD wordmark band.",
    defaultValue:
      "The fan event network. Photo ops, autograph alleys, and live panels with the actors, voice talent, and creators behind your favorite films, shows, comics, and games.",
    multiline: true,
    rows: 5,
  },
  "footer.tagline.small": {
    label: "Small tagline",
    hint: "Below the logo in the link columns.",
    defaultValue: "Where fans meet their heroes.",
    multiline: false,
  },

  // -------------------- SITE EMAIL --------------------
  "admin.email": {
    label: "Site email",
    hint: "The one address every mailto on the site sends to — contact form, booking buttons, contact-us-about-this-event, fan-card applications. Shown on the contact page.",
    defaultValue: "hello@fancloud.org",
    multiline: false,
  },

  // -------------------- EMAIL TEMPLATES --------------------
  "contact.event.body": {
    label: "Contact us about this event",
    hint: "Pre-written body for the 'Contact us about this event' button on every event page.",
    placeholders: ["event", "celebrity", "city", "date", "email"],
    defaultValue:
      "Hi FANCLOUD team,\n\nI'd like more information about {event} in {city} on {date}.{celebrity}\n\nYou can reach me at: {email}\n\nThanks!",
    multiline: true,
    rows: 12,
  },
  "booking.event.body": {
    label: "Book this event",
    hint: "Pre-written body for the 'Book now' button on every event page.",
    placeholders: ["event", "celebrity", "city", "date", "email"],
    defaultValue:
      "Hi FANCLOUD team,\n\nI'd like to book my spot for {event} in {city} on {date}.{celebrity}\n\nPlease send over ticket availability, pricing, and the next steps to lock in my reservation.\n\nMy email: {email}\n\nThanks!",
    multiline: true,
    rows: 12,
  },
  "fancard.regular.email.body": {
    label: "Apply for Regular Fan Card",
    hint: "Pre-written body sent when someone clicks 'Get the Regular card' on the /fan-card page.",
    placeholders: ["card", "price", "email"],
    defaultValue:
      "Hi FANCLOUD team,\n\nI'd like to apply for the {card} Fan Card ({price}).\n\nPlease send me the next steps to sign up.\n\nMy email: {email}\n\nThanks!",
    multiline: true,
    rows: 12,
  },
  "fancard.vip.email.body": {
    label: "Apply for VIP Fan Card",
    hint: "Pre-written body sent when someone clicks 'Apply for VIP' on the /fan-card page.",
    placeholders: ["card", "price", "email"],
    defaultValue:
      "Hi FANCLOUD team,\n\nI'd like to apply for the {card} Fan Card ({price}).\n\nPlease send me the next steps to sign up and reserve my VIP perks.\n\nMy email: {email}\n\nThanks!",
    multiline: true,
    rows: 12,
  },

  // -------------------- TERMS PAGE --------------------
  "terms.kicker": {
    label: "Terms · kicker",
    defaultValue: "Legal",
    multiline: false,
  },
  "terms.headline": {
    label: "Terms · headline",
    defaultValue: "Terms of service.",
    multiline: false,
  },
  "terms.updated": {
    label: "Terms · last-updated label",
    hint: "Free text — shown at the top and bottom of the page.",
    defaultValue: "Last updated: June 7, 2026",
    multiline: false,
  },
  "terms.body": {
    label: "Terms · body",
    hint: "Separate sections with a blank line. Lines that look like a heading (start with a capital letter and have no period at the end) get rendered slightly bolder.",
    defaultValue: [
      "This page is placeholder text. Replace it with the terms your lawyer drafts for you before you go live.",
      "",
      "1. Acceptance",
      "By using fancloud.org, attending a FANCLOUD event, or buying a ticket, you agree to these terms. If you don't agree, please don't use the site or attend our events.",
      "",
      "2. Tickets and bookings",
      "All bookings on this site are inquiries — you confirm your spot and complete payment directly with our team or one of our ticket partners. Prices, seating, and availability shown on the site may change without notice.",
      "",
      "3. Event conduct",
      "Behave like a decent human at our events. Harassment, hate speech, weapons, illegal substances, and unauthorised filming inside panels are grounds for immediate removal without a refund.",
      "",
      "4. Refunds and cancellations",
      "Tickets are generally non-refundable except where required by law. If FANCLOUD cancels an event, we'll process a full refund within 30 days.",
      "",
      "5. Intellectual property",
      "All site content, branding, and design belongs to FANCLOUD. Don't copy, redistribute, or pass it off as your own without written permission.",
      "",
      "6. Liability",
      "Attendance is at your own risk. FANCLOUD isn't responsible for personal injury, lost property, or damages outside our reasonable control.",
      "",
      "7. Changes",
      "We may update these terms from time to time. The 'last updated' date at the top reflects the most recent change. Continued use of the site or attendance at events means you accept the latest version.",
      "",
      "8. Contact",
      "Questions about these terms? Email us at the address on /contact.",
    ].join("\n"),
    multiline: true,
    rows: 24,
  },

  // -------------------- PRIVACY PAGE --------------------
  "privacy.kicker": {
    label: "Privacy · kicker",
    defaultValue: "Legal",
    multiline: false,
  },
  "privacy.headline": {
    label: "Privacy · headline",
    defaultValue: "Privacy policy.",
    multiline: false,
  },
  "privacy.updated": {
    label: "Privacy · last-updated label",
    hint: "Free text — shown at the top and bottom of the page.",
    defaultValue: "Last updated: June 7, 2026",
    multiline: false,
  },
  "privacy.body": {
    label: "Privacy · body",
    hint: "Separate sections with a blank line. Lines that look like a heading (start with a capital letter and have no period at the end) get rendered slightly bolder.",
    defaultValue: [
      "This page is placeholder text. Replace it with the privacy policy your lawyer drafts for you before you go live.",
      "",
      "What we collect",
      "When you fill in the contact form, your name, email, and message are sent directly to us via your mail app — we don't store them on our servers. When you click a 'Book now' or 'Contact about this event' button, the same applies. If you buy a ticket through one of our partners, we receive whatever they pass on (name, email, and basic order details).",
      "",
      "What we don't collect",
      "We don't track you with third-party analytics. We don't use advertising cookies. We don't sell or rent your information to anyone.",
      "",
      "Cookies",
      "We use a single first-party session cookie to keep the admin area signed in. That's it. No tracking pixels, no fingerprinting.",
      "",
      "Third parties we rely on",
      "Our site is hosted on Vercel and uses Neon Postgres for event data. Images are stored on Vercel Blob. These providers have their own privacy policies which apply to the infrastructure that runs the site.",
      "",
      "Your rights",
      "You can ask us at any time what data we have about you and request that we delete it. Email us using the address on /contact.",
      "",
      "Changes",
      "If we update this policy, the 'last updated' date at the top changes. We'll never reduce your rights without telling you clearly.",
      "",
      "Contact",
      "Questions about your data? Email us at the address on /contact.",
    ].join("\n"),
    multiline: true,
    rows: 24,
  },

  // -------------------- FAN CARD PAGE --------------------
  "fancard.kicker": {
    label: "Kicker",
    defaultValue: "Become a member",
    multiline: false,
  },
  "fancard.headline.line1": {
    label: "Headline · line 1",
    defaultValue: "Fan card.",
    multiline: false,
  },
  "fancard.headline.line2": {
    label: "Headline · line 2",
    hint: "Rendered in the yellow accent color.",
    defaultValue: "Real perks.",
    multiline: false,
  },
  "fancard.subcopy": {
    label: "Hero subcopy",
    defaultValue:
      "A year-round pass that turns up at every FANCLOUD show. Skip the longest lines, unlock member-only ticket windows, and grab perks the public never sees. Two tiers — pick the one that fits the way you fan.",
    multiline: true,
    rows: 5,
  },

  // -------------------- FAN CARD · REGULAR --------------------
  "fancard.regular.name": {
    label: "Card name",
    defaultValue: "Regular",
    multiline: false,
  },
  "fancard.regular.tagline": {
    label: "Tagline",
    hint: "One short line below the card name.",
    defaultValue: "Skip the lines and save on every show.",
    multiline: false,
  },
  "fancard.regular.price": {
    label: "Price",
    defaultValue: "$49 / year",
    multiline: false,
  },
  "fancard.regular.perks": {
    label: "Perks",
    hint: "One perk per line. Each line becomes a bullet point on the card.",
    defaultValue:
      "Priority entry at every event\nMember-only ticket pre-sale window\n10% off all photo ops\nQuarterly digital zine\nMember-pricing on merch",
    multiline: true,
    rows: 8,
  },

  // -------------------- FAN CARD · VIP --------------------
  "fancard.vip.name": {
    label: "Card name",
    defaultValue: "VIP",
    multiline: false,
  },
  "fancard.vip.tagline": {
    label: "Tagline",
    hint: "One short line below the card name.",
    defaultValue: "All-access. Front of every line.",
    multiline: false,
  },
  "fancard.vip.price": {
    label: "Price",
    defaultValue: "$199 / year",
    multiline: false,
  },
  "fancard.vip.perks": {
    label: "Perks",
    hint: "One perk per line. Each line becomes a bullet point on the card.",
    defaultValue:
      "Skip-the-line entry at every event\nReserved photo-op slots — no queueing\nExclusive VIP lounge with complimentary drinks\nPriority autograph access\nOne free photo op per year\nQuarterly print zine and member kit\nEarly guest-lineup announcements",
    multiline: true,
    rows: 8,
  },
} as const satisfies Record<string, ContentKeyDef>;

export type ContentKey = keyof typeof CONTENT_KEYS;

/** Pure lookup with default fallback — safe to call from anywhere. */
export function pick(
  map: Map<string, string>,
  key: ContentKey,
): string {
  return map.get(key) ?? CONTENT_KEYS[key].defaultValue;
}
