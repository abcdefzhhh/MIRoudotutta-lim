package com.example.siperpus.data.model

import com.google.gson.annotations.SerializedName

data class BukuDetail(
    @SerializedName("id")
    val id: Int? = null,

    @SerializedName("kodebukudetail")
    val kodebukudetail: String,

    @SerializedName("judul")
    val judul: String,

    @SerializedName("pengarang")
    val pengarang: String? = null,

    @SerializedName("penerbit")
    val penerbit: String? = null,

    @SerializedName("tahun")
    val tahun: String? = null,

    @SerializedName("kondisi")
    val kondisi: String = "baik",

    @SerializedName("status")
    val status: String = "tersedia", // "tersedia" or "dipinjam"

    @SerializedName("rak")
    val rak: String? = null
) {
    val isDipinjam: Boolean
        get() = status.equals("dipinjam", ignoreCase = true)

    val isHilang: Boolean
        get() = kondisi.equals("hilang", ignoreCase = true)

    val isRusak: Boolean
        get() = kondisi.equals("rusak", ignoreCase = true)

    val isAvailableForLoan: Boolean
        get() = !isDipinjam && !isHilang
}
