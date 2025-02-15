import { SongThumbnail } from "@/modules/songs/ui/components/SongThumbnail";
import { SongDetail } from "./SongDetail";

interface SongInfoProps {
  song: any;
}

export const SongInfo = ({ song }: SongInfoProps) => {
  return (
    <div className="w-full lg:w-[300px] order-1 xl:order-2">
      <SongThumbnail
        imageUrl="https://placehold.co/400"
        title="https://placehold.co/400"
      />
      <SongDetail song={song} />
    </div>
  );
};
