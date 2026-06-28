"use client";

import { useRef, useCallback } from "react";
import { useT } from "next-i18next/client";

import { cn } from "@/lib/utils";
import { useGetAllTitles } from "@/lib/services/titles/queries";

interface ProfessionalTitlesFilterProps {
  selectedTitleId: string | "all";
  onSelectTitle: (id: string | "all") => void;
}

const ProfessionalTitlesFilter = ({
  selectedTitleId,
  onSelectTitle,
}: ProfessionalTitlesFilterProps) => {
  const { t } = useT("common");
  const { professionalTitles, isLoading } = useGetAllTitles();

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1.5;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent, id: string) => {
      if (isDragging.current) return;
      onSelectTitle(id);
    },
    [onSelectTitle],
  );

  const fallbackTitles = [
    { _id: "frontend", title: t("professional_titles.frontEnd") },
    { _id: "backend", title: t("professional_titles.backEnd") },
    { _id: "fullstack", title: t("professional_titles.fullStack") },
    { _id: "mobile", title: t("professional_titles.mobile") },
    { _id: "softeng", title: t("professional_titles.softEng") },
    { _id: "web", title: t("professional_titles.web") },
    { _id: "agency", title: t("professional_titles.agency") },
  ];

  const titles = professionalTitles?.length
    ? professionalTitles
    : fallbackTitles;

  return (
    <div className="relative mb-4">
      <div
        ref={scrollRef}
        className="scrollbar-none flex cursor-grab gap-2 overflow-x-scroll pb-2 active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={(e) => handleClick(e, "all")}
          disabled={isLoading}
          className={cn(
            "shrink-0 rounded-full border px-6 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
            selectedTitleId === "all"
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:border-primary hover:text-primary",
          )}
        >
          {t("all")}
        </button>
        {titles.map((title) => (
          <button
            key={title._id}
            onClick={(e) => handleClick(e, title._id)}
            disabled={isLoading}
            className={cn(
              "shrink-0 rounded-full border px-6 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
              selectedTitleId === title._id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary",
            )}
          >
            {title.title}
          </button>
        ))}
      </div>
      <div className="pointer-events-none absolute top-0 right-0 h-full w-10 bg-linear-to-l from-background to-transparent" />
    </div>
  );
};

export default ProfessionalTitlesFilter;
