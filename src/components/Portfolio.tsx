import React from 'react';
import { Smartphone, ShoppingBag, Plus, ArrowUpRight } from 'lucide-react';

interface PortfolioProps {
  isLightMode?: boolean;
}

const PROJECTS = [
  {
    id: 'campusbite',
    name: 'CampusBite',
    category: 'Android Application',
    desc: 'A smart campus dining and queue-management app that lets students order food ahead and skip the line.',
    tags: ['Kotlin', 'Jetpack Compose', 'Firebase', 'MVVM'],
    icon: Smartphone,
    accent: 'from-orange-600 to-amber-500',
  },
  {
    id: 'eifa-couture',
    name: 'Eifa Couture',
    category: 'Luxury Fashion Website',
    desc: 'A full-stack e-commerce storefront for a luxury Indian ethnic-wear label, with secure checkout and order management.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Supabase'],
    icon: ShoppingBag,
    accent: 'from-amber-500 to-orange-600',
  },
];

export const Portfolio: React.FC<PortfolioProps> = ({ isLightMode = true }) => {
  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className={`py-20 transition-colors duration-200 border-t ${
        isLightMode ? 'bg-white border-slate-200' : 'bg-[#080A10] border-zinc-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 font-bold text-xs tracking-wider uppercase mb-3">
            Our Work
          </div>
          <h2
            id="portfolio-heading"
            className={`text-3xl sm:text-4xl font-black tracking-tight ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}
          >
            Projects We've Built
          </h2>
          <p className={`mt-3 text-base font-medium ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>
            A look at real products shipped by Spesio Technologies.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                className={`group rounded-2xl border overflow-hidden transition-all ${
                  isLightMode
                    ? 'bg-white border-slate-200 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/5'
                    : 'bg-zinc-900/50 border-zinc-800 hover:border-orange-500/40'
                }`}
              >
                {/* Elegant gradient placeholder visual (no fake screenshots) */}
                <div className={`relative h-40 flex items-center justify-center bg-gradient-to-br ${project.accent}`}>
                  <div className="absolute inset-0 opacity-20 [background-size:20px_20px] bg-[radial-gradient(#ffffff_1px,transparent_1px)]" />
                  <Icon className="w-14 h-14 text-white/90 relative z-10" strokeWidth={1.5} aria-hidden="true" />
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className={`text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                        {project.name}
                      </h3>
                      <p className="text-xs text-orange-600 font-semibold mt-0.5">{project.category}</p>
                    </div>
                    <ArrowUpRight
                      className={`w-4 h-4 shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                        isLightMode ? 'text-slate-400' : 'text-zinc-600'
                      }`}
                      aria-hidden="true"
                    />
                  </div>

                  <p className={`text-sm leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
                          isLightMode
                            ? 'bg-orange-50 text-orange-700 border-orange-200'
                            : 'bg-zinc-800 text-orange-300 border-zinc-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Placeholder card: Your Business Could Be Here */}
          <div
            className={`rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center p-8 min-h-[280px] transition-all ${
              isLightMode
                ? 'border-slate-300 hover:border-orange-400 bg-slate-50/50'
                : 'border-zinc-700 hover:border-orange-500/50 bg-zinc-900/20'
            }`}
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 border ${
                isLightMode ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-700'
              }`}
            >
              <Plus className="w-6 h-6 text-orange-500" aria-hidden="true" />
            </div>
            <h3 className={`text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              Your Business Could Be Here
            </h3>
            <p className={`text-sm mt-2 max-w-[220px] ${isLightMode ? 'text-slate-500' : 'text-zinc-500'}`}>
              Let's build something worth showcasing together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
