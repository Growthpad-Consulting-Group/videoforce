"use client";

import type { ContactApiResponse, ContactFormData, ContactFormErrors } from "@/types";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const SUBJECTS = ["Order Project", "Request For Quotation", "Other Question"];

function validate(data: Omit<ContactFormData, "recaptchaToken">): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (!data.name.trim()) errors.name = "Please enter your name";
  if (!data.email.trim()) {
    errors.email = "Please enter your email address";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!data.phone.trim()) {
    errors.phone = "Please enter your phone number";
  } else if (!/^\d+$/.test(data.phone.trim())) {
    errors.phone = "Phone number can only contain digits";
  }
  if (!data.subject || data.subject === "Subject") {
    errors.subject = "Please select a subject";
  }
  if (!data.comments.trim()) errors.comments = "Please enter your message";
  return errors;
}

export default function ContactForm() {
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [fields, setFields] = useState({ name: "", email: "", phone: "", subject: "", comments: "" });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof typeof fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFields((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(fields);
    if (Object.keys(fieldErrors).length > 0) { setErrors(fieldErrors); return; }

    const token = recaptchaRef.current?.getValue();
    if (!token) { setErrors((err) => ({ ...err, recaptcha: "Please complete the reCAPTCHA" })); return; }

    setSubmitting(true);
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, recaptchaToken: token } satisfies ContactFormData),
      });
      const data = (await res.json()) as ContactApiResponse;
      if (!res.ok || data.error) {
        setErrors({ submit: data.error ?? "Something went wrong. Please try again." });
        recaptchaRef.current?.reset();
        return;
      }
      router.push("/thank-you");
    } catch {
      setErrors({ submit: "Network error. Please try again later." });
      recaptchaRef.current?.reset();
    } finally {
      setSubmitting(false);
    }
  };

  const errStyle: React.CSSProperties = { color: "#ff4d4d", fontSize: 11, marginTop: 4, display: "block" };

  return (
    <div id="contact-form">
      {errors.submit && (
        <div id="message" style={{ display: "block", marginBottom: 16, padding: 12, background: "#f8d7da", color: "#721c24", borderRadius: 4 }}>
          {errors.submit}
        </div>
      )}

      <form className="custom-form" id="contactform" name="contactform" onSubmit={handleSubmit} noValidate>
        <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
          <div className="row">
            <div className="col-md-6">
              <input id="name" name="name" placeholder="Your Name *" type="text" value={fields.name} onChange={set("name")} />
              {errors.name && <span style={errStyle}>{errors.name}</span>}
            </div>
            <div className="col-md-6">
              <input id="email" name="email" placeholder="Email Address *" type="text" value={fields.email} onChange={set("email")} />
              {errors.email && <span style={errStyle}>{errors.email}</span>}
            </div>
            <div className="col-md-6">
              <input id="phone" name="phone" placeholder="Phone *" type="text" value={fields.phone} onChange={set("phone")} />
              {errors.phone && <span style={errStyle}>{errors.phone}</span>}
            </div>
            <div className="col-md-6">
              <select className="chosen-select sel-dec" id="subject" name="subject" value={fields.subject} onChange={set("subject")}>
                <option value="">Subject</option>
                {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.subject && <span style={errStyle}>{errors.subject}</span>}
            </div>
          </div>

          <textarea
            cols={40} id="comments" name="comments" placeholder="Your Message:"
            rows={3} value={fields.comments} onChange={set("comments")}
          />
          {errors.comments && <span style={errStyle}>{errors.comments}</span>}

          <div className="clearfix" />

          <div className="row">
            <div className="col-md-6">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
              />
              {errors.recaptcha && <span style={errStyle}>{errors.recaptcha}</span>}
            </div>
            <div className="col-md-6">
              <button
                className="btn float-btn flat-btn color-btn"
                id="submit"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
