"use client";

import { clients } from "@/data/clients";
import Image from "next/image";

const TESTIMONIAL_VIDEOS = ["gvTdspVmzF8", "XTlSYy5qpSo", "2wdwxCbrfxk"];

export default function Testimonials() {
  return (
    <section id="sec6">
      <div className="section-subtitle">
        Testimonials <span>{"//"}</span>
      </div>

      <div className="container">
        {/* Heading */}
        <div className="section-title fl-wrap">
          <h3>Reviews</h3>
          <h2>
            Clients and <span>Testimonials</span>
          </h2>
          <p>
            At the heart of our work is a great desire to deliver unmatched quality
            work and exceptional client experiences. We work across Africa and with
            capabilities that can deliver your messages to audiences across the globe.
          </p>
        </div>

        {/* Testimonial videos — 3-column grid inside container */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "16px",
            marginBottom: "60px",
            width: "100%",
          }}
        >
          {TESTIMONIAL_VIDEOS.map((id) => (
            <div key={id} style={{ width: "100%" }}>
              <iframe
                title={`Client testimonial ${id}`}
                src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                style={{
                  width: "100%",
                  height: 300,
                  border: 0,
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>

        {/* Client logos */}
        <ul className="client-list client-list-white">
          {clients.map((client) => (
            <li key={client.filename}>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Image
                  src={`/images/clients/${client.filename}`}
                  alt={client.name}
                  width={110}
                  height={55}
                  style={{ width: "auto", height: 50, objectFit: "contain" }}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
