import Image from "next/image";
import { useMemo } from "react";

import { UserInfo } from "@/modules/users/ui/components/UserInfo";
import { UserAvatar } from "@/modules/users/ui/components/UserAvatar";
import { SongHeader } from "@/modules/songs/ui/components/SongHeader";
import { SongThumbnail } from "@/modules/songs/ui/components/SongThumbnail";

interface SongInfoProps {
  song: any;
}

export const SongInfo = ({ song }: SongInfoProps) => {
  const views = useMemo(() => {
    return new Intl.NumberFormat("en", {
      notation: "standard",
    }).format(278603450);
  }, []);
  return (
    <div className="w-full lg:w-[300px] shrink-0 order-1 xl:order-2">
      <SongThumbnail
        imageUrl="https://placehold.co/400"
        title="https://placehold.co/400"
      />
      <div className="flex flex-col gap-4">
        <SongHeader
          song={song}
          className="is-mobile mt-4"
        />
        <div className="mt-2">
          <p className="text-muted-foreground text-sm">Released 08 Apr, 2022</p>
          <p className="text-muted-foreground text-sm">℗ 2022 VICTOR ENTERTAINMENT</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Page view</h3>
          <p className="text-muted-foreground text-sm">{views} views</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Song keys</h3>
          <p className="text-muted-foreground text-sm">Am</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Song album</h3>
          <p className="text-muted-foreground text-sm">Comedy - Single</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Transcribed by</h3>
          <div className="flex flex-none items-center gap-2 mt-2">
            <UserAvatar
              imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JwQRXYYQmGRAQ2Rnl8Cj2dbKIqMm9G.png"
              name="Ahmad Zidni Hidayat"
              size="lg"
            />
            <UserInfo
              name="Ahmad Zidni Hidayat"
              size="lg"
            />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Play along video</h3>
          {/* TODO: CREATE PLAYER COMPONENT */}
          <div className="rounded-lg relative overflow-hidden aspect-video">
            <Image
              className="object-cover"
              fill
              src={"https://placehold.co/600x400"}
              alt="test"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
