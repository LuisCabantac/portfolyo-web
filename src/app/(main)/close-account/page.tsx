import type { Metadata } from "next";
import { getT } from "next-i18next/server";

export const metadata: Metadata = {
  title: "Close Account",
  description:
    "Learn what happens when you close your Portfolyo account, including data removal and profile visibility. Understand the permanent nature of this action before proceeding.",
};

const CloseAccount = async () => {
  const { t } = await getT("closeAccount");
  const items = t("next_steps.items", { returnObjects: true }) as Array<{
    label: string;
    content: string;
  }>;

  return (
    <main className="page-wrap flex min-h-[90dvh] flex-col items-start justify-center px-4">
      <section className="mb-8 rounded-2xl py-6 sm:p-8 md:px-6">
        <p className="mb-2">{t("subtitle")}</p>
        <h1 className="mb-3 text-4xl font-bold text-foreground sm:text-5xl">
          {t("header")}
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-muted-foreground">
          {t("subtext")}
        </p>
      </section>

      <section className="rounded-2xl py-6 sm:p-8 md:px-6">
        <h2 className="mb-4 text-2xl font-bold text-foreground">
          {t("next_steps.heading")}
        </h2>
        <ul className="flex flex-col gap-4 text-base leading-7 text-muted-foreground">
          {items.map((item, i) => (
            <li key={i}>
              <strong className="text-foreground">{item.label}:</strong>{" "}
              {item.content}
            </li>
          ))}
        </ul>
        <div className="mt-10 border-t border-border pt-8">
          <p className="mb-6 text-sm text-muted-foreground">{t("footer")}</p>
        </div>
      </section>
    </main>
  );
};

export default CloseAccount;
