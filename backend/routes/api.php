<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BeritaController;
use App\Http\Controllers\Api\BukuController;
use App\Http\Controllers\Api\ExcelController;
use App\Http\Controllers\Api\GuruController;
use App\Http\Controllers\Api\KelasController;
use App\Http\Controllers\Api\PinjamController;
use App\Http\Controllers\Api\RombelController;
use App\Http\Controllers\Api\SiperpusApiController;
use App\Http\Controllers\Api\SiswaController;
use App\Http\Controllers\Api\TahunAjaranController;
use App\Models\Berita;
use App\Models\Buku;
use App\Models\BukuDetail;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\KelasDetail;
use App\Models\Pinjam;
use App\Models\Siswa;
use App\Models\TahunAjaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - SIPERPUS MI Roudotutta'lim
|--------------------------------------------------------------------------
*/

// Health / Welcome Check
Route::get('/status', function () {
    return response()->json([
        'app' => "SIPERPUS MI Roudotutta'lim API",
        'version' => '1.0.0',
        'status' => 'online',
        'timestamp' => now()->toIso8601String(),
    ]);
});

// Admin Dashboard Summary Statistics
Route::get('/stats', function () {
    return response()->json([
        'success' => true,
        'data' => [
            'total_siswa' => Siswa::count(),
            'total_guru' => Guru::count(),
            'total_kelas' => Kelas::count(),
            'total_rombel' => KelasDetail::count(),
            'total_buku' => Buku::count(),
            'total_eksemplar' => BukuDetail::count(),
            'total_berita' => Berita::count(),
            'pinjam_aktif' => Pinjam::where('status', 'dipinjam')->count(),
        ],
    ]);
});

// Authentication
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Multi-Sheet Excel Export & Import
Route::prefix('excel')->group(function () {
    Route::get('/export', [ExcelController::class, 'export'])->name('api.excel.export');
    Route::post('/import', [ExcelController::class, 'import'])->name('api.excel.import');
});

// Master Data Siswa
Route::get('/siswa', [SiswaController::class, 'index']);
Route::get('/siswa/{id}', [SiswaController::class, 'show']);
Route::post('/siswa', [SiswaController::class, 'store']);
Route::put('/siswa/{id}', [SiswaController::class, 'update']);
Route::delete('/siswa/{id}', [SiswaController::class, 'destroy']);

// Master Data Guru
Route::get('/guru', [GuruController::class, 'index']);
Route::get('/guru/{id}', [GuruController::class, 'show']);
Route::post('/guru', [GuruController::class, 'store']);
Route::put('/guru/{id}', [GuruController::class, 'update']);
Route::delete('/guru/{id}', [GuruController::class, 'destroy']);

// Master Data Kelas
Route::get('/kelas', [KelasController::class, 'index']);
Route::get('/kelas/{id}', [KelasController::class, 'show']);
Route::post('/kelas', [KelasController::class, 'store']);
Route::put('/kelas/{id}', [KelasController::class, 'update']);
Route::delete('/kelas/{id}', [KelasController::class, 'destroy']);

// Master Data Tahun Ajaran
Route::get('/tahun-ajaran', [TahunAjaranController::class, 'index']);
Route::post('/tahun-ajaran', [TahunAjaranController::class, 'store']);
Route::put('/tahun-ajaran/{id}', [TahunAjaranController::class, 'update']);
Route::delete('/tahun-ajaran/{id}', [TahunAjaranController::class, 'destroy']);

// Rombongan Belajar (Rombel)
Route::get('/rombel', [RombelController::class, 'index']);
Route::get('/rombel/{id}', [RombelController::class, 'show']);
Route::post('/rombel', [RombelController::class, 'store']);
Route::put('/rombel/{id}', [RombelController::class, 'update']);
Route::delete('/rombel/{id}', [RombelController::class, 'destroy']);
Route::get('/rombel/{id}/available-siswa', [RombelController::class, 'getAvailableSiswa']);
Route::post('/rombel/{id}/siswa', [RombelController::class, 'addSiswa']);
Route::delete('/rombel/{id}/siswa/{idsiswa}', [RombelController::class, 'removeSiswa']);

// Katalog Buku
Route::get('/buku', [BukuController::class, 'index']);
Route::get('/buku/{id}', [BukuController::class, 'show']);
Route::post('/buku', [BukuController::class, 'store']);
Route::put('/buku/{id}', [BukuController::class, 'update']);
Route::delete('/buku/{id}', [BukuController::class, 'destroy']);

// Transaksi Peminjaman
Route::get('/pinjam', [PinjamController::class, 'index']);
Route::get('/pinjam/{id}', [PinjamController::class, 'show']);
Route::post('/pinjam', [SiperpusApiController::class, 'submitPeminjaman']);
Route::post('/pinjam/kolektif', [SiperpusApiController::class, 'submitPeminjamanKolektif']);
Route::post('/kembali/kolektif/{idpinjam?}', [SiperpusApiController::class, 'submitPengembalianKolektif']);
Route::post('/kembali', [SiperpusApiController::class, 'submitPengembalian']);

// Berita Madrasah
Route::get('/berita', [BeritaController::class, 'index']);
Route::get('/berita/{slug}', [BeritaController::class, 'show']);
Route::post('/berita', [BeritaController::class, 'store']);
Route::put('/berita/{id}', [BeritaController::class, 'update']);
Route::post('/berita/{id}', [BeritaController::class, 'update']);
Route::delete('/berita/{id}', [BeritaController::class, 'destroy']);


// Layanan Sirkulasi Mobile SIPERPUS (Barcode Scanner & Mobile Service)
Route::prefix('siperpus')->group(function () {
    Route::post('/buku/{kode}/kondisi', [SiperpusApiController::class, 'updateKondisiBuku']);

    Route::get('/scan/siswa/{nis}', [SiperpusApiController::class, 'scanSiswa']);
    Route::get('/scan/buku/{kode}', [SiperpusApiController::class, 'scanBuku']);
    Route::post('/pinjam', [SiperpusApiController::class, 'submitPeminjaman']);
    Route::get('/scan/kembali/{kode}', [SiperpusApiController::class, 'scanPengembalian']);
    Route::post('/kembali', [SiperpusApiController::class, 'submitPengembalian']);
    Route::get('/statistik', [SiperpusApiController::class, 'getStatistik']);
    Route::get('/riwayat', [SiperpusApiController::class, 'getRiwayat']);
    Route::post('/kunjungan', [SiperpusApiController::class, 'recordKunjungan']);
    Route::get('/kunjungan/hari-ini', [SiperpusApiController::class, 'getKunjunganHariIni']);

    // Peminjaman & Pengembalian Kolektif Kelas (Paket Jam Pelajaran)
    Route::get('/buku/kolektif', [SiperpusApiController::class, 'getBukuKolektif']);
    Route::get('/pinjam/kolektif/aktif', [SiperpusApiController::class, 'getPinjamKolektifAktif']);
    Route::post('/pinjam/kolektif', [SiperpusApiController::class, 'submitPeminjamanKolektif']);
    Route::post('/kembali/kolektif/{idpinjam?}', [SiperpusApiController::class, 'submitPengembalianKolektif']);
});
