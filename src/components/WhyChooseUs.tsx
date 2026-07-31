import React from 'react';
import { Zap, Cpu, Layers3, Wallet, LifeBuoy, ShieldCheck } from 'lucide-react';

interface WhyChooseUsProps {
  isLightMode?: boolean;
}

const REASONS = [
  {
    icon: Zap,
    title: 'Fast, Focused Delivery',
    desc: 'A lean, direct workflow with no account-manager layers slowing things down — decisions and iterations happen quickly.',
  },
  {
    icon: Cpu,
    title: 'Modern Technology Stack',
    desc: 'React, Next.js, TypeScript, and Supabase — the same tooling used by fast-scaling, well-funded product teams.',
  },
  {
    icon: Layers3,
    title: 'Scalable Architecture',
    desc: 'Systems are designed from day one to handle growth in traffic, data, and features without a costly rebuild.',
  },
  {
    icon: Wallet,
    title: 'Transparent, Affordable Pricing',
    desc: 'Clear, itemized estimates with no hidden fees — you know exactly what you are paying for before work begins.',
  },
  {
    icon: LifeBuoy,
    title: 'Post-Launch Support',
    desc: 'Every engagement includes a support window after launch to fix issues fast and help you settle in with confidence.',
  },
  {
    icon: ShieldCheck,
    title: 'Full Code Ownership',
    desc: 'You receive complete source code and documentation — your product, your IP, no vendor lock-in.',
  },
];

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ isLightMode = true }) => {
  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className={`py-20 transition-colors duration-200 border-t ${
        isLightMode ? 'bg-white border-slate-200' : 'bg-[#080A10] border-zinc-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 font-bold text-xs tracking-wider uppercase mb-3">
            Why Spesio
          </div>
          <h2
            id="why-us-heading"
            className={`text-3xl sm:text-4xl font-black tracking-tight ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}
          >
            Why Businesses Choose Us
          </h2>
          <p className={`mt-3 text-base font-medium ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>
            A software partner built around speed, quality, and honest communication — not just another dev shop.
          </p>
        </div>

        {/* Reason Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className={`p-6 rounded-2xl border transition-all ${
                  isLightMode
                    ? 'bg-[#FAFAFB] border-slate-200 hover:border-orange-300 hover:shadow-md hover:shadow-orange-500/5'
                    : 'bg-zinc-900/40 border-zinc-800 hover:border-orange-500/40 hover:bg-zinc-900/80'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${
                    isLightMode ? 'bg-orange-50 border-orange-200' : 'bg-orange-500/10 border-orange-500/30'
                  }`}
                >
                  <Icon className="w-6 h-6 text-orange-500" aria-hidden="true" />
                </div>
                <h3 className={`text-base font-bold mb-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  {reason.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>
                  {reason.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
