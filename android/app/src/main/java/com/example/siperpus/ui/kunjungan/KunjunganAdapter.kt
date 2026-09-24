package com.example.siperpus.ui.kunjungan

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.siperpus.data.model.KunjunganItem
import com.example.siperpus.databinding.ItemKunjunganBinding

class KunjunganAdapter : ListAdapter<KunjunganItem, KunjunganAdapter.KunjunganViewHolder>(DiffCallback) {

    inner class KunjunganViewHolder(private val binding: ItemKunjunganBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(item: KunjunganItem) {
            val nama = item.nama ?: "Siswa"
            binding.tvNamaSiswa.text = nama

            // Generate initials
            val initials = nama.split(" ")
                .filter { it.isNotBlank() }
                .take(2)
                .mapNotNull { it.firstOrNull()?.uppercaseChar() }
                .joinToString("")
            binding.tvAvatarInitials.text = if (initials.isNotEmpty()) initials else "S"

            val kelas = item.kelas ?: "-"
            val nis = item.nis ?: "-"
            binding.tvKelasNis.text = "Kelas $kelas • NIS $nis"

            binding.tvKeperluan.text = item.keperluan ?: "Membaca Buku"
            binding.tvWaktuMasuk.text = item.waktu ?: "-"
            binding.tvTanggal.text = item.tanggal ?: "Hari ini"
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): KunjunganViewHolder {
        val binding = ItemKunjunganBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return KunjunganViewHolder(binding)
    }

    override fun onBindViewHolder(holder: KunjunganViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

    companion object {
        private val DiffCallback = object : DiffUtil.ItemCallback<KunjunganItem>() {
            override fun areItemsTheSame(oldItem: KunjunganItem, newItem: KunjunganItem): Boolean {
                return oldItem.idKunjungan == newItem.idKunjungan
            }

            override fun areContentsTheSame(oldItem: KunjunganItem, newItem: KunjunganItem): Boolean {
                return oldItem == newItem
            }
        }
    }
}
