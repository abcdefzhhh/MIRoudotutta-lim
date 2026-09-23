import { useState, useEffect } from 'react'
import axios from 'axios'
import { QRCodeSVG } from 'qrcode.react'
import BatchBookLabelsModal from '../../components/BatchBookLabelsModal'

export default function AdminBuku() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState(null)

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isCopiesOpen, setIsCopiesOpen] = useState(false)
  const [isLabelsModalOpen, setIsLabelsModalOpen] = useState(false)
  const [selectedBookForLabel, setSelectedBookForLabel] = useState('all')
  const [selectedBook, setSelectedBook] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // Form states
  const [formData, setFormData] = useState({
    isbn: '',
    kodebuku: '',
    judul: '',
    penulis: '',
    penerbit: '',
    stok: 1,
  })

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const fetchBooks = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/buku', {
        params: { search },
      })
      if (res.data?.success && res.data.data?.data) {
        setBooks(res.data.data.data)
      } else {
        setBooks([])
      }
    } catch (err) {
      console.error(err)
      setError('Gagal memuat katalog buku dari server.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [search])

  const handleCreateSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/buku', {
        ...formData,
        stok: parseInt(formData.stok, 10),
      })
      if (res.data?.success) {
        showToast('Buku dan eksemplar fisik barcode berhasil dibuat!')
        setIsCreateOpen(false)
        setFormData({
          isbn: '',
          kodebuku: '',
          judul: '',
          penulis: '',
          penerbit: '',
          stok: 1,
        })
        fetchBooks()
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal menambahkan buku.'
      showToast(msg, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const openEditModal = (book) => {
    setSelectedBook(book)
    setFormData({
      isbn: book.isbn,
      kodebuku: book.kodebuku,
      judul: book.judul,
      penulis: book.penulis,
      penerbit: book.penerbit,
      stok: book.stok,
    })
    setIsEditOpen(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/buku/${selectedBook.idbuku}`,
        {
          ...formData,
          stok: parseInt(formData.stok, 10),
        }
      )
      if (res.data?.success) {
        showToast('Data buku berhasil diperbarui!')
        setIsEditOpen(false)
        fetchBooks()
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal memperbarui buku.'
      showToast(msg, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const openDeleteModal = (book) => {
    setSelectedBook(book)
    setIsDeleteOpen(true)
  }

  const handleDeleteSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/buku/${selectedBook.idbuku}`
      )
      if (res.data?.success) {
        showToast('Buku berhasil dihapus.')
        setIsDeleteOpen(false)
        fetchBooks()
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal menghapus buku.'
      showToast(msg, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const openCopiesModal = (book) => {
    setSelectedBook(book)
    setIsCopiesOpen(true)
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
            Katalog Buku &amp; Eksemplar Perpustakaan
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manajemen inventaris buku SIPERPUS dan pelacakan eksemplar fisik bertiket barcode.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setSelectedBookForLabel('all')
              setIsLabelsModalOpen(true)
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-600 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs sm:text-sm transition-all active:scale-[0.98]"
            title="Cetak Stiker Label Buku A4"
          >
            <span className="material-symbols-outlined text-[18px]">label</span>
            <span>Cetak Stiker Label ISBN &amp; QR</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setFormData({
                isbn: '',
                kodebuku: '',
                judul: '',
                penulis: '',
                penerbit: '',
                stok: 1,
              })
              setIsCreateOpen(true)
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Tambah Judul Baru</span>
          </button>
        </div>
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
              placeholder="Cari berdasarkan judul, penulis, atau ISBN..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-slate-500">
            <span>Ditemukan {books.length} judul buku</span>
            <button
              type="button"
              onClick={fetchBooks}
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
                <th className="py-3 px-4 w-32 font-mono">Kode Buku</th>
                <th className="py-3 px-4">Judul &amp; Penulis</th>
                <th className="py-3 px-4 w-36 font-mono text-xs">ISBN</th>
                <th className="py-3 px-4 w-32 text-center">Stok Fisik</th>
                <th className="py-3 px-4 w-40 text-center">Aksi &amp; Eksemplar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading && (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-xs text-slate-500">
                    <span className="material-symbols-outlined text-[24px] animate-spin text-emerald-600 block mb-1">
                      sync
                    </span>
                    Memuat katalog buku...
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

              {!loading && !error && books.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-xs text-slate-500">
                    Tidak ada data buku ditemukan.
                  </td>
                </tr>
              )}

              {!loading &&
                !error &&
                books.map((b, idx) => (
                  <tr key={b.idbuku} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 text-center text-xs text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-xs text-slate-900">
                      {b.kodebuku}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 line-clamp-1">
                        {b.judul}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {b.penulis} • {b.penerbit}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-slate-600">
                      {b.isbn}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <span>{b.stok_tersedia}</span>
                        <span className="text-slate-400">/</span>
                        <span>{b.stok} Tersedia</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* Detail Copies */}
                        <button
                          type="button"
                          onClick={() => openCopiesModal(b)}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white border border-indigo-200 transition-colors"
                          title="Lihat Barcode & Eksemplar Fisik"
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            qr_code_scanner
                          </span>
                          <span>Eksemplar</span>
                        </button>

                        {/* Print Single Book Stickers */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedBookForLabel(b.idbuku)
                            setIsLabelsModalOpen(true)
                          }}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-colors"
                          title="Cetak Stiker Label ISBN & QR Buku Ini"
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            label
                          </span>
                          <span>Stiker QR</span>
                        </button>

                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => openEditModal(b)}
                          className="p-1 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                          title="Edit Buku"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            edit
                          </span>
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => openDeleteModal(b)}
                          className="p-1 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Hapus Buku"
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

      {/* MODAL: DETAIL EKSEMPLAR BARCODE FISIK */}
      {isCopiesOpen && selectedBook && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-4 my-auto animate-modal-pop">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 gap-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Eksemplar Fisik &amp; QR Code Buku
                </h3>
                <p className="text-xs text-slate-600 line-clamp-1 mt-0.5 font-medium">
                  {selectedBook.judul}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    ISBN: {selectedBook.isbn}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Kode: {selectedBook.kodebuku} &middot; {selectedBook.stok} Eksemplar
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsCopiesOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-500">
              Setiap buku fisik memiliki barcode/QR unik yang dipindai saat sirkulasi peminjaman &amp; pengembalian:
            </div>

            <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-xl">
              {selectedBook.details && selectedBook.details.length > 0 ? (
                selectedBook.details.map((copy, i) => (
                  <div
                    key={copy.idbukudetail || i}
                    className="p-3 flex items-center justify-between text-xs hover:bg-slate-50 gap-3"
                  >
                    <div className="flex items-center gap-3">
                      {/* Visual QR Code Thumbnail */}
                      <div className="p-1 bg-white border border-slate-200 rounded-lg shadow-2xs shrink-0 flex items-center justify-center">
                        <QRCodeSVG
                          value={`BUKU-${selectedBook.isbn || ''}-${copy.kodebukudetail}`}
                          size={40}
                          level="M"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-slate-900 text-xs">
                            {copy.kodebukudetail}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            (Salinan #{i + 1})
                          </span>
                        </div>
                        <span className="text-slate-500 block text-[11px] mt-0.5 font-mono">
                          Format Scan: BUKU-{selectedBook.isbn}-{copy.kodebukudetail}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize shrink-0 ${
                        copy.kondisi === 'baik'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : copy.kondisi === 'rusak'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      Kondisi {copy.kondisi}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">
                  Belum ada detail eksemplar yang terdaftar.
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setSelectedBookForLabel(selectedBook.idbuku)
                  setIsCopiesOpen(false)
                  setIsLabelsModalOpen(true)
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Cetak Stiker Label Buku Ini</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCopiesOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: TAMBAH BUKU */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 my-auto animate-modal-pop">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Tambah Judul Buku Baru</h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kode Buku *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.kodebuku}
                    onChange={(e) => setFormData({ ...formData, kodebuku: e.target.value })}
                    placeholder="Contoh: BK-FIQ1"
                    className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ISBN *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.isbn}
                    onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                    placeholder="978-602-..."
                    className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Lengkap Buku *
                </label>
                <input
                  type="text"
                  required
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  placeholder="Contoh: Fikih Madrasah Ibtidaiyah Kelas 3"
                  className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Penulis *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.penulis}
                    onChange={(e) => setFormData({ ...formData, penulis: e.target.value })}
                    placeholder="Nama penulis"
                    className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Penerbit *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.penerbit}
                    onChange={(e) => setFormData({ ...formData, penerbit: e.target.value })}
                    placeholder="Nama penerbit"
                    className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jumlah Eksemplar Fisik (Stok Awal) *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.stok}
                  onChange={(e) => setFormData({ ...formData, stok: e.target.value })}
                  className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
                <span className="text-[11px] text-slate-400 block mt-1">
                  Sistem otomatis men-generate barcode fisik untuk setiap eksemplar.
                </span>
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
                  {submitting ? 'Menyimpan...' : 'Simpan Judul & Barcode'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT BUKU */}
      {isEditOpen && selectedBook && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 my-auto animate-modal-pop">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Edit Data Buku</h3>
              <button
                onClick={() => setIsEditOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kode Buku *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.kodebuku}
                    onChange={(e) => setFormData({ ...formData, kodebuku: e.target.value })}
                    className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ISBN *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.isbn}
                    onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                    className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Lengkap Buku *
                </label>
                <input
                  type="text"
                  required
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Penulis *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.penulis}
                    onChange={(e) => setFormData({ ...formData, penulis: e.target.value })}
                    className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Penerbit *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.penerbit}
                    onChange={(e) => setFormData({ ...formData, penerbit: e.target.value })}
                    className="w-full text-xs sm:text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jumlah Stok Fisik *
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.stok}
                  onChange={(e) => setFormData({ ...formData, stok: e.target.value })}
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
      {isDeleteOpen && selectedBook && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 text-center my-auto animate-modal-pop">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[24px]">delete</span>
            </div>
            <h3 className="font-bold text-base text-slate-900">Hapus Buku?</h3>
            <p className="text-xs text-slate-500 mt-1">
              Buku <strong>{selectedBook.judul}</strong> beserta seluruh barcode eksemplar fisiknya akan dihapus permanen.
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
                {submitting ? 'Menghapus...' : 'Ya, Hapus Buku'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* MODAL: BATCH BOOK LABELS PRINT (A4) */}
      <BatchBookLabelsModal
        isOpen={isLabelsModalOpen}
        onClose={() => setIsLabelsModalOpen(false)}
        books={books}
        initialSelectedBookId={selectedBookForLabel}
      />
    </div>
  )
}
