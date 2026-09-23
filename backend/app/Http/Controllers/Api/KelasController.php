<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class KelasController extends Controller
{
    /**
     * Display a listing of classes.
     */
    public function index(): JsonResponse
    {
        $kelas = Kelas::withCount(['kelasDetails as total_rombel'])
            ->orderBy('tingkat')
            ->orderBy('kelas')
            ->get();

        // Calculate total students assigned through all rombel of each class
        $kelas->map(function ($k) {
            $k->total_siswa = \App\Models\SiswaKelas::whereIn(
                'idkelasdetail',
                $k->kelasDetails()->pluck('idkelasdetail')
            )->count();
            return $k;
        });

        return response()->json([
            'success' => true,
            'message' => 'Daftar data kelas berhasil dimuat.',
            'data' => $kelas,
        ]);
    }

    /**
     * Store a newly created class.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'kelas' => 'required|string|max:50|unique:tbl_kelas,kelas',
            'tingkat' => 'required|integer|min:1|max:6',
        ]);

        $kelas = Kelas::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Data kelas berhasil ditambahkan.',
            'data' => $kelas,
        ], 201);
    }

    /**
     * Display the specified class.
     */
    public function show(int $id): JsonResponse
    {
        $kelas = Kelas::with(['kelasDetails.guru', 'kelasDetails.tahunAjaran'])->find($id);

        if (!$kelas) {
            return response()->json([
                'success' => false,
                'message' => 'Kelas tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $kelas,
        ]);
    }

    /**
     * Update the specified class.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $kelas = Kelas::find($id);

        if (!$kelas) {
            return response()->json([
                'success' => false,
                'message' => 'Kelas tidak ditemukan.',
            ], 404);
        }

        $validated = $request->validate([
            'kelas' => 'required|string|max:50|unique:tbl_kelas,kelas,' . $id . ',idkelas',
            'tingkat' => 'required|integer|min:1|max:6',
        ]);

        $kelas->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Data kelas berhasil diperbarui.',
            'data' => $kelas,
        ]);
    }

    /**
     * Remove the specified class.
     */
    public function destroy(int $id): JsonResponse
    {
        $kelas = Kelas::find($id);

        if (!$kelas) {
            return response()->json([
                'success' => false,
                'message' => 'Kelas tidak ditemukan.',
            ], 404);
        }

        // Check if class has rombel attached
        if ($kelas->kelasDetails()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Kelas tidak dapat dihapus karena masih memiliki rombel / tahun ajaran aktif.',
            ], 422);
        }

        $kelas->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data kelas berhasil dihapus.',
        ]);
    }
}
