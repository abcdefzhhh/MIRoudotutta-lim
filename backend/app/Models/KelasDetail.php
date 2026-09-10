<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KelasDetail extends Model
{
    use HasFactory;

    protected $table = 'tbl_kelas_detail';
    protected $primaryKey = 'idkelasdetail';

    protected $fillable = [
        'idkelas',
        'idguru',
        'idthahunajaran',
    ];

    public function kelas()
    {
        return $this->belongsTo(Kelas::class, 'idkelas', 'idkelas');
    }

    public function guru()
    {
        return $this->belongsTo(Guru::class, 'idguru', 'idguru');
    }

    public function tahunAjaran()
    {
        return $this->belongsTo(TahunAjaran::class, 'idthahunajaran', 'idthnajaran');
    }

    public function siswaKelas()
    {
        return $this->hasMany(SiswaKelas::class, 'idkelasdetail', 'idkelasdetail');
    }
}
