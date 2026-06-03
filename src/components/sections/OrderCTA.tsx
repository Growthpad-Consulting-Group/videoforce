import Link from "next/link";

export default function OrderCTA() {
  return (
    <section className="dark-bg2 small-padding order-wrap">
      <div className="container">
        <div className="row" style={{ alignItems: "center" }}>
          <div className="col-md-8">
            <h3
              style={{
                color: "#fff",
                fontWeight: 600,
                fontSize: 22,
                textAlign: "left",
              }}
            >
              Ready To order Your Project ?
            </h3>
          </div>
          <div className="col-md-4">
            <Link href="/contacts" className="btn flat-btn color-btn">
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
