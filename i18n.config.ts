import type { I18nConfig } from "next-i18next/proxy";

const i18nConfig: I18nConfig = {
  supportedLngs: ["en", "de"],
  fallbackLng: "en",
  defaultNS: "common",
  ns: [
    "common",
    "home",
    "license",
    "privacy",
    "terms",
    "notFound",
    "closeAccount",
  ],
  resourceLoader: (language, namespace) => {
    const file = namespace.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    return import(`./src/i18n/locales/${language}/${file}.json`);
  },
};

export default i18nConfig;
