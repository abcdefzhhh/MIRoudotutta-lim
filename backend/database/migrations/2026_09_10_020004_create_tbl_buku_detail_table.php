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
        Schema::create('tbl_buku_detail', function (Blueprint $table) {
            $table->id('idbukudetail');
            $table->foreignId('idbuku')->constrained('tbl_buku', 'idbuku')->cascadeOnDelete();
            $table->string('kodebukudetail', 50)->unique()->index();
            $table->enum('kondisi', ['baik', 'rusak', 'hilang'])->default('baik');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_buku_detail');
    }
};
