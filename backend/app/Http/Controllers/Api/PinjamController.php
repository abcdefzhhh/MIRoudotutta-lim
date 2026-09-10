<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pinjam;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PinjamController extends Controller
{
    /**
     * Display a listing of loans.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Pinjam::with(['siswa', 'petugas', 'pinjamDetails.bukuDetail.buku']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $pinjam = $query->latest('idpinjam')->paginate(10);

        return response()->json([
            'success' => true,
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
