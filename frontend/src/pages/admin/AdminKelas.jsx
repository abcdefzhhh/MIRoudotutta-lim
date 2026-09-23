import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function AdminKelas() {
  const [kelasList, setKelasList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [filterTingkat, setFilterTingkat] = useState('Semua')
  const [toast, setToast] = useState(null)

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedKelas, setSelectedKelas] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // Form states
  const [formData, setFormData] = useState({
    kelas: '',
    tingkat: 1,
  })

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const fetchKelas = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/kelas')
      if (res.data && res.data.success) {
        setKelasList(res.data.data)
      } else {
        setKelasList([])
      }
    } catch (err) {
      console.error(err)
      setError('Gagal memuat data kelas dari server.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchKelas()
  }, [])

  // Open Create Modal
  const openCreateModal = () => {
    setFormData({ kelas: '', tingkat: 1 })
    setIsCreateOpen(true)
  }

  // Handle Create Submit
  const handleCreateSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/kelas', formData)
      if (res.data && res.data.success) {
        showToast('Kelas baru berhasil ditambahkan.', 'success')
        setIsCreateOpen(false)
        fetchKelas()
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal menambahkan kelas.'
      showToast(msg, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  // Open Edit Modal
  const openEditModal = (item) => {
    setSelectedKelas(item)
    setFormData({
      kelas: item.kelas,
      tingkat: item.tingkat,
    })
    setIsEditOpen(true)
  }

  // Handle Edit Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault()
    if (!selectedKelas) return
    setSubmitting(true)
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/kelas/${selectedKelas.idkelas}`,
        formData
      )
      if (res.data && res.data.success) {
        showToast('Data kelas berhasil diperbarui.', 'success')
        setIsEditOpen(false)
        setSelectedKelas(null)
        fetchKelas()
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal memperbarui kelas.'
      showToast(msg, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  // Open Delete Modal
  const openDeleteModal = (item) => {
    setSelectedKelas(item)
    setIsDeleteOpen(true)
  }

  // Handle Delete Confirm
  const handleDeleteConfirm = async () => {
    if (!selectedKelas) return
    setSubmitting(true)
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/kelas/${selectedKelas.idkelas}`
      )
      if (res.data && res.data.success) {
        showToast('Kelas berhasil dihapus.', 'success')
        setIsDeleteOpen(false)
        setSelectedKelas(null)
        fetchKelas()
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal menghapus kelas.'
      showToast(msg, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const filteredKelas = kelasList.filter((item) => {
    const matchesSearch = item.kelas.toLowerCase().includes(search.toLowerCase())
    const matchesTingkat =
      filterTingkat === 'Semua' || String(item.tingkat) === String(filterTingkat)
    return matchesSearch && matchesTingkat
  })

  const totalSiswaAll = kelasList.reduce((acc, curr) => acc + (curr.total_siswa || 0), 0)

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`p-4 rounded-xl text-sm flex items-center justify-between gap-3 shadow-sm border animate-fade-in ${
            toast.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">
              {toast.type === 'error' ? 'error' : 'check_circle'}
            </span>
            <span className="font-medium">{toast.message}</span>
          </div>
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-slate-600 text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Master Data Kelas
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Daftar tingkatan dan nama kelas dasar di madrasah (Tingkat 1 s/d 6).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/rombel"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">groups</span>
            <span>Atur Rombel &amp; Wali Kelas</span>
          </Link>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-all duration-200 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>+ Tambah Kelas Baru</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Total Kelas Terdaftar
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-slate-900">{kelasList.length}</span>
            <span className="text-xs text-slate-500">Ruang Kelas</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Total Siswa Terdistribusi
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-emerald-600">{totalSiswaAll}</span>
            <span className="text-xs text-slate-500">Siswa Aktif</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Tabel Database
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-xl font-mono font-bold text-slate-800">tbl_kelas</span>
            <span className="text-xs text-slate-500">Tingkat 1 - 6</span>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        {/* Table Filters */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                search
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama kelas..."
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Filter Tingkat */}
            <select
              value={filterTingkat}
              onChange={(e) => setFilterTingkat(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white text-slate-700 font-medium"
            >
              <option value="Semua">Semua Tingkat</option>
              {[1, 2, 3, 4, 5, 6].map((t) => (
                <option key={t} value={t}>
                  Tingkat {t}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 self-end sm:self-auto">
            <span>
              Menampilkan {filteredKelas.length} dari {kelasList.length} kelas
            </span>
            <button
              type="button"
              onClick={fetchKelas}
              className="p-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors"
              title="Refresh Data"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200 text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-16 text-center">ID</th>
                <th className="py-3.5 px-4">Nama Kelas</th>
                <th className="py-3.5 px-4 w-32 text-center">Tingkat</th>
                <th className="py-3.5 px-4 w-36 text-center">Rombel Aktif</th>
                <th className="py-3.5 px-4 w-36 text-center">Total Siswa</th>
                <th className="py-3.5 px-4 w-32 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {/* Loading State */}
              {loading && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    <div className="flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-[28px] animate-spin text-emerald-600">
                        sync
                      </span>
                      <span className="text-xs">Memuat data kelas...</span>
                    </div>
                  </td>
                </tr>
              )}

              {/* Error State */}
              {error && !loading && (
                <tr>
                  <td colSpan="6" className="py-8 text-center">
                    <div className="text-rose-600 text-sm font-medium mb-2">{error}</div>
                    <button
                      onClick={fetchKelas}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                    >
                      Coba Lagi
                    </button>
                  </td>
                </tr>
              )}

              {/* Empty State */}
              {!loading && !error && filteredKelas.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2 text-slate-400">
                      <span className="material-symbols-outlined text-[24px]">meeting_room</span>
                    </div>
                    <p className="text-sm font-medium text-slate-700">Belum ada kelas ditemukan</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Klik tombol "+ Tambah Kelas Baru" untuk menambahkan data kelas pertama.
                    </p>
                  </td>
                </tr>
              )}

              {/* Rows */}
              {!loading &&
                !error &&
                filteredKelas.map((item) => (
                  <tr
                    key={item.idkelas}
                    className="hover:bg-slate-50/70 transition-colors duration-150"
                  >
                    <td className="py-3.5 px-4 text-center font-mono text-xs text-slate-500">
                      {item.idkelas}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 text-base">
                        Kelas {item.kelas}
                      </div>
                      <span className="text-xs text-slate-400">
                        MI Roudotutta'lim • Jenjang Ibtidaiyah
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Tingkat {item.tingkat}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-semibold text-slate-700">
                        {item.total_rombel || 0}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">Rombel</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-semibold text-emerald-700">
                        {item.total_siswa || 0}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">Siswa</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                          title="Edit Kelas"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteModal(item)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Hapus Kelas"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: TAMBAH KELAS */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-4 my-auto animate-modal-pop">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Tambah Kelas Baru</h3>
                <p className="text-xs text-slate-500">Tambahkan nama kelas dan jenjang tingkat.</p>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Kelas *
                </label>
                <input
                  type="text"
                  required
                  value={formData.kelas}
                  onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                  placeholder="Contoh: 1A, 1B, 2A, dll."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tingkat (Jenjang 1 - 6) *
                </label>
                <select
                  value={formData.tingkat}
                  onChange={(e) => setFormData({ ...formData, tingkat: parseInt(e.target.value) })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-white"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      Tingkat {num} (Kelas {num})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium text-xs hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-1.5"
                >
                  {submitting && (
                    <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                  )}
                  <span>Simpan Kelas</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT KELAS */}
      {isEditOpen && selectedKelas && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-4 my-auto animate-modal-pop">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-bold text-lg text-slate-900">
                  Edit Kelas {selectedKelas.kelas}
                </h3>
                <p className="text-xs text-slate-500">Perbarui rincian nama atau jenjang kelas.</p>
              </div>
              <button
                onClick={() => setIsEditOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Kelas *
                </label>
                <input
                  type="text"
                  required
                  value={formData.kelas}
                  onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tingkat (Jenjang 1 - 6) *
                </label>
                <select
                  value={formData.tingkat}
                  onChange={(e) => setFormData({ ...formData, tingkat: parseInt(e.target.value) })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-white"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      Tingkat {num} (Kelas {num})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium text-xs hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-1.5"
                >
                  {submitting && (
                    <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                  )}
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: HAPUS KELAS */}
      {isDeleteOpen && selectedKelas && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-4 my-auto animate-modal-pop">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[28px]">delete_forever</span>
            </div>

            <div className="text-center">
              <h3 className="font-bold text-base text-slate-900">Hapus Data Kelas?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Apakah Anda yakin ingin menghapus kelas:
              </p>
              <p className="text-base font-bold text-slate-800 mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                Kelas {selectedKelas.kelas} (Tingkat {selectedKelas.tingkat})
              </p>
              <p className="text-[11px] text-rose-600 mt-2">
                Kelas yang masih memiliki rombel / tahun ajaran tidak dapat dihapus.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium text-xs hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleDeleteConfirm}
                className="px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-1.5"
              >
                {submitting && (
                  <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                )}
                <span>Ya, Hapus</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
