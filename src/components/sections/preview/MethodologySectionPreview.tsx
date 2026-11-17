/* eslint-disable @next/next/no-img-element -- Static export (`output: "export"`) uses pre-generated responsive WebP srcSet */
'use client';

import React from 'react';
import { Dictionary } from '@/lib/i18n';
import { UserCheck, Layers, Scale, Brain, Quote, Sparkles, Flame, Target } from 'lucide-react';
import { PreviewPhotoCopy } from './previewCopy';

interface MethodologySectionPreviewProps {
  dict: Dictionary;
  photoCopy: PreviewPhotoCopy['methodology'];
}

export const MethodologySectionPreview: React.FC<MethodologySectionPreviewProps> = ({
  dict,
  photoCopy,
}) => {
  const ruleIcons: Record<string, React.ReactNode> = {
    confort: <UserCheck className="w-6 h-6 text-amber-400" aria-hidden="true" />,
    sistema: <Layers className="w-6 h-6 text-emerald-400" aria-hidden="true" />,
    balanc: <Scale className="w-6 h-6 text-amber-400" aria-hidden="true" />,
  };

  return (
    <section id="methodology" className="py-24 bg-zinc-950 border-b border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Anti-Dogma Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{dict.methodology.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
            {dict.methodology.title}
          </h2>
          <p className="text-base sm:text-lg text-emerald-300/95 font-medium leading-relaxed text-pretty">
            {dict.methodology.subtitle}
          </p>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed text-pretty pt-1">
            {dict.methodology.introText}
          </p>
        </div>

        {/* The 3 Rules of Archery */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-800">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight text-balance">
              {dict.methodology.rulesTitle}
            </h3>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              {dict.methodology.rulesLabel}
            </span>
          </div>

          <ol className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {dict.methodology.rules.map((rule, idx) => (
              <li
                key={rule.id}
                className="group p-6 sm:p-8 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-900 transition-all duration-300 flex flex-col justify-between shadow-lg shadow-black/30"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                      {ruleIcons[rule.id] || (
                        <Sparkles className="w-6 h-6 text-amber-400" aria-hidden="true" />
                      )}
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/25">
                        {rule.ruleNumber}
                      </span>
                      <span className="text-2xl font-black text-zinc-700 font-mono">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                    {rule.title}
                  </h4>
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mt-1 mb-4">
                    {rule.subtitle}
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed text-pretty">
                    {rule.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Visual Bridge: Woodland Target Grouping + Transition to Emotional Preparation */}
        <div className="mb-14 rounded-2xl bg-zinc-900/70 border border-zinc-800/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center shadow-xl shadow-black/30">
          <div className="lg:col-span-5 aspect-[4/3] lg:aspect-auto lg:h-full bg-zinc-950 relative overflow-hidden">
            <img
              src="/images/preview/methodology-targets-1400.webp"
              srcSet="/images/preview/methodology-targets-800.webp 800w, /images/preview/methodology-targets-1400.webp 1400w"
              sizes="(max-width: 1024px) 92vw, 38vw"
              width={1400}
              height={1050}
              loading="lazy"
              decoding="async"
              alt={photoCopy.targetsAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Target className="w-4 h-4" aria-hidden="true" />
              <span>{photoCopy.targetsBadge}</span>
            </div>
            <p className="text-base sm:text-lg font-semibold text-white leading-relaxed text-pretty">
              {photoCopy.targetsCaption}
            </p>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed text-pretty">
              {dict.methodology.psychology.bridgeText}
            </p>
          </div>
        </div>

        {/* Crown Focus: Psychology, Emotional Flow & Ethology + Field Coaching Photo */}
        <div className="rounded-3xl bg-gradient-to-br from-emerald-950/60 via-zinc-900 to-zinc-950 border border-emerald-700/40 p-6 sm:p-10 lg:p-12 shadow-2xl shadow-black/50 relative overflow-hidden">
          <div
            className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
            {/* Left Column: Ethology & Emotional Core */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-semibold tracking-wider uppercase">
                <Brain className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                <span>{dict.methodology.psychology.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-balance">
                {dict.methodology.psychology.title}
              </h3>

              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed text-pretty border-l-2 border-amber-500 pl-4">
                {dict.methodology.psychology.description}
              </p>

              {/* Sergi's Closing Quote */}
              <figure className="rounded-2xl bg-zinc-950/80 border border-amber-500/25 p-5 sm:p-6 mt-4">
                <Quote className="w-7 h-7 text-amber-400/40 mb-2" aria-hidden="true" />
                <blockquote className="text-sm sm:text-base italic text-zinc-100 leading-relaxed text-pretty">
                  &ldquo;{dict.methodology.psychology.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-xs font-bold text-amber-400 tracking-wide uppercase">
                  — {dict.methodology.psychology.quoteAuthor}
                </figcaption>
              </figure>
            </div>

            {/* Right Column: Live Competition Coaching Photo + 4 Emotional Coaching Pillars */}
            <div className="lg:col-span-7 space-y-5">
              <figure className="rounded-2xl overflow-hidden bg-zinc-950 border border-emerald-700/40 shadow-xl shadow-black/40">
                <div className="aspect-[1400/933] bg-zinc-950 overflow-hidden">
                  <img
                    src="/images/preview/methodology-coaching-1400.webp"
                    srcSet="/images/preview/methodology-coaching-800.webp 800w, /images/preview/methodology-coaching-1400.webp 1400w"
                    sizes="(max-width: 1024px) 92vw, 50vw"
                    width={1400}
                    height={933}
                    loading="lazy"
                    decoding="async"
                    alt={photoCopy.coachingAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="px-4 py-3 text-xs text-emerald-200/90 font-medium bg-zinc-950/90 border-t border-zinc-800 text-pretty">
                  {photoCopy.coachingCaption}
                </figcaption>
              </figure>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dict.methodology.psychology.pillars.map((pillar, idx) => (
                  <li
                    key={idx}
                    className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/90 hover:border-emerald-500/50 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-2xl font-black text-zinc-700 font-mono">
                          0{idx + 1}
                        </span>
                        <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                          <Flame className="w-4 h-4 text-amber-400" aria-hidden="true" />
                        </div>
                      </div>
                      <h4 className="text-base font-bold text-white mb-1.5 text-balance">
                        {pillar.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed text-pretty">
                        {pillar.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
