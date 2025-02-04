import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionContainer } from "@/features/sections/components/SectionContainer";
import { Clock, Music2, User } from "lucide-react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const data = [
  {
    id: "01jk62kna8sa0ypks1casvv1e8",
    name: "Verse 1",
    start_time: 0,
    end_time: 30,
    content: "This is the first verse",
  },
  {
    id: "01jk62kna91nwzveyc64ghsrqf",
    name: "Chorus",
    start_time: 31,
    end_time: 60,
    content: "This is the chorus",
  },
  {
    id: "01jk62knaadwc1yxgydd2be70r",
    name: "Verse 2",
    start_time: 61,
    end_time: 90,
    content: "This is the second verse",
  },
  {
    id: "01jk62knacspdqxj2vke5ead1a",
    name: "Chorus",
    start_time: 91,
    end_time: 120,
    content: "This is the chorus",
  },
];

const SongIdPage = () => {
  return (
    <div className="mx-4 space-y-4">
      <header className="w-full h-[55px]">
        <Link
          href="/songs"
          className="text-[25px] pt-[23px] w-max font-bold flex items-center"
        >
          <FaArrowLeft className="size-6 mr-3" />
          Back to Songs
        </Link>
      </header>
      <div className="grid gap-6 md:grid-cols-[2fr,4fr]">
        {/* Left Column - Cover and Metadata */}
        <div className="space-y-6">
          <img
            src="https://lh3.googleusercontent.com/lkr1V6gP9v3t91jOx1WwAHJW4uBiQo_3VOMyTPF8hQV_-WCrO8Tdhshs05340bzrhZ2nIuotoiVz1ISOXA"
            alt="Song cover"
            className="w-full aspect-square object-cover rounded-lg"
          />
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
              <h1 className="text-3xl font-bold">Quam maiores consequatur totam.</h1>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <div className="flex gap-2">
                  <span>Keyon Oberbrunner III,</span>
                  <span>Maximo Crist</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Music2 className="w-4 h-4 text-muted-foreground" />
                <span>Steuber, Spencer and Daniel</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Song Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="secondary">Draft</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Released Year</span>
                <span>1989</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">BPM</span>
                <span>88</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Key</span>
                <span>Cm (Minor)</span>
              </div>
              <Separator />
              <div className="space-y-2">
                <span className="text-muted-foreground">Key Family</span>
                <div className="flex flex-wrap gap-2">
                  {["Cm", "Ddim", "Eb", "Fm", "Gm", "Ab", "Bb"].map((key) => (
                    <Badge
                      key={key}
                      variant="outline"
                    >
                      {key}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="space-y-4">
        {/* <div className="sticky top-0 z-10 bg-background">
          <Card>
            <div className="w-[240px] aspect-video">
              <img
                src="https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg"
                width="100%"
                height="100%"
              />
            </div>
          </Card>
        </div> */}

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Sections</CardTitle>
          </CardHeader>
          <CardContent>
            <SectionContainer data={data} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SongIdPage;
