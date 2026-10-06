import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../content/site';
import { SectionHeader } from './SectionHeader';

interface PortfolioProps {
  isLightMode?: boolean;
}

export const Portfolio: React.FC<PortfolioProps> = ({ isLightMode = true }) => {
  const PLATE = ['#2646D8', '#E8553D', '#0F8B7A']; // one colour per project
  const [lead, ...rest] = PROJECTS; // Property Planet is first in site.ts and leads Selected Work
  const ink = isLightMode ? 'text-slate-900' : 'text-white';
  const muted = isLightMode ? 'text-slate-600' : 'text-zinc-400';
  const rule = isLightMode ? 'border-[#171B2E]' : 'border-zinc-700';
  const meta = (p: typeof lead) => [p.category, ...p.stack].join(' · ');

  const LiveLink: React.FC<{ url?: string; label?: string }> = ({ url, label }) =>
    url ? (
      <a href={url} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold">
        {label ?? 'Visit live site'} <ArrowUpRight className="w-4 h-4" />
      </a>
    ) : (
      <span className={`font-mono text-[11px] uppercase tracking-wider ${muted}`}>Built by Spesio Technologies</span>
    );

  return (
    <section id="portfolio" className={`py-12 sm:py-24 relative border-t ${
      isLightMode ? 'bg-[#FFF0B8] border-[#171B2E]/20' : 'bg-[#12162A] border-zinc-900'
    }`}>
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHeader
          isLightMode={isLightMode}
          eyebrow="04 / Selected work"
          title="Selected Projects"
          description="A look at real products built and maintained by Spesio Technologies."
        />

        {/* Featured: Property Planet */}
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-14 sm:mb-24"
        >
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div>
              <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-brand-600">{lead.number} / Featured</div>
              <h3 className={`mt-3 text-3xl sm:text-5xl font-bold tracking-tight ${ink}`}>{lead.name}</h3>
              <p className={`mt-4 text-base sm:text-lg ${ink}`}>{lead.summary}</p>
              <p className={`mt-3 text-sm leading-relaxed ${muted}`}>{lead.overview}</p>
            </div>
            <div><LiveLink url={lead.liveUrl} label="Visit propertyplanet.vercel.app" /></div>
          </div>

          <div style={{ backgroundColor: PLATE[0] }} className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between min-h-[18rem] text-[#FFF6E5]">
            <div className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-zinc-400 leading-relaxed">{meta(lead)}</div>
            <div className="font-bold text-[5rem] sm:text-[8rem] leading-none tracking-tighter opacity-20 select-none" aria-hidden="true">{lead.number}</div>
            <ul className="text-sm">
              {lead.capabilities.map((c) => (
                <li key={c} className="py-2 border-t border-zinc-700">{c}</li>
              ))}
            </ul>
          </div>
        </motion.article>

        {/* Remaining projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {rest.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
              className={`flex flex-col gap-4 ${rule}`}
            >
              <div style={{ backgroundColor: PLATE[i + 1] }} className="h-32 sm:h-40 p-4 flex items-end justify-between text-[#FFF6E5]"><span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider">{p.category}</span><span className="font-bold text-6xl sm:text-7xl leading-none opacity-30" aria-hidden="true">{p.number}</span></div>
              <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight ${ink}`}>{p.name}</h3>
              <p className={`text-sm sm:text-base ${ink}`}>{p.summary}</p>
              <p className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-wider leading-relaxed ${muted}`}>{meta(p)}</p>
              <div className="mt-auto pt-2"><LiveLink url={p.liveUrl} /></div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
