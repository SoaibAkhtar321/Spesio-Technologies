import React from 'react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/companyData';
import { ArrowRight, Code, Globe, Smartphone, Brain, CheckCircle2, Sparkles, Phone, Mail, MapPin } from 'lucide-react';
import { SpesioLogo } from './SpesioLogo';

interface HeroProps {
  onOpenAiAssistant: () => void;
  onOpenEstimator: () => void;
  isLightMode: boolean;
}

const containerStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export const Hero: React.FC<HeroProps> = ({ onOpenAiAssistant, onOpenEstimator, isLightMode }) => {
  return (
    <section className={`relative overflow-hidden pt-6 pb-10 sm:pt-12 sm:pb-20 md:pt-20 md:pb-28 transition-colors duration-200 ${
      isLightMode ? 'bg-[#FAFAFB]' : 'bg-[#0A0D14]'
    }`}>
      {/* Background Subtle Gradient Blobs & Grid */}
      <motion.div
        animate={{ x: [0, 24, 0], y: [0, -18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
          isLightMode ? 'bg-orange-500/15' : 'bg-orange-600/10'
        }`}
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 16, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className={`absolute bottom-0 left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
          isLightMode ? 'bg-amber-400/10' : 'bg-orange-500/5'
        }`}
      />
      {/* Subtle floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            className={`absolute w-1 h-1 rounded-full ${isLightMode ? 'bg-orange-400/50' : 'bg-orange-400/30'}`}
            style={{ left: `${8 + i * 12}%`, top: `${15 + (i % 4) * 20}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          />
        ))}
      </div>
      <div className={`absolute inset-0 [background-size:24px_24px] pointer-events-none ${
        isLightMode
          ? 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] opacity-40'
          : 'bg-[radial-gradient(#1e293b_1px,transparent_1px)] opacity-20'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">

          {/* Left Column: Heading & Value Proposition */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 space-y-3 sm:space-y-6 text-left"
          >

            {/* Pill Badge */}
            <motion.div variants={fadeUp} className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs border ${
              isLightMode
                ? 'bg-white border-orange-200 text-orange-600'
                : 'bg-zinc-900/90 border-orange-500/30 text-orange-400'
            }`}>
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-ping" />
              <span className="font-bold">SPESIO TECHNOLOGIES</span>
              <span className={isLightMode ? 'text-slate-300' : 'text-zinc-600'}>|</span>
              <span className={isLightMode ? 'text-slate-600' : 'text-zinc-300'}>Official Agency Showcase</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 variants={fadeUp} className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] sm:leading-[1.1] ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}>
              Websites, Apps &amp; AI{' '}
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_6s_ease_infinite]">
                Built to Grow Your Business.
              </span>
            </motion.h1>

            {/* Sub-Headline */}
            <motion.p variants={fadeUp} className={`text-sm sm:text-xl font-medium max-w-2xl leading-relaxed ${
              isLightMode ? 'text-slate-600' : 'text-zinc-300'
            }`}>
              We design and develop business websites, Android applications, admin panels, ERP systems, and e-commerce solutions that help businesses attract customers, streamline operations, and increase revenue.
            </motion.p>

            {/* Quick 4 Core Service Icons Bar */}
            <motion.div variants={containerStagger} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 pt-1 sm:pt-2">
              {[
                { icon: Globe, label: 'WEBSITES' },
                { icon: Smartphone, label: 'ANDROID APPS' },
                { icon: Code, label: 'SOFTWARE' },
                { icon: Brain, label: 'AI AUTOMATION' },
                { icon: CheckCircle2, label: 'ERP / CRM' },
              ].map(({ icon: Icon, label }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  whileHover={{ y: -3, scale: 1.03 }}
                  className={`p-2 sm:p-3 rounded-xl border flex items-center gap-2 sm:gap-2.5 shadow-2xs transition-all will-change-transform ${
                    isLightMode
                      ? 'bg-white border-slate-200/90 hover:border-orange-300'
                      : 'bg-zinc-900/80 border-zinc-800 hover:border-orange-500/40'
                  }`}
                >
                  <motion.div whileHover={{ rotate: 12 }} className="shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                  </motion.div>
                  <div className={`text-[10px] sm:text-[11px] font-bold ${isLightMode ? 'text-slate-800' : 'text-zinc-200'}`}>{label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-5 pt-2 sm:pt-5">
              <motion.button
                onClick={onOpenEstimator}
                whileHover={{ y: -3, boxShadow: '0 16px 36px -6px rgba(249,115,22,0.55)' }}
                whileTap={{ scale: 0.97, y: 0 }}
                className="group relative inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/25 transition-shadow cursor-pointer overflow-hidden will-change-transform"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl bg-orange-400/40 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative">Calculate Project Scope</span>
                <ArrowRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                onClick={onOpenAiAssistant}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97, y: 0 }}
                className={`group inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-4 rounded-xl text-sm font-semibold border transition-colors cursor-pointer will-change-transform ${
                  isLightMode
                    ? 'bg-white hover:bg-orange-50/60 text-slate-800 border-slate-300 hover:border-orange-300 shadow-2xs'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-orange-500/30'
                }`}
              >
                <Sparkles className="w-4 h-4 text-orange-500 transition-transform duration-300 group-hover:rotate-12" />
                Ask Spesio AI Assistant
              </motion.button>

              <motion.a
                href="#contact"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97, y: 0 }}
                className={`group inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-4 rounded-xl text-sm font-semibold border transition-colors cursor-pointer will-change-transform ${
                  isLightMode
                    ? 'bg-white hover:bg-orange-50/60 text-slate-800 border-slate-300 hover:border-orange-300 shadow-2xs'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-orange-500/30'
                }`}
              >
                <MapPin className="w-4 h-4 text-orange-500 transition-transform duration-300 group-hover:-translate-y-0.5" />
                Contact Us
              </motion.a>
            </motion.div>

            {/* Value Pillars List */}
            <motion.div variants={fadeUp} className={`pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-6 text-xs font-medium ${
              isLightMode ? 'text-slate-600' : 'text-zinc-400'
            }`}>
              {COMPANY_INFO.pillars.map((pillar) => (
                <motion.div key={pillar.title} whileHover={{ y: -1 }} className="flex items-center gap-1.5 will-change-transform">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  <span>{pillar.title}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={fadeUp} className="pt-1.5 sm:pt-3 flex flex-wrap gap-1.5 sm:gap-2">
              {[
                '1 Year Free Maintenance',
                'Native Android Development',
                'Business Websites',
                'Fast Delivery',
                'SEO Ready',
                'WhatsApp Integration',
              ].map((badge) => (
                <span
                  key={badge}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border ${
                    isLightMode
                      ? 'bg-white border-slate-200 text-slate-700'
                      : 'bg-zinc-900/80 border-zinc-800 text-zinc-300'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3 text-orange-500" />
                  {badge}
                </span>
              ))}
            </motion.div>

          </motion.div>

          {/* Right Column: Interactive Card & Quick Contact Highlight */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient glow lifting the card off the page */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 bg-gradient-to-br from-orange-500/20 via-amber-400/10 to-transparent blur-2xl rounded-[2rem] pointer-events-none"
            />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className={`relative rounded-2xl border shadow-xl transition-colors overflow-hidden ${
                isLightMode
                  ? 'bg-white border-slate-200 shadow-slate-200/80'
                  : 'bg-gradient-to-b from-zinc-900 to-black border-orange-500/20 shadow-orange-950/40'
              }`}
            >
              {/* Top accent bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 bg-[length:200%_auto] animate-[gradient-shift_6s_ease_infinite]" />

              <div className="p-4 sm:p-6">
                {/* Header inside right card */}
                <div className={`flex items-center justify-between pb-3 sm:pb-4 border-b ${
                  isLightMode ? 'border-slate-100' : 'border-zinc-800'
                }`}>
                  <div className="flex items-center gap-3">
                    <SpesioLogo isLightMode={isLightMode} variant="mark" size="md" />
                    <div>
                      <h3 className={`font-bold text-base ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{COMPANY_INFO.name}</h3>
                      <p className={`text-xs ${isLightMode ? 'text-slate-500' : 'text-zinc-400'}`}>{COMPANY_INFO.founder.name} • {COMPANY_INFO.founder.title}</p>
                    </div>
                  </div>
                  <span className="relative inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    AVAILABLE NOW
                  </span>
                </div>

                {/* Founder Contact Spotlight */}
                <div className="py-4 space-y-2.5 text-xs">
                  {[
                    { icon: Phone, label: 'Phone', value: COMPANY_INFO.founder.phone, href: `tel:${COMPANY_INFO.founder.phone}` },
                    { icon: Mail, label: 'Email', value: COMPANY_INFO.founder.email, href: `mailto:${COMPANY_INFO.founder.email}` },
                    { icon: MapPin, label: 'Location', value: COMPANY_INFO.founder.location, href: undefined },
                  ].map(({ icon: Icon, label, value, href }) => {
                    const row = (
                      <div className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-colors ${
                        isLightMode
                          ? 'bg-slate-50 border-slate-200 text-slate-700 hover:border-orange-200 hover:bg-orange-50/40'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-orange-500/30'
                      }`}>
                        <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                          isLightMode ? 'bg-orange-100' : 'bg-orange-500/10'
                        }`}>
                          <Icon className="w-3.5 h-3.5 text-orange-600" />
                        </div>
                        <span className={isLightMode ? 'text-slate-500 font-medium' : 'text-zinc-500 font-medium'}>{label}:</span>
                        <span className={`font-semibold truncate ml-auto ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{value}</span>
                      </div>
                    );
                    return href ? (
                      <a key={label} href={href} className="block hover:no-underline">
                        {row}
                      </a>
                    ) : (
                      <div key={label}>{row}</div>
                    );
                  })}
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <motion.div whileHover={{ y: -2 }} className="bg-orange-50 border border-orange-200 p-3 rounded-xl text-center">
                    <div className="text-xl font-extrabold text-orange-600">100%</div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">Client Focus</div>
                  </motion.div>
                  <motion.div whileHover={{ y: -2 }} className={`p-3 rounded-xl border text-center ${
                    isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900 border-zinc-800'
                  }`}>
                    <div className={`text-xl font-extrabold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>4 Core</div>
                    <div className={`text-[10px] uppercase font-semibold ${isLightMode ? 'text-slate-500' : 'text-zinc-400'}`}>Tech Offerings</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
