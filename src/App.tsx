import React, { Suspense, lazy, useCallback, useState } from 'react';
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
const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })));

interface SectionSkeletonProps {
  isLightMode: boolean;
}

/** Lightweight pulse placeholder shown while a lazy section's chunk is loading. */
const SectionSkeleton: React.FC<SectionSkeletonProps> = ({ isLightMode }) => (
  <div className={`py-20 ${isLightMode ? 'bg-white' : 'bg-[#0A0D14]'}`} aria-hidden="true">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse space-y-4">
      <div className={`h-4 w-40 mx-auto rounded-full ${isLightMode ? 'bg-slate-200' : 'bg-zinc-800'}`} />
      <div className={`h-8 w-72 mx-auto rounded-lg ${isLightMode ? 'bg-slate-200' : 'bg-zinc-800'}`} />
      <div className={`h-40 rounded-2xl mt-8 ${isLightMode ? 'bg-slate-100' : 'bg-zinc-900'}`} />
    </div>
  </div>
);

export default function App() {
  const [isLightMode, setIsLightMode] = useState(true);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [selectedServiceForEstimate, setSelectedServiceForEstimate] = useState<string>('software');
  const [contactInitialService, setContactInitialService] = useState<string>('Custom Software Development');

  const handleOpenAiAssistant = useCallback(() => setIsAiModalOpen(true), []);
  const handleCloseAiAssistant = useCallback(() => setIsAiModalOpen(false), []);
  const handleToggleTheme = useCallback(() => setIsLightMode((prev) => !prev), []);

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
      className={`min-h-screen font-sans antialiased transition-colors duration-200 selection:bg-orange-500 selection:text-white ${
        isLightMode ? 'bg-white text-slate-900' : 'bg-[#0A0D14] text-zinc-100'
      }`}
    >
      {/* Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Top Header */}
      <Header
        isLightMode={isLightMode}
        onToggleTheme={handleToggleTheme}
        onOpenAiAssistant={handleOpenAiAssistant}
        onOpenEstimator={handleOpenEstimator}
      />

      {/* Hero Section */}
      <Hero isLightMode={isLightMode} onOpenAiAssistant={handleOpenAiAssistant} onOpenEstimator={handleOpenEstimator} />

      {/* Services Showcase */}
      <ServicesSection isLightMode={isLightMode} onSelectServiceForEstimate={handleSelectServiceForEstimate} />

      <Suspense fallback={<SectionSkeleton isLightMode={isLightMode} />}>
        {/* Why Choose Spesio */}
        <WhyChooseUs isLightMode={isLightMode} />

        <SectionDivider isLightMode={isLightMode} />

        {/* Delivery Process Timeline */}
        <ProcessTimeline isLightMode={isLightMode} />

        {/* Selected Work / Portfolio */}
        <Portfolio isLightMode={isLightMode} />

        {/* Interactive Scope & Cost Calculator */}
        <ProjectEstimator
          isLightMode={isLightMode}
          preselectedServiceId={selectedServiceForEstimate}
          onSendInquiry={handleSendInquiryFromEstimator}
        />

        {/* Founder Spotlight: Soaib Akhtar */}
        <FounderSection isLightMode={isLightMode} />

        {/* Direct Contact & Inquiry Form */}
        <ContactSection isLightMode={isLightMode} initialService={contactInitialService} />

        {/* Footer */}
        <Footer isLightMode={isLightMode} />
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
