"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { clients } from "@/data/clients";
import Image from "next/image";

const TESTIMONIAL_VIDEOS = ["gvTdspVmzF8", "XTlSYy5qpSo", "2wdwxCbrfxk"];

export default function Testimonials() {
  return (
    <section id="sec6" className="relative float-left w-full py-[110px] bg-white overflow-hidden">
      <SectionTitle
        subtitle="Testimonials //"
        eyebrow="Reviews"
        titleHtml='Clients and <span>Testimonials</span>'
        description="At the heart of our work is a great desire to deliver unmatched quality work and exceptional client experiences. We work across Africa and with capabilities that can deliver your messages to audiences across the globe."
      />

      <div className="max-w-[1224px] w-[92%] mx-auto relative z-5">
        {/* Video grid — 3 columns, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-[60px]">
          {TESTIMONIAL_VIDEOS.map((id) => (
            <div key={id}>
              <iframe
                title={`Client testimonial ${id}`}
                src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="w-full h-[300px] border-0 block"
              />
            </div>
          ))}
        </div>

        {/* Client logos */}
        <ul className="flex flex-wrap list-none p-0 m-0 justify-center">
          {clients.map((client) => (
            <li
              key={client.filename}
              className="w-[9.6%] p-5 flex items-center justify-center max-md:w-1/4 max-sm:w-1/3 [&:hover_img]:opacity-50"
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Image
                  src={`/images/clients/${client.filename}`}
                  alt={client.name}
                  width={110}
                  height={55}
                  className="max-w-[110px] w-auto h-[50px] object-contain"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
