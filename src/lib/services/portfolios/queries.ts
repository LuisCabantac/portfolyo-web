import { useConvex } from "convex/react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface IGetPortfolioByPortfolioIdAndEmailProps {
  email: string;
  portfolioId: string;
}

interface IGetPortfolioByUserIdProps {
  userId: string;
}

interface IGetAllPortfoliosProps {
  email: string;
  selectedTitleId: string;
  search: string;
}

const portfolioQueries = {
  useGetPortfolioByPortfolioIdAndEmail: ({
    portfolioId,
    email,
  }: IGetPortfolioByPortfolioIdAndEmailProps) => {
    const convex = useConvex();

    const { data: portfolio, isLoading } = useQuery({
      queryFn: () =>
        convex.query(api.queries.portfolios.getPortfolioById, {
          portfolioId: portfolioId as Id<"portfolios">,
          email: email,
        }),
      queryKey: [`portfolio-${portfolioId}`],
    });

    return { portfolio, isLoading };
  },
  useGetPortfolioByUserId: ({ userId }: IGetPortfolioByUserIdProps) => {
    const convex = useConvex();

    const {
      data: portfolio,
      isLoading: portfolioIsLoading,
      refetch: refetchPortfolio,
    } = useQuery({
      queryFn: () =>
        convex.query(api.queries.portfolios.getPortfolioByUserId, {
          userId: userId as Id<"users">,
        }),
      queryKey: [`portfolio-${userId}`],
      enabled: !!userId,
    });

    return { portfolio, portfolioIsLoading, refetchPortfolio };
  },
  useGetAllPortfolios: ({
    email,
    selectedTitleId,
    search,
  }: IGetAllPortfoliosProps) => {
    const convex = useConvex();

    const {
      data: portfolioPages,
      isLoading,
      refetch: refreshPortfolios,
      isFetching,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    } = useInfiniteQuery({
      queryKey: ["portfolios", email, selectedTitleId, search],
      queryFn: ({ pageParam }) =>
        convex.query(api.queries.portfolios.getAllPortfolios, {
          email: email ?? null,
          sort: "latest",
          search,
          titleId:
            selectedTitleId === "all"
              ? null
              : (selectedTitleId as Id<"titles">),
          paginationOpts: { cursor: pageParam, numItems: 10 },
        }),
      getNextPageParam: (lastPage) =>
        lastPage.isDone ? undefined : lastPage.continueCursor,
      initialPageParam: null as string | null,
    });

    const portfolios = portfolioPages?.pages.flatMap((p) => p.page) ?? [];

    return {
      portfolioPages,
      portfolios,
      isLoading,
      isFetching,
      refreshPortfolios,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    };
  },
};

export const {
  useGetPortfolioByPortfolioIdAndEmail,
  useGetPortfolioByUserId,
  useGetAllPortfolios,
} = portfolioQueries;
