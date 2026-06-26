"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { motion, cubicBezier, useMotionValue, useTransform, type MotionValue } from "framer-motion";

const ease = cubicBezier(0.22, 1, 0.36, 1);

/* The five diagonal labels — exact Figma Desktop-28 positions / colours /
   rotations, using the real exported icon SVGs. */
const LABELS: { text: string; x: number; y: number; size: number; rot: number; bg: string; icon: string }[] = [
  { text: "Upload", x: 267.84, y: 201.96, size: 86.18, rot: 27.21, bg: "#f5f3ff", icon: "/icons/upload.svg" },
  { text: "Understand", x: 482.63, y: 318.15, size: 85.22, rot: -25.32, bg: "#e0faec", icon: "/icons/understand.svg" },
  { text: "Ask", x: 640.63, y: 434.2, size: 85.22, rot: -25.32, bg: "#fff3eb", icon: "/icons/ask.svg" },
  { text: "Practice", x: 796.04, y: 550.26, size: 87.1, rot: 29.23, bg: "#ffebec", icon: "/icons/practice.svg" },
  { text: "Master", x: 922.33, y: 702.36, size: 85.22, rot: 24, bg: "#f5f3ff", icon: "/icons/master.svg" },
];

/* Faint decorative background icons — exact positions (the parent frame sits at
   63.25 / 134.03, so each is offset from there). */
const FR = { x: 63.25, y: 134.03 };
const BG: { x: number; y: number; size: number; icon: string; op: number }[] = [
  { x: FR.x + 131.69, y: FR.y + 0, size: 50, icon: "/icons/bg/brain-light.svg" , op: 0.12 },
  { x: FR.x + 621.75, y: FR.y + 16.97, size: 50, icon: "/icons/bg/chemistry.svg" , op: 0.12 },
  { x: FR.x + 880.75, y: FR.y + 98.97, size: 50, icon: "/icons/bg/physics.svg" , op: 0.1 },
  { x: FR.x + 0, y: FR.y + 187.93, size: 50, icon: "/icons/bg/book-duotone.svg" , op: 0.1 },
  { x: FR.x + 1216.75, y: FR.y + 268.97, size: 50, icon: "/icons/bg/math.svg" , op: 0.1 },
  { x: FR.x + 257.91, y: FR.y + 364.09, size: 50, icon: "/icons/bg/brain-test.svg" , op: 0.12 },
  { x: FR.x + 620.28, y: FR.y + 613.56, size: 50, icon: "/icons/bg/book-line.svg" , op: 0.12 },
  { x: FR.x + 1166.75, y: FR.y + 733.97, size: 50, icon: "/icons/bg/flashcards.svg" , op: 0.12 },
  { x: 66, y: 603.59, size: 24, icon: "/icons/bg/chemistry.svg" , op: 0.12 },
];

/* Mobile labels — diagonally staggered (Figma node 4078:393415). */
const MOBILE_LABELS: { text: string; icon: string; bg: string; rot: number; pl: number }[] = [
  { text: "Upload", icon: "/icons/upload.svg", bg: "#f5f3ff", rot: 27.21, pl: 0 },
  { text: "Understand", icon: "/icons/understand.svg", bg: "#e0faec", rot: -25.32, pl: 53 },
  { text: "Ask", icon: "/icons/ask.svg", bg: "#fff3eb", rot: -25.32, pl: 106 },
  { text: "Practice", icon: "/icons/practice.svg", bg: "#ffebec", rot: 29.23, pl: 158 },
  { text: "Master", icon: "/icons/master.svg", bg: "#efebff", rot: -25.32, pl: 211 },
];

/* Faint scattered background icons (Figma node 4078:393442 — 361×300, opacity 30%). */
const MOBILE_BG: { icon: string; left: number; top: number; rot: number; dim?: boolean }[] = [
  { icon: "/icons/bg/book-duotone.svg", left: 35.69, top: 136.89, rot: 38, dim: true },
  { icon: "/icons/bg/book-line.svg", left: 138.72, top: 269.3, rot: -21 },
  { icon: "/icons/bg/flashcards.svg", left: 0, top: 41.91, rot: -25 },
  { icon: "/icons/bg/brain-light.svg", left: 187.42, top: 0, rot: 37 },
  { icon: "/icons/bg/brain-test.svg", left: 18.44, top: 218.9, rot: 0 },
  { icon: "/icons/bg/chemistry.svg", left: 253.1, top: 95.52, rot: -16 },
  { icon: "/icons/bg/physics.svg", left: 320.14, top: 220.35, rot: 13, dim: true },
  { icon: "/icons/bg/math.svg", left: 328.79, top: 20.26, rot: -21, dim: true },
];

/* Reveals its child as the (pinned) section is scrolled — labels slide a long
   way up into the stack; `fadeFrac` fades them in quickly so the slide reads. */
