"use client";

import { Suspense } from "react";
import { useRouter } from "nextjs-toploader/app";
import { ErrorBoundary } from "react-error-boundary";
import { useSuspenseQuery } from "@tanstack/react-query";

import { FilterCarousel } from "@/components/FilterCarousel";
import { genresQueryOptions } from "../../api/genresQueryOptions";

interface CategoriesSectionProps {
  categoryId?: string;
}

export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
  return (
    <Suspense
      fallback={
        <FilterCarousel
          isLoading
          data={[]}
          onSelect={() => {}}
        />
      }
    >
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const CategoriesSectionSuspense = ({ categoryId }: CategoriesSectionProps) => {
  const { data: genres } = useSuspenseQuery(genresQueryOptions);

  const data = genres.map((genre) => ({ value: genre.id, label: genre.name }));

  const router = useRouter();

  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set("categoryId", value);
    } else {
      url.searchParams.delete("categoryId");
    }

    router.push(url.toString());
  };
  return (
    <FilterCarousel
      onSelect={onSelect}
      value={categoryId}
      data={data}
    />
  );
};
