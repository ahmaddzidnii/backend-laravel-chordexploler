<?php

namespace Database\Seeders;

use App\Models\Song;
use Illuminate\Database\Seeder;

class SongSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $songs = Song::factory()->count(100)->create();

        $songs->each(function (Song $song) {
            $song->sections()->create([
                'name' => 'Verse 1',
                'start_time' => 0,
                'end_time' => 30,
                'order' => 1,
                'content' => 'This is the first verse',
            ]);

            $song->sections()->create([
                'name' => 'Chorus',
                'start_time' => 31,
                'end_time' => 60,
                'order' => 2,
                'content' => 'This is the chorus',
            ]);

            $song->sections()->create([
                'name' => 'Verse 2',
                'start_time' => 61,
                'end_time' => 90,
                'order' => 3,
                'content' => 'This is the second verse',
            ]);

            $song->sections()->create([
                'name' => 'Chorus',
                'start_time' => 91,
                'end_time' => 120,
                'order' => 4,
                'content' => 'This is the chorus',
            ]);
        });
    }
}
