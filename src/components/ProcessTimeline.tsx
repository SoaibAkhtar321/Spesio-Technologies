import React from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/companyData';
import { Search, Code2, Rocket } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

interface ProcessTimelineProps {
  isLightMode?: boolean;
}

const STEP_ICONS = [Search, Code2, Rocket];

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ isLightMode = true }) => {
  return (
    <section id="process" className={`py-20 transition-colors duration-200 relative border-t ${
      isLightMode ? 'bg-[#FAFAFB] border-slate-200' : 'bg-[#0A0D14] border-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          isLightMode={isLightMode}
          eyebrow="How We Work"
          title="Our Delivery Process"
          description="A straightforward three-phase workflow that keeps every project on schedule and on scope."
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical track */}
          <div className={`absolute left-6 sm:left-7 top-2 bottom-2 w-0.5 ${isLightMode ? 'bg-slate-200' : 'bg-zinc-800'}`} />
          {/* Animated progress fill */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
            className="absolute left-6 sm:left-7 top-2 bottom-2 w-0.5 bg-gradient-to-b from-orange-600 via-orange-500 to-amber-400"
          />

          <div className="space-y-10">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = STEP_ICONS[idx % STEP_ICONS.length];
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex gap-5 pl-0"
                >
                  <div
                    className={`relative z-10 shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border-2 ${
                      isLightMode ? 'bg-white border-orange-500 shadow-md' : 'bg-zinc-950 border-orange-500 shadow-lg shadow-orange-950/30'
                    }`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                  </div>
                  <div className={`flex-1 p-5 rounded-2xl border ${
                    isLightMode ? 'bg-white border-slate-200 shadow-2xs' : 'bg-zinc-900/60 border-zinc-800'
                  }`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-black text-orange-600">STEP {idx + 1}</span>
                    </div>
                    <h3 className={`text-base sm:text-lg font-bold mb-1.5 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{step.title}</h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
