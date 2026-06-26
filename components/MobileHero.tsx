"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { motion, cubicBezier, useMotionValue, useTransform, type MotionValue } from "framer-motion";

const ease = cubicBezier(0.22, 1, 0.36, 1);

/* Exact File Format glyph specs (Figma node 4055:291139). */
type Fmt = "ppt" | "xls" | "doc" | "pdf" | "youtube" | "global";
const FMT: Record<Fmt, { bg: string; src: string; w: number; h: number; px: number; py: number }> = {
  ppt: { bg: "#e16614", src: "/app/fmt-ppt.svg", w: 16.198, h: 6.318, px: 2.283, py: 4.567 },
  xls: { bg: "#178c4e", src: "/app/fmt-xls.svg", w: 16.233, h: 6.494, px: 2.283, py: 4.567 },
  doc: { bg: "#3559e9", src: "/app/fmt-doc.svg", w: 18.267, h: 6.491, px: 2.283, py: 4.567 },
  pdf: { bg: "#e93544", src: "/app/fmt-pdf.svg", w: 16.188, h: 6.383, px: 2.995, py: 5.991 },
  youtube: { bg: "#d02533", src: "/app/fmt-youtube.svg", w: 14.645, h: 10.252, px: 2.283, py: 4.567 },
  global: { bg: "#7b7b7b", src: "/app/fmt-global.svg", w: 15.984, h: 15.984, px: 2.283, py: 2.283 },
};

function Glyph({ fmt }: { fmt: Fmt }) {
  const f = FMT[fmt];
  return (
    <div className="flex h-[27.4px] w-[27.4px] items-center justify-center overflow-hidden rounded-[4px]" style={{ backgroundColor: f.bg, padding: `${f.py}px ${f.px}px` }}>
      <img src={f.src} alt="" className="block" style={{ width: f.w, height: f.h }} />
    </div>
  );
}

/* A floating file chip — exact Figma card (white, soft shadow, grey inner, glyph). */
const CHIPS: { fmt: Fmt; left: number; top: number; rot: number; delay: number }[] = [
  { fmt: "ppt", left: 0, top: 150, rot: -11.07, delay: 0.0 },
  { fmt: "xls", left: 319, top: 178, rot: -15, delay: 0.05 },
  { fmt: "pdf", left: 10, top: 262, rot: 15, delay: 0.08 },
  { fmt: "global", left: 337, top: 298, rot: 15, delay: 0.06 },
  { fmt: "doc", left: 1, top: 427, rot: -15, delay: 0.1 },
  { fmt: "youtube", left: 320, top: 420, rot: 11.07, delay: 0.02 },
];

