import { Icon } from "@iconify/react";

const STEPS = [
  {
    icon: "fa6-solid:robot",
    title: "Your idea meets us",
    subtitle: "Idea gathering",
    description:
      "We get together to explore your idea, deliver your schedule, learn about your explainer needs and ask some exploratory questions.",
    num: "01",
  },
  {
    icon: "fa6-regular:laptop",
    title: "Concept development",
    subtitle: "Brainstorming the idea",
    description:
      "- The team enters the brainstorming shrine, testing out countless ideas and approaches until we find the perfect tone, style, and message.",
    num: "02",
  },
  {
    icon: "fa6-solid:flag-checkered",
    title: "Storyboard",
    subtitle: "Creativity at work",
    description:
      "A quiet descends over the studio as our writers plunge into the fickle creative abyss of wordsmithing and language wrangling and storyboarding.",
    num: "03",
  },
  {
    icon: "fa6-solid:flag-checkered",
    title: "Production",
    subtitle: "Converting idea to a video",
    description:
      "It's time to get moving! Our world-class team bring the visuals and dialogue to life, adding character, visual styles, voice over, motion, and graphics.",
    num: "04",
  },
  {
    icon: "fa6-solid:flag-checkered",
    title: "Final Video",
    subtitle: "Video release",
    description:
      "Captain, we have liftoff! We'll serve you up your video in any format you like either for social, WhatsApp, tv, etc.",
    num: "05",
  },
];

function StepCard({ step, isLast }: { step: (typeof STEPS)[0]; isLast?: boolean }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
    }}>
      {/* Top row: icon + title banner */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 12,
      }}>
        {/* Icon with yellow decorative lines behind */}
        <div style={{ position: "relative", flexShrink: 0, width: 80 }}>
          {/* Yellow horizontal lines decoration */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: -8,
            right: -8,
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            zIndex: 0,
          }}>
            {[1,2,3].map(i => (
              <div key={i} style={{
                height: 3,
                background: "#fac921",
                opacity: 0.5,
                width: "80%",
              }} />
            ))}
          </div>
          <div style={{
            position: "relative",
            zIndex: 1,
            width: 70,
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Icon icon={step.icon} style={{ fontSize: 48, color: "#480f66" }} />
          </div>
        </div>

        {/* Title on grey background */}
        <div style={{
          background: "#f0f0f0",
          padding: "10px 20px",
          flex: 1,
          fontWeight: 600,
          fontSize: 16,
          color: "#333",
        }}>
          {step.title}
        </div>
      </div>

      {/* Detail card */}
      <div style={{
        background: "#fff",
        border: "1px solid #eee",
        padding: "24px 20px 60px",
        position: "relative",
        flex: 1,
        minHeight: 220,
      }}>
        {/* Italic purple subtitle */}
        <p style={{
          color: "#480f66",
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: 14,
          marginBottom: 16,
          textAlign: "left",
        }}>
          {step.subtitle}
        </p>

        {/* Description */}
        <p style={{
          color: "#555",
          fontSize: 13,
          lineHeight: "24px",
          textAlign: "left",
        }}>
          {step.description}
        </p>

        {/* Step number bottom left */}
        <div style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          fontSize: 52,
          fontWeight: 700,
          color: "rgba(0,0,0,0.06)",
          fontFamily: "'Poppins', sans-serif",
          lineHeight: 1,
        }}>
          {step.num}.
        </div>

        {/* Dotted line + >> arrow bottom right */}
        <div style={{
          position: "absolute",
          bottom: 24,
          left: 80,
          right: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 8,
        }}>
          <div style={{
            flex: 1,
            borderBottom: "1px dotted #ccc",
          }} />
          {!isLast && (
            <span style={{ color: "#480f66", fontSize: 14, fontWeight: 700 }}>»</span>
          )}
          {isLast && (
            <span style={{ color: "#480f66", fontSize: 14 }}>✓</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Process() {
  return (
    <section style={{ background: "#fff", padding: "110px 0", position: "relative", display: "block", width: "100%", overflow: "hidden", boxSizing: "border-box" as const }}>
      <div className="section-subtitle" style={{ position: "absolute", top: 50, left: 40, opacity: 0.08, fontSize: 60, fontWeight: 900, textTransform: "uppercase" as const, color: "#ccc", whiteSpace: "nowrap" as const }}>
        HOW WE WORK
      </div>

      <div className="container">
        {/* Section heading */}
        <div className="section-title fl-wrap" style={{ paddingLeft: 50, marginBottom: 50, position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: -2, width: 4, height: "100%", background: "#fac921" }} />
          <h3 style={{ color: "#480f66", fontSize: 14, fontWeight: 600, paddingBottom: 16, textAlign: "left" }}>
            How We Work
          </h3>
          <h2 style={{ fontSize: 36, fontWeight: 800, textTransform: "uppercase" as const, color: "#333", textAlign: "left" }}>
            Our Production <span style={{ color: "#fac921" }}>Process</span>
          </h2>
          <p style={{ textAlign: "left", color: "#666", maxWidth: 550 }}>
            Below are the stages we consider to deliver quality services to our clients
          </p>
        </div>

        {/* Row 1: steps 1–3 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "24px",
          marginBottom: "24px",
          width: "100%",
          boxSizing: "border-box" as const,
          clear: "both" as const,
        }}>
          {STEPS.slice(0, 3).map((step) => (
            <StepCard key={step.num} step={step} />
          ))}
        </div>

        {/* Row 2: steps 4–5 starting from the left */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "24px",
          width: "100%",
          boxSizing: "border-box" as const,
          clear: "both" as const,
        }}>
          {STEPS.slice(3).map((step, i) => (
            <StepCard key={step.num} step={step} isLast={i === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
