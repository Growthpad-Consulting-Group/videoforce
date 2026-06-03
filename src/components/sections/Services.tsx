import { services } from "@/data/services";
import { Icon } from "@iconify/react";

export default function Services() {
  return (
    <section id="sec3">
      <div className="section-subtitle">
        Our Services <span>//</span>
      </div>
      <div className="container">
        <div className="main-about fl-wrap">
          <h5>What We Offer</h5>
          <h2>Our Services</h2>
        </div>
        <div className="row">
          {services.map((service) => (
            <div key={service.title} className="features-box col-md-4">
              <div className="time-line-icon">
                <Icon icon={service.icon} style={{ fontSize: 34, color: "#480f66" }} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
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
