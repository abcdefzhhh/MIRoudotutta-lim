<?php

namespace App\Exports\Sheets;

use App\Models\Buku;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;

class BukuSheetExport implements FromCollection, WithTitle, WithHeadings, WithMapping, ShouldAutoSize
{
    public function collection()
    {
        return Buku::orderBy('idbuku')->get();
    }

    public function title(): string
    {
        return 'Buku';
    }

    public function headings(): array
    {
        return [
            'ID Buku',
            'ISBN',
            'Kode Buku',
            'Judul Buku',
            'Penulis',
            'Penerbit',
            'Stok',
            'Stok Tersedia',
        ];
    }

    /**
     * @param Buku $row
     */
    public function map($row): array
    {
        return [
            $row->idbuku,
            $row->isbn,
            $row->kodebuku,
            $row->judul,
            $row->penulis,
            $row->penerbit,
            $row->stok,
            $row->stok_tersedia,
        ];
    }
}
