import type { Metadata } from "next";
import { getT } from "next-i18next/server";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the terms and conditions for using Portfolyo. Understand user responsibilities, content ownership, and our service guidelines for the developer community.",
};

const lastUpdated = "May 12, 2026";

const Terms = async () => {
  const { t } = await getT("terms");
  const termsAndConditions = t("terms_and_conditions", {
    returnObjects: true,
  }) as Array<{
    title: string;
    description: string;
    items: Array<{ label: string; content: string }>;
  }>;

  return (
    <main className="page-wrap flex min-h-[90dvh] flex-col items-start justify-center px-4">
      <section className="island-shell mb-8 rounded-2xl py-6 sm:p-8 md:px-6">
        <p className="island-kicker mb-2">
          {t("last_updated", { date: lastUpdated })}
        </p>
        <h1 className="display-title mb-3 text-4xl font-bold text-foreground sm:text-5xl">
          {t("header")}
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-muted-foreground">
          {t("subtext")}
        </p>
      </section>

      <div className="flex flex-col gap-6">
        {termsAndConditions.map((tac) => (
          <section
            key={tac.description}
            className="island-shell rounded-2xl py-6 sm:p-8 md:px-6"
          >
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              {tac.title}
            </h2>
            <p className="mb-6 text-base text-muted-foreground">
              {tac.description}
            </p>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {tac.items.map((item) => (
                <li key={item.label} className="flex flex-col gap-1">
                  <span className="font-semibold text-foreground">
                    {item.label}
                  </span>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {item.content}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
};

export default Terms;
