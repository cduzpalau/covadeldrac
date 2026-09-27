'use client';

import React from 'react';
import { Dictionary } from '@/lib/i18n';
import { Calendar, CheckCircle, Quote, ShieldCheck, UserCheck } from 'lucide-react';

interface AboutSectionProps {
  dict: Dictionary;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ dict }) => {
  return (
    <section id="about" className="py-24 bg-zinc-950/60 border-b border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-600/40 text-emerald-400 text-xs font-semibold tracking-wider uppercase">
            <UserCheck className="w-3.5 h-3.5" />
            <span>{dict.about.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {dict.about.title}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            {dict.about.subtitle}
          </p>
        </div>

        {/* Bio & Credentials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Visual Profile & Credentials (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Coach Card */}
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 relative overflow-hidden shadow-xl shadow-black/40">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-700/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-800 to-amber-600 p-0.5 shadow-lg">
                  <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
                    <span className="text-2xl font-black text-amber-400">SC</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{dict.about.title}</h3>
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    {dict.common.founderTitle}
                  </p>
                </div>
              </div>

              <div className="space-y-3 border-t border-zinc-800/80 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{dict.about.credentialsTitle}</span>
                </h4>
                <div className="space-y-2.5">
                  {dict.about.credentials.map((cred, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/70 hover:border-zinc-700 transition-colors flex items-start gap-3"
                    >
                      <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-zinc-200">
                          {cred.title}
                        </div>
                        <div className="text-xs text-zinc-500">{cred.issuer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Archery Philosophy Quote Card */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-zinc-900 border border-emerald-900/50 p-6 relative">
              <Quote className="w-8 h-8 text-amber-500/30 mb-2" />
              <blockquote className="text-sm sm:text-base italic text-zinc-200 leading-relaxed">
                &ldquo;{dict.about.quote}&rdquo;
              </blockquote>
              <div className="mt-3 text-xs font-bold text-amber-400 tracking-wide uppercase">
                — {dict.about.quoteAuthor}
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Timeline (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <p className="text-lg font-medium text-emerald-300/90 leading-relaxed border-l-2 border-emerald-500 pl-4">
                {dict.about.bioLead}
              </p>
              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                {dict.about.bioP1}
              </p>
              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                {dict.about.bioP2}
              </p>
            </div>

            {/* Timeline Component */}
            <div className="pt-4">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>{dict.about.timelineTitle}</span>
              </h3>

              <div className="relative pl-6 border-l-2 border-zinc-800 space-y-8">
                {dict.about.timeline.map((item, index) => (
                  <div key={index} className="relative group">
                    {/* Node Dot */}
                    <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-zinc-900 border-2 border-amber-500 group-hover:bg-amber-400 group-hover:scale-125 transition-all" />
                    
                    <div className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-1">
                      {item.year}
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
