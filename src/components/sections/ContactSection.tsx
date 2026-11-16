'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Dictionary, Locale } from '@/lib/i18n';
import { MapPin, Clock, Send, ShieldCheck, CheckCircle2, AlertCircle, Globe, MessageSquare, ExternalLink } from 'lucide-react';

interface ContactSectionProps {
  dict: Dictionary;
  locale: Locale;
}

type FieldName = 'name' | 'email' | 'message' | 'consent';

export const ContactSection: React.FC<ContactSectionProps> = ({ dict, locale }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    discipline: 'recurve',
    level: 'intermediate',
    message: '',
    consent: false,
    company_website: '', // Visually-hidden anti-bot honeypot
  });

  const [invalidFields, setInvalidFields] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const mountedAtRef = useRef<number>(0);
  const errorSummaryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  const isFieldValid = (field: FieldName, state = formData): boolean => {
    switch (field) {
      case 'name':
        return state.name.trim().length >= 2;
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim());
      case 'message':
        return state.message.trim().length >= 5;
      case 'consent':
        return state.consent === true;
    }
  };

  // Validate on blur to avoid premature warnings while typing
  const handleBlur = (field: FieldName) => {
    if (!isFieldValid(field)) {
      setInvalidFields((prev) => ({ ...prev, [field]: true }));
    }
  };

  // Clear field/form errors immediately as the user corrects input
  const clearErrorOnInput = (field: FieldName) => {
    if (invalidFields[field]) {
      setInvalidFields((prev) => ({ ...prev, [field]: false }));
    }
    if (status === 'error') {
      setStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextInvalid: Partial<Record<FieldName, boolean>> = {
      name: !isFieldValid('name'),
      email: !isFieldValid('email'),
      message: !isFieldValid('message'),
      consent: !isFieldValid('consent'),
    };

    if (nextInvalid.name || nextInvalid.email || nextInvalid.message || nextInvalid.consent) {
      setInvalidFields(nextInvalid);
      setStatus('error');
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setStatus('submitting');

    try {
      const elapsedMs = mountedAtRef.current > 0 ? Date.now() - mountedAtRef.current : 5000;
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          discipline: formData.discipline,
          disciplineLabel:
            dict.contact.form.disciplines[
              formData.discipline as keyof typeof dict.contact.form.disciplines
            ] || formData.discipline,
          level: formData.level,
          levelLabel:
            dict.contact.form.levels[
              formData.level as keyof typeof dict.contact.form.levels
            ] || formData.level,
          message: formData.message.trim(),
          consent: formData.consent,
          locale,
          company_website: formData.company_website,
          elapsedMs,
        }),
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      setStatus('success');
      setInvalidFields({});
      mountedAtRef.current = Date.now();
      setFormData({
        name: '',
        email: '',
        phone: '',
        discipline: 'recurve',
        level: 'intermediate',
        message: '',
        consent: false,
        company_website: '',
      });
    } catch {
      setStatus('error');
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
    }
  };

  const inputBorderClass = (field?: FieldName) =>
    field && invalidFields[field]
      ? 'border-red-500/80 focus-visible:ring-red-500'
      : 'border-zinc-800 focus-visible:ring-amber-500';

  return (
    <section id="contact" className="py-24 bg-zinc-950/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-600/40 text-emerald-400 text-xs font-semibold tracking-wider uppercase">
            <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{dict.contact.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
            {dict.contact.title}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed text-pretty">
            {dict.contact.subtitle}
          </p>
        </div>

        {/* Content Grid: Location Details (5 cols) & Inquiry Form (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Facility Location & Appointment Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 space-y-6 shadow-xl shadow-black/40">
              <h3 className="text-xl font-bold text-white border-b border-zinc-800 pb-4 text-balance">
                {dict.contact.infoTitle}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400 shrink-0">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      {dict.contact.addressTitle}
                    </h4>
                    <p className="text-sm text-zinc-200 mt-1 whitespace-pre-line leading-relaxed">
                      {dict.contact.addressText}
                    </p>
                    <a
                      href={dict.contact.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-950/70 hover:bg-emerald-900/70 border border-emerald-700/50 text-xs font-semibold text-emerald-300 hover:text-amber-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    >
                      <span>{dict.contact.mapsLinkLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400 shrink-0">
                    <Globe className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      {dict.contact.websiteTitle}
                    </h4>
                    <a
                      href={`https://${dict.contact.websiteText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors mt-1 inline-block"
                    >
                      {dict.contact.websiteText}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400 shrink-0">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      {dict.contact.hoursTitle}
                    </h4>
                    <p className="text-sm text-zinc-300 mt-1 whitespace-pre-line leading-relaxed text-pretty">
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
              <h3 className="text-xl font-bold text-white mb-6 text-balance">
                {dict.contact.form.title}
              </h3>

              {status === 'success' ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-500/50 space-y-4 text-center"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" aria-hidden="true" />
                  <p className="text-sm sm:text-base text-zinc-100 font-medium text-pretty">
                    {dict.contact.form.successMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="inline-flex items-center px-4 py-2.5 min-h-11 text-xs font-bold rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    {dict.contact.form.sendAnother}
                  </button>
                </div>
              ) : (
                <form
                  action="/api/contact"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >
                  {status === 'error' && (
                    <div
                      ref={errorSummaryRef}
                      tabIndex={-1}
                      role="alert"
                      aria-live="assertive"
                      className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 flex items-center gap-3 text-red-200 text-xs sm:text-sm focus:outline-none"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0" aria-hidden="true" />
                      <span>{dict.contact.form.errorMessage}</span>
                    </div>
                  )}

                  {/* Visually-hidden anti-spam honeypot (clip-path recipe, never display:none) */}
                  <div
                    aria-hidden="true"
                    className="absolute overflow-hidden w-px h-px -m-px p-0 border-0 whitespace-nowrap [clip-path:inset(50%)]"
                  >
                    <label htmlFor="contact-company-website">Website</label>
                    <input
                      id="contact-company-website"
                      name="company_website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.company_website}
                      onChange={(e) => setFormData({ ...formData, company_website: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                        {dict.contact.form.nameLabel}
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        maxLength={120}
                        required
                        aria-invalid={Boolean(invalidFields.name)}
                        value={formData.name}
                        onBlur={() => handleBlur('name')}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          clearErrorOnInput('name');
                        }}
                        placeholder={dict.contact.form.namePlaceholder}
                        className={`w-full min-h-12 px-3.5 py-2.5 rounded-xl bg-zinc-950 border ${inputBorderClass('name')} text-white placeholder-zinc-500 text-base sm:text-sm focus-visible:outline-none focus-visible:ring-2 transition-colors`}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                        {dict.contact.form.emailLabel}
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        maxLength={254}
                        required
                        aria-invalid={Boolean(invalidFields.email)}
                        value={formData.email}
                        onBlur={() => handleBlur('email')}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          clearErrorOnInput('email');
                        }}
                        placeholder={dict.contact.form.emailPlaceholder}
                        className={`w-full min-h-12 px-3.5 py-2.5 rounded-xl bg-zinc-950 border ${inputBorderClass('email')} text-white placeholder-zinc-500 text-base sm:text-sm focus-visible:outline-none focus-visible:ring-2 transition-colors`}
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
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        maxLength={40}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={dict.contact.form.phonePlaceholder}
                        className="w-full min-h-12 px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-base sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-discipline" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                        {dict.contact.form.disciplineLabel}
                      </label>
                      <select
                        id="contact-discipline"
                        name="discipline"
                        value={formData.discipline}
                        onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                        className="w-full min-h-12 px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-base sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
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
                      name="level"
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="w-full min-h-12 px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-base sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
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
                      name="message"
                      rows={4}
                      maxLength={4000}
                      required
                      aria-invalid={Boolean(invalidFields.message)}
                      value={formData.message}
                      onBlur={() => handleBlur('message')}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        clearErrorOnInput('message');
                      }}
                      placeholder={dict.contact.form.messagePlaceholder}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border ${inputBorderClass('message')} text-white placeholder-zinc-500 text-base sm:text-sm focus-visible:outline-none focus-visible:ring-2 transition-colors resize-y`}
                    />
                  </div>

                  <div className="flex items-start gap-3 pt-1">
                    <input
                      id="contact-consent"
                      name="consent"
                      type="checkbox"
                      required
                      aria-invalid={Boolean(invalidFields.consent)}
                      checked={formData.consent}
                      onChange={(e) => {
                        setFormData({ ...formData, consent: e.target.checked });
                        clearErrorOnInput('consent');
                      }}
                      className="mt-1 h-5 w-5 rounded border-zinc-700 bg-zinc-950 accent-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 shrink-0 cursor-pointer"
                    />
                    <label htmlFor="contact-consent" className="text-xs text-zinc-400 leading-relaxed cursor-pointer text-pretty">
                      {dict.contact.form.consentLabel}
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full min-h-12 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-950/60 border border-emerald-600/40 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    <Send className="w-4 h-4 text-emerald-300" aria-hidden="true" />
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

        {/* GDPR Legal Notice */}
        <div id="gdpr-notice" className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-zinc-300 font-bold text-base border-b border-zinc-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
            <span>{dict.contact.gdpr.title}</span>
          </div>
          <div className="text-xs text-zinc-400 space-y-3 leading-relaxed text-pretty">
            <p>{dict.contact.gdpr.legalTextP1}</p>
            <p>{dict.contact.gdpr.legalTextP2}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
