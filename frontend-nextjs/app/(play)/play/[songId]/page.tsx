interface PlayPageProps {
  params: Promise<{
    songId: string;
  }>;
}
const PlayPage = async ({ params }: PlayPageProps) => {
  const { songId } = await params;
  return <div>{songId}</div>;
};

export default PlayPage;
