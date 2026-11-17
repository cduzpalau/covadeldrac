/* eslint-disable @next/next/no-img-element -- Static export (`output: "export"`) uses pre-generated responsive WebP srcSet */
'use client';

import React from 'react';
import { Dictionary } from '@/lib/i18n';
import { Target, ArrowRight, CheckCircle2, ChevronDown, Crosshair } from 'lucide-react';
import { PreviewPhotoCopy } from './previewCopy';

interface HeroSectionPreviewProps {
  dict: Dictionary;
  photoCopy: PreviewPhotoCopy['hero'];
}

export const HeroSectionPreview: React.FC<HeroSectionPreviewProps> = ({ dict, photoCopy }) => {
  return (
    <section className="relative min-h-[90dvh] flex items-center overflow-hidden bg-zinc-950 pt-10 pb-20 border-b border-zinc-800/80">
      {/* Background Precision Glow & Subtle Reticle */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-emerald-950/30 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-amber-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-zinc-800/30 -z-10 hidden lg:block" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 space-y-14">
        {/* Top Asymmetric Split: Editorial Pitch (7 cols) + Mid-Release Action Frame (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-medium tracking-wide shadow-sm shadow-emerald-950">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" aria-hidden="true" />
              <span>{dict.hero.badge}</span>
            </div>

            {/* Main Titles */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] text-balance">
                <span>{dict.hero.titleLine1}</span>
                <br />
                <span className="gold-gradient-text">{dict.hero.titleLine2}</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed text-pretty">
                {dict.hero.description}
              </p>
            </div>

            {/* Quick CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
              <a
                href="#facilities"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-base shadow-lg shadow-emerald-950/60 border border-emerald-600/40 transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <Target className="w-5 h-5 text-amber-400" aria-hidden="true" />
                <span>{dict.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 text-emerald-300" aria-hidden="true" />
              </a>
              <a
                href="#about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white font-semibold text-base border border-zinc-700/80 transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <span>{dict.hero.ctaSecondary}</span>
              </a>
            </div>

            {/* Feature Highlights Pills */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-zinc-300">
              {dict.hero.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/70 border border-zinc-800/80"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Framed Mid-Flight Release Showcase (LCP Candidate) */}
          <div className="lg:col-span-5">
            <figure className="relative mx-auto max-w-xl lg:max-w-none rounded-3xl p-1.5 bg-gradient-to-br from-emerald-600/40 via-zinc-800 to-amber-500/40 shadow-2xl shadow-black/70">
              <div className="relative overflow-hidden rounded-[20px] bg-zinc-900 aspect-[1400/927]">
                <img
                  src="/images/preview/hero-release-1400.webp"
                  srcSet="/images/preview/hero-release-800.webp 800w, /images/preview/hero-release-1400.webp 1400w"
                  sizes="(max-width: 1024px) 92vw, 42vw"
                  width={1400}
                  height={927}
                  fetchPriority="high"
                  alt={photoCopy.imageAlt}
                  className="w-full h-full object-cover object-center"
                />
                {/* Subtle bottom gradient for caption legibility while keeping © credit visible on right */}
                <div
                  className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
                <figcaption className="absolute bottom-3 left-3 right-24 sm:bottom-4 sm:left-4 flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 shrink-0 mt-0.5">
                    <Crosshair className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                      {photoCopy.captionTitle}
                    </p>
                    <p className="text-[11px] text-zinc-300 leading-tight mt-0.5">
                      {photoCopy.captionSubtitle}
                    </p>
                  </div>
                </figcaption>
              </div>
            </figure>
          </div>
        </div>

        {/* Quantitative Milestones Ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center hover:border-zinc-700 transition-colors">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-400 tracking-tight">
              {dict.hero.stats.experience.value}
            </div>
            <div className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium text-pretty">
              {dict.hero.stats.experience.label}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center hover:border-zinc-700 transition-colors">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-emerald-400 tracking-tight">
              {dict.hero.stats.podiums.value}
            </div>
            <div className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium text-pretty">
              {dict.hero.stats.podiums.label}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center hover:border-zinc-700 transition-colors">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {dict.hero.stats.athletes.value}
            </div>
            <div className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium text-pretty">
              {dict.hero.stats.athletes.label}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center hover:border-zinc-700 transition-colors">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-400 tracking-tight">
              {dict.hero.stats.lanes.value}
            </div>
            <div className="text-xs sm:text-sm text-zinc-400 mt-1 font-medium text-pretty">
              {dict.hero.stats.lanes.label}
            </div>
          </div>
        </div>
      </div>

      {/* Down indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-zinc-500 animate-bounce">
        <a href="#about" aria-label="Scroll to about section">
          <ChevronDown className="w-5 h-5 text-zinc-400" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};
