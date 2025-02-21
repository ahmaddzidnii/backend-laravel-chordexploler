"use client";

import Link from "next/link";
import { Fragment } from "react";
import { useParams } from "next/navigation";
import { Music2, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { DataRenderer } from "@/components/DataRenderer";
import { useGetSongById } from "@/modules/studio/songs/hooks/useGetSongById";
import { ReactPlayerComponent } from "@/modules/videos/ui/components/ReactPlayer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SongInfo = () => {
  const songId = useParams<{
    songId: string;
  }>().songId;

  const song = useGetSongById(songId);

  if (song.isLoading) {
    return <LoadingSkeleton />;
  }

  if (song.isError) {
    return <div>Error: {song.error.message}</div>;
  }

  const data = song.data?.data;

  return (
    <div className="grid gap-6 md:grid-cols-[2fr,4fr]">
      {/* Left Column - Cover and Metadata */}
      <div className="space-y-6">
        <img
          src={data?.cover}
          alt="Song cover"
          className="w-full aspect-square object-cover rounded-lg"
        />
        <Card>
          <CardHeader>
            <CardTitle>Song Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge variant="secondary">{data?.status}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Genres</span>
              <div className="flex gap-2 flex-wrap">
                <DataRenderer
                  data={data?.genres}
                  fallback="No genre"
                  render={(genre) => {
                    return (
                      <Badge
                        key={genre.id}
                        variant="outline"
                      >
                        {genre.name}
                      </Badge>
                    );
                  }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Released Year</span>
              <span>{data?.released_year}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">BPM</span>
              <span>{data?.bpm}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Key</span>
              <span>{data?.keys.map((key) => key.key).join(", ")}</span>
            </div>
            <Separator />
          </CardContent>
        </Card>
        <Button
          className="w-full"
          asChild
        >
          <Link href={`/studio/songs/${song?.data?.data.id}/edit`}>Edit Song</Link>
        </Button>
      </div>

      {/* Right Column - Title, Artists, and Sections */}
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h1 className="text-3xl font-bold">{data?.title}</h1>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>{data?.artist.join(", ")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Music2 className="w-4 h-4 text-muted-foreground" />
              <span>{data?.publisher}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <span className="text-muted-foreground">Key Family</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {
                <DataRenderer
                  data={data?.keys}
                  render={(key, i) => {
                    return (
                      <Fragment key={i}>
                        <p className="text-muted-foreground">{`${key.key} ${key.family_name} :`}</p>
                        <div className="flex flex-wrap gap-2">
                          <DataRenderer
                            fallback="No key family"
                            data={key.family.split(",") as string[]}
                            render={(Item, i) => {
                              return (
                                <Badge
                                  key={i}
                                  variant="outline"
                                >
                                  {Item}
                                </Badge>
                              );
                            }}
                          />
                        </div>
                      </Fragment>
                    );
                  }}
                />
              }
            </div>
          </CardContent>
        </Card>
        <div>
          <ReactPlayerComponent url={data?.youtube_url!} />
        </div>
      </div>
    </div>
  );
};

function LoadingSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-[2fr,4fr]">
      {/* Left column - Album Art */}
      <div className="space-y-4">
        <Skeleton className="aspect-square w-full rounded-lg" /> {/* Album artwork */}
        {/* Song Details Card */}
        <div className="border rounded-lg p-4 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" /> {/* "Song Details" label */}
            <div className="space-y-3">
              {/* Status, Genres, Released Year, BPM, Key */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center"
                >
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>
          <Skeleton className="h-10 w-full" /> {/* Edit Song button */}
        </div>
      </div>

      {/* Right column - Song Info */}
      <div className="space-y-8">
        {/* Title and Artist */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" /> {/* Song title */}
          <Skeleton className="h-6 w-1/2" /> {/* Artist name */}
          <Skeleton className="h-4 w-2/3" /> {/* Record label */}
        </div>

        {/* Key Family Section */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-24" /> {/* "Key Family" text */}
          {/* Key grids */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="space-y-2"
            >
              <Skeleton className="h-4 w-16" /> {/* Key label */}
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }).map((_, j) => (
                  <Skeleton
                    key={j}
                    className="h-8 w-12"
                  /> /* Key buttons */
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Placeholder */}
        <Skeleton className="w-full aspect-video rounded-lg" />
      </div>
    </div>
  );
}
