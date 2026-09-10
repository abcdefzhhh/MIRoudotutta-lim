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
        Schema::create('tbl_pinjam_detail', function (Blueprint $table) {
            $table->id('idpinjamdetail');
            $table->foreignId('idpinjam')->constrained('tbl_pinjam', 'idpinjam')->cascadeOnDelete();
            $table->foreignId('idbukudetail')->constrained('tbl_buku_detail', 'idbukudetail')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_pinjam_detail');
    }
};
