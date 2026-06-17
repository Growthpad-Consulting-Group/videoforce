import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Icon } from "@iconify/react";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      id="main"
      className="h-full w-full absolute top-0 left-0 z-[2]"
    >
      <Header />
      <div id="wrapper" className="relative float-left w-full z-[3] pl-[80px] max-md:pl-0">
        {children}
      </div>
      <Footer />

      <a
        className="fixed top-0 right-0 text-[18px] text-white w-[80px] h-[80px] leading-[80px] text-center z-[110] cursor-pointer transition-all duration-200 bg-brand-yellow group"
        href="/contacts"
        aria-label="Get in Touch"
      >
        <Icon icon="fa6-regular:envelope" className="inline-block align-middle" />
        <span className="absolute h-[50px] leading-[50px] right-0 top-[80px] px-[30px] text-[10px] uppercase tracking-[2px] min-w-[150px] bg-[#480f66] mt-[10px] opacity-0 invisible transition-all duration-300 group-hover:mt-0 group-hover:opacity-100 group-hover:visible">
          Get in Touch
        </span>
      </a>
    </div>
  );
}
