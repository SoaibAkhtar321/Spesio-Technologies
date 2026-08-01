import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/companyData';
import { SectionHeader } from './SectionHeader';

interface FAQSectionProps {
  isLightMode?: boolean;
}

/**
 * Frequently Asked Questions, placed just before the Footer so both
 * shoppers and AI search crawlers get clear, direct answers to the
 * most common pre-sales questions. Content mirrors the FAQPage JSON-LD
 * in index.html — keep the two in sync if these change.
 */
export const FAQSection: React.FC<FAQSectionProps> = ({ isLightMode = true }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className={`py-10 sm:py-20 transition-colors duration-200 relative border-t ${
      isLightMode ? 'bg-white border-slate-200' : 'bg-[#080A10] border-zinc-900'
    }`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          isLightMode={isLightMode}
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Straight answers to the questions we hear most before a project starts."
        />

        <div className="space-y-2.5 sm:space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className={`rounded-xl sm:rounded-2xl border overflow-hidden transition-colors duration-300 ${
                  isLightMode
                    ? 'bg-[#FAFAFB] border-slate-200'
                    : 'bg-zinc-900/40 border-zinc-800'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full flex items-center justify-between gap-3 text-left px-4 py-3.5 sm:px-6 sm:py-5 cursor-pointer"
                >
                  <span className={`text-sm sm:text-base font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-maroon-500" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className={`px-4 pb-4 sm:px-6 sm:pb-5 text-xs sm:text-sm leading-relaxed ${
                        isLightMode ? 'text-slate-600' : 'text-zinc-400'
                      }`}>
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
