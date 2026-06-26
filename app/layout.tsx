import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Nuton's brand display font (RooneySans Heavy) — the oversized footer wordmark.
const rooney = localFont({
  src: "./fonts/RooneySansHeavy.otf",
  variable: "--font-wordmark",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  // Variable font: keep the full wght axis (no `weight`) so the CSS variable
  // is emitted and any weight works. Include the italic optical style.
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Nuton — Learn the way your brain understands best",
  description:
    "Turn your materials or ideas into structured lessons, personalized explanations, and intelligent practice built around how you think.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${rooney.variable}`}>
      <body className="font-body text-strong">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
