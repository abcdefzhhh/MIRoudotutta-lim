<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PinjamDetail extends Model
{
    use HasFactory;

    protected $table = 'tbl_pinjam_detail';
    protected $primaryKey = 'idpinjamdetail';

    protected $fillable = [
        'idpinjam',
        'idbukudetail',
    ];

    public function pinjam()
    {
        return $this->belongsTo(Pinjam::class, 'idpinjam', 'idpinjam');
    }

    public function bukuDetail()
    {
        return $this->belongsTo(BukuDetail::class, 'idbukudetail', 'idbukudetail');
    }
}
