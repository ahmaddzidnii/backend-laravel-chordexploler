const SongEditPage = async ({ params }: { params: Promise<{ songId: string }> }) => {
  return <div>{JSON.stringify((await params).songId)}</div>;
};

export default SongEditPage;
