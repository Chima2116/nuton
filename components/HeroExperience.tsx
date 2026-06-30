"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  cubicBezier,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { CardVisual, FormatGlyph, type FileFormat } from "./FloatingCard";
import MobileHero from "./MobileHero";

/* Calm, premium easing (long tail, no bounce). */
const ease = cubicBezier(0.22, 1, 0.36, 1);

const TARGET_FALLBACK = { x: 720, y: 705 };

const CARDS: {
  id: string; format: FileFormat; label: string; cx: number; cy: number; rotate: number;
  win: [number, number]; float: { dur: number; delay: number };
}[] = [
  { id: "doc", format: "doc", label: "Usability Testing Methods.doc", cx: 289, cy: 727, rotate: -16, win: [0.06, 0.26], float: { dur: 6.8, delay: 0.6 } },
  { id: "youtube", format: "youtube", label: "https://www.youtube.com/w…", cx: 1228, cy: 639, rotate: 12, win: [0.08, 0.29], float: { dur: 5.5, delay: 0.2 } },
  { id: "link", format: "link", label: "https://www.interaction-des…", cx: 1274, cy: 419, rotate: 12, win: [0.1, 0.33], float: { dur: 6.2, delay: 1.1 } },
  { id: "pdf", format: "pdf", label: "HCI Principles and Guidelines.pdf", cx: 164, cy: 361, rotate: 7, win: [0.13, 0.37], float: { dur: 7.8, delay: 0.9 } },
  { id: "xls", format: "xls", label: "Accessibility Standards Overview.pdf", cx: 1208, cy: 232, rotate: -16, win: [0.16, 0.41], float: { dur: 7.4, delay: 1.6 } },
  { id: "ppt", format: "ppt", label: "Advanced Interaction Design.ppt", cx: 329, cy: 235, rotate: 16, win: [0.19, 0.45], float: { dur: 8.4, delay: 1.9 } },
];

const FILES: { format: FileFormat; title: string; sub: string }[] = [
  { format: "pdf", title: "The Design of Everyday Things", sub: "120 KB" },
  { format: "ppt", title: "The basics of design", sub: "120 KB" },
  { format: "youtube", title: "Your First Design System in Figma", sub: "Tim Gabe" },
];

/* The structured-learning "sessions": each morphs the heading + dashboard video
   and fills its own progress dot. The scroll range [SESS_START, 1] is split
   evenly across them, so adding a session just appends here. */
type Session = { badge: string; heading: string; subtitle: string; src: string; dur: number };
const SESSIONS: Session[] = [
  { badge: "Structured Learning", heading: "From chaos to clarity.", subtitle: "Upload PDFs, slides, videos, or links — Nuton turns them into step-by-step lessons with clear sections, summaries, and key takeaways.", src: "/videos/v1.mp4", dur: 6.075 },
  { badge: "AI Tutor", heading: "Ask questions until it clicks.", subtitle: "Stuck on a concept? Ask questions, request examples, or explore deeper explanations in real time", src: "/videos/v2.mp4", dur: 5.984 },
  { badge: "Flash Cards", heading: "Remember what matters.", subtitle: "Instantly generate smart flashcards from your lesson and reinforce the concepts that stick", src: "/videos/v3.mp4", dur: 8.875 },
  { badge: "Podcast", heading: "Listen. Don\u2019t just read.", subtitle: "Convert any lesson into an AI-generated podcast so you can learn while walking, driving, or resting your eyes.", src: "/videos/v4.mp4", dur: 6.934 },
  { badge: "Quizzes", heading: "Prove you understand it.", subtitle: "Test yourself with scenario-based questions, adjustable difficulty, and explanations after every answer.", src: "/videos/v5.mp4", dur: 10.1 },
  { badge: "Notes", heading: "Make it yours.", subtitle: "Write, annotate, and connect ideas directly to your lessons \u2014 so understanding becomes personal, not passive.", src: "/videos/v6.mp4", dur: 12.417 },
];
const SESS_START = 0.5;
const SESS_W = (1 - SESS_START) / SESSIONS.length;
const TOTAL_DOTS = 6;
const sessionWin = (i: number): [number, number] => [SESS_START + i * SESS_W, SESS_START + (i + 1) * SESS_W];

/* ----------------------------------------------------------------- */

