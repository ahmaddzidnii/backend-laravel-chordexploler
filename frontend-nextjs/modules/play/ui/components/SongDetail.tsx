import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

interface SongDetailProps {
  song: any;
}

export const SongDetail = ({ song }: SongDetailProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-muted-foreground text-sm">Released 08 Apr, 2022</p>
        <p className="text-muted-foreground text-sm">℗ 2022 VICTOR ENTERTAINMENT</p>
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
        <div className="flex flex-none items-center gap-2">
          <Avatar className="cursor-pointer size-9">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-base font-bold ">John Doe</h1>
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
  );
};
