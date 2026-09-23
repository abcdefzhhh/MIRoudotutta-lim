<?php

/*
|--------------------------------------------------------------------------
| SIPERPUS Business Constants
|--------------------------------------------------------------------------
|
| Semua nilai bisnis (denda, durasi pinjam, dsb) WAJIB diambil dari sini.
| Jangan meng-hardcode angka-angka ini di controller manapun.
|
*/

return [

    /*
    |--------------------------------------------------------------------------
    | Denda Keterlambatan
    |--------------------------------------------------------------------------
    | Nilai denda dalam Rupiah per hari per eksemplar buku yang terlambat.
    | Default: Rp 1.000/hari. Dapat di-override via ENV SIPERPUS_DENDA_PER_HARI.
    */
    'denda_per_hari' => (int) env('SIPERPUS_DENDA_PER_HARI', 1000),

    /*
    |--------------------------------------------------------------------------
    | Durasi Pinjam Default
    |--------------------------------------------------------------------------
    | Jumlah hari maksimal peminjaman sebelum dianggap terlambat.
    | Default: 7 hari. Dapat di-override via ENV SIPERPUS_DURASI_PINJAM_HARI.
    */
    'durasi_pinjam_hari' => (int) env('SIPERPUS_DURASI_PINJAM_HARI', 7),

    /*
    |--------------------------------------------------------------------------
    | Maksimum Buku per Transaksi Peminjaman
    |--------------------------------------------------------------------------
    | Batas maksimum eksemplar buku yang boleh dipinjam dalam satu transaksi.
    */
    'maks_buku_per_pinjam' => (int) env('SIPERPUS_MAKS_BUKU_PER_PINJAM', 3),

];
