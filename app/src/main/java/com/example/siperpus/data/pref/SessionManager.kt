package com.example.siperpus.data.pref

import android.content.Context
import android.content.SharedPreferences
import com.example.siperpus.data.model.User
import com.google.gson.Gson

class SessionManager(context: Context) {

    private val prefs: SharedPreferences =
        context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
    private val gson = Gson()

    companion object {
        private const val PREF_NAME = "siperpus_session"
        private const val KEY_TOKEN = "key_token"
        private const val KEY_USER = "key_user"
        private const val KEY_BASE_URL = "key_base_url"

        // Default URL: IP Wi-Fi laptop aktif untuk koneksi langsung perangkat HP fisik
        const val DEFAULT_BASE_URL = "http://192.168.100.128:8000/api/"
    }

    var token: String?
        get() = prefs.getString(KEY_TOKEN, null)
        set(value) = prefs.edit().putString(KEY_TOKEN, value).apply()

    var baseUrl: String
        get() {
            var url = prefs.getString(KEY_BASE_URL, DEFAULT_BASE_URL) ?: DEFAULT_BASE_URL
            // Migrasi otomatis jika sebelumnya tersimpan IP lama atau emulator di HP fisik
            if (url.contains("10.0.2.2") || url.contains("192.168.11.62")) {
                url = DEFAULT_BASE_URL
                prefs.edit().putString(KEY_BASE_URL, DEFAULT_BASE_URL).apply()
            }
            return if (url.endsWith("/")) url else "$url/"
        }
        set(value) {
            val formatted = if (value.endsWith("/")) value else "$value/"
            prefs.edit().putString(KEY_BASE_URL, formatted).apply()
        }

    fun saveUser(user: User) {
        val json = gson.toJson(user)
        prefs.edit().putString(KEY_USER, json).apply()
    }

    fun getUser(): User? {
        val json = prefs.getString(KEY_USER, null) ?: return null
        return try {
            gson.fromJson(json, User::class.java)
        } catch (e: Exception) {
            null
        }
    }

    fun isLoggedIn(): Boolean {
        return !token.isNullOrBlank()
    }

    fun isLibrarian(): Boolean {
        val user = getUser()
        val role = user?.role ?: return false
        return role.contains("pustakawan", ignoreCase = true) ||
                role.contains("admin", ignoreCase = true)
    }

    fun clear() {
        // Keep baseUrl intact so user doesn't have to retype IP after logout
        val savedBaseUrl = baseUrl
        prefs.edit().clear().apply()
        baseUrl = savedBaseUrl
    }
}
