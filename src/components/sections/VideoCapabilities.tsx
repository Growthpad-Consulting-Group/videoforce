const PIECHARTS = [
  { label: "Advertising", percent: 99 },
  { label: "Fundraising", percent: 99 },
  { label: "Educating", percent: 99 },
];

/** CSS donut ring matching the original easyPieChart style */
function DonutChart({ percent, label }: { percent: number; label: string }) {
  const SIZE = 150;
  const STROKE = 40;
  const R = (SIZE - STROKE) / 2;
  const CIRC = 2 * Math.PI * R;
  const filled = (percent / 100) * CIRC;
  // Small gap at top — start at -90deg (12 o'clock), leave ~2px gap
  const gap = 2;

  return (
    <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", marginRight: 90, marginBottom: 20 }}>
      {/* SVG donut */}
      <div style={{ position: "relative", width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} style={{ transform: "rotate(-90deg)" }}>
          {/* Background track */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke="#eee"
            strokeWidth={STROKE}
          />
          {/* Yellow filled arc */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke="#fac921"
            strokeWidth={STROKE}
            strokeDasharray={`${filled - gap} ${CIRC - (filled - gap)}`}
            strokeDashoffset={0}
            strokeLinecap="butt"
          />
        </svg>
        {/* Percentage label centered */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <span style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#480f66",
            fontFamily: "'Poppins', sans-serif",
          }}>
            {percent}%
          </span>
        </div>
      </div>

      {/* Label in bordered box below — matching original piechart h4 style */}
      <h4 style={{
        marginTop: 12,
        border: "1px solid #eee",
        padding: "6px 20px",
        fontSize: 12,
        fontWeight: 600,
        color: "#666",
        textTransform: "" as const,
        letterSpacing: 1,
        display: "inline-block",
        minWidth: 100,
        textAlign: "center" as const,
        background: "#fff",
      }}>
        {label}
      </h4>
    </div>
  );
}

export default function VideoCapabilities() {
  return (
    <section>
      <div className="section-subtitle right-pos">
        <span>{"//"}</span>attainments
      </div>

      <div className="container">
        <div className="fl-wrap mar-bottom skill-wrap">
          <div className="row">
            {/* Left description */}
            <div className="col-md-4">
              <div className="pr-title fl-wrap">
                <h3>Some of the capabilities of a video</h3>
                <span>
                  A video can be used in your business in the following
                  illustrated ways
                </span>
              </div>
            </div>

            {/* Right — donut charts */}
            <div className="col-md-8">
              <div style={{ display: "flex", flexWrap: "wrap" as const, alignItems: "flex-start", gap: 20 }}>
                {PIECHARTS.map(({ label, percent }) => (
                  <DonutChart key={label} percent={percent} label={label} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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