function Chip({ cfg, p }: { cfg: (typeof CHIPS)[number]; p: MotionValue<number> }) {
  // converge toward the app's upload card centre, then fade in.
  const a = 0.1 + cfg.delay;
  const b = 0.5 + cfg.delay;
  const cx = 187 - (cfg.left + 20);
  const cy = 430 - (cfg.top + 20);
  const x = useTransform(p, [a, b], [0, cx], { ease, clamp: true });
  const y = useTransform(p, [a, b], [0, cy], { ease, clamp: true });
  const scale = useTransform(p, [a, b], [1, 0.4], { ease, clamp: true });
  const opacity = useTransform(p, [a, b - 0.05, b], [1, 1, 0], { clamp: true });
  return (
    <motion.div className="absolute" style={{ left: cfg.left, top: cfg.top, x, y, scale, opacity }}>
      <div className="ambient-float" style={{ "--float-dur": "6.5s", "--float-delay": `${cfg.delay}s` } as React.CSSProperties}>
        <div style={{ transform: `rotate(${cfg.rot}deg)` }}>
          <div className="flex items-center rounded-[10.337px] border-[0.861px] border-stroke-soft bg-white p-[3.446px] shadow-[0px_13.782px_27.565px_-10.337px_rgba(14,18,27,0.1)]">
            <div className="flex items-center rounded-[6.891px] bg-bg-weak p-[3.446px]">
              <Glyph fmt={cfg.fmt} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- the in-app phone mockup (exact Figma node 4055:291000) ---------- */

const navItem = "flex h-[45.3px] w-[60px] flex-col items-center justify-center gap-[3px]";
const navLabel = "text-[9.2px] font-medium leading-[12.3px] font-body";

function AppScreen({ clusterOpacity }: { clusterOpacity: MotionValue<number> }) {
  return (
    <div className="relative h-[610px] w-[302px] overflow-hidden rounded-[20px] bg-white">
      {/* status bar */}
      <div className="absolute left-0 top-0 flex h-[45.3px] w-full items-end justify-between pb-[2.3px]">
        <div className="flex flex-1 items-center justify-center pl-[7.7px]"><span className="w-[41.5px] text-center text-[12.3px] font-semibold tracking-[-0.32px] text-strong" style={{ fontFamily: "var(--font-inter)" }}>9:41</span></div>
        <div className="h-[28.4px] w-[96px] shrink-0 rounded-[100px] bg-[#121212]" />
        <div className="flex flex-1 items-center justify-center gap-[6.1px] pr-[8.5px]">
          <img src="/app/signal.svg" alt="" className="h-[9.2px] w-[13.8px]" />
          <img src="/app/wifi.svg" alt="" className="h-[9.1px] w-[13.1px]" />
          <div className="relative h-[10px] w-[21px]"><img src="/app/battery-fill.svg" alt="" className="absolute left-0 top-0 h-[10px] w-[19px]" /><img src="/app/battery-end.svg" alt="" className="absolute right-0 top-1/2 h-[3.2px] w-[1.1px] -translate-y-1/2" /></div>
        </div>
      </div>

      {/* heading */}
      <p className="absolute left-1/2 top-[115.3px] w-[246px] -translate-x-1/2 -translate-y-1/2 text-center font-header text-[18.4px] font-normal leading-[24.6px] text-strong" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
        What do you want to <span className="italic text-[#5c5c5c]">learn?</span>
      </p>

      {/* learning tab */}
      <div className="absolute left-1/2 top-[149.1px] flex -translate-x-1/2 items-start rounded-full border-[0.769px] border-stroke-soft bg-bg-weak p-[1.537px] shadow-[0px_0.769px_0.769px_rgba(10,13,20,0.03)]">
        <div className="relative flex items-center justify-center gap-[3.074px] rounded-full bg-strong px-[18.4px] py-[9.2px]">
          <img src="/app/folder.svg" alt="" className="h-[15.4px] w-[15.4px]" />
          <span className="whitespace-nowrap text-[10.8px] font-medium leading-[15.4px] tracking-[-0.065px] text-white font-body">My materials</span>
        </div>
        <div className="flex items-center justify-center gap-[3.074px] px-[18.4px] py-[9.2px]">
          <img src="/app/lightbulb.svg" alt="" className="h-[15.4px] w-[15.4px]" />
          <span className="whitespace-nowrap text-[10.8px] font-medium leading-[15.4px] tracking-[-0.065px] text-[#5c5c5c] font-body">Learn New</span>
        </div>
      </div>

      {/* upload card */}
      <div className="absolute left-[12.68px] top-[232.9px] flex w-[277.46px] flex-col gap-[18.4px] rounded-[18.4px] border-[0.769px] border-stroke-soft bg-white p-[12.3px]">
        <div className="flex flex-col items-center gap-[3.074px] text-center">
          <p className="w-full text-[13.8px] font-medium leading-[23.1px] tracking-[-0.21px] text-strong font-body">Add your study materials</p>
          <p className="w-full text-[10.8px] font-normal leading-[18.4px] tracking-[-0.065px] text-[#5c5c5c] font-body">Upload PDFs, slides, videos, or audio. You can add more than one.</p>
        </div>
        <div className="flex flex-col gap-[6.149px]">
          <div className="flex w-full items-center justify-center gap-[3.074px] rounded-full bg-[#f5f5f5] p-[12.3px]">
            <img src="/app/file-upload.svg" alt="" className="h-[15.4px] w-[15.4px]" />
            <span className="text-[10.8px] font-medium leading-[15.4px] tracking-[-0.065px] text-strong font-body">Upload Document</span>
          </div>
          <div className="flex w-full items-center justify-center gap-[3.074px] rounded-full bg-[#f5f5f5] p-[12.3px]">
            <img src="/app/attachment.svg" alt="" className="h-[15.4px] w-[15.4px]" />
            <span className="text-[10.8px] font-medium leading-[15.4px] tracking-[-0.065px] text-strong font-body">Paste URL</span>
          </div>
        </div>
      </div>

      {/* added-files cluster — fades in as the chips flow in */}
      <motion.div style={{ opacity: clusterOpacity }} className="absolute bottom-[75.92px] left-1/2 flex h-[40px] -translate-x-1/2 items-center gap-1 rounded-full border border-stroke-soft bg-white p-[2px] pr-2 shadow-[0px_1px_2px_rgba(10,13,20,0.03)]">
        <div className="flex items-center">
          <span className="z-10 flex h-9 w-9 items-center justify-center rounded-full bg-bg-weak p-[2px]"><span className="flex h-full w-full items-center justify-center rounded-full" style={{ backgroundColor: "#e93544", padding: "6.257px 3.129px" }}><img src="/app/fmt-pdf.svg" alt="" className="block" style={{ width: 16.9, height: 6.67 }} /></span></span>
          <span className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-bg-weak p-[2px] ring-[1.5px] ring-white"><span className="flex h-full w-full items-center justify-center rounded-full" style={{ backgroundColor: "#d02533", padding: "4px 2px" }}><img src="/app/fmt-youtube.svg" alt="" className="block" style={{ width: 12.8, height: 9 }} /></span></span>
        </div>
        <span className="text-[16px] leading-[24px] tracking-[-0.176px] text-[#5c5c5c]" style={{ fontFamily: "var(--font-inter)" }}>+1</span>
        <span className="flex h-6 w-6 items-center justify-center"><img src="/app/arrow-down.svg" alt="" style={{ width: 11, height: 6.5 }} /></span>
      </motion.div>

      {/* nav bar */}
      <div className="absolute bottom-0 left-1/2 flex h-[63px] w-full -translate-x-1/2 items-center justify-between border-t-[0.769px] border-stroke-soft bg-white/95 px-[7.7px] pt-[1px] backdrop-blur-md">
        <div className={navItem}>
          <span className="flex h-[18.4px] w-[18.4px] items-center justify-center rounded-full bg-primary"><img src="/app/add-line.svg" alt="" className="h-[11.8px] w-[11.8px]" /></span>
          <span className={`${navLabel} text-strong`}>New</span>
        </div>
        <div className={navItem}>
          <img src="/app/chat.svg" alt="" className="h-[18.4px] w-[18.4px]" />
          <span className={`${navLabel} text-[#5c5c5c]`}>Chat</span>
        </div>
        <div className={navItem}>
          <img src="/app/spaces.svg" alt="" className="h-[18.4px] w-[18.4px]" />
          <span className={`${navLabel} text-[#5c5c5c]`}>Spaces</span>
        </div>
        <div className={navItem}>
          <span className="flex h-[18.4px] w-[18.4px] items-center justify-center rounded-full bg-[#ffc0c5] text-[9.2px] font-medium text-[#681219]" style={{ fontFamily: "var(--font-inter)" }}>A</span>
          <span className={`${navLabel} text-[#5c5c5c]`}>Profile</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- the pinned mobile hero ---------- */

export default function MobileHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const p = useMotionValue(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total);
      p.set(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [p]);

  const heroY = useTransform(p, [0, 0.55], [0, -560], { ease, clamp: true });
  const phoneY = useTransform(p, [0, 0.5], [300, 0], { ease, clamp: true });
  const phoneScale = useTransform(p, [0, 0.5], [0.9, 1], { ease, clamp: true });
  const clusterOpacity = useTransform(p, [0.55, 0.75], [0, 1], { clamp: true });

  return (
    <div ref={wrapRef} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen w-full justify-center overflow-hidden bg-white">
        {/* 375-wide stage (matches the Figma artboard proportions) */}
        <div className="relative h-full w-full max-w-[375px]">
          {/* hero copy — gap-32 / gap-16 exactly */}
          <motion.div style={{ y: heroY, x: "-50%" }} className="absolute left-1/2 top-[105px] flex w-[361px] flex-col items-center gap-[32px]">
            <div className="relative flex w-full flex-col items-center gap-[16px]">
              <span className="inline-flex items-center gap-[2px] rounded-full bg-[#c0d5ff] py-[2px] pl-[8px] pr-[4px]">
                <span className="text-[12px] font-medium leading-[20px] text-[#182f8b]" style={{ fontFamily: "var(--font-inter)" }}>We&rsquo;ve got a new updates</span>
                <img src="/app/arrow-right-long.svg" alt="" className="h-4 w-4" />
              </span>
              <h1 className="text-center font-header text-[32px] font-normal leading-[40px] tracking-[-0.16px] text-strong" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
                Learn the way<br /><span className="font-semibold italic">Your Brain</span><br />understands best.
              </h1>
              <div className="absolute left-[103px] top-[112px] h-[5.564px] w-[155px] bg-[#3559e9] opacity-30" />
              <p className="w-full text-center text-[16px] font-normal leading-[28px] tracking-[-0.176px] text-[#5c5c5c]" style={{ fontFamily: "var(--font-inter)" }}>Turn your materials or ideas into structured lessons, personalized explanations, and intelligent practice built around how you think.</p>
            </div>
            <a href="#" className="flex items-center justify-center rounded-full bg-strong px-[24px] py-[16px] text-[14px] font-medium leading-[20px] tracking-[-0.084px] text-white" style={{ fontFamily: "var(--font-inter)" }}>Start learning for free</a>
          </motion.div>

          {/* floating chips */}
          {CHIPS.map((c) => <Chip key={c.fmt} cfg={c} p={p} />)}

          {/* the app phone — rises from the bottom and centres, inside its gray device bezel */}
          <motion.div style={{ y: phoneY, scale: phoneScale, x: "-50%" }} className="absolute bottom-[40px] left-1/2 origin-bottom">
            <div className="rounded-[26.15px] bg-[#f3f3f3] p-[6.15px] shadow-[0px_8px_32px_rgba(10,13,20,0.06)]">
              <AppScreen clusterOpacity={clusterOpacity} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
