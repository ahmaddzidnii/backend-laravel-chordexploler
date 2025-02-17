import { SongSection } from "../sections/SongSection";

interface PlayViewProps {
  slug: string;
}

export const PlayView = ({ slug }: PlayViewProps) => {
  return (
    <>
      <SongSection slug={slug} />
    </>
  );
};
