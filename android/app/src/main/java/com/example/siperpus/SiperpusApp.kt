package com.example.siperpus

import android.app.Application
import com.example.siperpus.data.api.ApiClient
import com.example.siperpus.data.pref.SessionManager

class SiperpusApp : Application() {

    override fun onCreate() {
        super.onCreate()
        // Initialize SessionManager & ApiClient with application context
        val sessionManager = SessionManager(this)
        ApiClient.init(sessionManager)
    }
}
