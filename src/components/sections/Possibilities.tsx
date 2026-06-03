import { Icon } from "@iconify/react";

const STATS = [
  { num: "400", label: "Videos Produced" },
  { num: "100", label: "Clients" },
  { num: "5",   label: "Years Experience" },
  { num: "10",  label: "Team Members" },
];

export default function Possibilities() {
  return (
    <section
      style={{
        position: "relative",
        float: "left" as const,
        width: "100%",
        padding: "120px 0",
        background: "#bb0168",
        overflow: "hidden",
      }}
    >
      {/* Background image — covers right 60% only, matches parallax-sec-half-right */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "60%",
          height: "120%",
          backgroundImage: "url(/images/bg/1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 1,
        }}
      />
      {/* Dark overlay over the right image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "60%",
          height: "100%",
          background: "#000",
          opacity: 0.5,
          zIndex: 2,
        }}
      />

      {/* "NUMBERS" large rotated watermark — positioned on left edge, partially visible */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            display: "block",
            textTransform: "uppercase" as const,
            fontWeight: 900,
            fontSize: 120,
            letterSpacing: 6,
            transform: "rotate(-90deg)",
            transformOrigin: "left center",
            color: "rgba(255,255,255,0.15)",
            whiteSpace: "nowrap" as const,
            lineHeight: 1,
          }}
        >
          NUMBERS
        </span>
      </div>

      {/* Content — sits on left over pink background */}
      <div className="container" style={{ position: "relative", zIndex: 5 }}>
        <div
          style={{
            paddingLeft: 50,
            marginBottom: 50,
            textAlign: "left" as const,
            position: "relative" as const,
          }}
        >
          {/* section-title bar removed — this section has no left accent bar */}


          <h2
            style={{
              fontSize: 40,
              fontFamily: "'Poppins', sans-serif",
              textTransform: "uppercase" as const,
              fontWeight: 800,
              color: "#fff",
              position: "relative",
              paddingBottom: 30,
            }}
          >
            DIVE INTO ENDLESS <br />
            <span style={{ color: "#fac921" }}>POSSIBILITIES,</span> ONE <br />
            FRAME AT A TIME
          </h2>

          <p style={{ color: "#fff", fontSize: 14, lineHeight: "30px", textAlign: "left" }}>
            Video is one of the most versatile and impactful mediums out there.
            At Video Force, we help clients harness the potential of video for:
          </p>

          <ul style={{ color: "#fff", fontSize: 16, lineHeight: "30px", paddingLeft: 0, listStyle: "none", textAlign: "left" }}>
            <li>
              <Icon icon="fa6-solid:rocket" style={{ marginRight: 8, color: "#fac921" }} />
              <span style={{ color: "#fac921" }}>Launching Products - </span>
              Make a splash when unveiling your latest product, service, or initiative.
              Our launch videos generate buzz and excite audiences.
            </li>
            <li>
              <Icon icon="fa6-solid:bullhorn" style={{ marginRight: 8, color: "#fac921" }} />
              <span style={{ color: "#fac921" }}>Advertising - </span>
              Expand your reach and drive real results with targeted video ad campaigns
              across social media and YouTube.
            </li>
            <li>
              <Icon icon="fa6-solid:hand-holding-heart" style={{ marginRight: 8, color: "#fac921" }} />
              <span style={{ color: "#fac921" }}>Fundraising - </span>
              Tug at heartstrings and open wallets by sharing your cause through
              creative and inspiring fundraising videos.
            </li>
            <li>
              <Icon icon="fa6-solid:chalkboard" style={{ marginRight: 8, color: "#fac921" }} />
              <span style={{ color: "#fac921" }}>Educating - </span>
              Foster deeper understanding and boost engagement with informative,
              entertaining explainer videos.
            </li>
          </ul>

          <p style={{ color: "#fff", fontSize: 14, lineHeight: "30px", textAlign: "left", marginTop: 12 }}>
            We collaborate closely to create custom video content that delivers
            on your unique goals.
          </p>
        </div>

        {/* Stat counters */}
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0 40px", position: "relative", zIndex: 5 }}>
          {STATS.map(({ num, label }) => (
            <div
              key={label}
              style={{ padding: "0 20px", textAlign: "left", marginBottom: 20 }}
            >
              <div style={{ fontSize: 44, fontWeight: 700, color: "#fff" }}>
                {num}+
              </div>
              <div
                style={{
                  marginTop: 6,
                  color: "rgba(255,255,255,0.51)",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: 2,
                  textTransform: "uppercase" as const,
                  padding: "12px 30px",
                  background: "rgba(51,51,51,0.31)",
                  position: "relative",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
