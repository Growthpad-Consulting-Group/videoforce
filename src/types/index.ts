// ─── Content Types ────────────────────────────────────────────────────────────

export interface Service {
  /** Iconify icon string e.g. "fa6-regular:film" */
  icon: string;
  title: string;
  description: string;
}

export interface CaseStudy {
  /** YouTube video ID */
  videoId: string;
  /** Optional filter category key for future use */
  category?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  /** Path relative to /public e.g. "/images/avatar/1.jpg" */
  image: string;
}

export interface Review {
  quote: string;
  author: string;
  company?: string;
  /** Path to avatar image relative to /public */
  avatar?: string;
}

export interface Client {
  /** Filename in /public/images/clients/ e.g. "1-asus.png" */
  filename: string;
  /** Company name used as alt text */
  name: string;
}

// ─── Navigation Types ─────────────────────────────────────────────────────────

export interface NavSection {
  /** Section id without # e.g. "sec1" */
  id: string;
  label: string;
}

export interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

// ─── Contact Form Types ───────────────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  comments: string;
  recaptchaToken: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  comments?: string;
  recaptcha?: string;
  submit?: string;
}

export interface ContactApiResponse {
  success?: boolean;
  error?: string;
}
<<<<<<< HEAD
=======

// ─── Blog Types ───────────────────────────────────────────────────────────────

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  /** ISO date string e.g. 2025-06-04 */
  date: string;
  author?: string;
  /** Path under /public or absolute CDN URL */
  image?: string;
  tags?: string[];
  // SEO / metadata overrides
  /** Overrides <title> in search results (max ~60 chars). Falls back to title. */
  metaTitle?: string;
  /** Overrides meta description (max ~160 chars). Falls back to description. */
  metaDescription?: string;
  /** Open Graph image for social sharing. Falls back to image. */
  ogImage?: string;
  /** Canonical URL if the post is published elsewhere. */
  canonicalUrl?: string;
  /** When true, adds <meta name="robots" content="noindex"> */
  noIndex?: boolean;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export interface BlogPostInput {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  image?: string;
  tags?: string[];
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}
>>>>>>> master
