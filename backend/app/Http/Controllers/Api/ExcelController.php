<?php

namespace App\Http\Controllers\Api;

use App\Exports\MultiDataExport;
use App\Http\Controllers\Controller;
use App\Imports\MultiDataImport;
use App\Models\Buku;
use App\Models\Guru;
use App\Models\Siswa;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ExcelController extends Controller
{
    /**
     * Download multi-sheet Excel (Siswa, Guru, Buku).
     *
     * @return BinaryFileResponse
     */
    public function export()
    {
        $fileName = 'siperpus_mi_data_master_' . date('Ymd_His') . '.xlsx';
        return Excel::download(new MultiDataExport, $fileName);
    }

    /**
     * Import multi-sheet Excel (Siswa, Guru, Buku) using DB Transaction.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function import(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls|max:10240',
        ]);

        try {
            DB::transaction(function () use ($request) {
                Excel::import(new MultiDataImport, $request->file('file'));
            });

            return response()->json([
                'success' => true,
                'message' => 'Data Multi-Sheet Excel (Siswa, Guru, Buku) berhasil diimpor ke database.',
                'data' => [
                    'total_siswa' => Siswa::count(),
                    'total_guru' => Guru::count(),
                    'total_buku' => Buku::count(),
                ],
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengimpor file Excel: ' . $e->getMessage(),
            ], 500);
        }
    }
}
