import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProcessTimeline } from './components/ProcessTimeline';
import { Portfolio } from './components/Portfolio';
import { ProjectEstimator } from './components/ProjectEstimator';
import { FounderSection } from './components/FounderSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AiAssistantModal } from './components/AiAssistantModal';
import { WhatsAppFloat } from './components/WhatsAppFloat';

export default function App() {
  const [isLightMode, setIsLightMode] = useState(true);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [selectedServiceForEstimate, setSelectedServiceForEstimate] = useState<string>('software');
  const [contactInitialService, setContactInitialService] = useState<string>('Custom Software Development');

  const handleSelectServiceForEstimate = (serviceId: string) => {
    setSelectedServiceForEstimate(serviceId);
    const estimatorElem = document.getElementById('estimator');
    if (estimatorElem) {
      estimatorElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenEstimator = () => {
    const estimatorElem = document.getElementById('estimator');
    if (estimatorElem) {
      estimatorElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendInquiryFromEstimator = (details: any) => {
    if (details?.service) {
      setContactInitialService(details.service);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-200 selection:bg-orange-500 selection:text-white ${
      isLightMode ? 'bg-white text-slate-900' : 'bg-[#0A0D14] text-zinc-100'
    }`}>
      {/* Skip Link for Keyboard & Screen Reader Users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-orange-600 focus:text-white focus:text-sm focus:font-bold"
      >
        Skip to main content
      </a>

      {/* Top Header */}
      <Header
        isLightMode={isLightMode}
        onToggleTheme={() => setIsLightMode(!isLightMode)}
        onOpenAiAssistant={() => setIsAiModalOpen(true)}
        onOpenEstimator={handleOpenEstimator}
      />

      <main id="main-content">
        {/* Hero Section */}
        <Hero
          isLightMode={isLightMode}
          onOpenAiAssistant={() => setIsAiModalOpen(true)}
          onOpenEstimator={handleOpenEstimator}
        />

        {/* Digital Twin Business Card Section */}
        <DigitalBusinessCard isLightMode={isLightMode} />

        {/* Services Showcase */}
        <ServicesSection
          isLightMode={isLightMode}
          onSelectServiceForEstimate={handleSelectServiceForEstimate}
        />

        {/* Why Choose Us */}
        <WhyChooseUs isLightMode={isLightMode} />

        {/* Development Process Timeline */}
        <ProcessTimeline isLightMode={isLightMode} />

        {/* Portfolio: Real Shipped Projects */}
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
        <ContactSection
          isLightMode={isLightMode}
          initialService={contactInitialService}
        />
      </main>

      {/* Footer */}
      <Footer isLightMode={isLightMode} />

      {/* AI Assistant Chat Modal */}
      <AiAssistantModal
        isLightMode={isLightMode}
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* Quick Conversion WhatsApp Floating Button */}
      <WhatsAppFloat />
    </div>
  );
}
