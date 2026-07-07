/* ===========================================================
   HussMedia — blog content
   Each post is structured data (no MDX dependency) so it can
   be edited like a CMS and rendered with full control.
   =========================================================== */

export type PostSection = {
  heading?: string;
  paragraphs: string[];
  list?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, e.g. "2026-06-15" */
  date: string;
  readTime: string;
  cover: string;
  coverAlt: string;
  tags: string[];
  sections: PostSection[];
};

/** Posts are ordered newest first. */
export const posts: BlogPost[] = [
  // Populated by content authors — see blog page implementation.
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
