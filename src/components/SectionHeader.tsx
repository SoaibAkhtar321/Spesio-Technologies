import React from 'react';
import { motion } from 'motion/react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  isLightMode?: boolean;
}

/** Shared header block (eyebrow pill + title + description) used across homepage sections, with a scroll-triggered fade-in. */
export const SectionHeader: React.FC<SectionHeaderProps> = ({ eyebrow, title, description, isLightMode = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-3xl mx-auto mb-16"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 font-bold text-xs tracking-wider uppercase mb-3">
        {eyebrow}
      </div>
      <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-3 text-base font-medium ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>{description}</p>
      )}
    </motion.div>
  );
};
