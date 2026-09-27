'use client';

import React from 'react';
import { Dictionary } from '@/lib/i18n';
import { Warehouse, Target, Wrench, Video, Dumbbell, ShieldCheck, ArrowRight, Check } from 'lucide-react';

interface FacilitiesSectionProps {
  dict: Dictionary;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ dict }) => {
  const zoneIcons = [
    <Wrench key="w" className="w-6 h-6 text-amber-400" />,
    <Video key="v" className="w-6 h-6 text-emerald-400" />,
    <Dumbbell key="d" className="w-6 h-6 text-amber-400" />,
  ];

  return (
    <section id="facilities" className="py-24 bg-zinc-950/70 border-b border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-600/40 text-emerald-400 text-xs font-semibold tracking-wider uppercase">
            <Warehouse className="w-3.5 h-3.5" />
            <span>{dict.facilities.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {dict.facilities.title}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            {dict.facilities.subtitle}
          </p>
        </div>

        {/* 4 Distance Shooting Lanes Grid */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-800">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {dict.facilities.lanesTitle}
            </h3>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              Distàncies Reglamentàries
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dict.facilities.lanes.map((lane, idx) => (
              <div
                key={idx}
                className="group rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl shadow-black/40"
              >
                {/* Visual Lane Header with Target Aesthetic */}
                <div className="relative h-44 bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950/60 p-6 flex flex-col justify-between border-b border-zinc-800 overflow-hidden">
                  {/* Decorative target rings */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-zinc-800/80 -z-0 pointer-events-none flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-zinc-700/60 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border border-amber-500/30 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-amber-500/20" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between relative z-10">
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-zinc-950 shadow-md">
                      {lane.distance}
                    </span>
                    <Target className="w-5 h-5 text-zinc-600 group-hover:text-amber-400 transition-colors" />
                  </div>

                  <div className="relative z-10">
                    <h4 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {lane.title}
                    </h4>
                  </div>
                </div>

                {/* Lane Info & Specs */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {lane.description}
                  </p>

                  <div className="pt-2 border-t border-zinc-800/80 space-y-2">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      Especificacions Tècniques
                    </span>
                    <ul className="space-y-1.5">
                      {lane.specs.map((spec, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-2 text-xs text-zinc-400">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specialized Technical Zones */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-800">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {dict.facilities.zonesTitle}
            </h3>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              Equipament Avançat
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dict.facilities.zones.map((zone, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                      {zoneIcons[idx]}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {zone.tag}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {zone.title}
                  </h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {zone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Access Info & CTA Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-emerald-950/70 via-zinc-900 to-zinc-900 border border-emerald-800/40 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>{dict.facilities.accessInfoTitle}</span>
            </div>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {dict.facilities.accessInfoText}
            </p>
          </div>
          <div className="shrink-0 w-full sm:w-auto">
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span>{dict.facilities.ctaButton}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
