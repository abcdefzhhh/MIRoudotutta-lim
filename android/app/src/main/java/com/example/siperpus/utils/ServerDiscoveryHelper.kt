package com.example.siperpus.utils

import android.content.Context
import android.net.wifi.WifiManager
import android.text.format.Formatter
import com.example.siperpus.data.api.ApiClient
import com.example.siperpus.data.pref.SessionManager
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.OkHttpClient
import okhttp3.Request
import java.util.concurrent.TimeUnit

object ServerDiscoveryHelper {

    private val fastClient = OkHttpClient.Builder()
        .connectTimeout(1200, TimeUnit.MILLISECONDS)
        .readTimeout(1200, TimeUnit.MILLISECONDS)
        .build()

    /**
     * Otomatis mencari dan memverifikasi alamat IP backend Laravel yang aktif.
     * Menguji candidate URL:
     * 1. URL yang saat ini tersimpan
     * 2. IP Laptop Wi-Fi aktif (192.168.11.62)
     * 3. USB Port Forwarding (127.0.0.1 / localhost)
     * 4. Android Studio Emulator (10.0.2.2)
     * 5. Gateway Wi-Fi lokal perangkat
     */
    suspend fun discoverServer(context: Context, sessionManager: SessionManager): String? = withContext(Dispatchers.IO) {
        val candidates = linkedSetOf<String>()

        // 1. Current URL
        candidates.add(sessionManager.baseUrl)

        // 2. USB Cable / ADB Reverse (127.0.0.1) - Solusi permanen tanpa ganti IP
        candidates.add("http://127.0.0.1:8000/api/")

        // 3. Android Studio Emulator (10.0.2.2)
        candidates.add("http://10.0.2.2:8000/api/")

        // 4. Fallback IP Wi-Fi sebelumnya jika ada
        candidates.add("http://192.168.100.128:8000/api/")
        candidates.add("http://192.168.11.62:8000/api/")

        // 5. Cek Gateway Wi-Fi aktif dari perangkat Android
        try {
            val wifiManager = context.applicationContext.getSystemService(Context.WIFI_SERVICE) as? WifiManager
            val dhcp = wifiManager?.dhcpInfo
            if (dhcp != null && dhcp.gateway != 0) {
                val gatewayIp = Formatter.formatIpAddress(dhcp.gateway)
                candidates.add("http://$gatewayIp:8000/api/")

                val prefix = gatewayIp.substringBeforeLast(".")
                candidates.add("http://$prefix.128:8000/api/")
                candidates.add("http://$prefix.62:8000/api/")
                candidates.add("http://$prefix.1:8000/api/")
                candidates.add("http://$prefix.100:8000/api/")
            }
        } catch (_: Exception) {
            // Ignored if wifi info unavailable
        }

        // Uji setiap kandidat
        for (candidate in candidates) {
            val formatted = if (candidate.endsWith("/")) candidate else "$candidate/"
            if (isServerOnline(formatted)) {
                sessionManager.baseUrl = formatted
                ApiClient.resetService()
                return@withContext formatted
            }
        }

        null
    }

    /**
     * Memeriksa apakah endpoint /status atau /stats backend dapat dijangkau
     */
    fun isServerOnline(url: String): Boolean {
        return try {
            val request = Request.Builder()
                .url("${url}status")
                .get()
                .build()
            fastClient.newCall(request).execute().use { response ->
                response.isSuccessful
            }
        } catch (_: Exception) {
            false
        }
    }
}
