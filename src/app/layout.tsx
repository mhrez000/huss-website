import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { site } from "@/content/site";
import { localBusinessSchema, photographyServiceSchema, jsonLd } from "@/lib/schema";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { MobileCta } from "@/components/mobile-cta";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Real Estate Photography Melbourne`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "real estate photography Melbourne",
    "property photography",
    "drone photography",
    "twilight photography",
    "floor plans",
    "real estate video",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Photography That Helps Homes Sell Faster`,
    description: site.description,
    images: [{ url: "/hero-poster.jpg", width: 1200, height: 630, alt: `${site.name} real estate photography` }],
  },
  // Card type only — X falls back to each page's og:* for title/description/image,
  // so subpages don't inherit the homepage card.
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#faf8f4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={manrope.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-cream"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(localBusinessSchema())}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(photographyServiceSchema())}
        />
        <SmoothScroll>
          <SiteNav />
          <main id="main">{children}</main>
          <SiteFooter />
          <MobileCta />
        </SmoothScroll>
      </body>
    </html>
  );
}
