package com.example.siperpus.ui.pengaturan

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import com.example.siperpus.data.api.ApiClient
import com.example.siperpus.data.pref.SessionManager
import com.example.siperpus.data.repository.AuthRepository
import com.example.siperpus.databinding.FragmentPengaturanBinding
import com.example.siperpus.ui.login.LoginActivity
import kotlinx.coroutines.launch

class PengaturanFragment : Fragment() {

    private var _binding: FragmentPengaturanBinding? = null
    private val binding get() = _binding!!

    private lateinit var sessionManager: SessionManager
    private lateinit var authRepository: AuthRepository

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentPengaturanBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        sessionManager = SessionManager(requireContext())
        authRepository = AuthRepository(sessionManager)

        displayProfile()
        setupListeners()
    }

    private fun displayProfile() {
        val user = sessionManager.getUser()
        if (user != null) {
            binding.tvNamaPetugas.text = user.displayName
            binding.tvUsernameRole.text = "Username: ${user.username ?: "-"} • Role: ${user.actualRole.replaceFirstChar { it.uppercase() }}"
        } else {
            binding.tvNamaPetugas.text = "Pustakawan Madrasah"
            binding.tvUsernameRole.text = "Role: Pustakawan"
        }

        binding.tvBaseUrl.text = sessionManager.baseUrl
    }

    private fun setupListeners() {
        binding.btnAutoDetectServer.setOnClickListener {
            binding.btnAutoDetectServer.isEnabled = false
            binding.btnAutoDetectServer.text = "⚡ Mencari..."
            lifecycleScope.launch {
                val detected = com.example.siperpus.utils.ServerDiscoveryHelper.discoverServer(requireContext(), sessionManager)
                binding.btnAutoDetectServer.isEnabled = true
                binding.btnAutoDetectServer.text = "⚡ Deteksi Otomatis"
                if (detected != null) {
                    binding.tvBaseUrl.text = sessionManager.baseUrl
                    android.widget.Toast.makeText(requireContext(), "Berhasil terhubung otomatis ke: $detected", android.widget.Toast.LENGTH_SHORT).show()
                } else {
                    android.widget.Toast.makeText(requireContext(), "Server backend tidak terdeteksi pada jaringan.", android.widget.Toast.LENGTH_LONG).show()
                }
            }
        }

        binding.btnUbahServer.setOnClickListener {
            showServerConfigDialog()
        }

        binding.btnLogout.setOnClickListener {
            AlertDialog.Builder(requireContext())
                .setTitle("Keluar Akun")
                .setMessage("Apakah Anda yakin ingin keluar dari sesi petugas perpustakaan?")
                .setPositiveButton("Ya, Keluar") { _, _ ->
                    lifecycleScope.launch {
                        authRepository.logout()
                        val intent = Intent(requireContext(), LoginActivity::class.java).apply {
                            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                        }
                        startActivity(intent)
                        activity?.finish()
                    }
                }
                .setNegativeButton("Batal", null)
                .show()
        }
    }

    private fun showServerConfigDialog() {
        val input = EditText(requireContext()).apply {
            setText(sessionManager.baseUrl)
            setSelection(sessionManager.baseUrl.length)
            setPadding(48, 32, 48, 32)
            setSingleLine()
        }

        AlertDialog.Builder(requireContext())
            .setTitle("Konfigurasi IP Server Backend")
            .setMessage("Masukkan URL REST API Laravel:")
            .setView(input)
            .setPositiveButton("Simpan") { _, _ ->
                val newUrl = input.text.toString().trim()
                if (newUrl.isNotEmpty()) {
                    sessionManager.baseUrl = newUrl
                    ApiClient.resetService()
                    binding.tvBaseUrl.text = sessionManager.baseUrl
                    Toast.makeText(requireContext(), "Base URL berhasil diperbarui", Toast.LENGTH_SHORT).show()
                }
            }
            .setNegativeButton("Reset ke Default") { _, _ ->
                sessionManager.baseUrl = SessionManager.DEFAULT_BASE_URL
                ApiClient.resetService()
                binding.tvBaseUrl.text = sessionManager.baseUrl
                Toast.makeText(requireContext(), "Base URL direset ke default", Toast.LENGTH_SHORT).show()
            }
            .setNeutralButton("Batal", null)
            .show()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
