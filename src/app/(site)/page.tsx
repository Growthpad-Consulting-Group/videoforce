import About from "@/components/sections/About";
import Capabilities from "@/components/sections/Capabilities";
import CaseStudies from "@/components/sections/CaseStudies";
import Industries from "@/components/sections/Industries";
import OrderCTA from "@/components/sections/OrderCTA";
import Possibilities from "@/components/sections/Possibilities";
import Process from "@/components/sections/Process";
import Reviews from "@/components/sections/Reviews";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import VideoCapabilities from "@/components/sections/VideoCapabilities";
import Hero from "@/components/sections/Hero";
import ScrollSideNav from "@/components/ui/ScrollSideNav";
import type { Metadata } from "next";
import type { NavSection } from "@/types";

export const metadata: Metadata = {
  title: "Video Force Kenya - Leading Video Production Company in Kenya",
  description:
    "Video Force Kenya is a Nairobi-headquartered video production agency studio that specializes in professional video production, animation and livestreaming services.",
  keywords:
    "video production agencies in kenya, animation companies in kenya, live stream companies in kenya, Motion design companies in kenya, 3d animators in kenya, video force kenya",
  openGraph: {
    title: "Video Force Kenya - Leading Video Production Company in Kenya",
    description:
      "Professional video production, animation and livestreaming services based in Nairobi, Kenya.",
    url: "https://videoforce.co.ke",
    type: "website",
  },
};

const SECTIONS: NavSection[] = [
  { id: "sec1", label: "Home" },
  { id: "sec2", label: "About Us" },
  { id: "sec3", label: "Our Services" },
  { id: "sec4", label: "Case Studies" },
  { id: "sec5", label: "Reviews" },
  { id: "sec6", label: "Clients" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — sec1 */}
      <Hero />

      {/* Scroll side navigation — matches original scroll-nav-wrap */}
      <ScrollSideNav sections={SECTIONS} />

      {/* All content sections */}
      <div className="float-left w-full relative z-5 max-md:pl-0">
        {/* sec2 — About */}
        <About />

        {/* sec3 — Services */}
        <Services />

        {/* sec4 — Case Studies */}
        <CaseStudies />

        {/* Parallax "Possibilities" + stats section */}
        <Possibilities />

        {/* dark-bg section — Capabilities (GIF + skill bars) */}
        <Capabilities />

        {/* Production Process section */}
        <Process />

        {/* Industries We Work In parallax section */}
        <Industries />

        {/* Video capabilities / pie charts section */}
        <VideoCapabilities />

        {/* sec5 — Reviews (Clutch widget) */}
        <Reviews />

        {/* sec6 — Testimonials carousel + Client logos */}
        <Testimonials />

        {/* Ready To Order CTA */}
        <OrderCTA />
      </div>
    </>
  );
}
