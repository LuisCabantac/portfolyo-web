import Image from "next/image";
import { UserResource } from "@clerk/react/types";

import { Id } from "../../convex/_generated/dataModel";
import { Bookmark } from "@/lib/icons";

import { Button } from "@/components/ui/button";

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

const PortfolioCard = ({ portfolio }: PortfolioCardProps) => {
  return (
    <div className="rounded-2xl bg-card">
      {portfolio.screenshotUrl && (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
          <a href={portfolio.url} target="_blank" rel="noopener">
            <Image
              src={portfolio.screenshotUrl}
              alt={`${portfolio.ownerName}'s portfolio`}
              fill
              className="object-cover object-top transition-[object-position] duration-3000 ease-in-out hover:object-bottom"
            />
          </a>
        </div>
      )}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
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
        <Button variant="invert" size="icon-lg">
          <a
            href="https://play.google.com/store/apps/details?id=com.luiscabantac.portfolyo"
            target="_blank"
            rel="noopener"
          >
            <div
              className="size-6 bg-current"
              style={{
                maskImage: `url(${Bookmark.src})`,
                WebkitMaskImage: `url(${Bookmark.src})`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }}
            />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default PortfolioCard;
