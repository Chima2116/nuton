/**
 * App preview panel that peeks up from the bottom of the hero.
 * Figma node 3280:51718 — outer 965×684 at left 241 / top 862. The frame is
 * only 1024 tall, so roughly the top ~160px shows above the fold. All sizes
 * mirror the (already down-scaled) values from the Figma design context.
 */

const stroke = "#7b7b7b";

function Icon({ d, size = 13 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

export default function DashboardPreview() {
  return (
    <div
      className="absolute rounded-[25px] border-[0.88px] border-stroke-soft bg-weak p-1"
      style={{ left: 241.36, top: 862.59, width: 965, height: 684 }}
    >
      <div className="flex h-full items-stretch overflow-hidden rounded-[21px] border-[0.65px] border-stroke-soft bg-white shadow-card-xs">
        {/* Sidebar */}
        <aside className="flex w-[47px] shrink-0 flex-col items-center justify-between border-r-[0.65px] border-stroke-soft px-[10px] py-[16px]">
          <div className="flex flex-1 flex-col items-center gap-[13px]">
            {/* Mark */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/nuton-dark.png" alt="Nuton" className="h-[23px] w-[23px] object-contain" />
            <div className="h-px w-full bg-stroke-soft" />
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center rounded-full bg-primary-lighter p-[5px] text-primary">
                <Icon d="M12 5v14M5 12h14" />
              </div>
              <div className="flex items-center justify-center rounded-lg p-[5px]" style={{ color: stroke }}>
                <Icon d="M12 6.5C10.5 5 8 4.5 4 4.5V18c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2V4.5c-4 0-6.5.5-8 2zM12 6.5V20" />
              </div>
              <div className="flex items-center justify-center rounded-lg p-[5px]" style={{ color: stroke }}>
                <Icon d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5" />
              </div>
            </div>
          </div>
          {/* Footer avatar */}
          <div className="relative w-full">
            <div className="mb-2 h-px w-full bg-stroke-soft" />
            <div className="relative inline-flex h-[26px] w-[26px] items-center justify-center rounded-full bg-stroke-soft text-[10px] font-medium text-strong">
              AJ
              <span className="absolute -bottom-1 left-0 rounded-full bg-[#c2f5da] px-1 py-px text-[7px] font-medium uppercase leading-none text-[#16643b]">
                Pro
              </span>
            </div>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex flex-1 flex-col items-center gap-[82px] overflow-hidden">
          {/* Header nav */}
          <div className="flex h-[65px] w-full items-center justify-between border-b-[0.65px] border-stroke-soft px-[21px]">
            <div className="flex items-center gap-[26px]">
              <div className="flex items-center gap-1 text-[#888f96]">
                <Icon d="M21 21l-4.3-4.3M11 18a7 7 0 100-14 7 7 0 000 14z" size={15} />
                <span className="text-[10px]">Search</span>
              </div>
              <span className="rounded border-[0.65px] border-stroke-soft px-1 py-px text-[8px] text-[#888f96]">
                ⌘K
              </span>
            </div>
            <button className="rounded-full border-[0.65px] border-stroke-sub px-4 py-2 text-[9px] font-medium text-strong">
              Help
            </button>
          </div>

          {/* Content */}
          <div className="flex w-full flex-col items-center gap-[26px] px-4">
            <div className="flex flex-col items-center gap-1 text-center">
              <h2 className="font-header text-[26px] font-normal leading-[31px] tracking-[-0.26px] text-strong">
                <span className="italic">Learn Anything</span>
                <span className="text-sub"> your own</span>{" "}
                <span className="italic">Way.</span>
              </h2>
              <p className="text-[10px] leading-[18px] tracking-[-0.11px] text-sub">
                Choose how you want to learn. Use your notes and slides or jump
                into something new.
              </p>
            </div>

            {/* Learning tab toggle */}
            <div className="flex items-center rounded-full border-[0.65px] border-stroke-soft bg-weak p-1 shadow-card-xs">
              <button className="flex items-center gap-1 rounded-full bg-strong px-4 py-2 text-[9px] font-medium text-white">
                <Icon d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                My study materials
              </button>
              <button className="flex items-center gap-1 rounded-full px-4 py-2 text-[9px] font-medium text-sub">
                <Icon d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.6.5 1 1.2 1 2V16h6v-.5c0-.8.4-1.5 1-2A6 6 0 0012 3z" />
                Learn something new
              </button>
            </div>

            {/* Upload card */}
            <div className="flex w-[509px] max-w-full flex-col items-center gap-[10px] rounded-[13px] border-[0.65px] border-stroke-soft bg-white px-[26px] py-4 shadow-card-xs">
              <div className="flex flex-col items-center gap-1 text-center">
                <p className="text-[12px] font-medium leading-5 tracking-[-0.18px] text-strong">
                  Add your study materials
                </p>
                <p className="text-[9px] leading-4 tracking-[-0.05px] text-sub">
                  Upload PDFs, slides, videos, or audio. You can add more than
                  one.
                </p>
              </div>
              <div className="flex items-center gap-1 rounded-full border-[0.65px] border-stroke-soft bg-white p-[5px]">
                <button className="flex items-center gap-1 rounded-full bg-soft p-[10px] text-[9px] font-medium text-strong">
                  <Icon d="M12 16V4M8 8l4-4 4 4M5 20h14" />
                  Upload Document
                </button>
                <button className="flex items-center gap-1 rounded-full bg-soft p-[10px] text-[9px] font-medium text-strong">
                  <Icon d="M9 7l-4 4a4 4 0 005.7 5.7l6-6a3 3 0 00-4.2-4.2l-6 6" />
                  Paste URL
                </button>
              </div>
              <div className="flex h-[193px] w-[457px] max-w-full flex-col items-center justify-center gap-[10px] rounded-[13px] border-[0.65px] border-stroke-soft">
                <div className="flex items-center justify-center rounded-full bg-soft p-[10px] text-sub">
                  <Icon d="M12 16V5M8 9l4-4 4 4M5 19h14" />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-medium leading-[18px] tracking-[-0.11px] text-strong">
                    Upload or paste to get started
                  </p>
                  <p className="text-[9px] leading-4 tracking-[-0.05px] text-sub">
                    I&apos;ll turn what you add into a step-by-step course.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
