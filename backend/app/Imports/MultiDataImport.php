<?php

namespace App\Imports;

use App\Imports\Sheets\BukuSheetImport;
use App\Imports\Sheets\GuruSheetImport;
use App\Imports\Sheets\SiswaSheetImport;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class MultiDataImport implements WithMultipleSheets
{
    /**
     * @return array
     */
    public function sheets(): array
    {
        return [
            'Siswa' => new SiswaSheetImport(),
            'Guru'  => new GuruSheetImport(),
            'Buku'  => new BukuSheetImport(),
        ];
    }
}
