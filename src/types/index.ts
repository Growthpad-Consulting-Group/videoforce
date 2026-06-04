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
