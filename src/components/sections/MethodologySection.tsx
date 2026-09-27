'use client';

import React from 'react';
import { Dictionary } from '@/lib/i18n';
import { Repeat, Eye, Shield, Compass, Activity, Clock, Brain, Wrench, Sparkles } from 'lucide-react';

interface MethodologySectionProps {
  dict: Dictionary;
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({ dict }) => {
  const pillarIcons: Record<string, React.ReactNode> = {
    consistency: <Repeat className="w-6 h-6 text-amber-400" />,
    focus: <Eye className="w-6 h-6 text-emerald-400" />,
    respect: <Shield className="w-6 h-6 text-amber-400" />,
    selfAwareness: <Compass className="w-6 h-6 text-emerald-400" />,
  };

  const blockIcons = [
    <Activity key="0" className="w-5 h-5 text-amber-400" />,
    <Clock key="1" className="w-5 h-5 text-emerald-400" />,
    <Brain key="2" className="w-5 h-5 text-amber-400" />,
    <Wrench key="3" className="w-5 h-5 text-emerald-400" />,
  ];

  return (
    <section id="methodology" className="py-24 bg-zinc-950 border-b border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{dict.methodology.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {dict.methodology.title}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            {dict.methodology.subtitle}
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-800">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {dict.methodology.pillarsTitle}
            </h3>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              Fonaments
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dict.methodology.pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="group p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-900 transition-all duration-300 flex flex-col justify-between shadow-lg shadow-black/30"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-inner">
                    {pillarIcons[pillar.id] || <Sparkles className="w-6 h-6 text-amber-400" />}
                  </div>
                  <h4 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mt-0.5 mb-3">
                    {pillar.subtitle}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Structured Progression Blocks */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-800">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {dict.methodology.blocksTitle}
            </h3>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              Progrés Estructurat
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dict.methodology.blocks.map((block, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-zinc-700 tracking-tight">
                    {block.step}
                  </span>
                  <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                    {blockIcons[idx] || <Activity className="w-5 h-5 text-amber-400" />}
                  </div>
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {block.title}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {block.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
