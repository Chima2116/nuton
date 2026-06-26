/**
 * File-format glyphs used by the floating cards in the hero.
 * Each is a rounded colored square with a short label, matching the
 * Figma "File Format" instances.
 */

type BadgeProps = { className?: string };

function Square({
  color,
  label,
  className,
}: {
  color: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-[10px] text-[8px] font-bold tracking-tight text-white ${className ?? ""}`}
      style={{ backgroundColor: color }}
    >
      {label}
    </div>
  );
}

export const PptIcon = ({ className }: BadgeProps) => (
  <Square color="#e16614" label="PPT" className={className} />
);

export const PdfIcon = ({ className }: BadgeProps) => (
  <Square color="#e93544" label="PDF" className={className} />
);

export const XlsIcon = ({ className }: BadgeProps) => (
  <Square color="#178c4e" label="XLS" className={className} />
);

export const DocIcon = ({ className }: BadgeProps) => (
  <Square color="#3559e9" label="DOC" className={className} />
);

export const LinkIcon = ({ className }: BadgeProps) => (
  <div
    className={`flex items-center justify-center rounded-[10px] bg-soft text-strong ${className ?? ""}`}
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
    </svg>
  </div>
);

export const YoutubeIcon = ({ className }: BadgeProps) => (
  <div
    className={`flex items-center justify-center rounded-[10px] bg-[#e93544] text-white ${className ?? ""}`}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 6l10 6-10 6V6z" fill="#fff" />
    </svg>
  </div>
);
