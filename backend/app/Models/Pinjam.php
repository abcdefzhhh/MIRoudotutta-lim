<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pinjam extends Model
{
    use HasFactory;

    protected $table = 'tbl_pinjam';
    protected $primaryKey = 'idpinjam';

    protected $fillable = [
        'idsiswa',
        'idpetugas',
        'waktu',
        'tgl_batas_kembali',
        'tgl_dikembalikan',
        'status',
        'total_denda',
    ];

    protected function casts(): array
    {
        return [
            'waktu' => 'datetime',
            'tgl_batas_kembali' => 'date',
            'tgl_dikembalikan' => 'date',
            'total_denda' => 'decimal:2',
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

    public function pinjamDetails()
    {
        return $this->hasMany(PinjamDetail::class, 'idpinjam', 'idpinjam');
    }
}
