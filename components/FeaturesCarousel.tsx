"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { AnimatePresence, motion, cubicBezier } from "framer-motion";

const EASE = cubicBezier(0.32, 0.72, 0, 1);

/* The six features — copy matches the hero sessions; images are the Figma
   exports in /public/features_img. (Figma node 4073:393282.) */
const FEATURES: { badge: string; heading: string; subtitle: string; img: string }[] = [
  { badge: "Structured Learning", heading: "From chaos to clarity.", subtitle: "Upload PDFs, slides, videos, or links — Nuton turns them into step-by-step lessons with clear sections, summaries, and key takeaways.", img: "/features_img/structured%20learning.png" },
  { badge: "AI Tutor", heading: "Ask questions until it clicks.", subtitle: "Stuck on a concept? Ask questions, request examples, or explore deeper explanations in real time", img: "/features_img/AI%20Tutor.png" },
  { badge: "Flash Cards", heading: "Remember what matters.", subtitle: "Instantly generate smart flashcards from your lesson and reinforce the concepts that stick", img: "/features_img/Flashcards.png" },
  { badge: "Podcast", heading: "Listen. Don’t just read.", subtitle: "Convert any lesson into an AI-generated podcast so you can learn while walking, driving, or resting your eyes.", img: "/features_img/Podcast.png" },
  { badge: "Quizzes", heading: "Prove you understand it.", subtitle: "Test yourself with scenario-based questions, adjustable difficulty, and explanations after every answer.", img: "/features_img/Quizzes.png" },
  { badge: "Notes", heading: "Make it yours.", subtitle: "Write, annotate, and connect ideas directly to your lessons — so understanding becomes personal, not passive.", img: "/features_img/Notes.png" },
];

const LAST = FEATURES.length - 1;

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {dir === "right" ? <path d="M5 12h14M13 6l6 6-6 6" /> : <path d="M19 12H5M11 6l-6 6 6 6" />}
    </svg>
  );
}

export default function FeaturesCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== index) setIndex(i);
  };

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: Math.max(0, Math.min(LAST, i)) * el.clientWidth, behavior: "smooth" });
  };

  const btn = "flex h-full flex-1 items-center justify-center rounded-full border border-stroke-soft bg-soft text-strong transition-opacity active:opacity-70";

  return (
    <section className="w-full bg-white py-[72px] md:hidden" data-nav-theme="light">
      {/* swipeable slide track */}
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {FEATURES.map((f) => (
          <div key={f.badge} className="flex w-full shrink-0 snap-center flex-col items-center px-4">
            {/* text block */}
            <div className="flex w-full max-w-[361px] flex-col items-center gap-[10px] text-center">
              <span className="flex items-center justify-center rounded-full bg-[#ebf1ff] px-[10px] py-[2px] text-[12px] font-medium leading-[20px] text-[#3559e9]">{f.badge}</span>
              <h2 className="font-header text-[26px] font-normal leading-[32px] tracking-[-0.4px] text-strong" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>{f.heading}</h2>
              <p className="text-[14px] font-normal leading-[22px] tracking-[-0.084px] text-sub">{f.subtitle}</p>
            </div>

            {/* app image */}
            <img src={f.img} alt={f.badge} loading="lazy" className="mt-[24px] block w-[286px] rounded-[26px] border border-stroke-soft" />
          </div>
        ))}
      </div>

      {/* nav buttons — 1 on first/last slide, 2 in between, smooth transition */}
      <div className="mx-auto mt-[28px] flex h-[52px] w-[286px] items-center gap-[8px]">
        <AnimatePresence initial={false} mode="popLayout">
          {index > 0 && (
            <motion.button key="prev" layout onClick={() => goTo(index - 1)} aria-label="Previous feature" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className={btn}>
              <Arrow dir="left" />
            </motion.button>
          )}
          {index < LAST && (
            <motion.button key="next" layout onClick={() => goTo(index + 1)} aria-label="Next feature" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className={btn}>
              <Arrow dir="right" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
