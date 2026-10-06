import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Building2, Smartphone, ShoppingBag, type LucideIcon } from 'lucide-react';
import { PROJECTS } from '../content/site';
import { SectionHeader } from './SectionHeader';

interface PortfolioProps {
  isLightMode?: boolean;
}

// Short label + icon so each card says at a glance what kind of product it is.
const KIND: Record<string, { label: string; Icon: LucideIcon }> = {
  'property-planet': { label: 'Website', Icon: Building2 },
  campusbite: { label: 'Android app', Icon: Smartphone },
  'eifa-couture': { label: 'E-commerce', Icon: ShoppingBag },
};

export const Portfolio: React.FC<PortfolioProps> = ({ isLightMode = true }) => {
  const ink = isLightMode ? 'text-slate-900' : 'text-white';
  const muted = isLightMode ? 'text-slate-600' : 'text-zinc-400';

  const card = isLightMode
    ? 'bg-[#FDFCFA] border-[#131313]/15 hover:border-[#131313]/60'
    : 'bg-[#0A0A0A] border-zinc-800 hover:border-brand-400';
  const plate = isLightMode ? 'bg-[#0A0A0A] text-[#F4F1EA]' : 'bg-[#1C1F14] text-brand-300';
  const chip = isLightMode ? 'border-[#131313]/20 text-slate-700' : 'border-zinc-700 text-zinc-300';

  return (
    <section
      id="portfolio"
      className={`py-12 sm:py-24 relative border-t ${
        isLightMode ? 'bg-[#EEEAE2] border-[#131313]/20' : 'bg-[#151515] border-zinc-900'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHeader
          isLightMode={isLightMode}
          eyebrow="04 / Selected work"
          title="Selected Projects"
          description="A look at real products built and maintained by Spesio Technologies."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {PROJECTS.map((p, i) => {
            const { label, Icon } = KIND[p.slug] ?? { label: p.category.split('·')[0].trim(), Icon: Building2 };
            return (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`flex flex-col border transition-colors ${card}`}
              >
                {/* Compact plate: type of product + number */}
                <div className={`h-24 px-4 py-3 flex items-end justify-between ${plate}`}>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    <span className="font-mono text-[13px] uppercase tracking-wider">{label}</span>
                  </div>
                  <span className="font-bold text-4xl leading-none opacity-25" aria-hidden="true">{p.number}</span>
                </div>

                <div className="flex flex-col flex-1 p-4 sm:p-5">
                  <h3 className={`text-xl font-bold tracking-tight ${ink}`}>{p.name}</h3>
                  <div className={`mt-1 font-mono text-[12px] uppercase tracking-wider ${muted}`}>{p.category}</div>
                  <p className={`mt-3 text-sm leading-relaxed ${muted}`}>{p.summary}</p>

                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${p.name} tech stack`}>
                    {p.stack.slice(0, 4).map((s) => (
                      <li key={s} className={`px-2 py-0.5 border font-mono text-[12px] ${chip}`}>{s}</li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5">
                    {p.liveUrl ? (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold"
                      >
                        Visit live site <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className={`font-mono text-[12px] uppercase tracking-wider ${muted}`}>Built by Spesio Technologies</span>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
