"use client";

import type { ContactApiResponse, ContactFormData, ContactFormErrors } from "@/types";
import Button from "@/components/ui/Button";
import { isRecaptchaConfigured, RECAPTCHA_SITE_KEY } from "@/lib/recaptcha-config";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const recaptchaEnabled = isRecaptchaConfigured();

const SUBJECTS = ["Order Project", "Request For Quotation", "Other Question"];

// Shared input class — replaces .custom-form input/textarea/select
const INPUT_CLS = [
  "w-full border-none border-b border-black/10 py-3 px-0 text-xs",
  "bg-transparent text-[#333] mb-5 block outline-none",
  "transition-[border-color] duration-200",
  "focus:border-b-brand-pink",
].join(" ");

function validate(data: Omit<ContactFormData, "recaptchaToken">): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (!data.name.trim())    errors.name    = "Please enter your name";
  if (!data.email.trim())   errors.email   = "Please enter your email address";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please enter a valid email address";
  if (!data.phone.trim())   errors.phone   = "Please enter your phone number";
  else if (!/^\d+$/.test(data.phone.trim())) errors.phone = "Phone number can only contain digits";
  if (!data.subject || data.subject === "Subject") errors.subject = "Please select a subject";
  if (!data.comments.trim()) errors.comments = "Please enter your message";
  return errors;
}

export default function ContactForm() {
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [fields, setFields]     = useState({ name: "", email: "", phone: "", subject: "", comments: "" });
  const [errors, setErrors]     = useState<ContactFormErrors>({});
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
    let recaptchaToken = "";
    if (recaptchaEnabled) {
      const token = recaptchaRef.current?.getValue();
      if (!token) {
        setErrors((err) => ({ ...err, recaptcha: "Please complete the reCAPTCHA" }));
        return;
      }
      recaptchaToken = token;
    }

    setSubmitting(true);
    setErrors({});
    try {
      const res  = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, recaptchaToken } satisfies ContactFormData),
      });
      const data = (await res.json()) as ContactApiResponse;
      if (!res.ok || data.error) {
        setErrors({ submit: data.error ?? "Something went wrong. Please try again." });
        if (recaptchaEnabled) recaptchaRef.current?.reset();
        return;
      }
      router.push("/thank-you");
    } catch {
      setErrors({ submit: "Network error. Please try again later." });
      if (recaptchaEnabled) recaptchaRef.current?.reset();
    } finally {
      setSubmitting(false);
    }
  };

  const Err = ({ msg }: { msg?: string }) =>
    msg ? <span className="block text-[#ff4d4d] text-[11px] mt-1">{msg}</span> : null;

  return (
    <div id="contact-form">
      {errors.submit && (
        <div className="mb-4 p-3 rounded bg-[#f8d7da] text-[#721c24]">{errors.submit}</div>
      )}

      <form id="contactform" onSubmit={handleSubmit} noValidate>
        <fieldset className="border-none p-0 m-0">
          <div className="flex flex-wrap mx-[-15px]">
            <div className="w-full px-[15px] md:w-1/2">
              <input className={INPUT_CLS} id="name" name="name" placeholder="Your Name *" type="text" value={fields.name} onChange={set("name")} />
              <Err msg={errors.name} />
            </div>
            <div className="w-full px-[15px] md:w-1/2">
              <input className={INPUT_CLS} id="email" name="email" placeholder="Email Address *" type="text" value={fields.email} onChange={set("email")} />
              <Err msg={errors.email} />
            </div>
            <div className="w-full px-[15px] md:w-1/2">
              <input className={INPUT_CLS} id="phone" name="phone" placeholder="Phone *" type="text" value={fields.phone} onChange={set("phone")} />
              <Err msg={errors.phone} />
            </div>
            <div className="w-full px-[15px] md:w-1/2">
              <select className={INPUT_CLS} id="subject" name="subject" value={fields.subject} onChange={set("subject")}>
                <option value="">Subject</option>
                {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <Err msg={errors.subject} />
            </div>
          </div>

          <textarea
            className={`${INPUT_CLS} resize-y h-[100px]`}
            id="comments" name="comments" placeholder="Your Message:"
            rows={3} value={fields.comments} onChange={set("comments")}
          />
          <Err msg={errors.comments} />

          <div className="flex flex-wrap mx-[-15px] mt-2">
            {recaptchaEnabled && (
              <div className="w-full px-[15px] md:w-1/2">
                <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} />
                <Err msg={errors.recaptcha} />
              </div>
            )}
            <div className="w-full px-[15px] md:w-1/2">
              <Button variant="color" float type="submit" disabled={submitting}>
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
