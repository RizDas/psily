import type { Metadata } from "next";
import "./globals.css";
import {
  Geist,
  Cedarville_Cursive,
  Dancing_Script,
  Lora,
} from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
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

export const metadata: Metadata = {
  title: "HAPPY BIRTHDAY ❤️",
  description: "A loving website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cedarville.variable} ${dancingScript.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
