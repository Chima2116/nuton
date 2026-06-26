"use client";

import { useState } from "react";
import { AnimatePresence, motion, cubicBezier } from "framer-motion";

const EASE = cubicBezier(0.32, 0.72, 0, 1);

/* ---------- shared bits ---------- */

function FlashIcon() {
  return (
    <span className="flex h-4 w-4 shrink-0 items-center justify-center">
      <svg width="9.6" height="13.2" viewBox="0 0 9.6 13.2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.4 5.4H9.6L4.2 13.2V7.8H0L5.4 0V5.4Z" fill="#262626" />
      </svg>
    </span>
  );
}

function Feature({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-[2px] px-[8px] py-[3px]">
      <FlashIcon />
      <p className="whitespace-nowrap text-[14px] font-medium leading-[20px] tracking-[-0.084px] text-[#262626]">{children}</p>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-[#ebebeb]" />;
}

const headerFont: React.CSSProperties = { fontVariationSettings: '"SOFT" 0, "WONK" 1' };

/* Big price that slides + fades whenever the value or period changes. */
function AnimatedPrice({ value, suffix }: { value: number; suffix: string }) {
  const display = value > 0 ? `$${value.toLocaleString()}` : "0";
  return (
    <p className="relative h-[40px] w-full overflow-hidden font-header tracking-[-0.4px] text-[#171717]" style={headerFont}>
      <AnimatePresence initial={false}>
        <motion.span
          key={`${display}/${suffix}`}
          className="absolute left-0 top-0 flex items-baseline whitespace-nowrap"
          initial={{ y: 26, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -26, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <span className="text-[32px] font-bold leading-[40px]">{display}</span>
          <span className="text-[20px] font-normal leading-[40px]">/{suffix}</span>
        </motion.span>
      </AnimatePresence>
    </p>
  );
}

/* Small text that quickly cross-fades on change. */
function FadeText({ k, className, children }: { k: string; className?: string; children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span key={k} className={className} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
        {children}
      </motion.span>
    </AnimatePresence>
  );
}

/* ---------- billing periods ---------- */

const PERIODS = [
  { key: "Weekly", suffix: "wk", billed: "Billed weekly", basic: 3, pro: 5 },
  { key: "Monthly", suffix: "mo", billed: "Billed monthly", basic: 10, pro: 18 },
  { key: "Quarterly", suffix: "qtr", billed: "Billed every 3 months", basic: 27, pro: 48 },
  { key: "Yearly", suffix: "yr", billed: "Billed annually", basic: 96, pro: 172 },
];

function BillingTab({ idx, onChange }: { idx: number; onChange: (i: number) => void }) {
  return (
    <div className="flex w-full max-w-[412px] items-center rounded-full border border-[#ebebeb] bg-[#f7f7f7] p-[5px] shadow-[0px_1px_1px_rgba(10,13,20,0.03)] sm:w-auto sm:p-[6px]">
      {PERIODS.map((p, i) => (
        <button
          key={p.key}
          onClick={() => onChange(i)}
          className="relative flex-1 rounded-full px-[8px] py-[11px] text-[13px] font-medium leading-[20px] tracking-[-0.084px] sm:flex-none sm:px-[24px] sm:py-[12px] sm:text-[14px]"
        >
          {i === idx && <motion.span layoutId="tabPill" className="absolute inset-0 rounded-full bg-[#171717]" transition={{ duration: 0.4, ease: EASE }} />}
          <span className={`relative z-10 transition-colors duration-300 ${i === idx ? "text-white" : "text-[#5c5c5c]"}`}>{p.key}</span>
        </button>
      ))}
    </div>
  );
}

/* ---------- plan cards ---------- */

function PlanCard({
  name,
  sub,
  price,
  suffix,
  billed,
  buttonLabel,
  buttonVariant,
  caption,
  features,
  border,
  popular,
}: {
  name: string;
  sub: string;
  price: number;
  suffix: string;
  billed: string;
  buttonLabel: string;
  buttonVariant: "muted" | "dark";
  caption: string;
  features: string[];
  border: string;
  popular?: boolean;
}) {
  return (
    <div className={`flex flex-1 flex-col gap-[20px] rounded-[20px] border border-solid bg-[#f7f7f7] p-[24px] ${border}`}>
      {/* title */}
      <div className="flex w-full flex-col gap-[2px]">
        <div className="flex items-center gap-[10px]">
          <p className="whitespace-nowrap text-[20px] font-medium leading-[28px] tracking-[-0.3px] text-[#171717]">{name}</p>
          {popular && (
            <span className="flex items-center justify-center rounded-full bg-[#c0d5ff] px-[8px] py-[2px] text-[12px] font-medium leading-[20px] text-[#182f8b]">
              Popular
            </span>
          )}
        </div>
        <p className="text-[13px] font-normal leading-[20px] tracking-[-0.084px] text-[#5c5c5c]">{sub}</p>
      </div>

      {/* price */}
      <div className="flex w-full flex-col gap-[2px]">
        <AnimatedPrice value={price} suffix={suffix} />
        <p className="w-full text-[13px] font-normal leading-[20px] tracking-[-0.084px] text-[#5c5c5c]">
          <FadeText k={billed}>{billed}</FadeText>
        </p>
      </div>

      {/* button + caption */}
      <div className="flex w-full flex-col gap-[10px]">
        <button
          className={`flex w-full items-center justify-center rounded-full border border-solid px-[8px] py-[12px] text-[14px] font-medium leading-[20px] tracking-[-0.084px] transition-colors ${
            buttonVariant === "dark" ? "border-[#171717] bg-[#171717] text-white" : "border-[#d8d8d8] bg-transparent text-[#171717]"
          }`}
        >
          {buttonLabel}
        </button>
        <p className="w-full text-center text-[13px] font-normal leading-[20px] tracking-[-0.084px] text-[#171717]">{caption}</p>
      </div>

      <Divider />

      {/* features */}
      <div className="flex w-full flex-col gap-[10px]">
        {features.map((f) => (
          <Feature key={f}>{f}</Feature>
        ))}
      </div>
    </div>
  );
}

/* ---------- organizations card ---------- */

const ORG_TIERS = [
  { name: "Starter", rate: 5, seats: "1–1,000 seats", off: "44% off" },
  { name: "Growth", rate: 4, seats: "1,000–5,000 seats", off: "56% off" },
  { name: "Scale", rate: 3, seats: "5,000–10,000 seats", off: "67% off" },
  { name: "Enterprise", rate: 2, seats: "10,000+ seats", off: "78% off" },
];

const ORG_FEATURES = [
  "Admin dashboard",
  "Team & class management",
  "Shared Spaces",
  "Learning analytics",
  "Priority support",
  "Custom integrations",
];

function OrganizationsCard() {
  const [idx, setIdx] = useState(0);
  const t = ORG_TIERS[idx];
  const pct = (idx / (ORG_TIERS.length - 1)) * 100;

  return (
    <div className="flex w-full flex-col gap-[16px] rounded-[20px] border border-solid border-[#d1d1d1] bg-[#f7f7f7] p-[24px]">
      {/* title */}
      <div className="flex w-full flex-col gap-[2px]">
        <p className="text-[20px] font-medium leading-[28px] tracking-[-0.3px] text-[#171717]">Organizations</p>
        <p className="text-[13px] font-normal leading-[20px] tracking-[-0.084px] text-[#5c5c5c]">For schools, bootcamps &amp; teams</p>
      </div>

      {/* price */}
      <div className="flex w-full flex-col gap-[2px]">
        <p className="relative h-[40px] w-full overflow-hidden font-header tracking-[-0.4px] text-[#171717]" style={headerFont}>
          <AnimatePresence initial={false}>
            <motion.span
              key={t.rate}
              className="absolute left-0 top-0 flex items-baseline whitespace-nowrap"
              initial={{ y: 26, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -26, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <span className="text-[32px] font-bold leading-[40px]">Custom / ${t.rate}</span>
              <span className="text-[20px] font-normal leading-[40px]">/month</span>
            </motion.span>
          </AnimatePresence>
        </p>
        <p className="w-full text-[13px] font-normal leading-[20px] tracking-[-0.084px] text-[#5c5c5c]">Per user, billed monthly</p>
      </div>

      {/* button */}
      <button className="flex w-full items-center justify-center rounded-full bg-[#171717] px-[8px] py-[12px] text-[14px] font-medium leading-[20px] tracking-[-0.084px] text-white">
        Contact Sales
      </button>

      {/* tier slider */}
      <div className="flex w-full flex-col gap-[10px]">
        <div className="flex w-full flex-col gap-[12px]">
          <div className="flex w-full justify-between text-[13px] font-medium leading-[20px] tracking-[-0.084px]">
            {ORG_TIERS.map((tt, i) => (
              <button key={tt.name} onClick={() => setIdx(i)} className={`cursor-pointer transition-colors duration-300 ${i === idx ? "text-[#171717]" : "text-[#a4a4a4]"}`}>
                {tt.name}
              </button>
            ))}
          </div>
          <div className="relative h-[16px] w-full">
            <div className="absolute left-0 right-0 top-[3px] h-[10px] rounded-full border border-[#d1d1d1] bg-[#ebebeb]" />
            <div className="absolute left-0 top-[3px] h-[10px] rounded-full bg-[#171717] transition-[width] duration-300 ease-out" style={{ width: `${pct}%` }} />
            <div className="absolute top-1/2 size-[26px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d1d1d1] bg-white shadow-[0px_6px_5px_rgba(14,18,27,0.06),0px_2px_2px_rgba(14,18,27,0.03)] transition-[left] duration-300 ease-out" style={{ left: `${pct}%` }} />
            <input
              type="range"
              min={0}
              max={ORG_TIERS.length - 1}
              step={1}
              value={idx}
              onChange={(e) => setIdx(Number(e.target.value))}
              aria-label="Organization tier"
              className="absolute inset-0 m-0 w-full cursor-pointer opacity-0"
            />
          </div>
        </div>
        <p className="w-full text-center text-[15px] font-medium leading-[24px] tracking-[-0.176px] text-[#171717]">
          <FadeText k={t.name}>{t.seats} · {t.off}</FadeText>
        </p>
      </div>

      <Divider />

      {/* features */}
      <div className="flex w-full flex-col gap-[10px]">
        <p className="px-[8px] text-[14px] font-medium leading-[20px] tracking-[-0.084px] text-[#5c5c5c]">Everything in Pro, plus:</p>
        {ORG_FEATURES.map((f) => (
          <Feature key={f}>{f}</Feature>
        ))}
      </div>
    </div>
  );
}

/* ---------- section ---------- */

export default function PricingSection() {
  const [period, setPeriod] = useState(0);
  const p = PERIODS[period];

  return (
    <section id="pricing" className="w-full bg-white px-6 py-[72px] sm:px-10 sm:py-[110px] lg:px-[100px] lg:py-[140px]" data-nav-theme="light">
      <div className="mx-auto w-full max-w-[1240px]">
        {/* header */}
        <div className="flex flex-col items-center gap-[10px] text-center">
          <span className="flex items-center justify-center rounded-full bg-[#ebf1ff] px-[10px] py-[2px] text-[12px] font-medium leading-[20px] text-[#3559e9]">
            Pricing
          </span>
          <div className="font-header text-[30px] font-normal leading-[1.18] tracking-[-0.48px] sm:text-[40px] lg:text-[48px] lg:leading-[56px]" style={headerFont}>
            <h2 className="text-[#171717]">Get started for free</h2>
            <h2 className="text-[#a4a4a4]">and see the possibilities</h2>
          </div>
        </div>

        {/* billing tab */}
        <div className="mt-[28px] flex justify-center sm:mt-[36px]">
          <BillingTab idx={period} onChange={setPeriod} />
        </div>

        {/* plan cards — stack on mobile, 3-up on desktop with equal height */}
        <div className="mt-[36px] grid grid-cols-1 gap-4 sm:mt-[48px] md:grid-cols-3 md:items-stretch">
          <PlanCard
            name="Free"
            sub="For individuals getting started"
            price={0}
            suffix={p.suffix}
            billed={p.billed}
            buttonLabel="Get Started Free"
            buttonVariant="muted"
            caption="With limited generation"
            border="border-[#d1d1d1]"
            features={["Limited course generation", "Structured learning mode", "Basic AI Tutor access", "Flashcards & quizzes (limited)"]}
          />
          <PlanCard
            name="Basic"
            sub="For focused learners"
            price={p.basic}
            suffix={p.suffix}
            billed={p.billed}
            buttonLabel="Upgrade to Basic"
            buttonVariant="dark"
            caption="Most popular for students"
            border="border-[#d1d1d1]"
            features={["Higher monthly course generations", "Full structured lessons", "Unlimited flashcards", "Unlimited quizzes", "Podcast mode with downloads", "AI Tutor (longer responses)", "Unlimited generations"]}
          />
          <PlanCard
            name="Pro"
            sub="For deep learners & professionals"
            price={p.pro}
            suffix={p.suffix}
            billed={p.billed}
            buttonLabel="Upgrade to Pro"
            buttonVariant="dark"
            caption="Full Nuton experience"
            border="border-[#3559e9]"
            popular
            features={["Unlimited lesson generation", "Unlimited quizzes & flashcards", "Advanced scenario-based quizzes", "Podcast generation", "Unlimited Spaces", "Export notes", "Revision mode"]}
          />
        </div>

        {/* schools + organizations — stack on mobile, side-by-side on desktop */}
        <div className="mt-[40px] flex flex-col gap-8 sm:mt-[64px] lg:flex-row lg:items-start lg:gap-2">
          <div className="lg:w-[475px] lg:shrink-0 lg:pt-[24px]">
            <h3 className="font-header text-[28px] font-normal leading-[1.15] tracking-[-0.4px] text-[#171717] sm:text-[36px] lg:text-[40px] lg:leading-[48px]" style={headerFont}>For Schools and Organizations</h3>
            <p className="mt-[12px] text-[15px] font-normal leading-[26px] tracking-[-0.176px] text-[#5c5c5c] sm:text-[16px] sm:leading-[28px]">Learning infrastructure built for scale.</p>
          </div>
          <div className="w-full lg:w-[756px]">
            <OrganizationsCard />
          </div>
        </div>
      </div>
    </section>
  );
}
