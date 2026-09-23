import { useState, useEffect } from 'react'
import axios from 'axios'
import BatchQrCardsModal, { StudentQrCard } from '../../components/BatchQrCardsModal'


export default function AdminSiswa() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedRombel, setSelectedRombel] = useState('')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    from: 0,
    to: 0,
    per_page: 25,
  })
  const [toast, setToast] = useState(null)

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isQrCardOpen, setIsQrCardOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // Batch QR Card per Class
  const [isBatchQrOpen, setIsBatchQrOpen] = useState(false)
  const [batchClass, setBatchClass] = useState('1A')
  const [batchStudents, setBatchStudents] = useState([])
  const [loadingBatch, setLoadingBatch] = useState(false)

  const classList = [
    '1A', '1B', '1C',
    '2A', '2B', '2C',
    '3A', '3B', '3C',
    '4A', '4B', '4C',
    '5A', '5B', '5C',
    '6A', '6B', '6C',
  ]

  const openBatchQrModal = async (cls = '1A') => {
    setBatchClass(cls)
    setIsBatchQrOpen(true)
    setLoadingBatch(true)
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/siswa', {
        params: { rombel: cls, per_page: 100 },
      })
      if (res.data?.success && res.data.data?.data) {
        setBatchStudents(res.data.data.data)
      } else {
        setBatchStudents([])
      }
    } catch (err) {
      console.error(err)
      showToast('Gagal memuat daftar siswa untuk cetak kartu.', 'error')
    } finally {
      setLoadingBatch(false)
    }
  }

  // Form states
  const [formData, setFormData] = useState({
    nis: '',
    nisn: '',
    nama: '',
  })

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const fetchStudents = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/siswa', {
        params: {
          search: search || undefined,
          rombel: selectedRombel || undefined,
          page,
          per_page: 25,
        },
      })
      if (res.data?.success && res.data.data?.data) {
        setStudents(res.data.data.data)
        setPagination({
          current_page: res.data.data.current_page || 1,
          last_page: res.data.data.last_page || 1,
          total: res.data.data.total || 0,
          from: res.data.data.from || 0,
          to: res.data.data.to || 0,
          per_page: res.data.data.per_page || 25,
        })
      } else {
        setStudents([])
      }
    } catch (err) {
      console.error(err)
      setError('Gagal memuat data siswa dari server.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [search, selectedRombel, page])

  const handleSearchChange = (val) => {
    setSearch(val)
    setPage(1)
  }

  const handleRombelChange = (val) => {
    setSelectedRombel(val)
    setPage(1)
  }

  const handleCreateSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/siswa', formData)
      if (res.data?.success) {
        showToast('Data siswa baru berhasil ditambahkan!')
        setIsCreateOpen(false)
        setFormData({ nis: '', nisn: '', nama: '' })
        fetchStudents()
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal menambahkan siswa.'
      showToast(msg, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const openEditModal = (student) => {
    setSelectedStudent(student)
    setFormData({
      nis: student.nis,
      nisn: student.nisn || '',
      nama: student.nama,
    })
    setIsEditOpen(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/siswa/${selectedStudent.idsiswa}`,
        formData
      )
      if (res.data?.success) {
        showToast('Data siswa berhasil diperbarui!')
        setIsEditOpen(false)
        fetchStudents()
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal memperbarui data siswa.'
      showToast(msg, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const openDeleteModal = (student) => {
    setSelectedStudent(student)
    setIsDeleteOpen(true)
  }

  const handleDeleteSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/siswa/${selectedStudent.idsiswa}`
      )
      if (res.data?.success) {
        showToast('Data siswa berhasil dihapus.')
        setIsDeleteOpen(false)
        fetchStudents()
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal menghapus siswa.'
      showToast(msg, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const openQrCard = (student) => {
    setSelectedStudent(student)
    setIsQrCardOpen(true)
  }

  const handlePrintCard = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`p-4 rounded-xl text-sm flex items-center justify-between gap-3 shadow-sm border animate-fade-in ${toast.type === 'error'
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

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Master Data Siswa
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Daftar seluruh siswa aktif MI Roudotutta'lim dan fitur cetak Kartu Pelajar ber-QR Code.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => openBatchQrModal(selectedRombel || '1A')}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-[0.98] cursor-pointer"
            title="Cetak Kartu siswa ber-QR Code sekaligus per kelas"
          >
            <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
            <span>Cetak QR per Kelas</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setFormData({ nis: '', nisn: '', nama: '' })
              setIsCreateOpen(true)
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>+ Tambah Siswa Baru</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        {/* Filter bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-white flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1">
            <div className="relative w-full sm:w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                search
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Cari NIS, NISN, atau Nama..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="w-full sm:w-56">
              <select
                value={selectedRombel}
                onChange={(e) => handleRombelChange(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
              >
                <option value="">Semua Rombel (18 Kelas)</option>
                <optgroup label="Tingkat 1">
                  <option value="1A">Kelas 1A</option>
                  <option value="1B">Kelas 1B</option>
                  <option value="1C">Kelas 1C</option>
                </optgroup>
                <optgroup label="Tingkat 2">
                  <option value="2A">Kelas 2A</option>
                  <option value="2B">Kelas 2B</option>
                  <option value="2C">Kelas 2C</option>
                </optgroup>
                <optgroup label="Tingkat 3">
                  <option value="3A">Kelas 3A</option>
                  <option value="3B">Kelas 3B</option>
                  <option value="3C">Kelas 3C</option>
                </optgroup>
                <optgroup label="Tingkat 4">
                  <option value="4A">Kelas 4A</option>
                  <option value="4B">Kelas 4B</option>
                  <option value="4C">Kelas 4C</option>
                </optgroup>
                <optgroup label="Tingkat 5">
                  <option value="5A">Kelas 5A</option>
                  <option value="5B">Kelas 5B</option>
                  <option value="5C">Kelas 5C</option>
                </optgroup>
                <optgroup label="Tingkat 6">
                  <option value="6A">Kelas 6A</option>
                  <option value="6B">Kelas 6B</option>
                  <option value="6C">Kelas 6C</option>
                </optgroup>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-500 shrink-0">
            <span>
              Total: <strong className="text-slate-800 font-semibold">{pagination.total}</strong> siswa
            </span>
            <button
              type="button"
              onClick={fetchStudents}
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
                <th className="py-3 px-4 w-12 text-center">No</th>
                <th className="py-3 px-4 w-32 font-mono">NIS</th>
                <th className="py-3 px-4 w-32 font-mono">NISN</th>
                <th className="py-3 px-4">Nama Lengkap Siswa</th>
                <th className="py-3 px-4 w-32">Kelas</th>
                <th className="py-3 px-4 w-44 text-center">Aksi &amp; Kartu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading && (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-xs text-slate-500">
                    <span className="material-symbols-outlined text-[24px] animate-spin text-emerald-600 block mb-1">
                      sync
                    </span>
                    Memuat data siswa...
                  </td>
                </tr>
              )}

              {error && !loading && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-xs text-rose-600">
                    {error}
                  </td>
                </tr>
              )}

              {!loading && !error && students.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-xs text-slate-500">
                    Tidak ada siswa ditemukan.
                  </td>
                </tr>
              )}

              {!loading &&
                !error &&
                students.map((st, idx) => {
                  const rombel =
                    st.siswa_kelas?.[0]?.kelas_detail?.kelas?.kelas || '-'
                  return (
                    <tr
                      key={st.idsiswa}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="py-3 px-4 text-center text-xs text-slate-400">
                        {(pagination.from || 1) + idx}
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-xs text-slate-900">
                        {st.nis}
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-500">
                        {st.nisn || '-'}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-900">
                          {st.nama}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Kelas {rombel}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Cetak QR Card */}
                          <button
                            type="button"
                            onClick={() => openQrCard(st)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-colors"
                            title="Cetak Kartu Siswa & QR Code"
                          >
                            <span className="material-symbols-outlined text-[15px]">
                              qr_code
                            </span>
                            <span>Kartu</span>
                          </button>

                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() => openEditModal(st)}
                            className="p-1 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="Edit Data"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              edit
                            </span>
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => openDeleteModal(st)}
                            className="p-1 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Hapus Data"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {!loading && pagination.total > 0 && (
          <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              Menampilkan <span className="font-semibold text-slate-900">{pagination.from || 0}</span>–<span className="font-semibold text-slate-900">{pagination.to || 0}</span> dari <span className="font-semibold text-slate-900">{pagination.total || 0}</span> data siswa
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                <span>Sebelumnya</span>
              </button>

              <span className="px-3 py-1 font-semibold text-slate-800">
                {pagination.current_page} / {pagination.last_page}
              </span>

              <button
                type="button"
                disabled={page >= pagination.last_page}
                onClick={() => setPage((prev) => Math.min(pagination.last_page, prev + 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
              >
                <span>Berikutnya</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: TAMBAH SISWA */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in no-print">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 my-auto animate-modal-pop">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Tambah Siswa Baru</h3>
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
                  Nomor Induk Siswa (NIS) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nis}
                  onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                  placeholder="Contoh: 2501031"
                  className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  NISN (Opsional)
                </label>
                <input
                  type="text"
                  value={formData.nisn}
                  onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                  placeholder="Contoh: 0123456731"
                  className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap Siswa *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="Contoh: Muhammad Rayhan Firdaus"
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

      {/* MODAL: EDIT SISWA */}
      {isEditOpen && selectedStudent && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in no-print">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 my-auto animate-modal-pop">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Edit Data Siswa</h3>
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
                  Nomor Induk Siswa (NIS) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nis}
                  onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                  className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  NISN
                </label>
                <input
                  type="text"
                  value={formData.nisn}
                  onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                  className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap Siswa *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
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
      {isDeleteOpen && selectedStudent && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in no-print">
          <div className="relative w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 text-center my-auto animate-modal-pop">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[24px]">delete</span>
            </div>
            <h3 className="font-bold text-base text-slate-900">Hapus Data Siswa?</h3>
            <p className="text-xs text-slate-500 mt-1">
              Data Siswa <strong>{selectedStudent.nama}</strong> (NIS: {selectedStudent.nis}) akan dihapus permanen.
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
                {submitting ? 'Menghapus...' : 'Ya, Hapus Siswa'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CETAK KARTU SISWA DENGAN QR CODE */}
      {isQrCardOpen && selectedStudent && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          style={{ background: 'rgba(2,6,23,0.85)', backdropFilter: 'blur(6px)' }}
        >
          <div className="relative w-full max-w-md my-auto animate-modal-pop" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {/* Modal Header */}
            <div
              className="no-print rounded-t-2xl"
              style={{
                backgroundImage: [
                  'repeating-linear-gradient(45deg, transparent 0px, transparent 18px, rgba(255,255,255,0.025) 18px, rgba(255,255,255,0.025) 19px)',
                  'repeating-linear-gradient(-45deg, transparent 0px, transparent 18px, rgba(255,255,255,0.025) 18px, rgba(255,255,255,0.025) 19px)',
                  'linear-gradient(135deg, #022c22 0%, #064e3b 60%, #065f46 100%)',
                ].join(', '),
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '6px', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'rgba(167,243,208,1)' }}>badge</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '14px', color: '#fff' }}>Kartu Pelajar QR</div>
                  <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '11px', color: 'rgba(167,243,208,0.75)' }}>8.5cm x 5.3cm · CR80 Standard</div>
                </div>
              </div>
              <button
                onClick={() => setIsQrCardOpen(false)}
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '7px', padding: '5px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>close</span>
              </button>
            </div>

            {/* Card Preview Stage */}
            <div
              style={{ background: '#0f172a', padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <div
                id="printable-card"
                className="print-area"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}
              >
                <StudentQrCard
                  student={selectedStudent}
                  rombelName={selectedStudent.siswa_kelas?.[0]?.kelas_detail?.kelas?.kelas || ''}
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div
              className="no-print rounded-b-2xl"
              style={{ background: '#fff', borderTop: '1px solid #e2e8f0', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '11px', color: '#94a3b8' }}>
                Aktifkan <em>Background graphics</em> saat cetak
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsQrCardOpen(false)}
                  style={{ padding: '6px 14px', background: 'transparent', border: '1px solid #e2e8f0', borderRadius: '8px', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: '12px', color: '#475569', cursor: 'pointer' }}
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={handlePrintCard}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', background: '#065f46', border: 'none', borderRadius: '8px', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '12px', color: '#fff', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#047857' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#065f46' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>print</span>
                  <span>Cetak Kartu</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CETAK QR MASSAL PER KELAS */}
      <BatchQrCardsModal
        isOpen={isBatchQrOpen}
        onClose={() => setIsBatchQrOpen(false)}
        selectedClass={batchClass}
        onChangeClass={(newCls) => openBatchQrModal(newCls)}
        classList={classList}
        students={batchStudents}
        loading={loadingBatch}
      />
    </div>
  )
}
