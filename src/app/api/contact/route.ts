import { verifyRecaptcha } from "@/lib/recaptcha";
import type { ContactFormData } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^\d+$/.test(phone.trim());
}

export async function POST(req: NextRequest) {
  let body: Partial<ContactFormData>;

  try {
    body = (await req.json()) as Partial<ContactFormData>;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, phone, subject, comments, recaptchaToken } = body;

  // ── Server-side field validation ────────────────────────────────────────
  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (!email?.trim() || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "A valid email address is required" },
      { status: 400 }
    );
  }
  if (!phone?.trim() || !isValidPhone(phone)) {
    return NextResponse.json(
      { error: "Phone number must contain digits only" },
      { status: 400 }
    );
  }
  if (!subject?.trim() || subject === "Subject") {
    return NextResponse.json({ error: "Please select a subject" }, { status: 400 });
  }
  if (!comments?.trim()) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }
  if (!recaptchaToken?.trim()) {
    return NextResponse.json(
      { error: "Please complete the reCAPTCHA" },
      { status: 400 }
    );
  }

  // ── reCAPTCHA verification ───────────────────────────────────────────────
  try {
    const valid = await verifyRecaptcha(recaptchaToken);
    if (!valid) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed. Please try again." },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("reCAPTCHA error:", err);
    return NextResponse.json(
      { error: "Could not verify reCAPTCHA. Please try again." },
      { status: 500 }
    );
  }

  // ── Send email via Nodemailer ────────────────────────────────────────────
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL_TO, CONTACT_RECIPIENT_EMAIL } =
    process.env;

  const recipientEmail = CONTACT_EMAIL_TO || CONTACT_RECIPIENT_EMAIL;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !recipientEmail) {
    console.error("Missing SMTP environment variables");
    return NextResponse.json(
      { error: "Server configuration error. Please try again later." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"Video Force Website" <${SMTP_USER}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `New contact: ${subject} from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Subject: ${subject}`,
        `Message:\n${comments}`,
      ].join("\n\n"),
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${comments.replace(/\n/g, "<br>")}</p>
      `,
    });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
