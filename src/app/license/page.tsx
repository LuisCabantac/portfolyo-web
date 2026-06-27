import type { Metadata } from "next";
import { getT } from "next-i18next/server";

export const metadata: Metadata = {
  title: "License",
  description:
    "Portfolyo is licensed under the MIT License. Read the full text of the license here.",
};

const effectiveDate = "April 5, 2026";

const License = async () => {
  const { t } = await getT("license");
  return (
    <main className="page-wrap flex min-h-[90dvh] flex-col items-start justify-center px-4">
      <section className="island-shell mb-8 rounded-2xl py-6 sm:p-8 md:px-6">
        <p className="island-kicker mb-2">
          {t("effective", { date: effectiveDate })}
        </p>
        <h1 className="display-title mb-3 text-4xl font-bold text-foreground sm:text-5xl">
          {t("header")}
        </h1>
        <p className="m-0 text-base leading-8 text-muted-foreground">
          {t("subtext")}
        </p>
      </section>

      <section className="island-shell rounded-2xl py-6 sm:p-8 md:px-6">
        <div className="grid max-w-none gap-4 text-muted-foreground">
          <p>{t("body.p1")}</p>
          <p>{t("body.p2")}</p>
          <p className="font-bold uppercase">{t("body.p3")}</p>
        </div>
      </section>
    </main>
  );
};

export default License;
