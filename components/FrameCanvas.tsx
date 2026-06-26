"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

/**
 * Renders children on a fixed 1440×1024 Figma artboard and scales the whole
 * frame down to fit narrower viewports, so the layout stays pixel-faithful.
 */
export default function FrameCanvas({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / 1440));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full overflow-hidden" style={{ height: 1024 * scale }}>
      <div
        className="relative h-[1024px] w-[1440px] origin-top-left"
        style={{ transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
