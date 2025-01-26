import RenderListChord from "@/features/chords/components/RenderListChord";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chords",
  description: "Chords page",
};

export default function ChordsPage() {
  return (
    <div className="mx-4 flex flex-col relative">
      <header className="w-full h-[55px]">
        <p
          className="text-[25px] pt-[23px] w-max font-bold"
          role="heading"
        >
          My Chord Vault
        </p>
      </header>
      <RenderListChord />
    </div>
  );
}
