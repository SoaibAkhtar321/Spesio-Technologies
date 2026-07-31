import React, { useState, useEffect } from 'react';
import { SERVICES, COMPANY_INFO } from '../data/companyData';
import { Calculator, Check, ArrowRight, MessageCircle, Mail, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface ProjectEstimatorProps {
  preselectedServiceId?: string;
  onSendInquiry: (details: any) => void;
  isLightMode?: boolean;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({
  preselectedServiceId = 'software',
  onSendInquiry,
  isLightMode = true,
}) => {
  const [selectedService, setSelectedService] = useState<string>(preselectedServiceId);
  const [complexity, setComplexity] = useState<'simple' | 'medium' | 'advanced' | 'enterprise'>('medium');
  const [aiModule, setAiModule] = useState<boolean>(true);
  const [timeline, setTimeline] = useState<'express' | 'standard' | 'flexible'>('standard');
  const [customFeatures, setCustomFeatures] = useState<string[]>(['auth', 'admin_dashboard']);

  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedService(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  const featureOptions = [
    { id: 'auth', label: 'User Authentication & Roles', cost: 12000 },
    { id: 'admin_dashboard', label: 'Admin Analytics Dashboard', cost: 25000 },
    { id: 'payment', label: 'Payment Gateway Integration', cost: 21000 },
    { id: 'notifications', label: 'Push Notifications & Email Alerts', cost: 17000 },
    { id: 'offline', label: 'Offline Sync & Local DB', cost: 25000 },
    { id: 'api_export', label: 'Data Export & REST API Suite', cost: 21000 },
  ];

  const toggleFeature = (id: string) => {
    setCustomFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Base price calculation algorithm (all figures in INR)
  const calculatePrice = () => {
    let base = 40000;
    if (selectedService === 'web') base = 33000;
    if (selectedService === 'app') base = 58000;
    if (selectedService === 'ai') base = 50000;

    let multiplier = 1;
    if (complexity === 'medium') multiplier = 1.5;
    if (complexity === 'advanced') multiplier = 2.2;
    if (complexity === 'enterprise') multiplier = 3.5;

    let featureTotal = customFeatures.reduce((sum, featId) => {
      const feat = featureOptions.find((f) => f.id === featId);
      return sum + (feat ? feat.cost : 0);
    }, 0);

    let aiCost = aiModule ? 29000 : 0;
    let timelineMultiplier = timeline === 'express' ? 1.25 : timeline === 'flexible' ? 0.95 : 1;

    // Round to the nearest ₹500 for a clean, non-arbitrary-looking figure
    const rawTotal = (base * multiplier + featureTotal + aiCost) * timelineMultiplier;
    const totalInINR = Math.round(rawTotal / 500) * 500;

    const estimatedWeeks =
      complexity === 'simple'
        ? '1 - 2 Weeks'
        : complexity === 'medium'
        ? '2 - 4 Weeks'
        : complexity === 'advanced'
        ? '4 - 8 Weeks'
        : '8+ Weeks';

    return { totalInINR, estimatedWeeks };
  };

  const { totalInINR, estimatedWeeks } = calculatePrice();

  const handleWhatsAppSend = () => {
    const serviceName = SERVICES.find((s) => s.id === selectedService)?.title || selectedService;
    const text = `Hi Soaib Akhtar (Spesio Technologies),\n\nI created a project estimate on your website:\n- Service: ${serviceName}\n- Complexity: ${complexity.toUpperCase()}\n- AI Integration: ${aiModule ? 'Yes' : 'No'}\n- Timeline: ${timeline.toUpperCase()}\n- Selected Features: ${customFeatures.join(', ')}\n- Estimated Budget: ~₹${totalInINR.toLocaleString('en-IN')}\n- Estimated Delivery: ${estimatedWeeks}\n\nCan we discuss starting this project?`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/918957833269?text=${encoded}`, '_blank');
  };

  return (
    <section id="estimator" className={`py-20 transition-colors duration-200 border-t ${
      isLightMode ? 'bg-white border-slate-200' : 'bg-[#080A10] border-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-bold tracking-wider uppercase mb-3">
            Interactive Scope & Budget Calculator
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
            isLightMode ? 'text-slate-900' : 'text-white'
          }`}>
            Estimate Your Project Cost & Schedule
          </h2>
          <p className={`mt-3 text-base font-medium ${
            isLightMode ? 'text-slate-600' : 'text-zinc-400'
          }`}>
            Select your requirements to get an instant cost range and timeline estimate from Spesio Technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls */}
          <div className={`lg:col-span-7 rounded-3xl p-6 sm:p-8 border space-y-6 ${
            isLightMode
              ? 'bg-[#FAFAFB] border-slate-200 shadow-sm'
              : 'bg-zinc-900/80 border-zinc-800'
          }`}>
            
            {/* Step 1: Select Service */}
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-3 ${
                isLightMode ? 'text-slate-700' : 'text-zinc-300'
              }`}>
                1. Select Core Service Domain
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedService(s.id)}
                    className={`p-3 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer ${
                      selectedService === s.id
                        ? isLightMode
                          ? 'bg-orange-50 border-orange-500 text-orange-700 ring-1 ring-orange-500/30'
                          : 'bg-orange-500/10 border-orange-500 text-orange-400'
                        : isLightMode
                          ? 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className={`font-extrabold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{s.title}</div>
                    <div className={`text-[10px] font-normal mt-0.5 ${isLightMode ? 'text-slate-500' : 'text-zinc-400'}`}>{s.shortDesc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Complexity Tier */}
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-3 ${
                isLightMode ? 'text-slate-700' : 'text-zinc-300'
              }`}>
                2. Project Scope & Architecture Complexity
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'simple', label: 'Simple MVP' },
                  { id: 'medium', label: 'Medium Business' },
                  { id: 'advanced', label: 'Advanced Scale' },
                  { id: 'enterprise', label: 'Enterprise Custom' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setComplexity(tier.id as any)}
                    className={`p-2.5 rounded-xl text-center border text-xs font-semibold transition-all cursor-pointer ${
                      complexity === tier.id
                        ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                        : isLightMode
                          ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: AI Module Toggle */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${
              isLightMode
                ? 'bg-orange-50/70 border-orange-200'
                : 'bg-gradient-to-r from-orange-950/40 to-zinc-950 border-orange-500/30'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl border ${
                  isLightMode ? 'bg-orange-100 border-orange-300 text-orange-700' : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                }`}>
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-sm font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Include Gemini AI Module?</div>
                  <div className={`text-xs ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>Smart chatbots, auto-summarization, or custom AI flows</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={aiModule}
                onChange={(e) => setAiModule(e.target.checked)}
                className="w-5 h-5 accent-orange-600 rounded cursor-pointer"
              />
            </div>

            {/* Step 4: Add-On Features */}
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-3 ${
                isLightMode ? 'text-slate-700' : 'text-zinc-300'
              }`}>
                3. Choose Required Modules & Integrations
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {featureOptions.map((feat) => {
                  const isChecked = customFeatures.includes(feat.id);
                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? isLightMode
                            ? 'bg-white border-orange-500 text-slate-900 shadow-2xs'
                            : 'bg-zinc-800 border-orange-500/60 text-white'
                          : isLightMode
                            ? 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            : 'bg-zinc-950 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span className="font-medium">{feat.label}</span>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        isChecked
                          ? 'bg-orange-600 border-orange-600 text-white'
                          : isLightMode
                            ? 'border-slate-300'
                            : 'border-zinc-700'
                      }`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Timeline Speed */}
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-3 ${
                isLightMode ? 'text-slate-700' : 'text-zinc-300'
              }`}>
                4. Target Delivery Pace
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                {[
                  { id: 'flexible', label: 'Flexible Pace' },
                  { id: 'standard', label: 'Standard Pace' },
                  { id: 'express', label: 'Express Priority' },
                ].map((pace) => (
                  <button
                    key={pace.id}
                    type="button"
                    onClick={() => setTimeline(pace.id as any)}
                    className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                      timeline === pace.id
                        ? isLightMode
                          ? 'bg-orange-50 border-orange-500 text-orange-700'
                          : 'bg-orange-500/20 border-orange-500 text-orange-400'
                        : isLightMode
                          ? 'bg-white border-slate-200 text-slate-600'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    {pace.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Summary & Direct Action Box */}
          <div className={`lg:col-span-5 rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6 sticky top-28 ${
            isLightMode
              ? 'bg-white border-slate-200 shadow-slate-200/80'
              : 'bg-gradient-to-b from-zinc-900 to-black border-orange-500/30'
          }`}>
            <div className={`flex items-center justify-between pb-4 border-b ${
              isLightMode ? 'border-slate-100' : 'border-zinc-800'
            }`}>
              <span className="text-xs font-extrabold tracking-widest uppercase text-orange-600">Live Estimate Breakdown</span>
              <Calculator className="w-5 h-5 text-orange-500" />
            </div>

            {/* Total Price Display */}
            <div>
              <div className={`text-xs font-medium uppercase tracking-wider ${
                isLightMode ? 'text-slate-500' : 'text-zinc-400'
              }`}>Estimated Budget Range</div>
              <div className={`text-4xl sm:text-5xl font-black mt-1 flex items-baseline gap-2 ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}>
                <span>₹{totalInINR.toLocaleString('en-IN')}</span>
                <span className={`text-xs font-semibold ${isLightMode ? 'text-slate-500' : 'text-zinc-400'}`}>INR (Approx)</span>
              </div>
              <p className="text-[11px] text-orange-600 font-medium mt-1">
                *Final price confirmed after detailed requirement review.
              </p>
            </div>

            {/* Estimated Delivery Timeline */}
            <div className={`p-4 rounded-2xl border space-y-1 ${
              isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950 border-zinc-800'
            }`}>
              <div className={`flex items-center gap-2 text-xs font-bold ${
                isLightMode ? 'text-slate-700' : 'text-zinc-300'
              }`}>
                <Clock className="w-4 h-4 text-orange-500" />
                <span>Estimated Delivery Schedule</span>
              </div>
              <div className={`text-lg font-bold pl-6 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{estimatedWeeks}</div>
            </div>

            {/* Included Guarantees */}
            <div className={`space-y-2 text-xs font-medium ${
              isLightMode ? 'text-slate-700' : 'text-zinc-300'
            }`}>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct 1-on-1 development with Soaib Akhtar</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Source Code Ownership & Documentation</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>30-Day Post-Launch Maintenance Included</span>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleWhatsAppSend}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                Send Estimate to WhatsApp (+91 8957833269)
              </button>

              <button
                onClick={() =>
                  onSendInquiry({
                    service: selectedService,
                    complexity,
                    aiModule,
                    timeline,
                    features: customFeatures,
                    estimatedPrice: totalInINR,
                  })
                }
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                Submit Inquiry Form
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
