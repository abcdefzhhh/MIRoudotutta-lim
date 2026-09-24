package com.example.siperpus.data.model

import com.google.gson.annotations.SerializedName

data class Siswa(
    @SerializedName("id")
    val id: Int? = null,

    @SerializedName("nis")
    val nis: String,

    @SerializedName("nama")
    val nama: String,

    @SerializedName("kelas")
    val kelas: String? = null,

    @SerializedName("rombel")
    val rombel: String? = null,

    @SerializedName("foto")
    val foto: String? = null,

    @SerializedName("pinjaman_aktif_count")
    val pinjamanAktifCount: Int = 0,

    @SerializedName("status_anggota")
    val statusAnggota: String = "Aktif"
) {
    val kelasLengkap: String
        get() = when {
            !kelas.isNullOrBlank() && !rombel.isNullOrBlank() -> "Kelas $kelas-$rombel"
            !kelas.isNullOrBlank() -> "Kelas $kelas"
            else -> "Siswa Aktif"
        }
}
