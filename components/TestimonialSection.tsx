"use client";

import { useEffect, useRef, useState } from "react";
import { motion, cubicBezier } from "framer-motion";

const EASE = cubicBezier(0.16, 1, 0.3, 1);

/* Exact Figma Desktop-29 testimonial data (node 3311:61821 → 3321:66472). */
const CARDS: { quote: string; name: string; role: string }[] = [
  {
    quote: "“Nuton turned a 200-page textbook into a clear course I finished in a week. The structure helped me understand quickly!”",
    name: "Sara M.",
    role: "Graduate Student",
  },
  {
    quote: "“The notes feature makes it feel like I’m building my own understanding, not just consuming AI content. It’s like thinking alongside the lesson.”",
    name: "Ibrahim J.",
    role: "Engineering Student",
  },
  {
    quote: "“I learn new frameworks, but many overwhelm me. Nuton simplifies things and lets me ask questions until it clicks.”",
    name: "Seun K.",
    role: "Biology Major",
  },
  {
    quote: "The quiz actually test whether I understand the concept. And the explanations help me fix mistakes immediately.”",
    name: "Samuel M.",
    role: "History Enthusiast",
  },
];

/* desktop fixed-size card */
function Card({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <div className="relative h-[258px] w-[609px] rounded-[24px] bg-[#f7f7f7]">
      <p className="absolute left-[40px] top-[40px] w-[529px] text-[18px] font-medium leading-[30px] tracking-[-0.27px] text-[#171717]">{quote}</p>
      <div className="absolute left-[40px] top-[170px] w-[529px]">
        <p className="text-[16px] font-medium leading-[28px] tracking-[-0.176px] text-[#171717]">{name}</p>
        <p className="text-[14px] font-medium leading-[20px] tracking-[-0.084px] text-[#5c5c5c]">{role}</p>
      </div>
    </div>
  );
}

export default function TestimonialSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(el.clientWidth / 1440, el.clientHeight / 1024));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    // Desktop: pulled up behind Organize so it's revealed as Organize slides out.
    // Mobile/tablet: a normal, native section with a swipeable carousel.
    <div className="relative w-full bg-white py-[72px] sm:py-[96px] md:z-[5] md:-mt-[100vh] md:h-[220vh] md:py-0" data-nav-theme="light">
      {/* ---------- mobile / tablet ---------- */}
      <div className="md:hidden">
        <motion.div
          className="flex flex-col items-center px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="flex items-center justify-center rounded-full bg-[#ebf1ff] px-[10px] py-[2px] text-[12px] font-medium leading-[20px] text-[#3559e9]">Testimonials</span>
          <h2 className="font-header text-[32px] font-normal leading-[40px] tracking-[-0.16px] text-[#171717]" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>The way people</h2>
          <h2 className="font-header text-[32px] font-normal leading-[40px] tracking-[-0.16px] text-[#a4a4a4]" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>actually want to learn.</h2>
        </motion.div>

        {/* swipeable carousel — CSS scroll-snap (touch-native, smooth) */}
        <div className="mt-[47px] flex snap-x snap-mandatory gap-[12px] overflow-x-auto scroll-px-4 px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CARDS.map((c) => (
            <div key={c.name} className="flex h-[194px] w-[337px] max-w-[88%] shrink-0 snap-start flex-col justify-between rounded-[28px] bg-[#f7f7f7] p-[24px]">
              <p className="text-[14px] font-medium leading-[20px] tracking-[-0.084px] text-[#171717]">{c.quote}</p>
              <div>
                <p className="text-[16px] font-medium leading-[28px] tracking-[-0.176px] text-[#171717]">{c.name}</p>
                <p className="text-[14px] font-medium leading-[20px] tracking-[-0.084px] text-[#5c5c5c]">{c.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- desktop artboard (revealed under Organize) ---------- */}
      <div className="sticky top-0 hidden h-screen w-full overflow-hidden bg-white md:block">
        <div ref={stageRef} className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2" style={{ width: 1440, height: 1024, transform: `translate(-50%, -50%) scale(${scale})` }}>
            {/* heading block — badge + two-line H2 (exact Figma offsets) */}
            <div className="absolute flex flex-col items-center text-center" style={{ left: 466.25, top: 143, width: 507.58 }}>
              <span className="flex items-center justify-center rounded-full bg-[#ebf1ff] px-[10px] py-[2px] text-[12px] font-medium leading-[20px] text-[#3559e9]">Testimonials</span>
              <h2 className="font-header text-[48px] font-normal leading-[56px] tracking-[-0.48px] text-[#171717]" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>The way people</h2>
              <h2 className="font-header text-[48px] font-normal leading-[56px] tracking-[-0.48px] text-[#a4a4a4]" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>actually want to learn.</h2>
            </div>

            {/* 2×2 testimonial grid */}
            <div className="absolute grid grid-cols-2 gap-[21px]" style={{ left: 100.54, top: 326 }}>
              {CARDS.map((c) => (
                <Card key={c.name} {...c} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
