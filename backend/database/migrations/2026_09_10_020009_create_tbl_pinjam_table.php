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
        Schema::create('tbl_pinjam', function (Blueprint $table) {
            $table->id('idpinjam');
            $table->foreignId('idsiswa')->constrained('tbl_siswa', 'idsiswa')->cascadeOnDelete();
            $table->foreignId('idpetugas')->constrained('tbl_users', 'id_user')->cascadeOnDelete();
            $table->dateTime('waktu');
            $table->date('tgl_batas_kembali');
            $table->date('tgl_dikembalikan')->nullable();
            $table->enum('status', ['dipinjam', 'dikembalikan', 'terlambat'])->default('dipinjam');
            $table->decimal('total_denda', 12, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_pinjam');
    }
};
