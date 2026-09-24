package com.example.siperpus

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.example.siperpus.data.pref.SessionManager
import com.example.siperpus.databinding.ActivityMainBinding
import com.example.siperpus.ui.kunjungan.KunjunganFragment
import com.example.siperpus.ui.login.LoginActivity
import com.example.siperpus.ui.peminjaman.PeminjamanFragment
import com.example.siperpus.ui.pengaturan.PengaturanFragment
import com.example.siperpus.ui.pengembalian.PengembalianFragment
import com.example.siperpus.ui.riwayat.RiwayatFragment

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var sessionManager: SessionManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        sessionManager = SessionManager(this)

        // Session check: ensure user is authenticated as librarian
        if (!sessionManager.isLoggedIn() || !sessionManager.isLibrarian()) {
            val intent = Intent(this, LoginActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            }
            startActivity(intent)
            finish()
            return
        }

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupBottomNavigation()

        // Default to Kunjungan screen
        if (savedInstanceState == null) {
            loadFragment(KunjunganFragment())
        }
    }

    private fun setupBottomNavigation() {
        binding.bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.navigation_kunjungan -> {
                    loadFragment(KunjunganFragment())
                    true
                }
                R.id.navigation_peminjaman -> {
                    loadFragment(PeminjamanFragment())
                    true
                }
                R.id.navigation_pengembalian -> {
                    loadFragment(PengembalianFragment())
                    true
                }
                R.id.navigation_riwayat -> {
                    loadFragment(RiwayatFragment())
                    true
                }
                R.id.navigation_pengaturan -> {
                    loadFragment(PengaturanFragment())
                    true
                }
                else -> false
            }
        }
    }

    private fun loadFragment(fragment: Fragment) {
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragmentContainer, fragment)
            .commit()
    }
}