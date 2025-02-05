"use client";
import { Music2, User } from "lucide-react";
import { DataRenderer } from "@/components/DataRenderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ReactPlayerComponent } from "@/features/react-player/ReactPlayer";
import { useGetSongById } from "@/features/songs/hooks/useGetSongById";
import { useParams } from "next/navigation";
import Link from "next/link";

export const SongInfo = () => {
  const songId = useParams<{
    songId: string;
  }>().songId;

  const song = useGetSongById(songId);

  if (song.isLoading) {
    return <div>Loading...</div>;
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
                {data?.genre.map((g, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                  >
                    {g}
                  </Badge>
                ))}
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
            <div className="space-y-2">
              <span className="text-muted-foreground">Key Family</span>
              <div className="flex flex-wrap gap-2">
                <DataRenderer
                  fallback="No key family"
                  data={["Cm", "Ddim", "Eb", "Fm", "Gm", "Ab", "Bb"]}
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
            </div>
          </CardContent>
        </Card>
        <Button
          className="w-full"
          asChild
        >
          <Link href="/songs/1/edit">Edit Song</Link>
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
        <div>
          <ReactPlayerComponent url={data?.youtube_url!} />
        </div>
      </div>
    </div>
  );
};
