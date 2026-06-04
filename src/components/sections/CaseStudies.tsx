"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { caseStudies } from "@/data/caseStudies";
import { Icon } from "@iconify/react";

export default function CaseStudies() {
  return (
    <section id="sec4">
      <SectionTitle subtitle="Our Work //" />

      <div className="max-w-[1224px] w-[92%] mx-auto relative z-5">
        {/* .main-about heading */}
        <div className="float-left w-full relative pl-[30px] mb-8">
          <h5 className="text-left font-semibold text-sm text-[#480f66] pb-3">Case Studies</h5>
          <h2 className="text-left font-bold text-[34px] text-[#bb0168] pb-[30px] relative before:content-[''] before:absolute before:bottom-[15px] before:left-0 before:w-[50px] before:h-0.5 before:bg-[#fac921]">
            Our Work
          </h2>
        </div>

        {/* Filter bar — .filter-holder */}
        <div className="flex items-center gap-5 mb-[50px] float-left w-full relative">
          {/* .filter-button */}
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[2px] text-[#480f66]">
            <Icon icon="fa6-regular:filter" className="text-[#fac921]" />
            <span>Filter : </span>
          </div>
          {/* .gallery-filters */}
          <div className="flex">
            <a
              href="#"
              className="px-5 py-2 text-[#fac921] font-semibold text-[10px] uppercase tracking-[2px] relative
                before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[15px] before:h-0.5 before:-translate-y-1/2 before:bg-black/10 before:z-[1]
                after:content-[''] after:absolute after:top-1/2 after:left-0 after:w-[15px] after:h-0.5 after:-translate-y-1/2 after:bg-[#bb0168] after:z-[2] after:transition-all after:duration-300"
              data-filter="*"
            >
              All
            </a>
          </div>
          {/* counter */}
          <div className="text-xs text-[#480f66]/50 ml-auto">
            <span>{caseStudies.length}</span>
            <span> / </span>
            <span>{caseStudies.length}</span>
          </div>
        </div>

        {/* Video grid — .gallery-items three-column */}
        <div className="float-left w-full relative">
          <div className="flex flex-wrap">
            {caseStudies.map((study) => (
              /* .gallery-item — w-1/3, float left, overflow hidden */
              <div
                key={study.videoId}
                className="w-full md:w-1/2 lg:w-1/3 relative float-left overflow-hidden p-[6px]"
              >
                {/* .grid-item-holder */}
                <div className="float-left w-full h-auto relative overflow-hidden">
                  <iframe
                    className="w-full h-[300px] border-0"
                    frameBorder={0}
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    title={`Case study video ${study.videoId}`}
                    src={`https://www.youtube.com/embed/${study.videoId}?autoplay=0&fs=1&iv_load_policy=3&showinfo=1&rel=0&cc_load_policy=0`}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* .sec-lines decorator */}
      <div className="sec-lines">
        <div className="container full-height">
          {[...Array(5)].map((_, i) => <div key={i} className="line-item" />)}
        </div>
      </div>
    </section>
  );
}
