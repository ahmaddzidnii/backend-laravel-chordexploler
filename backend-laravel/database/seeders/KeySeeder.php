<?php

namespace Database\Seeders;

use App\Models\Key;
use Illuminate\Database\Seeder;

class KeySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $majorScale = [
            'C' => ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
            'C#' => ['C#', 'D#m', 'E#m', 'F#', 'G#', 'A#m', 'B#dim'],
            'D' => ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'],
            'D#' => ['D#', 'E#m', 'F##m', 'G#', 'A#', 'B#m', 'C##dim'],
            'E' => ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#dim'],
            'F' => ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'Edim'],
            'F#' => ['F#', 'G#m', 'A#m', 'B', 'C#', 'D#m', 'E#dim'],
            'G' => ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'],
            'G#' => ['G#', 'A#m', 'B#m', 'C#', 'D#', 'E#m', 'F##dim'],
            'A' => ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim'],
            'A#' => ['A#', 'B#m', 'C##m', 'D#', 'E#', 'F##m', 'G#dim'],
            'B' => ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#dim'],
        ];

        foreach ($majorScale as $key => $chords) {
            Key::create([
                'key' => $key,
                'family_name' => 'Major',
                'family' => implode(', ', $chords),
            ]);
        }


        $minorScale = [
            'Cm' => ['Cm', 'Ddim', 'Eb', 'Fm', 'Gm', 'Ab', 'Bb'],
            'C#m' => ['C#m', 'D#dim', 'E', 'F#m', 'G#m', 'A', 'B'],
            'Dm' => ['Dm', 'Edim', 'F', 'Gm', 'Am', 'Bb', 'C'],
            'D#m' => ['D#m', 'E#dim', 'F#', 'G#m', 'A#m', 'B', 'C#'],
            'Em' => ['Em', 'F#dim', 'G', 'Am', 'Bm', 'C', 'D'],
            'Fm' => ['Fm', 'Gdim', 'Ab', 'Bbm', 'Cm', 'Db', 'Eb'],
            'F#m' => ['F#m', 'G#dim', 'A', 'Bm', 'C#m', 'D', 'E'],
            'Gm' => ['Gm', 'Adim', 'Bb', 'Cm', 'Dm', 'Eb', 'F'],
            'G#m' => ['G#m', 'A#dim', 'B', 'C#m', 'D#m', 'E', 'F#'],
            'Am' => ['Am', 'Bdim', 'C', 'Dm', 'Em', 'F', 'G'],
            'A#m' => ['A#m', 'B#dim', 'C#', 'D#m', 'E#m', 'F#', 'G#'],
            'Bm' => ['Bm', 'C#dim', 'D', 'Em', 'F#m', 'G', 'A'],
        ];

        foreach ($minorScale as $key => $chords) {
            Key::create([
                'key' => $key,
                'family_name' => 'Minor',
                'family' => implode(', ', $chords),
            ]);
        }
    }
}
