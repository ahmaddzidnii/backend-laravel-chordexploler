<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('songs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('artist');
            $table->string('slug')->unique();
            $table->string('cover')->nullable();
            $table->string('youtube_url')->nullable();
            $table->integer('released_year')->nullable();
            $table->string('publisher')->nullable();
            $table->string('key');
            $table->string('bpm')->nullable();
            $table->timestamps();

            $table->uuid('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('sections', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->integer('start_time');
            $table->integer('end_time');
            $table->integer('order');
            $table->text('content');
            $table->timestamps();

            $table->foreignUuid('song_id')->constrained('songs', "id")->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('songs');
    }
};
