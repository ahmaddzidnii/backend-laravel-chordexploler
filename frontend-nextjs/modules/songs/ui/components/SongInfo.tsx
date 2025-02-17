import Link from "next/link";
import { useMemo } from "react";

import { formatDateToRelative } from "@/utils/formatDate";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface SongInfoProps {
  data: any;
  onRemove?: () => void;
}

export const SongInfo = ({ data, onRemove }: SongInfoProps) => {
  const compactViews = useMemo(() => {
    return new Intl.NumberFormat("en-US", { notation: "compact" }).format(Math.random() * 10000000);
  }, [data.views]);

  const compactDate = useMemo(() => {
    return formatDateToRelative(data.created_at);
  }, [data.createdAt]);

  return (
    <div className="flex gap-3">
      <Link href={`/users/${data.user_id}`}>
        {/* TODO: ADD AVATAR */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
      <div className="min-w-0 flex-1">
        <Link href={`/play/${data.slug}`}>
          <h3 className="font-medium line-clamp-1 lg:line-clamp-2 text-base break-words">
            {data.title}
          </h3>
        </Link>
        <Link href={`/users/${data.user_id}`}>
          <p className="text-sm text-muted-foreground line-clamp-1 lg:line-clamp-2">ahmaddzidnii</p>
          <p className="text-sm text-muted-foreground line-clamp-1 lg:line-clamp-2">
            A Mayor, B Mayor
          </p>
        </Link>
        <Link href={`/play/${data.slug}`}>
          <p className="text-sm line-clamp-1">
            {compactViews} views • {compactDate}
          </p>
        </Link>
      </div>
      {/* TODO ADD SONGS MENU REF 5:34:38 */}
    </div>
  );
};
