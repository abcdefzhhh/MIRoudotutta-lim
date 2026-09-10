<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TahunAjaran extends Model
{
    use HasFactory;

    protected $table = 'tbl_tahun_ajaran';
    protected $primaryKey = 'idthnajaran';

    protected $fillable = [
        'thnajaran',
        'tglmulai',
    ];

    public function kelasDetails()
    {
        return $this->hasMany(KelasDetail::class, 'idthahunajaran', 'idthnajaran');
    }
}
