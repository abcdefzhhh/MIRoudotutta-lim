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
        Schema::create('tbl_siswa_kelas', function (Blueprint $table) {
            $table->id('idsiswakelas');
            $table->foreignId('idsiswa')->constrained('tbl_siswa', 'idsiswa')->cascadeOnDelete();
            $table->foreignId('idkelasdetail')->constrained('tbl_kelas_detail', 'idkelasdetail')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_siswa_kelas');
    }
};
