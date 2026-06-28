import Image from "next/image";
import { UserResource } from "@clerk/react/types";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";

import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

interface PortfolioCardProps {
  portfolio: {
    _id: Id<"portfolios">;
    ownerProfilePicture: string;
    ownerName: string;
    ownerEmail: string;
    ownerTitle: string | null;
    url: string;
    isBookmarked: boolean;
    updatedTime: number;
    portfolioId: Id<"portfolios">;
    screenshotUrl: string | null;
  };
  user: UserResource | null | undefined;
  onBookmarkPortfolio: () => void;
}

const PortfolioCard = ({
  portfolio,
  user,
  onBookmarkPortfolio,
}: PortfolioCardProps) => {
  // const { mutate: viewPortfolio } = useMutation({
  //   mutationFn: useConvexMutation(api.mutations.portfolios.addPortfolioView),
  // });

  // const handlePortfolioCardPress = () => {
  //   if (user?.primaryEmailAddress?.emailAddress) {
  //     viewPortfolio({
  //       portfolioId: portfolio._id,
  //       userEmail: user.primaryEmailAddress.emailAddress,
  //     });
  //   }

  //   return router.push(`/${portfolio._id}`);
  // };

  return (
    <div className="rounded-2xl bg-card">
      {portfolio.screenshotUrl && (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
          <Image
            src={portfolio.screenshotUrl}
            alt={`${portfolio.ownerName}'s portfolio`}
            fill
            className="object-cover object-top transition-[object-position] duration-3000 ease-in-out hover:object-bottom"
          />
        </div>
      )}
      <div className="flex items-center gap-2 px-4 py-3">
        <Image
          src={portfolio.ownerProfilePicture}
          width={36}
          height={36}
          alt={`${portfolio.ownerName}'s profile image`}
          className="h-8 w-8 shrink-0 rounded-full md:h-10 md:w-10"
        />
        <div>
          <p className="text-sm font-medium md:text-base">
            {portfolio.ownerName}
          </p>
          <p className="text-xs text-muted-foreground md:text-sm">
            {portfolio.ownerTitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
