import React, { useState } from 'react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/companyData';
import { ContactFormState } from '../types';
import { Phone, Mail, Globe, MapPin, Send, CheckCircle2, MessageCircle, Clock, AlertCircle } from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
  isLightMode?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = 'Custom Software Development',
  isLightMode = true,
}) => {
  const [formState, setFormState] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    service: initialService,
    message: '',
    budget: '$500 - $1,000',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatus('success');
        setFeedbackMsg(data.message || 'Thank you! Your message has been sent to Soaib Akhtar.');
      } else {
        setStatus('error');
        setFeedbackMsg(
          data.message ||
            `Something went wrong sending your enquiry. Please try again, or reach us directly on WhatsApp at ${COMPANY_INFO.founder.phone}.`
        );
      }
    } catch (err) {
      setStatus('error');
      setFeedbackMsg(`Something went wrong sending your enquiry. Please try again, or reach us directly on WhatsApp at ${COMPANY_INFO.founder.phone}.`);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = `Hi Soaib Akhtar (Spesio Technologies),\n\nName: ${formState.name || 'Client'}\nEmail: ${formState.email}\nPhone: ${formState.phone}\nService Interested: ${formState.service}\nBudget Range: ${formState.budget}\nMessage: ${formState.message || 'Interested in your development services.'}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/918957833269?text=${encoded}`, '_blank');
  };

  return (
    <section id="contact" className={`py-10 sm:py-20 transition-colors duration-200 border-t relative ${
      isLightMode ? 'bg-white border-slate-200' : 'bg-[#080A10] border-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-500/10 border border-maroon-500/20 text-maroon-600 text-xs font-bold tracking-wider uppercase mb-3">
            Get In Touch
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
            isLightMode ? 'text-slate-900' : 'text-white'
          }`}>
            Start Your Project With Spesio Technologies
          </h2>
          <p className={`mt-3 text-base font-medium ${
            isLightMode ? 'text-slate-600' : 'text-zinc-400'
          }`}>
            Reach out directly to Founder Soaib Akhtar. We reply within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-12">
          
          {/* Left Column: Direct Contact Details Card */}
          <div className={`lg:col-span-5 p-4 sm:p-8 rounded-2xl sm:rounded-3xl border shadow-2xl flex flex-col justify-between space-y-4 sm:space-y-8 transition-colors ${
            isLightMode
              ? 'bg-[#FAFAFB] border-slate-200 shadow-slate-200/80'
              : 'bg-gradient-to-b from-zinc-900 to-black border-maroon-500/30'
          }`}>
            
            <div className="space-y-3 sm:space-y-6">
              <div>
                <span className="text-xs font-bold text-maroon-600 uppercase tracking-widest">Spesio Technologies</span>
                <h3 className={`text-lg sm:text-2xl font-black mt-1 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Contact Information</h3>
                <p className={`text-xs mt-2 ${isLightMode ? 'text-slate-600' : 'text-zinc-400'}`}>
                  Official contact details from our company business card.
                </p>
              </div>

              <div className="space-y-2 sm:space-y-4 pt-1 sm:pt-2 text-sm">
                
                {/* Phone */}
                <a
                  href={`tel:${COMPANY_INFO.founder.phone}`}
                  className={`flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-colors group ${
                    isLightMode
                      ? 'bg-white border-slate-200 hover:border-maroon-500/50 shadow-2xs'
                      : 'bg-zinc-950 border-zinc-800 hover:border-maroon-500/50'
                  }`}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-maroon-500/10 border border-maroon-500/30 flex items-center justify-center shrink-0 group-hover:bg-maroon-600 group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-maroon-600 group-hover:text-white" />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-semibold ${isLightMode ? 'text-slate-500' : 'text-zinc-500'}`}>Phone Call / WhatsApp</div>
                    <div className={`text-sm sm:text-base font-bold group-hover:text-maroon-600 transition-colors ${
                      isLightMode ? 'text-slate-900' : 'text-white'
                    }`}>
                      {COMPANY_INFO.founder.phone}
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${COMPANY_INFO.founder.email}`}
                  className={`flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-colors group ${
                    isLightMode
                      ? 'bg-white border-slate-200 hover:border-maroon-500/50 shadow-2xs'
                      : 'bg-zinc-950 border-zinc-800 hover:border-maroon-500/50'
                  }`}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-maroon-500/10 border border-maroon-500/30 flex items-center justify-center shrink-0 group-hover:bg-maroon-600 group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-maroon-600 group-hover:text-white" />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-semibold ${isLightMode ? 'text-slate-500' : 'text-zinc-500'}`}>Official Email</div>
                    <div className={`text-sm sm:text-base font-bold group-hover:text-maroon-600 transition-colors truncate max-w-[220px] ${
                      isLightMode ? 'text-slate-900' : 'text-white'
                    }`}>
                      {COMPANY_INFO.founder.email}
                    </div>
                  </div>
                </a>

                {/* Website */}
                <a
                  href={`https://${COMPANY_INFO.founder.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-colors group ${
                    isLightMode
                      ? 'bg-white border-slate-200 hover:border-maroon-500/50 shadow-2xs'
                      : 'bg-zinc-950 border-zinc-800 hover:border-maroon-500/50'
                  }`}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-maroon-500/10 border border-maroon-500/30 flex items-center justify-center shrink-0 group-hover:bg-maroon-600 group-hover:text-white transition-colors">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-maroon-600 group-hover:text-white" />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-semibold ${isLightMode ? 'text-slate-500' : 'text-zinc-500'}`}>Website</div>
                    <div className={`text-sm sm:text-base font-bold group-hover:text-maroon-600 transition-colors ${
                      isLightMode ? 'text-slate-900' : 'text-white'
                    }`}>
                      {COMPANY_INFO.founder.website}
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className={`flex items-start gap-3 sm:gap-4 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border ${
                  isLightMode ? 'bg-white border-slate-200 shadow-2xs' : 'bg-zinc-950 border-zinc-800'
                }`}>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-maroon-500/10 border border-maroon-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-maroon-600" />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-semibold ${isLightMode ? 'text-slate-500' : 'text-zinc-500'}`}>Address / Headquarters</div>
                    <div className={`font-bold text-xs leading-snug mt-0.5 ${
                      isLightMode ? 'text-slate-900' : 'text-white'
                    }`}>
                      {COMPANY_INFO.founder.location}
                    </div>
                  </div>
                </div>

                {/* Working Hours & Response Time */}
                <div className={`flex items-start gap-3 sm:gap-4 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border ${
                  isLightMode ? 'bg-white border-slate-200 shadow-2xs' : 'bg-zinc-950 border-zinc-800'
                }`}>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-maroon-500/10 border border-maroon-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-maroon-600" />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-semibold ${isLightMode ? 'text-slate-500' : 'text-zinc-500'}`}>Working Hours</div>
                    <div className={`font-bold text-xs leading-snug mt-0.5 ${
                      isLightMode ? 'text-slate-900' : 'text-white'
                    }`}>
                      Monday – Saturday, 9 AM – 8 PM IST
                    </div>
                    <div className="text-[11px] font-medium text-emerald-600 mt-1">Usually replies within 2 hours</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Direct WhatsApp Action */}
            <div className="pt-1 sm:pt-2">
              <button
                onClick={handleWhatsAppDirect}
                className="w-full py-2.5 sm:py-3.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Quick Connect on WhatsApp
              </button>
            </div>

          </div>

          {/* Right Column: Inquiry Form */}
          <div className={`lg:col-span-7 p-4 sm:p-8 rounded-2xl sm:rounded-3xl border space-y-4 sm:space-y-6 ${
            isLightMode
              ? 'bg-[#FAFAFB] border-slate-200 shadow-sm'
              : 'bg-zinc-900/80 border-zinc-800'
          }`}>
            
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`p-8 text-center space-y-4 rounded-2xl border ${
                isLightMode ? 'bg-white border-slate-200' : 'bg-zinc-950 border-maroon-500/30'
              }`}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-maroon-500/20 text-maroon-600 border border-maroon-500 flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 className="w-8 h-8" />
                </motion.div>
                <h3 className={`text-2xl font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Inquiry Received!</h3>
                <p className={`text-sm max-w-md mx-auto ${isLightMode ? 'text-slate-600' : 'text-zinc-300'}`}>
                  {feedbackMsg}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 rounded-xl bg-maroon-600 text-white text-xs font-bold hover:bg-maroon-500 transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <h3 className={`text-xl font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Project Inquiry Form</h3>

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border text-xs ${
                      isLightMode
                        ? 'bg-red-50 border-red-200 text-red-700'
                        : 'bg-red-500/10 border-red-500/30 text-red-300'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{feedbackMsg}</span>
                  </motion.div>
                )}

                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                  <div>
                    <label className={`block text-xs font-bold uppercase mb-1.5 ${
                      isLightMode ? 'text-slate-700' : 'text-zinc-300'
                    }`}>Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className={`w-full rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs border focus:outline-none focus:border-maroon-500 ${
                        isLightMode
                          ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                          : 'bg-black border-zinc-800 text-white placeholder-zinc-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase mb-1.5 ${
                      isLightMode ? 'text-slate-700' : 'text-zinc-300'
                    }`}>Your Email *</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. john@company.com"
                      className={`w-full rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs border focus:outline-none focus:border-maroon-500 ${
                        isLightMode
                          ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                          : 'bg-black border-zinc-800 text-white placeholder-zinc-500'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                  <div>
                    <label className={`block text-xs font-bold uppercase mb-1.5 ${
                      isLightMode ? 'text-slate-700' : 'text-zinc-300'
                    }`}>Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="+91 00000 00000"
                      className={`w-full rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs border focus:outline-none focus:border-maroon-500 ${
                        isLightMode
                          ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                          : 'bg-black border-zinc-800 text-white placeholder-zinc-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase mb-1.5 ${
                      isLightMode ? 'text-slate-700' : 'text-zinc-300'
                    }`}>Service Required</label>
                    <select
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      className={`w-full rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs border focus:outline-none focus:border-maroon-500 ${
                        isLightMode
                          ? 'bg-white border-slate-300 text-slate-900'
                          : 'bg-black border-zinc-800 text-white'
                      }`}
                    >
                      <option value="Custom Software Development">Custom Software Development</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Android App Development">Android App Development</option>
                      <option value="AI Integrations">AI Integrations</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase mb-1.5 ${
                    isLightMode ? 'text-slate-700' : 'text-zinc-300'
                  }`}>Project Details & Requirements</label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Briefly describe your vision, features, and goal..."
                    className={`w-full rounded-xl p-3.5 sm:p-4 text-xs border focus:outline-none focus:border-maroon-500 ${
                      isLightMode
                        ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                        : 'bg-black border-zinc-800 text-white placeholder-zinc-500'
                    }`}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 px-6 rounded-xl bg-maroon-600 hover:bg-maroon-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-maroon-500/20 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {status === 'submitting' ? 'Submitting...' : 'Submit Inquiry To Spesio Technologies'}
                </motion.button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
