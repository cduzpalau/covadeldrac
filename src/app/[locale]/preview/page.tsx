import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { locales, isValidLocale, defaultLocale, getDictionary, Locale } from '@/lib/i18n';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FacilitiesSection } from '@/components/sections/FacilitiesSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { HeroSectionPreview } from '@/components/sections/preview/HeroSectionPreview';
import { AboutSectionPreview } from '@/components/sections/preview/AboutSectionPreview';
import { MethodologySectionPreview } from '@/components/sections/preview/MethodologySectionPreview';
import { previewPhotoCopy } from '@/components/sections/preview/previewCopy';

export const dynamicParams = false;

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface PreviewPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  const photoCopy = previewPhotoCopy[locale];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Isolated Test Preview Control Strip */}
      <aside
        aria-label={photoCopy.bannerBadge}
        className="bg-amber-500/15 border-b border-amber-500/40 text-amber-100 px-4 py-2.5 text-xs"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded bg-amber-500 text-zinc-950 font-extrabold uppercase tracking-wider text-[10px]">
              {photoCopy.bannerBadge}
            </span>
            <span className="text-zinc-200">{photoCopy.bannerText}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center rounded-lg bg-zinc-950/80 border border-zinc-800 p-0.5">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}/preview`}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold uppercase transition-colors ${
                    loc === locale
                      ? 'bg-emerald-800 text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {loc}
                </Link>
              ))}
            </div>
            <Link
              href={`/${locale}`}
              className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-semibold transition-colors"
            >
              {photoCopy.compareLiveLabel} →
            </Link>
          </div>
        </div>
      </aside>

      <Navbar
        locale={locale}
        dict={{
          siteName: dict.common.siteName,
          founderName: dict.common.founderName,
          nav: dict.nav,
        }}
      />

      <main className="flex-1">
        <HeroSectionPreview dict={dict} photoCopy={photoCopy.hero} />
        <AboutSectionPreview dict={dict} photoCopy={photoCopy.about} />
        <MethodologySectionPreview dict={dict} photoCopy={photoCopy.methodology} />
        <FacilitiesSection dict={dict} />
        <ContactSection dict={dict} locale={locale} />
      </main>

      <Footer
        locale={locale}
        dict={{
          siteName: dict.common.siteName,
          siteTagline: dict.common.siteTagline,
          founderName: dict.common.founderName,
          founderTitle: dict.common.founderTitle,
          backToTop: dict.common.backToTop,
          nav: dict.nav,
          contact: {
            mapsUrl: dict.contact.mapsUrl,
            mapsLinkLabel: dict.contact.mapsLinkLabel,
            websiteText: dict.contact.websiteText,
            hoursShort: dict.contact.hoursShort,
          },
          footer: dict.footer,
        }}
      />
    </div>
  );
}
