<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pinjam;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PinjamController extends Controller
{
    /**
     * Display a listing of loans with filtering, search, date range, and summary metrics.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Pinjam::with([
            'siswa.siswaKelas.kelasDetail.kelas',
            'petugas',
            'pinjamDetails.bukuDetail.buku',
        ]);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->whereHas('siswa', function ($sq) use ($s) {
                    $sq->where('nama', 'like', "%{$s}%")
                       ->orWhere('nis', 'like', "%{$s}%");
                })->orWhereHas('pinjamDetails.bukuDetail.buku', function ($bq) use ($s) {
                    $bq->where('judul', 'like', "%{$s}%")
                       ->orWhere('kodebuku', 'like', "%{$s}%");
                })->orWhereHas('pinjamDetails.bukuDetail', function ($bdq) use ($s) {
                    $bdq->where('kodebukudetail', 'like', "%{$s}%");
                });
            });
        }

        if ($request->filled('tgl_mulai')) {
            $query->whereDate('waktu', '>=', $request->tgl_mulai);
        }

        if ($request->filled('tgl_selesai')) {
            $query->whereDate('waktu', '<=', $request->tgl_selesai);
        }

        $perPage = $request->input('per_page', 15);
        $pinjam = $query->latest('idpinjam')->paginate($perPage);

        // Calculate summary metrics for report cards
        $metrics = [
            'total_transaksi' => Pinjam::count(),
            'dipinjam_aktif' => Pinjam::where('status', 'dipinjam')->count(),
            'sudah_kembali' => Pinjam::where('status', 'dikembalikan')->count(),
            'terlambat' => Pinjam::where('status', 'terlambat')->count(),
            'total_denda' => (float) Pinjam::sum('total_denda'),
        ];

        return response()->json([
            'success' => true,
            'message' => 'Laporan data peminjaman berhasil dimuat.',
            'metrics' => $metrics,
            'data' => $pinjam,
        ]);
    }

    /**
     * Show loan details.
     */
    public function show(int $id): JsonResponse
    {
        $pinjam = Pinjam::with(['siswa', 'petugas', 'pinjamDetails.bukuDetail.buku'])->find($id);

        if (!$pinjam) {
            return response()->json([
                'success' => false,
                'message' => 'Data peminjaman tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $pinjam,
        ]);
    }
}
