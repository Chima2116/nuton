/* eslint-disable @next/next/no-img-element */

/**
 * Nuton logo using the official brand assets.
 * - `dark` (navbar over a dark section) → white wordmark variant
 * - default (over a light section)       → black wordmark variant
 */
export default function Logo({ dark = false }: { dark?: boolean }) {
  const src = dark ? "/logos/nuton-light-text.png" : "/logos/nuton-dark-text.png";
  return (
    <div className="flex h-[60px] items-center px-2">
      <img src={src} alt="Nuton" className="h-[60px] w-auto object-contain" />
    </div>
  );
}
