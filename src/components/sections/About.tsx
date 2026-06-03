import Image from "next/image";

export default function About() {
  return (
    <section id="sec2">
      <div className="section-subtitle">
        <span>//</span>Words About
      </div>
      <div className="container">
        <div className="row">
          {/* Collage image column */}
          <div className="col-md-5">
            <div className="collage-image fl-wrap">
              <div className="collage-image-title" data-y="150">
                VideoForce.
              </div>
              <Image
                src="/images/all/1.jpg"
                className="respimg"
                alt="Animators in Kenya"
                width={600}
                height={450}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>

          {/* Text column */}
          <div className="col-md-7">
            <div className="main-about fl-wrap">
              <h5>From script to screen. (And everything in-between)</h5>
              <h2>
                Professional Video Production Tailored for the Digital Age
              </h2>
              <p style={{ fontSize: 15, fontWeight: 300 }}>
                We&apos;re Video Force — a passion-driven video production agency based
                in Nairobi. For the past 5 years, we&apos;ve been helping brands craft
                compelling stories that resonate with modern audiences through the
                power of sight and sound. Whether you need to explain a complex
                product, produce training content, share an inspiring story, or simply
                get more eyeballs, we&apos;ll work with you to create videos that inform,
                engage, excite, and inspire action.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative parallax modules */}
      <div
        className="bg-parallax-module"
        style={{ top: "90%", left: "25%" }}
        data-y="-250"
      />
      <div
        className="bg-parallax-module"
        style={{ top: "70%", left: "70%" }}
        data-y="150"
      />
      <div className="sec-lines">
        <div className="container full-height">
          {[...Array(5)].map((_, i) => <div key={i} className="line-item" />)}
        </div>
      </div>
    </section>
  );
}
