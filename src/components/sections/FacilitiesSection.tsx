'use client';

import React from 'react';
import { Dictionary } from '@/lib/i18n';
import { Warehouse, Target, Video, Dumbbell, Compass, MapPin, ArrowRight, Check, Quote, ExternalLink } from 'lucide-react';

interface FacilitiesSectionProps {
  dict: Dictionary;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ dict }) => {
  const spaceIcons = [
    <Video key="video" className="w-5 h-5 text-amber-400" aria-hidden="true" />,
    <Dumbbell key="gym" className="w-5 h-5 text-emerald-400" aria-hidden="true" />,
    <Target key="gear" className="w-5 h-5 text-amber-400" aria-hidden="true" />,
    <Compass key="field" className="w-5 h-5 text-emerald-400" aria-hidden="true" />,
  ];

  return (
    <section id="facilities" className="py-24 bg-zinc-950/70 border-b border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-600/40 text-emerald-400 text-xs font-semibold tracking-wider uppercase">
            <Warehouse className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{dict.facilities.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
            {dict.facilities.title}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed text-pretty">
            {dict.facilities.subtitle}
          </p>
        </div>

        {/* Sergi's First-Person Infrastructure Manifesto */}
        <div className="max-w-4xl mx-auto mb-20 rounded-2xl bg-zinc-900/70 border border-zinc-800 p-6 sm:p-10 space-y-5 shadow-xl shadow-black/30">
          <p className="text-lg sm:text-xl font-semibold text-emerald-300/95 leading-relaxed border-l-2 border-amber-500 pl-4 text-pretty">
            {dict.facilities.introLead}
          </p>
          <div className="space-y-4">
            {dict.facilities.introParagraphs.map((paragraph, idx) => (
              <p key={idx} className="text-sm sm:text-base text-zinc-300 leading-relaxed text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* 2x2 Real Infrastructure Spaces Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-800">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight text-balance">
              {dict.facilities.spacesTitle}
            </h3>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              {dict.facilities.spacesLabel}
            </span>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dict.facilities.spaces.map((space, idx) => (
              <li
                key={idx}
                className="group rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl shadow-black/40"
              >
                {/* Visual Space Header with Target Aesthetic */}
                <div className="relative h-40 bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950/60 p-6 flex flex-col justify-between border-b border-zinc-800 overflow-hidden">
                  {/* Decorative target rings */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-zinc-800/80 -z-0 pointer-events-none flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full border border-zinc-700/60 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full border border-amber-500/30 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-amber-500/20" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between relative z-10">
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-zinc-950 shadow-md">
                      {space.tag}
                    </span>
                    <div className="p-2 rounded-xl bg-zinc-950/80 border border-zinc-800">
                      {spaceIcons[idx] || <Target className="w-5 h-5 text-amber-400" aria-hidden="true" />}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h4 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors text-balance">
                      {space.title}
                    </h4>
                  </div>
                </div>

                {/* Space Info & Key Features */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-sm text-zinc-300 leading-relaxed text-pretty">
                    {space.description}
                  </p>

                  <div className="pt-3 border-t border-zinc-800/80 space-y-2">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      {dict.facilities.specsTitle}
                    </span>
                    <ul className="space-y-1.5">
                      {space.specs.map((spec, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-2 text-xs text-zinc-400 text-pretty">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Terrassa Location Closing Quote & CTA Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-emerald-950/70 via-zinc-900 to-zinc-900 border border-emerald-800/40 p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-2xl">
          <figure className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{dict.facilities.closingBadge}</span>
            </div>
            <blockquote className="text-sm sm:text-base text-zinc-200 leading-relaxed italic text-pretty flex items-start gap-2.5">
              <Quote className="w-5 h-5 text-amber-400/50 shrink-0 mt-0.5" aria-hidden="true" />
              <span>&ldquo;{dict.facilities.closingQuote}&rdquo;</span>
            </blockquote>
            <figcaption className="text-xs font-bold text-amber-400 uppercase tracking-wider pl-7">
              — {dict.facilities.closingAuthor}
            </figcaption>
          </figure>
          <div className="shrink-0 w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={dict.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-950/80 hover:bg-zinc-900 text-emerald-300 hover:text-amber-300 border border-emerald-700/50 font-semibold text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{dict.contact.mapsLinkLabel}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span>{dict.facilities.ctaButton}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
