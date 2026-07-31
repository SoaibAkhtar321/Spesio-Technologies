import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Phone, Mail, Globe, MapPin, ArrowUp } from 'lucide-react';
import { SpesioLogo } from './SpesioLogo';

interface FooterProps {
  isLightMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isLightMode = true }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`transition-colors duration-200 border-t pt-16 pb-8 ${
      isLightMode
        ? 'bg-slate-100 text-slate-600 border-slate-200'
        : 'bg-black text-zinc-400 border-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b ${
          isLightMode ? 'border-slate-200' : 'border-zinc-900'
        }`}>
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <SpesioLogo isLightMode={isLightMode} variant="horizontal" size="md" />
            </div>

            <p className={`text-xs max-w-sm leading-relaxed ${
              isLightMode ? 'text-slate-600' : 'text-zinc-400'
            }`}>
              "{COMPANY_INFO.subTagline}" We engineer high-performance software, modern websites, cross-platform mobile apps, and intelligent AI automation.
            </p>

            <p className="text-xs text-orange-600 font-bold">
              Founded & Managed by {COMPANY_INFO.founder.name}
            </p>

            {/* Social Media Links Row */}
            <div className="pt-2">
              <h5 className={`text-[11px] font-bold uppercase tracking-wider mb-2.5 ${
                isLightMode ? 'text-slate-700' : 'text-zinc-300'
              }`}>
                Social Channels
              </h5>
              <div className="flex items-center gap-2.5">
                {/* WhatsApp */}
                <a
                  href={COMPANY_INFO.socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  title="Direct Message on WhatsApp"
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all hover:scale-105 cursor-pointer ${
                    isLightMode
                      ? 'bg-white border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-300 shadow-2xs'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-emerald-400 hover:border-emerald-700'
                  }`}
                >
                  <svg className="w-4 h-4 text-emerald-500 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>

                {/* Instagram */}
                <a
                  href={COMPANY_INFO.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  title="Follow Spesio Technologies on Instagram"
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all hover:scale-105 cursor-pointer ${
                    isLightMode
                      ? 'bg-white border-slate-200 text-slate-700 hover:text-pink-600 hover:border-pink-300 shadow-2xs'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-pink-400 hover:border-pink-700'
                  }`}
                >
                  <svg className="w-4 h-4 text-pink-500 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}>Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className={`transition-colors ${isLightMode ? 'hover:text-orange-600 text-slate-600' : 'hover:text-orange-400 text-zinc-400'}`}>Services Domain</a></li>
              <li><a href="#why-choose-us" className={`transition-colors ${isLightMode ? 'hover:text-orange-600 text-slate-600' : 'hover:text-orange-400 text-zinc-400'}`}>Why Choose Us</a></li>
              <li><a href="#process" className={`transition-colors ${isLightMode ? 'hover:text-orange-600 text-slate-600' : 'hover:text-orange-400 text-zinc-400'}`}>Delivery Process</a></li>
              <li><a href="#portfolio" className={`transition-colors ${isLightMode ? 'hover:text-orange-600 text-slate-600' : 'hover:text-orange-400 text-zinc-400'}`}>Portfolio</a></li>
              <li><a href="#card" className={`transition-colors ${isLightMode ? 'hover:text-orange-600 text-slate-600' : 'hover:text-orange-400 text-zinc-400'}`}>Digital Business Card</a></li>
              <li><a href="#estimator" className={`transition-colors ${isLightMode ? 'hover:text-orange-600 text-slate-600' : 'hover:text-orange-400 text-zinc-400'}`}>Scope & Budget Calculator</a></li>
              <li><a href="#founder" className={`transition-colors ${isLightMode ? 'hover:text-orange-600 text-slate-600' : 'hover:text-orange-400 text-zinc-400'}`}>About Soaib Akhtar</a></li>
              <li><a href="#contact" className={`transition-colors ${isLightMode ? 'hover:text-orange-600 text-slate-600' : 'hover:text-orange-400 text-zinc-400'}`}>Direct Contact</a></li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}>Contact & Location</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-600" />
                <a href={`tel:${COMPANY_INFO.founder.phone}`} className={isLightMode ? 'hover:text-slate-900 text-slate-600' : 'hover:text-white text-zinc-400'}>{COMPANY_INFO.founder.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-600" />
                <a href={`mailto:${COMPANY_INFO.founder.email}`} className={`truncate ${isLightMode ? 'hover:text-slate-900 text-slate-600' : 'hover:text-white text-zinc-400'}`}>{COMPANY_INFO.founder.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-orange-600" />
                <a href={`https://${COMPANY_INFO.founder.website}`} target="_blank" rel="noreferrer" className={isLightMode ? 'hover:text-slate-900 text-slate-600' : 'hover:text-white text-zinc-400'}>{COMPANY_INFO.founder.website}</a>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                <span className={isLightMode ? 'text-slate-600' : 'text-zinc-400'}>{COMPANY_INFO.founder.location}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isLightMode ? 'text-slate-500' : 'text-zinc-500'
        }`}>
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All Rights Reserved. Built with precision.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-500 font-bold cursor-pointer"
          >
            Back to Top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
