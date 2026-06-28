import "./globals.css";
import type { Metadata } from "next";
import { I18nProvider } from "next-i18next/client";
import { getResources, getT, initServerI18next } from "next-i18next/server";

import i18nConfig from "../../i18n.config";
import Providers from "@/providers";

initServerI18next(i18nConfig);

export const metadata: Metadata = {
  title: {
    template: "%s | Portfolyo",
    default: "Portfolyo - Developer Portfolios",
  },
  description:
    "Discover developer portfolios and portfolio inspiration from developers worldwide. Save and explore ideas for your own portfolio.",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { i18n, lng } = await getT();
  const resources = getResources(i18n);

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="wrap-anywhere antialiased">
        <Providers>
          <I18nProvider language={lng} resources={resources}>
            {children}
          </I18nProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
