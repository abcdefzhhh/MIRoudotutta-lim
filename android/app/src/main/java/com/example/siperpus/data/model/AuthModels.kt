package com.example.siperpus.data.model

import com.google.gson.annotations.SerializedName

data class LoginRequest(
    @SerializedName("username")
    val username: String,

    @SerializedName("password")
    val password: String
)

data class User(
    @SerializedName("id")
    val id: Int? = null,

    @SerializedName("id_user")
    val idUser: Int? = null,

    @SerializedName("name")
    val name: String? = null,

    @SerializedName("nama_user")
    val namaUser: String? = null,

    @SerializedName("username")
    val username: String? = "",

    @SerializedName("role")
    val role: String? = "pustakawan",

    @SerializedName("email")
    val email: String? = null
) {
    val displayName: String
        get() = namaUser ?: name ?: username ?: "Pustakawan"

    val actualRole: String
        get() = role ?: "pustakawan"
}

data class LoginResponse(
    @SerializedName("success")
    val success: Boolean = true,

    @SerializedName("message")
    val message: String? = null,

    @SerializedName("token")
    val token: String? = null,

    @SerializedName("access_token")
    val accessToken: String? = null,

    @SerializedName("token_type")
    val tokenType: String? = null,

    @SerializedName("user")
    val user: User? = null,

    @SerializedName("data")
    val data: LoginResponse? = null
) {
    val actualToken: String
        get() = token ?: accessToken ?: data?.token ?: data?.accessToken ?: ""

    val actualUser: User?
        get() = user ?: data?.user
}
