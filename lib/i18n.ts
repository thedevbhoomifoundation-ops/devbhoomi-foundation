import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "../locales/en/common.json";
import hiCommon from "../locales/hi/common.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon },
      hi: { common: hiCommon },
    },
    lng: "en", // Default language to prevent hydration mismatch
    fallbackLng: "en",
    defaultNS: "common",
    ns: ["common"],
    interpolation: {
      escapeValue: false, // react already escapes values
    },
  });

export default i18n;
