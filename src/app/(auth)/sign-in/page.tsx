"use client";

import Link from "next/link";
import { useSignIn } from "@clerk/nextjs";
import { useT } from "next-i18next/client";
import { useRouter } from "next/navigation";

import { GitHub, Google } from "@/lib/icons";

import { Button } from "@/components/ui/button";

const SignIn = () => {
  const { t } = useT("signIn");
  const router = useRouter();
  const { signIn, fetchStatus } = useSignIn();

  const handleLogin = async (
    strategy: "oauth_google" | "oauth_github" | "guest",
  ) => {
    if (fetchStatus === "fetching") return;

    try {
      if (strategy === "guest") {
        return router.replace("/");
      }

      const { error } = await signIn.sso({
        strategy,
        redirectCallbackUrl: "/sso-callback",
        redirectUrl: "/",
      });
      if (error) {
        throw new Error(error.toString());
      }
    } catch {
      router.push("/sign-in");
    }
  };

  return (
    <section className="page-wrap flex min-h-[90dvh] flex-col items-center justify-center gap-10 px-4 md:max-w-3/12 md:px-0">
      <div className="grid gap-4">
        <h1 className="font-heading text-4xl font-medium">{t("header")}</h1>
        <p>
          {t("description")}{" "}
          <Link href="/privacy" className="font-medium text-muted-foreground">
            {t("link")}
          </Link>
        </p>
      </div>
      <div className="grid w-full gap-4">
        <Button
          onClick={() => handleLogin("oauth_google")}
          size="lg"
          className="gap-2"
        >
          <div
            className="inline-block h-4 w-4 bg-primary-foreground"
            style={{
              maskImage: `url(${Google.src})`,
              WebkitMaskImage: `url(${Google.src})`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
          {t("buttons.google")}
        </Button>
        <Button
          variant="outline"
          onClick={() => handleLogin("oauth_github")}
          size="lg"
        >
          <div
            className="inline-block h-4 w-4 bg-foreground"
            style={{
              maskImage: `url(${GitHub.src})`,
              WebkitMaskImage: `url(${GitHub.src})`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
          {t("buttons.github")}
        </Button>
        <Button variant="ghost" size="lg" onClick={() => handleLogin("guest")}>
          {t("buttons.guest")}
        </Button>
      </div>
    </section>
  );
};

export default SignIn;
