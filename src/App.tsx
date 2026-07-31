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
import { SERVICES } from './data/companyData';

export default function App() {
  const [isLightMode, setIsLightMode] = useState(true);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [selectedServiceForEstimate, setSelectedServiceForEstimate] = useState<string>('software');
  const [contactInitialService, setContactInitialService] = useState<string>('Custom Software Development');
  const [contactInitialPrice, setContactInitialPrice] = useState<number | undefined>(undefined);
  const [contactInitialTimeline, setContactInitialTimeline] = useState<string | undefined>(undefined);

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

  const handleOpenContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendInquiryFromEstimator = (details: any) => {
    if (details?.service) {
      // The estimator works with service ids (e.g. 'web'), while the Contact
      // form's dropdown expects the full service title — map between the two.
      const matchedService = SERVICES.find((s) => s.id === details.service);
      setContactInitialService(matchedService?.title || details.service);
    }
    if (typeof details?.estimatedPrice === 'number') {
      setContactInitialPrice(details.estimatedPrice);
    }
    if (details?.estimatedWeeks) {
      setContactInitialTimeline(details.estimatedWeeks);
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
        onOpenContact={handleOpenContact}
      />

      {/* Digital Twin Business Card Section is intentionally not rendered on the homepage.
          The component is preserved in the codebase (see DigitalBusinessCard import above)
          in case it needs to be re-enabled in the future. */}

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
        initialPrice={contactInitialPrice}
        initialTimeline={contactInitialTimeline}
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
