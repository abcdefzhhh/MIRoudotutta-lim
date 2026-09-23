<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Buku;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BukuController extends Controller
{
    /**
     * Display a listing of books with physical copy details.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Buku::with('details');

        if ($request->has('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('judul', 'like', "%{$s}%")
                  ->orWhere('penulis', 'like', "%{$s}%")
                  ->orWhere('penerbit', 'like', "%{$s}%")
                  ->orWhere('isbn', 'like', "%{$s}%");
            });
        }

        $buku = $query->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $buku,
        ]);
    }

    /**
     * Store a newly created book.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'isbn' => 'required|string|max:50|unique:tbl_buku,isbn',
            'kodebuku' => 'required|string|max:50',
            'judul' => 'required|string|max:255',
            'penulis' => 'required|string|max:150',
            'penerbit' => 'required|string|max:150',
            'stok' => 'required|integer|min:0',
        ]);

        $validated['stok_tersedia'] = $validated['stok'];
        $buku = Buku::create($validated);

        // Auto-generate tbl_buku_detail according to stok
        for ($i = 1; $i <= $buku->stok; $i++) {
            \App\Models\BukuDetail::create([
                'idbuku' => $buku->idbuku,
                'kodebukudetail' => 'BK-' . $buku->idbuku . '-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'kondisi' => 'baik',
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Buku berhasil ditambahkan beserta detail eksemplar fisik.',
            'data' => $buku->load('details'),
        ], 201);
    }

    /**
     * Display the specified book.
     */
    public function show(int $id): JsonResponse
    {
        $buku = Buku::with('details')->find($id);

        if (!$buku) {
            return response()->json([
                'success' => false,
                'message' => 'Buku tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $buku,
        ]);
    }

    /**
     * Update the specified book.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $buku = Buku::find($id);

        if (!$buku) {
            return response()->json([
                'success' => false,
                'message' => 'Buku tidak ditemukan.',
            ], 404);
        }

        $validated = $request->validate([
            'isbn' => 'required|string|max:50|unique:tbl_buku,isbn,' . $id . ',idbuku',
            'kodebuku' => 'required|string|max:50',
            'judul' => 'required|string|max:255',
            'penulis' => 'required|string|max:150',
            'penerbit' => 'required|string|max:150',
            'stok' => 'required|integer|min:0',
        ]);

        $diffStok = $validated['stok'] - $buku->stok;
        $validated['stok_tersedia'] = max(0, $buku->stok_tersedia + $diffStok);

        $buku->update($validated);

        // If stock increased, add more copy details
        if ($diffStok > 0) {
            $existingCount = \App\Models\BukuDetail::where('idbuku', $buku->idbuku)->count();
            for ($i = 1; $i <= $diffStok; $i++) {
                \App\Models\BukuDetail::create([
                    'idbuku' => $buku->idbuku,
                    'kodebukudetail' => 'BK-' . $buku->idbuku . '-' . str_pad($existingCount + $i, 3, '0', STR_PAD_LEFT),
                    'kondisi' => 'baik',
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Data buku berhasil diperbarui.',
            'data' => $buku->load('details'),
        ]);
    }

    /**
     * Remove the specified book.
     */
    public function destroy(int $id): JsonResponse
    {
        $buku = Buku::find($id);

        if (!$buku) {
            return response()->json([
                'success' => false,
                'message' => 'Buku tidak ditemukan.',
            ], 404);
        }

        $buku->delete();

        return response()->json([
            'success' => true,
            'message' => 'Buku berhasil dihapus.',
        ]);
    }
}
