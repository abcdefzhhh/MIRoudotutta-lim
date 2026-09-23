<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TahunAjaran;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TahunAjaranController extends Controller
{
    /**
     * Display a listing of academic years.
     */
    public function index(): JsonResponse
    {
        $tahun = TahunAjaran::withCount(['kelasDetails as total_rombel'])
            ->orderBy('thnajaran', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar tahun ajaran berhasil dimuat.',
            'data' => $tahun,
        ]);
    }

    /**
     * Store a newly created academic year.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'thnajaran' => 'required|string|max:20|unique:tbl_tahun_ajaran,thnajaran',
            'tglmulai' => 'required|date',
        ]);

        $tahun = TahunAjaran::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Tahun ajaran baru berhasil ditambahkan.',
            'data' => $tahun,
        ], 201);
    }

    /**
     * Update the specified academic year.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $tahun = TahunAjaran::find($id);

        if (!$tahun) {
            return response()->json([
                'success' => false,
                'message' => 'Tahun ajaran tidak ditemukan.',
            ], 404);
        }

        $validated = $request->validate([
            'thnajaran' => 'required|string|max:20|unique:tbl_tahun_ajaran,thnajaran,' . $id . ',idthnajaran',
            'tglmulai' => 'required|date',
        ]);

        $tahun->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Tahun ajaran berhasil diperbarui.',
            'data' => $tahun,
        ]);
    }

    /**
     * Remove the specified academic year.
     */
    public function destroy(int $id): JsonResponse
    {
        $tahun = TahunAjaran::find($id);

        if (!$tahun) {
            return response()->json([
                'success' => false,
                'message' => 'Tahun ajaran tidak ditemukan.',
            ], 404);
        }

        if ($tahun->kelasDetails()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Tahun ajaran tidak dapat dihapus karena masih terkait dengan data rombel aktif.',
            ], 422);
        }

        $tahun->delete();

        return response()->json([
            'success' => true,
            'message' => 'Tahun ajaran berhasil dihapus.',
        ]);
    }
}
