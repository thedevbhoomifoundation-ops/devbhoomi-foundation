"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (keyOrObj: string | { en: string; hi: string }) => string;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang === "en" || savedLang === "hi") {
      setLanguageState(savedLang);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (keyOrObj: string | { en: string; hi: string }): string => {
    // If we're not mounted yet, default to English to prevent hydration mismatch
    const currentLang = mounted ? language : "en";

    if (typeof keyOrObj === "string") {
      const translation = translations[keyOrObj];
      if (translation) {
        return translation[currentLang];
      }
      return keyOrObj;
    }

    return keyOrObj[currentLang] || keyOrObj.en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
