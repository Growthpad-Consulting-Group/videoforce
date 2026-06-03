export default function Industries() {
  return (
    <section
      style={{
        position: "relative",
        float: "left" as const,
        width: "100%",
        padding: "120px 0",
        background: "#bb0168",  /* Pink solid on right side */
        overflow: "hidden",
      }}
    >
      {/* Background image — covers LEFT 60% only */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "60%",
          height: "120%",
          backgroundImage: "url(/images/bg/1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 1,
        }}
      />
      {/* Dark overlay over left image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "60%",
          height: "100%",
          background: "#000",
          opacity: 0.45,
          zIndex: 2,
        }}
      />

      {/* "POWER" rotated watermark on far left */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 3,
          pointerEvents: "none" as const,
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
            color: "rgba(255,255,255,0.1)",
            whiteSpace: "nowrap" as const,
            lineHeight: 1,
          }}
        >
          POWER
        </span>
      </div>

      {/* Content — sits on RIGHT 40% over the pink background */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          marginLeft: "60%",           /* Push past the image */
          paddingLeft: "5%",
          paddingRight: "2%",
          maxWidth: "40%",
        }}
      >
        <h2
          style={{
            fontSize: 36,
            fontFamily: "'Poppins', sans-serif",
            textTransform: "uppercase" as const,
            fontWeight: 800,
            color: "#fff",
            paddingBottom: 24,
          }}
        >
          Industries <span style={{ color: "#fac921" }}>We</span> Work{" "}
          <span style={{ color: "#fac921" }}>in</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.71)", fontSize: 14, lineHeight: "26px", textAlign: "left" }}>
          Agriculture, Banking, Technology, Saas, Energy, Manufacturing, FMCG,
          <br />
          Medicine, Education, Media, Construction, and more.
        </p>
      </div>
    </section>
  );
}
