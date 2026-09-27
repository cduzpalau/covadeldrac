import React from 'react';
import { locales, isValidLocale, defaultLocale, getDictionary, Locale } from '@/lib/i18n';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { MethodologySection } from '@/components/sections/MethodologySection';
import { FacilitiesSection } from '@/components/sections/FacilitiesSection';
import { AthletesSection } from '@/components/sections/AthletesSection';
import { ContactSection } from '@/components/sections/ContactSection';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        locale={locale}
        dict={{
          siteName: dict.common.siteName,
          founderName: dict.common.founderName,
          nav: dict.nav,
        }}
      />

      <main className="flex-1">
        <HeroSection dict={dict} />
        <AboutSection dict={dict} />
        <MethodologySection dict={dict} />
        <FacilitiesSection dict={dict} />
        <AthletesSection dict={dict} />
        <ContactSection dict={dict} />
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
          footer: dict.footer,
        }}
      />
    </div>
  );
}
