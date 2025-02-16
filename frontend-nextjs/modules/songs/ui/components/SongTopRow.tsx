"use client";

import toast from "react-hot-toast";
import { ShareIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

import { SubscriptionButton } from "@/modules/subscriptions/ui/components/SubscriptionButton";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { SongHeader } from "./SongHeader";
import { UserInfo } from "@/modules/users/ui/components/UserInfo";
import { UserAvatar } from "@/modules/users/ui/components/UserAvatar";

interface SongTopRowProps {
  song: any;
}

export const SongTopRow = ({ song }: SongTopRowProps) => {
  const handleShare = () => {
    const url = window.location.href;

    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="border-b px-2 py-4 flex flex-col">
      <SongHeader
        song={song}
        className="is-desktop"
      />
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <UserAvatar
                imageUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JwQRXYYQmGRAQ2Rnl8Cj2dbKIqMm9G.png"
                name="Ahmad Zidni Hidayat"
                size="lg"
              />
              <div>
                <UserInfo
                  name="Ahmad Zidni Hidayat"
                  size="lg"
                />
                <p className="text-sm text-muted-foreground line-clamp-1">2.5M subscribers</p>
              </div>
            </div>
            <SubscriptionButton
              onClick={() => {}}
              disabled={false}
              isSubscribed={false}
              size="sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-full bg-secondary">
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-l-full px-4 text-primary`}
                onClick={() => {}}
              >
                <ThumbsUpIcon className="mr-2 h-4 w-4" />
                {20}
              </Button>
              <Separator
                orientation="vertical"
                className="h-6"
              />
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-r-full px-4 "text-primary"`}
                onClick={() => {}}
              >
                <ThumbsDownIcon className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={handleShare}
            >
              <ShareIcon className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
