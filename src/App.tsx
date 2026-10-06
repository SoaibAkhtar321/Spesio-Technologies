import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AiAssistantModal } from './components/AiAssistantModal';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { BackToTop } from './components/BackToTop';
import { SectionDivider } from './components/SectionDivider';

// Below-the-fold sections are code-split so the initial bundle stays lean;
// they load in as the user scrolls toward them.
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs').then((m) => ({ default: m.WhyChooseUs })));
const ProcessTimeline = lazy(() => import('./components/ProcessTimeline').then((m) => ({ default: m.ProcessTimeline })));
const Portfolio = lazy(() => import('./components/Portfolio').then((m) => ({ default: m.Portfolio })));
const ProjectEstimator = lazy(() => import('./components/ProjectEstimator').then((m) => ({ default: m.ProjectEstimator })));
const FounderSection = lazy(() => import('./components/FounderSection').then((m) => ({ default: m.FounderSection })));
const ContactSection = lazy(() => import('./components/ContactSection').then((m) => ({ default: m.ContactSection })));
const FAQSection = lazy(() => import('./components/FAQSection').then((m) => ({ default: m.FAQSection })));
const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })));

interface SectionSkeletonProps {
  isLightMode: boolean;
}

/** Lightweight pulse placeholder shown while a lazy section's chunk is loading. */
const SectionSkeleton: React.FC<SectionSkeletonProps> = ({ isLightMode }) => (
  <div className={`py-20 ${isLightMode ? 'bg-[#FFF3DC]' : 'bg-[#171B2E]'}`} aria-hidden="true">
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 animate-pulse space-y-4">
      <div className={`h-4 w-40 mx-auto rounded-full ${isLightMode ? 'bg-[#171B2E]/20' : 'bg-zinc-800'}`} />
      <div className={`h-8 w-72 mx-auto rounded-sm ${isLightMode ? 'bg-[#171B2E]/20' : 'bg-zinc-800'}`} />
      <div className={`h-40 rounded-sm mt-8 ${isLightMode ? 'bg-[#171B2E]/10' : 'bg-zinc-900'}`} />
    </div>
  </div>
);

export default function App() {
  // Theme: use the saved choice if the visitor has toggled it before; otherwise follow the
  // device/browser setting (prefers-color-scheme) and keep following it if that setting changes.
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('spesio-theme');
      if (saved === 'light' || saved === 'dark') return saved === 'light';
    } catch { /* storage unavailable */ }
    return !window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      let hasSaved = false;
      try { hasSaved = !!localStorage.getItem('spesio-theme'); } catch { /* ignore */ }
      if (!hasSaved) setIsLightMode(!e.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = isLightMode ? 'light' : 'dark';
    document.documentElement.style.colorScheme = isLightMode ? 'light' : 'dark';
    document.documentElement.style.backgroundColor = isLightMode ? '#FFF3DC' : '#171B2E';
  }, [isLightMode]);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [selectedServiceForEstimate, setSelectedServiceForEstimate] = useState<string>('software');
  const [contactInitialService, setContactInitialService] = useState<string>('Custom Software Development');

  const handleOpenAiAssistant = useCallback(() => setIsAiModalOpen(true), []);
  const handleCloseAiAssistant = useCallback(() => setIsAiModalOpen(false), []);
  const handleToggleTheme = useCallback(() => {
    setIsLightMode((prev) => {
      const next = !prev;
      try { localStorage.setItem('spesio-theme', next ? 'light' : 'dark'); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const handleOpenEstimator = useCallback(() => {
    const estimatorElem = document.getElementById('estimator');
    if (estimatorElem) {
      estimatorElem.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSelectServiceForEstimate = useCallback((serviceId: string) => {
    setSelectedServiceForEstimate(serviceId);
    const estimatorElem = document.getElementById('estimator');
    if (estimatorElem) {
      estimatorElem.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSendInquiryFromEstimator = useCallback((details: any) => {
    if (details?.service) {
      setContactInitialService(details.service);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`min-h-screen font-sans antialiased transition-colors duration-200 selection:bg-brand-500 selection:text-white ${
        isLightMode ? 'bg-[#FFF3DC] text-slate-900' : 'bg-[#171B2E] text-zinc-100'
      }`}
    >
      {/* Skip link for keyboard/screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-sm focus:bg-brand-600 focus:text-white focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Top Header */}
      <Header
        isLightMode={isLightMode}
        onToggleTheme={handleToggleTheme}
        onOpenAiAssistant={handleOpenAiAssistant}
        onOpenEstimator={handleOpenEstimator}
      />

      <main id="main-content">
        {/* Hero Section */}
        <Hero isLightMode={isLightMode} onOpenAiAssistant={handleOpenAiAssistant} onOpenEstimator={handleOpenEstimator} />

        {/* Services Showcase */}
        <ServicesSection isLightMode={isLightMode} onSelectServiceForEstimate={handleSelectServiceForEstimate} />
        <Suspense fallback={<SectionSkeleton isLightMode={isLightMode} />}>
          {/* Why Choose Spesio */}
          <WhyChooseUs isLightMode={isLightMode} />

          <SectionDivider isLightMode={isLightMode} />

          {/* Interactive Scope & Cost Calculator */}
          <ProjectEstimator
            isLightMode={isLightMode}
            preselectedServiceId={selectedServiceForEstimate}
            onSendInquiry={handleSendInquiryFromEstimator}
          />

          {/* Delivery Process Timeline */}
          <ProcessTimeline isLightMode={isLightMode} />

          {/* Selected Work / Portfolio */}
          <Portfolio isLightMode={isLightMode} />

          {/* Founder Spotlight: Soaib Akhtar */}
          <FounderSection isLightMode={isLightMode} />

          {/* Direct Contact & Inquiry Form */}
          <ContactSection isLightMode={isLightMode} initialService={contactInitialService} />

          {/* Frequently Asked Questions */}
          <FAQSection isLightMode={isLightMode} />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        {/* Footer */}
        <Footer isLightMode={false} />
      </Suspense>

      {/* AI Assistant Chat Modal */}
      <AiAssistantModal isLightMode={isLightMode} isOpen={isAiModalOpen} onClose={handleCloseAiAssistant} />

      {/* Quick Conversion WhatsApp Floating Button */}
      <WhatsAppFloat />

      {/* Floating Back To Top Button */}
      <BackToTop isLightMode={isLightMode} />
    </motion.div>
  );
}
