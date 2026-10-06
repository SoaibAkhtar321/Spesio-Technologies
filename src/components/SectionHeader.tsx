import React from 'react';
import { motion } from 'motion/react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  isLightMode?: boolean;
}

/** Editorial section header: thin rule, mono index label on the left, large heading on the right. */
export const SectionHeader: React.FC<SectionHeaderProps> = ({ eyebrow, title, description, isLightMode = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4 }}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-10 pt-4 mb-8 sm:mb-14 border-t ${
        isLightMode ? 'border-[#171B2E]' : 'border-zinc-700'
      }`}
    >
      <div className="lg:col-span-4 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-brand-600">{eyebrow}</div>
      <div className="lg:col-span-8">
        <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{title}</h2>
        {description && (
          <p className={`mt-3 text-base max-w-xl ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>{description}</p>
        )}
      </div>
    </motion.div>
  );
};
