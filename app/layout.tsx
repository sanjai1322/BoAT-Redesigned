import type { Metadata, Viewport } from "next";
import { Syne, Fraunces, DM_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/ui/LenisProvider";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/ui/CartDrawer";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "boAt, Reimagined — Code Constellation",
  description: "A cinematic reimagining of India's #1 audio brand. Case Study 001.",
  metadataBase: new URL("https://boat-reimagined.vercel.app"),
  openGraph: {
    title: "boAt, Reimagined — Code Constellation",
    description: "A cinematic reimagining of India's #1 audio brand. Case Study 001.",
    type: "website",
    locale: "en_US",
    url: "https://boat-reimagined.vercel.app",
    siteName: "Code Constellation",
    images: [
      {
        url: "/videos/hero-earbud-poster.jpg", // high-fidelity local frame poster as OG placeholder
        width: 1200,
        height: 630,
        alt: "boAt, Reimagined — Code Constellation",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "boAt, Reimagined — Code Constellation",
    description: "A cinematic reimagining of India's #1 audio brand. Case Study 001.",
    images: ["/videos/hero-earbud-poster.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${fraunces.variable} ${dmMono.variable} antialiased bg-bg-primary text-text-primary selection:bg-accent-red selection:text-bg-primary`}
      >
        <CartProvider>
          <ScrollProgress />
          <LenisProvider>
            {children}
            <CartDrawer />
          </LenisProvider>
        </CartProvider>
      </body>
    </html>
  );
}
