import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Send, Bot, User, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { DEFAULT_QUICK_PROMPTS, FALLBACK_ANSWER, matchKnowledgeBase } from '../data/knowledgeBase';
import { SpesioLogo } from './SpesioLogo';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
}

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
  followUps?: string[];
}

const WELCOME_MESSAGE: ChatMessage = {
  sender: 'ai',
  text: `Hello! I'm Spesio AI, the official assistant for Spesio Technologies (founded by Soaib Akhtar). Ask me about our services, pricing, timelines, or the team.`,
  followUps: DEFAULT_QUICK_PROMPTS,
};

/** Simulated "thinking" delay so replies feel considered rather than instant, without calling any external API. */
const THINKING_DELAY_MS = 500;

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose, isLightMode = true }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleWhatsAppFallback = () => {
    const text = `Hi Soaib Akhtar (Spesio Technologies), I have a question the AI assistant couldn't answer: `;
    window.open(`https://wa.me/918957833269?text=${encodeURIComponent(text)}`, '_blank');
  };

  const respondTo = (userText: string) => {
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    // Local rule-based lookup only — no external API calls.
    window.setTimeout(() => {
      const match = matchKnowledgeBase(userText);
      if (match) {
        setMessages((prev) => [...prev, { sender: 'ai', text: match.answer, followUps: match.followUps }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: FALLBACK_ANSWER,
            followUps: ['Can I schedule a consultation?', 'What is your contact number?'],
          },
        ]);
      }
      setLoading(false);
    }, THINKING_DELAY_MS);
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;
    const userText = input;
    setInput('');
    respondTo(userText);
  };

  const handleFollowUp = (prompt: string) => {
    if (loading) return;
    respondTo(prompt);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${
            isLightMode ? 'bg-slate-900/60' : 'bg-black/80'
          }`}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-xl border rounded-3xl shadow-2xl flex flex-col h-[600px] max-h-[90vh] overflow-hidden ${
              isLightMode ? 'bg-white border-slate-200' : 'bg-[#0D111A] border-orange-500/30'
            }`}
          >
            {/* Modal Header */}
            <div
              className={`p-4 sm:p-5 border-b flex items-center justify-between ${
                isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-gradient-to-r from-zinc-900 to-black border-zinc-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <SpesioLogo isLightMode={isLightMode} variant="mark" size="md" />
                <div>
                  <div className={`font-bold text-base flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                    Spesio AI Assistant
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-bold">
                      Online
                    </span>
                  </div>
                  <p className={`text-xs ${isLightMode ? 'text-slate-500' : 'text-zinc-400'}`}>Instant answers about Spesio Technologies</p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close AI assistant"
                className={`p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer ${
                  isLightMode ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/60' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div ref={scrollRef} className={`flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 ${isLightMode ? 'bg-[#FAFAFB]' : 'bg-[#080A10]'}`}>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        msg.sender === 'user'
                          ? 'bg-orange-600 text-white'
                          : isLightMode
                          ? 'bg-white text-orange-600 border border-slate-200 shadow-2xs'
                          : 'bg-zinc-800 text-orange-400 border border-orange-500/30'
                      }`}
                    >
                      {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm max-w-[80%] leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-orange-600 text-white font-medium rounded-tr-none'
                          : isLightMode
                          ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-2xs'
                          : 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>

                  {/* Per-message follow-up suggestions */}
                  {msg.sender === 'ai' && msg.followUps && msg.followUps.length > 0 && !loading && index === messages.length - 1 && (
                    <div className="flex flex-wrap gap-2 mt-2.5 ml-11">
                      {msg.followUps.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => handleFollowUp(prompt)}
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                            isLightMode
                              ? 'bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-700'
                              : 'bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-300'
                          }`}
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isLightMode ? 'bg-white text-orange-600 border border-slate-200' : 'bg-zinc-800 border border-orange-500/30 text-orange-400'
                    }`}
                  >
                    <Bot className="w-4 h-4" />
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl flex items-center gap-1 ${
                      isLightMode ? 'bg-white border border-slate-200' : 'bg-zinc-900 border border-zinc-800'
                    }`}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${isLightMode ? 'bg-slate-400' : 'bg-zinc-500'}`}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* WhatsApp Fallback Bar */}
            <div className={`px-4 sm:px-6 py-2 border-t ${isLightMode ? 'bg-white border-slate-200' : 'bg-zinc-950 border-zinc-900'}`}>
              <button
                onClick={handleWhatsAppFallback}
                className={`w-full flex items-center justify-center gap-1.5 text-[11px] font-semibold py-1.5 rounded-lg transition-colors cursor-pointer ${
                  isLightMode ? 'text-emerald-700 hover:bg-emerald-50' : 'text-emerald-400 hover:bg-emerald-500/10'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Question not answered? Message us on WhatsApp
              </button>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSend}
              className={`p-3 sm:p-4 border-t flex items-center gap-2 ${isLightMode ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'}`}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about Spesio Technologies..."
                aria-label="Message Spesio AI Assistant"
                className={`flex-1 rounded-xl px-4 py-2.5 text-xs sm:text-sm border focus:outline-none focus:border-orange-500 ${
                  isLightMode ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400' : 'bg-black border-zinc-800 text-white placeholder-zinc-500'
                }`}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="p-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white disabled:opacity-50 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
