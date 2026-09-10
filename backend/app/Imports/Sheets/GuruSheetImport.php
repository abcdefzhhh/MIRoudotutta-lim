<?php

namespace App\Imports\Sheets;

use App\Models\Guru;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class GuruSheetImport implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            $nip = $row['nip'] ?? null;
            $namaGuru = $row['nama_guru'] ?? $row['nama'] ?? null;

            if (empty($nip) || empty($namaGuru)) {
                continue;
            }

            $noHp = $row['no_hp'] ?? $row['nohp'] ?? null;

            Guru::updateOrCreate(
                ['nip' => (string) $nip],
                [
                    'nama_guru' => (string) $namaGuru,
                    'no_hp' => $noHp ? (string) $noHp : null,
                ]
            );
        }
    }
}
