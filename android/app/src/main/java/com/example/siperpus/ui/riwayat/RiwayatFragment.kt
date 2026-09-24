package com.example.siperpus.ui.riwayat

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.siperpus.R
import com.example.siperpus.data.repository.SirkulasiRepository
import com.example.siperpus.databinding.FragmentRiwayatBinding
import com.example.siperpus.utils.CurrencyHelper

class RiwayatFragment : Fragment() {

    private var _binding: FragmentRiwayatBinding? = null
    private val binding get() = _binding!!

    private val repository = SirkulasiRepository()
    private val viewModel: RiwayatViewModel by viewModels {
        object : ViewModelProvider.Factory {
            @Suppress("UNCHECKED_CAST")
            override fun <T : ViewModel> create(modelClass: Class<T>): T {
                return RiwayatViewModel(repository) as T
            }
        }
    }

    private lateinit var adapter: TransaksiAdapter

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentRiwayatBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupRecyclerView()
        setupListeners()
        observeViewModel()

        viewModel.loadData()
    }

    private fun setupRecyclerView() {
        adapter = TransaksiAdapter()
        binding.rvTransaksi.apply {
            layoutManager = LinearLayoutManager(requireContext())
            this.adapter = this@RiwayatFragment.adapter
        }
    }

    private fun setupListeners() {
        binding.btnRefresh.setOnClickListener {
            viewModel.loadData()
        }

        binding.btnFilterAll.setOnClickListener {
            updateFilterUi("all")
            viewModel.applyFilter("all")
        }

        binding.btnFilterPinjam.setOnClickListener {
            updateFilterUi("peminjaman")
            viewModel.applyFilter("peminjaman")
        }

        binding.btnFilterKembali.setOnClickListener {
            updateFilterUi("pengembalian")
            viewModel.applyFilter("pengembalian")
        }
    }

    private fun updateFilterUi(activeFilter: String) {
        val white = ContextCompat.getColor(requireContext(), R.color.white)
        val primary = ContextCompat.getColor(requireContext(), R.color.primary)

        binding.btnFilterAll.setTextColor(if (activeFilter == "all") primary else white)
        binding.btnFilterPinjam.setTextColor(if (activeFilter == "peminjaman") primary else white)
        binding.btnFilterKembali.setTextColor(if (activeFilter == "pengembalian") primary else white)
    }

    private fun observeViewModel() {
        viewModel.statistik.observe(viewLifecycleOwner) { stats ->
            binding.tvStatTransaksiHariIni.text = stats.transaksiHariIni.toString()
            binding.tvStatPinjamAktif.text = stats.bukuDipinjamAktif.toString()
            binding.tvStatTotalDenda.text = CurrencyHelper.formatRupiah(stats.totalDendaHimpun)
        }

        viewModel.filteredList.observe(viewLifecycleOwner) { list ->
            adapter.submitList(list)
            if (list.isEmpty()) {
                binding.layoutEmpty.visibility = View.VISIBLE
                binding.rvTransaksi.visibility = View.GONE
            } else {
                binding.layoutEmpty.visibility = View.GONE
                binding.rvTransaksi.visibility = View.VISIBLE
            }
        }

        viewModel.isLoading.observe(viewLifecycleOwner) { loading ->
            binding.progressBar.visibility = if (loading) View.VISIBLE else View.GONE
        }

        viewModel.errorMessage.observe(viewLifecycleOwner) { error ->
            if (!error.isNullOrBlank()) {
                binding.tvErrorMessage.visibility = View.VISIBLE
                binding.tvErrorMessage.text = error
            } else {
                binding.tvErrorMessage.visibility = View.GONE
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
