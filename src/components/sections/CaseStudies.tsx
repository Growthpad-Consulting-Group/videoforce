"use client";

import { caseStudies } from "@/data/caseStudies";
import { Icon } from "@iconify/react";

export default function CaseStudies() {
  return (
    <section id="sec4">
      <div className="section-subtitle">
        Our Work <span>//</span>
      </div>
      <div className="container">
        <div className="main-about fl-wrap">
          <h5>Case Studies</h5>
          <h2>Our Work</h2>
        </div>

        {/* Filter bar */}
        <div className="filter-holder inline-filter fl-wrap mar-bottom">
          <div className="filter-button">
            <Icon icon="fa6-regular:filter" />
            <span>Filter : </span>
          </div>
          <div className="gallery-filters">
            <a href="#" className="gallery-filter gallery-filter-active" data-filter="*">
              All
            </a>
          </div>
          <div className="folio-counter">
            <div className="num-album">{caseStudies.length}</div>
            <div className="all-album">{caseStudies.length}</div>
          </div>
        </div>

        {/* Video grid */}
        <div className="gallery-items spad vis-box-det white-det three-column">
          {caseStudies.map((study) => (
            <div key={study.videoId} className="gallery-item">
              <div className="grid-item-holder">
                <iframe
                  className="casevid"
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
      <div className="sec-lines">
        <div className="container full-height">
          {[...Array(5)].map((_, i) => <div key={i} className="line-item" />)}
        </div>
      </div>
    </section>
  );
}
