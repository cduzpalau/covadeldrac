'use client';

import React, { useState } from 'react';
import { Dictionary } from '@/lib/i18n';
import { Mail, Phone, MapPin, Clock, Send, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactSectionProps {
  dict: Dictionary;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ dict }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    discipline: 'recurve',
    level: 'intermediate',
    message: '',
    consent: false,
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || !formData.consent) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    // Simulate inquiry submission with realistic network delay
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        discipline: 'recurve',
        level: 'intermediate',
        message: '',
        consent: false,
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-600/40 text-emerald-400 text-xs font-semibold tracking-wider uppercase">
            <Mail className="w-3.5 h-3.5" />
            <span>{dict.contact.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {dict.contact.title}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            {dict.contact.subtitle}
          </p>
        </div>

        {/* Content Grid: Contact Details (5 cols) & Inquiry Form (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Facility Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 space-y-6 shadow-xl shadow-black/40">
              <h3 className="text-xl font-bold text-white border-b border-zinc-800 pb-4">
                {dict.contact.infoTitle}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      {dict.contact.addressTitle}
                    </h4>
                    <p className="text-sm text-zinc-200 mt-1 whitespace-pre-line leading-relaxed">
                      {dict.contact.addressText}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      {dict.contact.emailTitle}
                    </h4>
                    <a
                      href={`mailto:${dict.contact.emailText}`}
                      className="text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors mt-1 inline-block"
                    >
                      {dict.contact.emailText}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      {dict.contact.phoneTitle}
                    </h4>
                    <a
                      href={`tel:${dict.contact.phoneText.replace(/\s+/g, '')}`}
                      className="text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors mt-1 inline-block"
                    >
                      {dict.contact.phoneText}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      {dict.contact.hoursTitle}
                    </h4>
                    <p className="text-sm text-zinc-300 mt-1 whitespace-pre-line leading-relaxed">
                      {dict.contact.hoursText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 shadow-xl shadow-black/40">
              <h3 className="text-xl font-bold text-white mb-6">
                {dict.contact.form.title}
              </h3>

              {status === 'success' ? (
                <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-500/50 space-y-4 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <p className="text-sm sm:text-base text-zinc-100 font-medium">
                    {dict.contact.form.successMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="inline-flex items-center px-4 py-2 text-xs font-bold rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 transition-colors"
                  >
                    Enviar una altra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 flex items-center gap-3 text-red-200 text-xs sm:text-sm">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                      <span>{dict.contact.form.errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                        {dict.contact.form.nameLabel}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={dict.contact.form.namePlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                        {dict.contact.form.emailLabel}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={dict.contact.form.emailPlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                        {dict.contact.form.phoneLabel}
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={dict.contact.form.phonePlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-discipline" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                        {dict.contact.form.disciplineLabel}
                      </label>
                      <select
                        id="contact-discipline"
                        value={formData.discipline}
                        onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
                      >
                        <option value="recurve">{dict.contact.form.disciplines.recurve}</option>
                        <option value="compound">{dict.contact.form.disciplines.compound}</option>
                        <option value="barebow">{dict.contact.form.disciplines.barebow}</option>
                        <option value="traditional">{dict.contact.form.disciplines.traditional}</option>
                        <option value="initiation">{dict.contact.form.disciplines.initiation}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-level" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                      {dict.contact.form.levelLabel}
                    </label>
                    <select
                      id="contact-level"
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
                    >
                      <option value="beginner">{dict.contact.form.levels.beginner}</option>
                      <option value="intermediate">{dict.contact.form.levels.intermediate}</option>
                      <option value="advanced">{dict.contact.form.levels.advanced}</option>
                      <option value="equipment">{dict.contact.form.levels.equipment}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                      {dict.contact.form.messageLabel}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={dict.contact.form.messagePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors resize-y"
                    />
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input
                      id="contact-consent"
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-950 text-amber-500 focus:ring-amber-500 shrink-0"
                    />
                    <label htmlFor="contact-consent" className="text-xs text-zinc-400 leading-relaxed cursor-pointer">
                      {dict.contact.form.consentLabel}
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-950/60 border border-emerald-600/40 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    <Send className="w-4 h-4 text-emerald-300" />
                    <span>
                      {status === 'submitting'
                        ? dict.contact.form.submittingButton
                        : dict.contact.form.submitButton}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Detailed GDPR Legal Notice & Minors Disclaimer */}
        <div id="gdpr-notice" className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-zinc-300 font-bold text-base border-b border-zinc-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{dict.contact.gdpr.title}</span>
          </div>
          <div className="text-xs text-zinc-400 space-y-3 leading-relaxed">
            <p>{dict.contact.gdpr.legalTextP1}</p>
            <p className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/90 text-zinc-300 font-medium">
              {dict.contact.gdpr.legalTextP2}
            </p>
            <p>{dict.contact.gdpr.legalTextP3}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
