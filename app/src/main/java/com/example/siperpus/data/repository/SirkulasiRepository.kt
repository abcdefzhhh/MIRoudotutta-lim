package com.example.siperpus.data.repository

import com.example.siperpus.data.api.ApiClient
import com.example.siperpus.data.model.ApiResponse
import com.example.siperpus.data.model.BukuDetail
import com.example.siperpus.data.model.PeminjamanRequest
import com.example.siperpus.data.model.PeminjamanResponse
import com.example.siperpus.data.model.PengembalianScanResponse
import com.example.siperpus.data.model.PengembalianSubmitRequest
import com.example.siperpus.data.model.Siswa
import com.example.siperpus.data.model.StatistikSirkulasi
import com.example.siperpus.data.model.TransaksiItem
import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class SirkulasiRepository {

    private val gson = Gson()

    suspend fun scanSiswa(nis: String): Result<Siswa> = withContext(Dispatchers.IO) {
        try {
            val cleanNis = nis.trim()
                .removePrefix("SISWA-")
                .removePrefix("siswa-")
                .removePrefix("SISWA:")
                .removePrefix("siswa:")
                .trim()
            val response = ApiClient.apiService.scanSiswa(cleanNis)
            if (response.isSuccessful && response.body() != null) {
                val body = response.body()!!
                if (body.success && body.data != null) {
                    Result.success(body.data)
                } else {
                    Result.failure(Exception(body.message ?: "Data siswa tidak ditemukan untuk NIS: $nis"))
                }
            } else {
                val errorMsg = parseErrorMessage(response.errorBody()?.string(), response.code())
                Result.failure(Exception(errorMsg))
            }
        } catch (e: Exception) {
            Result.failure(Exception("Koneksi gagal: ${e.localizedMessage ?: "Cek jaringan / IP Server"}"))
        }
    }

    fun cleanKodeBuku(kode: String): String {
        val trimmed = kode.trim()
        val regex = Regex("^buku-(?:[0-9xX-]+-)?", RegexOption.IGNORE_CASE)
        return trimmed.replace(regex, "")
    }

    suspend fun scanBuku(kode: String): Result<BukuDetail> = withContext(Dispatchers.IO) {
        try {
            val cleaned = cleanKodeBuku(kode)
            val response = ApiClient.apiService.scanBuku(cleaned)
            if (response.isSuccessful && response.body() != null) {
                val body = response.body()!!
                if (body.success && body.data != null) {
                    Result.success(body.data)
                } else {
                    Result.failure(Exception(body.message ?: "Buku dengan kode '$kode' tidak ditemukan"))
                }
            } else {
                val errorMsg = parseErrorMessage(response.errorBody()?.string(), response.code())
                Result.failure(Exception(errorMsg))
            }
        } catch (e: Exception) {
            Result.failure(Exception("Koneksi gagal: ${e.localizedMessage ?: "Cek jaringan / IP Server"}"))
        }
    }

    suspend fun submitPeminjaman(nis: String, kodeBukuList: List<String>): Result<PeminjamanResponse> =
        withContext(Dispatchers.IO) {
            try {
                val request = PeminjamanRequest(nis = nis.trim(), kodebukudetail = kodeBukuList)
                val response = ApiClient.apiService.submitPeminjaman(request)
                if (response.isSuccessful && response.body() != null) {
                    val body = response.body()!!
                    if (body.success && body.data != null) {
                        Result.success(body.data)
                    } else {
                        Result.failure(Exception(body.message ?: "Gagal memproses peminjaman buku"))
                    }
                } else {
                    val errorMsg = parseErrorMessage(response.errorBody()?.string(), response.code())
                    Result.failure(Exception(errorMsg))
                }
            } catch (e: Exception) {
                Result.failure(Exception("Koneksi gagal: ${e.localizedMessage ?: "Cek jaringan / IP Server"}"))
            }
        }

    suspend fun scanPengembalian(kode: String): Result<PengembalianScanResponse> =
        withContext(Dispatchers.IO) {
            try {
                val cleaned = cleanKodeBuku(kode)
                val response = ApiClient.apiService.scanPengembalian(cleaned)
                if (response.isSuccessful && response.body() != null) {
                    val body = response.body()!!
                    if (body.success && body.data != null) {
                        Result.success(body.data)
                    } else {
                        Result.failure(Exception(body.message ?: "Data peminjaman buku '$kode' tidak ditemukan"))
                    }
                } else {
                    val errorMsg = parseErrorMessage(response.errorBody()?.string(), response.code())
                    Result.failure(Exception(errorMsg))
                }
            } catch (e: Exception) {
                Result.failure(Exception("Koneksi gagal: ${e.localizedMessage ?: "Cek jaringan / IP Server"}"))
            }
        }

    suspend fun submitPengembalian(
        kode: String,
        kondisi: String,
        dendaDibayar: Long,
        catatan: String?
    ): Result<String> = withContext(Dispatchers.IO) {
        try {
            val request = PengembalianSubmitRequest(
                kodebukudetail = kode.trim(),
                kondisi = kondisi,
                dendaDibayar = dendaDibayar,
                catatan = catatan
            )
            val response = ApiClient.apiService.submitPengembalian(request)
            if (response.isSuccessful && response.body() != null) {
                val body = response.body()!!
                if (body.success) {
                    Result.success(body.message ?: "Pengembalian buku berhasil diproses")
                } else {
                    Result.failure(Exception(body.message ?: "Gagal memproses pengembalian buku"))
                }
            } else {
                val errorMsg = parseErrorMessage(response.errorBody()?.string(), response.code())
                Result.failure(Exception(errorMsg))
            }
        } catch (e: Exception) {
            Result.failure(Exception("Koneksi gagal: ${e.localizedMessage ?: "Cek jaringan / IP Server"}"))
        }
    }

    suspend fun getStatistik(): Result<StatistikSirkulasi> = withContext(Dispatchers.IO) {
        try {
            val response = ApiClient.apiService.getStatistik()
            if (response.isSuccessful && response.body() != null) {
                val body = response.body()!!
                if (body.success && body.data != null) {
                    Result.success(body.data)
                } else {
                    Result.failure(Exception(body.message ?: "Gagal memuat data statistik"))
                }
            } else {
                val errorMsg = parseErrorMessage(response.errorBody()?.string(), response.code())
                Result.failure(Exception(errorMsg))
            }
        } catch (e: Exception) {
            Result.failure(Exception("Koneksi gagal: ${e.localizedMessage ?: "Cek jaringan / IP Server"}"))
        }
    }

    suspend fun getRiwayat(): Result<List<TransaksiItem>> = withContext(Dispatchers.IO) {
        try {
            val response = ApiClient.apiService.getRiwayat()
            if (response.isSuccessful && response.body() != null) {
                val body = response.body()!!
                if (body.success && body.data != null) {
                    Result.success(body.data)
                } else {
                    Result.failure(Exception(body.message ?: "Gagal memuat riwayat transaksi"))
                }
            } else {
                val errorMsg = parseErrorMessage(response.errorBody()?.string(), response.code())
                Result.failure(Exception(errorMsg))
            }
        } catch (e: Exception) {
            Result.failure(Exception("Koneksi gagal: ${e.localizedMessage ?: "Cek jaringan / IP Server"}"))
        }
    }

    suspend fun updateKondisiBuku(kode: String, kondisi: String): Result<Boolean> = withContext(Dispatchers.IO) {
        try {
            val cleaned = cleanKodeBuku(kode)
            val response = ApiClient.apiService.updateKondisiBuku(cleaned, mapOf("kondisi" to kondisi))
            if (response.isSuccessful) {
                Result.success(true)
            } else {
                val errorMsg = parseErrorMessage(response.errorBody()?.string(), response.code())
                Result.failure(Exception(errorMsg))
            }
        } catch (e: Exception) {
            Result.failure(Exception("Gagal memperbarui kondisi buku: ${e.localizedMessage ?: "Cek koneksi"}"))
        }
    }

    private fun parseErrorMessage(errorBody: String?, statusCode: Int): String {
        return try {
            val parsed = gson.fromJson(errorBody, ApiResponse::class.java)
            parsed?.message ?: "Terjadi kesalahan server ($statusCode)"
        } catch (e: Exception) {
            "Terjadi kesalahan server ($statusCode)"
        }
    }
}
