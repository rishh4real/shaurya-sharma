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
  title: "Asqaure Design - Brand, Digital & Motion Studio",
  description:
    "Asqaure Design is a brand, digital and motion studio creating cinematic identities and unexpected digital experiences.",
  openGraph: {
    title: "Asqaure Design",
    description:
      "A brand, digital and motion studio creating cinematic identities and unexpected digital experiences.",
    images: ["/asqaure-hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asqaure Design",
    description:
      "A brand, digital and motion studio creating cinematic identities and unexpected digital experiences.",
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
