'use client';

import React from 'react';
import { Dictionary } from '@/lib/i18n';
import { Calendar, CheckCircle, Quote, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';

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
            <UserCheck className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{dict.about.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
            {dict.about.title}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed text-pretty">
            {dict.about.subtitle}
          </p>
        </div>

        {/* Bio & Sporting Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Visual Profile & Quote (5 cols, sticky on desktop) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            {/* Visual Profile Card */}
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 relative overflow-hidden shadow-xl shadow-black/40">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-700/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-800 to-amber-600 p-0.5 shadow-lg shrink-0"
                  aria-hidden="true"
                >
                  <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
                    <span className="text-2xl font-black text-amber-400">SC</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white text-balance">{dict.about.title}</h3>
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mt-0.5">
                    {dict.common.founderTitle}
                  </p>
                </div>
              </div>

              <div className="space-y-3 border-t border-zinc-800/80 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  <span>{dict.about.credentialsTitle}</span>
                </h4>
                <ul className="space-y-2.5">
                  {dict.about.credentials.map((cred, idx) => (
                    <li
                      key={idx}
                      className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/70 hover:border-zinc-700 transition-colors flex items-start gap-3"
                    >
                      <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" aria-hidden="true" />
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-zinc-200">
                          {cred.title}
                        </div>
                        <div className="text-xs text-zinc-400 mt-0.5">{cred.issuer}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Archery Philosophy Quote Card */}
            <figure className="rounded-2xl bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-zinc-900 border border-emerald-900/50 p-6 relative">
              <Quote className="w-8 h-8 text-amber-500/30 mb-2" aria-hidden="true" />
              <blockquote className="text-sm sm:text-base italic text-zinc-200 leading-relaxed text-pretty">
                &ldquo;{dict.about.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-xs font-bold text-amber-400 tracking-wide uppercase">
                — {dict.about.quoteAuthor}
              </figcaption>
            </figure>
          </div>

          {/* Right Column: First-Person Narrative ("Qui sóc?") (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg sm:text-xl font-medium text-emerald-300/95 leading-relaxed border-l-2 border-emerald-500 pl-4 text-pretty">
              {dict.about.bioLead}
            </p>

            <div className="space-y-5">
              {dict.about.bioParagraphsBeforeCallout.map((paragraph, idx) => (
                <p key={idx} className="text-zinc-300 leading-relaxed text-sm sm:text-base text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Core Epiphany Callout ("El cap, el cor i les emocions") */}
            <div className="space-y-3 pt-1 pb-1">
              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base font-medium text-pretty">
                {dict.about.epiphanyIntro}
              </p>
              <figure className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-950/40 to-zinc-900/90 border border-amber-500/30 p-6 shadow-lg shadow-black/30">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-400 mt-1 shrink-0" aria-hidden="true" />
                  <blockquote className="text-base sm:text-lg font-semibold text-zinc-100 leading-relaxed text-pretty">
                    &ldquo;{dict.about.epiphanyCallout}&rdquo;
                  </blockquote>
                </div>
              </figure>
            </div>

            <div className="space-y-5">
              {dict.about.bioParagraphsAfterCallout.map((paragraph, idx) => (
                <p key={idx} className="text-zinc-300 leading-relaxed text-sm sm:text-base text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Personal Sign-Off */}
            <div className="pt-4 border-t border-zinc-800/80 flex items-center gap-3">
              <span className="h-px w-8 bg-amber-500" aria-hidden="true" />
              <span className="text-sm font-bold tracking-wide text-amber-400">
                {dict.about.bioSignature}
              </span>
            </div>
          </div>
        </div>

        {/* Full-Width 5-Stage Career Journey Timeline */}
        <div className="pt-12 border-t border-zinc-800/80">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-8 flex items-center gap-2.5 text-balance">
            <Calendar className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>{dict.about.timelineTitle}</span>
          </h3>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {dict.about.timeline.map((item, index) => (
              <li
                key={index}
                className="group relative rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 p-5 flex flex-col justify-between transition-all duration-200 shadow-lg shadow-black/20"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {item.year}
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-600 group-hover:text-emerald-400 transition-colors">
                      0{index + 1}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-2 text-balance">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed text-pretty">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
