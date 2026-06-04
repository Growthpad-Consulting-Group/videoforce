"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const TESTIMONIAL_VIDEOS = ["gvTdspVmzF8", "XTlSYy5qpSo", "2wdwxCbrfxk"];

const CLUTCH_WIDGET_HTML = `
  <script type="text/javascript" src="https://widget.clutch.co/static/js/widget.js"></script>
  <div class="clutch-widget"
    data-url="https://widget.clutch.co"
    data-widget-type="8"
    data-expandifr="true"
    data-height="auto"
    data-clutchcompany-id="1367697">
  </div>
`;

export default function Reviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const [showClutchWidget, setShowClutchWidget] = useState(false);

  useEffect(() => {
    setShowClutchWidget(true);
  }, []);

  return (
    <section id="sec5">
      <div style={{ marginLeft: "10%", marginRight: "10%" }}>
        {showClutchWidget && (
          <div dangerouslySetInnerHTML={{ __html: CLUTCH_WIDGET_HTML }} />
        )}
      </div>
    </section>
  );
}
