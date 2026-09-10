<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buku extends Model
{
    use HasFactory;

    protected $table = 'tbl_buku';
    protected $primaryKey = 'idbuku';

    protected $fillable = [
        'isbn',
        'kodebuku',
        'judul',
        'penulis',
        'penerbit',
        'stok',
        'stok_tersedia',
    ];

    public function details()
    {
        return $this->hasMany(BukuDetail::class, 'idbuku', 'idbuku');
    }
}
