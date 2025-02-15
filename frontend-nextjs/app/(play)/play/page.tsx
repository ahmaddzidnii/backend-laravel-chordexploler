import { PlayView } from "@/modules/play/ui/views/PlayView";
import { HydrationBoundary } from "@tanstack/react-query";

interface PlayPageProps {
  searchParams: Promise<{
    songId: string;
  }>;
}

export const dynamic = "force-dynamic";

const PlayPage = async ({ searchParams }: PlayPageProps) => {
  const { songId } = await searchParams;
  // TODO: Prefetch get one song
  return (
    <HydrationBoundary>
      <PlayView songId={songId} />
    </HydrationBoundary>
  );
};

export default PlayPage;
