import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getAllContent, pick } from "@/lib/content";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FANCLOUD — Meet your heroes.",
    template: "%s · FANCLOUD",
  },
  description:
    "The fan event network where you meet the actors, voice talent, and creators behind your favorite films, shows, comics, and games. Photo ops, autographs, live Q&A panels — twelve cities a year.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getAllContent();

  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-background text-foreground"
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer
          bigTagline={pick(content, "footer.tagline.big")}
          smallTagline={pick(content, "footer.tagline.small")}
        />
      </body>
    </html>
  );
}
