"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useT } from "next-i18next/client";
import { usePathname } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";

import { Clear, Logo, Logout } from "@/lib/icons";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HeaderLinks = ({ title, href }: { title: string; href: string }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`text-muted-foreground transition-colors hover:text-foreground ${pathname === href ? "text-primary underline" : ""}`}
    >
      {title}
    </Link>
  );
};

const Header = ({
  showLinks = false,
  showCTA = false,
}: {
  showLinks?: boolean;
  showCTA?: boolean;
}) => {
  const { t } = useT("common");
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useAuth();
  const [isVisible, setIsVisible] = useState(true);

  const headerLinks: Array<{ title: string; href: string }> = [
    { title: t("nav.home"), href: "/" },
    { title: t("nav.privacy"), href: "/privacy" },
    { title: t("nav.terms"), href: "/terms" },
  ];

  const handleLogout = async () => {
    await signOut({
      redirectUrl: "/explore",
    });
  };

  return (
    <header className="sticky top-0 z-50">
      {isVisible && pathname === "/" && (
        <div className="block bg-sidebar-accent md:hidden">
          <nav className="page-wrap flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-3 sm:py-4">
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setIsVisible(false)}>
                <Image
                  src={Clear}
                  className="size-6 invert select-none dark:invert-0"
                  alt="logo"
                  draggable={false}
                  priority={true}
                />
              </button>
              <Link href="/" className="flex items-center">
                <Image
                  src={Logo}
                  className="h-10 w-10 select-none"
                  alt="logo"
                  draggable={false}
                  priority={true}
                />
                <h2 className="m-0 shrink-0 font-heading text-xl font-medium tracking-tight text-sidebar-accent-foreground">
                  {t("app_name")}
                </h2>
              </Link>
            </div>
            <Button asChild variant="invert">
              <a
                href="https://play.google.com/store/apps/details?id=com.luiscabantac.portfolyo"
                target="_blank"
                rel="noopener"
              >
                {t("cta.get")}
              </a>
            </Button>
          </nav>
        </div>
      )}
      <div className="backdrop-blur-lg">
        <nav className="page-wrap flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-3 sm:py-4">
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

          {showLinks && (
            <div className="hidden w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 font-heading text-base font-medium sm:w-auto sm:flex-nowrap sm:pb-0 md:flex">
              {headerLinks.map((link) => (
                <HeaderLinks
                  key={link.href}
                  title={link.title}
                  href={link.href}
                />
              ))}
            </div>
          )}

          {showCTA && (
            <Button asChild className="hidden md:flex">
              <a
                href="https://play.google.com/store/apps/details?id=com.luiscabantac.portfolyo"
                target="_blank"
                rel="noopener"
              >
                {t("cta.download")}
              </a>
            </Button>
          )}

          {!showCTA && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user?.imageUrl ?? ""}
                      alt={`${user?.fullName ?? ""}'s profile image`}
                    />
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleLogout}>
                  <div
                    className="inline-block h-4 w-4 bg-current"
                    style={{
                      maskImage: `url(${Logout.src})`,
                      WebkitMaskImage: `url(${Logout.src})`,
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                    }}
                  />
                  <span>{t("log_out")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
