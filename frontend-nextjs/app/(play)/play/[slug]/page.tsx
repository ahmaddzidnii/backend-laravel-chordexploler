import { PlayView } from "@/modules/play/ui/views/PlayView";
import { HydrationBoundary } from "@tanstack/react-query";

interface PlayPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

const PlayPage = async ({ params }: PlayPageProps) => {
  const { slug } = await params;
  // TODO: Prefetch get one song
  return (
    <HydrationBoundary>
      <PlayView slug={slug} />
    </HydrationBoundary>
  );
};

export default PlayPage;
