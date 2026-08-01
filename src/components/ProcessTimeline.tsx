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
  const sectionBg = isLightMode ? '#0B0D12' : '#000000';
  const nextBg = isLightMode ? '#FFFFFF' : '#080A10';

  return (
    <section
      id="process"
      className="py-12 sm:py-24 lg:py-28 relative overflow-hidden"
      style={{ backgroundColor: sectionBg }}
    >
      {/* Ambient orange glow + faint blueprint grid to reinforce the "engineering workflow" feel */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(rgba(249,115,22,0.35) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, black, transparent)',
        }}
      />
      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[36rem] h-[24rem] bg-orange-600/10 blur-3xl rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Intro — this is the section's own "cover page" so it never reads as a bare list */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-bold text-xs tracking-wider uppercase mb-4">
            <Workflow className="w-3.5 h-3.5" />
            Our Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
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
            className="absolute left-[18px] sm:left-7 top-2 bottom-2 w-0.5 bg-gradient-to-b from-orange-600 via-orange-500 to-amber-400 shadow-[0_0_12px_rgba(249,115,22,0.5)]"
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
                  {/* Icon node — highlights in orange while its step is the one centered in view, plus a playful hover */}
                  <motion.div
                    initial="rest"
                    whileInView="active"
                    whileHover="active"
                    viewport={{ once: false, amount: 0.6 }}
                    variants={{
                      rest: { scale: 1, boxShadow: '0 0 0 rgba(249,115,22,0)' },
                      active: { scale: 1.08, boxShadow: '0 0 0 6px rgba(249,115,22,0.12)' },
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 shrink-0 w-9 h-9 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center border-2 bg-black border-orange-500"
                  >
                    <span className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-orange-500 text-black text-[8px] sm:text-[10px] font-black flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-orange-500" />
                  </motion.div>

                  {/* Card — subtle elevation on hover, orange border while centered in view */}
                  <motion.div
                    initial="rest"
                    whileInView="active"
                    viewport={{ once: false, amount: 0.6 }}
                    whileHover={{ y: -4 }}
                    variants={{
                      rest: { borderColor: 'rgba(39,39,42,1)', backgroundColor: 'rgba(24,24,27,0.5)' },
                      active: { borderColor: 'rgba(249,115,22,0.5)', backgroundColor: 'rgba(24,24,27,0.85)' },
                    }}
                    transition={{ duration: 0.35 }}
                    className="flex-1 p-3 sm:p-6 rounded-xl sm:rounded-2xl border shadow-lg shadow-black/40"
                  >
                    <span className="text-[9px] sm:text-[10px] font-black text-orange-500 tracking-wider">STEP {idx + 1}</span>
                    <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-1.5 mt-0.5 sm:mt-1 text-white">{step.title}</h3>
                    <p className="text-[11px] sm:text-sm leading-snug sm:leading-relaxed text-zinc-400">{step.desc}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Soft fade back into the next (light) section so the dark band ends deliberately, not abruptly */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${nextBg})` }}
      />
    </section>
  );
};
