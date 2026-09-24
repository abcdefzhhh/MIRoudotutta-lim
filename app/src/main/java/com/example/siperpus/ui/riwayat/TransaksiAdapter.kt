package com.example.siperpus.ui.riwayat

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.example.siperpus.R
import com.example.siperpus.data.model.TransaksiItem
import com.example.siperpus.databinding.ItemTransaksiBinding
import com.example.siperpus.utils.CurrencyHelper

class TransaksiAdapter : RecyclerView.Adapter<TransaksiAdapter.ViewHolder>() {

    private val items = mutableListOf<TransaksiItem>()

    fun submitList(newItems: List<TransaksiItem>) {
        items.clear()
        items.addAll(newItems)
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = ItemTransaksiBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(items[position])
    }

    override fun getItemCount(): Int = items.size

    inner class ViewHolder(private val binding: ItemTransaksiBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(item: TransaksiItem) {
            val context = itemView.context

            binding.tvTipeTransaksi.text = item.tipe.replaceFirstChar { it.uppercase() }
            binding.tvWaktu.text = item.waktu
            binding.tvStatus.text = item.status
            binding.tvNamaSiswa.text = item.namaSiswa
            binding.tvKelasSiswa.text = if (!item.kelas.isNullOrBlank()) "Kelas ${item.kelas}" else "Santri MI"

            binding.tvJudulBuku.text = item.judulBuku ?: "Koleksi Sirkulasi"
            binding.tvKodeBuku.text = item.kodebukudetail ?: "-"

            // Style type badge
            if (item.tipe.equals("pengembalian", ignoreCase = true)) {
                binding.tvTipeTransaksi.background = ContextCompat.getDrawable(context, R.drawable.bg_badge_gold)
                binding.tvTipeTransaksi.setTextColor(ContextCompat.getColor(context, R.color.on_secondary_container))
            } else {
                binding.tvTipeTransaksi.background = ContextCompat.getDrawable(context, R.drawable.bg_badge_green)
                binding.tvTipeTransaksi.setTextColor(ContextCompat.getColor(context, R.color.on_primary_container))
            }

            // Denda display
            if (item.denda > 0) {
                binding.tvDendaInfo.visibility = View.VISIBLE
                binding.tvDendaInfo.text = "Denda: ${CurrencyHelper.formatRupiah(item.denda)}"
            } else {
                binding.tvDendaInfo.visibility = View.GONE
            }
        }
    }
}
