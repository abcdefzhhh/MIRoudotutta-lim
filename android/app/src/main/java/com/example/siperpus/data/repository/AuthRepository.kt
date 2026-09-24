package com.example.siperpus.data.repository

import com.example.siperpus.data.api.ApiClient
import com.example.siperpus.data.model.ApiResponse
import com.example.siperpus.data.model.LoginRequest
import com.example.siperpus.data.model.LoginResponse
import com.example.siperpus.data.model.User
import com.example.siperpus.data.pref.SessionManager
import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class AuthRepository(private val sessionManager: SessionManager) {

    private val gson = Gson()

    suspend fun login(username: String, pass: String): Result<LoginResponse> =
        withContext(Dispatchers.IO) {
            try {
                val response = ApiClient.apiService.login(LoginRequest(username.trim(), pass))
                if (response.isSuccessful && response.body() != null) {
                    val loginRes = response.body()!!
                    val token = loginRes.actualToken
                    val user = loginRes.actualUser

                    if (token.isNotEmpty()) {
                        val resolvedUser = user ?: User(username = username, role = "pustakawan")
                        val userRole = resolvedUser.actualRole

                        // Guardrail: Target Pengguna: Khusus Pustakawan Meja Layanan
                        if (!userRole.contains("pustakawan", ignoreCase = true) && !userRole.contains("admin", ignoreCase = true)) {
                            return@withContext Result.failure(
                                IllegalAccessException("Akses Ditolak: Akun Anda memiliki role '$userRole'. Aplikasi ini khusus untuk Pustakawan Madrasah.")
                            )
                        }

                        // Save session
                        sessionManager.token = token
                        sessionManager.saveUser(resolvedUser)

                        Result.success(loginRes)
                    } else {
                        Result.failure(Exception(loginRes.message ?: "Login gagal: Kredensial tidak valid"))
                    }
                } else {
                    val errorBody = response.errorBody()?.string()
                    val errorMsg = try {
                        val parsed = gson.fromJson(errorBody, ApiResponse::class.java)
                        parsed?.message ?: "Terjadi kesalahan server (${response.code()})"
                    } catch (e: Exception) {
                        "Terjadi kesalahan server (${response.code()})"
                    }
                    Result.failure(Exception(errorMsg))
                }
            } catch (e: Exception) {
                Result.failure(Exception("Gagal terhubung ke server (${e.localizedMessage ?: "Cek jaringan / IP server"})"))
            }
        }

    suspend fun logout() = withContext(Dispatchers.IO) {
        try {
            ApiClient.apiService.logout()
        } catch (_: Exception) {
            // Ignored on logout
        } finally {
            sessionManager.clear()
        }
    }
}
