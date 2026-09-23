<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Guru;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GuruController extends Controller
{
    /**
     * Display a listing of teachers with pagination and search.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Guru::with(['kelasDetails.kelas']);

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('nama_guru', 'like', "%{$s}%")
                  ->orWhere('nip', 'like', "%{$s}%")
                  ->orWhere('no_hp', 'like', "%{$s}%");
            });
        }

        $perPage = $request->input('per_page', 10);
        $guru = $query->orderBy('nama_guru', 'asc')->paginate($perPage);

        return response()->json([
            'success' => true,
            'message' => 'Data guru berhasil dimuat.',
            'data' => $guru,
        ]);
    }

    /**
     * Store a newly created teacher.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nip' => 'required|string|max:50|unique:tbl_guru,nip',
            'nama_guru' => 'required|string|max:150',
            'no_hp' => 'nullable|string|max:20',
        ]);

        $guru = Guru::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Data guru berhasil ditambahkan.',
            'data' => $guru,
        ], 201);
    }

    /**
     * Display the specified teacher.
     */
    public function show(int $id): JsonResponse
    {
        $guru = Guru::with(['kelasDetails.kelas'])->find($id);

        if (!$guru) {
            return response()->json([
                'success' => false,
                'message' => 'Data guru tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $guru,
        ]);
    }

    /**
     * Update the specified teacher.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $guru = Guru::find($id);

        if (!$guru) {
            return response()->json([
                'success' => false,
                'message' => 'Data guru tidak ditemukan.',
            ], 404);
        }

        $validated = $request->validate([
            'nip' => 'required|string|max:50|unique:tbl_guru,nip,' . $id . ',idguru',
            'nama_guru' => 'required|string|max:150',
            'no_hp' => 'nullable|string|max:20',
        ]);

        $guru->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Data guru berhasil diperbarui.',
            'data' => $guru,
        ]);
    }

    /**
     * Remove the specified teacher.
     */
    public function destroy(int $id): JsonResponse
    {
        $guru = Guru::find($id);

        if (!$guru) {
            return response()->json([
                'success' => false,
                'message' => 'Data guru tidak ditemukan.',
            ], 404);
        }

        $guru->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data guru berhasil dihapus.',
        ]);
    }
}
