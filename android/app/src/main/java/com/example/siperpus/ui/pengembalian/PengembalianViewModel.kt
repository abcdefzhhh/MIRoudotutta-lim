package com.example.siperpus.ui.pengembalian

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.siperpus.data.model.PengembalianScanResponse
import com.example.siperpus.data.repository.SirkulasiRepository
import kotlinx.coroutines.launch

class PengembalianViewModel(private val repository: SirkulasiRepository) : ViewModel() {

    private val _scanData = MutableLiveData<PengembalianScanResponse?>(null)
    val scanData: LiveData<PengembalianScanResponse?> = _scanData

    private val _selectedCondition = MutableLiveData("baik") // "baik", "rusak", "hilang"
    val selectedCondition: LiveData<String> = _selectedCondition

    private val _isFinePaid = MutableLiveData(true)
    val isFinePaid: LiveData<Boolean> = _isFinePaid

    private val _isLoading = MutableLiveData(false)
    val isLoading: LiveData<Boolean> = _isLoading

    private val _errorMessage = MutableLiveData<String?>(null)
    val errorMessage: LiveData<String?> = _errorMessage

    private val _successMessage = MutableLiveData<String?>(null)
    val successMessage: LiveData<String?> = _successMessage

    fun scanBukuPengembalian(kode: String) {
        if (kode.isBlank()) return
        _isLoading.value = true
        _errorMessage.value = null

        viewModelScope.launch {
            val result = repository.scanPengembalian(kode)
            _isLoading.value = false
            result.fold(
                onSuccess = { data ->
                    _scanData.value = data
                },
                onFailure = { err ->
                    _errorMessage.value = err.localizedMessage ?: "Buku tidak ditemukan dalam data peminjaman aktif"
                }
            )
        }
    }

    fun setCondition(condition: String) {
        _selectedCondition.value = condition
    }

    fun setFinePaid(paid: Boolean) {
        _isFinePaid.value = paid
    }

    fun submitPengembalian(catatan: String? = null) {
        val data = _scanData.value
        if (data == null) {
            _errorMessage.value = "Silakan scan barcode buku terlebih dahulu"
            return
        }

        _isLoading.value = true
        _errorMessage.value = null

        viewModelScope.launch {
            val condition = _selectedCondition.value ?: "baik"
            val fineToPay = if (_isFinePaid.value == true) data.totalDenda else 0L

            val result = repository.submitPengembalian(
                kode = data.kodebukudetail,
                kondisi = condition,
                dendaDibayar = fineToPay,
                catatan = catatan
            )

            _isLoading.value = false
            result.fold(
                onSuccess = { msg ->
                    _successMessage.value = msg
                    reset()
                },
                onFailure = { err ->
                    _errorMessage.value = err.localizedMessage ?: "Gagal memproses pengembalian"
                }
            )
        }
    }

    fun reset() {
        _scanData.value = null
        _selectedCondition.value = "baik"
        _isFinePaid.value = true
        _errorMessage.value = null
    }

    fun clearError() {
        _errorMessage.value = null
    }

    fun clearSuccess() {
        _successMessage.value = null
    }
}
