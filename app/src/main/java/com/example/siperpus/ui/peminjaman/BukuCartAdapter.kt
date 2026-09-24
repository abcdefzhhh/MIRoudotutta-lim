package com.example.siperpus.ui.peminjaman

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.siperpus.data.model.BukuDetail
import com.example.siperpus.databinding.ItemBukuCartBinding

class BukuCartAdapter(
    private val onRemoveClick: (BukuDetail) -> Unit
) : RecyclerView.Adapter<BukuCartAdapter.ViewHolder>() {

    private val items = mutableListOf<BukuDetail>()

    fun submitList(newItems: List<BukuDetail>) {
        items.clear()
        items.addAll(newItems)
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = ItemBukuCartBinding.inflate(
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

    inner class ViewHolder(private val binding: ItemBukuCartBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(buku: BukuDetail) {
            binding.tvJudulBuku.text = buku.judul
            binding.tvKodeBuku.text = buku.kodebukudetail
            binding.tvKondisi.text = "Kondisi: ${buku.kondisi.replaceFirstChar { it.uppercase() }}"

            binding.btnRemove.setOnClickListener {
                onRemoveClick(buku)
            }
        }
    }
}
