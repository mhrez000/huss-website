/* ===========================================================
   HussMedia — service areas (suburb pages)
   Each area gets a dedicated SEO page with unique content.
   =========================================================== */

export type Area = {
  slug: string;
  name: string;
  region: string;
  /** One-line hook used on cards and meta descriptions. */
  blurb: string;
  /** 2–3 unique intro paragraphs (SEO body copy). */
  intro: string[];
  /** Common property styles in this suburb. */
  propertyStyles: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  /** Image URLs from the shared pool in site.ts. */
  gallery: { src: string; alt: string }[];
  testimonial?: {
    quote: string;
    name: string;
    role: string;
    agency: string;
  };
  /** Slugs of nearby serviced suburbs. */
  nearby: string[];
};

export const areas: Area[] = [
  // Populated by content authors — see areas page implementation.
];

export function getArea(slug: string) {
  return areas.find((a) => a.slug === slug);
}
