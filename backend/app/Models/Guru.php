<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guru extends Model
{
    use HasFactory;

    protected $table = 'tbl_guru';
    protected $primaryKey = 'idguru';

    protected $fillable = [
        'nip',
        'nama_guru',
        'no_hp',
    ];

    public function kelasDetails()
    {
        return $this->hasMany(KelasDetail::class, 'idguru', 'idguru');
    }
}
