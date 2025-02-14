import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { HomeView } from "@/modules/home/ui/views/HomeView";
import { getQueryClient } from "@/lib/getQueryClient";
import { genresQueryOptions } from "@/modules/home/api/genresQueryOptions";
import { recommendationsInfiniteQueryOptions } from "@/modules/home/api/recommendationsInfiniteQueryOptions";

interface PageProps {
  searchParams: Promise<{
    categoryId: string;
  }>;
}

export const dynamic = "force-dynamic";

const Page = async ({ searchParams }: PageProps) => {
  const { categoryId } = await searchParams;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(genresQueryOptions);
  void queryClient.prefetchInfiniteQuery({
    ...recommendationsInfiniteQueryOptions,
    initialPageParam: 0 as never,
    getNextPageParam: (lastPage: any) => {
      return lastPage.pagination.next_cursor;
    },
  });
  // TODO: prefetch songs query

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeView categoryId={categoryId} />
    </HydrationBoundary>
  );
};

export default Page;
