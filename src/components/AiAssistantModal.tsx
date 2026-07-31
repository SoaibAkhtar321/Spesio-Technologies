import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, Phone, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { SpesioLogo } from './SpesioLogo';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
}

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose, isLightMode = true }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: `Hello! I am Spesio AI, the official assistant for Spesio Technologies (Founded by Soaib Akhtar). How can I assist you today with Software Development, Web Development, Mobile Apps, or AI Integrations?`
    }
  ]);

  if (!isOpen) return null;

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: data.reply || 'Thank you for your message! You can reach Soaib Akhtar directly at +91 8957833269 or spesiotechnologies@gmail.com.',
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Spesio Technologies offers Custom Software, Web & App Development, and AI Integrations. Reach Soaib Akhtar directly at +91 8957833269 or spesiotechnologies@gmail.com.`,
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'What services do you offer?',
    'Tell me about Founder Soaib Akhtar',
    'How do I start an AI project?',
    'What is your contact number?'
  ];

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in ${
      isLightMode ? 'bg-slate-900/60' : 'bg-black/80'
    }`}>
      <div className={`w-full max-w-xl border rounded-3xl shadow-2xl flex flex-col h-[600px] max-h-[90vh] overflow-hidden ${
        isLightMode
          ? 'bg-white border-slate-200'
          : 'bg-[#0D111A] border-orange-500/30'
      }`}>
        
        {/* Modal Header */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
          isLightMode
            ? 'bg-slate-50 border-slate-200'
            : 'bg-gradient-to-r from-zinc-900 to-black border-zinc-800'
        }`}>
          <div className="flex items-center gap-3">
            <SpesioLogo isLightMode={isLightMode} variant="mark" size="md" />
            <div>
              <div className={`font-bold text-base flex items-center gap-2 ${
                isLightMode ? 'text-slate-900' : 'text-white'
              }`}>
                Spesio AI Assistant
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-bold">Online</span>
              </div>
              <p className={`text-xs ${isLightMode ? 'text-slate-500' : 'text-zinc-400'}`}>Instant answers about Spesio Technologies</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isLightMode ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/60' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className={`flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 ${
          isLightMode ? 'bg-[#FAFAFB]' : 'bg-[#080A10]'
        }`}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-orange-600 text-white'
                  : isLightMode
                    ? 'bg-white text-orange-600 border border-slate-200 shadow-2xs'
                    : 'bg-zinc-800 text-orange-400 border border-orange-500/30'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-3.5 rounded-2xl text-xs sm:text-sm max-w-[80%] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-orange-600 text-white font-medium rounded-tr-none'
                  : isLightMode
                    ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-2xs'
                    : 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isLightMode ? 'bg-white text-orange-600 border border-slate-200' : 'bg-zinc-800 border border-orange-500/30 text-orange-400'
              }`}>
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className={`px-4 py-3 rounded-2xl text-xs italic ${
                isLightMode ? 'bg-white border border-slate-200 text-slate-500' : 'bg-zinc-900 border border-zinc-800 text-zinc-400'
              }`}>
                Spesio AI is thinking...
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className={`p-3 border-t flex gap-2 overflow-x-auto no-scrollbar ${
          isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-zinc-950 border-zinc-900'
        }`}>
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => {
                setInput(prompt);
              }}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                isLightMode
                  ? 'bg-white hover:bg-slate-200 border border-slate-200 text-slate-700'
                  : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300'
              }`}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className={`p-3 sm:p-4 border-t flex items-center gap-2 ${
          isLightMode ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
        }`}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about Spesio Technologies..."
            className={`flex-1 rounded-xl px-4 py-2.5 text-xs sm:text-sm border focus:outline-none focus:border-orange-500 ${
              isLightMode
                ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                : 'bg-black border-zinc-800 text-white placeholder-zinc-500'
            }`}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white disabled:opacity-50 transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
