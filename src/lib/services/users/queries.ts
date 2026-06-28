import { useConvex } from "convex/react";
import { useQuery } from "@tanstack/react-query";

import { api } from "../../../../convex/_generated/api";

interface IGetProfileByClerkIdProps {
  userId: string;
  isSignedIn: boolean;
  isLoaded: boolean;
}

interface IGetProfileByEmailAddressProps {
  email: string;
}

const userQueries = {
  useGetProfileByClerkId: ({
    userId,
    isSignedIn,
    isLoaded,
  }: IGetProfileByClerkIdProps) => {
    const convex = useConvex();

    const { data: profile, isLoading: profileIsLoading } = useQuery({
      queryFn: () =>
        convex.query(api.queries.users.getUserByClerkId, {
          clerkId: userId,
        }),
      queryKey: [userId],
      enabled: isSignedIn && isLoaded,
    });

    return { profile, profileIsLoading };
  },
  useGetProfileByUserId: ({ email }: IGetProfileByEmailAddressProps) => {
    const convex = useConvex();

    const {
      data: profile,
      isLoading: profileIsLoading,
      refetch: refetchProfile,
    } = useQuery({
      queryFn: () =>
        convex.query(api.queries.users.getUserByEmail, {
          email: email,
        }),
      queryKey: [`profile-${email}`],
      enabled: !!email,
    });

    return { profile, profileIsLoading, refetchProfile };
  },
  useGetProfileByEmailAddress: ({ email }: IGetProfileByEmailAddressProps) => {
    const convex = useConvex();

    const {
      data: profile,
      isLoading: profileIsLoading,
      refetch: refetchProfile,
    } = useQuery({
      queryFn: () =>
        convex.query(api.queries.users.getUserByEmail, {
          email: email,
        }),
      queryKey: [`profile-${email}`],
      enabled: !!email,
    });

    return { profile, profileIsLoading, refetchProfile };
  },
};

export const {
  useGetProfileByClerkId,
  useGetProfileByUserId,
  useGetProfileByEmailAddress,
} = userQueries;
