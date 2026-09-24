package com.example.siperpus.data.model

import com.google.gson.annotations.SerializedName

data class PeminjamanRequest(
    @SerializedName("nis")
    val nis: String,

    @SerializedName("kodebukudetail")
    val kodebukudetail: List<String>
)

data class PeminjamanResponse(
    @SerializedName("id_transaksi")
    val idTransaksi: String? = null,

    @SerializedName("nis")
    val nis: String,

    @SerializedName("nama_siswa")
    val namaSiswa: String? = null,

    @SerializedName("tanggal_pinjam")
    val tanggalPinjam: String? = null,

    @SerializedName("jatuh_tempo")
    val jatuhTempo: String? = null,

    @SerializedName("buku")
    val buku: List<BukuDetail>? = null
)

data class PengembalianScanResponse(
    @SerializedName("kodebukudetail")
    val kodebukudetail: String,

    @SerializedName("judul")
    val judul: String,

    @SerializedName("peminjam")
    val peminjam: Siswa? = null,

    @SerializedName("tanggal_pinjam")
    val tanggalPinjam: String? = null,

    @SerializedName("jatuh_tempo")
    val jatuhTempo: String? = null,

    @SerializedName("hari_terlambat")
    val hariTerlambat: Int = 0,

    @SerializedName("tarif_denda_per_hari")
    val tarifDendaPerHari: Long = 1000L,

    @SerializedName("total_denda")
    val totalDenda: Long = 0L,

    @SerializedName("id_peminjaman")
    val idPeminjaman: Int? = null
)

data class PengembalianSubmitRequest(
    @SerializedName("kodebukudetail")
    val kodebukudetail: String,

    @SerializedName("kondisi")
    val kondisi: String = "baik", // "baik", "rusak", "hilang"

    @SerializedName("denda_dibayar")
    val dendaDibayar: Long = 0L,

    @SerializedName("catatan")
    val catatan: String? = null
)

data class StatistikSirkulasi(
    @SerializedName("buku_dipinjam_aktif")
    val bukuDipinjamAktif: Int = 0,

    @SerializedName("transaksi_hari_ini")
    val transaksiHariIni: Int = 0,

    @SerializedName("total_denda_himpun")
    val totalDendaHimpun: Long = 0L,

    @SerializedName("total_koleksi_buku")
    val totalKoleksiBuku: Int = 0
)

data class TransaksiItem(
    @SerializedName("id")
    val id: String,

    @SerializedName("tipe")
    val tipe: String, // "peminjaman", "pengembalian", "kunjungan"

    @SerializedName("nis")
    val nis: String? = null,

    @SerializedName("nama_siswa")
    val namaSiswa: String,

    @SerializedName("kelas")
    val kelas: String? = null,

    @SerializedName("kodebukudetail")
    val kodebukudetail: String? = null,

    @SerializedName("judul_buku")
    val judulBuku: String? = null,

    @SerializedName("waktu")
    val waktu: String,

    @SerializedName("status")
    val status: String, // "Tepat Waktu", "Telat", "Dipinjam", "Selesai"

    @SerializedName("denda")
    val denda: Long = 0L
)
