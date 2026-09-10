<?php

namespace App\Imports\Sheets;

use App\Models\Buku;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class BukuSheetImport implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            $isbn = $row['isbn'] ?? null;
            $judul = $row['judul_buku'] ?? $row['judul'] ?? null;

            if (empty($isbn) || empty($judul)) {
                continue;
            }

            $kodebuku = $row['kode_buku'] ?? $row['kodebuku'] ?? ('BK-' . substr(md5($isbn), 0, 5));
            $penulis = $row['penulis'] ?? '-';
            $penerbit = $row['penerbit'] ?? '-';
            $stok = isset($row['stok']) ? (int) $row['stok'] : 0;
            $stokTersedia = isset($row['stok_tersedia']) ? (int) $row['stok_tersedia'] : $stok;

            Buku::updateOrCreate(
                ['isbn' => (string) $isbn],
                [
                    'kodebuku' => (string) $kodebuku,
                    'judul' => (string) $judul,
                    'penulis' => (string) $penulis,
                    'penerbit' => (string) $penerbit,
                    'stok' => $stok,
                    'stok_tersedia' => $stokTersedia,
                ]
            );
        }
    }
}
