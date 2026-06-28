import { useConvex } from "convex/react";
import { useQuery } from "@tanstack/react-query";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface IGetAllTechnologiesByPortfolioIdProps {
  portfolioId: string | null;
}

interface IGetAllTechnologiesByUserEmailProps {
  email: string | null;
}

const technologiesQueries = {
  useGetAllTechnologiesByPorfolioId: ({
    portfolioId,
  }: IGetAllTechnologiesByPortfolioIdProps) => {
    const convex = useConvex();

    const { data: technologies } = useQuery({
      queryFn: () =>
        convex.query(api.queries.technologies.getAllTechnologiesByPorfolioId, {
          portfolioId: portfolioId as Id<"portfolios">,
        }),
      queryKey: [`technologies-${portfolioId}`],
      enabled: !!portfolioId,
    });

    return { technologies };
  },
  useGetAllTechnologiesByUserEmail: ({
    email,
  }: IGetAllTechnologiesByUserEmailProps) => {
    const convex = useConvex();

    const { data: technologies } = useQuery({
      queryFn: () =>
        convex.query(api.queries.technologies.getAllTechnologiesByUserEmail, {
          email: email ?? "",
        }),
      queryKey: [`technologies-${email}`],
      enabled: !!email,
    });

    return { technologies };
  },
};

export const {
  useGetAllTechnologiesByPorfolioId,
  useGetAllTechnologiesByUserEmail,
} = technologiesQueries;
