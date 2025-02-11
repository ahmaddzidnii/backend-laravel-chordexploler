import { HydrationBoundary } from "@tanstack/react-query";

import { HomeView } from "@/modules/home/ui/views/HomeView";

interface PageProps {
  searchParams: Promise<{
    categoryId: string;
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { categoryId } = await searchParams;
  // TODO: prefetch genres with tanstack query
  return (
    <HydrationBoundary>
      <HomeView categoryId={categoryId} />
    </HydrationBoundary>
  );
};

export default Page;
