import SectionTitle from "@/components/ui/SectionTitle";
import ContactForm from "@/components/contacts/ContactForm";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contacts | Video Force - Video content for digital audiences",
  description: "Contact Video Force Kenya for video production, animation and livestreaming services.",
};

export default function ContactsPage() {
  return (
    /* .single-page-wrap: padding-top 80px */
    <div className="pt-[80px]" id="wrapper">
      <div className="float-left w-full relative pl-[80px] z-5 max-md:pl-0">

        {/* Fixed purple top bar + back link */}
        <div className="fixed top-0 left-[80px] right-0 h-[80px] z-[14] bg-[#480f66] max-md:left-0" />
        <div className="fixed top-0 left-[80px] right-0 h-[80px] z-[14] flex items-center max-md:left-0">
          <div className="ml-[50px] flex items-center gap-5">
            {/* mousey scroll indicator */}
            <div className="float-left w-5 h-[30px] rounded-[6px] px-1.5 border-2 border-white/40">
              <div className="relative left-1/2 top-1.5 -ml-[1.5px] w-[3px] h-1.5 rounded-full bg-white animate-[mouse-scroll_2.2s_cubic-bezier(.15,.41,.69,.94)_infinite]" />
            </div>
            <span className="ml-5 text-[#e4dfdf] font-semibold uppercase text-[10px] tracking-[2px]">
              Scroll Down
            </span>
          </div>
          <Link
            href="/"
            className="float-left ml-[50px] text-left relative"
          >
            <span className="font-semibold uppercase text-[10px] tracking-[2px] text-[#e4dfdf]">
              Back to home
            </span>
          </Link>
        </div>

        {/* Hero parallax — image covers right 60%, pink on left */}
        <section className="parallax-section dark-bg parallax-sec-half-right relative float-left w-full overflow-hidden py-[120px]">
          <div
            className="bg par-elem"
            style={{ backgroundImage: "url(/images/bg/1.jpg)" }}
          />
          <div className="overlay" />
          <div className="pattern-bg" />

          <div className="max-w-[1224px] w-[92%] mx-auto relative z-5">
            {/* section-title style: yellow left bar, logo + tagline */}
            <div className="relative pl-[50px] py-5 mb-[50px] text-left
              before:content-[''] before:absolute before:top-0 before:left-[-2px] before:w-1 before:h-full before:bg-brand-yellow">
              <Image src="/images/logo2.png" alt="Video Force" width={200} height={60} />
              <p className="text-white/70 mt-3">
                Contact us today for an exciting collaboration on video content and more.
              </p>
              {/* .horizonral-subtitle */}
              <div className="horizonral-subtitle"><span>Contacts</span></div>
            </div>
          </div>

          <Link className="hero-start-link" href="#sec1">
            <span>Let&apos;s Start</span>
          </Link>
        </section>

        {/* Contact details + form */}
        <section id="sec1" className="relative float-left w-full py-[110px] bg-white overflow-hidden">
          <SectionTitle subtitle="Get in Touch //" />

          <div className="max-w-[1224px] w-[92%] mx-auto relative z-5">
            {/* Contact info cards */}
            <div className="float-left w-full relative mb-[50px]">
              <div className="flex flex-wrap mx-[-15px]">
                {[
                  { num: "01", label: "Phone",    value: "+254701850850",               href: "tel:+254701850850" },
                  { num: "02", label: "Location", value: "7TH FLOOR, MITSUMI BUSINESS PARK, MUTHITHI ROAD, WESTLANDS NAIROBI", href: "#" },
                  { num: "03", label: "Email",    value: "strategic@videoforce.co.ke",  href: "mailto:strategic@videoforce.co.ke" },
                ].map(({ num, label, value, href }) => (
                  <div
                    key={label}
                    className="relative py-[15px] pl-[100px] pr-0 w-full px-[15px] md:w-1/2 lg:w-1/3"
                  >
                    {/* icon placeholder */}
                    <div className="absolute left-[40px] top-[20px] w-8 h-8 rounded-full border border-brand-yellow flex items-center justify-center text-brand-yellow text-xs font-bold">
                      {num}
                    </div>
                    <h3 className="text-left font-semibold text-[18px] pb-[18px] relative text-brand-purple
                      before:content-[''] before:absolute before:bottom-1 before:left-0 before:w-[30px] before:h-0.5 before:bg-brand-yellow">
                      {label}
                    </h3>
                    <a href={href} className="text-sm">{value}</a>
                  </div>
                ))}
              </div>
            </div>

            {/* Get In Touch form */}
            <div className="float-left w-full relative mt-[50px]">
              <div className="flex flex-wrap mx-[-15px]">
                <div className="w-full px-[15px] md:w-1/4">
                  <div className="float-left w-full relative">
                    <h3 className="float-left text-[24px] text-left font-bold text-brand-purple">
                      Get In Touch
                    </h3>
                    <span className="float-left w-full pt-[10px] text-[11px] leading-6 pb-[10px] font-medium text-[#131212] text-left">
                      We will get back to you within 1 business day.
                    </span>
                  </div>
                </div>
                <div className="w-full px-[15px] md:w-7/12">
                  <ContactForm />
                </div>
              </div>
            </div>

            {/* Decorative circle modules */}
            {[
              { left: "20%", top: "70%" },
              { left: "70%", top: "40%" },
              { left: "80%", top: "80%" },
              { left: "40%", top: "95%" },
            ].map(({ left, top }, i) => (
              <div
                key={i}
                className="absolute w-[50px] h-[50px] rounded-full border border-black/[0.09] bg-transparent"
                style={{ left, top }}
              />
            ))}

            <div className="sec-lines" />
          </div>
        </section>

        {/* Social CTA strip */}
        <section className="bg-[#480f66] py-[70px] relative float-left w-full overflow-hidden">
          <div className="max-w-[1224px] w-[92%] mx-auto relative z-5">
            <div className="flex flex-wrap mx-[-15px] items-center">
              <div className="w-full px-[15px] md:w-2/3">
                <h3 className="float-left text-white text-[18px] font-semibold relative pl-[30px]
                  before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-5 before:h-0.5 before:bg-brand-yellow before:-translate-y-1/2">
                  Connect with us on social media:
                </h3>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
