import { CSSProperties } from "react";

export type FileFormat = "ppt" | "pdf" | "xls" | "doc" | "link" | "youtube";

const FORMAT_COLOR: Record<Exclude<FileFormat, "link" | "youtube">, string> = {
  ppt: "#e16614", // State/Warning
  pdf: "#e93544", // State/Error
  xls: "#178c4e", // Success/700
  doc: "#3559e9", // State/Primary
};

export function FormatGlyph({ format }: { format: FileFormat }) {
  if (format === "link") {
    return (
      <div className="flex h-[31.8px] w-[31.8px] items-center justify-center rounded-[4px] text-strong">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.6 2.8 2.6 15.2 0 18M12 3c-2.6 2.8-2.6 15.2 0 18" />
        </svg>
      </div>
    );
  }
  if (format === "youtube") {
    return (
      <div className="flex h-[31.8px] w-[31.8px] items-center justify-center rounded-[6px] bg-[#e93544]">
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path d="M9 7.5v9l8-4.5-8-4.5z" fill="#fff" />
        </svg>
      </div>
    );
  }
  return (
    <div
      className="flex h-[31.8px] w-[31.8px] items-center justify-center rounded-[4px] text-[8px] font-bold text-white"
      style={{ backgroundColor: FORMAT_COLOR[format] }}
    >
      {format.toUpperCase()}
    </div>
  );
}

/** The white pill visual (no positioning) — shared by static and animated cards. */
export function CardVisual({
  format,
  label,
  width = 270,
}: {
  format: FileFormat;
  label: string;
  width?: number;
}) {
  return (
    <div
      className="flex items-start gap-1.5 rounded-2xl border border-stroke-soft bg-white p-2.5 shadow-card"
      style={{ width }}
    >
      <div className="flex h-[47.7px] w-[47.7px] shrink-0 items-center justify-center rounded-[10.6px] bg-weak">
        <FormatGlyph format={format} />
      </div>
      <p className="min-w-0 flex-1 pt-1.5 text-[14px] font-medium leading-5 tracking-[-0.084px] text-strong">
        {label}
      </p>
    </div>
  );
}

type Props = {
  format: FileFormat;
  label: string;
  /** centre coordinates within the 1440×1024 frame + rotation in degrees */
  cx: number;
  cy: number;
  rotate: number;
  width?: number;
};

/**
 * A scattered document card from the hero. Positioned by its centre so the
 * rotation matches Figma (rotation preserves the bounding-box centre).
 */
export default function FloatingCard({
  format,
  label,
  cx,
  cy,
  rotate,
  width = 270,
}: Props) {
  const style: CSSProperties = {
    position: "absolute",
    left: cx,
    top: cy,
    transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
  };

  return (
    <div style={style}>
      <CardVisual format={format} label={label} width={width} />
    </div>
  );
}
