"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, cubicBezier } from "framer-motion";

const EASE = cubicBezier(0.16, 1, 0.3, 1);

const ExpandIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
);
const StackIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5" /></svg>
);
const LoopIcon = (
  <span className="flex h-6 w-6 items-center justify-center">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/icons/loop-right-fill.svg" alt="" className="block h-[15px] w-[15px]" /></span>
);

const FEATURES: { icon: ReactNode; title: string; body: string }[] = [
  { icon: ExpandIcon, title: "Expand intelligently", body: "Upload new materials or generate fresh lessons — all within the same learning system." },
  { icon: StackIcon, title: "Everything in one place", body: "Notes, quizzes, flashcards, and AI tutoring stay organized inside your course." },
  { icon: LoopIcon, title: "Designed for mastery", body: "Spaces aren’t checklists. They’re living systems you return to, deepen, and grow within." },
];

/* desktop feature column (with separators) */
function Feature({ icon, title, body, border }: { icon: ReactNode; title: string; body: string; border: string }) {
  return (
    <div className={`flex flex-1 flex-col items-start gap-2.5 p-6 ${border}`}>
      <span className="text-strong">{icon}</span>
      <div className="flex flex-col gap-1">
        <p className="text-[16px] font-medium leading-7 tracking-[-0.176px] text-strong">{title}</p>
        <p className="text-[14px] leading-6 tracking-[-0.084px] text-sub">{body}</p>
      </div>
    </div>
  );
}

export default function OrganizeSection() {
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
    // On desktop it's pulled up to cover the EveryWay section (cover effect).
    // On mobile/tablet it's a normal, native, stacked section.
    <section
      className="relative w-full bg-weak px-4 py-[72px] sm:py-[96px] md:z-10 md:-mt-[100vh] md:h-screen md:overflow-hidden md:p-0"
      data-nav-theme="light"
    >
      {/* ---------- mobile / tablet ---------- */}
      <div className="md:hidden">
        <div className="mx-auto flex max-w-[361px] flex-col">
          <motion.div
            className="flex flex-col items-center gap-[12px] text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h3 className="font-header text-[32px] font-normal leading-[40px] tracking-[-0.16px] text-strong" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>Organize what you learn.</h3>
            <p className="text-[16px] leading-[28px] tracking-[-0.176px] text-sub">Group lessons by subject and build a system that compounds over time.</p>
          </motion.div>

          <motion.img
            src="/organize-dashboard.png?v=2"
            alt="Nuton Spaces dashboard"
            loading="lazy"
            className="mt-[24px] block w-full"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
          />

          {/* feature rows — divided, not carded (Figma node 4078:393637) */}
          <div className="mt-[16px] flex w-full flex-col">
            {FEATURES.map((f, i) => (
              <div key={f.title}>
                {i > 0 && <div className="h-px w-full bg-stroke-soft" />}
                <motion.div
                  className="flex flex-col items-start gap-[10px] p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                >
                  <span className="text-strong">{f.icon}</span>
                  <div className="flex flex-col gap-[4px]">
                    <p className="text-[16px] font-medium leading-[28px] tracking-[-0.176px] text-strong">{f.title}</p>
                    <p className="text-[14px] leading-[24px] tracking-[-0.084px] text-sub">{f.body}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- desktop artboard (with cover choreography) ---------- */}
      <div ref={stageRef} className="absolute inset-0 hidden md:block">
        <div className="absolute left-1/2 top-1/2" style={{ width: 1440, height: 1024, transform: `translate(-50%, -50%) scale(${scale})` }}>
          {/* heading */}
          <div className="absolute flex flex-col items-center gap-[12px] text-center" style={{ left: 490.49, top: 82.36, width: 519 }}>
            <h3 className="font-header text-[40px] font-normal leading-[48px] tracking-[-0.4px] text-strong" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>Organize what you learn.</h3>
            <p className="w-[427px] text-[16px] leading-[28px] tracking-[-0.176px] text-sub">Group lessons by subject and build a system that compounds over time.</p>
          </div>

          {/* tilted Spaces dashboard — exact Figma-exported 3D mockup */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/organize-dashboard.png?v=2" alt="" className="absolute block" style={{ left: 175, top: 150, width: 1090, height: 797 }} />

          {/* feature columns */}
          <div className="absolute flex items-stretch" style={{ left: 100, top: 819, width: 1240, height: 163 }}>
            <Feature border="border-r border-stroke-soft" icon={ExpandIcon} title="Expand intelligently" body="Upload new materials or generate fresh lessons — all within the same learning system." />
            <Feature border="border-x border-stroke-soft" icon={StackIcon} title="Everything in one place" body="Notes, quizzes, flashcards, and AI tutoring stay organized inside your course." />
            <Feature border="border-l border-stroke-soft" icon={LoopIcon} title="Designed for mastery" body="Spaces aren’t checklists. They’re living systems you return to, deepen, and grow within." />
          </div>
        </div>
      </div>
    </section>
  );
}
