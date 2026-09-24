package com.example.siperpus.utils

import java.text.NumberFormat
import java.util.Locale

object CurrencyHelper {

    private val localeId = Locale("id", "ID")
    private val formatter: NumberFormat = NumberFormat.getCurrencyInstance(localeId).apply {
        maximumFractionDigits = 0
        minimumFractionDigits = 0
    }

    fun formatRupiah(amount: Long): String {
        return try {
            val formatted = formatter.format(amount)
            // Replace standard "Rp" spacing if needed
            formatted.replace("Rp", "Rp ")
        } catch (e: Exception) {
            "Rp $amount"
        }
    }
}
