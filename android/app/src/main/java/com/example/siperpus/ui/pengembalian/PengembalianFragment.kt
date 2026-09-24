package com.example.siperpus.ui.pengembalian

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
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.siperpus.R
import com.example.siperpus.data.repository.SirkulasiRepository
import com.example.siperpus.databinding.FragmentPengembalianBinding
import com.example.siperpus.scanner.BarcodeScannerActivity
import com.example.siperpus.utils.CurrencyHelper
import com.example.siperpus.utils.DateHelper

class PengembalianFragment : Fragment() {

    private var _binding: FragmentPengembalianBinding? = null
    private val binding get() = _binding!!

    private val repository = SirkulasiRepository()
    private val viewModel: PengembalianViewModel by viewModels {
        object : ViewModelProvider.Factory {
            @Suppress("UNCHECKED_CAST")
            override fun <T : ViewModel> create(modelClass: Class<T>): T {
                return PengembalianViewModel(repository) as T
            }
        }
    }

    private val scanBukuLauncher =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            if (result.resultCode == Activity.RESULT_OK) {
                val code = result.data?.getStringExtra(BarcodeScannerActivity.EXTRA_SCANNED_VALUE)
                if (!code.isNullOrBlank()) {
                    viewModel.scanBukuPengembalian(code)
                }
            }
        }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentPengembalianBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupListeners()
        observeViewModel()
    }

    private fun setupListeners() {
        binding.btnScanBukuKembali.setOnClickListener {
            val intent = Intent(requireContext(), BarcodeScannerActivity::class.java).apply {
                putExtra(BarcodeScannerActivity.EXTRA_SCAN_TITLE, "Scan Buku Pengembalian")
                putExtra(BarcodeScannerActivity.EXTRA_SCAN_SUBTITLE, "Arahkan kamera ke barcode buku yang dikembalikan")
            }
            scanBukuLauncher.launch(intent)
        }

        binding.btnInputManualKembali.setOnClickListener {
            showInputManualDialog()
        }

        binding.btnDismissError.setOnClickListener {
            viewModel.clearError()
        }

        binding.rgKondisi.setOnCheckedChangeListener { _, checkedId ->
            val condition = when (checkedId) {
                R.id.rbRusak -> "rusak"
                R.id.rbHilang -> "hilang"
                else -> "baik"
            }
            viewModel.setCondition(condition)
        }

        binding.cbDendaPaid.setOnCheckedChangeListener { _, isChecked ->
            viewModel.setFinePaid(isChecked)
        }

        binding.btnSubmitPengembalian.setOnClickListener {
            val data = viewModel.scanData.value ?: return@setOnClickListener
            val condition = viewModel.selectedCondition.value ?: "baik"
            val fine = data.totalDenda

            var msg = "Konfirmasi pengembalian buku '${data.judul}' (${data.kodebukudetail})?\n\nKondisi: $condition"
            if (fine > 0) {
                msg += "\nTotal Denda: ${CurrencyHelper.formatRupiah(fine)}"
            }

            AlertDialog.Builder(requireContext())
                .setTitle("Konfirmasi Pengembalian")
                .setMessage(msg)
                .setPositiveButton("Ya, Selesaikan") { _, _ ->
                    viewModel.submitPengembalian()
                }
                .setNegativeButton("Batal", null)
                .show()
        }
    }

    private fun observeViewModel() {
        viewModel.scanData.observe(viewLifecycleOwner) { data ->
            if (data != null) {
                binding.cardEmptyPrompt.visibility = View.GONE
                binding.layoutScannedContent.visibility = View.VISIBLE

                binding.tvKodeBuku.text = data.kodebukudetail
                binding.tvJudulBuku.text = data.judul

                val peminjam = data.peminjam
                if (peminjam != null) {
                    binding.tvNamaPeminjam.text = peminjam.nama
                    binding.tvKelasPeminjam.text = "${peminjam.kelasLengkap} • NIS: ${peminjam.nis}"
                } else {
                    binding.tvNamaPeminjam.text = "Siswa Terdaftar"
                    binding.tvKelasPeminjam.text = "NIS Aktif"
                }

                binding.tvTanggalPinjam.text = DateHelper.formatIndonesianDate(data.tanggalPinjam)
                binding.tvJatuhTempo.text = DateHelper.formatIndonesianDate(data.jatuhTempo)

                // Denda calculation & display
                if (data.hariTerlambat > 0) {
                    binding.cardDenda.setCardBackgroundColor(
                        ContextCompat.getColor(requireContext(), R.color.error_container)
                    )
                    binding.tvStatusKeterlambatan.text = "⚠️ Terlambat ${data.hariTerlambat} Hari"
                    binding.tvStatusKeterlambatan.setTextColor(
                        ContextCompat.getColor(requireContext(), R.color.error)
                    )
                    binding.tvTotalDenda.text = CurrencyHelper.formatRupiah(data.totalDenda)
                    binding.tvTotalDenda.setTextColor(
                        ContextCompat.getColor(requireContext(), R.color.error)
                    )
                    binding.cardBayarDenda.visibility = View.VISIBLE
                    binding.tvDendaPaidTitle.text = "Denda ${CurrencyHelper.formatRupiah(data.totalDenda)} telah dibayar tunai"
                } else {
                    binding.cardDenda.setCardBackgroundColor(
                        ContextCompat.getColor(requireContext(), R.color.success_container)
                    )
                    binding.tvStatusKeterlambatan.text = "✅ Tepat Waktu"
                    binding.tvStatusKeterlambatan.setTextColor(
                        ContextCompat.getColor(requireContext(), R.color.primary)
                    )
                    binding.tvTotalDenda.text = "Rp 0"
                    binding.tvTotalDenda.setTextColor(
                        ContextCompat.getColor(requireContext(), R.color.primary)
                    )
                    binding.cardBayarDenda.visibility = View.GONE
                }
            } else {
                binding.cardEmptyPrompt.visibility = View.VISIBLE
                binding.layoutScannedContent.visibility = View.GONE
            }
        }

        viewModel.isLoading.observe(viewLifecycleOwner) { loading ->
            binding.progressBar.visibility = if (loading) View.VISIBLE else View.GONE
            binding.btnScanBukuKembali.isEnabled = !loading
            binding.btnInputManualKembali.isEnabled = !loading
        }

        viewModel.errorMessage.observe(viewLifecycleOwner) { error ->
            if (!error.isNullOrBlank()) {
                binding.layoutError.visibility = View.VISIBLE
                binding.tvErrorMessage.text = error
            } else {
                binding.layoutError.visibility = View.GONE
            }
        }

        viewModel.successMessage.observe(viewLifecycleOwner) { message ->
            if (!message.isNullOrBlank()) {
                AlertDialog.Builder(requireContext())
                    .setTitle("Pengembalian Berhasil!")
                    .setMessage(message)
                    .setPositiveButton("Selesai") { _, _ ->
                        viewModel.clearSuccess()
                    }
                    .show()
            }
        }
    }

    private fun showInputManualDialog() {
        val editText = EditText(requireContext()).apply {
            hint = "Contoh: BK-2023-0512 atau BK-001-1"
            setSingleLine()
            setPadding(48, 32, 48, 32)
        }

        AlertDialog.Builder(requireContext())
            .setTitle("Input Barcode Buku")
            .setMessage("Masukkan kode barcode fisik eksemplar buku:")
            .setView(editText)
            .setPositiveButton("Cari") { _, _ ->
                val code = editText.text.toString().trim()
                if (code.isNotEmpty()) {
                    viewModel.scanBukuPengembalian(code)
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
