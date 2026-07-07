import { site, services, faqs, packages } from "@/content/site";

/* ===========================================================
   JSON-LD structured data builders (schema.org)
   =========================================================== */

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#business`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/hero-poster.jpg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Melbourne",
      addressRegion: "VIC",
      addressCountry: "AU",
    },
    areaServed: {
      "@type": "City",
      name: "Melbourne",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.googleRating,
      reviewCount: site.googleReviewCount,
      bestRating: 5,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "17:00",
      },
    ],
    sameAs: site.socials.map((s) => s.href),
  };
}

export function photographyServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/#service`,
    serviceType: "Real Estate Photography",
    provider: { "@id": `${site.url}/#business` },
    areaServed: { "@type": "City", name: "Melbourne" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Real estate media packages",
      itemListElement: packages.map((p) => ({
        "@type": "Offer",
        name: p.name,
        price: p.price,
        priceCurrency: "AUD",
        description: p.tagline,
      })),
    },
  };
}

export function serviceSchema(slug: string) {
  const s = services.find((x) => x.slug === slug);
  if (!s) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${s.title} — ${site.name}`,
    serviceType: s.title,
    description: s.blurb,
    provider: { "@id": `${site.url}/#business` },
    areaServed: { "@type": "City", name: "Melbourne" },
    offers: {
      "@type": "Offer",
      price: s.priceFrom,
      priceCurrency: "AUD",
      description: s.priceNote,
    },
  };
}

export function faqSchema(items: { q: string; a: string }[] = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${site.url}${c.path}`,
    })),
  };
}

export function articleSchema(post: {
  title: string;
  excerpt: string;
  date: string;
  cover: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: post.cover,
    url: `${site.url}/blog/${post.slug}`,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@id": `${site.url}/#business` },
  };
}

/** Render helper — use inside a <script type="application/ld+json"> */
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data) };
}
