import SectionTitle from "@/components/ui/SectionTitle";
import { Icon } from "@iconify/react";

const STEPS = [
  { icon: "fa6-solid:robot",           title: "Your idea meets us",    subtitle: "Idea gathering",          description: "We get together to explore your idea, deliver your schedule, learn about your explainer needs and ask some exploratory questions.", num: "01" },
  { icon: "fa6-regular:laptop",        title: "Concept development",   subtitle: "Brainstorming the idea",  description: "The team enters the brainstorming shrine, testing out countless ideas and approaches until we find the perfect tone, style, and message.", num: "02" },
  { icon: "fa6-solid:pencil",          title: "Storyboard",            subtitle: "Creativity at work",      description: "A quiet descends over the studio as our writers plunge into the fickle creative abyss of wordsmithing and language wrangling and storyboarding.", num: "03" },
  { icon: "fa6-solid:film",            title: "Production",            subtitle: "Converting idea to video", description: "Our world-class team bring the visuals and dialogue to life, adding character, visual styles, voice over, motion, and graphics.", num: "04" },
  { icon: "fa6-solid:flag-checkered",  title: "Final Video",           subtitle: "Video release",           description: "We'll serve you up your video in any format you like — social, WhatsApp, TV, etc.", num: "05" },
];

function StepCard({ step, isLast }: { step: typeof STEPS[0]; isLast?: boolean }) {
  return (
    <div className="flex flex-col w-full">
      {/* Icon + title row */}
      <div className="flex items-center gap-4 mb-3">
        {/* Icon block with yellow line decorations */}
        <div className="relative shrink-0 w-20">
          <div className="absolute top-1/2 -left-2 -right-2 -translate-y-1/2 flex flex-col gap-1 z-0">
            {[0,1,2].map(i => <div key={i} className="h-[3px] bg-brand-yellow/50 w-4/5" />)}
          </div>
          <div className="relative z-[1] w-[70px] h-[60px] flex items-center justify-center">
            <Icon icon={step.icon} className="text-[48px] text-brand-purple" />
          </div>
        </div>
        {/* Title banner */}
        <div className="bg-[#f0f0f0] py-[10px] px-5 flex-1 font-semibold text-base text-[#333]">
          {step.title}
        </div>
      </div>

      {/* Detail card */}
      <div className="bg-white border border-[#eee] p-6 pb-[60px] relative flex-1 min-h-[220px]">
        <p className="text-brand-purple italic font-medium text-sm mb-4 text-left">{step.subtitle}</p>
        <p className="text-[#555] text-[13px] leading-6 text-left">{step.description}</p>
        {/* Step number watermark */}
        <div className="absolute bottom-4 left-4 text-[52px] font-bold text-black/[0.06] leading-none">{step.num}.</div>
        {/* Bottom dotted line + arrow */}
        <div className="absolute bottom-6 left-[80px] right-4 flex items-center justify-end gap-2">
          <div className="flex-1 border-b border-dotted border-[#ccc]" />
          {isLast
            ? <span className="text-brand-purple text-sm">✓</span>
            : <span className="text-brand-purple text-sm font-bold">»</span>
          }
        </div>
      </div>
    </div>
  );
}

export default function Process() {
  return (
    <section className="relative float-left w-full py-[110px] bg-white overflow-hidden">
      <SectionTitle subtitle="HOW WE WORK" />

      <div className="max-w-[1224px] w-[92%] mx-auto relative z-5">
        <SectionTitle
          eyebrow="How We Work"
          titleHtml='Our Production <span>Process</span>'
          description="Below are the stages we consider to deliver quality services to our clients"
        />

        {/* Steps grid — 3 cols desktop, 1 col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 clear-both">
          {STEPS.slice(0, 3).map((step) => <StepCard key={step.num} step={step} />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 clear-both">
          {STEPS.slice(3).map((step, i) => <StepCard key={step.num} step={step} isLast={i === 1} />)}
        </div>
      </div>
    </section>
  );
}
