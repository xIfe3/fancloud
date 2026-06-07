import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { getAllContent, pick } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The terms that govern your use of FANCLOUD and attendance at our events.",
};

export default async function TermsPage() {
  const content = await getAllContent();
  return (
    <LegalPage
      kicker={pick(content, "terms.kicker")}
      headline={pick(content, "terms.headline")}
      updated={pick(content, "terms.updated")}
      body={pick(content, "terms.body")}
    />
  );
}
