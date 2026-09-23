<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Siswa;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SiswaController extends Controller
{
    /**
     * Display a listing of students with pagination and search.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Siswa::with(['siswaKelas.kelasDetail.kelas']);

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('nama', 'like', "%{$s}%")
                  ->orWhere('nis', 'like', "%{$s}%")
                  ->orWhere('nisn', 'like', "%{$s}%");
            });
        }

        if ($request->filled('rombel')) {
            $r = $request->rombel;
            $query->whereHas('siswaKelas.kelasDetail.kelas', function ($q) use ($r) {
                $q->where('kelas', $r);
            });
        }

        $perPage = $request->input('per_page', 10);
        $siswa = $query->orderBy('nama', 'asc')->paginate($perPage);

        return response()->json([
            'success' => true,
            'message' => 'Data siswa berhasil dimuat.',
            'data' => $siswa,
        ]);
    }

    /**
     * Store a newly created student.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nis' => 'required|string|max:50|unique:tbl_siswa,nis',
            'nisn' => 'nullable|string|max:50',
            'nama' => 'required|string|max:150',
        ]);

        $siswa = Siswa::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Data siswa berhasil ditambahkan.',
            'data' => $siswa,
        ], 201);
    }

    /**
     * Display the specified student.
     */
    public function show(int $id): JsonResponse
    {
        $siswa = Siswa::with(['siswaKelas.kelasDetail.kelas', 'peminjaman'])->find($id);

        if (!$siswa) {
            return response()->json([
                'success' => false,
                'message' => 'Data siswa tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $siswa,
        ]);
    }

    /**
     * Update the specified student.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $siswa = Siswa::find($id);

        if (!$siswa) {
            return response()->json([
                'success' => false,
                'message' => 'Data siswa tidak ditemukan.',
            ], 404);
        }

        $validated = $request->validate([
            'nis' => 'required|string|max:50|unique:tbl_siswa,nis,' . $id . ',idsiswa',
            'nisn' => 'nullable|string|max:50',
            'nama' => 'required|string|max:150',
        ]);

        $siswa->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Data siswa berhasil diperbarui.',
            'data' => $siswa,
        ]);
    }

    /**
     * Remove the specified student.
     */
    public function destroy(int $id): JsonResponse
    {
        $siswa = Siswa::find($id);

        if (!$siswa) {
            return response()->json([
                'success' => false,
                'message' => 'Data siswa tidak ditemukan.',
            ], 404);
        }

        $siswa->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data siswa berhasil dihapus.',
        ]);
    }
}
