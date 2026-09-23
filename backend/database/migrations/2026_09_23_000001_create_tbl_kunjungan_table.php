<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('tbl_kunjungan')) {
            Schema::create('tbl_kunjungan', function (Blueprint ) {
                ->id('id_kunjungan');
                ->unsignedBigInteger('idsiswa');
                ->unsignedBigInteger('idpetugas')->nullable();
                ->dateTime('waktu_kunjung');
                ->string('keperluan', 100)->default('Membaca Buku');
                ->timestamps();

                ->foreign('idsiswa')->references('idsiswa')->on('tbl_siswa')->onDelete('cascade');
                ->foreign('idpetugas')->references('id_user')->on('tbl_users')->onDelete('set null');
                ->index('waktu_kunjung');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('tbl_kunjungan');
    }
};
