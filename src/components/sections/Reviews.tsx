"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

const TESTIMONIAL_VIDEOS = ["gvTdspVmzF8", "XTlSYy5qpSo", "2wdwxCbrfxk"];

export default function Reviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="sec5">
      {/* Clutch widget */}
      <div
        style={{ marginLeft: "10%", marginRight: "10%" }}
        dangerouslySetInnerHTML={{
          __html: `
            <script type="text/javascript" src="https://widget.clutch.co/static/js/widget.js"></script>
            <div class="clutch-widget"
              data-url="https://widget.clutch.co"
              data-widget-type="8"
              data-expandifr="true"
              data-height="auto"
              data-clutchcompany-id="1367697">
            </div>
          `,
        }}
      />
    </section>
  );
}
