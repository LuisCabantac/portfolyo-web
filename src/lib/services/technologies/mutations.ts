import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../../../../convex/_generated/api";

interface IAddRemoveTechnologiesProps {
  email?: string | null;
  portfolioId?: string | null;
}

const technologiesMutations = {
  useAddTechnology: ({ email, portfolioId }: IAddRemoveTechnologiesProps) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: useConvexMutation(api.mutations.technologies.addTechnology),
      onSuccess: () => {
        if (portfolioId) {
          queryClient.invalidateQueries({
            queryKey: [`technologies-${portfolioId}`],
          });
        }

        if (email) {
          queryClient.invalidateQueries({
            queryKey: [`technologies-${email}`],
          });
        }
      },
    });
  },
  useRemoveTechnologies: ({
    email,
    portfolioId,
  }: IAddRemoveTechnologiesProps) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: useConvexMutation(
        api.mutations.technologies.removeTechnology,
      ),
      onSuccess: () => {
        if (portfolioId) {
          queryClient.invalidateQueries({
            queryKey: [`technologies-${portfolioId}`],
          });
        }

        if (email) {
          queryClient.invalidateQueries({
            queryKey: [`technologies-${email}`],
          });
        }
      },
    });
  },
};

export const { useAddTechnology, useRemoveTechnologies } =
  technologiesMutations;
