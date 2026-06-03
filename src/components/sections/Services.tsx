import SectionTitle from "@/components/ui/SectionTitle";
import { services } from "@/data/services";
import { Icon } from "@iconify/react";

export default function Services() {
  return (
    <section id="sec3">
      <SectionTitle subtitle="Our Services //" />

      <div className="max-w-[1224px] w-[92%] mx-auto relative z-5">
        {/* .main-about heading */}
        <div className="float-left w-full relative pl-[30px] mb-8">
          <h5 className="text-left font-semibold text-base text-brand-purple pb-4">
            What We Offer
          </h5>
          <h2 className="text-left font-bold text-[34px] text-brand-pink pb-[30px] relative before:content-[''] before:absolute before:bottom-[15px] before:left-0 before:w-[50px] before:h-0.5 before:bg-brand-yellow">
            Our Services
          </h2>
        </div>

        <div className="flex flex-wrap mx-[-15px]">
          {services.map((service) => (
            <div
              key={service.title}
              className="relative py-[15px] pl-[100px] pr-0 w-full px-[15px] md:w-1/2 lg:w-1/3"
            >
              <div className="absolute left-[40px] top-[20px]">
                <Icon icon={service.icon} className="text-[34px] text-brand-purple" />
              </div>
              <h3 className="text-left font-semibold text-[18px] pb-[18px] relative text-brand-purple
                before:content-[''] before:absolute before:bottom-1 before:left-0 before:w-[30px] before:h-0.5 before:bg-brand-yellow">
                {service.title}
              </h3>
              <p className="text-left">{service.description}</p>
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
