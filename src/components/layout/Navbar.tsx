'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X, Target, ArrowRight } from 'lucide-react';

interface NavbarProps {
  locale: Locale;
  dict: {
    siteName: string;
    founderName: string;
    nav: {
      home: string;
      about: string;
      methodology: string;
      facilities: string;
      athletes: string;
      contact: string;
      cta: string;
    };
  };
}

export const Navbar: React.FC<NavbarProps> = ({ locale, dict }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `#about`, label: dict.nav.about },
    { href: `#methodology`, label: dict.nav.methodology },
    { href: `#facilities`, label: dict.nav.facilities },
    { href: `#athletes`, label: dict.nav.athletes },
    { href: `#contact`, label: dict.nav.contact },
  ];

  const handleAnchorClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/90 shadow-lg shadow-black/40'
          : 'bg-zinc-950/70 backdrop-blur-sm border-b border-zinc-800/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-zinc-900 border border-emerald-500/30 flex items-center justify-center shadow-md shadow-emerald-950/50 group-hover:border-amber-400/50 transition-colors">
              <Target className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-zinc-100 flex items-center gap-1.5">
                {dict.siteName}
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              </span>
              <span className="text-xs font-medium text-emerald-400/90 tracking-wide uppercase">
                {dict.founderName}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-amber-400 hover:bg-zinc-900/60 rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side items: Language Switcher & CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <LanguageSwitcher currentLocale={locale} />
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white border border-emerald-600/40 shadow-md shadow-emerald-950/40 transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span>{dict.nav.cta}</span>
              <ArrowRight className="w-4 h-4 text-emerald-300" />
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <LanguageSwitcher currentLocale={locale} />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="sm:hidden border-b border-zinc-800 bg-zinc-950/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleAnchorClick}
                className="px-4 py-3 text-base font-medium text-zinc-200 hover:text-amber-400 hover:bg-zinc-900/80 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={handleAnchorClick}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-center shadow-lg shadow-emerald-950"
              >
                <span>{dict.nav.cta}</span>
                <ArrowRight className="w-4 h-4 text-emerald-300" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
