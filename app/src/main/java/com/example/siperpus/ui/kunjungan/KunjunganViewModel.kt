package com.example.siperpus.ui.kunjungan

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.siperpus.data.model.KunjunganItem
import com.example.siperpus.data.model.KunjunganResponse
import com.example.siperpus.data.repository.KunjunganRepository
import kotlinx.coroutines.launch

class KunjunganViewModel(private val repository: KunjunganRepository = KunjunganRepository()) : ViewModel() {

    private val _isLoading = MutableLiveData(false)
    val isLoading: LiveData<Boolean> = _isLoading

    private val _errorMessage = MutableLiveData<String?>(null)
    val errorMessage: LiveData<String?> = _errorMessage

    private val _lastKunjunganSuccess = MutableLiveData<KunjunganResponse?>(null)
    val lastKunjunganSuccess: LiveData<KunjunganResponse?> = _lastKunjunganSuccess

    private val _totalHariIni = MutableLiveData(0)
    val totalHariIni: LiveData<Int> = _totalHariIni

    private val _kunjunganList = MutableLiveData<List<KunjunganItem>>(emptyList())
    val kunjunganList: LiveData<List<KunjunganItem>> = _kunjunganList

    private val _selectedKeperluan = MutableLiveData("Membaca Buku")
    val selectedKeperluan: LiveData<String> = _selectedKeperluan

    fun setKeperluan(keperluan: String) {
        _selectedKeperluan.value = keperluan
    }

    fun loadKunjunganHariIni() {
        _isLoading.value = true
        _errorMessage.value = null

        viewModelScope.launch {
            val result = repository.getKunjunganHariIni()
            _isLoading.value = false
            result.fold(
                onSuccess = { res ->
                    _totalHariIni.value = res.totalHariIni
                    _kunjunganList.value = res.list
                },
                onFailure = { err ->
                    _errorMessage.value = err.localizedMessage ?: "Gagal memuat data pengunjung hari ini"
                }
            )
        }
    }

    fun submitPresensi(nis: String) {
        val cleanNis = nis.trim()
            .removePrefix("SISWA-")
            .removePrefix("siswa-")
            .removePrefix("SISWA:")
            .removePrefix("siswa:")
            .trim()

        if (cleanNis.isBlank()) return

        _isLoading.value = true
        _errorMessage.value = null

        val keperluan = _selectedKeperluan.value ?: "Membaca Buku"

        viewModelScope.launch {
            val result = repository.recordKunjungan(cleanNis, keperluan)
            _isLoading.value = false
            result.fold(
                onSuccess = { res ->
                    _lastKunjunganSuccess.value = res
                    _totalHariIni.value = res.totalKunjunganHariIni

                    // Prepend to current list
                    val current = _kunjunganList.value?.toMutableList() ?: mutableListOf()
                    val newItem = KunjunganItem(
                        idKunjungan = res.idKunjungan,
                        idSiswa = res.idSiswa,
                        nis = res.nis,
                        nama = res.nama,
                        kelas = res.kelas,
                        keperluan = res.keperluan,
                        waktu = res.waktuKunjung,
                        tanggal = res.tanggal
                    )
                    current.add(0, newItem)
                    _kunjunganList.value = current
                },
                onFailure = { err ->
                    _errorMessage.value = err.localizedMessage ?: "Gagal mencatat izin masuk siswa"
                }
            )
        }
    }

    fun dismissSuccessCard() {
        _lastKunjunganSuccess.value = null
    }

    fun dismissError() {
        _errorMessage.value = null
    }
}
