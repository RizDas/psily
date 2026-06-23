import type { Metadata } from "next";
import {
  Geist,
  Cedarville_Cursive,
  Dancing_Script,
  Lora,
  Mona_Sans,
  Cinzel_Decorative,
  Cinzel,
  EB_Garamond,
  Tangerine,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const monasans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

const cedarville = Cedarville_Cursive({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cedarville",
});

const dancingScript = Dancing_Script({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dancing",
});

const lora = Lora({
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

const cinzelDeco = Cinzel_Decorative({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel-deco",
});

const cinzel = Cinzel({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
});

// Classic old-document body serif — the typeface real charters,
// legal texts, and printed constitutions are set in.
const ebGaramond = EB_Garamond({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-garamond",
});

// Grand, formal flowing script — for signatures, seals, and any
// place that should read like a royal decree rather than a note.
const tangerine = Tangerine({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-tangerine",
});

export const metadata: Metadata = {
  title: "P.S. I Love You",
  description: "Website just for her :)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cedarville.variable} ${dancingScript.variable} ${lora.variable} ${cinzelDeco.variable} ${cinzel.variable} ${ebGaramond.variable} ${tangerine.variable} ${monasans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
