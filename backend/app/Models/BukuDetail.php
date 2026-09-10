<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BukuDetail extends Model
{
    use HasFactory;

    protected $table = 'tbl_buku_detail';
    protected $primaryKey = 'idbukudetail';

    protected $fillable = [
        'idbuku',
        'kodebukudetail',
        'kondisi',
    ];

    public function buku()
    {
        return $this->belongsTo(Buku::class, 'idbuku', 'idbuku');
    }

    public function pinjamDetails()
    {
        return $this->hasMany(PinjamDetail::class, 'idbukudetail', 'idbukudetail');
    }
}
