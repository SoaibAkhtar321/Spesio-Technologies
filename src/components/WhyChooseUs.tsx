import React from 'react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/companyData';
import { ShieldCheck, Zap, TrendingUp, HeartHandshake } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

interface WhyChooseUsProps {
  isLightMode?: boolean;
}

const ICONS = [ShieldCheck, Zap, TrendingUp, HeartHandshake];

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ isLightMode = true }) => {
  const reasons = [
    { title: 'Founder-Led Delivery', desc: 'You work directly with Soaib Akhtar, the engineer building your product — no account-manager layers or hand-offs.' },
    ...COMPANY_INFO.pillars,
    { title: 'Always Available', desc: `Support availability of ${COMPANY_INFO.stats[3].value}, so you are never left waiting on a critical fix.` },
  ];

  return (
    <section id="why-choose-us" className={`py-20 transition-colors duration-200 relative border-t ${
      isLightMode ? 'bg-white border-slate-200' : 'bg-[#080A10] border-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          isLightMode={isLightMode}
          eyebrow="Why Spesio"
          title="Why Businesses Choose Spesio Technologies"
          description="A founder-led studio built around precision engineering, honest communication, and long-term reliability."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {reasons.map((reason, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <motion.div
                key={reason.title}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } }}
                whileHover={{ y: -4 }}
                className={`p-6 rounded-2xl border transition-colors duration-300 ${
                  isLightMode
                    ? 'bg-[#FAFAFB] border-slate-200 hover:border-orange-300 hover:shadow-md'
                    : 'bg-zinc-900/40 border-zinc-800 hover:border-orange-500/40'
                }`}
              >
                <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className={`text-base font-bold mb-1.5 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{reason.title}</h3>
                <p className={`text-xs leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>{reason.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
