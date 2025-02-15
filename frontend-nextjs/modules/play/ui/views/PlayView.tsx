import { SongSection } from "../sections/SongSection";

interface PlayViewProps {
  songId: string;
}

export const PlayView = ({ songId }: PlayViewProps) => {
  return (
    <>
      <SongSection songId={songId} />
    </>
  );
};
