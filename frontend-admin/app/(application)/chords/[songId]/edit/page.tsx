"use client";

import { use } from "react";
import { useGetSongById } from "@/features/chords/hooks/useGetSongById";

const SongEditPage = ({ params }: { params: Promise<{ songId: string }> }) => {
  const songId = use(params).songId;

  const song = useGetSongById(songId);

  if (song.isLoading) {
    return <div>Loading...</div>;
  }

  if (song.isError) {
    return <div>Error: {song.error.message}</div>;
  }

  return <div>{JSON.stringify(song.data?.data)}</div>;
};

export default SongEditPage;
