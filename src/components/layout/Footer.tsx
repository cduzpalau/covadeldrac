'use client';

import React from 'react';
import { Locale } from '@/lib/i18n';
import { Target, ArrowUp, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  locale: Locale;
  dict: {
    siteName: string;
    siteTagline: string;
    founderName: string;
    founderTitle: string;
    backToTop: string;
    nav: {
      about: string;
      methodology: string;
      facilities: string;
      athletes: string;
      contact: string;
    };
    footer: {
      brandDescription: string;
      navigationTitle: string;
      facilitiesTitle: string;
      legalTitle: string;
      privacyPolicy: string;
      legalNotice: string;
      cookiesPolicy: string;
      gdprDisclaimer: string;
      allRightsReserved: string;
      designedFor: string;
    };
  };
}

export const Footer: React.FC<FooterProps> = ({ dict }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400">
      {/* Top Banner / Callout */}
      <div className="border-b border-zinc-900/80 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-200">
                {dict.founderName} — {dict.founderTitle}
              </p>
              <p className="text-xs text-zinc-400">
                {dict.footer.gdprDisclaimer}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white border border-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <span>{dict.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-amber-400 shadow-md shadow-emerald-950">
                <Target className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                {dict.siteName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {dict.footer.brandDescription}
            </p>
            <div className="pt-2 text-xs text-zinc-500">
              Granollers, Barcelona • Catalunya
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">
              {dict.footer.navigationTitle}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  {dict.nav.about}
                </a>
              </li>
              <li>
                <a href="#methodology" className="hover:text-amber-400 transition-colors">
                  {dict.nav.methodology}
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-amber-400 transition-colors">
                  {dict.nav.facilities}
                </a>
              </li>
              <li>
                <a href="#athletes" className="hover:text-amber-400 transition-colors">
                  {dict.nav.athletes}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors">
                  {dict.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Contact Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">
              {dict.nav.contact}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-zinc-400 text-xs sm:text-sm">
                  Carrer del Tir, Nau 4 - Pol. Can Parera, Granollers
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:info@covadeldrac.cat" className="hover:text-amber-400 transition-colors text-xs sm:text-sm">
                  info@covadeldrac.cat
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+34654987321" className="hover:text-amber-400 transition-colors text-xs sm:text-sm">
                  +34 654 98 73 21
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">
              {dict.footer.legalTitle}
            </h3>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <a href="#gdpr-notice" className="hover:text-amber-400 transition-colors">
                  {dict.footer.privacyPolicy} & RGPD
                </a>
              </li>
              <li>
                <a href="#gdpr-notice" className="hover:text-amber-400 transition-colors">
                  {dict.footer.legalNotice}
                </a>
              </li>
              <li>
                <a href="#gdpr-notice" className="hover:text-amber-400 transition-colors">
                  {dict.footer.cookiesPolicy}
                </a>
              </li>
            </ul>
            <div className="pt-2">
              <p className="text-[11px] text-zinc-500 leading-tight">
                Protecció de menors i dades esportives regulada per RGPD (UE) 2016/679.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} {dict.siteName}. {dict.footer.allRightsReserved}</p>
          <p>{dict.footer.designedFor}</p>
        </div>
      </div>
    </footer>
  );
};
