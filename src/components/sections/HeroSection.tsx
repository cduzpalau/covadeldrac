'use client';

import React from 'react';
import { Dictionary } from '@/lib/i18n';
import { Target, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  dict: Dictionary;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ dict }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-zinc-950 pt-12 pb-20 border-b border-zinc-800/80">
      {/* Background Precision Crosshair & Target Rings Glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial Gold/Green Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-emerald-950/20 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-amber-500/10 rounded-full blur-2xl -z-10" />

        {/* Concentric subtle target circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] rounded-full border border-zinc-800/40 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[420px] sm:h-[420px] rounded-full border border-zinc-800/50 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] sm:w-[240px] sm:h-[240px] rounded-full border border-amber-500/20 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] rounded-full border border-amber-400/30 -z-10" />

        {/* Technical Target Axis Crosshairs */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-zinc-800/40 -z-10 hidden sm:block" />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-zinc-800/40 -z-10 hidden sm:block" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-medium tracking-wide shadow-sm shadow-emerald-950">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>{dict.hero.badge}</span>
          </div>

          {/* Main Titles */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              <span>{dict.hero.titleLine1}</span>
              <br />
              <span className="gold-gradient-text">
                {dict.hero.titleLine2}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed pt-2">
              {dict.hero.description}
            </p>
          </div>

          {/* Quick CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#facilities"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-base shadow-lg shadow-emerald-950/60 border border-emerald-600/40 transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <Target className="w-5 h-5 text-amber-400" />
              <span>{dict.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 text-emerald-300" />
            </a>
            <a
              href="#about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white font-semibold text-base border border-zinc-700/80 transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span>{dict.hero.ctaSecondary}</span>
            </a>
          </div>

          {/* Feature Highlights Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-zinc-300">
            {dict.hero.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/70 border border-zinc-800/80"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Quantitative Stats Ticker */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center hover:border-zinc-700 transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight">
                {dict.hero.stats.experience.value}
              </div>
              <div className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium">
                {dict.hero.stats.experience.label}
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center hover:border-zinc-700 transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight">
                {dict.hero.stats.podiums.value}
              </div>
              <div className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium">
                {dict.hero.stats.podiums.label}
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center hover:border-zinc-700 transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {dict.hero.stats.athletes.value}
              </div>
              <div className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium">
                {dict.hero.stats.athletes.label}
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center hover:border-zinc-700 transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight">
                {dict.hero.stats.lanes.value}
              </div>
              <div className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium">
                {dict.hero.stats.lanes.label}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Down indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-zinc-500 animate-bounce">
        <a href="#about" aria-label="Scroll to about section">
          <ChevronDown className="w-5 h-5 text-zinc-400" />
        </a>
      </div>
    </section>
  );
};
