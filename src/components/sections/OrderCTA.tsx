import Button from "@/components/ui/Button";

export default function OrderCTA() {
  return (
    /* dark-bg2 = bg-brand-purple2, small-padding = py-[70px] */
    <section className="bg-[#480f66] py-[70px] relative float-left w-full overflow-hidden">
      <div className="max-w-[1224px] w-[92%] mx-auto relative z-5">
        <div className="flex flex-wrap mx-[-15px] items-center">
          <div className="w-full px-[15px] md:w-2/3">
            {/* .order-wrap h3 style: float-left, white, pl-[30px], yellow left line */}
            <h3 className="float-left text-white text-[18px] font-semibold relative pl-[30px]
              before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-5 before:h-0.5 before:bg-brand-yellow before:-translate-y-1/2">
              Ready To Order Your Project?
            </h3>
          </div>
          <div className="w-full px-[15px] md:w-1/2 lg:w-1/3">
            <Button variant="color" href="/contacts">
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
