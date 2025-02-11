import Image from "next/image";

interface SongThumbnailProps {
  imageUrl: string;
  title: string;
}

export const SongThumbnail = ({ imageUrl, title }: SongThumbnailProps) => {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg">
      <Image
        fill
        className="object-cover"
        src={imageUrl}
        alt={title}
      />
    </div>
  );
};
