import Image from "next/image";
import Link from "next/link";

interface Props {
  watermark: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function BlogSubpageChrome({
  watermark,
  title,
  description,
  children,
}: Props) {
  return (
    <div className="pt-[80px]" id="wrapper">
      <div className="float-left w-full relative pl-[80px] z-5 max-md:pl-0">
        <div className="fixed top-0 left-[80px] right-0 h-[80px] z-[14] bg-[#480f66] max-md:left-0" />
        <div className="fixed top-0 left-[80px] right-0 h-[80px] z-[14] flex items-center max-md:left-0">
          <Link href="/" className="ml-[50px] text-left relative">
            <span className="font-semibold uppercase text-[10px] tracking-[2px] text-[#e4dfdf]">
              Back to home
            </span>
          </Link>
        </div>

        <section className="parallax-section dark-bg parallax-sec-half-right relative float-left w-full overflow-hidden py-[120px]">
          <div className="bg par-elem" style={{ backgroundImage: "url(/images/bg/1.jpg)" }} />
          <div className="overlay" />
          <div className="pattern-bg" />
          <div className="max-w-[1224px] w-[92%] mx-auto relative z-5">
            <div
              className="relative pl-[50px] py-5 mb-[50px] text-left
              before:content-[''] before:absolute before:top-0 before:left-[-2px] before:w-1 before:h-full before:bg-brand-yellow"
            >
              <Image src="/images/logo2.png" alt="Video Force" width={200} height={60} />
              <h1 className="text-white text-2xl md:text-3xl font-semibold mt-4">{title}</h1>
              {description && (
                <p className="text-white/70 mt-3 max-w-2xl">{description}</p>
              )}
              <div className="horizonral-subtitle">
                <span>{watermark}</span>
              </div>
            </div>
          </div>
        </section>

        {children}
      </div>
    </div>
  );
}
