interface ChordCanvasProps {
  song: any;
}

const demo = `[Intro]
C G Am E
 
[Verse 1]
C   G      Am           E
Aku tepat ada di sampingmu
   F       C/E      Dm7        G
Bertahan menunggu satunya cintaku
C       G/B     Am       E
Mengapa dulu kauragukan aku?
   F      C/E    Dm7          G
Sesali diriku melangkah dengannya
 
[Chorus]
           Am    Dm7
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
Adakah hatimu masih hatiku?
 
[Verse 2]
A       E/Ab    F#m       C#/F
Bila kaulihat daun berguguran
   D      A/C#   Bm7         E
Laksana patahnya ranting hatiku
A      E/Ab  F#m       C#/F
Ingin aku kembali denganmu
  D       A/C#      Bm7          E
Rasanya kulihat kau juga tak mungkin
 
[Chorus]
    C#/F   F#m   Bm7
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
Adakah hatimu masih hatiku?
 
[Bridge]
 D           E     A/C#      F#m7
Inginkan dirimu, merindu dirimu
   D          E      F#      F#7
Berharap semesta satukan kita..
D            E         C#m7      F#7
Bila tak mungkin dan terikat dirinya
Bb/F#    Bm7
Haruskah aku mengalah?
         E
Haruskah aku menjauh?
 
[Interlude]
F#m  Bm  E/Ab  Asus4 A
 
   D          Bm7            C#7  C#/F
Ku cemburu, namun, hanya sebatas itu
 
[Chorus]
        G#m     C#m7
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
Sungguhkah hatimu masih milikku?
 
[Outro]
           B  F#  G#m  D#
Masih milikku
B
Hm-hm-hm`;

export const ChordCanvas = ({ song }: ChordCanvasProps) => {
  return (
    <div className="w-full min-h-screen order-2 lg:order-1">
      <div className="rounded-lg border">
        <div className="border-b px-2 py-4">
          <h1 className="text-lg font-semibold">Comedy (喜劇)</h1>
          <p className="text-muted-foreground">by Gen Hoshino</p>
        </div>
        <pre className="min-h-screen px-2 py-1.5">{demo}</pre>
      </div>
    </div>
  );
};
