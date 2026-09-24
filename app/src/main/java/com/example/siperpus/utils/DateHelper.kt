package com.example.siperpus.utils

import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

object DateHelper {

    private val localeId = Locale("id", "ID")

    fun formatIndonesianDate(dateString: String?): String {
        if (dateString.isNullOrBlank()) return "-"
        return try {
            val inputFormat = SimpleDateFormat("yyyy-MM-dd", localeId)
            val date: Date = inputFormat.parse(dateString) ?: return dateString
            val outputFormat = SimpleDateFormat("dd MMM yyyy", localeId)
            outputFormat.format(date)
        } catch (e: Exception) {
            dateString
        }
    }

    fun getCurrentTimestampIndo(): String {
        return try {
            val outputFormat = SimpleDateFormat("dd MMM yyyy, HH:mm 'WIB'", localeId)
            outputFormat.format(Date())
        } catch (e: Exception) {
            ""
        }
    }
}
