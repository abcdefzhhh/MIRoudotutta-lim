<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiswaKelas extends Model
{
    use HasFactory;

    protected $table = 'tbl_siswa_kelas';
    protected $primaryKey = 'idsiswakelas';

    protected $fillable = [
        'idsiswa',
        'idkelasdetail',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class, 'idsiswa', 'idsiswa');
    }

    public function kelasDetail()
    {
        return $this->belongsTo(KelasDetail::class, 'idkelasdetail', 'idkelasdetail');
    }
}
