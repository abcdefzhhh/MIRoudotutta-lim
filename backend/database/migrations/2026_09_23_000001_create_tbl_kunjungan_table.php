<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('tbl_kunjungan')) {
            Schema::create('tbl_kunjungan', function (Blueprint $table) {
                $table->id('id_kunjungan');
                $table->unsignedBigInteger('idsiswa');
                $table->unsignedBigInteger('idpetugas')->nullable();
                $table->dateTime('waktu_kunjung');
                $table->string('keperluan', 100)->default('Membaca Buku');
                $table->timestamps();

                $table->foreign('idsiswa')->references('idsiswa')->on('tbl_siswa')->onDelete('cascade');
                $table->foreign('idpetugas')->references('id_user')->on('tbl_users')->onDelete('set null');
                $table->index('waktu_kunjung');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('tbl_kunjungan');
    }
};
