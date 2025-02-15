import { Suspense } from "react";
import { ChordCanvas } from "../components/ChordCanvas";
import { ErrorBoundary } from "react-error-boundary";
import { SongInfo } from "../components/SongInfoSection";

interface SongSectionProps {
  songId: string;
}

export const SongSection = ({ songId }: SongSectionProps) => {
  // TODO: Access cache get one song
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={<div>Failed to load song</div>}>
        <SongSectionSuspense songId={songId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const SongSectionSuspense = ({ songId }: SongSectionProps) => {
  return (
    <div className="flex gap-4 flex-col lg:flex-row px-2">
      <ChordCanvas song={{}} />
      <SongInfo song={{}} />
    </div>
  );
};
