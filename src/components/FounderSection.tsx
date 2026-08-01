import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Phone, Mail, MapPin, Award, Terminal, CheckCircle } from 'lucide-react';

interface FounderSectionProps {
  isLightMode?: boolean;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ isLightMode = true }) => {
  return (
    <section id="founder" className={`py-10 sm:py-20 transition-colors duration-200 relative border-t ${
      isLightMode ? 'bg-[#FAFAFB] border-slate-200' : 'bg-[#0A0D14] border-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">
          
          {/* Left: Founder Avatar & Official Badge */}
          <div className="lg:col-span-5 relative">
            <div className={`relative rounded-2xl sm:rounded-3xl p-4 sm:p-8 border shadow-2xl overflow-hidden transition-colors ${
              isLightMode
                ? 'bg-white border-slate-200 shadow-slate-200/80'
                : 'bg-gradient-to-b from-zinc-900 to-black border-orange-500/30'
            }`}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Founder Avatar Placeholder Card */}
              <div className={`relative aspect-square rounded-xl sm:rounded-2xl border flex flex-col items-center justify-center p-3 sm:p-6 text-center shadow-xs ${
                isLightMode
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-gradient-to-br from-zinc-800 to-zinc-950 border-orange-500/20'
              }`}>
                <div className="w-14 h-14 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl bg-orange-500/10 border-2 border-orange-500 flex items-center justify-center mb-2 sm:mb-4 shadow-lg shadow-orange-500/20">
                  <span className="font-black text-lg sm:text-3xl text-orange-500">SA</span>
                </div>
                <h3 className={`text-base sm:text-2xl font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{COMPANY_INFO.founder.name}</h3>
                <p className="text-[10px] sm:text-xs font-bold text-orange-600 tracking-wider uppercase mt-0.5 sm:mt-1">
                  {COMPANY_INFO.founder.title}
                </p>
                <div className={`flex items-center gap-1.5 mt-1.5 sm:mt-3 text-[10px] sm:text-xs font-medium ${
                  isLightMode ? 'text-slate-600' : 'text-zinc-400'
                }`}>
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500" />
                  <span>Gorakhpur, UP, India</span>
                </div>
              </div>

              {/* Direct Quick Contact Buttons */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-2.5 sm:mt-4 text-[11px] sm:text-xs font-bold">
                <a
                  href={`tel:${COMPANY_INFO.founder.phone}`}
                  className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-orange-600 hover:bg-orange-500 text-white flex items-center justify-center gap-1.5 sm:gap-2 transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Founder
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.founder.email}`}
                  className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border flex items-center justify-center gap-1.5 sm:gap-2 transition-colors ${
                    isLightMode
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-orange-600" />
                  Email Directly
                </a>
              </div>

            </div>
          </div>

          {/* Right: Vision & Engineering Excellence */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-bold tracking-wider uppercase">
              Leadership & Engineering
            </div>

            <h2 className={`text-2xl sm:text-4xl font-black tracking-tight ${
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
              <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border flex items-start gap-2.5 sm:gap-3 ${
                isLightMode ? 'bg-white border-slate-200 shadow-2xs' : 'bg-zinc-900/80 border-zinc-800'
              }`}>
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-600 shrink-0">
                  <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Full-Stack Technical Craftsmanship</h4>
                  <p className={`text-[11px] sm:text-xs mt-0.5 sm:mt-1 leading-snug ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>
                    Specialized in building scalable software systems from database layer up to fluid web and mobile user interfaces.
                  </p>
                </div>
              </div>

              <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border flex items-start gap-2.5 sm:gap-3 ${
                isLightMode ? 'bg-white border-slate-200 shadow-2xs' : 'bg-zinc-900/80 border-zinc-800'
              }`}>
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-600 shrink-0">
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

            {/* Quick Guarantees */}
            <div className={`grid grid-cols-2 gap-2 sm:gap-3 pt-1 sm:pt-2 text-[11px] sm:text-xs font-semibold ${
              isLightMode ? 'text-slate-700' : 'text-zinc-300'
            }`}>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-500" />
                <span>Gorakhpur Base & Global Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-orange-500" />
                <span>Direct WhatsApp & Call Support</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
