<?php

namespace App\Imports\Sheets;

use App\Models\Siswa;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class SiswaSheetImport implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            $nis = $row['nis'] ?? null;
            $nama = $row['nama_siswa'] ?? $row['nama'] ?? null;

            if (empty($nis) || empty($nama)) {
                continue;
            }

            $nisn = $row['nisn'] ?? null;

            Siswa::updateOrCreate(
                ['nis' => (string) $nis],
                [
                    'nisn' => $nisn ? (string) $nisn : null,
                    'nama' => (string) $nama,
                ]
            );
        }
    }
}
