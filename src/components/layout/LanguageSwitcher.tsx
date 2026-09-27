'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { locales, Locale, localeNames } from '@/lib/i18n';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLocale }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    // Get current hash from window if in browser
    const currentHash = typeof window !== 'undefined' ? window.location.hash : '';

    // Replace the current locale prefix in the pathname
    let newPath = pathname;
    for (const loc of locales) {
      if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) {
        newPath = pathname.replace(`/${loc}`, `/${newLocale}`);
        break;
      }
    }

    if (!newPath.startsWith(`/${newLocale}`)) {
      newPath = `/${newLocale}${newPath === '/' ? '' : newPath}`;
    }

    const targetUrl = `${newPath}${currentHash}`;

    // Preserve scroll position while changing language
    router.push(targetUrl, { scroll: false });
  };

  return (
    <div 
      className="inline-flex items-center gap-1.5 p-1 rounded-full bg-zinc-900/90 border border-zinc-800/80 shadow-inner"
      role="group"
      aria-label="Language selector"
    >
      <span className="sr-only">Change language</span>
      <div className="pl-1.5 pr-0.5 text-zinc-400">
        <Globe className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
      </div>
      <div className="flex items-center gap-1">
        {locales.map((loc) => {
          const isActive = loc === currentLocale;
          return (
            <button
              key={loc}
              type="button"
              onClick={() => handleLanguageChange(loc)}
              aria-pressed={isActive}
              aria-label={`Switch to ${localeNames[loc]}`}
              className={`px-2.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                isActive
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-sm shadow-amber-500/20'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
              }`}
            >
              {loc}
            </button>
          );
        })}
      </div>
    </div>
  );
};
