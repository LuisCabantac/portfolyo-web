const PortfolioCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-2xl border bg-card">
      <div className="relative aspect-video w-full rounded-2xl bg-muted" />
      <div className="flex items-center gap-2 p-3">
        <div className="size-8 shrink-0 rounded-full bg-muted md:size-10" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded-md bg-muted md:h-5" />
          <div className="h-3 w-1/2 rounded-md bg-muted md:h-4" />
        </div>
      </div>
    </div>
  );
};

export default PortfolioCardSkeleton;
