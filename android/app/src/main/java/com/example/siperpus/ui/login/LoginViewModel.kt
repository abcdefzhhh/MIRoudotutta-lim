package com.example.siperpus.ui.login

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.siperpus.data.model.LoginResponse
import com.example.siperpus.data.repository.AuthRepository
import kotlinx.coroutines.launch

sealed class LoginUiState {
    object Idle : LoginUiState()
    object Loading : LoginUiState()
    data class Success(val response: LoginResponse) : LoginUiState()
    data class Error(val message: String) : LoginUiState()
}

class LoginViewModel(private val authRepository: AuthRepository) : ViewModel() {

    private val _uiState = MutableLiveData<LoginUiState>(LoginUiState.Idle)
    val uiState: LiveData<LoginUiState> = _uiState

    fun login(username: String, pass: String) {
        if (username.isBlank() || pass.isBlank()) {
            _uiState.value = LoginUiState.Error("Username dan kata sandi wajib diisi")
            return
        }

        _uiState.value = LoginUiState.Loading
        viewModelScope.launch {
            val result = authRepository.login(username, pass)
            result.fold(
                onSuccess = { response ->
                    _uiState.value = LoginUiState.Success(response)
                },
                onFailure = { error ->
                    _uiState.value = LoginUiState.Error(error.localizedMessage ?: "Login gagal")
                }
            )
        }
    }
}
