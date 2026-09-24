package com.example.siperpus.ui.riwayat

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.siperpus.data.model.StatistikSirkulasi
import com.example.siperpus.data.model.TransaksiItem
import com.example.siperpus.data.repository.SirkulasiRepository
import kotlinx.coroutines.launch

class RiwayatViewModel(private val repository: SirkulasiRepository) : ViewModel() {

    private val _statistik = MutableLiveData<StatistikSirkulasi>(StatistikSirkulasi())
    val statistik: LiveData<StatistikSirkulasi> = _statistik

    private val _rawList = mutableListOf<TransaksiItem>()
    private val _filteredList = MutableLiveData<List<TransaksiItem>>(emptyList())
    val filteredList: LiveData<List<TransaksiItem>> = _filteredList

    private val _selectedFilter = MutableLiveData("all") // "all", "peminjaman", "pengembalian"
    val selectedFilter: LiveData<String> = _selectedFilter

    private val _isLoading = MutableLiveData(false)
    val isLoading: LiveData<Boolean> = _isLoading

    private val _errorMessage = MutableLiveData<String?>(null)
    val errorMessage: LiveData<String?> = _errorMessage

    fun loadData() {
        _isLoading.value = true
        _errorMessage.value = null

        viewModelScope.launch {
            // Load stats
            val statsResult = repository.getStatistik()
            statsResult.onSuccess { stats ->
                _statistik.value = stats
            }

            // Load history
            val historyResult = repository.getRiwayat()
            _isLoading.value = false

            historyResult.fold(
                onSuccess = { list ->
                    _rawList.clear()
                    _rawList.addAll(list)
                    applyFilter(_selectedFilter.value ?: "all")
                },
                onFailure = { err ->
                    _errorMessage.value = err.localizedMessage ?: "Gagal memuat riwayat transaksi"
                }
            )
        }
    }

    fun applyFilter(filter: String) {
        _selectedFilter.value = filter
        if (filter == "all") {
            _filteredList.value = _rawList
        } else {
            _filteredList.value = _rawList.filter {
                it.tipe.equals(filter, ignoreCase = true)
            }
        }
    }
}
