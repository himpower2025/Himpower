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
  title: {
    default: "Himpower · Websites, Mobile Apps & Developer Training",
    template: "%s · Himpower",
  },
  description:
    "We design, build, and support high-quality websites, mobile apps, and practical developer training courses.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Himpower · Websites, Mobile Apps & Developer Training",
    description:
      "We design, build, and support high-quality websites, mobile apps, and practical developer training courses.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Himpower · Websites, Mobile Apps & Developer Training",
    description:
      "We design, build, and support high-quality websites, mobile apps, and practical developer training courses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
