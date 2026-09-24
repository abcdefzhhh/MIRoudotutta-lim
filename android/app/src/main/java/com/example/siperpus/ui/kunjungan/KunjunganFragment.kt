package com.example.siperpus.ui.kunjungan

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.siperpus.R
import com.example.siperpus.databinding.FragmentKunjunganBinding
import com.example.siperpus.scanner.BarcodeScannerActivity
import com.example.siperpus.utils.HapticFeedbackHelper

class KunjunganFragment : Fragment() {

    private var _binding: FragmentKunjunganBinding? = null
    private val binding get() = _binding!!

    private val viewModel: KunjunganViewModel by viewModels()
    private lateinit var adapter: KunjunganAdapter

    private val scanPresensiLauncher =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            if (result.resultCode == Activity.RESULT_OK) {
                val scannedCode = result.data?.getStringExtra(BarcodeScannerActivity.EXTRA_SCANNED_VALUE)
                if (!scannedCode.isNullOrBlank()) {
                    viewModel.submitPresensi(scannedCode)
                }
            }
        }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentKunjunganBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupRecyclerView()
        setupListeners()
        observeViewModel()

        viewModel.loadKunjunganHariIni()
    }

    private fun setupRecyclerView() {
        adapter = KunjunganAdapter()
        binding.rvKunjungan.apply {
            layoutManager = LinearLayoutManager(requireContext())
            adapter = this@KunjunganFragment.adapter
        }
    }

    private fun setupListeners() {
        binding.btnScanPresensi.setOnClickListener {
            val intent = Intent(requireContext(), BarcodeScannerActivity::class.java).apply {
                putExtra(BarcodeScannerActivity.EXTRA_SCAN_TITLE, "Presensi Masuk Perpustakaan")
                putExtra(BarcodeScannerActivity.EXTRA_SCAN_SUBTITLE, "Arahkan kamera ke QR Code Kartu Santri/Siswa")
            }
            scanPresensiLauncher.launch(intent)
        }

        binding.btnInputManualNis.setOnClickListener {
            showInputNisDialog()
        }

        binding.btnDismissError.setOnClickListener {
            viewModel.dismissError()
        }

        binding.btnDismissSuccess.setOnClickListener {
            viewModel.dismissSuccessCard()
        }

        binding.btnRefresh.setOnClickListener {
            viewModel.loadKunjunganHariIni()
        }

        binding.chipGroupKeperluan.setOnCheckedStateChangeListener { _, checkedIds ->
            val keperluan = when {
                checkedIds.contains(R.id.chipMembaca) -> "Membaca Buku"
                checkedIds.contains(R.id.chipTugas) -> "Belajar / Tugas"
                checkedIds.contains(R.id.chipSirkulasi) -> "Pinjam / Kembali Buku"
                checkedIds.contains(R.id.chipLainnya) -> "Lainnya"
                else -> "Membaca Buku"
            }
            viewModel.setKeperluan(keperluan)
        }
    }

    private fun observeViewModel() {
        viewModel.isLoading.observe(viewLifecycleOwner) { loading ->
            binding.progressBar.visibility = if (loading) View.VISIBLE else View.GONE
            binding.btnScanPresensi.isEnabled = !loading
            binding.btnInputManualNis.isEnabled = !loading
        }

        viewModel.errorMessage.observe(viewLifecycleOwner) { msg ->
            if (msg.isNullOrBlank()) {
                binding.layoutError.visibility = View.GONE
            } else {
                binding.layoutError.visibility = View.VISIBLE
                binding.tvErrorMessage.text = msg
            }
        }

        viewModel.totalHariIni.observe(viewLifecycleOwner) { count ->
            binding.tvTotalHariIni.text = "$count Santri"
        }

        viewModel.kunjunganList.observe(viewLifecycleOwner) { list ->
            adapter.submitList(list)
            binding.tvEmptyNotice.visibility = if (list.isNullOrEmpty()) View.VISIBLE else View.GONE
        }

        viewModel.lastKunjunganSuccess.observe(viewLifecycleOwner) { res ->
            if (res != null) {
                HapticFeedbackHelper.vibrateShort(requireContext())

                binding.cardSuccess.visibility = View.VISIBLE
                val nama = res.nama ?: "Siswa"
                binding.tvSuccessNama.text = nama

                val initials = nama.split(" ")
                    .filter { it.isNotBlank() }
                    .take(2)
                    .mapNotNull { it.firstOrNull()?.uppercaseChar() }
                    .joinToString("")
                binding.tvSuccessAvatar.text = if (initials.isNotEmpty()) initials else "S"

                binding.tvSuccessKelasNis.text = "Kelas ${res.kelas ?: "-"} • NIS ${res.nis ?: "-"}"
                binding.tvSuccessDetail.text = "Keperluan: ${res.keperluan ?: "Membaca Buku"} • Jam ${res.waktuKunjung ?: "-"} • Kunjungan ke-${res.totalKunjunganSiswa}"

                Toast.makeText(requireContext(), "Selamat datang, $nama!", Toast.LENGTH_SHORT).show()
            } else {
                binding.cardSuccess.visibility = View.GONE
            }
        }
    }

    private fun showInputNisDialog() {
        val editText = EditText(requireContext()).apply {
            hint = "Contoh: 2006107 atau SISWA-2006107"
            setSingleLine()
            setPadding(48, 32, 48, 32)
        }

        AlertDialog.Builder(requireContext())
            .setTitle("Input NIS Santri")
            .setMessage("Ketikkan nomor identitas / NIS santri:")
            .setView(editText)
            .setPositiveButton("Presensi Masuk") { _, _ ->
                val code = editText.text.toString().trim()
                if (code.isNotEmpty()) {
                    viewModel.submitPresensi(code)
                } else {
                    Toast.makeText(requireContext(), "NIS tidak boleh kosong", Toast.LENGTH_SHORT).show()
                }
            }
            .setNegativeButton("Batal", null)
            .show()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
