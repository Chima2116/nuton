"use client";

import { useEffect, useRef, useState } from "react";
import { motion, cubicBezier } from "framer-motion";

/* Smooth, premium easing — long, settled ease-out with no overshoot/bounce. */
const APPLE = cubicBezier(0.16, 1, 0.3, 1);
const rise = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

const headerFont: React.CSSProperties = { fontVariationSettings: '"SOFT" 0, "WONK" 1' };

/* RemixIcon glyphs (24×24) used in the footer, fill = currentColor */
const SOCIALS: { name: string; path: string }[] = [
  {
    name: "TikTok",
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
  {
    name: "X",
    path: "M17.6874 3.0625L12.6907 8.77425L8.37232 3.0625H2.11328L9.58432 12.8387L2.50415 20.9375H5.53865L11.0068 14.6886L15.7274 20.9375H21.8865L14.0958 10.6342L20.7222 3.0625H17.6874ZM16.6232 19.1218L5.61867 4.78287H7.27068L18.2724 19.1218H16.6232Z",
  },
  {
    name: "Facebook",
    path: "M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z",
  },
  {
    name: "LinkedIn",
    path: "M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 0 1-1.548-1.549 1.548 1.548 0 1 1 1.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3z",
  },
];

export default function FooterSection() {
  // Measure the wordmark's container so "Nuton" fills the width at any
  // breakpoint / padding — no desktop-only calc.
  const fillRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(0);
  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    const update = () => setFontSize(el.clientWidth / 2.85); // RooneySans "Nuton" em-ratio
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-white px-6 sm:px-10 lg:px-[100px]" data-nav-theme="light">
      {/* CTA — two-line headline + button (scroll-triggered slide-up) */}
      <div className="flex flex-col items-center pt-[120px] text-center sm:pt-[150px] lg:pt-[176px]">
        <motion.div
          className="flex flex-col items-center"
          initial={rise.initial}
          whileInView={rise.animate}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: APPLE }}
        >
          <h2 className="font-header text-[30px] font-normal leading-[1.15] tracking-[-0.48px] text-[#171717] sm:text-[40px] lg:text-[48px] lg:leading-[56px]" style={headerFont}>Bring your materials</h2>
          <h2 className="font-header text-[30px] font-normal leading-[1.15] tracking-[-0.48px] text-[#a4a4a4] sm:text-[40px] lg:text-[48px] lg:leading-[56px]" style={headerFont}>we&rsquo;ll structure them.</h2>
        </motion.div>
        <motion.button
          className="mt-[24px] flex items-center justify-center rounded-full bg-[#171717] px-[24px] py-[16px] text-[14px] font-medium leading-[20px] tracking-[-0.084px] text-white"
          initial={rise.initial}
          whileInView={rise.animate}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: APPLE, delay: 0.18 }}
        >
          Start learning your way
        </motion.button>
      </div>

      {/* bottom group — pinned to the bottom of the screen */}
      <div className="mt-auto w-full pb-[40px] pt-[80px] sm:pb-[48px]">
        {/* oversized Nuton wordmark — measured to fill the available width */}
        <div ref={fillRef} className="w-full">
          <span
            className="block w-full select-none font-wordmark leading-[0.74] tracking-[-0.02em] text-[#dcdcdc]"
            style={{ fontSize: fontSize || undefined }}
          >
            Nuton
          </span>
        </div>

        {/* bottom bar — stacks on mobile, 3-column on desktop */}
        <div className="mt-[32px] flex flex-col items-center gap-5 text-center sm:mt-[40px] sm:grid sm:grid-cols-3 sm:items-center sm:gap-0 sm:text-left">
          <p className="text-[13px] font-normal leading-[20px] tracking-[-0.084px] text-[#5c5c5c] sm:whitespace-nowrap sm:text-[14px]">Copyright © Nuton Inc. All rights reserved.</p>
          <div className="flex items-center justify-center gap-[24px] whitespace-nowrap text-[14px] font-medium leading-[20px] tracking-[-0.084px] text-[#5c5c5c]">
            <a href="#" className="transition-opacity hover:opacity-70">Terms and conditions</a>
            <a href="#" className="transition-opacity hover:opacity-70">Privacy policy</a>
          </div>
          <div className="flex items-center justify-center gap-[16px] sm:justify-end">
            {SOCIALS.map((s) => (
              <a key={s.name} href="#" aria-label={s.name} className="text-[#171717] transition-opacity hover:opacity-70">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
