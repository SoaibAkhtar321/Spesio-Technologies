import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Phone, Mail, MapPin, Award, Terminal, CheckCircle } from 'lucide-react';

interface FounderSectionProps {
  isLightMode?: boolean;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ isLightMode = true }) => {
  return (
    <section id="founder" className={`py-10 sm:py-20 transition-colors duration-200 relative border-t ${
      isLightMode ? 'bg-[#D3F0E6] border-[#171B2E]/20' : 'bg-[#171B2E] border-zinc-900'
    }`}>
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">
          
          {/* Left: Founder Avatar & Official Badge */}
          <div className="lg:col-span-5 relative">
            <div className={`relative rounded-sm sm:rounded-sm p-4 sm:p-8 border overflow-hidden transition-colors ${
              isLightMode
                ? 'bg-[#FFFDF8]/60 border-[#171B2E]/20'
                : 'bg-zinc-900 border-brand-500/30'
            }`}>
              {/* Founder Avatar Placeholder Card */}
              <div className={`relative aspect-square rounded-sm sm:rounded-sm border flex flex-col items-center justify-center p-3 sm:p-6 text-center ${
                isLightMode
                  ? 'bg-[#FFF3DC] border-[#171B2E]/20'
                  : 'bg-zinc-900 border-brand-500/20'
              }`}>
                <div className="w-14 h-14 sm:w-24 sm:h-24 rounded-sm sm:rounded-sm bg-brand-500/10 border-2 border-brand-500 flex items-center justify-center mb-2 sm:mb-4">
                  <span className="font-bold text-lg sm:text-3xl text-brand-500">SA</span>
                </div>
                <h3 className={`text-base sm:text-2xl font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{COMPANY_INFO.founder.name}</h3>
                <p className="text-[10px] sm:text-xs font-bold text-brand-600 tracking-wider font-mono uppercase mt-0.5 sm:mt-1">
                  {COMPANY_INFO.founder.title}
                </p>
                <div className={`flex items-center gap-1.5 mt-1.5 sm:mt-3 text-[10px] sm:text-xs font-medium ${
                  isLightMode ? 'text-slate-600' : 'text-zinc-400'
                }`}>
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-500" />
                  <span>Kushinagar, UP, India - 274401</span>
                </div>
              </div>

              {/* Direct Quick Contact Buttons */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-2.5 sm:mt-4 text-[11px] sm:text-xs font-bold">
                <a
                  href={`tel:${COMPANY_INFO.founder.phone}`}
                  className="btn-primary p-2 sm:p-3 rounded-sm sm:rounded-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Founder
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.founder.email}`}
                  className={`p-2 sm:p-3 rounded-sm sm:rounded-sm border flex items-center justify-center gap-1.5 sm:gap-2 transition-colors ${
                    isLightMode
                      ? 'bg-[#171B2E]/10 hover:bg-slate-200 text-slate-800 border-[#171B2E]/20'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-brand-600" />
                  Email Directly
                </a>
              </div>

            </div>
          </div>

          {/* Right: Vision & Engineering Excellence */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-6">
            <div className="inline-flex items-center gap-2 text-brand-600 text-xs font-bold tracking-wider font-mono uppercase">
              06 / Leadership & engineering
            </div>

            <h2 className={`text-2xl sm:text-4xl font-bold tracking-tight ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}>
              Meet {COMPANY_INFO.founder.name}
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed font-medium ${
              isLightMode ? 'text-slate-600' : 'text-zinc-300'
            }`}>
              "{COMPANY_INFO.founder.bio}"
            </p>

            <div className="space-y-2.5 sm:space-y-4 pt-1 sm:pt-2">
              <div className={`p-3 sm:p-4 rounded-sm sm:rounded-sm border flex items-start gap-2.5 sm:gap-3 ${
                isLightMode ? 'bg-[#FFFDF8]/60 border-[#171B2E]/20' : 'bg-zinc-900/80 border-zinc-800'
              }`}>
                <div className="p-1.5 sm:p-2 rounded-sm sm:rounded-sm bg-brand-500/10 border border-brand-500/30 text-brand-600 shrink-0">
                  <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Full-Stack Technical Craftsmanship</h4>
                  <p className={`text-[11px] sm:text-xs mt-0.5 sm:mt-1 leading-snug ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>
                    Specialized in building scalable software systems from database layer up to fluid web and mobile user interfaces.
                  </p>
                </div>
              </div>

              <div className={`p-3 sm:p-4 rounded-sm sm:rounded-sm border flex items-start gap-2.5 sm:gap-3 ${
                isLightMode ? 'bg-[#FFFDF8]/60 border-[#171B2E]/20' : 'bg-zinc-900/80 border-zinc-800'
              }`}>
                <div className="p-1.5 sm:p-2 rounded-sm sm:rounded-sm bg-brand-500/10 border border-brand-500/30 text-brand-600 shrink-0">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Client-Centric Product Execution</h4>
                  <p className={`text-[11px] sm:text-xs mt-0.5 sm:mt-1 leading-snug ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>
                    Every line of code is structured to maximize software reliability, page speeds, security standards, and business revenue growth.
                  </p>
                </div>
              </div>
            </div>


          </div>

        </div>

      </div>
    </section>
  );
};
