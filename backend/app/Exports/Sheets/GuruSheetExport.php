<?php

namespace App\Exports\Sheets;

use App\Models\Guru;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;

class GuruSheetExport implements FromCollection, WithTitle, WithHeadings, WithMapping, ShouldAutoSize
{
    public function collection()
    {
        return Guru::orderBy('idguru')->get();
    }

    public function title(): string
    {
        return 'Guru';
    }

    public function headings(): array
    {
        return [
            'ID Guru',
            'NIP',
            'Nama Guru',
            'No HP',
        ];
    }

    /**
     * @param Guru $row
     */
    public function map($row): array
    {
        return [
            $row->idguru,
            $row->nip,
            $row->nama_guru,
            $row->no_hp,
        ];
    }
}
