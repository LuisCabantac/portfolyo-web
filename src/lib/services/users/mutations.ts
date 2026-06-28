import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";

import { api } from "../../../../convex/_generated/api";

interface IUpdateUserSocialsUrlProps {
  email: string | null;
  portfolioId: string | null;
}

interface IUpdateUserProps {
  email?: string | null;
}

const userMutations = {
  useCreateUser: () => {
    return useMutation({
      mutationFn: useConvexMutation(api.mutations.users.createUser),
    });
  },
  useUpdateUserSocialsUrl: ({
    email,
    portfolioId,
  }: IUpdateUserSocialsUrlProps) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: useConvexMutation(api.mutations.users.updateSocialUrl),
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
      },
    });
  },
  useUpdateUserTitle: ({ email }: IUpdateUserProps) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: useConvexMutation(api.mutations.users.updateUserTitle),
      onSuccess: async () => {
        if (email) {
          queryClient.invalidateQueries({
            queryKey: [`profile-${email}`],
          });

          queryClient.invalidateQueries({
            queryKey: ["portfolios"],
          });

          queryClient.invalidateQueries({
            queryKey: ["bookmarks"],
          });

          queryClient.refetchQueries({
            queryKey: [`profile-${email}`],
          });
        }
      },
    });
  },
  useSaveProfilePicture: ({ email }: IUpdateUserProps) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: useConvexMutation(api.mutations.users.saveProfilePicture),
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
};

export const {
  useCreateUser,
  useUpdateUserSocialsUrl,
  useUpdateUserTitle,
  useSaveProfilePicture,
} = userMutations;
