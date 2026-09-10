<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    use HasFactory;

    protected $table = 'tbl_siswa';
    protected $primaryKey = 'idsiswa';

    protected $fillable = [
        'nis',
        'nisn',
        'nama',
    ];

    public function siswaKelas()
    {
        return $this->hasMany(SiswaKelas::class, 'idsiswa', 'idsiswa');
    }

    public function peminjaman()
    {
        return $this->hasMany(Pinjam::class, 'idsiswa', 'idsiswa');
    }
}
