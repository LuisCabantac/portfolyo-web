import "i18next";

import common from "./src/i18n/locales/en/common.json";
import home from "./src/i18n/locales/en/home.json";
import license from "./src/i18n/locales/en/license.json";
import privacy from "./src/i18n/locales/en/privacy.json";
import terms from "./src/i18n/locales/en/terms.json";
import notFound from "./src/i18n/locales/en/not-found.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof common;
      home: typeof home;
      license: typeof license;
      privacy: typeof privacy;
      terms: typeof terms;
      notFound: typeof notFound;
    };
  }
}
