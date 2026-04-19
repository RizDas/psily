import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Cedarville_Cursive,
  Dancing_Script,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cedarville = Cedarville_Cursive({
  weight: "400", // Cedarville Cursive only supports weight 400
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cedarville",
});

const dancingScript = Dancing_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dancing",
});

export const metadata: Metadata = {
  title: "P.S. I Love You",
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
      className={`${geistSans.variable} ${geistMono.variable} ${cedarville} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
