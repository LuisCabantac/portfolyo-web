import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../../../../convex/_generated/api";

interface IBookmarkPortfolioProps {
  portfolioId?: string | null;
}

const bookmarkMutations = {
  useBookmarkPortfolio: ({ portfolioId = null }: IBookmarkPortfolioProps) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: useConvexMutation(api.mutations.bookmarks.bookmarkPortfolio),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["portfolios"] });
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
        if (portfolioId) {
          queryClient.invalidateQueries({
            queryKey: [`portfolio-${portfolioId}`],
          });
        }
      },
    });
  },
};

export const { useBookmarkPortfolio } = bookmarkMutations;
