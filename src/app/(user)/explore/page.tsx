"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { UserResource } from "@clerk/react/types";

import { Id } from "../../../../convex/_generated/dataModel";
import { useGetAllPortfolios } from "@/lib/services/portfolios/queries";
import { useBookmarkPortfolio } from "@/lib/services/bookmarks/mutations";
import { useGetProfileByEmailAddress } from "@/lib/services/users/queries";

import PortfolioCard from "@/components/portfolio-card";
import PortfolioCardSkeleton from "@/components/portfolio-card-skeleton";

const Explore = () => {
  const router = useRouter();
  const { user } = useUser();
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
    <main className="mx-auto p-4 md:max-w-6xl">
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
    </main>
  );
};

export default Explore;
