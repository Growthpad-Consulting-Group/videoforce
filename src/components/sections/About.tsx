import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";

export default function About() {
  return (
    <section id="sec2">
      <SectionTitle subtitle="// Words About" />

      <div className="max-w-[1224px] w-[92%] mx-auto relative z-5">
        <div className="flex flex-wrap -mx-[15px]">

          {/* Collage image column */}
          <div className="w-full px-[15px] md:w-5/12">
            {/*
              .collage-image: padding-left 20px, relative
              ::before: absolute yellow block behind image (top:50px left:-50px right:0 bottom:50px bg-brand-yellow z-1)
            */}
            <div className="relative float-left w-full pl-5 before:content-[''] before:absolute before:top-[50px] before:left-0 md:before:left-[-50px] before:right-0 before:bottom-[50px] before:z-[1] before:bg-brand-yellow">
              {/* .collage-image-title */}
              <div
                className="hidden md:block absolute top-[80px] left-[-20px] text-xs uppercase z-[3] text-white/70 font-medium bg-[#480f66] py-[15px] pl-[55px] pr-[85px] tracking-[15px]"
                data-y="150"
              >
                VideoForce.
              </div>
              <Image
                src="/images/all/1.jpg"
                alt="Animators in Kenya"
                width={600}
                height={450}
                className="relative z-[2] w-full h-auto"
              />
            </div>
          </div>

          {/* Text column — .main-about */}
          <div className="w-full px-[15px] md:w-7/12">
            <div className="float-left w-full relative pl-[30px]">
              {/* .main-about h5 */}
              <h5 className="text-left font-semibold text-base text-[#480f66] leading-4 relative pb-4">
                From script to screen. (And everything in-between)
              </h5>
              {/* .main-about h2 */}
              <h2 className="text-left font-bold text-[34px] text-[#bb0168] pb-[30px] relative before:content-[''] before:absolute before:bottom-[15px] before:left-0 before:w-[50px] before:h-0.5 before:bg-[#fac921]">
                Professional Video Production Tailored for the Digital Age
              </h2>
              {/* .main-about p */}
              <p className="text-left text-[15px] font-light">
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

      {/* Decorative parallax circle modules — .bg-parallax-module */}
      <div
        className="absolute w-[50px] h-[50px] rounded-full border border-black/[0.09] bg-transparent"
        style={{ top: "90%", left: "25%" }}
        data-y="-250"
      />
      <div
        className="absolute w-[50px] h-[50px] rounded-full border border-black/[0.09] bg-transparent"
        style={{ top: "70%", left: "70%" }}
        data-y="150"
      />

      {/* .sec-lines — keep class, animation keyframes live in globals @theme */}
      <div className="sec-lines">
        <div className="container full-height">
          {[...Array(5)].map((_, i) => <div key={i} className="line-item" />)}
        </div>
      </div>
    </section>
  );
}
