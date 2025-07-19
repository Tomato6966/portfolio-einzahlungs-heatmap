import React, { createContext, useContext, useState } from "react";

import { translations } from "../locales/translations";

import type { ReactNode } from "react";
import type { Locale } from "../locales/translations";

interface LocaleContextType {
  locale: Locale;
  setLocale: (newLocale: Locale) => void;
  t: (key: keyof typeof translations) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

interface LocaleProviderProps {
  children: ReactNode;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(() => {
    const savedLocale = localStorage.getItem('appLocale') as Locale;
    return savedLocale || 'de'; // Standard auf Deutsch
  });

  React.useEffect(() => {
    localStorage.setItem('appLocale', locale);
  }, [locale]);

  const t = (key: keyof typeof translations): string => String(translations[key] ? translations[key][locale] || key : key);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale muss innerhalb eines LocaleProviders verwendet werden');
  }
  return context;
};