function Reveal({ p, win, rise = 28, fadeFrac = 1, className, style, children }: { p: MotionValue<number>; win: [number, number]; rise?: number; fadeFrac?: number; className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  const [s, e] = win;
  const opacity = useTransform(p, [s, s + (e - s) * fadeFrac], [0, 1], { clamp: true });
  const y = useTransform(p, [s, e], [rise, 0], { ease, clamp: true });
  return <motion.div className={className} style={{ ...style, opacity, y }}>{children}</motion.div>;
}

export default function EveryWaySection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const p = useMotionValue(0);
  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      // The label animation plays over the first 1.6 viewports of the pinned
      // range; the remaining ~1 viewport is a "hold" during which the next
      // section (Organize) slides up and covers this one, so p completes early.
      const animDist = window.innerHeight * 1.6;
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), animDist);
      p.set(animDist > 0 ? scrolled / animDist : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [p]);

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
    <div ref={wrapRef} id="every-way" className="relative w-full bg-white px-4 py-[72px] sm:py-[96px] md:z-0 md:h-[360vh] md:bg-transparent md:p-0" data-nav-theme="light">
      {/* ---------- mobile / tablet ---------- */}
      <div className="relative mx-auto flex max-w-[361px] flex-col gap-[24px] px-[3px] md:hidden">
        <motion.div className="flex flex-col gap-[12px]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.7, ease }}>
          <h2 className="font-header text-[32px] font-normal leading-[40px] tracking-[-0.16px] text-strong" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>One system Every way you learn.</h2>
          <p className="text-[16px] leading-[28px] tracking-[-0.176px] text-sub">Bring any format. Watch it become something you can actually learn from.</p>
        </motion.div>

        {/* faint scattered background icons */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[361px] opacity-30">
          {MOBILE_BG.map((b, i) => (
            <span key={i} className="absolute flex h-6 w-6 items-center justify-center" style={{ left: b.left, top: b.top, opacity: b.dim ? 0.1 : 1 }}>
              <img src={b.icon} alt="" className="block h-6 w-6" style={{ transform: `rotate(${b.rot}deg)` }} />
            </span>
          ))}
        </div>

        {/* diagonally staggered labels */}
        <div className="relative flex flex-col gap-[16px]">
          {MOBILE_LABELS.map((l, i) => (
            <motion.div key={l.text} className="flex items-center gap-[4px]" style={{ paddingLeft: l.pl }} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.55, ease, delay: i * 0.08 }}>
              <span className="flex h-[53px] w-[53px] shrink-0 items-center justify-center">
                <span className="flex items-center justify-center rounded-full p-[10px]" style={{ backgroundColor: l.bg, transform: `rotate(${l.rot}deg)` }}>
                  <img src={l.icon} alt="" className="block h-5 w-5" />
                </span>
              </span>
              <span className="whitespace-nowrap font-header text-[20px] font-normal leading-[28px] text-strong" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>{l.text}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ---------- desktop pinned artboard ---------- */}
      <div className="sticky top-0 hidden h-screen w-full overflow-hidden bg-white md:block">
        <div ref={stageRef} className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2" style={{ width: 1440, height: 1024, transform: `translate(-50%, -50%) scale(${scale})` }}>
            {/* faint background icons */}
            {BG.map((b, i) => (
              <Reveal key={i} p={p} win={[0.0, 0.18]} rise={0} className="absolute" style={{ left: b.x, top: b.y, width: b.size, height: b.size, opacity: b.op }}>
                <img src={b.icon} alt="" className="block h-full w-full" />
              </Reveal>
            ))}

            {/* headline (bottom-left) — Fraunces SemiBold 56/64 */}
            <Reveal p={p} win={[0.08, 0.3]} rise={32} className="absolute flex flex-col gap-[12px]" style={{ left: 104.92, top: 627.59, width: 519 }}>
              <h2 className="whitespace-nowrap font-header text-[56px] font-normal leading-[64px] tracking-[-0.56px] text-strong" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>One system</h2>
              <h2 className="whitespace-nowrap font-header text-[56px] font-normal leading-[64px] tracking-[-0.56px] text-strong" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>Every way you learn.</h2>
              <p className="text-[16px] leading-[28px] tracking-[-0.176px] text-sub">Bring any format. Watch it become something you can actually learn from.</p>
            </Reveal>

            {/* diagonal labels — each slides up from below into the stack, one at a time */}
            {LABELS.map((l, i) => (
              <Reveal key={l.text} p={p} win={[0.2 + i * 0.13, 0.42 + i * 0.13]} rise={200} fadeFrac={0.3} className="absolute flex items-center gap-[4px]" style={{ left: l.x, top: l.y }}>
                <span className="flex items-center justify-center" style={{ width: l.size, height: l.size }}>
                  <span style={{ transform: `rotate(${l.rot}deg)` }}>
                    <span className="flex items-center justify-center rounded-full p-4" style={{ backgroundColor: l.bg }}>
                      <img src={l.icon} alt="" className="block h-8 w-8" />
                    </span>
                  </span>
                </span>
                <span className="font-header text-[48px] font-normal leading-[56px] tracking-[-0.48px] text-strong" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>{l.text}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
