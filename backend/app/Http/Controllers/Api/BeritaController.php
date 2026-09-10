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
}
