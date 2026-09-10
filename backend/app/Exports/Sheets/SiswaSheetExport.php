<?php

namespace App\Exports\Sheets;

use App\Models\Siswa;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;

class SiswaSheetExport implements FromCollection, WithTitle, WithHeadings, WithMapping, ShouldAutoSize
{
    public function collection()
    {
        return Siswa::orderBy('idsiswa')->get();
    }

    public function title(): string
    {
        return 'Siswa';
    }

    public function headings(): array
    {
        return [
            'ID Siswa',
            'NIS',
            'NISN',
            'Nama Siswa',
        ];
    }

    /**
     * @param Siswa $row
     */
    public function map($row): array
    {
        return [
            $row->idsiswa,
            $row->nis,
            $row->nisn,
            $row->nama,
        ];
    }
}
