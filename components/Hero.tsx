import FloatingCard from "./FloatingCard";

/**
 * Hero of "Desktop - 15". All coordinates are expressed in the 1440×1024
 * Figma frame and rendered absolutely inside <FrameCanvas>.
 */
export default function Hero() {
  return (
    <>
      {/* Scattered document cards — centre coords + rotation from Figma */}
      <FloatingCard format="ppt" label="Advanced Interaction Design.ppt" cx={329} cy={135} rotate={16} />
      <FloatingCard format="xls" label="Accessibility Standards Overview.pdf" cx={1208} cy={232} rotate={-16} />
      <FloatingCard format="pdf" label="HCI Principles and Guidelines.pdf" cx={164} cy={361} rotate={7} />
      <FloatingCard format="link" label="https://www.interaction-des…" cx={1274} cy={419} rotate={12} />
      <FloatingCard format="doc" label="Usability Testing Methods.doc" cx={289} cy={727} rotate={-16} />
      <FloatingCard format="youtube" label="https://www.youtube.com/w…" cx={1228} cy={639} rotate={12} />

      {/* Centre content block (Figma "Frame 1": 724.47 wide @ 357.77 / 245) */}
      <div
        className="absolute flex flex-col items-center gap-8"
        style={{ left: 357.77, top: 245, width: 724.47 }}
      >
        <div className="flex w-full flex-col items-center gap-4">
          {/* Badge */}
          <span className="inline-flex items-center gap-0.5 rounded-full bg-primary-light py-0.5 pl-2 pr-1 text-[12px] font-medium leading-5 text-primary-dark">
            We&apos;ve got a new updates
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>

          {/* Headline */}
          <h1 className="text-center font-header text-[56px] font-normal leading-[64px] tracking-[-0.56px] text-strong">
            Learn the way{" "}
            <span className="font-header font-semibold italic">Your Brain</span>{" "}
            understands best.
          </h1>

          {/* Subtitle */}
          <p className="w-[590px] text-center text-[18px] font-normal leading-[30px] tracking-[-0.27px] text-sub">
            Turn your materials or ideas into structured lessons, personalized
            explanations, and intelligent practice built around how you think.
          </p>
        </div>

        {/* Blue underline accent under "Your Brain" (30% opacity) */}
        <div
          className="absolute bg-primary opacity-30"
          style={{ left: 402.97, top: 92, width: 271.4, height: 5.564 }}
        />

        {/* CTA */}
        <a
          href="#"
          className="flex items-center justify-center rounded-full bg-strong px-6 py-4 text-[14px] font-medium tracking-[-0.084px] text-white transition-opacity hover:opacity-90"
        >
          Start learning for free
        </a>
      </div>
    </>
  );
}
