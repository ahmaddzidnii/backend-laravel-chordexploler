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
            'C#' => ['C#', 'D#m', 'E#m', 'F#', 'G#', 'A#m', 'Bdim'],
            'D' => ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'],
            'D#' => ['D#', 'Fm', 'Gm', 'G#', 'A#', 'Cm', 'Ddim'],
            'E' => ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#dim'],
            'F' => ['F', 'Gm', 'Am', 'A#', 'C', 'Dm', 'Edim'],
            'F#' => ['F#', 'G#m', 'A#m', 'B', 'C#', 'D#m', 'Fdim'],
            'G' => ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'],
            'G#' => ['G#', 'A#m', 'Cm', 'C#', 'D#', 'Fm', 'Gdim'],
            'A' => ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim'],
            'A#' => ['A#', 'Cm', 'Dm', 'D#', 'F', 'Gm', 'Adim'],
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
            'Cm' => ['Cm', 'Ddim', 'D#', 'Fm', 'Gm', 'G#', 'A#'],
            'C#m' => ['C#m', 'D#dim', 'E', 'F#m', 'G#m', 'A', 'B'],
            'Dm' => ['Dm', 'Edim', 'F', 'Gm', 'Am', 'A#', 'C'],
            'D#m' => ['D#m', 'Fdim', 'F#', 'G#m', 'A#m', 'B', 'C#'],
            'Em' => ['Em', 'F#dim', 'G', 'Am', 'Bm', 'C', 'D'],
            'Fm' => ['Fm', 'Gdim', 'G#', 'A#m', 'Cm', 'C#', 'D#'],
            'F#m' => ['F#m', 'G#dim', 'A', 'Bm', 'C#m', 'D', 'E'],
            'Gm' => ['Gm', 'Adim', 'A#', 'Cm', 'Dm', 'D#', 'F'],
            'G#m' => ['G#m', 'A#dim', 'B', 'C#m', 'D#m', 'E', 'F#'],
            'Am' => ['Am', 'Bdim', 'C', 'Dm', 'Em', 'F', 'G'],
            'A#m' => ['A#m', 'Cdim', 'C#', 'D#m', 'Fm', 'F#', 'G#'],
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
