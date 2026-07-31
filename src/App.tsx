import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DigitalBusinessCard } from './components/DigitalBusinessCard';
import { ServicesSection } from './components/ServicesSection';
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
      {/* Top Header */}
      <Header
        isLightMode={isLightMode}
        onToggleTheme={() => setIsLightMode(!isLightMode)}
        onOpenAiAssistant={() => setIsAiModalOpen(true)}
        onOpenEstimator={handleOpenEstimator}
      />

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
