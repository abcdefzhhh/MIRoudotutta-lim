package com.example.siperpus.data.repository

import com.example.siperpus.data.api.ApiClient
import com.example.siperpus.data.model.ApiResponse
import com.example.siperpus.data.model.KunjunganHariIniResponse
import com.example.siperpus.data.model.KunjunganRequest
import com.example.siperpus.data.model.KunjunganResponse
import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class KunjunganRepository {

    private val gson = Gson()

    suspend fun recordKunjungan(nis: String, keperluan: String = "Membaca Buku"): Result<KunjunganResponse> =
        withContext(Dispatchers.IO) {
            try {
                val cleanNis = nis.trim()
                    .removePrefix("SISWA-")
                    .removePrefix("siswa-")
                    .removePrefix("SISWA:")
                    .removePrefix("siswa:")
                    .trim()

                val request = KunjunganRequest(nis = cleanNis, keperluan = keperluan)
                val response = ApiClient.apiService.recordKunjungan(request)
                if (response.isSuccessful && response.body() != null) {
                    val body = response.body()!!
                    if (body.success && body.data != null) {
                        Result.success(body.data)
                    } else {
                        Result.failure(Exception(body.message ?: "Gagal mencatat izin masuk perpustakaan"))
                    }
                } else {
                    val errorMsg = parseErrorMessage(response.errorBody()?.string(), response.code())
                    Result.failure(Exception(errorMsg))
                }
            } catch (e: Exception) {
                Result.failure(Exception("Koneksi gagal: ${e.localizedMessage ?: "Cek jaringan / IP Server"}"))
            }
        }

    suspend fun getKunjunganHariIni(): Result<KunjunganHariIniResponse> =
        withContext(Dispatchers.IO) {
            try {
                val response = ApiClient.apiService.getKunjunganHariIni()
                if (response.isSuccessful && response.body() != null) {
                    val body = response.body()!!
                    if (body.success && body.data != null) {
                        Result.success(body.data)
                    } else {
                        Result.failure(Exception(body.message ?: "Gagal memuat riwayat pengunjung hari ini"))
                    }
                } else {
                    val errorMsg = parseErrorMessage(response.errorBody()?.string(), response.code())
                    Result.failure(Exception(errorMsg))
                }
            } catch (e: Exception) {
                Result.failure(Exception("Koneksi gagal: ${e.localizedMessage ?: "Cek jaringan / IP Server"}"))
            }
        }

    private fun parseErrorMessage(errorBody: String?, statusCode: Int): String {
        if (errorBody.isNullOrBlank()) return "Terjadi kesalahan server ($statusCode)"
        return try {
            val parsed = gson.fromJson(errorBody, ApiResponse::class.java)
            parsed?.message ?: "Terjadi kesalahan server ($statusCode)"
        } catch (_: Exception) {
            "Terjadi kesalahan server ($statusCode)"
        }
    }
}
