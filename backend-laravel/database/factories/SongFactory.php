<?php

namespace Database\Factories;

use App\Models\Song;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Song>
 */
class SongFactory extends Factory
{
    protected $model = Song::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => "82dc8b47-7d34-41a4-acd6-4e425f3d799c",
            'title' => $this->faker->sentence(3),
            'artist' => implode(', ', array_map(function () {
                return $this->faker->name;
            }, range(1, $this->faker->numberBetween(1, 3)))),
            'slug' => Str::slug($this->faker->sentence(3)),
            'cover' => "https://is3.cloudhost.id/chordexploler/chordexploler/images/chexp6794e19d93e57.jpg",
            'youtube_url' => "https://youtu.be/ZeFpigRaXbI?si=j-sC3yNkCRK_0qzE",
            'released_year' => $this->faker->year(),
            'publisher' => $this->faker->company(),
            'key' => implode(', ', $this->faker->randomElements([
                'C',
                'Cm',
                'G',
                'Gm',
                'D',
                'Dm',
                'A',
                'Am',
                'E',
                'Em',
                'F',
                'Fm',
                'Bb',
                'Bbm',
                'Eb',
                'Ebm',
                'Ab',
                'Abm',
                'Db',
                'Dbm',
                'Gb',
                'Gbm',
                'B',
                'Bm'
            ], $this->faker->numberBetween(1, 3))), // Kunci dengan pemisah koma
            'bpm' => $this->faker->numberBetween(60, 200), // BPM acak
        ];
    }
}
