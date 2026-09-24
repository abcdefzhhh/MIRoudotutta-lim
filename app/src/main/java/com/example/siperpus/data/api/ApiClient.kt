package com.example.siperpus.data.api

import com.example.siperpus.data.pref.SessionManager
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

object ApiClient {

    private var sessionManager: SessionManager? = null
    private var currentBaseUrl: String? = null
    private var cachedService: SiperpusApiService? = null

    fun init(manager: SessionManager) {
        sessionManager = manager
    }

    val apiService: SiperpusApiService
        get() {
            val manager = sessionManager
                ?: throw IllegalStateException("ApiClient must be initialized with SessionManager before use")

            val activeBaseUrl = manager.baseUrl

            // Invalidate cache if base URL changed
            if (cachedService != null && currentBaseUrl == activeBaseUrl) {
                return cachedService!!
            }

            val loggingInterceptor = HttpLoggingInterceptor().apply {
                level = HttpLoggingInterceptor.Level.BODY
            }

            val okHttpClient = OkHttpClient.Builder()
                .addInterceptor(AuthInterceptor(manager))
                .addInterceptor(loggingInterceptor)
                .connectTimeout(15, TimeUnit.SECONDS)
                .readTimeout(15, TimeUnit.SECONDS)
                .writeTimeout(15, TimeUnit.SECONDS)
                .build()

            val retrofit = Retrofit.Builder()
                .baseUrl(activeBaseUrl)
                .client(okHttpClient)
                .addConverterFactory(GsonConverterFactory.create())
                .build()

            currentBaseUrl = activeBaseUrl
            val service = retrofit.create(SiperpusApiService::class.java)
            cachedService = service
            return service
        }

    fun resetService() {
        cachedService = null
        currentBaseUrl = null
    }
}
