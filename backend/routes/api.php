<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BeritaController;
use App\Http\Controllers\Api\BukuController;
use App\Http\Controllers\Api\ExcelController;
use App\Http\Controllers\Api\PinjamController;
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

// Katalog Buku
Route::get('/buku', [BukuController::class, 'index']);
Route::get('/buku/{id}', [BukuController::class, 'show']);
Route::post('/buku', [BukuController::class, 'store']);

// Transaksi Peminjaman
Route::get('/pinjam', [PinjamController::class, 'index']);
Route::get('/pinjam/{id}', [PinjamController::class, 'show']);

// Berita Madrasah
Route::get('/berita', [BeritaController::class, 'index']);
Route::get('/berita/{slug}', [BeritaController::class, 'show']);
