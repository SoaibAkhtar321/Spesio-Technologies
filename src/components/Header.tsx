import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Phone, Menu, X, Sparkles, Sun, Moon } from 'lucide-react';
import { SpesioLogo } from './SpesioLogo';

interface HeaderProps {
  onOpenAiAssistant: () => void;
  onOpenEstimator: () => void;
  isLightMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAiAssistant,
  onOpenEstimator,
  isLightMode,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Work', href: '#portfolio' },
    { name: 'Estimator', href: '#estimator' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md transition-colors duration-200 border-b ${
      isLightMode
        ? 'bg-white/90 border-slate-200/80 shadow-xs'
        : 'bg-[#0A0D14]/85 border-orange-500/15'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Real ST Monogram */}
        <a href="#" className="flex items-center gap-2.5 group">
          <SpesioLogo isLightMode={isLightMode} variant="horizontal" size="md" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isLightMode
                  ? 'text-slate-700 hover:text-orange-600'
                  : 'text-zinc-300 hover:text-orange-400'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme Switcher Button */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              isLightMode
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
            }`}
            title={isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            aria-label="Toggle theme"
          >
            {isLightMode ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            onClick={onOpenAiAssistant}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isLightMode
                ? 'bg-orange-50 hover:bg-orange-100/80 text-orange-600 border-orange-200'
                : 'bg-zinc-900 hover:bg-orange-500/10 text-orange-400 border-orange-500/30'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            Spesio AI
          </button>

          <a
            href={`tel:${COMPANY_INFO.founder.phone}`}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              isLightMode
                ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-orange-500" />
            {COMPANY_INFO.founder.formattedPhone}
          </a>

          <button
            onClick={onOpenEstimator}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-md shadow-orange-500/20 hover:from-orange-500 hover:to-orange-400 transition-all cursor-pointer"
          >
            Get Scope & Quote
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg border ${
              isLightMode ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-zinc-900 border-zinc-800 text-zinc-300'
            }`}
            aria-label="Toggle theme"
          >
            {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            onClick={onOpenAiAssistant}
            className="p-2 rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/20"
            aria-label="Spesio AI"
          >
            <Sparkles className="w-5 h-5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 ${isLightMode ? 'text-slate-700 hover:text-slate-900' : 'text-zinc-400 hover:text-white'}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-4 pt-3 pb-6 space-y-3 ${
          isLightMode ? 'bg-white border-slate-200' : 'bg-[#0D111A] border-orange-500/20'
        }`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-sm font-medium py-1 ${
                isLightMode ? 'text-slate-700 hover:text-orange-600' : 'text-zinc-200 hover:text-orange-400'
              }`}
            >
              {link.name}
            </a>
          ))}
          <div className={`pt-3 border-t space-y-2 ${isLightMode ? 'border-slate-200' : 'border-zinc-800'}`}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimator();
              }}
              className="w-full text-center py-2.5 rounded-lg text-xs font-bold bg-orange-500 text-white shadow-md shadow-orange-500/20"
            >
              Get Project Scope & Quote
            </button>
            <a
              href={`tel:${COMPANY_INFO.founder.phone}`}
              className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-semibold border ${
                isLightMode ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-zinc-900 border-zinc-800 text-zinc-200'
              }`}
            >
              <Phone className="w-4 h-4 text-orange-500" />
              Call {COMPANY_INFO.founder.formattedPhone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
