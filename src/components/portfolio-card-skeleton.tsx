const PortfolioCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-2xl bg-card">
      <div className="relative aspect-video w-full rounded-2xl bg-muted" />
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="size-8 shrink-0 rounded-full bg-muted md:size-10" />
          <div className="space-y-2">
            <div className="h-4 w-24 rounded-md bg-muted md:h-5" />
            <div className="h-3 w-16 rounded-md bg-muted md:h-4" />
          </div>
        </div>
        <div className="size-8 rounded-full bg-muted md:size-10" />
      </div>
    </div>
  );
};

export default PortfolioCardSkeleton;
