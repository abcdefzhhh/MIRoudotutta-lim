package com.example.siperpus.ui.peminjaman

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
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.siperpus.data.repository.SirkulasiRepository
import com.example.siperpus.databinding.FragmentPeminjamanBinding
import com.example.siperpus.scanner.BarcodeScannerActivity

class PeminjamanFragment : Fragment() {

    private var _binding: FragmentPeminjamanBinding? = null
    private val binding get() = _binding!!

    private val repository = SirkulasiRepository()
    private val viewModel: PeminjamanViewModel by viewModels {
        object : ViewModelProvider.Factory {
            @Suppress("UNCHECKED_CAST")
            override fun <T : ViewModel> create(modelClass: Class<T>): T {
                return PeminjamanViewModel(repository) as T
            }
        }
    }

    private lateinit var cartAdapter: BukuCartAdapter

    // Scan Siswa launcher
    private val scanSiswaLauncher =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            if (result.resultCode == Activity.RESULT_OK) {
                val scannedCode = result.data?.getStringExtra(BarcodeScannerActivity.EXTRA_SCANNED_VALUE)
                if (!scannedCode.isNullOrBlank()) {
                    viewModel.scanSiswa(scannedCode)
                }
            }
        }

    // Scan Buku launcher
    private val scanBukuLauncher =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            if (result.resultCode == Activity.RESULT_OK) {
                val scannedCode = result.data?.getStringExtra(BarcodeScannerActivity.EXTRA_SCANNED_VALUE)
                if (!scannedCode.isNullOrBlank()) {
                    viewModel.scanBuku(scannedCode)
                }
            }
        }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentPeminjamanBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupRecyclerView()
        setupListeners()
        observeViewModel()
    }

    private fun setupRecyclerView() {
        cartAdapter = BukuCartAdapter { buku ->
            viewModel.removeFromCart(buku)
        }
        binding.rvCartBuku.apply {
            layoutManager = LinearLayoutManager(requireContext())
            adapter = cartAdapter
        }
    }

    private fun setupListeners() {
        // Step 1: Scan Siswa
        binding.btnScanSiswa.setOnClickListener {
            val intent = Intent(requireContext(), BarcodeScannerActivity::class.java).apply {
                putExtra(BarcodeScannerActivity.EXTRA_SCAN_TITLE, "Scan Kartu Siswa")
                putExtra(BarcodeScannerActivity.EXTRA_SCAN_SUBTITLE, "Arahkan kamera ke QR Code Kartu Santri/Siswa")
            }
            scanSiswaLauncher.launch(intent)
        }

        binding.btnInputNisManual.setOnClickListener {
            showInputManualDialog(
                title = "Input NIS Siswa",
                hint = "Contoh: 20240012 atau 0078129031"
            ) { nis ->
                viewModel.scanSiswa(nis)
            }
        }

        binding.btnGantiSiswa.setOnClickListener {
            viewModel.reset()
        }

        // Step 2: Scan Buku
        binding.btnScanBuku.setOnClickListener {
            if (viewModel.selectedSiswa.value == null) {
                Toast.makeText(requireContext(), "Pilih / scan siswa terlebih dahulu!", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            val intent = Intent(requireContext(), BarcodeScannerActivity::class.java).apply {
                putExtra(BarcodeScannerActivity.EXTRA_SCAN_TITLE, "Scan Barcode Buku")
                putExtra(BarcodeScannerActivity.EXTRA_SCAN_SUBTITLE, "Arahkan ke barcode nomor eksemplar buku")
            }
            scanBukuLauncher.launch(intent)
        }

        binding.btnInputKodeBuku.setOnClickListener {
            if (viewModel.selectedSiswa.value == null) {
                Toast.makeText(requireContext(), "Pilih / scan siswa terlebih dahulu!", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            showInputManualDialog(
                title = "Input Barcode Buku",
                hint = "Contoh: BK-001-1 atau BK-2024-0892"
            ) { kode ->
                viewModel.scanBuku(kode)
            }
        }

        // Dismiss error
        binding.btnDismissError.setOnClickListener {
            viewModel.clearError()
        }

        // Step 3: Checkout Action
        binding.btnSubmitPeminjaman.setOnClickListener {
            val siswa = viewModel.selectedSiswa.value
            val cart = viewModel.cartBuku.value ?: emptyList()

            if (siswa == null) {
                Toast.makeText(requireContext(), "Silakan pilih siswa terlebih dahulu", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            if (cart.isEmpty()) {
                Toast.makeText(requireContext(), "Keranjang buku masih kosong", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            AlertDialog.Builder(requireContext())
                .setTitle("Konfirmasi Peminjaman")
                .setMessage("Proses peminjaman ${cart.size} buku untuk siswa:\n${siswa.nama} (${siswa.kelasLengkap})?")
                .setPositiveButton("Ya, Pinjamkan") { _, _ ->
                    viewModel.submitCheckout()
                }
                .setNegativeButton("Batal", null)
                .show()
        }
    }

    private fun observeViewModel() {
        // Observe Selected Siswa
        viewModel.selectedSiswa.observe(viewLifecycleOwner) { siswa ->
            if (siswa != null) {
                binding.cardScanSiswaPrompt.visibility = View.GONE
                binding.cardSiswaSelected.visibility = View.VISIBLE
                binding.tvNamaSiswa.text = siswa.nama
                binding.tvKelasNis.text = "${siswa.kelasLengkap} • NIS: ${siswa.nis}"
                binding.tvPinjamanAktif.text = "Pinjaman Aktif: ${siswa.pinjamanAktifCount} Buku"
            } else {
                binding.cardScanSiswaPrompt.visibility = View.VISIBLE
                binding.cardSiswaSelected.visibility = View.GONE
            }
        }

        // Observe Cart Buku
        viewModel.cartBuku.observe(viewLifecycleOwner) { books ->
            cartAdapter.submitList(books)
            binding.tvCartCount.text = "${books.size} / 2 Buku"

            if (books.isEmpty()) {
                binding.layoutCartEmpty.visibility = View.VISIBLE
                binding.rvCartBuku.visibility = View.GONE
                binding.btnSubmitPeminjaman.isEnabled = false
            } else {
                binding.layoutCartEmpty.visibility = View.GONE
                binding.rvCartBuku.visibility = View.VISIBLE
                binding.btnSubmitPeminjaman.isEnabled = true
            }
        }

        // Observe Loading
        viewModel.isLoading.observe(viewLifecycleOwner) { loading ->
            binding.progressBar.visibility = if (loading) View.VISIBLE else View.GONE
            binding.btnScanSiswa.isEnabled = !loading
            binding.btnScanBuku.isEnabled = !loading
        }

        // Observe Error
        viewModel.errorMessage.observe(viewLifecycleOwner) { error ->
            if (!error.isNullOrBlank()) {
                binding.layoutError.visibility = View.VISIBLE
                binding.tvErrorMessage.text = error
            } else {
                binding.layoutError.visibility = View.GONE
            }
        }

        // Observe Checkout Success
        viewModel.checkoutSuccess.observe(viewLifecycleOwner) { response ->
            if (response != null) {
                AlertDialog.Builder(requireContext())
                    .setTitle("Peminjaman Berhasil!")
                    .setMessage("Buku telah berhasil dicatat ke sistem.\n\nPeminjam: ${response.namaSiswa ?: response.nis}\nJatuh Tempo: ${response.jatuhTempo ?: "7 Hari ke depan"}")
                    .setPositiveButton("Selesai") { _, _ ->
                        viewModel.clearCheckoutSuccess()
                    }
                    .show()
            }
        }

        // Observe Damaged Book Prompt
        viewModel.damagedBookPrompt.observe(viewLifecycleOwner) { buku ->
            if (buku != null) {
                AlertDialog.Builder(requireContext())
                    .setTitle("Peringatan: Buku Rusak")
                    .setMessage("Buku '${buku.judul}' (${buku.kodebukudetail}) tercatat dalam kondisi RUSAK.\n\nApakah buku ini ingin tetap dipinjamkan ke siswa, atau sudah diperbaiki?")
                    .setPositiveButton("Tetap Pinjamkan") { _, _ ->
                        viewModel.confirmLoanDamagedBook(buku)
                    }
                    .setNeutralButton("Ubah ke Baik & Pinjam") { _, _ ->
                        viewModel.repairAndLoanBook(buku)
                    }
                    .setNegativeButton("Batal") { _, _ ->
                        viewModel.dismissDamagedBookPrompt()
                    }
                    .setCancelable(false)
                    .show()
            }
        }
    }

    private fun showInputManualDialog(
        title: String,
        hint: String,
        onInputReceived: (String) -> Unit
    ) {
        val editText = EditText(requireContext()).apply {
            this.hint = hint
            setSingleLine()
            setPadding(48, 32, 48, 32)
        }

        AlertDialog.Builder(requireContext())
            .setTitle(title)
            .setView(editText)
            .setPositiveButton("Cari / Masukkan") { _, _ ->
                val text = editText.text.toString().trim()
                if (text.isNotEmpty()) {
                    onInputReceived(text)
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
