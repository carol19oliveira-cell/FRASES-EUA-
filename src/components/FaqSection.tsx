/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQItem } from "../types";

const faqData: FAQItem[] = [
  {
    id: "iniciante",
    question: "Is this suitable for beginner bassists?",
    answer: "Yes! If you already know basic hand posture, fretboard basics, and can hold down a simple groove, you can immediately start applying these licks and fills to your playing."
  },
  {
    id: "acesso",
    question: "How and when do I receive access?",
    answer: "Instant Digital Access! As soon as your payment is confirmed, you'll receive an automated email with direct access to our member portal, video breakdown lessons, audio backing tracks, and full downloadable bass tablatures."
  },
  {
    id: "vitalicio",
    question: "Is this a one-time purchase with lifetime access?",
    answer: "100% Yes. You pay once and keep full access forever. Download all backing tracks and stream the lesson videos anytime at your own pace with zero subscriptions or recurring fees."
  },
  {
    id: "estilo",
    question: "What bass types and genres does this work for?",
    answer: "These licks and fills are formatted for 4-string, 5-string, and 6-string basses. They fit seamlessly into Funk, R&B, Gospel, Soul, Rock, Pop, and Fusion grooves."
  }
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-20 px-6 max-w-4xl mx-auto relative z-10">
      {/* Decorative background glow behind FAQ */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ambient-glow-amber pointer-events-none -z-10 opacity-60" />

      <div className="text-center mb-12">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-brand-orange">
          Got Questions?
        </span>
        <h2 className="mt-2 text-4xl md:text-5xl font-display font-extrabold italic tracking-tight text-white uppercase">
          Frequently <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber px-2">Asked Questions</span>
        </h2>
      </div>

      <div className="space-y-4">
        {faqData.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "bg-brand-card border-brand-orange/40 shadow-lg shadow-brand-orange/5"
                  : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.03]"
              }`}
            >
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left font-sans font-semibold text-slate-100 hover:text-white transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className={`w-5 h-5 transition-colors ${isOpen ? "text-brand-orange" : "text-slate-400"}`} />
                  <span className="text-base md:text-lg">{item.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 ml-4 p-1.5 rounded-full bg-white/[0.04] text-slate-400"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-1 text-sm md:text-base text-slate-300 leading-relaxed border-t border-white/[0.04] bg-black/[0.15]">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
