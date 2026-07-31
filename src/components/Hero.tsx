import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { ArrowRight, Code, Globe, Smartphone, Brain, CheckCircle2, Sparkles, Phone } from 'lucide-react';
import { SpesioLogo } from './SpesioLogo';

interface HeroProps {
  onOpenAiAssistant: () => void;
  onOpenEstimator: () => void;
  onOpenContact: () => void;
  isLightMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAiAssistant, onOpenEstimator, onOpenContact, isLightMode }) => {
  return (
    <section className={`relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 transition-colors duration-200 ${
      isLightMode ? 'bg-[#FAFAFB]' : 'bg-[#0A0D14]'
    }`}>
      {/* Background Subtle Gradient Blobs & Grid */}
      <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isLightMode ? 'bg-orange-500/15' : 'bg-orange-600/10'
      }`} />
      <div className={`absolute bottom-0 left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
        isLightMode ? 'bg-amber-400/10' : 'bg-orange-500/5'
      }`} />
      <div className={`absolute inset-0 [background-size:24px_24px] pointer-events-none ${
        isLightMode
          ? 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] opacity-40'
          : 'bg-[radial-gradient(#1e293b_1px,transparent_1px)] opacity-20'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Pill Badge */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs border ${
              isLightMode
                ? 'bg-white border-orange-200 text-orange-600'
                : 'bg-zinc-900/90 border-orange-500/30 text-orange-400'
            }`}>
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-ping" />
              <span className="font-bold">SPESIO TECHNOLOGIES</span>
              <span className={isLightMode ? 'text-slate-300' : 'text-zinc-600'}>|</span>
              <span className={isLightMode ? 'text-slate-600' : 'text-zinc-300'}>Official Agency Showcase</span>
            </div>

            {/* Main Headline */}
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}>
              We build.{' '}
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                You grow.
              </span>
            </h1>

            {/* Sub-Headline */}
            <p className={`text-lg sm:text-xl font-medium max-w-2xl leading-relaxed ${
              isLightMode ? 'text-slate-600' : 'text-zinc-300'
            }`}>
              {COMPANY_INFO.subTagline} High-performance custom software, mobile apps, scalable web systems, and intelligent AI automation for growing modern businesses.
            </p>

            {/* Quick 4 Core Service Icons Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { icon: Code, label: 'SOFTWARE' },
                { icon: Globe, label: 'WEB' },
                { icon: Smartphone, label: 'APP' },
                { icon: Brain, label: 'AI' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className={`p-3 rounded-xl border flex items-center gap-2.5 shadow-2xs transition-all ${
                  isLightMode
                    ? 'bg-white border-slate-200/90'
                    : 'bg-zinc-900/80 border-zinc-800'
                }`}>
                  <Icon className="w-5 h-5 text-orange-500 shrink-0" />
                  <div className={`text-xs font-bold ${isLightMode ? 'text-slate-800' : 'text-zinc-200'}`}>{label}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onOpenEstimator}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                Calculate Project Scope
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAiAssistant}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                  isLightMode
                    ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-2xs'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-orange-500/30'
                }`}
              >
                <Sparkles className="w-4 h-4 text-orange-500" />
                Ask Spesio AI Assistant
              </button>

              <button
                onClick={onOpenContact}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                  isLightMode
                    ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-2xs'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-orange-500/30'
                }`}
              >
                <Phone className="w-4 h-4 text-orange-500" />
                Contact Us
              </button>
            </div>

            {/* Value Pillars List */}
            <div className={`pt-4 flex flex-wrap items-center gap-6 text-xs font-medium ${
              isLightMode ? 'text-slate-600' : 'text-zinc-400'
            }`}>
              {COMPANY_INFO.pillars.map((pillar) => (
                <div key={pillar.title} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  <span>{pillar.title}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Interactive Card & Quick Contact Highlight */}
          <div className="lg:col-span-5 relative">
            <div className={`relative rounded-2xl p-6 border shadow-xl transition-all ${
              isLightMode
                ? 'bg-white border-slate-200 shadow-slate-200/80'
                : 'bg-gradient-to-b from-zinc-900 to-black border-orange-500/20 shadow-orange-950/40'
            }`}>
              
              {/* Header inside right card */}
              <div className={`flex items-center justify-between pb-4 border-b ${
                isLightMode ? 'border-slate-100' : 'border-zinc-800'
              }`}>
                <div className="flex items-center gap-3">
                  <SpesioLogo isLightMode={isLightMode} variant="mark" size="md" />
                  <div>
                    <h3 className={`font-bold text-base ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{COMPANY_INFO.name}</h3>
                    <p className={`text-xs ${isLightMode ? 'text-slate-500' : 'text-zinc-400'}`}>{COMPANY_INFO.founder.name} • {COMPANY_INFO.founder.title}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  AVAILABLE NOW
                </span>
              </div>

              {/* Founder Contact Spotlight */}
              <div className="py-4 space-y-2.5 text-xs">
                <div className={`flex items-center justify-between p-2.5 rounded-lg border ${
                  isLightMode ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-zinc-900/60 border-zinc-800 text-zinc-300'
                }`}>
                  <span className={isLightMode ? 'text-slate-500 font-medium' : 'text-zinc-500 font-medium'}>Phone:</span>
                  <a href={`tel:${COMPANY_INFO.founder.phone}`} className="font-semibold text-orange-600 hover:underline">
                    {COMPANY_INFO.founder.phone}
                  </a>
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-lg border ${
                  isLightMode ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-zinc-900/60 border-zinc-800 text-zinc-300'
                }`}>
                  <span className={isLightMode ? 'text-slate-500 font-medium' : 'text-zinc-500 font-medium'}>Email:</span>
                  <a href={`mailto:${COMPANY_INFO.founder.email}`} className={`font-semibold hover:underline truncate max-w-[200px] ${
                    isLightMode ? 'text-slate-900' : 'text-white'
                  }`}>
                    {COMPANY_INFO.founder.email}
                  </a>
                </div>
                <div className={`flex items-center justify-between p-2.5 rounded-lg border ${
                  isLightMode ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-zinc-900/60 border-zinc-800 text-zinc-300'
                }`}>
                  <span className={isLightMode ? 'text-slate-500 font-medium' : 'text-zinc-500 font-medium'}>Location:</span>
                  <span className={`font-medium ${isLightMode ? 'text-slate-800' : 'text-zinc-300'}`}>{COMPANY_INFO.founder.location}</span>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="bg-orange-50 border border-orange-200 p-3 rounded-xl text-center">
                  <div className="text-xl font-extrabold text-orange-600">100%</div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Client Focus</div>
                </div>
                <div className={`p-3 rounded-xl border text-center ${
                  isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900 border-zinc-800'
                }`}>
                  <div className={`text-xl font-extrabold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>4 Core</div>
                  <div className={`text-[10px] uppercase font-semibold ${isLightMode ? 'text-slate-500' : 'text-zinc-400'}`}>Tech Offerings</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
