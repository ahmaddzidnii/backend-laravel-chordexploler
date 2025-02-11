<?php

namespace Database\Seeders;

use App\Models\Genre;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $musicGenre = $musicGenre = [
            "Pop",
            "Rock",
            "Hip Hop",
            "Jazz",
            "Romance",
            "R&B",
            "Electronic",
            "Classical",
            "Country",
            "Reggae",
            "Blues",
            "Soul",
            "Metal",
            "Alternative",
            "Indie",
            "Latin",
            "K-pop",
            "Folk",
            "Techno",
            "EDM",
            "Trap",
            "Punk",
            "Disco",
            "House",
            "Reggaeton",
            "Afrobeats",
            "Dancehall"
        ];

        foreach ($musicGenre as $genre) {
            Genre::create([
                'name' => $genre
            ]);
        };
    }
}
