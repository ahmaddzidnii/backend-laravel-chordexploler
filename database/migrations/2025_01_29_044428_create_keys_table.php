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
        Schema::create('keys', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('key');
            $table->string('family_name');
            $table->string('family');
            $table->timestamps();
        });

        Schema::create('songs_keys', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignulid('song_id')->constrained()->onDelete('cascade');
            $table->foreignulid('key_id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('keys');
    }
};
