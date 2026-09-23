import { useState, useEffect } from 'react'
import axios from 'axios'

export default function AdminGuru() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState(null)

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // Form states
  const [formData, setFormData] = useState({
    nip: '',
    nama_guru: '',
    no_hp: '',
  })

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const fetchTeachers = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/guru', {
        params: { search, per_page: 50 },
      })
      if (res.data?.success && res.data.data?.data) {
        setTeachers(res.data.data.data)
      } else {
        setTeachers([])
      }
    } catch (err) {
      console.error(err)
      setError('Gagal memuat data dewan guru dari server.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeachers()
  }, [search])

  const handleCreateSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/guru', formData)
      if (res.data?.success) {
        showToast('Data guru baru berhasil ditambahkan!')
        setIsCreateOpen(false)
        setFormData({ nip: '', nama_guru: '', no_hp: '' })
        fetchTeachers()
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal menambahkan data guru.'
      showToast(msg, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const openEditModal = (teacher) => {
    setSelectedTeacher(teacher)
    setFormData({
      nip: teacher.nip,
      nama_guru: teacher.nama_guru,
      no_hp: teacher.no_hp || '',
    })
    setIsEditOpen(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/guru/${selectedTeacher.idguru}`,
        formData
      )
      if (res.data?.success) {
        showToast('Data guru berhasil diperbarui!')
        setIsEditOpen(false)
        fetchTeachers()
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal memperbarui data guru.'
      showToast(msg, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const openDeleteModal = (teacher) => {
    setSelectedTeacher(teacher)
    setIsDeleteOpen(true)
  }

  const handleDeleteSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/guru/${selectedTeacher.idguru}`
      )
      if (res.data?.success) {
        showToast('Data guru berhasil dihapus.')
        setIsDeleteOpen(false)
        fetchTeachers()
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal menghapus data guru.'
      showToast(msg, 'error')
    } finally {
      setSubmitting(false)
    }
  }

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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Master Data Guru &amp; Tenaga Pendidik
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Daftar asatidz dan pendidik madrasah beserta data kontak dan penugasan wali kelas.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setFormData({ nip: '', nama_guru: '', no_hp: '' })
            setIsCreateOpen(true)
          }}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          <span>+ Tambah Guru Baru</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        {/* Search */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari berdasarkan NIP atau Nama Guru..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-slate-500">
            <span>Ditemukan {teachers.length} guru</span>
            <button
              type="button"
              onClick={fetchTeachers}
              className="p-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors"
              title="Refresh"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200 text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 w-12 text-center">No</th>
                <th className="py-3 px-4 w-48 font-mono">NIP</th>
                <th className="py-3 px-4">Nama Lengkap Guru</th>
                <th className="py-3 px-4 w-44">Nomor HP / WhatsApp</th>
                <th className="py-3 px-4 w-28 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading && (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-xs text-slate-500">
                    <span className="material-symbols-outlined text-[24px] animate-spin text-emerald-600 block mb-1">
                      sync
                    </span>
                    Memuat data guru...
                  </td>
                </tr>
              )}

              {error && !loading && (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-xs text-rose-600">
                    {error}
                  </td>
                </tr>
              )}

              {!loading && !error && teachers.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-xs text-slate-500">
                    Tidak ada data guru ditemukan.
                  </td>
                </tr>
              )}

              {!loading &&
                !error &&
                teachers.map((t, idx) => (
                  <tr key={t.idguru} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 text-center text-xs text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-xs text-slate-900">
                      {t.nip}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-900">{t.nama_guru}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-slate-600">
                      {t.no_hp || '-'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(t)}
                          className="p-1 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                          title="Edit Guru"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteModal(t)}
                          className="p-1 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Hapus Guru"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: TAMBAH GURU */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Tambah Guru Baru</h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor Induk Pegawai (NIP) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nip}
                  onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                  placeholder="Contoh: 198509202010011003"
                  className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap &amp; Gelar *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nama_guru}
                  onChange={(e) => setFormData({ ...formData, nama_guru: e.target.value })}
                  placeholder="Contoh: Muhammad Ridwan, M.Pd"
                  className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor HP / WhatsApp
                </label>
                <input
                  type="text"
                  value={formData.no_hp}
                  onChange={(e) => setFormData({ ...formData, no_hp: e.target.value })}
                  placeholder="Contoh: 081234567892"
                  className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold disabled:opacity-50"
                >
                  {submitting ? 'Menyimpan...' : 'Simpan Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT GURU */}
      {isEditOpen && selectedTeacher && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Edit Data Guru</h3>
              <button
                onClick={() => setIsEditOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor Induk Pegawai (NIP) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nip}
                  onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                  className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap &amp; Gelar *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nama_guru}
                  onChange={(e) => setFormData({ ...formData, nama_guru: e.target.value })}
                  className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor HP / WhatsApp
                </label>
                <input
                  type="text"
                  value={formData.no_hp}
                  onChange={(e) => setFormData({ ...formData, no_hp: e.target.value })}
                  className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold disabled:opacity-50"
                >
                  {submitting ? 'Memperbarui...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DELETE CONFIRMATION */}
      {isDeleteOpen && selectedTeacher && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-sm w-full p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[24px]">delete</span>
            </div>
            <h3 className="font-bold text-base text-slate-900">Hapus Data Guru?</h3>
            <p className="text-xs text-slate-500 mt-1">
              Data <strong>{selectedTeacher.nama_guru}</strong> (NIP: {selectedTeacher.nip}) akan dihapus permanen.
            </p>

            <div className="mt-5 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleDeleteSubmit}
                className="px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold disabled:opacity-50"
              >
                {submitting ? 'Menghapus...' : 'Ya, Hapus Data'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
