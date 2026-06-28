import { useConvex } from "convex/react";
import { useQuery } from "@tanstack/react-query";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface IGetTitleByIdProps {
  titleId: string | null;
  userId: string | null;
}

const titlesQueries = {
  useGetTitleById: ({ titleId, userId }: IGetTitleByIdProps) => {
    const convex = useConvex();

    const { data: professionalTitle } = useQuery({
      queryFn: () =>
        convex.query(api.queries.titles.getTitleById, {
          titleId: titleId as Id<"titles">,
        }),
      queryKey: [`title-${userId}-${titleId}`],
      enabled: !!userId && !!titleId,
    });

    return { professionalTitle };
  },
  useGetAllTitles: () => {
    const convex = useConvex();

    const { data: professionalTitles } = useQuery({
      queryFn: () => convex.query(api.queries.titles.getAllTitle),
      queryKey: ["professional-titles"],
    });

    return { professionalTitles };
  },
};

export const { useGetTitleById, useGetAllTitles } = titlesQueries;
