"use client";

import dynamic from "next/dynamic";
import { useUser } from "@clerk/nextjs";
import { useState, useRef } from "react";
import { useT } from "next-i18next/client";
import { useRouter } from "next/navigation";
import { UserResource } from "@clerk/react/types";

import { ChatAI, Portfolio } from "@/lib/icons";
import { Id } from "../../../../convex/_generated/dataModel";
import { useGetAllPortfolios } from "@/lib/services/portfolios/queries";
import { useBookmarkPortfolio } from "@/lib/services/bookmarks/mutations";
import { useGetProfileByEmailAddress } from "@/lib/services/users/queries";

import { Button } from "@/components/ui/button";
import PortfolioCard from "@/components/portfolio-card";
import PortfolioCardSkeleton from "@/components/portfolio-card-skeleton";

const ProfessionalTitlesFilter = dynamic(
  () => import("@/components/professional-titles-filter"),
  { ssr: false },
);

const Explore = () => {
  const router = useRouter();
  const { user } = useUser();
  const { t } = useT("common");
  const [selectedTitleId, setSelectedTitleId] = useState<string | "all">("all");

  const {
    portfolios,
    hasNextPage,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetAllPortfolios({
    email: user?.primaryEmailAddress?.emailAddress ?? "",
    selectedTitleId,
    search: "",
  });

  const { mutate: bookmarkPortfolio } = useBookmarkPortfolio({});

  const handleBookmarkPortfolio = async (
    portfolioId: Id<"portfolios">,
    userId: Id<"users"> | null,
  ) => {
    if (!userId) {
      return router.push("/sign-in");
    }

    bookmarkPortfolio({ portfolioId, userId });
  };

  const { profile } = useGetProfileByEmailAddress({
    email: user?.primaryEmailAddress?.emailAddress ?? "",
  });

  const observerRef = useRef<IntersectionObserver | null>(null);

  const sentinelRef = (node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (!node) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    observerRef.current.observe(node);
  };

  return (
    <main className="mx-auto p-4 md:max-w-5xl">
      <ProfessionalTitlesFilter
        selectedTitleId={selectedTitleId}
        onSelectTitle={setSelectedTitleId}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <PortfolioCardSkeleton key={i} />
            ))
          : portfolios.map((portfolio) => (
              <PortfolioCard
                key={portfolio._id}
                portfolio={portfolio}
                user={user as UserResource | null | undefined}
                onBookmarkPortfolio={async () => {
                  await handleBookmarkPortfolio(
                    portfolio._id,
                    profile?._id ?? null,
                  );
                }}
              />
            ))}
        <div ref={sentinelRef} />
        {isFetchingNextPage && (
          <div className="col-span-full grid grid-cols-1 gap-4 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <PortfolioCardSkeleton key={`next-${i}`} />
            ))}
          </div>
        )}
      </div>
      {!isLoading && portfolios.length === 0 && (
        <div className="flex flex-col items-center gap-4 pt-[25vh]">
          <div
            className="h-[39px] w-[38px] bg-primary"
            style={{
              maskImage: `url(${Portfolio.src})`,
              WebkitMaskImage: `url(${Portfolio.src})`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
          <p className="w-3/5 text-center text-sm font-medium text-muted-foreground">
            {t("no_result")}
          </p>
        </div>
      )}
      <Button
        variant="secondary"
        size="icon-xl"
        className="fixed right-5 bottom-5 rounded-xl md:right-6 md:bottom-6"
        asChild
      >
        <a
          href="https://play.google.com/store/apps/details?id=com.luiscabantac.portfolyo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className="size-6 bg-current"
            style={{
              maskImage: `url(${ChatAI.src})`,
              WebkitMaskImage: `url(${ChatAI.src})`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        </a>
      </Button>
    </main>
  );
};

export default Explore;
