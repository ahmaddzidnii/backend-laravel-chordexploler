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
            $table->ulid('id')->primary();
            $table->string('title');
            $table->string('title_lower');
            $table->string('artist');
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->string('slug')->unique();
            $table->string('cover')->nullable();
            $table->string('youtube_url')->nullable();
            $table->integer('released_year')->nullable();
            $table->string('publisher')->nullable();
            $table->string('bpm')->nullable();
            $table->unsignedBigInteger('views')->default(0);
            $table->timestamps();

            $table->foreignUlid('user_id')->nullable()->constrained('users', 'id')->onDelete('cascade');
        });

        Schema::create('sections', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name');
            $table->integer('start_time');
            $table->integer('end_time');
            $table->integer('position');
            $table->longText('content');
            $table->timestamps();

            $table->foreignUlid('song_id')->constrained('songs', 'id')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('songs');
        Schema::dropIfExists('sections');
    }
};
