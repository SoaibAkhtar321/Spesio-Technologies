import React, { useState } from 'react';
import { SERVICES } from '../data/companyData';
import { ServiceItem } from '../types';
import { Code, Globe, Smartphone, Brain, Check, ArrowRight, Layers, Cpu, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForEstimate: (serviceId: string) => void;
  isLightMode?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForEstimate,
  isLightMode = true,
}) => {
  const [activeServiceId, setActiveServiceId] = useState<string>('software');

  const activeService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];

  const getIcon = (iconName: ServiceItem['iconName']) => {
    switch (iconName) {
      case 'code':
        return <Code className="w-6 h-6 text-orange-500" />;
      case 'globe':
        return <Globe className="w-6 h-6 text-orange-500" />;
      case 'smartphone':
        return <Smartphone className="w-6 h-6 text-orange-500" />;
      case 'brain':
        return <Brain className="w-6 h-6 text-orange-500" />;
      default:
        return <Code className="w-6 h-6 text-orange-500" />;
    }
  };

  return (
    <section id="services" className={`py-20 transition-colors duration-200 relative border-t ${
      isLightMode ? 'bg-[#FAFAFB] border-slate-200' : 'bg-[#0A0D14] border-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 font-bold text-xs tracking-wider uppercase mb-3">
            What We Build
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
            isLightMode ? 'text-slate-900' : 'text-white'
          }`}>
            Our Core Technology Capabilities
          </h2>
          <p className={`mt-3 text-base font-medium ${
            isLightMode ? 'text-slate-600' : 'text-zinc-400'
          }`}>
            Engineered with high precision to help businesses scale seamlessly and operate smarter.
          </p>
        </div>

        {/* 4 Main Service Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {SERVICES.map((service) => {
            const isSelected = service.id === activeServiceId;
            return (
              <div
                key={service.id}
                onClick={() => setActiveServiceId(service.id)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? isLightMode
                      ? 'bg-white border-orange-500 shadow-xl shadow-orange-500/10 ring-2 ring-orange-500/20 scale-[1.02]'
                      : 'bg-gradient-to-b from-zinc-900 to-black border-orange-500 shadow-xl shadow-orange-500/10 scale-[1.02]'
                    : isLightMode
                      ? 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                      : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80'
                }`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isSelected
                      ? 'bg-orange-500/10 border border-orange-500/30'
                      : isLightMode
                        ? 'bg-slate-100 border border-slate-200'
                        : 'bg-zinc-800 border border-zinc-700'
                  }`}>
                    {getIcon(service.iconName)}
                  </div>
                  <h3 className={`text-lg font-bold mb-1.5 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                    {service.title}
                  </h3>
                  <p className="text-xs text-orange-600 font-semibold mb-3">{service.shortDesc}</p>
                </div>

                <div className={`flex items-center text-xs font-bold mt-4 pt-3 border-t ${
                  isLightMode ? 'border-slate-100' : 'border-zinc-800/60'
                }`}>
                  <span className={isSelected ? 'text-orange-600' : isLightMode ? 'text-slate-500' : 'text-zinc-400'}>
                    {isSelected ? 'Viewing Details' : 'Explore Capabilities'}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 ml-auto transition-transform ${isSelected ? 'translate-x-1 text-orange-500' : ''}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Service Detailed Drawer Showcase */}
        <div className={`rounded-3xl p-8 sm:p-10 border shadow-2xl relative overflow-hidden transition-colors ${
          isLightMode
            ? 'bg-white border-orange-200 shadow-slate-200/80'
            : 'bg-zinc-900/90 border-orange-500/30 shadow-2xl'
        }`}>
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left: Description & Key Features */}
            <div className="lg:col-span-7 space-y-6">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md border text-xs font-bold uppercase ${
                isLightMode
                  ? 'bg-orange-50 border-orange-200 text-orange-600'
                  : 'bg-orange-500/10 border-orange-500/30 text-orange-400'
              }`}>
                {getIcon(activeService.iconName)}
                <span>{activeService.title}</span>
              </div>

              <h3 className={`text-2xl sm:text-3xl font-black ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}>
                {activeService.shortDesc}
              </h3>

              <p className={`text-sm sm:text-base leading-relaxed ${
                isLightMode ? 'text-slate-600' : 'text-zinc-300'
              }`}>
                {activeService.fullDesc}
              </p>

              {/* Feature Checklist */}
              <div className="space-y-3 pt-2">
                <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                  isLightMode ? 'text-slate-500' : 'text-zinc-400'
                }`}>
                  <Layers className="w-4 h-4 text-orange-500" />
                  Key Deliverables & Standards
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeService.features.map((feat, idx) => (
                    <div key={idx} className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs font-medium ${
                      isLightMode
                        ? 'bg-slate-50 border-slate-200 text-slate-800'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-200'
                    }`}>
                      <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack Pills */}
              <div className="space-y-2 pt-2">
                <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                  isLightMode ? 'text-slate-500' : 'text-zinc-400'
                }`}>
                  <Cpu className="w-4 h-4 text-orange-500" />
                  Powered By Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeService.technologies.map((tech) => (
                    <span key={tech} className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                      isLightMode
                        ? 'bg-orange-50 text-orange-700 border-orange-200'
                        : 'bg-zinc-800 text-orange-300 border-zinc-700'
                    }`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Estimate Call To Action */}
              <div className="pt-4">
                <button
                  onClick={() => onSelectServiceForEstimate(activeService.id)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  Calculate Scope for {activeService.title}
                </button>
              </div>

            </div>

            {/* Right: Architecture Visual Card */}
            <div className={`lg:col-span-5 rounded-2xl p-6 border space-y-4 ${
              isLightMode
                ? 'bg-slate-900 text-white border-slate-800'
                : 'bg-black/80 border-zinc-800'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-orange-400 uppercase">Spesio Delivery Standard</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Production Ready</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="font-bold text-white mb-1">1. Discovery & Architecture</div>
                  <p className="text-slate-300 text-[11px]">In-depth requirement analysis and scalable database schema mapping.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="font-bold text-white mb-1">2. Agile Development & Testing</div>
                  <p className="text-slate-300 text-[11px]">Rapid iterations with clean, type-safe code and security validations.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="font-bold text-white mb-1">3. Cloud Deployment & Support</div>
                  <p className="text-slate-300 text-[11px]">CI/CD pipelines, SSL configuration, and ongoing performance monitoring.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
