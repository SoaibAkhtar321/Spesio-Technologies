import React from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/companyData';
import { Search, Code2, Rocket, Workflow } from 'lucide-react';

interface ProcessTimelineProps {
  isLightMode?: boolean;
}

const STEP_ICONS = [Search, Code2, Rocket];

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ isLightMode = true }) => {
  // This section is a deliberately dark "engineering" chapter, distinct from the
  // light Services chapter above it — see SectionDivider, which fills with the
  // same colors so the curve lines up exactly.
  const sectionBg = isLightMode ? '#131313' : '#000000';

  return (
    <section
      id="process"
      className="py-12 sm:py-24 lg:py-28 relative overflow-hidden"
      style={{ backgroundColor: sectionBg }}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Intro — this is the section's own "cover page" so it never reads as a bare list */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-left max-w-4xl mb-8 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 text-brand-400 font-bold text-xs tracking-wider font-mono uppercase mb-4">
            <Workflow className="w-3.5 h-3.5" />
            03 / Our process
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            How We Build Successful Software
          </h2>
          <p className="mt-4 text-base font-medium text-zinc-400">
            Every project follows a structured engineering workflow designed for speed, quality, scalability and transparency.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical track */}
          <div className="absolute left-[18px] sm:left-7 top-2 bottom-2 w-0.5 bg-zinc-800" />
          {/* Animated progress fill, with a soft glow so it reads as "live" rather than static */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
            className="absolute left-[18px] sm:left-7 top-2 bottom-2 w-0.5 bg-brand-600"
          />

          <div className="space-y-4 sm:space-y-10">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = STEP_ICONS[idx % STEP_ICONS.length];
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex gap-3 sm:gap-5"
                >
                  {/* Icon node — highlights in cobalt while its step is the one centered in view, plus a playful hover */}
                  <motion.div
                    initial="rest"
                    whileInView="active"
                    whileHover="active"
                    viewport={{ once: false, amount: 0.6 }}
                    variants={{
                      rest: { scale: 1, boxShadow: 'none' },
                      active: { scale: 1.08, boxShadow: 'none' },
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 shrink-0 w-9 h-9 sm:w-14 sm:h-14 rounded-sm sm:rounded-sm flex items-center justify-center border-2 bg-black border-brand-500"
                  >
                    <span className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-brand-500 text-black text-[8px] sm:text-[12px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-brand-500" />
                  </motion.div>

                  {/* Card — subtle elevation on hover, cobalt border while centered in view */}
                  <motion.div
                    initial="rest"
                    whileInView="active"
                    viewport={{ once: false, amount: 0.6 }}
                    whileHover={{ y: -4 }}
                    variants={{
                      rest: { borderColor: 'rgba(38,38,37,1)', backgroundColor: 'rgba(26,26,25,0.5)' },
                      active: { borderColor: 'rgba(101,133,255,0.8)', backgroundColor: 'rgba(26,26,25,0.85)' },
                    }}
                    transition={{ duration: 0.35 }}
                    className="flex-1 p-3 sm:p-6 rounded-sm sm:rounded-sm border"
                  >
                    <span className="text-[13px] sm:text-[12px] font-bold text-brand-500 tracking-wider">STEP {idx + 1}</span>
                    <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-1.5 mt-0.5 sm:mt-1 text-white">{step.title}</h3>
                    <p className="text-[13px] sm:text-sm leading-snug sm:leading-relaxed text-zinc-400">{step.desc}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
};
