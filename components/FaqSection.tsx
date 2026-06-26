"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, cubicBezier } from "framer-motion";

/* Deliberate, soft easing — slow enough that the reveal never feels snappy. */
const SOFT = cubicBezier(0.32, 0.72, 0, 1);

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "What is Nuton?",
    a: "Nuton is an AI-powered learning platform that transforms your notes, PDFs, slides, documents, videos, and links into structured courses. It helps you understand concepts through AI tutoring, quizzes, flashcards, notes, podcast mode, and personalized learning experiences.",
  },
  {
    q: "How is Nuton different from ChatGPT or other AI tools?",
    a: (
      <>
        General AI tools answer questions. Nuton helps you learn.
        <br />
        Instead of giving you a single response, Nuton structures information into complete learning experiences with chapters, explanations, quizzes, flashcards, notes, and reinforcement tools designed to help you truly understand and retain knowledge.
      </>
    ),
  },
  {
    q: "What types of materials can I upload?",
    a: (
      <>
        You can upload:
        <ul className="my-1 list-disc pl-5">
          <li>PDFs</li>
          <li>PowerPoint presentations</li>
          <li>Word documents</li>
          <li>Text files</li>
          <li>YouTube videos</li>
          <li>Website links</li>
          <li>Audio files</li>
        </ul>
        Nuton automatically transforms them into structured learning experiences.
      </>
    ),
  },
  {
    q: "Can I learn something without uploading my own materials?",
    a: "Yes. Simply switch to Learn Something New and generate a course on virtually any topic. Nuton can also perform in-depth research and turn those findings into structured courses.",
  },
  {
    q: "Can I ask questions while I'm learning?",
    a: "Is my data private and secure?",
  },
  {
    q: "Can Nuton adapt to my learning style?",
    a: "Yes. Nuton personalizes explanations and learning paths based on how you prefer to learn, making complex ideas easier to understand and remember.",
  },
  {
    q: "Do I need AI experience to use Nuton?",
    a: "Not at all. Nuton is designed to be simple and intuitive. Upload your materials or choose a topic, and Nuton takes care of organizing everything into a structured learning experience.",
  },
];

/* Morphs plus → minus: the whole icon eases a quarter-turn while the vertical
   bar collapses, so opening reads as a soft rotate-into-minus. */
function ToggleIcon({ open }: { open: boolean }) {
  return (
    <motion.span
      className="relative block"
      style={{ width: 12.6, height: 12.6 }}
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.5, ease: SOFT }}
    >
      {/* horizontal bar — always present (the minus) */}
      <span className="absolute rounded-full bg-[#171717]" style={{ left: 0, top: 5.4, width: 12.6, height: 1.8 }} />
      {/* vertical bar — collapses away when open */}
      <motion.span
        className="absolute rounded-full bg-[#171717]"
        style={{ left: 5.4, top: 0, width: 1.8, height: 12.6, originY: 0.5 }}
        animate={{ scaleY: open ? 0 : 1, opacity: open ? 0 : 1 }}
        transition={{ duration: 0.5, ease: SOFT }}
      />
    </motion.span>
  );
}

function FaqItem({ q, a, open, onToggle }: { q: string; a: ReactNode; open: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      // Border is always present (transparent when open) so the colour swap
      // never shifts the layout by a pixel — only the fill cross-fades.
      className={`flex w-full items-start justify-center gap-[10px] rounded-[16px] border border-solid px-[20px] py-[14px] text-left transition-colors duration-500 ${
        open ? "border-transparent bg-[#f7f7f7]" : "border-[#dedede] bg-transparent"
      }`}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-[16px] font-medium leading-[28px] tracking-[-0.176px] text-[#171717]">{q}</p>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ height: { duration: 0.55, ease: SOFT }, opacity: { duration: 0.4, ease: SOFT } }}
              className="overflow-hidden"
            >
              <div className="pt-[10px] text-[14px] font-normal leading-[24px] tracking-[-0.084px] text-[#5c5c5c]">{a}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span className="flex h-6 w-6 shrink-0 items-center justify-center">
        <ToggleIcon open={open} />
      </span>
    </button>
  );
}

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faqs" className="relative w-full bg-white px-6 py-[72px] sm:px-10 sm:py-[110px] lg:py-[140px]" data-nav-theme="light">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center">
        {/* Section header */}
        <div className="flex flex-col items-center gap-[12px] text-center">
          <span className="flex items-center justify-center rounded-full bg-[#ebf1ff] px-[10px] py-[2px] text-[12px] font-medium leading-[20px] text-[#3559e9]">
            FAQs
          </span>
          <h2 className="font-header text-[28px] font-normal leading-[1.15] tracking-[-0.4px] text-[#171717] sm:text-[36px] lg:text-[40px] lg:leading-[48px]" style={{ fontVariationSettings: '"SOFT" 0, "WONK" 1' }}>
            Questions? We&#39;ve got answers.
          </h2>
          <p className="max-w-[640px] text-[15px] font-normal leading-[24px] tracking-[-0.176px] text-[#5c5c5c] sm:text-[16px] sm:leading-[28px]">
            Everything you need to know about how Nuton works, how it protects your data, and how it helps you learn with confidence.
          </p>
        </div>

        {/* Accordion — full width up to 600px */}
        <div className="mt-[40px] flex w-full max-w-[600px] flex-col gap-[12px] sm:mt-[52px]">
          {FAQS.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
