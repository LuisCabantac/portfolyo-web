import { useConvex } from "convex/react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { api } from "../../../../convex/_generated/api";

interface IGetBookmarkedPortfoliosProps {
  email: string;
  search: string;
}

const bookmarkQueries = {
  useGetBookmarkedPortfolios: ({
    email,
    search,
  }: IGetBookmarkedPortfoliosProps) => {
    const convex = useConvex();

    const {
      data: bookmarkPages,
      isLoading,
      isFetching,
      refetch: refetchBookmarks,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    } = useInfiniteQuery({
      queryKey: ["bookmarks", email, search],
      queryFn: ({ pageParam }) =>
        convex.query(api.queries.bookmarks.getBookmarkedPortfolios, {
          email: email ?? null,
          search,
          paginationOpts: { cursor: pageParam, numItems: 10 },
        }),
      getNextPageParam: (lastPage) =>
        lastPage.isDone ? undefined : lastPage.continueCursor,
      initialPageParam: null as string | null,
    });

    const portfolios = bookmarkPages?.pages.flatMap((p) => p.page) ?? [];

    return {
      bookmarkPages,
      portfolios,
      isLoading,
      refetchBookmarks,
      fetchNextPage,
      isFetching,
      hasNextPage,
      isFetchingNextPage,
    };
  },
};

export const { useGetBookmarkedPortfolios } = bookmarkQueries;
