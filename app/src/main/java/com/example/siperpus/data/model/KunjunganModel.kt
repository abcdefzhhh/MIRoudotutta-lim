package com.example.siperpus.data.model

import com.google.gson.annotations.SerializedName

data class KunjunganRequest(
    @SerializedName("nis")
    val nis: String,

    @SerializedName("keperluan")
    val keperluan: String = "Membaca Buku"
)

data class KunjunganResponse(
    @SerializedName("id_kunjungan")
    val idKunjungan: Long,

    @SerializedName("idsiswa")
    val idSiswa: Long,

    @SerializedName("nis")
    val nis: String?,

    @SerializedName("nama")
    val nama: String?,

    @SerializedName("kelas")
    val kelas: String?,

    @SerializedName("keperluan")
    val keperluan: String?,

    @SerializedName("waktu_kunjung")
    val waktuKunjung: String?,

    @SerializedName("tanggal")
    val tanggal: String?,

    @SerializedName("total_kunjungan_hari_ini")
    val totalKunjunganHariIni: Int = 0,

    @SerializedName("total_kunjungan_siswa")
    val totalKunjunganSiswa: Int = 0
)

data class KunjunganItem(
    @SerializedName("id_kunjungan")
    val idKunjungan: Long,

    @SerializedName("idsiswa")
    val idSiswa: Long,

    @SerializedName("nis")
    val nis: String?,

    @SerializedName("nama")
    val nama: String?,

    @SerializedName("kelas")
    val kelas: String?,

    @SerializedName("keperluan")
    val keperluan: String?,

    @SerializedName("waktu")
    val waktu: String?,

    @SerializedName("tanggal")
    val tanggal: String?
)

data class KunjunganHariIniResponse(
    @SerializedName("total_hari_ini")
    val totalHariIni: Int = 0,

    @SerializedName("list")
    val list: List<KunjunganItem> = emptyList()
)
