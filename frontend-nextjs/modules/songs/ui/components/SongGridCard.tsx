import Link from "next/link";
import { SongThumbnail } from "./SongThumbnail";
import { SongInfo } from "./SongInfo";

interface SongGridCardProps {
  data: any;
  onRemove?: () => void;
}

export const SongGridCard = ({ data, onRemove }: SongGridCardProps) => {
  return (
    <div className="flex flex-col gap-2 w-full group ">
      <Link href={`/songs/${data.id}`}>
        <SongThumbnail
          title="q"
          imageUrl="https://placehold.co/400"
        />
      </Link>
      <SongInfo
        data={data}
        onRemove={onRemove}
      />
    </div>
  );
};
