import Link from "next/link";
import Image from "next/image";
import { getT } from "next-i18next/server";

import { GooglePlayBadge, HeroImage } from "@/lib/icons";

import { Button } from "@/components/ui/button";

const Home = async () => {
  const { t } = await getT("home");

  return (
    <main className="page-wrap flex min-h-[90dvh] items-center justify-center px-4">
      <section className="relative overflow-hidden rounded-[2rem] py-10 md:px-6 md:py-28">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:gap-0">
          <div>
            <h1 className="mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-foreground sm:text-6xl">
              {t("hero.header")}
            </h1>
            <p className="mb-8 max-w-2xl font-heading text-base text-muted-foreground sm:text-lg">
              {t("hero.subtext")}
            </p>

            <div className="flex gap-4">
              <Button asChild>
                <Link href="/explore">{t("hero.action")}</Link>
              </Button>
              <a
                href="https://play.google.com/store/apps/details?id=com.luiscabantac.portfolyo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={GooglePlayBadge}
                  className="h-10 w-auto select-none"
                  alt="google play store badge"
                  draggable={false}
                  loading="eager"
                />
              </a>
            </div>
          </div>
          <Image
            src={HeroImage}
            alt="hero"
            className="h-128 w-auto select-none md:h-96"
            draggable={false}
            loading="eager"
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
