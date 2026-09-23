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

    protected $appends = ['gambar_thumbnail_url'];

    public function getGambarThumbnailUrlAttribute(): string
    {
        $thumb = $this->gambar_thumbnail;
        if (!$thumb) {
            return 'https://lh3.googleusercontent.com/aida-public/AB6AXuBePtJMaCotwUdo_WVJlOrgnrXRzFsC9mCFuCnJrbbzK08aZUjZ_F5K_BmIDAZKIFMKDQhJmVn3C8SiPobA44tHCsNDPD52AKiuutsgnrgBHo5gVVnFsZlFOVd11qSda7EjMzirIGi92dBE9dPD24vhJQ30BbUBeh91fZpeWcRJ_8Kqymu0Awmfth_MEAkC_xsX6vOBjSfYy1LUSYwIfY4FDLtuISJggPnPsMGAxDTLLiIJV1Fe9PslNA';
        }
        if (str_starts_with($thumb, 'http://') || str_starts_with($thumb, 'https://')) {
            return $thumb;
        }
        return url($thumb);
    }
}
