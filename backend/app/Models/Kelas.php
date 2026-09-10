<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    use HasFactory;

    protected $table = 'tbl_kelas';
    protected $primaryKey = 'idkelas';

    protected $fillable = [
        'kelas',
        'tingkat',
    ];

    public function kelasDetails()
    {
        return $this->hasMany(KelasDetail::class, 'idkelas', 'idkelas');
    }
}
