import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  WEBSITE_PACKAGES,
  ANDROID_PACKAGES,
  BUNDLES,
  WEBSITE_MAINTENANCE,
  ANDROID_MAINTENANCE_LABEL,
} from '../data/companyData';
import { PackageTierId, PricingPackage, BundlePackage } from '../types';
import {
  Check,
  MessageCircle,
  Mail,
  Sparkles,
  Clock,
  ShieldCheck,
  ChevronDown,
  LayoutGrid,
  Wand2,
  Star,
  ArrowRight,
  Globe,
  Smartphone,
  Layers,
} from 'lucide-react';

interface ProjectEstimatorProps {
  preselectedServiceId?: string;
  onSendInquiry: (details: any) => void;
  isLightMode?: boolean;
}

type NeedType = 'website' | 'android' | 'both';

const TIER_ORDER: PackageTierId[] = ['bronze', 'silver', 'gold', 'diamond'];

const TIER_TIMELINE: Record<PackageTierId, string> = {
  bronze: '1 - 2 Weeks',
  silver: '2 - 3 Weeks',
  gold: '3 - 5 Weeks',
  diamond: '5 - 8 Weeks',
};

const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const buildPackageWhatsAppText = (packageName: string, price: number) =>
  `Hello Spesio Technologies,\n\nI'm interested in your\n${packageName}\nPrice: ${formatINR(price)}\n\nPlease share more details.`;

const buildBundleWhatsAppText = (bundleName: string, price: number) =>
  `Hello,\n\nI'm interested in the ${bundleName} (${formatINR(price)}).\n\nPlease contact me.`;

const openWhatsApp = (text: string) => {
  const encoded = encodeURIComponent(text);
  window.open(`https://wa.me/918957833269?text=${encoded}`, '_blank');
};

/** Small premium pricing card used for both Website and Android App packages. */
const PackageCard: React.FC<{ pkg: PricingPackage; isLightMode: boolean }> = ({ pkg, isLightMode }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } }}
    whileHover={{ y: -6 }}
    className={`relative flex flex-col rounded-3xl border p-6 transition-all duration-300 will-change-transform ${
      pkg.highlight
        ? isLightMode
          ? 'bg-white border-orange-400 shadow-xl shadow-orange-500/15 ring-2 ring-orange-400/30'
          : 'bg-gradient-to-b from-zinc-900 to-black border-orange-500 shadow-xl shadow-orange-500/20'
        : isLightMode
          ? 'bg-white border-slate-200 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/10'
          : 'bg-zinc-900/60 border-zinc-800 hover:border-orange-500/40'
    }`}
  >
    {pkg.highlight && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
        <Star className="w-3 h-3 fill-current" /> Most Popular
      </span>
    )}

    <div className="text-3xl mb-2">{pkg.emoji}</div>
    <h4 className={`text-lg font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{pkg.name}</h4>
    <div className={`mt-2 flex items-baseline gap-1 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
      <span className="text-3xl font-black">{formatINR(pkg.price)}</span>
    </div>

    <ul className="mt-5 space-y-2.5 flex-1">
      {pkg.features.map((feat, idx) => {
        const isPlusHeader = feat.toLowerCase().startsWith('everything in');
        return isPlusHeader ? (
          <li key={idx} className={`text-[11px] font-bold uppercase tracking-wide pt-1 ${isLightMode ? 'text-orange-600' : 'text-orange-400'}`}>
            {feat}
          </li>
        ) : (
          <li key={idx} className={`flex items-start gap-2 text-xs font-medium ${isLightMode ? 'text-slate-700' : 'text-zinc-300'}`}>
            <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
            <span>{feat}</span>
          </li>
        );
      })}
    </ul>

    <button
      type="button"
      onClick={() => openWhatsApp(buildPackageWhatsAppText(pkg.name, pkg.price))}
      className={`mt-6 w-full py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
        pkg.highlight
          ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40'
          : isLightMode
            ? 'bg-slate-900 text-white hover:bg-orange-600'
            : 'bg-zinc-800 text-white hover:bg-orange-600'
      }`}
    >
      {pkg.cta}
    </button>
  </motion.div>
);

const cardGridStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({
  preselectedServiceId = 'software',
  onSendInquiry,
  isLightMode = true,
}) => {
  const [mode, setMode] = useState<'view' | 'wizard'>('view');
  const [maintenanceOpen, setMaintenanceOpen] = useState(false);

  // Wizard state
  const initialNeed: NeedType = preselectedServiceId === 'app' ? 'android' : 'website';
  const [step, setStep] = useState(1);
  const [need, setNeed] = useState<NeedType>(initialNeed);
  const [tier, setTier] = useState<PackageTierId | ''>('');

  const handleModeChange = (next: 'view' | 'wizard') => {
    setMode(next);
    if (next === 'wizard') {
      setStep(1);
      setTier('');
    }
  };

  const goToStep = (n: number) => {
    setStep(n);
    document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectedWebsitePkg = useMemo(() => WEBSITE_PACKAGES.find((p) => p.id === tier) || null, [tier]);
  const selectedAndroidPkg = useMemo(() => ANDROID_PACKAGES.find((p) => p.id === tier) || null, [tier]);
  const selectedBundle: BundlePackage | null = useMemo(
    () => BUNDLES.find((b) => b.websiteTier === tier) || null,
    [tier]
  );

  const individualTotal =
    (selectedWebsitePkg?.price || 0) + (selectedAndroidPkg?.price || 0);
  const bundleSavings = selectedBundle ? individualTotal - selectedBundle.price : 0;

  const recommendation = useMemo(() => {
    if (!tier) return null;
    if (need === 'website') return { kind: 'package' as const, pkg: selectedWebsitePkg };
    if (need === 'android') return { kind: 'package' as const, pkg: selectedAndroidPkg };
    return { kind: 'bundle' as const, bundle: selectedBundle };
  }, [need, tier, selectedWebsitePkg, selectedAndroidPkg, selectedBundle]);

  const handleWizardWhatsApp = () => {
    if (!recommendation) return;
    if (recommendation.kind === 'package' && recommendation.pkg) {
      openWhatsApp(buildPackageWhatsAppText(recommendation.pkg.name, recommendation.pkg.price));
    } else if (recommendation.kind === 'bundle' && recommendation.bundle) {
      openWhatsApp(buildBundleWhatsAppText(recommendation.bundle.name, recommendation.bundle.price));
    }
  };

  const handleWizardProposal = () => {
    if (!recommendation) return;
    if (recommendation.kind === 'package' && recommendation.pkg) {
      onSendInquiry({ service: recommendation.pkg.name, estimatedPrice: recommendation.pkg.price });
    } else if (recommendation.kind === 'bundle' && recommendation.bundle) {
      onSendInquiry({ service: recommendation.bundle.name, estimatedPrice: recommendation.bundle.price });
    }
  };

  return (
    <section id="estimator" className={`py-20 transition-colors duration-200 border-t relative overflow-hidden ${
      isLightMode ? 'bg-white border-slate-200' : 'bg-[#080A10] border-zinc-900'
    }`}>
      {/* Floating subtle background gradients */}
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -14, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute top-10 right-10 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
          isLightMode ? 'bg-orange-500/10' : 'bg-orange-600/10'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-bold tracking-wider uppercase mb-3">
            Fixed, Transparent Package Pricing
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
            isLightMode ? 'text-slate-900' : 'text-white'
          }`}>
            Simple Packages. Real Prices. No Surprises.
          </h2>
          <p className={`mt-3 text-base font-medium ${
            isLightMode ? 'text-slate-600' : 'text-zinc-400'
          }`}>
            Browse our fixed pricing packages, or answer 3 quick questions and we will recommend the right one for you.
          </p>
        </div>

        {/* Animated Segmented Mode Toggle */}
        <div className="flex justify-center mb-12">
          <div className={`relative inline-flex p-1.5 rounded-2xl border ${
            isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-zinc-900 border-zinc-800'
          }`}>
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              className="absolute top-1.5 bottom-1.5 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 shadow-lg shadow-orange-500/25"
              style={{
                left: mode === 'view' ? '6px' : '50%',
                right: mode === 'view' ? '50%' : '6px',
              }}
            />
            <button
              type="button"
              onClick={() => handleModeChange('view')}
              className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                mode === 'view' ? 'text-white' : isLightMode ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              View Packages
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('wizard')}
              className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                mode === 'wizard' ? 'text-white' : isLightMode ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              <Wand2 className="w-4 h-4" />
              Find My Package
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {mode === 'view' ? (
            <motion.div
              key="view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              {/* Website Packages */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Globe className="w-5 h-5 text-orange-500" />
                  <h3 className={`text-xl sm:text-2xl font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Website Packages</h3>
                </div>
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={cardGridStagger}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                >
                  {WEBSITE_PACKAGES.map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} isLightMode={isLightMode} />
                  ))}
                </motion.div>
              </div>

              {/* Android App Packages */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Smartphone className="w-5 h-5 text-orange-500" />
                  <h3 className={`text-xl sm:text-2xl font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Android App Packages</h3>
                </div>
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={cardGridStagger}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                >
                  {ANDROID_PACKAGES.map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} isLightMode={isLightMode} />
                  ))}
                </motion.div>
              </div>

              {/* Website + App Bundles */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Layers className="w-5 h-5 text-orange-500" />
                  <h3 className={`text-xl sm:text-2xl font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Website + App Bundles</h3>
                </div>
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={cardGridStagger}
                  className={`rounded-3xl p-6 sm:p-8 border overflow-hidden relative ${
                    isLightMode
                      ? 'bg-gradient-to-br from-orange-50 via-white to-amber-50 border-orange-200'
                      : 'bg-gradient-to-br from-orange-950/40 via-zinc-900 to-zinc-950 border-orange-500/30'
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {BUNDLES.map((bundle) => {
                      const website = WEBSITE_PACKAGES.find((p) => p.id === bundle.websiteTier);
                      const android = ANDROID_PACKAGES.find((p) => p.id === bundle.androidTier);
                      const savings = (website?.price || 0) + (android?.price || 0) - bundle.price;
                      return (
                        <motion.div
                          key={bundle.id}
                          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } }}
                          whileHover={{ y: -6 }}
                          className={`relative flex flex-col rounded-2xl border p-5 transition-all will-change-transform ${
                            bundle.highlight
                              ? 'bg-gradient-to-b from-orange-600 to-orange-500 border-orange-400 text-white shadow-xl shadow-orange-500/30'
                              : isLightMode
                                ? 'bg-white border-orange-200 hover:border-orange-400'
                                : 'bg-zinc-900/70 border-zinc-800 hover:border-orange-500/40'
                          }`}
                        >
                          {bundle.highlight && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-orange-600 text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                              ⭐ Best Value
                            </span>
                          )}
                          <h4 className={`text-base font-black ${bundle.highlight ? 'text-white' : isLightMode ? 'text-slate-900' : 'text-white'}`}>
                            {bundle.name}
                          </h4>
                          <ul className={`mt-3 space-y-1.5 text-xs font-medium ${bundle.highlight ? 'text-white/90' : isLightMode ? 'text-slate-600' : 'text-zinc-300'}`}>
                            <li>{website?.name}</li>
                            <li>{android?.name}</li>
                          </ul>
                          <div className={`mt-4 text-2xl font-black ${bundle.highlight ? 'text-white' : isLightMode ? 'text-slate-900' : 'text-white'}`}>
                            {formatINR(bundle.price)}
                          </div>
                          {savings > 0 && (
                            <div className={`mt-1 text-[11px] font-bold ${bundle.highlight ? 'text-white/90' : 'text-emerald-600'}`}>
                              You save {formatINR(savings)}
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => openWhatsApp(buildBundleWhatsAppText(bundle.name, bundle.price))}
                            className={`mt-5 w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              bundle.highlight
                                ? 'bg-white text-orange-600 hover:bg-orange-50'
                                : isLightMode
                                  ? 'bg-slate-900 text-white hover:bg-orange-600'
                                  : 'bg-zinc-800 text-white hover:bg-orange-600'
                            }`}
                          >
                            Get This Bundle
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              {/* Optional Maintenance Accordion */}
              <div className={`rounded-2xl border overflow-hidden ${
                isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900/60 border-zinc-800'
              }`}>
                <button
                  type="button"
                  onClick={() => setMaintenanceOpen((v) => !v)}
                  className={`w-full flex items-center justify-between p-5 text-left cursor-pointer ${
                    isLightMode ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  <span className="text-sm font-bold">Optional Maintenance Renewal (After First Year)</span>
                  <ChevronDown className={`w-4 h-4 text-orange-500 transition-transform duration-300 ${maintenanceOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {maintenanceOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className={`px-5 pb-5 space-y-4 text-xs ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>
                        <div>
                          <div className={`font-bold uppercase tracking-wide mb-2 ${isLightMode ? 'text-slate-700' : 'text-zinc-300'}`}>Website</div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {WEBSITE_MAINTENANCE.map((plan) => (
                              <div key={plan.tier} className={`p-3 rounded-xl border text-center ${isLightMode ? 'bg-white border-slate-200' : 'bg-zinc-950 border-zinc-800'}`}>
                                <div className={`text-[10px] uppercase font-bold ${isLightMode ? 'text-slate-500' : 'text-zinc-500'}`}>{plan.tier}</div>
                                <div className={`text-sm font-black mt-0.5 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{plan.priceLabel}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className={`font-bold uppercase tracking-wide mb-2 ${isLightMode ? 'text-slate-700' : 'text-zinc-300'}`}>Android Apps</div>
                          <div className={`p-3 rounded-xl border inline-block ${isLightMode ? 'bg-white border-slate-200' : 'bg-zinc-950 border-zinc-800'}`}>
                            <div className={`text-sm font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{ANDROID_MAINTENANCE_LABEL}</div>
                          </div>
                        </div>
                        <p className="pt-2 font-medium">
                          Maintenance renewal is completely optional. Your website / app continues working normally even if you choose not to renew.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="wizard"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <div className={`rounded-3xl border p-6 sm:p-10 ${
                isLightMode ? 'bg-[#FAFAFB] border-slate-200 shadow-sm' : 'bg-zinc-900/80 border-zinc-800'
              }`}>

                {/* Step Progress */}
                <div className="flex items-center justify-center gap-2 mb-8">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        n <= step ? 'w-10 bg-orange-500' : `w-6 ${isLightMode ? 'bg-slate-200' : 'bg-zinc-800'}`
                      }`}
                    />
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                      <h3 className={`text-lg font-black mb-1 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Step 1 — What do you need?</h3>
                      <p className={`text-xs mb-6 ${isLightMode ? 'text-slate-500' : 'text-zinc-400'}`}>Choose the type of project you want to build.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { id: 'website', label: 'Website', icon: Globe },
                          { id: 'android', label: 'Android App', icon: Smartphone },
                          { id: 'both', label: 'Both', icon: Layers },
                        ].map(({ id, label, icon: Icon }) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => { setNeed(id as NeedType); goToStep(2); }}
                            className={`p-5 rounded-2xl border text-center transition-all cursor-pointer ${
                              need === id
                                ? isLightMode
                                  ? 'bg-orange-50 border-orange-500 ring-1 ring-orange-500/30'
                                  : 'bg-orange-500/10 border-orange-500'
                                : isLightMode
                                  ? 'bg-white border-slate-200 hover:border-orange-300'
                                  : 'bg-zinc-950 border-zinc-800 hover:border-orange-500/40'
                            }`}
                          >
                            <Icon className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                            <div className={`text-sm font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{label}</div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                      <h3 className={`text-lg font-black mb-1 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Step 2 — Choose your complexity tier</h3>
                      <p className={`text-xs mb-6 ${isLightMode ? 'text-slate-500' : 'text-zinc-400'}`}>Every tier includes 1 year of FREE maintenance.</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {TIER_ORDER.map((t) => {
                          const wp = WEBSITE_PACKAGES.find((p) => p.id === t)!;
                          const ap = ANDROID_PACKAGES.find((p) => p.id === t)!;
                          const bundle = BUNDLES.find((b) => b.websiteTier === t)!;
                          const priceLabel = need === 'website' ? formatINR(wp.price) : need === 'android' ? formatINR(ap.price) : formatINR(bundle.price);
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => { setTier(t); goToStep(need === 'both' ? 3 : 4); }}
                              className={`p-4 rounded-2xl border text-center capitalize transition-all cursor-pointer ${
                                tier === t
                                  ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-500/20'
                                  : isLightMode
                                    ? 'bg-white border-slate-200 text-slate-700 hover:border-orange-300'
                                    : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-orange-500/40'
                              }`}
                            >
                              <div className="text-xl mb-1">{wp.emoji}</div>
                              <div className="text-xs font-bold">{t}</div>
                              <div className={`text-[11px] font-semibold mt-1 ${tier === t ? 'text-white/90' : 'text-orange-600'}`}>{priceLabel}</div>
                            </button>
                          );
                        })}
                      </div>
                      <button type="button" onClick={() => goToStep(1)} className={`mt-6 text-xs font-bold cursor-pointer ${isLightMode ? 'text-slate-500 hover:text-orange-600' : 'text-zinc-500 hover:text-orange-400'}`}>
                        ← Back
                      </button>
                    </motion.div>
                  )}

                  {step === 3 && need === 'both' && (
                    <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                      <h3 className={`text-lg font-black mb-1 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Step 3 — Bundle vs individual pricing</h3>
                      <p className={`text-xs mb-6 ${isLightMode ? 'text-slate-500' : 'text-zinc-400'}`}>Here is how much you save by bundling instead of buying separately.</p>
                      <div className={`rounded-2xl border p-5 space-y-3 ${isLightMode ? 'bg-white border-slate-200' : 'bg-zinc-950 border-zinc-800'}`}>
                        <div className={`flex justify-between text-sm ${isLightMode ? 'text-slate-700' : 'text-zinc-300'}`}>
                          <span>Website ({selectedWebsitePkg?.name})</span>
                          <span className="font-bold">{formatINR(selectedWebsitePkg?.price || 0)}</span>
                        </div>
                        <div className={`flex justify-between text-sm ${isLightMode ? 'text-slate-700' : 'text-zinc-300'}`}>
                          <span>Android App ({selectedAndroidPkg?.name})</span>
                          <span className="font-bold">{formatINR(selectedAndroidPkg?.price || 0)}</span>
                        </div>
                        <div className={`flex justify-between text-sm pt-2 border-t ${isLightMode ? 'border-slate-100 text-slate-500' : 'border-zinc-800 text-zinc-400'}`}>
                          <span>Individual Total</span>
                          <span className="font-bold">{formatINR(individualTotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-orange-600">
                          <span className="font-bold">Bundle Price</span>
                          <span className="font-black">{formatINR(selectedBundle?.price || 0)}</span>
                        </div>
                        {bundleSavings > 0 && (
                          <div className="flex justify-between text-sm text-emerald-600 font-bold">
                            <span>You Save</span>
                            <span>{formatINR(bundleSavings)}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-6">
                        <button type="button" onClick={() => goToStep(2)} className={`text-xs font-bold cursor-pointer ${isLightMode ? 'text-slate-500 hover:text-orange-600' : 'text-zinc-500 hover:text-orange-400'}`}>
                          ← Back
                        </button>
                        <button
                          type="button"
                          onClick={() => goToStep(4)}
                          className="ml-auto inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
                        >
                          See Recommendation <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && recommendation && (recommendation.kind === 'package' ? recommendation.pkg : recommendation.bundle) && (
                    <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                      <h3 className={`text-lg font-black mb-1 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Step 4 — Your Recommended Package</h3>
                      <p className={`text-xs mb-6 ${isLightMode ? 'text-slate-500' : 'text-zinc-400'}`}>Based on your answers, here is what we suggest.</p>

                      <div className={`rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6 ${
                        isLightMode
                          ? 'bg-white border-slate-200 shadow-slate-200/80'
                          : 'bg-gradient-to-b from-zinc-900 to-black border-orange-500/30'
                      }`}>
                        <div className={`flex items-center justify-between pb-4 border-b ${isLightMode ? 'border-slate-100' : 'border-zinc-800'}`}>
                          <span className="text-xs font-extrabold tracking-widest uppercase text-orange-600">Recommendation Summary</span>
                          <Sparkles className="w-5 h-5 text-orange-500" />
                        </div>

                        <div>
                          <div className={`text-xs font-medium uppercase tracking-wider ${isLightMode ? 'text-slate-500' : 'text-zinc-400'}`}>Package</div>
                          <div className={`text-2xl font-black mt-1 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                            {recommendation.kind === 'package' ? recommendation.pkg!.name : recommendation.bundle!.name}
                          </div>
                          <div className={`text-3xl font-black mt-2 text-orange-600`}>
                            {formatINR(recommendation.kind === 'package' ? recommendation.pkg!.price : recommendation.bundle!.price)}
                          </div>
                        </div>

                        {recommendation.kind === 'package' && (
                          <div className="space-y-2">
                            {recommendation.pkg!.features.slice(0, 6).map((feat, idx) => (
                              <div key={idx} className={`flex items-start gap-2 text-xs font-medium ${isLightMode ? 'text-slate-700' : 'text-zinc-300'}`}>
                                <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {recommendation.kind === 'bundle' && (
                          <div className="space-y-2 text-xs font-medium">
                            <div className={`flex items-start gap-2 ${isLightMode ? 'text-slate-700' : 'text-zinc-300'}`}>
                              <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                              <span>{WEBSITE_PACKAGES.find((p) => p.id === recommendation.bundle!.websiteTier)?.name}</span>
                            </div>
                            <div className={`flex items-start gap-2 ${isLightMode ? 'text-slate-700' : 'text-zinc-300'}`}>
                              <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                              <span>{ANDROID_PACKAGES.find((p) => p.id === recommendation.bundle!.androidTier)?.name}</span>
                            </div>
                            {bundleSavings > 0 && (
                              <div className="flex items-start gap-2 text-emerald-600 font-bold">
                                <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                <span>You save {formatINR(bundleSavings)} vs buying separately</span>
                              </div>
                            )}
                          </div>
                        )}

                        <div className={`p-4 rounded-2xl border space-y-1 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950 border-zinc-800'}`}>
                          <div className={`flex items-center gap-2 text-xs font-bold ${isLightMode ? 'text-slate-700' : 'text-zinc-300'}`}>
                            <Clock className="w-4 h-4 text-orange-500" />
                            <span>Estimated Timeline</span>
                          </div>
                          <div className={`font-bold pl-6 text-lg ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                            {tier ? TIER_TIMELINE[tier as PackageTierId] : '—'}
                            {need === 'both' ? ' (delivered in parallel)' : ''}
                          </div>
                        </div>

                        <div className={`space-y-2 text-xs font-medium ${isLightMode ? 'text-slate-700' : 'text-zinc-300'}`}>
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>1 Year FREE Maintenance Included</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>100% Source Code Ownership & Documentation</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Direct 1-on-1 development with Soaib Akhtar</span>
                          </div>
                        </div>

                        <div className="space-y-2.5 pt-2">
                          <button
                            onClick={handleWizardWhatsApp}
                            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Chat on WhatsApp
                          </button>
                          <button
                            onClick={handleWizardProposal}
                            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
                          >
                            <Mail className="w-4 h-4" />
                            Request Proposal
                          </button>
                        </div>
                      </div>

                      <button type="button" onClick={() => goToStep(need === 'both' ? 3 : 2)} className={`mt-6 text-xs font-bold cursor-pointer ${isLightMode ? 'text-slate-500 hover:text-orange-600' : 'text-zinc-500 hover:text-orange-400'}`}>
                        ← Back
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
