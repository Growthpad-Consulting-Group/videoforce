import Image from "next/image";

const SKILLS = [
  { label: "Content strategy", percent: 99 },
  { label: "Content creation and production", percent: 99 },
  { label: "Content management", percent: 99 },
  { label: "Content distribution", percent: 99 },
];

export default function Capabilities() {
  return (
    <section className="dark-bg sinsec-dec sinsec-dec2">
      <div className="container">
        <div className="row">
          {/* Left — animated GIF */}
          <div className="col-md-6">
            <div className="video-box fl-wrap">
              <Image
                src="/images/all/2.gif"
                className="respimg"
                alt="Live streaming companies in Kenya"
                width={600}
                height={450}
                style={{ width: "100%", height: "auto" }}
                unoptimized
              />
            </div>
          </div>

          {/* Right — skill bars */}
          <div className="col-md-6">
            <div className="video-promo-text fl-wrap mar-top">
              <h3>OUR CAPABILITIES</h3>
              <p>
                We offer an end-to-end approach to the content lifecycle and cut
                through the complexity for improved speed to market and
                relevance, at scale.
              </p>

              <div className="skillbar-box animaper">
                {SKILLS.map((skill) => (
                  <div key={skill.label}>
                    <div className="custom-skillbar-title">
                      <span>{skill.label}</span>
                    </div>
                    <div className="skill-bar-percent">{skill.percent}%</div>
                    <div
                      className="skillbar-bg"
                      data-percent={`${skill.percent}%`}
                    >
                      <div
                        className="custom-skillbar"
                        style={{ width: `${skill.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative half-bg */}
      <div className="half-bg-dec single-half-bg-dec" />
      <div className="sec-lines">
        <div className="container full-height">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="line-item" />
          ))}
        </div>
      </div>
    </section>
  );
}
