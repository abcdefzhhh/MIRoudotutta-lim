package com.example.siperpus.data.model

import com.google.gson.annotations.SerializedName

/**
 * Standard Laravel API response wrapper
 */
data class ApiResponse<T>(
    @SerializedName("success")
    val success: Boolean,

    @SerializedName("message")
    val message: String? = null,

    @SerializedName("data")
    val data: T? = null,

    @SerializedName("errors")
    val errors: Any? = null
)
