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
        Schema::create('tbl_kelas_detail', function (Blueprint $table) {
            $table->id('idkelasdetail');
            $table->foreignId('idkelas')->constrained('tbl_kelas', 'idkelas')->cascadeOnDelete();
            $table->foreignId('idguru')->constrained('tbl_guru', 'idguru')->cascadeOnDelete();
            $table->foreignId('idthahunajaran')->constrained('tbl_tahun_ajaran', 'idthnajaran')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_kelas_detail');
    }
};