function FlyCard({ cfg, p, target }: { cfg: (typeof CARDS)[number]; p: MotionValue<number>; target: { x: number; y: number } }) {
  const [s, e] = cfg.win;
  const t = useTransform(p, [s, e], [0, 1], { clamp: true });
  const x = useTransform(t, [0, 1], [0, target.x - cfg.cx], { ease });
  const y = useTransform(t, [0, 1], [0, target.y - cfg.cy], { ease });
  const rotate = useTransform(t, [0, 1], [cfg.rotate, 0], { ease });
  const scale = useTransform(t, [0, 1], [1, 0.5], { ease });
  const opacity = useTransform(t, [0, 0.9, 1], [1, 1, 0]);
  const blurV = useTransform(t, [0.55, 1], [0, 3]);
  const filter = useTransform(blurV, (b) => `blur(${b}px)`);
  return (
    <div className="absolute" style={{ left: cfg.cx, top: cfg.cy }}>
      <div className="ambient-float" style={{ "--float-dur": `${cfg.float.dur}s`, "--float-delay": `${cfg.float.delay}s` } as React.CSSProperties}>
        <motion.div style={{ x, y, rotate, scale, opacity, filter }}>
          <div style={{ transform: "translate(-50%,-50%)" }}>
            <CardVisual format={cfg.format} label={cfg.label} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FileRow({ file, p, window: win, last }: { file: (typeof FILES)[number]; p: MotionValue<number>; window: [number, number]; last?: boolean }) {
  const opacity = useTransform(p, win, [0, 1], { clamp: true });
  const y = useTransform(p, win, [12, 0], { ease, clamp: true });
  return (
    <motion.div style={{ opacity, y }} className={`flex h-[52px] items-center gap-3 px-3 ${last ? "" : "border-b border-stroke-soft"}`}>
      <FormatGlyph format={file.format} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium leading-5 text-strong">{file.title}</p>
        <p className="text-[11px] leading-4 text-faded">{file.sub}</p>
      </div>
      <span className="text-[#e93544]"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M5 7h14M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" /></svg></span>
    </motion.div>
  );
}

function SidebarIcon({ d }: { d: string }) {
  return <div className="flex items-center justify-center rounded-lg p-2 text-faded"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg></div>;
}

/* A session heading that slides UP from behind the dashboard, holds, then
   slides up + out as the next session takes over (the last one just holds). */
function SessionHeading({ p, win, badge, heading, subtitle, isLast }: { p: MotionValue<number>; win: [number, number]; badge: string; heading: string; subtitle: string; isLast: boolean }) {
  const [s, e] = win;
  const inA = s - 0.03;
  // Starts BEHIND the dashboard (y 210), so its opacity flips on while hidden;
  // the only visible motion is a sharp slide UP into view, then up + out as the
  // next one rises from behind — a clean vertical swap, never a flat fade.
  const opacity = useTransform(
    p,
    isLast ? [inA, inA + 0.008] : [inA, inA + 0.008, e - 0.026, e - 0.008],
    isLast ? [0, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(
    p,
    isLast ? [inA, s + 0.02] : [inA, s + 0.02, e - 0.03, e - 0.008],
    isLast ? [210, 0] : [210, 0, 0, -160],
    { ease },
  );
  return (
    <motion.div style={{ left: 720, top: 165, x: "-50%", y, opacity }} className="absolute z-0 flex w-[610px] flex-col items-center gap-[12px] text-center">
      <div className="flex items-center justify-center overflow-hidden rounded-full bg-[#ebf1ff] px-[8px] py-[2px]">
        <span className="text-[12px] font-medium leading-[20px] text-[#3559e9]">{badge}</span>
      </div>
      <h2 className="font-header text-[40px] font-normal leading-[48px] tracking-[-0.4px] text-strong" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>{heading}</h2>
      <p className="text-[16px] leading-[28px] tracking-[-0.176px] text-sub">{subtitle}</p>
    </motion.div>
  );
}

/* A session video filling the dashboard frame, cross-fading in over the
   previous one and scrubbed (currentTime) by scroll across its window. */
function SessionVideo({ p, win, src, dur }: { p: MotionValue<number>; win: [number, number]; src: string; dur: number }) {
  const [s, e] = win;
  const videoRef = useRef<HTMLVideoElement>(null);
  // smooth "focus-pull" entrance instead of a flat fade: a quick eased fade,
  // a subtle settle from 1.05 → 1, and a blur that resolves into sharpness.
  const opacity = useTransform(p, [s - 0.045, s - 0.005], [0, 1], { ease, clamp: true });
  const scale = useTransform(p, [s - 0.045, s + 0.02], [1.05, 1], { ease, clamp: true });
  const blurV = useTransform(p, [s - 0.045, s], [10, 0], { clamp: true });
  const filter = useTransform(blurV, (b) => `blur(${b}px)`);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const update = (val: number) => {
      const d = v.duration || dur;
      const vp = Math.min(Math.max((val - s) / (e - s), 0), 1);
      const tt = vp * d;
      if (Number.isFinite(tt) && Math.abs(v.currentTime - tt) > 0.015) {
        try { v.currentTime = tt; } catch {}
      }
    };
    update(p.get());
    const unsub = p.on("change", update);
    return () => unsub();
  }, [p, s, e, dur]);
  return (
    <motion.video ref={videoRef} style={{ opacity, scale, filter }} className="absolute inset-0 h-full w-full object-cover" muted playsInline preload="auto">
      <source src={src} type="video/mp4" />
    </motion.video>
  );
}

function SessionDot({ p, win }: { p: MotionValue<number>; win: [number, number] }) {
  const fill = useTransform(p, win, ["0%", "100%"], { clamp: true });
  return (
    <span className="relative h-1.5 w-9 overflow-hidden rounded-full bg-stroke-soft">
      <motion.span className="absolute inset-y-0 left-0 rounded-full bg-primary" style={{ width: fill }} />
    </span>
  );
}

/* ----------------------------------------------------------------- */

export default function HeroExperience() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const artboardRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [target, setTarget] = useState(TARGET_FALLBACK);

  useEffect(() => {
    const measure = () => {
      const el = dropRef.current, art = artboardRef.current;
      if (!el || !art) return;
      let x = 0, y = 0, node: HTMLElement | null = el;
      while (node && node !== art) { x += node.offsetLeft; y += node.offsetTop; node = node.offsetParent as HTMLElement | null; }
      setTarget({ x: x + el.offsetWidth / 2, y: y + el.offsetHeight / 2 + 45 });
    };
    const id = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", measure); };
  }, []);

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

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(el.clientWidth / 1440, el.clientHeight / 1024));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* PHASE 1 — hero out, cards drop in, dashboard rises, files load, then the
     panel morphs to the lesson size — all wrapped up by SESS_START (0.5). */
  const heroY = useTransform(p, [0, 0.4], [0, -560], { ease });
  const heroOpacity = useTransform(p, [0.18, 0.38], [1, 0]);
  const dashRiseY = useTransform(p, [0.05, 0.42], [650, 0]);
  const dashRiseScale = useTransform(p, [0.05, 0.42], [0.86, 1]);
  const emptyOpacity = useTransform(p, [0.34, 0.42], [1, 0]);
  const startOpacity = useTransform(p, [0.43, 0.47], [0, 1]);
  const startY = useTransform(p, [0.43, 0.47], [10, 0], { ease });

  /* dashboard morph: upload (176/146/1088/775) → lesson (290.5/359/859/593) */
  const dashLeft   = useTransform(p, [0.42, 0.5], [176,   290.5], { ease });
  const dashTop    = useTransform(p, [0.42, 0.5], [146,   359  ], { ease });
  const dashWidth  = useTransform(p, [0.42, 0.5], [1088,  859  ], { ease });
  const dashHeight = useTransform(p, [0.42, 0.5], [775,   593  ], { ease });
  const uploadOpacity = useTransform(p, [0.44, 0.5], [1, 0]);
  const helpOpacity   = useTransform(p, [0.42, 0.48], [1, 0]);
  const lessonHeaderOpacity = useTransform(p, [0.46, 0.52], [0, 1]);
  const dotsOpacity   = useTransform(p, [0.46, 0.52], [0, 1]);

  return (
    <div ref={wrapRef} id="hero-experience" className="relative md:h-[1200vh]">
      {/* Anchor for the navbar "Features" link — desktop lands on "From chaos to
          clarity." (≈ progress 0.5); mobile lands near the hero demo. */}
      <div id="features" className="pointer-events-none absolute left-0 top-[560px] md:top-[593vh]" aria-hidden />

      {/* ---------- mobile / tablet hero — pinned "cards flow into the app" ---------- */}
      <div className="md:hidden">
        <MobileHero />
      </div>

      {/* ---------- desktop scroll experience ---------- */}
      <div className="sticky top-0 hidden h-screen w-full overflow-hidden bg-white md:block">
        <div ref={stageRef} className="relative h-full w-full">
          <div ref={artboardRef} className="absolute left-1/2 top-1/2" style={{ width: 1440, height: 1024, transform: `translate(-50%, -50%) scale(${scale})` }}>
            {/* flying cards */}
            {CARDS.map((c) => <FlyCard key={c.id} cfg={c} p={p} target={target} />)}

            {/* session headings (slide up from behind the dashboard) */}
            {SESSIONS.map((sess, i) => (
              <SessionHeading key={sess.badge} p={p} win={sessionWin(i)} badge={sess.badge} heading={sess.heading} subtitle={sess.subtitle} isLast={i === SESSIONS.length - 1} />
            ))}

            {/* ===== THE single dashboard ===== */}
            <motion.div className="absolute rounded-[30px] border border-stroke-soft bg-weak p-1.5 shadow-card"
              style={{ left: dashLeft, top: dashTop, width: dashWidth, height: dashHeight, y: dashRiseY, scale: dashRiseScale, transformOrigin: "center bottom" }}>
              <div className="relative flex h-full overflow-hidden rounded-[24px] border border-stroke-soft bg-white">
                {/* sidebar */}
                <aside className="flex w-[54px] shrink-0 flex-col items-center justify-between border-r border-stroke-soft py-5">
                  <div className="flex flex-col items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logos/nuton-dark.png" alt="Nuton" className="h-7 w-7 object-contain" />
                    <div className="h-px w-6 bg-stroke-soft" />
                    <div className="rounded-lg bg-primary-lighter p-2 text-primary"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg></div>
                    <SidebarIcon d="M12 6.5C10.5 5 8 4.5 4 4.5V18c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2V4.5c-4 0-6.5.5-8 2zM12 6.5V20" />
                    <SidebarIcon d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5" />
                  </div>
                  <div className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-stroke-soft text-[11px] font-medium text-strong">
                    AJ<span className="absolute -bottom-1.5 left-0 rounded-full bg-[#c2f5da] px-1 py-px text-[8px] font-medium uppercase leading-none text-[#16643b]">Pro</span>
                  </div>
                </aside>

                {/* main (upload view; covered by the session videos once they fade in) */}
                <div className="flex flex-1 flex-col overflow-hidden">
                  <div className="flex h-[64px] shrink-0 items-center justify-between border-b border-stroke-soft px-6">
                    <div className="flex items-center gap-2 text-faded">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
                      <span className="text-[14px]">Search</span>
                      <span className="ml-1 rounded border border-stroke-soft px-1.5 text-[11px]">⌘K</span>
                    </div>
                    <div className="relative flex h-9 items-center">
                      <motion.button style={{ opacity: helpOpacity }} className="rounded-full border border-stroke-sub px-4 py-1.5 text-[13px] text-strong">Help</motion.button>
                      <motion.div style={{ opacity: lessonHeaderOpacity }} className="absolute right-0 flex items-center gap-2">
                        <div className="flex items-center gap-0.5 rounded-full bg-weak p-0.5">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-strong text-white"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 5h7v15H6a2 2 0 0 1-2-2V5zM20 5h-7v15h5a2 2 0 0 0 2-2V5z" /></svg></span>
                          <span className="flex h-7 w-7 items-center justify-center rounded-full text-faded"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></svg></span>
                        </div>
                        <span className="flex items-center gap-1.5 rounded-full border border-stroke-soft px-3 py-1.5 text-[12px] font-medium text-strong"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></svg>Share</span>
                      </motion.div>
                    </div>
                  </div>

                  <div className="relative flex-1 overflow-hidden">
                    <motion.div style={{ opacity: uploadOpacity }} className="absolute inset-0 flex flex-col items-center px-8 pt-12">
                      <h2 className="font-header text-[34px] font-normal leading-10 tracking-[-0.5px] text-strong"><span className="italic">Learn Anything</span><span className="text-sub"> your own</span> <span className="italic">Way.</span></h2>
                      <p className="mt-2 text-[14px] text-sub">Choose how you want to learn. Use your notes and slides or jump into something new.</p>
                      <div className="mt-6 flex items-center rounded-full border border-stroke-soft bg-weak p-1 shadow-card-xs">
                        <button className="flex items-center gap-1.5 rounded-full bg-strong px-5 py-2.5 text-[13px] font-medium text-white"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" /></svg>My study materials</button>
                        <button className="flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[13px] font-medium text-sub"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5V16h8v-2.5A6 6 0 0012 3z" /></svg>Learn something new</button>
                      </div>
                      <div className="mt-7 w-[560px] rounded-[16px] border border-stroke-soft bg-white p-5 shadow-card-xs">
                        <div className="flex flex-col items-center text-center">
                          <p className="text-[16px] font-medium text-strong">Add your study materials</p>
                          <p className="mt-1 text-[13px] text-sub">Upload PDFs, slides, videos, or audio. You can add more than one.</p>
                        </div>
                        <div className="mt-4 flex items-center justify-center gap-2">
                          <button className="flex items-center gap-1.5 rounded-full bg-soft px-4 py-2.5 text-[13px] font-medium text-strong"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" /><path d="M14 3v5h5" /><path d="M12 17v-5M9.5 13.5L12 11l2.5 2.5" /></svg>Upload Document</button>
                          <button className="flex items-center gap-1.5 rounded-full bg-soft px-4 py-2.5 text-[13px] font-medium text-strong"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-8.49 8.49a5 5 0 0 1-7.07-7.07l8.49-8.49a3.34 3.34 0 0 1 4.72 4.72l-8.49 8.49a1.67 1.67 0 0 1-2.36-2.36l7.78-7.78" /></svg>Paste URL</button>
                        </div>
                        <div ref={dropRef} className="relative mt-4 h-[172px] overflow-hidden rounded-[12px] border border-stroke-soft">
                          <motion.div style={{ opacity: emptyOpacity }} className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
                            <div className="flex items-center justify-center rounded-full bg-soft p-2.5 text-sub"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 16V5M8 9l4-4 4 4M5 19h14" /></svg></div>
                            <p className="text-[13px] font-medium text-strong">Upload or paste to get started</p>
                            <p className="text-[12px] text-sub">I&apos;ll turn what you add into a step-by-step course.</p>
                          </motion.div>
                          <div className="absolute inset-0 flex flex-col justify-center">
                            <FileRow file={FILES[0]} p={p} window={[0.34, 0.4]} />
                            <FileRow file={FILES[1]} p={p} window={[0.36, 0.42]} />
                            <FileRow file={FILES[2]} p={p} window={[0.38, 0.44]} last />
                          </div>
                        </div>
                        <motion.div style={{ opacity: startOpacity, y: startY }} className="mt-4 flex justify-end">
                          <button className="rounded-full bg-strong px-5 py-2.5 text-[13px] font-medium text-white">Start Structured Learning</button>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* session videos fill the whole dashboard, cross-fading in order */}
                {SESSIONS.map((sess, i) => (
                  <SessionVideo key={sess.src} p={p} win={sessionWin(i)} src={sess.src} dur={sess.dur} />
                ))}
              </div>
            </motion.div>

            {/* progress dots — one fills per session, then the next */}
            <motion.div style={{ left: 720, top: 968, x: "-50%", opacity: dotsOpacity }} className="absolute z-20 flex items-center gap-1.5">
              {SESSIONS.map((sess, i) => <SessionDot key={sess.badge} p={p} win={sessionWin(i)} />)}
              {Array.from({ length: TOTAL_DOTS - SESSIONS.length }).map((_, i) => <span key={i} className="h-1.5 w-9 rounded-full bg-stroke-soft" />)}
            </motion.div>

            {/* hero headline (scrolls up + fades) */}
            <motion.div style={{ left: 720, top: 245, x: "-50%", y: heroY, opacity: heroOpacity }} className="absolute z-30 flex w-[724px] flex-col items-center gap-8">
              <div className="relative flex w-full flex-col items-center gap-4">
                <span className="inline-flex items-center gap-0.5 rounded-full bg-primary-light py-0.5 pl-2 pr-1 text-[12px] font-medium leading-5 text-primary-dark">
                  We&apos;ve got new updates
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
                <h1 className="text-center font-header text-[56px] font-normal leading-[64px] tracking-[-0.56px] text-strong">Learn the way <span className="font-header font-semibold italic">Your Brain</span> understands best.</h1>
                <div className="absolute bg-primary opacity-30" style={{ left: 402.97, top: 92, width: 271.4, height: 5.564 }} />
                <p className="w-[590px] text-center text-[18px] leading-[30px] tracking-[-0.27px] text-sub">Turn your materials or ideas into structured lessons, personalized explanations, and intelligent practice built around how you think.</p>
              </div>
              <a href="#" className="flex items-center justify-center rounded-full bg-strong px-6 py-4 text-[14px] font-medium tracking-[-0.084px] text-white">Start learning for free</a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
