import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { getAllContent, pick } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "What data FANCLOUD collects, how we use it, and how to ask us to delete it.",
};

export default async function PrivacyPage() {
  const content = await getAllContent();
  return (
    <LegalPage
      kicker={pick(content, "privacy.kicker")}
      headline={pick(content, "privacy.headline")}
      updated={pick(content, "privacy.updated")}
      body={pick(content, "privacy.body")}
    />
  );
}
