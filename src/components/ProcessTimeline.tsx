import React from 'react';
import { Search, ClipboardList, Palette, Code2, FlaskConical, Rocket, LifeBuoy } from 'lucide-react';

interface ProcessTimelineProps {
  isLightMode?: boolean;
}

const STEPS = [
  {
    icon: Search,
    title: 'Discovery',
    desc: 'Understanding your business goals, users, and constraints before a single line of code is written.',
  },
  {
    icon: ClipboardList,
    title: 'Planning',
    desc: 'Scoping features, mapping the data model, and setting a realistic, transparent timeline.',
  },
  {
    icon: Palette,
    title: 'Design',
    desc: 'Wireframes and UI direction that match your brand and keep the user experience intuitive.',
  },
  {
    icon: Code2,
    title: 'Development',
    desc: 'Clean, type-safe, well-structured code built in focused, reviewable iterations.',
  },
  {
    icon: FlaskConical,
    title: 'Testing',
    desc: 'Functional, performance, and security checks before anything reaches production.',
  },
  {
    icon: Rocket,
    title: 'Deployment',
    desc: 'A smooth, monitored launch with proper environment and infrastructure configuration.',
  },
  {
    icon: LifeBuoy,
    title: 'Support',
    desc: 'Ongoing post-launch monitoring, fixes, and improvements as your product grows.',
  },
];

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ isLightMode = true }) => {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className={`py-20 transition-colors duration-200 border-t relative overflow-hidden ${
        isLightMode ? 'bg-[#FAFAFB] border-slate-200' : 'bg-[#0A0D14] border-zinc-900'
      }`}
    >
      <div className={`absolute top-0 left-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isLightMode ? 'bg-orange-500/10' : 'bg-orange-600/5'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 font-bold text-xs tracking-wider uppercase mb-3">
            How We Work
          </div>
          <h2
            id="process-heading"
            className={`text-3xl sm:text-4xl font-black tracking-tight ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}
          >
            Our Development Process
          </h2>
          <p className={`mt-3 text-base font-medium ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>
            A structured, predictable path from first conversation to a product you can rely on.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector line (desktop only) */}
          <div
            className={`hidden lg:block absolute top-8 left-0 right-0 h-px ${
              isLightMode ? 'bg-slate-200' : 'bg-zinc-800'
            }`}
            aria-hidden="true"
          />

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6 lg:gap-4">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="relative flex flex-col items-start lg:items-center lg:text-center">
                  <div
                    className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center border shrink-0 ${
                      isLightMode
                        ? 'bg-white border-orange-200 shadow-sm'
                        : 'bg-zinc-900 border-orange-500/30'
                    }`}
                  >
                    <Icon className="w-6 h-6 text-orange-500" aria-hidden="true" />
                    <span
                      className={`absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                        isLightMode ? 'bg-orange-600 text-white' : 'bg-orange-500 text-black'
                      }`}
                    >
                      {idx + 1}
                    </span>
                  </div>
                  <h3 className={`mt-4 text-sm font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                    {step.title}
                  </h3>
                  <p className={`mt-1.5 text-xs leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>
                    {step.desc}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
