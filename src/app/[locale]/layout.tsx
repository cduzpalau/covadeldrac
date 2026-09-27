import React from 'react';
import type { Metadata } from 'next';
import { locales, isValidLocale, defaultLocale, getDictionary, Locale } from '@/lib/i18n';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);

  return {
    title: `${dict.common.siteName} — ${dict.common.siteTagline}`,
    description: dict.hero.description,
    keywords: [
      'tir amb arc',
      'tiro con arco',
      'archery coaching',
      'Sergi Cebrian Pujol',
      'La Cova del Drac',
      'Granollers',
      'Catalunya',
      'alt rendiment',
      'recorbat',
      'politges',
      'arc nu',
      'barebow',
      'compound',
      'recurve',
    ],
    authors: [{ name: 'Sergi Cebrian Pujol' }],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ca: '/ca',
        es: '/es',
        en: '/en',
      },
    },
    openGraph: {
      title: `${dict.common.siteName} | ${dict.common.founderName}`,
      description: dict.hero.description,
      locale: locale === 'ca' ? 'ca_ES' : locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <html lang={locale} className="scroll-smooth dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased min-h-screen flex flex-col selection:bg-emerald-800 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
