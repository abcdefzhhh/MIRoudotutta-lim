<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kunjungan extends Model
{
    use HasFactory;

    protected $table = 'tbl_kunjungan';
    protected $primaryKey = 'id_kunjungan';

    protected $fillable = [
        'idsiswa',
        'idpetugas',
        'waktu_kunjung',
        'keperluan',
    ];

    protected function casts(): array
    {
        return [
            'waktu_kunjung' => 'datetime',
        ];
    }

    public function siswa()
    {
        return $this->belongsTo(Siswa::class, 'idsiswa', 'idsiswa');
    }

    public function petugas()
    {
        return $this->belongsTo(User::class, 'idpetugas', 'id_user');
    }
}
