import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shaurya Sharma - Web Design, AI Automations & Strategy",
  description:
    "Shaurya Sharma - Web Design, AI Automations & Strategy Maker.",
  openGraph: {
    title: "Shaurya Sharma",
    description:
      "Web Design, AI Automations & Strategy Maker.",
    images: ["/asqaure-hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shaurya Sharma",
    description:
      "Web Design, AI Automations & Strategy Maker.",
    images: ["/asqaure-hero.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
