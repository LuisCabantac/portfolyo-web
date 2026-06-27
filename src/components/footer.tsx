import Link from "next/link";
import Image from "next/image";
import { getT } from "next-i18next/server";

import { Logo } from "@/lib/icons";

const Footer = async () => {
  const { t } = await getT("common");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-muted px-4 pt-10 pb-14">
      <div className="page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <Link href="/" className="flex items-center" draggable={false}>
          <Image
            src={Logo}
            className="h-10 w-10 select-none"
            alt="logo"
            draggable={false}
          />
          <h2 className="m-0 shrink-0 font-heading text-xl font-medium tracking-tight text-foreground">
            {t("app_name")}
          </h2>
        </Link>
        <div className="flex flex-col gap-2 py-4 text-sm text-muted-foreground underline md:hidden">
          <Link
            href="/privacy"
            className="transition-colors hover:text-foreground"
          >
            {t("nav.privacy")}
          </Link>
          <Link
            href="/terms"
            className="transition-colors hover:text-foreground"
          >
            {t("nav.terms")}
          </Link>
        </div>
        <p className="m-0 text-sm text-muted-foreground">
          &copy; {year}{" "}
          <a
            href="https://luiscabantac.com"
            className="transition hover:underline"
            target="_blank"
            rel="noopener"
          >
            {t("footer.developer")}
          </a>
          .{" "}
          <Link
            href="/license"
            className="transition hover:underline"
            target="_blank"
          >
            {t("footer.rights")}
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
