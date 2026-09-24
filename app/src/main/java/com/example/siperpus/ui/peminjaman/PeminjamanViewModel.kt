package com.example.siperpus.ui.peminjaman

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.siperpus.data.model.BukuDetail
import com.example.siperpus.data.model.PeminjamanResponse
import com.example.siperpus.data.model.Siswa
import com.example.siperpus.data.repository.SirkulasiRepository
import kotlinx.coroutines.launch

class PeminjamanViewModel(private val repository: SirkulasiRepository) : ViewModel() {

    private val _selectedSiswa = MutableLiveData<Siswa?>(null)
    val selectedSiswa: LiveData<Siswa?> = _selectedSiswa

    private val _cartBuku = MutableLiveData<List<BukuDetail>>(emptyList())
    val cartBuku: LiveData<List<BukuDetail>> = _cartBuku

    private val _isLoading = MutableLiveData(false)
    val isLoading: LiveData<Boolean> = _isLoading

    private val _errorMessage = MutableLiveData<String?>(null)
    val errorMessage: LiveData<String?> = _errorMessage

    private val _checkoutSuccess = MutableLiveData<PeminjamanResponse?>(null)
    val checkoutSuccess: LiveData<PeminjamanResponse?> = _checkoutSuccess

    fun scanSiswa(nis: String) {
        val cleanNis = nis.trim()
            .removePrefix("SISWA-")
            .removePrefix("siswa-")
            .removePrefix("SISWA:")
            .removePrefix("siswa:")
            .trim()
        if (cleanNis.isBlank()) return
        _isLoading.value = true
        _errorMessage.value = null

        viewModelScope.launch {
            val result = repository.scanSiswa(cleanNis)
            _isLoading.value = false
            result.fold(
                onSuccess = { siswa ->
                    _selectedSiswa.value = siswa
                },
                onFailure = { err ->
                    _errorMessage.value = err.localizedMessage ?: "Gagal memuat data siswa"
                }
            )
        }
    }

    private val _damagedBookPrompt = MutableLiveData<BukuDetail?>(null)
    val damagedBookPrompt: LiveData<BukuDetail?> = _damagedBookPrompt

    fun scanBuku(kode: String) {
        if (kode.isBlank()) return

        val cleanedKode = repository.cleanKodeBuku(kode)
        val currentList = _cartBuku.value ?: emptyList()

        // Check if already in cart
        if (currentList.any { 
            it.kodebukudetail.equals(kode, ignoreCase = true) || 
            it.kodebukudetail.equals(cleanedKode, ignoreCase = true) 
        }) {
            _errorMessage.value = "Buku dengan kode '$cleanedKode' sudah ada di keranjang pinjam"
            return
        }

        // Check max books limit rule (standard 2 books)
        if (currentList.size >= 2) {
            _errorMessage.value = "Maksimal peminjaman adalah 2 buku per siswa"
            return
        }

        _isLoading.value = true
        _errorMessage.value = null

        viewModelScope.launch {
            val result = repository.scanBuku(cleanedKode)
            _isLoading.value = false
            result.fold(
                onSuccess = { buku ->
                    if (buku.isDipinjam) {
                        _errorMessage.value = "Buku '${buku.judul}' (${buku.kodebukudetail}) sedang dipinjam orang lain"
                    } else if (buku.isHilang) {
                        _errorMessage.value = "Buku '${buku.judul}' berstatus HILANG dan tidak dapat dipinjam"
                    } else if (buku.isRusak) {
                        _damagedBookPrompt.value = buku
                    } else {
                        val updated = currentList.toMutableList().apply { add(buku) }
                        _cartBuku.value = updated
                    }
                },
                onFailure = { err ->
                    _errorMessage.value = err.localizedMessage ?: "Gagal memuat detail buku"
                }
            )
        }
    }

    fun confirmLoanDamagedBook(buku: BukuDetail) {
        val currentList = _cartBuku.value ?: emptyList()
        val updated = currentList.toMutableList().apply { add(buku) }
        _cartBuku.value = updated
        _damagedBookPrompt.value = null
    }

    fun repairAndLoanBook(buku: BukuDetail) {
        viewModelScope.launch {
            _isLoading.value = true
            repository.updateKondisiBuku(buku.kodebukudetail, "baik")
            _isLoading.value = false
            val repaired = buku.copy(kondisi = "baik")
            val currentList = _cartBuku.value ?: emptyList()
            val updated = currentList.toMutableList().apply { add(repaired) }
            _cartBuku.value = updated
            _damagedBookPrompt.value = null
        }
    }

    fun dismissDamagedBookPrompt() {
        _damagedBookPrompt.value = null
    }

    fun removeFromCart(buku: BukuDetail) {
        val current = _cartBuku.value ?: return
        val updated = current.toMutableList().apply { remove(buku) }
        _cartBuku.value = updated
    }

    fun submitCheckout() {
        val siswa = _selectedSiswa.value
        if (siswa == null) {
            _errorMessage.value = "Silakan pindai kartu siswa terlebih dahulu"
            return
        }

        val cart = _cartBuku.value ?: emptyList()
        if (cart.isEmpty()) {
            _errorMessage.value = "Keranjang buku masih kosong. Pindai minimal 1 buku fisik"
            return
        }

        _isLoading.value = true
        _errorMessage.value = null

        viewModelScope.launch {
            val codes = cart.map { it.kodebukudetail }
            val result = repository.submitPeminjaman(siswa.nis, codes)
            _isLoading.value = false
            result.fold(
                onSuccess = { res ->
                    _checkoutSuccess.value = res
                    reset()
                },
                onFailure = { err ->
                    _errorMessage.value = err.localizedMessage ?: "Gagal menyelesaikan peminjaman"
                }
            )
        }
    }

    fun reset() {
        _selectedSiswa.value = null
        _cartBuku.value = emptyList()
        _errorMessage.value = null
    }

    fun clearError() {
        _errorMessage.value = null
    }

    fun clearCheckoutSuccess() {
        _checkoutSuccess.value = null
    }
}
