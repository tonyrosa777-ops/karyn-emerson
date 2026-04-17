import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://karynemerson.com";

export const metadata: Metadata = {
  title: "Karyn Emerson Real Estate | Salem, NH Southern New Hampshire",
  description:
    "Karyn Emerson, licensed real estate agent, Jill & Co. Realty Group. Buyer and seller representation in Salem, Windham, Derry, and Southern NH.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Karyn Emerson Real Estate | Southern New Hampshire",
    description:
      "Licensed Southern NH real estate agent. Buyer and seller representation in Salem, Windham, Derry, Londonderry, Pelham, Atkinson, and Hampstead.",
    url: SITE_URL,
    siteName: "Karyn Emerson Real Estate",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og/default-og.svg",
        width: 1200,
        height: 630,
        alt: "Karyn Emerson Real Estate — Southern New Hampshire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karyn Emerson Real Estate | Southern New Hampshire",
    description:
      "Licensed Southern NH real estate agent. Buyer and seller representation in Salem, Windham, Derry, and six more towns.",
    images: ["/og/default-og.svg"],
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
      className={`${cormorant.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 pt-[96px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
