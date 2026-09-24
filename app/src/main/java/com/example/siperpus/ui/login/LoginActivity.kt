package com.example.siperpus.ui.login

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.example.siperpus.MainActivity
import com.example.siperpus.data.api.ApiClient
import com.example.siperpus.data.pref.SessionManager
import com.example.siperpus.data.repository.AuthRepository
import com.example.siperpus.databinding.ActivityLoginBinding
import com.example.siperpus.utils.ServerDiscoveryHelper
import kotlinx.coroutines.launch

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private lateinit var sessionManager: SessionManager
    private lateinit var viewModel: LoginViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        sessionManager = SessionManager(this)

        // Check if already logged in as librarian
        if (sessionManager.isLoggedIn() && sessionManager.isLibrarian()) {
            startActivity(Intent(this, MainActivity::class.java))
            finish()
            return
        }

        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val authRepository = AuthRepository(sessionManager)
        viewModel = LoginViewModel(authRepository)

        updateBaseUrlDisplay()
        observeViewModel()
        setupListeners()
        autoDiscoverServer(showToast = false)
    }

    private fun observeViewModel() {
        viewModel.uiState.observe(this) { state ->
            when (state) {
                is LoginUiState.Idle -> {
                    binding.progressBar.visibility = View.GONE
                    binding.btnLogin.isEnabled = true
                    binding.layoutError.visibility = View.GONE
                }
                is LoginUiState.Loading -> {
                    binding.progressBar.visibility = View.VISIBLE
                    binding.btnLogin.isEnabled = false
                    binding.layoutError.visibility = View.GONE
                }
                is LoginUiState.Success -> {
                    binding.progressBar.visibility = View.GONE
                    binding.btnLogin.isEnabled = true
                    binding.layoutError.visibility = View.GONE
                    val userName = state.response.actualUser?.displayName ?: "Pustakawan"
                    Toast.makeText(this, "Selamat bertugas, $userName!", Toast.LENGTH_SHORT).show()
                    startActivity(Intent(this, MainActivity::class.java))
                    finish()
                }
                is LoginUiState.Error -> {
                    binding.progressBar.visibility = View.GONE
                    binding.btnLogin.isEnabled = true
                    binding.layoutError.visibility = View.VISIBLE
                    binding.tvErrorMessage.text = state.message
                }
            }
        }
    }

    private fun setupListeners() {
        binding.btnLogin.setOnClickListener {
            val username = binding.etUsername.text.toString().trim()
            val password = binding.etPassword.text.toString().trim()
            viewModel.login(username, password)
        }

        binding.btnAutoDetect.setOnClickListener {
            autoDiscoverServer(showToast = true)
        }

        binding.btnServerConfig.setOnClickListener {
            showServerConfigDialog()
        }
    }

    private fun autoDiscoverServer(showToast: Boolean = false) {
        binding.tvServerStatusBadge.text = "⚡ Mencari..."
        lifecycleScope.launch {
            val detected = ServerDiscoveryHelper.discoverServer(this@LoginActivity, sessionManager)
            if (detected != null) {
                binding.tvServerStatusBadge.text = "🟢 Online"
                binding.tvServerStatusBadge.setBackgroundResource(com.example.siperpus.R.drawable.bg_badge_green)
                updateBaseUrlDisplay()
                if (showToast) {
                    Toast.makeText(this@LoginActivity, "Terhubung otomatis ke: $detected", Toast.LENGTH_SHORT).show()
                }
            } else {
                binding.tvServerStatusBadge.text = "🔴 Offline"
                updateBaseUrlDisplay()
                if (showToast) {
                    Toast.makeText(this@LoginActivity, "Server belum terdeteksi. Pastikan 'php artisan serve' berjalan di komputer.", Toast.LENGTH_LONG).show()
                }
            }
        }
    }

    private fun updateBaseUrlDisplay() {
        binding.tvCurrentBaseUrl.text = sessionManager.baseUrl
    }

    private fun showServerConfigDialog() {
        val input = EditText(this).apply {
            setText(sessionManager.baseUrl)
            setSelection(sessionManager.baseUrl.length)
            setPadding(48, 32, 48, 32)
            setSingleLine()
        }

        AlertDialog.Builder(this)
            .setTitle("Konfigurasi IP Server Backend")
            .setMessage("Gunakan http://10.0.2.2:8000/api/ untuk Emulator, atau IP Wi-Fi komputer Anda (contoh: http://192.168.1.10:8000/api/):")
            .setView(input)
            .setPositiveButton("Simpan") { _, _ ->
                val newUrl = input.text.toString().trim()
                if (newUrl.isNotEmpty()) {
                    sessionManager.baseUrl = newUrl
                    ApiClient.resetService()
                    updateBaseUrlDisplay()
                    Toast.makeText(this, "Base URL berhasil diperbarui", Toast.LENGTH_SHORT).show()
                }
            }
            .setNegativeButton("Reset ke Default") { _, _ ->
                sessionManager.baseUrl = SessionManager.DEFAULT_BASE_URL
                ApiClient.resetService()
                updateBaseUrlDisplay()
                Toast.makeText(this, "Base URL direset ke default", Toast.LENGTH_SHORT).show()
            }
            .setNeutralButton("Batal", null)
            .show()
    }
}
