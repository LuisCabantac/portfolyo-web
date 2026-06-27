import Link from "next/link";
import { getT } from "next-i18next/server";

import { Button } from "@/components/ui/button";

const NotFound = async () => {
  const { t } = await getT("notFound");

  return (
    <main className="page-wrap flex min-h-[90dvh] flex-col items-center justify-center px-4">
      <section className="island-shell mb-8 flex flex-col items-center gap-2 rounded-2xl py-6 sm:p-8 md:px-6">
        <h1 className="display-title mb-3 text-4xl font-bold text-foreground sm:text-5xl">
          {t("header")}
        </h1>
        <Button asChild>
          <Link href="/">{t("action")}</Link>
        </Button>
      </section>
    </main>
  );
};

export default NotFound;
