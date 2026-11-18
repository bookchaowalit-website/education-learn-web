import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// Only Geist: the Reader shell needs no mono face here (no code), and falls back to system fonts.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const description = "Three authored learning-path outlines (Next.js, data structures, systems thinking) with search and a subject filter.";

export const metadata: Metadata = {
  title: "Learn Paths | Bookchaowalit",
  description,
  keywords: ["learn", "learning paths", "catalog"],
  authors: [{ name: "Bookchaowalit", url: "https://bookchaowalit.com" }],
  creator: "Bookchaowalit",
  metadataBase: new URL("https://learn.bookchaowalit.com"),
  openGraph: { type: "website", title: "Learn Paths | Bookchaowalit", description, siteName: "Bookchaowalit" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // The font variable sits on <html>: the Reader shell tokens live on :root and read it from there.
    <html lang="en" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
