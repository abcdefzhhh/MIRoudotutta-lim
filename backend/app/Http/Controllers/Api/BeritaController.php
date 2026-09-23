<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BeritaController extends Controller
{
    /**
     * Display a listing of news.
     */
    public function index(): JsonResponse
    {
        $berita = Berita::latest('tgl_publish')->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $berita,
        ]);
    }

    /**
     * Show single news by slug.
     */
    public function show(string $slug): JsonResponse
    {
        $berita = Berita::where('slug', $slug)->first();

        if (!$berita) {
            return response()->json([
                'success' => false,
                'message' => 'Berita tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $berita,
        ]);
    }

    /**
     * Store a newly created news article.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'isi_konten' => 'required|string',
            'tgl_publish' => 'nullable|date',
            'foto' => 'nullable|file|image|mimes:jpeg,png,jpg,webp,gif|max:5120',
            'gambar_thumbnail' => 'nullable',
        ]);

        $baseSlug = \Illuminate\Support\Str::slug($request->judul);
        $slug = $baseSlug;
        $counter = 1;
        while (Berita::where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        $data = [
            'judul' => $request->judul,
            'slug' => $slug,
            'isi_konten' => $request->isi_konten,
            'tgl_publish' => $request->tgl_publish ?? now(),
        ];

        // Handle uploaded photo
        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $filename = 'berita_' . time() . '_' . \Illuminate\Support\Str::random(6) . '.' . $file->getClientOriginalExtension();
            $destination = public_path('uploads/berita');
            if (!file_exists($destination)) {
                mkdir($destination, 0755, true);
            }
            $file->move($destination, $filename);
            $data['gambar_thumbnail'] = 'uploads/berita/' . $filename;
        } elseif ($request->filled('gambar_thumbnail')) {
            $data['gambar_thumbnail'] = $request->gambar_thumbnail;
        } else {
            $data['gambar_thumbnail'] = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBePtJMaCotwUdo_WVJlOrgnrXRzFsC9mCFuCnJrbbzK08aZUjZ_F5K_BmIDAZKIFMKDQhJmVn3C8SiPobA44tHCsNDPD52AKiuutsgnrgBHo5gVVnFsZlFOVd11qSda7EjMzirIGi92dBE9dPD24vhJQ30BbUBeh91fZpeWcRJ_8Kqymu0Awmfth_MEAkC_xsX6vOBjSfYy1LUSYwIfY4FDLtuISJggPnPsMGAxDTLLiIJV1Fe9PslNA';
        }

        $berita = Berita::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Berita berhasil dipublikasikan.',
            'data' => $berita,
        ], 201);
    }

    /**
     * Update the specified news article.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $berita = Berita::find($id);

        if (!$berita) {
            return response()->json([
                'success' => false,
                'message' => 'Berita tidak ditemukan.',
            ], 404);
        }

        $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'isi_konten' => 'sometimes|required|string',
            'tgl_publish' => 'nullable|date',
            'foto' => 'nullable|file|image|mimes:jpeg,png,jpg,webp,gif|max:5120',
            'gambar_thumbnail' => 'nullable',
        ]);

        $data = [];
        if ($request->has('judul')) {
            $data['judul'] = $request->judul;
            if ($request->judul !== $berita->judul) {
                $baseSlug = \Illuminate\Support\Str::slug($request->judul);
                $slug = $baseSlug;
                $counter = 1;
                while (Berita::where('slug', $slug)->where('id_berita', '!=', $id)->exists()) {
                    $slug = "{$baseSlug}-{$counter}";
                    $counter++;
                }
                $data['slug'] = $slug;
            }
        }

        if ($request->has('isi_konten')) {
            $data['isi_konten'] = $request->isi_konten;
        }

        if ($request->has('tgl_publish')) {
            $data['tgl_publish'] = $request->tgl_publish;
        }

        // Handle uploaded photo on update
        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $filename = 'berita_' . time() . '_' . \Illuminate\Support\Str::random(6) . '.' . $file->getClientOriginalExtension();
            $destination = public_path('uploads/berita');
            if (!file_exists($destination)) {
                mkdir($destination, 0755, true);
            }
            $file->move($destination, $filename);
            $data['gambar_thumbnail'] = 'uploads/berita/' . $filename;
        } elseif ($request->filled('gambar_thumbnail')) {
            $data['gambar_thumbnail'] = $request->gambar_thumbnail;
        }

        $berita->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Berita berhasil diperbarui.',
            'data' => $berita,
        ]);
    }

    /**
     * Remove the specified news article.
     */
    public function destroy(int $id): JsonResponse
    {
        $berita = Berita::find($id);

        if (!$berita) {
            return response()->json([
                'success' => false,
                'message' => 'Berita tidak ditemukan.',
            ], 404);
        }

        $berita->delete();

        return response()->json([
            'success' => true,
            'message' => 'Berita berhasil dihapus.',
        ]);
    }
}

