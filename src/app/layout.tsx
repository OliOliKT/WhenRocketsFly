import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://whenrocketsfly.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "When Rockets Fly - Space Mission Timeline",
    template: "%s | When Rockets Fly"
  },
  description:
    "Explore an interactive timeline of space missions, rocket launches, lunar landers, planetary probes, Starship flight tests, and future exploration milestones.",
  keywords: [
    "space missions",
    "rocket launches",
    "space exploration timeline",
    "lunar missions",
    "planetary probes",
    "Starship flight tests",
    "NASA missions",
    "ESA missions",
    "CNSA missions",
    "ISRO missions",
    "JAXA missions"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "When Rockets Fly - Space Mission Timeline",
    description:
      "Track historic, recent, and upcoming space missions in one interactive timeline.",
    url: "/",
    siteName: "When Rockets Fly",
    images: [
      {
        url: "/WhenRocketsFlyLogo.png",
        width: 448,
        height: 450,
        alt: "When Rockets Fly logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "When Rockets Fly - Space Mission Timeline",
    description:
      "Track historic, recent, and upcoming space missions in one interactive timeline.",
    images: ["/WhenRocketsFlyLogo.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  category: "education"
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
        <Analytics/>
        {children}
      </body>
    </html>
  );
}
