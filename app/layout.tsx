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
  title: "Asqaure Design - Branding, Social Media & Web Design",
  description:
    "Asqaure Design creates branding, social media and web design with cinematic digital experiences.",
  openGraph: {
    title: "Asqaure Design",
    description:
      "Branding, social media and web design with cinematic digital experiences.",
    images: ["/asqaure-hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asqaure Design",
    description:
      "Branding, social media and web design with cinematic digital experiences.",
    images: ["/asqaure-hero.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
