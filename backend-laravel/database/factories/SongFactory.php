<?php

namespace Database\Factories;

use App\Models\Key;
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
            'user_id' => '01jm25dvpw1np6rf919rfr5fzf',
            'title' => $this->faker->sentence(3),
            'artist' => implode(', ', array_map(function () {
                return $this->faker->name;
            }, range(1, $this->faker->numberBetween(1, 3)))),
            'slug' => Str::slug($this->faker->sentence(3)),
            'cover' => 'https://lh3.googleusercontent.com/lkr1V6gP9v3t91jOx1WwAHJW4uBiQo_3VOMyTPF8hQV_-WCrO8Tdhshs05340bzrhZ2nIuotoiVz1ISOXA',
            'youtube_url' => 'https://youtu.be/ZeFpigRaXbI?si=j-sC3yNkCRK_0qzE',
            'released_year' => $this->faker->year(),
            'publisher' => $this->faker->company(),
            'bpm' => $this->faker->numberBetween(60, 200), // BPM acak
        ];
    }

    // public function configure()
    // {
    //     return $this->afterCreating(function (Song $song) {
    //         $keys = Key::inRandomOrder()->limit(rand(1, 3))->pluck('id')->toArray();
    //         $pivotData = [];

    //         foreach ($keys as $keyId) {
    //             $pivotData[$keyId] = ['id' => Str::uuid()]; // Pakai UUID di pivot
    //         }

    //         $song->keys()->attach($pivotData);
    //     });
    // }
}
