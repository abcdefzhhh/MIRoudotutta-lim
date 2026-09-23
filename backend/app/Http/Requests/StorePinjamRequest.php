<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StorePinjamRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nis' => ['required', 'string', 'exists:tbl_siswa,nis'],
            'kodebukudetail' => ['required', 'array', 'min:1'],
            'kodebukudetail.*' => ['required', 'string', 'distinct'],
            'tgl_batas_kembali' => ['nullable', 'date', 'after_or_equal:today'],
            'idpetugas' => ['nullable', 'integer', 'exists:tbl_users,id_user'],
        ];
    }

    public function messages(): array
    {
        return [
            'nis.required' => 'Nomor Induk Siswa (NIS) wajib diisi.',
            'nis.exists' => 'Data santri dengan NIS tersebut tidak ditemukan di sistem.',
            'kodebukudetail.required' => 'Pilih minimal satu barcode buku untuk dipinjam.',
            'kodebukudetail.array' => 'Format kode buku harus berupa daftar barcode.',
            'kodebukudetail.min' => 'Pilih minimal satu barcode buku.',
            'kodebukudetail.*.distinct' => 'Terdapat duplikasi barcode buku yang sama dalam peminjaman.',
            'tgl_batas_kembali.after_or_equal' => 'Tanggal batas pengembalian tidak boleh sebelum hari ini.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validasi data peminjaman gagal.',
            'errors' => $validator->errors(),
        ], 422));
    }
}
