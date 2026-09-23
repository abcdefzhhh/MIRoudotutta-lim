import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

const fallbackNewsImg =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBePtJMaCotwUdo_WVJlOrgnrXRzFsC9mCFuCnJrbbzK08aZUjZ_F5K_BmIDAZKIFMKDQhJmVn3C8SiPobA44tHCsNDPD52AKiuutsgnrgBHo5gVVnFsZlFOVd11qSda7EjMzirIGi92dBE9dPD24vhJQ30BbUBeh91fZpeWcRJ_8Kqymu0Awmfth_MEAkC_xsX6vOBjSfYy1LUSYwIfY4FDLtuISJggPnPsMGAxDTLLiIJV1Fe9PslNA'

export default function AdminBerita() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [toast, setToast] = useState(null)

  const categories = ['Semua', 'Prestasi', 'Kegiatan', 'Pengumuman']

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // Photo upload states
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)

  // Form states
  const [formData, setFormData] = useState({
    judul: '',
    isi_konten: '',
    kategori: 'Kegiatan',
    tgl_publish: new Date().toISOString().split('T')[0],
    gambar_thumbnail: '',
  })

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/gif']
    if (!allowed.includes(file.type)) {
      showToast('Format foto harus berupa JPG, PNG, atau WebP.', 'error')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('Ukuran foto maksimal 5 MB.', 'error')
      return
    }

    setPhotoFile(file)
    const previewUrl = URL.createObjectURL(file)
    setPhotoPreview(previewUrl)
  }

  const handleRemovePhoto = () => {
    setPhotoFile(null)
    setPhotoPreview(null)
    setFormData((prev) => ({ ...prev, gambar_thumbnail: '' }))
  }

  const fetchNews = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/berita')
      if (res.data && res.data.success && res.data.data?.data) {
        setNews(res.data.data.data)
      } else {
        setNews([])
      }
    } catch (err) {
      console.error(err)
      setError('Gagal menghubungkan ke backend API. Pastikan server Laravel aktif.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  // Open Create Modal
  const openCreateModal = () => {
    setPhotoFile(null)
    setPhotoPreview(null)
    setFormData({
      judul: '',
      isi_konten: '',
      kategori: 'Kegiatan',
      tgl_publish: new Date().toISOString().split('T')[0],
      gambar_thumbnail: '',
    })
    setIsCreateOpen(true)
  }

  // Handle Create News
  const handleCreateSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const data = new FormData()
      data.append('judul', formData.judul)
      data.append('isi_konten', formData.isi_konten)
      data.append('kategori', formData.kategori || 'Kegiatan')
      data.append('tgl_publish', formData.tgl_publish)
      if (photoFile) {
        data.append('foto', photoFile)
      } else if (formData.gambar_thumbnail) {
        data.append('gambar_thumbnail', formData.gambar_thumbnail)
      }

      const res = await axios.post('http://127.0.0.1:8000/api/berita', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (res.data && res.data.success) {
        showToast('Berita baru dengan foto berhasil dipublikasikan!', 'success')
        setIsCreateOpen(false)
        setPhotoFile(null)
        setPhotoPreview(null)
        setFormData({
          judul: '',
          isi_konten: '',
          kategori: 'Kegiatan',
          tgl_publish: new Date().toISOString().split('T')[0],
          gambar_thumbnail: '',
        })
        fetchNews()
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal menambahkan berita.'
      showToast(msg, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  // Open Edit Modal
  const openEditModal = (item) => {
    setSelectedArticle(item)
    setPhotoFile(null)
    setPhotoPreview(item.gambar_thumbnail_url || item.gambar_thumbnail || null)
    setFormData({
      judul: item.judul,
      isi_konten: item.isi_konten,
      kategori: item.kategori || 'Kegiatan',
      tgl_publish: item.tgl_publish ? item.tgl_publish.split('T')[0] : '',
      gambar_thumbnail: item.gambar_thumbnail || '',
    })
    setIsEditOpen(true)
  }

  // Handle Edit Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault()
    if (!selectedArticle) return
    setSubmitting(true)
    try {
      const data = new FormData()
      data.append('judul', formData.judul)
      data.append('isi_konten', formData.isi_konten)
      data.append('kategori', formData.kategori || 'Kegiatan')
      data.append('tgl_publish', formData.tgl_publish)
      if (photoFile) {
        data.append('foto', photoFile)
      } else if (formData.gambar_thumbnail) {
        data.append('gambar_thumbnail', formData.gambar_thumbnail)
      }

      const res = await axios.post(
        `http://127.0.0.1:8000/api/berita/${selectedArticle.id_berita}`,
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      if (res.data && res.data.success) {
        showToast('Berita dan foto berhasil diperbarui!', 'success')
        setIsEditOpen(false)
        setSelectedArticle(null)
        setPhotoFile(null)
        setPhotoPreview(null)
        fetchNews()
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal memperbarui berita.'
      showToast(msg, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  // Open Delete Modal
  const openDeleteModal = (item) => {
    setSelectedArticle(item)
    setIsDeleteOpen(true)
  }

  // Handle Delete Confirm
  const handleDeleteConfirm = async () => {
    if (!selectedArticle) return
    setSubmitting(true)
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/berita/${selectedArticle.id_berita}`
      )
      if (res.data && res.data.success) {
        showToast('Berita berhasil dihapus.', 'success')
        setIsDeleteOpen(false)
        setSelectedArticle(null)
        fetchNews()
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal menghapus berita.'
      showToast(msg, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.judul?.toLowerCase().includes(search.toLowerCase()) ||
      item.isi_konten?.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      selectedCategory === 'Semua' || (item.kategori || 'Kegiatan') === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return dateStr
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

        {/* Dashboard Title & Quick Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Manajemen Berita Madrasah
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Kelola publikasi artikel, pengumuman resmi, dan prestasi Siswa di landing page.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-all duration-200 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>+ Tulis Berita Baru</span>
          </button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Total Warta Terbit
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold text-slate-900">{news.length}</span>
              <span className="text-xs text-emerald-600 font-semibold">Tersimpan di Database</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Tabel Database
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-xl font-mono font-bold text-slate-800">tbl_berita</span>
              <span className="text-xs text-slate-500">MariaDB/MySQL</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Endpoint RESTful
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-sm font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                /api/berita
              </span>
            </div>
          </div>
        </div>

        {/* Content Card with Table */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
          {/* Table Header Filter & Search */}
          <div className="p-4 sm:p-5 border-b border-slate-200 bg-white flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Filter Kategori Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? 'bg-white text-emerald-800 font-semibold shadow-xs border border-slate-200/90'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      selectedCategory === cat
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {cat === 'Semua'
                      ? news.length
                      : news.filter((n) => (n.kategori || 'Kegiatan') === cat).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Box & Actions */}
            <div className="flex items-center gap-3">
              <div className="relative w-full sm:w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari judul warta..."
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <button
                type="button"
                onClick={fetchNews}
                className="p-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
                title="Refresh Data"
              >
                <span className="material-symbols-outlined text-[18px]">refresh</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200 text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 w-12 text-center">ID</th>
                  <th className="py-3.5 px-4 w-20 text-center">Foto</th>
                  <th className="py-3.5 px-4">Judul &amp; Cuplikan Berita</th>
                  <th className="py-3.5 px-4 w-32 text-center">Kategori</th>
                  <th className="py-3.5 px-4 w-44">Slug URL</th>
                  <th className="py-3.5 px-4 w-32">Tgl Publish</th>
                  <th className="py-3.5 px-4 w-36 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {/* Loading State */}
                {loading && (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-slate-500">
                      <div className="flex flex-col items-center gap-2">
                        <span className="material-symbols-outlined text-[28px] animate-spin text-emerald-600">
                          sync
                        </span>
                        <span className="text-xs">Memuat data dari server...</span>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Error State */}
                {error && !loading && (
                  <tr>
                    <td colSpan="7" className="py-8 text-center">
                      <div className="text-rose-600 text-sm font-medium mb-2">{error}</div>
                      <button
                        onClick={fetchNews}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                      >
                        Coba Lagi
                      </button>
                    </td>
                  </tr>
                )}

                {/* Empty State */}
                {!loading && !error && filteredNews.length === 0 && (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-slate-500">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2 text-slate-400">
                        <span className="material-symbols-outlined text-[24px]">newspaper</span>
                      </div>
                      <p className="text-sm font-medium text-slate-700">Belum ada berita ditemukan</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {search || selectedCategory !== 'Semua'
                          ? 'Tidak ada berita yang cocok dengan filter atau pencarian.'
                          : 'Klik tombol "+ Tulis Berita Baru" untuk menambahkan berita pertama.'}
                      </p>
                    </td>
                  </tr>
                )}

                {/* Rows */}
                {!loading &&
                  !error &&
                  filteredNews.map((item) => (
                    <tr
                      key={item.id_berita}
                      className="hover:bg-slate-50/70 transition-colors duration-150"
                    >
                      <td className="py-3.5 px-4 text-center font-mono text-xs text-slate-500">
                        {item.id_berita}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 mx-auto shadow-2xs">
                          <img
                            src={item.gambar_thumbnail_url || item.gambar_thumbnail || fallbackNewsImg}
                            alt={item.judul}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = fallbackNewsImg
                            }}
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900 line-clamp-1 hover:text-emerald-700">
                          {item.judul}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {item.isi_konten}
                        </p>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {item.kategori === 'Prestasi' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            Prestasi
                          </span>
                        )}
                        {item.kategori === 'Pengumuman' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                            Pengumuman
                          </span>
                        )}
                        {(!item.kategori || item.kategori === 'Kegiatan') && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Kegiatan
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-600 truncate max-w-[180px]">
                        {item.slug}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600">
                        {formatDate(item.tgl_publish)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* View in Public Web */}
                          <Link
                            to={`/berita/${item.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="Lihat di Web Publik"
                          >
                            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                          </Link>

                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() => openEditModal(item)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="Edit Berita"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => openDeleteModal(item)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Hapus Berita"
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

      {/* MODAL: TAMBAH BERITA */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl flex flex-col my-auto max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] overflow-hidden animate-modal-pop">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
              <div>
                <h3 className="font-bold text-base sm:text-lg text-slate-900">Tulis Berita Baru</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Data akan disimpan ke database dan langsung tampil di halaman berita publik.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                title="Tutup Modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 space-y-4 overflow-y-auto flex-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Judul Berita *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.judul}
                    onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                    placeholder="Contoh: Siswa MI Meraih Juara 1 Tahfidz Tingkat Kabupaten"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Kategori Berita & Tanggal Publikasi */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kategori Berita *
                    </label>
                    <select
                      value={formData.kategori}
                      onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-white"
                    >
                      <option value="Kegiatan">Kegiatan</option>
                      <option value="Prestasi">Prestasi</option>
                      <option value="Pengumuman">Pengumuman</option>
                    </select>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Tentukan filter &amp; badge berita di halaman publik.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tanggal Publikasi
                    </label>
                    <input
                      type="date"
                      value={formData.tgl_publish}
                      onChange={(e) => setFormData({ ...formData, tgl_publish: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Waktu tanggal rilis berita.
                    </p>
                  </div>
                </div>

                {/* Upload Foto / Thumbnail */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Foto Dokumentasi / Thumbnail Berita
                  </label>

                  {photoPreview ? (
                    <div className="relative rounded-xl border border-slate-200 overflow-hidden bg-slate-900 group shadow-xs">
                      <img
                        src={photoPreview}
                        alt="Pratinjau foto berita"
                        className="w-full h-44 sm:h-52 object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end justify-between p-3 sm:p-4">
                        <div className="text-white text-xs">
                          <span className="font-semibold block truncate max-w-[200px] sm:max-w-xs">
                            {photoFile ? photoFile.name : 'Foto Berita Terpilih'}
                          </span>
                          {photoFile && (
                            <span className="text-[11px] text-slate-300">
                              {(photoFile.size / 1024).toFixed(0)} KB • Foto dari perangkat
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-slate-800 text-xs font-semibold shadow-xs transition-colors flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">sync</span>
                            <span>Ganti Foto</span>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/jpg"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={handleRemovePhoto}
                            className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1"
                            title="Hapus Foto"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer bg-slate-50/70 hover:bg-emerald-50/30 transition-all group">
                      <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-2xs">
                        <span className="material-symbols-outlined text-[24px]">add_photo_alternate</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-emerald-800 transition-colors">
                        Pilih Foto dari Perangkat / Galeri
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 text-center">
                        Format JPG, PNG, atau WebP (maksimal 5 MB).
                      </p>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/jpg"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}

                  {/* Alternatif URL gambar */}
                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 shrink-0">Atau tautan URL:</span>
                    <input
                      type="text"
                      value={formData.gambar_thumbnail}
                      onChange={(e) => {
                        setFormData({ ...formData, gambar_thumbnail: e.target.value })
                        if (e.target.value && !photoFile) {
                          setPhotoPreview(e.target.value)
                        }
                      }}
                      placeholder="https://..."
                      className="flex-1 rounded-md border border-slate-200 px-2 py-1 text-xs focus:ring-1 focus:ring-emerald-500 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Isi Konten Berita *
                  </label>
                  <textarea
                    rows="6"
                    required
                    value={formData.isi_konten}
                    onChange={(e) => setFormData({ ...formData, isi_konten: e.target.value })}
                    placeholder="Tuliskan isi berita lengkap di sini. Gunakan baris baru untuk memisahkan paragraf..."
                    className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
                  ></textarea>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Karakter: {formData.isi_konten.length}
                  </span>
                </div>
              </div>

              {/* Modal Footer (Pinned) */}
              <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium text-xs hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-1.5"
                >
                  {submitting && (
                    <span className="material-symbols-outlined text-[16px] animate-spin">
                      sync
                    </span>
                  )}
                  <span>Publikasikan Berita</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT BERITA */}
      {isEditOpen && selectedArticle && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl flex flex-col my-auto max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3.5rem)] overflow-hidden animate-modal-pop">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
              <div>
                <h3 className="font-bold text-base sm:text-lg text-slate-900">Edit Berita (ID: {selectedArticle.id_berita})</h3>
                <p className="text-xs text-slate-500 mt-0.5">Perbarui rincian warta madrasah.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                title="Tutup Modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 space-y-4 overflow-y-auto flex-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Judul Berita *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.judul}
                    onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>

                {/* Kategori Berita & Tanggal Publikasi */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kategori Berita *
                    </label>
                    <select
                      value={formData.kategori}
                      onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-white"
                    >
                      <option value="Kegiatan">Kegiatan</option>
                      <option value="Prestasi">Prestasi</option>
                      <option value="Pengumuman">Pengumuman</option>
                    </select>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Tentukan filter &amp; badge berita di halaman publik.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tanggal Publikasi
                    </label>
                    <input
                      type="date"
                      value={formData.tgl_publish}
                      onChange={(e) => setFormData({ ...formData, tgl_publish: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      Waktu tanggal rilis berita.
                    </p>
                  </div>
                </div>

                {/* Upload Foto / Thumbnail */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Foto Dokumentasi / Thumbnail Berita
                  </label>

                  {photoPreview ? (
                    <div className="relative rounded-xl border border-slate-200 overflow-hidden bg-slate-900 group shadow-xs">
                      <img
                        src={photoPreview}
                        alt="Pratinjau foto berita"
                        className="w-full h-44 sm:h-52 object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end justify-between p-3 sm:p-4">
                        <div className="text-white text-xs">
                          <span className="font-semibold block truncate max-w-[200px] sm:max-w-xs">
                            {photoFile ? photoFile.name : 'Foto Berita Terpasang'}
                          </span>
                          {photoFile ? (
                            <span className="text-[11px] text-slate-300">
                              {(photoFile.size / 1024).toFixed(0)} KB • Foto baru dari perangkat
                            </span>
                          ) : (
                            <span className="text-[11px] text-emerald-300 font-medium">
                              Foto aktif saat ini
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-white/95 hover:bg-white text-slate-800 text-xs font-semibold shadow-xs transition-colors flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">sync</span>
                            <span>Ganti Foto</span>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/jpg"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={handleRemovePhoto}
                            className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1"
                            title="Hapus Foto"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer bg-slate-50/70 hover:bg-emerald-50/30 transition-all group">
                      <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-2xs">
                        <span className="material-symbols-outlined text-[24px]">add_photo_alternate</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800 group-hover:text-emerald-800 transition-colors">
                        Pilih Foto Baru dari Perangkat / Galeri
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 text-center">
                        Format JPG, PNG, atau WebP (maksimal 5 MB).
                      </p>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/jpg"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}

                  {/* Alternatif URL gambar */}
                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 shrink-0">Atau tautan URL:</span>
                    <input
                      type="text"
                      value={formData.gambar_thumbnail}
                      onChange={(e) => {
                        setFormData({ ...formData, gambar_thumbnail: e.target.value })
                        if (e.target.value && !photoFile) {
                          setPhotoPreview(e.target.value)
                        }
                      }}
                      placeholder="https://..."
                      className="flex-1 rounded-md border border-slate-200 px-2 py-1 text-xs focus:ring-1 focus:ring-emerald-500 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Isi Konten Berita *
                  </label>
                  <textarea
                    rows="6"
                    required
                    value={formData.isi_konten}
                    onChange={(e) => setFormData({ ...formData, isi_konten: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  ></textarea>
                </div>
              </div>

              {/* Modal Footer (Pinned) */}
              <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium text-xs hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-1.5"
                >
                  {submitting && (
                    <span className="material-symbols-outlined text-[16px] animate-spin">
                      sync
                    </span>
                  )}
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: HAPUS BERITA */}
      {isDeleteOpen && selectedArticle && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-4 my-auto animate-modal-pop">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[28px]">delete_forever</span>
            </div>

            <div className="text-center">
              <h3 className="font-bold text-base text-slate-900">Hapus Berita Ini?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Apakah Anda yakin ingin menghapus warta:
              </p>
              <p className="text-sm font-semibold text-slate-800 mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 line-clamp-2">
                &ldquo;{selectedArticle.judul}&rdquo;
              </p>
              <p className="text-[11px] text-rose-600 mt-2">
                Tindakan ini permanen dan akan menghapus artikel dari database madrasah.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium text-xs hover:bg-slate-100 transition-colors"
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
                  <span className="material-symbols-outlined text-[16px] animate-spin">
                    sync
                  </span>
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
