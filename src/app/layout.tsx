import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/config/site";
import { motionScript } from "@/lib/motion";
import { organizationJsonLd } from "@/lib/seo";
import { getBrandAsset } from "@/lib/brand";
import { JsonLd } from "@/components/seo/JsonLd";

const display = localFont({ src: "../fonts/bricolage-grotesque.woff2", variable: "--font-display", weight: "200 800", display: "swap" });
const body = localFont({ src: "../fonts/instrument-sans.woff2", variable: "--font-body", weight: "400 700", display: "swap" });

const ogImage = getBrandAsset("og") ?? "/og.png";
const favicon = getBrandAsset("favicon") ?? getBrandAsset("logo");

export const metadata: Metadata = {
  ...(favicon ? { icons: { icon: favicon } } : {}),
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Brands, Websites, Apps and Motion`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "./" },
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_GB",
    images: [{ url: ogImage, width: 1200, height: 630, alt: `${site.name}: brands, websites, apps and motion` }],
  },
  twitter: { card: "summary_large_image", images: [ogImage] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-black">
          Skip to content
        </a>
        <JsonLd data={organizationJsonLd()} />
        <Header logo={getBrandAsset("logo")} />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
