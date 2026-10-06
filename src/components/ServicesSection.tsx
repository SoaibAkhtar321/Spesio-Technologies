import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
        return <Code className="w-4 h-4 sm:w-6 sm:h-6 text-brand-500" />;
      case 'globe':
        return <Globe className="w-4 h-4 sm:w-6 sm:h-6 text-brand-500" />;
      case 'smartphone':
        return <Smartphone className="w-4 h-4 sm:w-6 sm:h-6 text-brand-500" />;
      case 'brain':
        return <Brain className="w-4 h-4 sm:w-6 sm:h-6 text-brand-500" />;
      default:
        return <Code className="w-4 h-4 sm:w-6 sm:h-6 text-brand-500" />;
    }
  };

  return (
    <section id="services" className={`py-10 sm:py-20 transition-colors duration-200 relative border-t ${
      isLightMode ? 'bg-[#D3F0E6] border-[#171B2E]/20' : 'bg-[#171B2E] border-zinc-900'
    }`}>
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-left max-w-5xl mb-8 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 text-brand-600 font-bold text-xs tracking-wider font-mono uppercase mb-3">
            01 / What we build
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${
            isLightMode ? 'text-slate-900' : 'text-white'
          }`}>
            Our Core Technology Capabilities
          </h2>
          <p className={`mt-3 text-base font-medium ${
            isLightMode ? 'text-slate-600' : 'text-zinc-400'
          }`}>
            Engineered with high precision to help businesses scale seamlessly and operate smarter.
          </p>
        </motion.div>

        {/* 4 Main Service Selector Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-4 sm:mb-10"
        >
          {SERVICES.map((service) => {
            const isSelected = service.id === activeServiceId;
            return (
              <motion.div
                key={service.id}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } }}
                whileHover={{ y: -4 }}
                onClick={() => setActiveServiceId(service.id)}
                className={`p-3 sm:p-6 rounded-sm sm:rounded-sm border transition-colors duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? isLightMode
                      ? 'bg-[#FFFDF8]/60 border-brand-500 ring-2 ring-brand-500/20'
                      : 'bg-zinc-900 border-brand-500'
                    : isLightMode
                      ? 'bg-[#FFFDF8]/60 border-[#171B2E]/20 hover:border-slate-300'
                      : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80'
                }`}
              >
                <div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className={`w-9 h-9 sm:w-12 sm:h-12 rounded-sm sm:rounded-sm flex items-center justify-center mb-2 sm:mb-4 ${
                      isSelected
                        ? 'bg-brand-500/10 border border-brand-500/30'
                        : isLightMode
                          ? 'bg-[#171B2E]/10 border border-[#171B2E]/20'
                          : 'bg-zinc-800 border border-zinc-700'
                    }`}
                  >
                    {getIcon(service.iconName)}
                  </motion.div>
                  <h3 className={`text-xs sm:text-lg font-bold mb-1 sm:mb-1.5 leading-snug ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                    {service.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-brand-600 font-semibold mb-1.5 sm:mb-3">{service.shortDesc}</p>
                </div>

                <div className={`hidden sm:flex items-center text-xs font-bold mt-4 pt-3 border-t ${
                  isLightMode ? 'border-[#171B2E]/20' : 'border-zinc-800/60'
                }`}>
                  <span className={isSelected ? 'text-brand-600' : isLightMode ? 'text-slate-500' : 'text-zinc-400'}>
                    {isSelected ? 'Viewing Details' : 'Explore Capabilities'}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 ml-auto transition-transform ${isSelected ? 'translate-x-1 text-brand-500' : ''}`} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Active Service Detailed Drawer Showcase */}
        <div className={`rounded-sm sm:rounded-sm p-4 sm:p-10 border relative overflow-hidden transition-colors ${
          isLightMode
            ? 'bg-[#FFFDF8]/60 border-brand-200'
            : 'bg-zinc-900/90 border-brand-500/30'
        }`}>
          <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-stretch relative z-10">
            
            {/* Left: Description & Key Features */}
            <div className="lg:col-span-12 space-y-3 sm:space-y-6 flex flex-col justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#171B2E]/10 border border-brand-200 text-brand-600 text-xs font-bold uppercase">
                {getIcon(activeService.iconName)}
                <span>{activeService.title}</span>
              </div>

              <h3 className={`text-lg sm:text-3xl font-bold ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}>
                {activeService.shortDesc}
              </h3>

              <p className={`text-xs sm:text-base leading-relaxed ${
                isLightMode ? 'text-slate-600' : 'text-zinc-300'
              }`}>
                {activeService.fullDesc}
              </p>

              {/* Feature Checklist */}
              <div className="space-y-2 sm:space-y-3 pt-1 sm:pt-2">
                <h4 className={`text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 ${
                  isLightMode ? 'text-slate-500' : 'text-zinc-400'
                }`}>
                  <Layers className="w-4 h-4 text-brand-500" />
                  Key Deliverables & Standards
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {activeService.features.map((feat, idx) => (
                    <div key={idx} className={`flex items-start gap-2.5 p-2 sm:p-2.5 rounded-sm border text-xs font-medium ${
                      isLightMode
                        ? 'bg-[#FFF3DC] border-[#171B2E]/20 text-slate-800'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-200'
                    }`}>
                      <Check className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack Pills */}
              <div className="space-y-2 pt-2">
                <h4 className={`text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-2 ${
                  isLightMode ? 'text-slate-500' : 'text-zinc-400'
                }`}>
                  <Cpu className="w-4 h-4 text-brand-500" />
                  Powered By Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeService.technologies.map((tech) => (
                    <span key={tech} className={`px-3 py-1 rounded-sm text-xs font-semibold border ${
                      isLightMode
                        ? 'bg-[#171B2E]/10 text-brand-700 border-brand-200'
                        : 'bg-zinc-800 text-brand-300 border-zinc-700'
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
                  className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-sm text-xs font-bold transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  Calculate Scope for {activeService.title}
                </button>
              </div>

            </div>

          </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
