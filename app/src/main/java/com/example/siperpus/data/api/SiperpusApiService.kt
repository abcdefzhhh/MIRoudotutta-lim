package com.example.siperpus.data.api

import com.example.siperpus.data.model.ApiResponse
import com.example.siperpus.data.model.BukuDetail
import com.example.siperpus.data.model.KunjunganHariIniResponse
import com.example.siperpus.data.model.KunjunganRequest
import com.example.siperpus.data.model.KunjunganResponse
import com.example.siperpus.data.model.LoginRequest
import com.example.siperpus.data.model.LoginResponse
import com.example.siperpus.data.model.PeminjamanRequest
import com.example.siperpus.data.model.PeminjamanResponse
import com.example.siperpus.data.model.PengembalianScanResponse
import com.example.siperpus.data.model.PengembalianSubmitRequest
import com.example.siperpus.data.model.Siswa
import com.example.siperpus.data.model.StatistikSirkulasi
import com.example.siperpus.data.model.TransaksiItem
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface SiperpusApiService {

    @POST("login")
    suspend fun login(
        @Body request: LoginRequest
    ): Response<LoginResponse>

    @POST("logout")
    suspend fun logout(): Response<ApiResponse<Unit>>

    @GET("siperpus/scan/siswa/{nis}")
    suspend fun scanSiswa(
        @Path("nis") nis: String
    ): Response<ApiResponse<Siswa>>

    @GET("siperpus/scan/buku/{kodebukudetail}")
    suspend fun scanBuku(
        @Path("kodebukudetail") kode: String
    ): Response<ApiResponse<BukuDetail>>

    @POST("siperpus/pinjam")
    suspend fun submitPeminjaman(
        @Body request: PeminjamanRequest
    ): Response<ApiResponse<PeminjamanResponse>>

    @GET("siperpus/scan/kembali/{kodebukudetail}")
    suspend fun scanPengembalian(
        @Path("kodebukudetail") kode: String
    ): Response<ApiResponse<PengembalianScanResponse>>

    @POST("siperpus/kembali")
    suspend fun submitPengembalian(
        @Body request: PengembalianSubmitRequest
    ): Response<ApiResponse<Unit>>

    @GET("siperpus/statistik")
    suspend fun getStatistik(): Response<ApiResponse<StatistikSirkulasi>>

    @GET("siperpus/riwayat")
    suspend fun getRiwayat(): Response<ApiResponse<List<TransaksiItem>>>

    @POST("siperpus/kunjungan")
    suspend fun recordKunjungan(
        @Body request: KunjunganRequest
    ): Response<ApiResponse<KunjunganResponse>>

    @GET("siperpus/kunjungan/hari-ini")
    suspend fun getKunjunganHariIni(): Response<ApiResponse<KunjunganHariIniResponse>>

    @POST("siperpus/buku/{kodebukudetail}/kondisi")
    suspend fun updateKondisiBuku(
        @Path("kodebukudetail") kode: String,
        @Body request: Map<String, String>
    ): Response<ApiResponse<Unit>>
}
