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
    <div className="single-page-wrap" id="wrapper">
      <div className="content">

        {/* Single page top bar */}
        <div className="single-page-decor" />
        <div className="single-page-fixed-row">
          <div className="scroll-down-wrap">
            <div className="mousey"><div className="scroller" /></div>
            <span>Scroll Down</span>
          </div>
          <Link className="single-page-fixed-row-link" href="/">
            <span>Back to home</span>
          </Link>
        </div>

        {/* Hero — parallax-sec-half-right: image on right, pink on left */}
        <section className="parallax-section dark-bg sec-half parallax-sec-half-right">
          <div
            className="bg par-elem"
            style={{ backgroundImage: "url(/images/bg/1.jpg)" }}
          />
          <div className="overlay" />
          <div className="pattern-bg" />

          <div className="container">
            <div className="section-title">
              <Image
                src="/images/logo2.png"
                alt="Video Force"
                width={200}
                height={60}
              />
              <p>Contact us today for an exciting collaboration on video content and more.</p>
              <div className="horizonral-subtitle"><span>Contacts</span></div>
            </div>
          </div>

          <Link className="custom-scroll-link hero-start-link" href="#sec1">
            <span>Let&apos;s Start</span>
          </Link>
        </section>

        {/* Contact details + form */}
        <section id="sec1">
          <div className="section-subtitle">
            Get in Touch<span>{"//"}</span>
          </div>

          <div className="container">
            {/* Contact info boxes */}
            <div className="fl-wrap mar-bottom">
              <div className="row">
                <div className="col-md-12">
                  <div className="features-box-container single-serv fl-wrap">
                    <div className="row">
                      <div className="features-box col-md-4">
                        <div className="time-line-icon" />
                        <h3>01. Phone</h3>
                        +254701850850
                      </div>
                      <div className="features-box col-md-4">
                        <div className="time-line-icon" />
                        <h3>02. Location</h3>
                        <a href="#">7TH FLOOR, MITSUMI BUSINESS PARK, MUTHITHI ROAD, WESTLANDS NAIROBI</a>
                      </div>
                      <div className="features-box col-md-4">
                        <div className="time-line-icon" />
                        <h3>03. Email</h3>
                        <a href="mailto:strategic@videoforce.co.ke">strategic@videoforce.co.ke</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="fl-wrap mar-top">
              <div className="row">
                <div className="col-md-3">
                  <div className="pr-title fl-wrap">
                    <h3>Get In Touch</h3>
                    <span>We will get back to you within 1 business day.</span>
                  </div>
                </div>
                <div className="col-md-7">
                  <ContactForm />
                </div>
              </div>
            </div>

            {/* Decorative modules */}
            <div className="bg-parallax-module" style={{ left: "20%", top: "70%" }} />
            <div className="bg-parallax-module" style={{ left: "70%", top: "40%" }} />
            <div className="bg-parallax-module" style={{ left: "80%", top: "80%" }} />
            <div className="bg-parallax-module" style={{ left: "40%", top: "95%" }} />
            <div className="sec-lines" />
          </div>
        </section>

        {/* Social CTA strip */}
        <section className="dark-bg2 small-padding order-wrap">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <h3>Connect with us on social media :</h3>
              </div>
              <div className="col-md-4">
                <ul />
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
