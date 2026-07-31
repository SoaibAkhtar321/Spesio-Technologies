import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Phone, Mail, Globe, MapPin, Code, Smartphone, Brain, RotateCw, Copy, Check, Download } from 'lucide-react';
import { SpesioLogo } from './SpesioLogo';

interface DigitalBusinessCardProps {
  isLightMode?: boolean;
}

export const DigitalBusinessCard: React.FC<DigitalBusinessCardProps> = ({ isLightMode = true }) => {
  const [flipped, setFlipped] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const downloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${COMPANY_INFO.founder.name}
ORG:${COMPANY_INFO.name}
TITLE:${COMPANY_INFO.founder.title}
TEL;TYPE=CELL:${COMPANY_INFO.founder.phone}
EMAIL:${COMPANY_INFO.founder.email}
URL:https://${COMPANY_INFO.founder.website}
ADR;TYPE=WORK:;;Gorakhpur;Uttar Pradesh;;273001;India
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${COMPANY_INFO.founder.name.replace(' ', '_')}_SpesioTech.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="card" className={`py-16 transition-colors duration-200 relative ${
      isLightMode ? 'bg-white border-y border-slate-200/80' : 'bg-[#080B10]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 font-bold text-xs tracking-wider uppercase mb-3">
            Digital Twin Experience
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
            isLightMode ? 'text-slate-900' : 'text-white'
          }`}>
            Official Spesio Technologies Business Card
          </h2>
          <p className={`mt-3 text-base font-medium ${
            isLightMode ? 'text-slate-600' : 'text-zinc-400'
          }`}>
            Click card or flip button below to inspect both front and back sides of our official business card.
          </p>
        </div>

        {/* Card Flip Controls & Card Container */}
        <div className="flex flex-col items-center">
          
          {/* Card Container with 3D Flip */}
          <div className="w-full max-w-2xl perspective-1000 my-4">
            <div
              onClick={() => setFlipped(!flipped)}
              className={`relative w-full aspect-[1.65/1] rounded-3xl transition-transform duration-700 transform-style-3d cursor-pointer shadow-2xl ${
                isLightMode ? 'shadow-slate-300' : 'shadow-orange-950/30'
              } select-none ${
                flipped ? 'rotate-y-180' : ''
              }`}
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
                transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >

              {/* ================= FRONT SIDE ================= */}
              <div
                className="absolute inset-0 w-full h-full rounded-3xl bg-[#0F131D] border border-orange-500/30 overflow-hidden flex flex-col justify-between p-6 sm:p-8 backface-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Orange Curved Sweep Accent matching business card */}
                <div className="absolute -top-10 -bottom-10 left-[38%] w-1.5 bg-orange-500 transform rotate-[18deg] shadow-[0_0_15px_rgba(249,87,0,0.8)]" />
                <div className="absolute top-0 bottom-0 left-0 w-[40%] bg-[#080A10] -z-0" />

                <div className="relative z-10 flex justify-between items-start h-full">
                  
                  {/* Left Column: Logo & Tagline */}
                  <div className="w-[38%] flex flex-col justify-between h-full pr-2">
                    <div className="py-1">
                      {/* Real Spesio Logo */}
                      <SpesioLogo isLightMode={false} variant="full" size="lg" />
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-zinc-300">
                        We build. <span className="text-orange-500 font-bold">You grow.</span>
                      </p>

                      {/* 4 Core Icons */}
                      <div className="grid grid-cols-4 gap-1 pt-1 border-t border-zinc-800">
                        <div className="flex flex-col items-center">
                          <Code className="w-3.5 h-3.5 text-orange-500" />
                          <span className="text-[8px] font-bold text-zinc-400 mt-0.5">SOFTWARE</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Globe className="w-3.5 h-3.5 text-orange-500" />
                          <span className="text-[8px] font-bold text-zinc-400 mt-0.5">WEB</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Smartphone className="w-3.5 h-3.5 text-orange-500" />
                          <span className="text-[8px] font-bold text-zinc-400 mt-0.5">APP</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Brain className="w-3.5 h-3.5 text-orange-500" />
                          <span className="text-[8px] font-bold text-zinc-400 mt-0.5">AI</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Founder Contact Details */}
                  <div className="w-[58%] flex flex-col justify-between h-full pl-4 border-l border-zinc-800/80">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">{COMPANY_INFO.founder.name}</h3>
                      <p className="text-xs font-bold text-orange-500 tracking-wide uppercase mt-0.5">{COMPANY_INFO.founder.title}</p>
                      <div className="w-8 h-0.5 bg-orange-500 mt-2" />
                    </div>

                    <div className="space-y-2.5 my-auto text-xs text-zinc-300">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0">
                          <Phone className="w-3 h-3 text-orange-500" />
                        </div>
                        <span className="font-medium text-xs text-white">{COMPANY_INFO.founder.phone}</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0">
                          <Mail className="w-3 h-3 text-orange-500" />
                        </div>
                        <span className="font-medium text-xs text-zinc-200 truncate">{COMPANY_INFO.founder.email}</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0">
                          <Globe className="w-3 h-3 text-orange-500" />
                        </div>
                        <span className="font-medium text-xs text-zinc-200">{COMPANY_INFO.founder.website}</span>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0 mt-0.5">
                          <MapPin className="w-3 h-3 text-orange-500" />
                        </div>
                        <span className="font-medium text-[11px] text-zinc-300 leading-tight">
                          {COMPANY_INFO.founder.location}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Click Card to Flip</span>
                    </div>

                  </div>

                </div>
              </div>


              {/* ================= BACK SIDE ================= */}
              <div
                className="absolute inset-0 w-full h-full rounded-3xl bg-[#0B0E17] border border-orange-500/30 overflow-hidden flex flex-col justify-between p-6 sm:p-8 rotate-y-180 backface-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="flex justify-between items-stretch h-full">
                  
                  {/* Left Back: Logo */}
                  <div className="w-[35%] flex flex-col justify-center items-center border-r border-zinc-800/80 pr-4">
                    <SpesioLogo isLightMode={false} variant="full" size="lg" />
                  </div>

                  {/* Right Back: Building Digital Solutions That Drive Success & 4 Services */}
                  <div className="w-[62%] flex flex-col justify-between pl-4">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white">
                        Building Digital Solutions
                      </h4>
                      <p className="text-xs text-zinc-300 font-medium">
                        That <span className="text-orange-500 font-bold">Drive Success.</span>
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 my-2">
                      <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                          <Code className="w-3.5 h-3.5 text-orange-500" />
                          <span>Custom Software</span>
                        </div>
                        <p className="text-[9px] text-zinc-400 mt-0.5">Powerful, Scalable Solutions</p>
                      </div>

                      <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                          <Globe className="w-3.5 h-3.5 text-orange-500" />
                          <span>Web Development</span>
                        </div>
                        <p className="text-[9px] text-zinc-400 mt-0.5">Modern & Responsive</p>
                      </div>

                      <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                          <Smartphone className="w-3.5 h-3.5 text-orange-500" />
                          <span>App Development</span>
                        </div>
                        <p className="text-[9px] text-zinc-400 mt-0.5">Fast iOS & Android</p>
                      </div>

                      <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                          <Brain className="w-3.5 h-3.5 text-orange-500" />
                          <span>AI Integrations</span>
                        </div>
                        <p className="text-[9px] text-zinc-400 mt-0.5">Intelligent Automation</p>
                      </div>
                    </div>

                    {/* 3 Pillars Footer */}
                    <div className="pt-2 border-t border-zinc-800 flex justify-between text-[9px] font-semibold text-zinc-300">
                      <span className="flex items-center gap-1 text-orange-400">✓ Modern Solutions</span>
                      <span className="flex items-center gap-1 text-orange-400">✓ Reliable Support</span>
                      <span className="flex items-center gap-1 text-orange-400">✓ Scalable Growth</span>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Business Card Action Toolbar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setFlipped(!flipped)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isLightMode
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 shadow-2xs'
                  : 'bg-zinc-900 border-orange-500/40 text-orange-400 hover:bg-orange-500/10'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5 text-orange-500" />
              Flip to {flipped ? 'Front' : 'Back'}
            </button>

            <button
              onClick={() => handleCopy(COMPANY_INFO.founder.phone, 'phone')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isLightMode
                  ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
              }`}
            >
              {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              {copiedField === 'phone' ? 'Phone Copied!' : 'Copy Phone'}
            </button>

            <button
              onClick={() => handleCopy(COMPANY_INFO.founder.email, 'email')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isLightMode
                  ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
              }`}
            >
              {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              {copiedField === 'email' ? 'Email Copied!' : 'Copy Email'}
            </button>

            <button
              onClick={downloadVCard}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-500/20 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download vCard (.vcf)
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};