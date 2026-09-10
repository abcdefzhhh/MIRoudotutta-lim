<?php

namespace App\Exports;

use App\Exports\Sheets\BukuSheetExport;
use App\Exports\Sheets\GuruSheetExport;
use App\Exports\Sheets\SiswaSheetExport;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class MultiDataExport implements WithMultipleSheets
{
    /**
     * @return array
     */
    public function sheets(): array
    {
        return [
            new SiswaSheetExport(),
            new GuruSheetExport(),
            new BukuSheetExport(),
        ];
    }
}
