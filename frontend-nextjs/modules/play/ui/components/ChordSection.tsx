import { cn } from "@/lib/utils";
import { AutoScroll } from "@/modules/chord/ui/components/AutoScroll";
import { SongToolbar } from "@/modules/songs/ui/components/SongToolbar";
import { SongTopRow } from "@/modules/songs/ui/components/SongTopRow";

interface ChordSectionProps {
  song: any;
}

const array = [
  {
    title: "Intro",
    content: `C G Am E`,
  },
  {
    title: "Verse 1",
    content: `C   G      Am           E
Aku tepat ada di sampingmu
   F       C/E      Dm7        G
Bertahan menunggu satunya cintaku
C       G/B     Am       E
Mengapa dulu kauragukan aku?
   F      C/E    Dm7          G
Sesali diriku melangkah dengannya`,
  },
  {
    title: "Chorus",
    content: `           Am    Dm7
Sungguhkah aku untukmu?
G                C
Kenyataan masih untuknya
   F          Dm7            E
Ku cemburu, namun, hanya sebatas itu
        Am7     Dm7
Ke mana hati kaubawa?
G                  C
Tanpa pernah jelas akhirnya
   F           Dm7            E7
Ku menunggu, kenyataannya kau di sana
       F      G         Csus4 C
Adakah hatimu masih hatiku?`,
  },
  {
    title: "Verse 2",
    content: `A       E/Ab    F#m       C#/F
Bila kaulihat daun berguguran
   D      A/C#   Bm7         E
Laksana patahnya ranting hatiku
A      E/Ab  F#m       C#/F
Ingin aku kembali denganmu
  D       A/C#      Bm7          E
Rasanya kulihat kau juga tak mungkin`,
  },
  {
    title: "Chorus",
    content: `    C#/F   F#m   Bm7
Sungguhkah aku untukmu?
E               A
Kenyataan masih untuknya
   D          Bm7            C#7  C#/F
Ku cemburu, namun, hanya sebatas itu
        F#m7     Bm7
Ke mana hati kau bawa?
E                  A
Tanpa pernah jelas akhirnya
   D            Bm7           C#
Ku menunggu, kenyataannya kau di sana
       D      E         Asus4 A
Adakah hatimu masih hatiku?`,
  },
  {
    title: "Bridge",
    content: ` D           E     A/C#      F#m7
Inginkan dirimu, merindu dirimu
   D          E      F#      F#7
Berharap semesta satukan kita..
D            E         C#m7      F#7
Bila tak mungkin dan terikat dirinya
Bb/F#    Bm7
Haruskah aku mengalah?
         E
Haruskah aku menjauh?`,
  },
  {
    title: "Interlude",
    content: `F#m  Bm  E/Ab  Asus4 A`,
  },
  {
    title: "Chorus",
    content: `        G#m     C#m7
Ke mana hati kaubawa?
F#/Bb              Bsus4 B
Tanpa pernah jelas akhirnya
   E                  Ddim    D#7  D#
Ku menunggu, kenyataannya kau di sana
       E      F#        G#m      C#m7
Adakah hatimu masih hatiku? uu.. hu.. uu..
F#              Bsus4 B
Kenyataan masih untuknya
   E          C#m            D#   D#7
Ku cemburu, namun, hanya sebatas itu
        G#m7      C#m7
Ke mana hati kaubawa?
F#                 Bsus4 B
Tanpa pernah jelas akhirnya
   E                  Ddim    D#7  D#
Ku menunggu, kenyataannya kau di sana
       E      F#        D#m G#m7
Adakah hatimu masih hatiku?..
    F#     E      F#
Sungguhkah hatimu masih milikku?`,
  },
  {
    title: "Outro",
    content: `           B  F#  G#m  D#
Masih milikku
B
Hm-hm-hm`,
  },
];

export const ChordSection = ({ song }: ChordSectionProps) => {
  return (
    <div className="w-full min-h-screen order-2 lg:order-1">
      <div className="rounded-lg border">
        <SongToolbar />
        <pre
          className="h-screen overflow-auto scrollbar-thin px-2 py-1.5"
          id="printable-content"
        >
          {array.map((a, idx) => (
            <div
              key={idx}
              className={cn("mb-4 px-1.5 py-2 rounded-md", idx === 1 && "is-focus")}
            >
              <h3 className="font-semibold">[{a.title}]</h3>
              <p>{a.content}</p>
            </div>
          ))}
        </pre>
      </div>
      <SongTopRow song={song} />
    </div>
  );
};
