import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConvexAction, useConvexMutation } from "@convex-dev/react-query";

import { api } from "../../../../convex/_generated/api";

interface IDeletePortfolioProps {
  userId?: string | null;
}

interface IAddShowPortfolioProps {
  email?: string | null;
  userId?: string | null;
  portfolioId?: string | null;
}

const portfolioMutations = {
  useCreatePortfolio: ({
    portfolioId,
    userId,
    email,
  }: IAddShowPortfolioProps) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: useConvexMutation(api.mutations.portfolios.createPortfolio),
      onSuccess: () => {
        if (portfolioId) {
          queryClient.invalidateQueries({
            queryKey: [`portfolio-${portfolioId}`],
          });
        }
        if (userId) {
          queryClient.invalidateQueries({
            queryKey: [`portfolio-${userId}`],
          });
        }
        if (email) {
          queryClient.invalidateQueries({
            queryKey: [`profile-${email}`],
          });
        }
        queryClient.invalidateQueries({ queryKey: ["portfolios"] });
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      },
    });
  },
  useDeletePortfolio: ({ userId }: IDeletePortfolioProps) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: useConvexMutation(api.mutations.portfolios.deletePortfolio),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [`portfolio-${userId}`],
        });
      },
    });
  },
  useShowPortfolio: ({ portfolioId, email }: IAddShowPortfolioProps) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: useConvexMutation(
        api.mutations.portfolios.toggleShowPortfolio,
      ),
      onSuccess: () => {
        if (portfolioId) {
          queryClient.invalidateQueries({
            queryKey: [`portfolio-${portfolioId}`],
          });
        }
        if (email) {
          queryClient.invalidateQueries({
            queryKey: [`profile-${email}`],
          });
        }
        queryClient.invalidateQueries({ queryKey: ["portfolios"] });
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      },
    });
  },
  useUpdatePortfolioScreenshot: ({
    portfolioId,
    email,
  }: IAddShowPortfolioProps) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: useConvexAction(
        api.actions.portfolios.updatePortfolioScreenshotAction,
      ),
      onSuccess: () => {
        if (portfolioId) {
          queryClient.invalidateQueries({
            queryKey: [`portfolio-${portfolioId}`],
          });
        }
        if (email) {
          queryClient.invalidateQueries({
            queryKey: [`profile-${email}`],
          });
        }
        queryClient.invalidateQueries({ queryKey: ["portfolios"] });
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      },
    });
  },
  useSavePortfolioScreenshot: ({ email }: IAddShowPortfolioProps) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: useConvexMutation(
        api.mutations.portfolios.savePortfolioScreenshot,
      ),
      onSuccess: () => {
        if (email) {
          queryClient.invalidateQueries({
            queryKey: [`profile-${email}`],
          });
        }
        queryClient.invalidateQueries({
          queryKey: ["portfolios"],
        });
        queryClient.invalidateQueries({
          queryKey: ["bookmarks"],
        });
      },
    });
  },
  useDeleteExistingPortfolioScreenshot: () => {
    return useMutation({
      mutationFn: useConvexMutation(
        api.mutations.portfolios.deletePortfolioScreenshot,
      ),
    });
  },
  useUploadUrl: () => {
    return useMutation({
      mutationFn: useConvexMutation(api.mutations.users.generateUploadUrl),
    });
  },
};

export const {
  useCreatePortfolio,
  useDeletePortfolio,
  useShowPortfolio,
  useUpdatePortfolioScreenshot,
  useSavePortfolioScreenshot,
  useUploadUrl,
  useDeleteExistingPortfolioScreenshot,
} = portfolioMutations;
