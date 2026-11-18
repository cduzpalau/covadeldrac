/* eslint-disable @next/next/no-img-element -- Static export (`output: "export"`) uses pre-generated responsive WebP srcSet */
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
          {/* Left Column: Visual Profile Card with World Archery Photo & Quote (5 cols, sticky on desktop) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 relative overflow-hidden shadow-xl shadow-black/40">
              {/* Top Action Portrait */}
              <div className="relative aspect-[800/534] bg-zinc-950 overflow-hidden">
                <img
                  src="/images/about-world-archery-800.webp"
                  width={800}
                  height={534}
                  loading="lazy"
                  decoding="async"
                  alt={dict.about.photos.profileAlt}
                  className="w-full h-full object-cover object-left"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-950/20 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
                <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-zinc-950/85 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
                  {dict.about.photos.profileBadge}
                </span>
                <div className="absolute bottom-3.5 left-5 right-5">
                  <h3 className="text-xl font-bold text-white text-balance drop-shadow">
                    {dict.common.founderName}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider mt-0.5 drop-shadow">
                    {dict.common.founderTitle}
                  </p>
                </div>
              </div>

              {/* Sporting Credentials */}
              <div className="p-6 sm:p-7 space-y-3 border-t border-zinc-800/80">
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

          {/* Right Column: First-Person Narrative ("Qui sóc?") + Editorial Diptych (7 cols) */}
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

            {/* 2-Photo International Journey Diptych */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
              <figure className="group rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-lg shadow-black/30 flex flex-col">
                <div className="aspect-[4/5] bg-zinc-950 overflow-hidden">
                  <img
                    src="/images/about-espana-target-899.webp"
                    srcSet="/images/about-espana-target-600.webp 600w, /images/about-espana-target-899.webp 899w"
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 26vw"
                    width={899}
                    height={1124}
                    loading="lazy"
                    decoding="async"
                    alt={dict.about.photos.espanaAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="px-4 py-3 text-xs text-zinc-300 font-medium border-t border-zinc-800/80 text-pretty">
                  {dict.about.photos.espanaCaption}
                </figcaption>
              </figure>

              <figure className="group rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-lg shadow-black/30 flex flex-col">
                <div className="aspect-[4/5] bg-zinc-950 overflow-hidden">
                  <img
                    src="/images/about-champions-976.webp"
                    srcSet="/images/about-champions-600.webp 600w, /images/about-champions-976.webp 976w"
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 26vw"
                    width={976}
                    height={1220}
                    loading="lazy"
                    decoding="async"
                    alt={dict.about.photos.peersAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="px-4 py-3 text-xs text-zinc-300 font-medium border-t border-zinc-800/80 text-pretty">
                  {dict.about.photos.peersCaption}
                </figcaption>
              </figure>
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
