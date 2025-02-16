"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { InfiniteScroll } from "@/components/InfiniteScroll";
import { SongGridCard } from "@/modules/songs/ui/components/SongGridCard";

import { recommendationsInfiniteQueryOptions } from "../../api/recommendationsInfiniteQueryOptions";
import { HomeFeedSkeleton } from "@/modules/songs/ui/skeletons/HomeFeedSkeleton";

interface HomeSongsSectionProps {
  categoryId?: string;
}

export const HomeSongsSection = ({ categoryId }: HomeSongsSectionProps) => {
  return (
    <Suspense fallback={<HomeFeedSkeleton />}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <HomeSongsSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
};
const HomeSongsSectionSuspense = ({ categoryId }: HomeSongsSectionProps) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    ...recommendationsInfiniteQueryOptions,
    initialPageParam: 0 as never,
    getNextPageParam: (lastPage: any) => {
      return lastPage.pagination.next_cursor;
    },
  });
  const data2 = data.pages.flatMap((page: any) => page.data);
  return (
    <div>
      <div className="gap-4  gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
        {data2.map((song: any, index: number) => (
          <SongGridCard
            key={index}
            data={song}
          />
        ))}
      </div>
      <InfiniteScroll
        isManual={false}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};
