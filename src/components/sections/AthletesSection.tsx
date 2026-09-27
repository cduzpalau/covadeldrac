'use client';

import React, { useState } from 'react';
import { Dictionary } from '@/lib/i18n';
import { Trophy, Medal, ShieldCheck } from 'lucide-react';

interface AthletesSectionProps {
  dict: Dictionary;
}

type DisciplineFilter = 'all' | 'recurve' | 'compound' | 'barebow';

export const AthletesSection: React.FC<AthletesSectionProps> = ({ dict }) => {
  const [selectedFilter, setSelectedFilter] = useState<DisciplineFilter>('all');

  const filterOptions: { id: DisciplineFilter; label: string }[] = [
    { id: 'all', label: dict.athletes.filters.all },
    { id: 'recurve', label: dict.athletes.filters.recurve },
    { id: 'compound', label: dict.athletes.filters.compound },
    { id: 'barebow', label: dict.athletes.filters.barebow },
  ];

  const filteredAthletes = dict.athletes.roster.filter((athlete) => {
    if (selectedFilter === 'all') return true;
    return athlete.discipline.toLowerCase() === selectedFilter.toLowerCase();
  });

  const getDisciplineBadgeClass = (discipline: string) => {
    switch (discipline.toLowerCase()) {
      case 'recurve':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
      case 'compound':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/40';
      case 'barebow':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <section id="athletes" className="py-24 bg-zinc-950 border-b border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase">
            <Trophy className="w-3.5 h-3.5" />
            <span>{dict.athletes.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {dict.athletes.title}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            {dict.athletes.subtitle}
          </p>
        </div>

        {/* Category Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12" role="tablist" aria-label="Filter athletes by archery discipline">
          {filterOptions.map((filter) => {
            const isActive = selectedFilter === filter.id;
            return (
              <button
                key={filter.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  isActive
                    ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                    : 'bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Athletes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredAthletes.map((athlete, index) => (
            <div
              key={index}
              className="rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 p-6 flex flex-col justify-between shadow-lg shadow-black/30 transition-all duration-200 group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {athlete.name}
                    </h3>
                    <p className="text-xs text-zinc-400 font-medium mt-0.5">
                      {athlete.category}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getDisciplineBadgeClass(athlete.discipline)}`}>
                    {athlete.disciplineLabel}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                    <Medal className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>{athlete.badge}</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                    {athlete.achievements}
                  </p>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {athlete.bio}
                </p>
              </div>

              {/* Personal Best Score Footer */}
              <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-medium">Rècord Personal:</span>
                <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                  {athlete.personalBest}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Athletes Table View (Desktop & Tablet alternative summary) */}
        <div className="hidden lg:block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 mb-8 shadow-xl">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-900 text-xs uppercase tracking-wider text-zinc-400 border-b border-zinc-800">
              <tr>
                <th scope="col" className="px-6 py-4">{dict.athletes.table.name}</th>
                <th scope="col" className="px-6 py-4">{dict.athletes.table.discipline}</th>
                <th scope="col" className="px-6 py-4">{dict.athletes.table.category}</th>
                <th scope="col" className="px-6 py-4">{dict.athletes.table.achievements}</th>
                <th scope="col" className="px-6 py-4 text-right">{dict.athletes.table.personalBest}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredAthletes.map((athlete, idx) => (
                <tr key={idx} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="px-6 py-4 font-semibold text-white whitespace-nowrap">
                    {athlete.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getDisciplineBadgeClass(athlete.discipline)}`}>
                      {athlete.disciplineLabel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-zinc-400 whitespace-nowrap">
                    {athlete.category}
                  </td>
                  <td className="px-6 py-4 text-xs text-zinc-300">
                    {athlete.achievements}
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-amber-400 whitespace-nowrap">
                    {athlete.personalBest}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* GDPR Brief Notice */}
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 text-xs text-zinc-500">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{dict.athletes.gdprNoticeBrief}</span>
        </div>
      </div>
    </section>
  );
};
