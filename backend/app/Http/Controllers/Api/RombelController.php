<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\KelasDetail;
use App\Models\Siswa;
use App\Models\SiswaKelas;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RombelController extends Controller
{
    /**
     * Display a listing of rombel (class groupings).
     */
    public function index(Request $request): JsonResponse
    {
        $query = KelasDetail::with(['kelas', 'guru', 'tahunAjaran'])
            ->withCount('siswaKelas as total_siswa');

        if ($request->filled('idthahunajaran')) {
            $query->where('idthahunajaran', $request->idthahunajaran);
        }

        if ($request->filled('tingkat')) {
            $query->whereHas('kelas', function ($q) use ($request) {
                $q->where('tingkat', $request->tingkat);
            });
        }

        $rombels = $query->get()->sortBy([
            ['kelas.tingkat', 'asc'],
            ['kelas.kelas', 'asc'],
        ])->values();

        return response()->json([
            'success' => true,
            'message' => 'Daftar rombongan belajar berhasil dimuat.',
            'data' => $rombels,
        ]);
    }

    /**
     * Display the specified rombel with list of assigned students.
     */
    public function show(int $id): JsonResponse
    {
        $rombel = KelasDetail::with([
            'kelas',
            'guru',
            'tahunAjaran',
            'siswaKelas.siswa' => function ($q) {
                $q->orderBy('nama', 'asc');
            },
        ])->find($id);

        if (!$rombel) {
            return response()->json([
                'success' => false,
                'message' => 'Rombongan belajar tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $rombel,
        ]);
    }

    /**
     * Store a newly created rombel.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'idkelas' => 'required|exists:tbl_kelas,idkelas',
            'idguru' => 'required|exists:tbl_guru,idguru',
            'idthahunajaran' => 'required|exists:tbl_tahun_ajaran,idthnajaran',
        ]);

        // Check if class already exists in the same academic year
        $exists = KelasDetail::where('idkelas', $validated['idkelas'])
            ->where('idthahunajaran', $validated['idthahunajaran'])
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Kelas ini sudah terdaftar sebagai rombel pada tahun ajaran yang dipilih.',
            ], 422);
        }

        $rombel = KelasDetail::create($validated);
        $rombel->load(['kelas', 'guru', 'tahunAjaran']);

        return response()->json([
            'success' => true,
            'message' => 'Rombongan belajar berhasil dibuat.',
            'data' => $rombel,
        ], 201);
    }

    /**
     * Update the specified rombel.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $rombel = KelasDetail::find($id);

        if (!$rombel) {
            return response()->json([
                'success' => false,
                'message' => 'Rombongan belajar tidak ditemukan.',
            ], 404);
        }

        $validated = $request->validate([
            'idkelas' => 'required|exists:tbl_kelas,idkelas',
            'idguru' => 'required|exists:tbl_guru,idguru',
            'idthahunajaran' => 'required|exists:tbl_tahun_ajaran,idthnajaran',
        ]);

        // Check if another rombel has the same class in this academic year
        $duplicate = KelasDetail::where('idkelas', $validated['idkelas'])
            ->where('idthahunajaran', $validated['idthahunajaran'])
            ->where('idkelasdetail', '!=', $id)
            ->exists();

        if ($duplicate) {
            return response()->json([
                'success' => false,
                'message' => 'Kelas ini sudah digunakan pada tahun ajaran tersebut.',
            ], 422);
        }

        $rombel->update($validated);
        $rombel->load(['kelas', 'guru', 'tahunAjaran']);

        return response()->json([
            'success' => true,
            'message' => 'Rombongan belajar berhasil diperbarui.',
            'data' => $rombel,
        ]);
    }

    /**
     * Remove the specified rombel.
     */
    public function destroy(int $id): JsonResponse
    {
        $rombel = KelasDetail::find($id);

        if (!$rombel) {
            return response()->json([
                'success' => false,
                'message' => 'Rombongan belajar tidak ditemukan.',
            ], 404);
        }

        $rombel->delete();

        return response()->json([
            'success' => true,
            'message' => 'Rombongan belajar berhasil dihapus.',
        ]);
    }

    /**
     * Add student to this rombel.
     */
    public function addSiswa(Request $request, int $id): JsonResponse
    {
        $rombel = KelasDetail::find($id);

        if (!$rombel) {
            return response()->json([
                'success' => false,
                'message' => 'Rombongan belajar tidak ditemukan.',
            ], 404);
        }

        $request->validate([
            'idsiswa' => 'required|exists:tbl_siswa,idsiswa',
        ]);

        $idsiswa = $request->idsiswa;

        // Check if student is already in this rombel
        $exists = SiswaKelas::where('idkelasdetail', $id)
            ->where('idsiswa', $idsiswa)
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Siswa sudah terdaftar di dalam rombel ini.',
            ], 422);
        }

        $siswaKelas = SiswaKelas::create([
            'idkelasdetail' => $id,
            'idsiswa' => $idsiswa,
        ]);

        $siswaKelas->load('siswa');

        return response()->json([
            'success' => true,
            'message' => 'Siswa berhasil dimasukkan ke rombel.',
            'data' => $siswaKelas,
        ], 201);
    }

    /**
     * Remove student from this rombel.
     */
    public function removeSiswa(int $id, int $idsiswa): JsonResponse
    {
        $membership = SiswaKelas::where('idkelasdetail', $id)
            ->where('idsiswa', $idsiswa)
            ->first();

        if (!$membership) {
            return response()->json([
                'success' => false,
                'message' => 'Siswa tidak ditemukan di dalam rombel ini.',
            ], 404);
        }

        $membership->delete();

        return response()->json([
            'success' => true,
            'message' => 'Siswa berhasil dikeluarkan dari rombel.',
        ]);
    }

    /**
     * Get students not yet assigned to this rombel.
     */
    public function getAvailableSiswa(int $id): JsonResponse
    {
        $assignedIds = SiswaKelas::where('idkelasdetail', $id)->pluck('idsiswa');

        $available = Siswa::whereNotIn('idsiswa', $assignedIds)
            ->orderBy('nama', 'asc')
            ->get(['idsiswa', 'nis', 'nisn', 'nama']);

        return response()->json([
            'success' => true,
            'data' => $available,
        ]);
    }
}
