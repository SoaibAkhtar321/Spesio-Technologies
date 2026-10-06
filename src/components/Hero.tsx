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
    <section id="hero" className={`relative overflow-hidden pt-6 pb-10 sm:pt-12 sm:pb-20 md:pt-20 md:pb-28 transition-colors duration-200 ${
      isLightMode ? 'bg-[#F7F5F0]' : 'bg-[#0A0A0A]'
    }`}>
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">

          {/* Left Column: Heading & Value Proposition */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 space-y-3 sm:space-y-6 text-left"
          >

            {/* Pill Badge */}
            <motion.div variants={fadeUp} className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm text-xs font-semibold border ${
              isLightMode
                ? 'bg-[#FDFCFA]/60 border-brand-200 text-brand-600'
                : 'bg-zinc-900/90 border-brand-500/30 text-brand-400'
            }`}>
              <span className="flex h-2 w-2 rounded-full bg-brand-500" />
              <span className="font-bold">SPESIO TECHNOLOGIES</span>
              <span className={isLightMode ? 'text-slate-300' : 'text-zinc-600'}>|</span>
              <span className={isLightMode ? 'text-slate-600' : 'text-zinc-300'}>Official Agency Showcase</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 variants={fadeUp} className={`text-[1.7rem] sm:text-4xl lg:text-[2.6rem] font-bold tracking-tight leading-[1.2] sm:leading-[1.18] ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}>
              <span className="bg-[#7F9140] text-[#0A0A0A] px-2 sm:px-3 [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                Websites, Apps &amp; AI
              </span>{' '}
              <span className="text-brand-600">
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
                  className={`p-2 sm:p-3 rounded-sm border flex items-center gap-2 sm:gap-2.5 transition-all will-change-transform ${
                    isLightMode
                      ? 'bg-[#FDFCFA]/60 border-[#131313]/20 hover:border-brand-300'
                      : 'bg-zinc-900/80 border-zinc-800 hover:border-brand-500/40'
                  }`}
                >
                  <motion.div whileHover={{ rotate: 12 }} className="shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500" />
                  </motion.div>
                  <div className={`text-[12px] sm:text-[13px] font-bold ${isLightMode ? 'text-slate-800' : 'text-zinc-200'}`}>{label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-5 pt-2 sm:pt-5">
              <motion.button
                onClick={onOpenEstimator}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97, y: 0 }}
                className="btn-primary group relative inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-4 rounded-sm text-sm font-bold hover:bg-brand-700 transition-shadow cursor-pointer overflow-hidden will-change-transform"
              >
                <span className="relative">Calculate Project Scope</span>
                <ArrowRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                onClick={onOpenAiAssistant}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97, y: 0 }}
                className={`group inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-4 rounded-sm text-sm font-semibold border transition-colors cursor-pointer will-change-transform ${
                  isLightMode
                    ? 'bg-transparent hover:bg-[#0A0A0A]/10 text-[#131313] border-[#131313]'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-brand-500/30'
                }`}
              >
                <Sparkles className="w-4 h-4 text-brand-500 transition-transform duration-300 group-hover:rotate-12" />
                Ask Spesio AI Assistant
              </motion.button>

              <motion.a
                href="#contact"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97, y: 0 }}
                className={`group inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-4 rounded-sm text-sm font-semibold border transition-colors cursor-pointer will-change-transform ${
                  isLightMode
                    ? 'bg-transparent hover:bg-[#0A0A0A]/10 text-[#131313] border-[#131313]'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-brand-500/30'
                }`}
              >
                <MapPin className="w-4 h-4 text-brand-500 transition-transform duration-300 group-hover:-translate-y-0.5" />
                Contact Us
              </motion.a>
            </motion.div>



          </motion.div>

          {/* Right Column: Interactive Card & Quick Contact Highlight */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className={`relative rounded-sm border transition-colors overflow-hidden ${
                isLightMode
                  ? 'bg-[#FDFCFA]/60 border-[#131313]/20'
                  : 'bg-zinc-900 border-zinc-800'
              }`}
            >
              {/* Top accent bar */}
              <div className="h-1.5 w-full bg-brand-600" />

              <div className="p-4 sm:p-6">
                {/* Header inside right card */}
                <div className={`flex items-center justify-between pb-3 sm:pb-4 border-b ${
                  isLightMode ? 'border-[#131313]/20' : 'border-zinc-800'
                }`}>
                  <div className="flex items-center gap-3">
                    <SpesioLogo isLightMode={isLightMode} variant="mark" size="md" />
                    <div>
                      <h3 className={`font-bold text-base ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{COMPANY_INFO.name}</h3>
                      <p className={`text-xs ${isLightMode ? 'text-slate-500' : 'text-zinc-400'}`}>{COMPANY_INFO.founder.name} • {COMPANY_INFO.founder.title}</p>
                    </div>
                  </div>
                  <span className="relative inline-flex items-center gap-1.5 text-[12px] font-bold px-2.5 py-1 rounded-sm bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    AVAILABLE NOW
                  </span>
                </div>


                {/* Stats Bar */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <motion.div whileHover={{ y: -2 }} className="bg-[#0A0A0A]/10 border border-brand-200 p-3 rounded-sm text-center">
                    <div className="text-xl font-semibold text-brand-600">100%</div>
                    <div className="text-[12px] text-slate-500 uppercase font-semibold">Client Focus</div>
                  </motion.div>
                  <motion.div whileHover={{ y: -2 }} className={`p-3 rounded-sm border text-center ${
                    isLightMode ? 'bg-[#FDFCFA] border-[#131313]/20' : 'bg-zinc-900 border-zinc-800'
                  }`}>
                    <div className={`text-xl font-semibold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>4 Core</div>
                    <div className={`text-[12px] uppercase font-semibold ${isLightMode ? 'text-slate-500' : 'text-zinc-400'}`}>Tech Offerings</div>
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
