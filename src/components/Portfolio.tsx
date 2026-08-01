import React from 'react';
import { motion } from 'motion/react';
import { PORTFOLIO } from '../data/companyData';
import { ArrowUpRight, Layers } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

interface PortfolioProps {
  isLightMode?: boolean;
}

export const Portfolio: React.FC<PortfolioProps> = ({ isLightMode = true }) => {
  return (
    <section id="portfolio" className={`py-10 sm:py-20 transition-colors duration-200 relative border-t ${
      isLightMode ? 'bg-white border-slate-200' : 'bg-[#080A10] border-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          isLightMode={isLightMode}
          eyebrow="Our Work"
          title="Selected Projects"
          description="A look at real products built and maintained by Spesio Technologies."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-2 gap-3 sm:gap-6"
        >
          {PORTFOLIO.map((project) => (
            <motion.div
              key={project.id}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
              whileHover={{ y: -6 }}
              className={`group relative p-3.5 sm:p-7 rounded-xl sm:rounded-3xl border overflow-hidden transition-colors duration-300 ${
                isLightMode
                  ? 'bg-[#FAFAFB] border-slate-200 hover:border-maroon-300 hover:shadow-xl hover:shadow-slate-200/60'
                  : 'bg-zinc-900/50 border-zinc-800 hover:border-maroon-500/40'
              }`}
            >
              {/* Hover glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-maroon-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-2 sm:mb-4 gap-2">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-maroon-600 uppercase tracking-widest">{project.category}</span>
                    <h3 className={`text-sm sm:text-2xl font-black mt-0.5 sm:mt-1 leading-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{project.name}</h3>
                  </div>
                  <span
                    className={`shrink-0 text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full border ${
                      project.status === 'Production'
                        ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <p className={`text-[11px] sm:text-sm leading-snug sm:leading-relaxed mb-2.5 sm:mb-5 line-clamp-3 sm:line-clamp-none ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>
                  {project.description}
                </p>

                <div className="space-y-1.5 sm:space-y-2">
                  <h4 className={`hidden sm:flex text-[10px] font-bold uppercase tracking-wider items-center gap-1.5 ${
                    isLightMode ? 'text-slate-500' : 'text-zinc-500'
                  }`}>
                    <Layers className="w-3.5 h-3.5 text-maroon-500" />
                    Stack
                  </h4>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className={`px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg text-[9px] sm:text-[11px] font-semibold border ${
                          isLightMode
                            ? 'bg-white text-slate-700 border-slate-200'
                            : 'bg-zinc-950 text-zinc-300 border-zinc-800'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-1.5 text-[10px] sm:text-xs font-bold mt-2.5 sm:mt-5 pt-2 sm:pt-4 border-t transition-colors ${
                      isLightMode ? 'border-slate-200 text-maroon-600 hover:text-maroon-700' : 'border-zinc-800 text-maroon-400 hover:text-maroon-300'
                    }`}
                  >
                    <span>View Live Site</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <div className={`flex items-center gap-1.5 text-[10px] sm:text-xs font-bold mt-2.5 sm:mt-5 pt-2 sm:pt-4 border-t ${
                    isLightMode ? 'border-slate-200 text-slate-400' : 'border-zinc-800 text-zinc-500'
                  } group-hover:text-maroon-600 transition-colors`}>
                    <span>Built by Spesio Technologies</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
