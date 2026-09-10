<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    use HasFactory;

    protected $table = 'tbl_berita';
    protected $primaryKey = 'id_berita';

    protected $fillable = [
        'judul',
        'slug',
        'gambar_thumbnail',
        'isi_konten',
        'tgl_publish',
    ];

    protected function casts(): array
    {
        return [
            'tgl_publish' => 'datetime',
        ];
    }
}
