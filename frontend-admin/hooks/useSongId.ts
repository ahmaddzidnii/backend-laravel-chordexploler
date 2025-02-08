import { useParams } from "next/navigation";

export const useSongId = () => {
  const { songId } = useParams<{ songId: string }>();
  return songId;
};
