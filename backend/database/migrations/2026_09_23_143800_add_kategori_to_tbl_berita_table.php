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
        Schema::table('tbl_berita', function (Blueprint $table) {
            $table->string('kategori', 50)->default('Kegiatan')->after('isi_konten');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tbl_berita', function (Blueprint $table) {
            $table->dropColumn('kategori');
        });
    }
};
