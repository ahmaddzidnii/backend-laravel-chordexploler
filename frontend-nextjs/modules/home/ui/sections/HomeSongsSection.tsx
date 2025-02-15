"use client";
import { SongGridCard } from "@/modules/songs/ui/components/SongGridCard";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { recommendationsInfiniteQueryOptions } from "../../api/recommendationsInfiniteQueryOptions";
import { InfiniteScroll } from "@/components/InfiniteScroll";

interface HomeSongsSectionProps {
  categoryId?: string;
}

export const HomeSongsSection = ({ categoryId }: HomeSongsSectionProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <HomeSongsSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
};

// const data2 = {
//   id: 1,
//   title: "Title",
//   views: 1276000,
//   createdAt: new Date().toISOString(),
//   user_id: 1,
// };

const HomeSongsSectionSuspense = ({ categoryId }: HomeSongsSectionProps) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    ...recommendationsInfiniteQueryOptions,
    initialPageParam: 0 as never,
    getNextPageParam: (lastPage: any) => {
      return lastPage.pagination.next_cursor;
    },
  });

  const data2 = data.pages.flatMap((page: any) => page.data);
  // TODO: implement InfiniteScroll
  return (
    <div>
      <div className="gap-4  gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
        {/* {Array.from({ length: 10 }).map((_, index) => (
          <SongGridCard
            key={index}
            data={data2}
          />
        ))} */}

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
