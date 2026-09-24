import { useState, useEffect } from 'react'
import axios from 'axios'

export default function AdminReportPinjam() {
  const [loans, setLoans] = useState([])
  const [metrics, setMetrics] = useState({
    total_transaksi: 0,
    dipinjam_aktif: 0,
    sudah_kembali: 0,
    terlambat: 0,
    total_denda: 0,
    total_kolektif: 0,
    total_mandiri: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState(null)

  // Filters
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [tipeFilter, setTipeFilter] = useState('')
  const [tglMulai, setTglMulai] = useState('')
  const [tglSelesai, setTglSelesai] = useState('')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    from: 0,
    to: 0,
    per_page: 15,
  })

  // Detail Modal
  const [selectedLoan, setSelectedLoan] = useState(null)

  // Return Confirmation Modal
  const [returnModalLoan, setReturnModalLoan] = useState(null)
  const [submittingReturn, setSubmittingReturn] = useState(false)

  // Create Loan Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [modePinjam, setModePinjam] = useState('kolektif') // 'kolektif' | 'mandiri'
  const [submittingCreate, setSubmittingCreate] = useState(false)
  const [createError, setCreateError] = useState(null)

  // Student selection
  const [siswaSearch, setSiswaSearch] = useState('')
  const [siswaResults, setSiswaResults] = useState([])
  const [selectedSiswa, setSelectedSiswa] = useState(null)
  const [searchingSiswa, setSearchingSiswa] = useState(false)

  // Kolektif fields
  const [kolektifBooks, setKolektifBooks] = useState([])
  const [loadingKolektifBooks, setLoadingKolektifBooks] = useState(false)
  const [selectedBukuId, setSelectedBukuId] = useState('')
  const [jumlahBuku, setJumlahBuku] = useState(25)
  const [keperluan, setKeperluan] = useState('Kegiatan Belajar Mengajar di Kelas')
  const [tglBatasKembaliKolektif, setTglBatasKembaliKolektif] = useState(
    new Date().toISOString().split('T')[0]
  )

  // Mandiri fields
  const [catalogBooks, setCatalogBooks] = useState([])
  const [barcodeInput, setBarcodeInput] = useState('')
  const [selectedCopies, setSelectedCopies] = useState([])
  const [tglBatasKembaliMandiri, setTglBatasKembaliMandiri] = useState(
    new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
  )

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const fetchLoans = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/pinjam', {
        params: {
          search: search || undefined,
          status: statusFilter || undefined,
          tipe: tipeFilter || undefined,
          tgl_mulai: tglMulai || undefined,
          tgl_selesai: tglSelesai || undefined,
          page,
          per_page: 15,
        },
      })

      if (res.data?.success && res.data.data) {
        setLoans(res.data.data.data || [])
        setPagination({
          current_page: res.data.data.current_page || 1,
          last_page: res.data.data.last_page || 1,
          total: res.data.data.total || 0,
          from: res.data.data.from || 0,
          to: res.data.data.to || 0,
          per_page: res.data.data.per_page || 15,
        })
        if (res.data.metrics) {
          setMetrics(res.data.metrics)
        }
      }
    } catch (err) {
      console.error(err)
      setError('Gagal memuat laporan data peminjaman dari server.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLoans()
  }, [search, statusFilter, tipeFilter, tglMulai, tglSelesai, page])

  // Load books for collective loan dropdown
  const loadKolektifBooks = async () => {
    setLoadingKolektifBooks(true)
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/siperpus/buku/kolektif', {
        params: { per_page: 100 },
      })
      if (res.data?.success && res.data.data?.data) {
        setKolektifBooks(res.data.data.data)
        if (res.data.data.data.length > 0 && !selectedBukuId) {
          setSelectedBukuId(res.data.data.data[0].idbuku)
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingKolektifBooks(false)
    }
  }

  // Load general catalog books with copy details for manual picking
  const loadCatalogBooks = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/buku', {
        params: { per_page: 50 },
      })
      if (res.data?.success && res.data.data?.data) {
        setCatalogBooks(res.data.data.data)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (isCreateModalOpen) {
      loadKolektifBooks()
      loadCatalogBooks()
    }
  }, [isCreateModalOpen])

  // Search siswa debounced
  useEffect(() => {
    if (!siswaSearch || siswaSearch.trim().length < 2) {
      setSiswaResults([])
      return
    }

    const timer = setTimeout(async () => {
      setSearchingSiswa(true)
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/siswa', {
          params: { search: siswaSearch.trim(), per_page: 8 },
        })
        if (res.data?.success && res.data.data?.data) {
          setSiswaResults(res.data.data.data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setSearchingSiswa(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [siswaSearch])

  const handleResetFilter = () => {
    setSearch('')
    setStatusFilter('')
    setTipeFilter('')
    setTglMulai('')
    setTglSelesai('')
    setPage(1)
  }

  const formatRupiah = (val) => {
    const num = Number(val) || 0
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num)
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    try {
      const d = new Date(dateStr)
      if (isNaN(d.getTime())) return dateStr
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  const formatTime = (dateStr) => {
    if (!dateStr) return ''
    try {
      const d = new Date(dateStr)
      if (isNaN(d.getTime())) return ''
      return d.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return ''
    }
  }

  const isOverdue = (dueDateStr, status) => {
    if (status !== 'dipinjam' || !dueDateStr) return false
    const due = new Date(dueDateStr)
    due.setHours(23, 59, 59, 999)
    return new Date() > due
  }

  const isDueToday = (dueDateStr, status) => {
    if (status !== 'dipinjam' || !dueDateStr) return false
    const today = new Date().toISOString().split('T')[0]
    const due = new Date(dueDateStr).toISOString().split('T')[0]
    return today === due
  }

  const handlePrint = () => {
    window.print()
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'dipinjam':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Sedang Dipinjam
          </span>
        )
      case 'dikembalikan':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
            <span className="material-symbols-outlined text-[14px] text-slate-600">done_all</span>
            Sudah Kembali
          </span>
        )
      case 'terlambat':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200 whitespace-nowrap">
            <span className="material-symbols-outlined text-[14px] text-rose-600">timer_off</span>
            Terlambat
          </span>
        )
      default:
        return (
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 whitespace-nowrap">
            {status}
          </span>
        )
    }
  }

  // Render Date with Overflow-Proof Pill Badging
  const renderBatasKembali = (dueDateStr, status) => {
    if (!dueDateStr) return <span className="text-slate-400">-</span>
    const formatted = formatDate(dueDateStr)

    if (status === 'dipinjam') {
      if (isOverdue(dueDateStr, status)) {
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200 whitespace-nowrap shadow-xs">
            <span className="material-symbols-outlined text-[14px] text-rose-600 shrink-0">warning</span>
            <span>{formatted}</span>
            <span className="text-xs bg-rose-200 text-rose-900 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
              Telat
            </span>
          </span>
        )
      }
      if (isDueToday(dueDateStr, status)) {
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200 whitespace-nowrap shadow-xs">
            <span className="material-symbols-outlined text-[14px] text-amber-700 shrink-0">schedule</span>
            <span>Hari Ini ({formatted})</span>
          </span>
        )
      }
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
          <span className="material-symbols-outlined text-[14px] text-slate-500 shrink-0">event</span>
          <span>{formatted}</span>
        </span>
      )
    }

    return (
      <span className="inline-flex items-center gap-1 text-xs text-slate-600 whitespace-nowrap">
        <span>{formatted}</span>
      </span>
    )
  }

  // Handle Add Copy in Mandiri Mode
  const handleAddCopy = (code) => {
    const cleanCode = (code || barcodeInput).trim()
    if (!cleanCode) return

    if (selectedCopies.length >= 3) {
      alert('Maksimal peminjaman mandiri per siswa adalah 3 buku.')
      return
    }

    if (selectedCopies.includes(cleanCode)) {
      alert('Kode eksemplar buku ini sudah ada di daftar.')
      return
    }

    setSelectedCopies([...selectedCopies, cleanCode])
    setBarcodeInput('')
  }

  const handleRemoveCopy = (indexToRemove) => {
    setSelectedCopies(selectedCopies.filter((_, idx) => idx !== indexToRemove))
  }

  // Handle Submit New Loan
  const handleSubmitLoan = async (e) => {
    e.preventDefault()
    setCreateError(null)

    if (!selectedSiswa) {
      setCreateError('Silakan cari dan pilih siswa terlebih dahulu.')
      return
    }

    setSubmittingCreate(true)

    try {
      if (modePinjam === 'kolektif') {
        if (!selectedBukuId) {
          throw new Error('Silakan pilih buku pelajaran yang akan dipinjamkan sekelas.')
        }

        const payload = {
          nis: selectedSiswa.nis,
          idbuku: selectedBukuId,
          jumlah: Number(jumlahBuku),
          keperluan,
          tgl_batas_kembali: tglBatasKembaliKolektif,
        }

        const res = await axios.post('http://127.0.0.1:8000/api/pinjam/kolektif', payload)
        if (res.data?.success) {
          showToast(res.data.message || 'Peminjaman kolektif sekelas berhasil disimpan!')
          handleCloseCreateModal()
          fetchLoans()
        }
      } else {
        // Mode Mandiri
        if (selectedCopies.length === 0) {
          throw new Error('Masukkan minimal 1 barcode eksemplar buku (maks 3 buku).')
        }

        const payload = {
          nis: selectedSiswa.nis,
          kodebukudetail: selectedCopies,
        }

        const res = await axios.post('http://127.0.0.1:8000/api/pinjam', payload)
        if (res.data?.success) {
          showToast(res.data.message || 'Peminjaman mandiri berhasil disimpan!')
          handleCloseCreateModal()
          fetchLoans()
        }
      }
    } catch (err) {
      console.error(err)
      const msg = err.response?.data?.message || err.message || 'Terjadi kesalahan saat memproses peminjaman.'
      setCreateError(msg)
    } finally {
      setSubmittingCreate(false)
    }
  }

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false)
    setSelectedSiswa(null)
    setSiswaSearch('')
    setSiswaResults([])
    setSelectedCopies([])
    setBarcodeInput('')
    setCreateError(null)
  }

  // Handle Return Loan Confirmation
  const handleConfirmReturn = async () => {
    if (!returnModalLoan) return
    setSubmittingReturn(true)

    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/kembali/kolektif/${returnModalLoan.idpinjam}`
      )
      if (res.data?.success) {
        showToast(res.data.message || 'Pengembalian buku berhasil diproses.')
        setReturnModalLoan(null)
        if (selectedLoan?.idpinjam === returnModalLoan.idpinjam) {
          setSelectedLoan(null)
        }
        fetchLoans()
      }
    } catch (err) {
      console.error(err)
      const msg = err.response?.data?.message || 'Gagal memproses pengembalian buku.'
      alert(msg)
    } finally {
      setSubmittingReturn(false)
    }
  }

  const selectedBukuObject = kolektifBooks.find(
    (b) => String(b.idbuku) === String(selectedBukuId)
  )

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[120] flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm animate-fade-in ${
            toast.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}
        >
          <span className="material-symbols-outlined text-[20px] shrink-0">
            {toast.type === 'error' ? 'error' : 'check_circle'}
          </span>
          <span className="font-medium">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>
      )}

      {/* Print-only Header */}
      <div className="hidden print:block mb-6 border-b-2 border-slate-900 pb-4 text-center">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          MADRASAH IBTIDAIYAH ROUDOTUTTA'LIM
        </h1>
        <p className="text-xs text-slate-600">
          LAPORAN SIRKULASI &amp; REKAPITULASI PEMINJAMAN BUKU PERPUSTAKAAN
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Dicetak pada: {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}
        </p>
      </div>

      {/* Screen Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Sirkulasi &amp; Data Peminjaman
          </h2>
          <p className="text-sm text-slate-700 mt-1 max-w-2xl leading-normal">
            Manajemen sirkulasi buku madrasah, transaksi peminjaman mandiri dan per rombel kelas, pencatatan pengembalian buku, serta kalkulasi denda keterlambatan.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-xs transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Tambah Peminjaman</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm shadow-xs transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Cetak Laporan</span>
          </button>
        </div>
      </div>

      {/* Unified Summary Metric Bar (Flat, No Nested Cards, Accessible Text Sizes) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-xs no-print">
        <div className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">receipt_long</span>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-600 block">Total Transaksi</span>
            <span className="text-xl font-bold text-slate-900">{metrics.total_transaksi}</span>
          </div>
        </div>

        <div className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">menu_book</span>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-600 block">Aktif Dipinjam</span>
            <span className="text-xl font-bold text-slate-900">{metrics.dipinjam_aktif}</span>
          </div>
        </div>

        <div className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">groups</span>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-600 block">Paket Kelas</span>
            <span className="text-xl font-bold text-slate-900">{metrics.total_kolektif || 0}</span>
          </div>
        </div>

        <div className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-600 block">Sudah Kembali</span>
            <span className="text-xl font-bold text-slate-900">{metrics.sudah_kembali}</span>
          </div>
        </div>

        <div className="p-4 flex items-center gap-3 col-span-2 sm:col-span-1">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">payments</span>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-600 block">Total Denda</span>
            <span className="text-base font-bold text-slate-900 font-mono">
              {formatRupiah(metrics.total_denda)}
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Control Bar (Clean Layout, No Nested Cards, No Pulsing Dots) */}
      <div className="space-y-3 no-print">
        {/* Quick Filter Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            type="button"
            onClick={() => {
              setStatusFilter('')
              setTipeFilter('')
              setPage(1)
            }}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              !statusFilter && !tipeFilter
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>Semua</span>
            <span className="px-1.5 py-0.5 rounded text-xs bg-slate-700/50 text-slate-200 font-semibold">
              {metrics.total_transaksi}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setStatusFilter('dipinjam')
              setTipeFilter('')
              setPage(1)
            }}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              statusFilter === 'dipinjam'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Sedang Dipinjam</span>
            <span className="px-1.5 py-0.5 rounded text-xs bg-emerald-800/40 text-emerald-100 font-semibold">
              {metrics.dipinjam_aktif}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setTipeFilter('kolektif')
              setStatusFilter('')
              setPage(1)
            }}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              tipeFilter === 'kolektif'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">groups</span>
            <span>Paket Kelas</span>
            <span className="px-1.5 py-0.5 rounded text-xs bg-indigo-800/40 text-indigo-100 font-semibold">
              {metrics.total_kolektif || 0}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setStatusFilter('dikembalikan')
              setTipeFilter('')
              setPage(1)
            }}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              statusFilter === 'dikembalikan'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">check</span>
            <span>Sudah Kembali</span>
            <span className="px-1.5 py-0.5 rounded text-xs bg-teal-800/40 text-teal-100 font-semibold">
              {metrics.sudah_kembali}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setStatusFilter('terlambat')
              setTipeFilter('')
              setPage(1)
            }}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              statusFilter === 'terlambat'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-rose-200'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">warning</span>
            <span>Terlambat</span>
            <span className="px-1.5 py-0.5 rounded text-xs bg-rose-800/40 text-rose-100 font-semibold">
              {metrics.terlambat}
            </span>
          </button>
        </div>

        {/* Toolbar: Search & Flat Date Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="Cari siswa, NIS, judul buku, atau barcode..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="text-xs font-semibold text-slate-600 whitespace-nowrap">
              Rentang:
            </label>
            <input
              type="date"
              value={tglMulai}
              onChange={(e) => {
                setTglMulai(e.target.value)
                setPage(1)
              }}
              aria-label="Dari tanggal pinjam"
              className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
            />
            <span className="text-slate-400 text-xs">s/d</span>
            <input
              type="date"
              value={tglSelesai}
              onChange={(e) => {
                setTglSelesai(e.target.value)
                setPage(1)
              }}
              aria-label="Sampai tanggal pinjam"
              className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
            />

            {(search || statusFilter || tipeFilter || tglMulai || tglSelesai) && (
              <button
                type="button"
                onClick={handleResetFilter}
                className="px-2.5 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold flex items-center gap-1 transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error Notice */}
      {error && !loading && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center justify-between gap-3 no-print">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">error</span>
            <span>{error}</span>
          </div>
          <button
            onClick={fetchLoans}
            className="px-3 py-1 bg-white border border-rose-300 rounded-lg text-rose-700 font-semibold hover:bg-rose-100 text-xs"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Main Table (Direct Flat Container, No Outer Double-Nesting) */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs print:border-none print:shadow-none">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200 text-xs uppercase tracking-wider print:bg-slate-100">
            <tr>
              <th className="py-3.5 px-4 w-12 text-center">No</th>
              <th className="py-3.5 px-4 min-w-[200px]">Peminjam (Siswa)</th>
              <th className="py-3.5 px-4 min-w-[260px]">Buku &amp; Eksemplar</th>
              <th className="py-3.5 px-4 min-w-[130px] whitespace-nowrap">Tgl Pinjam</th>
              <th className="py-3.5 px-4 min-w-[160px] whitespace-nowrap">Batas Kembali</th>
              <th className="py-3.5 px-4 min-w-[130px] whitespace-nowrap">Tgl Kembali</th>
              <th className="py-3.5 px-4 min-w-[140px] text-center whitespace-nowrap">Status</th>
              <th className="py-3.5 px-4 min-w-[110px] text-right font-mono whitespace-nowrap">Denda</th>
              <th className="py-3.5 px-4 min-w-[150px] text-center no-print whitespace-nowrap">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
            {loading && (
              <tr>
                <td colSpan="9" className="py-12 text-center text-xs text-slate-500">
                  <span className="material-symbols-outlined text-[24px] animate-spin text-emerald-600 block mb-1">
                    sync
                  </span>
                  Memuat data sirkulasi peminjaman...
                </td>
              </tr>
            )}

            {!loading && loans.length === 0 && (
              <tr>
                <td colSpan="9" className="py-14 text-center text-xs text-slate-500">
                  <span className="material-symbols-outlined text-[36px] text-slate-300 block mb-2">
                    inbox
                  </span>
                  Tidak ada transaksi peminjaman yang cocok dengan filter.
                </td>
              </tr>
            )}

            {!loading &&
              loans.map((item, idx) => {
                const rombel =
                  item.siswa?.siswa_kelas?.[0]?.kelas_detail?.kelas?.kelas || '-'
                const details = item.pinjam_details || []
                const fine = Number(item.total_denda) || 0
                const isKolektif = details.length > 3
                const firstBookTitle = details[0]?.buku_detail?.buku?.judul || 'Buku Paket Pelajaran'

                return (
                  <tr
                    key={item.idpinjam}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-3.5 px-4 text-center text-xs text-slate-400">
                      {(pagination.from || 1) + idx}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">
                        {item.siswa?.nama || 'Siswa Umum'}
                      </div>
                      <div className="text-xs text-slate-600 flex items-center gap-1.5 mt-0.5">
                        <span className="font-mono">NIS: {item.siswa?.nis || '-'}</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-medium">Kelas {rombel}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {isKolektif ? (
                        <div>
                          <div className="font-medium text-slate-800 line-clamp-1">
                            {firstBookTitle}
                          </div>
                          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 whitespace-nowrap">
                              <span className="material-symbols-outlined text-[14px]">groups</span>
                              Paket Kelas ({details.length} Buku)
                            </span>
                            <span className="text-xs text-slate-500 font-mono whitespace-nowrap">
                              [{details[0]?.buku_detail?.kodebukudetail || '-'}]
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {details.map((d, dIdx) => (
                            <div key={dIdx} className="mb-1 last:mb-0">
                              <span className="font-medium text-slate-800 line-clamp-1">
                                {d.buku_detail?.buku?.judul || 'Buku Perpustakaan'}
                              </span>
                              <span className="font-mono text-xs text-slate-500 block">
                                [{d.buku_detail?.kodebukudetail || '-'}]
                              </span>
                            </div>
                          ))}
                          <div className="mt-1">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600 whitespace-nowrap">
                              <span className="material-symbols-outlined text-[13px]">person</span>
                              Mandiri ({details.length} Buku)
                            </span>
                          </div>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="text-xs text-slate-700 font-medium">{formatDate(item.waktu)}</div>
                      <div className="text-xs text-slate-500">{formatTime(item.waktu)}</div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {renderBatasKembali(item.tgl_batas_kembali, item.status)}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {item.tgl_dikembalikan ? (
                        <div className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">check</span>
                          <span>{formatDate(item.tgl_dikembalikan)}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-500 italic">Belum Kembali</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-xs font-semibold whitespace-nowrap">
                      {fine > 0 ? (
                        <span className="text-rose-600">{formatRupiah(fine)}</span>
                      ) : (
                        <span className="text-slate-400">Rp 0</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center no-print whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        {item.status === 'dipinjam' && (
                          <button
                            type="button"
                            onClick={() => setReturnModalLoan(item)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold flex items-center gap-1 transition-all active:scale-[0.98]"
                            title="Kembalikan Buku Ini"
                          >
                            <span className="material-symbols-outlined text-[14px]">
                              assignment_return
                            </span>
                            <span>Kembali</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setSelectedLoan(item)}
                          className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium flex items-center gap-1 transition-all active:scale-[0.98]"
                          title="Lihat Detail Transaksi"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            visibility
                          </span>
                          <span>Detail</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>

        {/* Pagination Footer */}
        {!loading && pagination.total > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-700 no-print">
            <div>
              Menampilkan <strong>{pagination.from || 0}</strong>–
              <strong>{pagination.to || 0}</strong> dari{' '}
              <strong>{pagination.total}</strong> transaksi
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={pagination.current_page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-xs transition-all"
              >
                Sebelumnya
              </button>
              <span className="px-3 py-1.5 font-semibold text-slate-800">
                {pagination.current_page} / {pagination.last_page}
              </span>
              <button
                type="button"
                disabled={pagination.current_page >= pagination.last_page}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-xs transition-all"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: Tambah Peminjaman Baru (Kolektif vs Mandiri) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in no-print overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl my-8 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Transaksi Peminjaman Buku Baru
                </h3>
                <p className="text-xs text-slate-600">
                  Pilih mode peminjaman per rombel kelas atau mandiri siswa.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseCreateModal}
                className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="px-6 pt-5">
              <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl gap-1">
                <button
                  type="button"
                  onClick={() => setModePinjam('kolektif')}
                  className={`py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    modePinjam === 'kolektif'
                      ? 'bg-white text-emerald-700 shadow-xs border border-emerald-100'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">groups</span>
                  <span>Pinjam Per Kelas (Kolektif)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModePinjam('mandiri')}
                  className={`py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    modePinjam === 'mandiri'
                      ? 'bg-white text-emerald-700 shadow-xs border border-emerald-100'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  <span>Pinjam Mandiri (1–3 Buku)</span>
                </button>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmitLoan} className="p-6 space-y-4 text-xs sm:text-sm">
              {/* Error Notice */}
              {createError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
                  <span>{createError}</span>
                </div>
              )}

              {/* Step 1: Pilih Siswa */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 block">
                  {modePinjam === 'kolektif'
                    ? '1. Siswa Penanggung Jawab (Ketua Kelas / Perwakilan) *'
                    : '1. Siswa Peminjam *'}
                </label>

                {!selectedSiswa ? (
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
                      search
                    </span>
                    <input
                      type="text"
                      value={siswaSearch}
                      onChange={(e) => setSiswaSearch(e.target.value)}
                      placeholder="Ketik NIS atau Nama Siswa..."
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm"
                    />
                    {searchingSiswa && (
                      <span className="absolute right-3 top-3 text-xs text-slate-400 animate-pulse">
                        Mencari...
                      </span>
                    )}

                    {/* Results Dropdown */}
                    {siswaResults.length > 0 && (
                      <div className="absolute z-20 top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg divide-y divide-slate-100">
                        {siswaResults.map((s) => {
                          const kls =
                            s.siswa_kelas?.[0]?.kelas_detail?.kelas?.kelas || 'Umum'
                          return (
                            <button
                              type="button"
                              key={s.idsiswa}
                              onClick={() => {
                                setSelectedSiswa(s)
                                setSiswaResults([])
                                setSiswaSearch('')
                              }}
                              className="w-full px-3.5 py-2.5 text-left hover:bg-slate-50 flex items-center justify-between transition-colors"
                            >
                              <div>
                                <div className="font-semibold text-slate-900">{s.nama}</div>
                                <div className="text-xs text-slate-500 font-mono">
                                  NIS: {s.nis}
                                </div>
                              </div>
                              <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 whitespace-nowrap">
                                Kelas {kls}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/70 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                        {selectedSiswa.nama.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">
                          {selectedSiswa.nama}
                        </div>
                        <div className="text-xs text-slate-600 flex items-center gap-2 mt-0.5">
                          <span className="font-mono">NIS: {selectedSiswa.nis}</span>
                          <span>•</span>
                          <span className="font-semibold text-emerald-800">
                            Kelas {selectedSiswa.siswa_kelas?.[0]?.kelas_detail?.kelas?.kelas || 'Umum'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedSiswa(null)}
                      className="px-2.5 py-1 text-xs text-rose-700 hover:bg-rose-100 rounded-lg font-medium transition-all"
                    >
                      Ganti Siswa
                    </button>
                  </div>
                )}
              </div>

              {/* Mode Kolektif Fields */}
              {modePinjam === 'kolektif' ? (
                <>
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700 block">
                      2. Buku Paket Pelajaran *
                    </label>
                    <select
                      value={selectedBukuId}
                      onChange={(e) => setSelectedBukuId(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm"
                    >
                      <option value="">-- Pilih Buku Paket --</option>
                      {kolektifBooks.map((b) => (
                        <option key={b.idbuku} value={b.idbuku}>
                          {b.judul} (Stok Tersedia: {b.stok_tersedia} / Total: {b.stok})
                        </option>
                      ))}
                    </select>

                    {selectedBukuObject && (
                      <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                        <span>
                          Pengarang: <strong>{selectedBukuObject.penulis || '-'}</strong> | Penerbit:{' '}
                          <strong>{selectedBukuObject.penerbit || '-'}</strong>
                        </span>
                        <span className="font-semibold text-emerald-700 whitespace-nowrap">
                          Stok Siap: {selectedBukuObject.stok_tersedia} buku
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700 block">
                        3. Jumlah Buku Dipinjam *
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={selectedBukuObject?.stok_tersedia || 100}
                        value={jumlahBuku}
                        onChange={(e) => setJumlahBuku(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm font-mono"
                      />
                      <span className="text-xs text-slate-500 block">
                        Contoh: 25 eksemplar untuk satu rombel kelas.
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700 block">
                        4. Batas Waktu Pengembalian *
                      </label>
                      <input
                        type="date"
                        value={tglBatasKembaliKolektif}
                        onChange={(e) => setTglBatasKembaliKolektif(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm font-sans"
                      />
                      <span className="text-xs text-slate-500 block">
                        Default: Hari ini (setelah jam KBM selesai).
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700 block">
                      5. Keperluan / Catatan Jam Pelajaran
                    </label>
                    <input
                      type="text"
                      value={keperluan}
                      onChange={(e) => setKeperluan(e.target.value)}
                      placeholder="Contoh: KBM Tematik Tema 1 - Jam Ke 2-3 (Ibu Siti)"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm"
                    />
                  </div>

                  {/* Summary Callout */}
                  {selectedSiswa && selectedBukuObject && (
                    <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 flex items-start gap-2">
                      <span className="material-symbols-outlined text-[18px] text-indigo-600 shrink-0 mt-0.5">
                        info
                      </span>
                      <div>
                        Sistem akan mengalokasikan <strong>{jumlahBuku} eksemplar fisik buku kondisi baik</strong> secara otomatis atas nama penanggung jawab{' '}
                        <strong>{selectedSiswa.nama}</strong> untuk{' '}
                        <strong>
                          Kelas {selectedSiswa.siswa_kelas?.[0]?.kelas_detail?.kelas?.kelas || 'Umum'}
                        </strong>.
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Mode Mandiri Fields */
                <>
                  <div className="space-y-2">
                    <label className="font-semibold text-slate-700 block">
                      2. Masukkan Barcode Buku (Maksimal 3 Buku) *
                    </label>

                    {/* Barcode input row */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={barcodeInput}
                        onChange={(e) => setBarcodeInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleAddCopy()
                          }
                        }}
                        placeholder="Scan / ketik kode barcode (e.g. BK-1-001)..."
                        className="flex-1 px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all font-mono text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddCopy()}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs shadow-xs transition-all active:scale-[0.98]"
                      >
                        + Tambah
                      </button>
                    </div>

                    {/* Dropdown helper for quick copy pick */}
                    {catalogBooks.length > 0 && (
                      <div className="pt-1">
                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              handleAddCopy(e.target.value)
                              e.target.value = ''
                            }
                          }}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-600 outline-none"
                        >
                          <option value="">Atau pilih cepat dari buku tersedia...</option>
                          {catalogBooks.map((b) =>
                            b.details
                              ?.filter((d) => d.kondisi === 'baik')
                              .slice(0, 3)
                              .map((d) => (
                                <option key={d.idbukudetail} value={d.kodebukudetail}>
                                  {b.judul} — Barcode: {d.kodebukudetail}
                                </option>
                              ))
                          )}
                        </select>
                      </div>
                    )}

                    {/* Selected Copies List */}
                    <div className="pt-2">
                      <div className="text-xs font-semibold text-slate-600 mb-1.5">
                        Daftar Buku Terpilih ({selectedCopies.length} / 3):
                      </div>
                      {selectedCopies.length === 0 ? (
                        <div className="p-3 text-center rounded-xl border border-dashed border-slate-300 text-xs text-slate-500">
                          Belum ada buku yang ditambahkan.
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          {selectedCopies.map((code, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                            >
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px] text-emerald-600">
                                  menu_book
                                </span>
                                <span className="font-mono font-semibold text-slate-800">
                                  {code}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveCopy(idx)}
                                className="text-rose-600 hover:text-rose-800 text-xs font-semibold px-2 py-0.5 rounded"
                              >
                                Hapus
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700 block">
                      3. Batas Waktu Pengembalian *
                    </label>
                    <input
                      type="date"
                      value={tglBatasKembaliMandiri}
                      onChange={(e) => setTglBatasKembaliMandiri(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm font-sans"
                    />
                    <span className="text-xs text-slate-500 block">
                      Standar pinjam mandiri: 7 hari kalender.
                    </span>
                  </div>
                </>
              )}

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseCreateModal}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submittingCreate}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-all disabled:opacity-50 flex items-center gap-2 active:scale-[0.98]"
                >
                  {submittingCreate && (
                    <span className="material-symbols-outlined text-[16px] animate-spin">
                      sync
                    </span>
                  )}
                  <span>
                    {modePinjam === 'kolektif'
                      ? `Simpan Peminjaman Kelas (${jumlahBuku} Buku)`
                      : `Simpan Peminjaman Mandiri (${selectedCopies.length} Buku)`}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Konfirmasi Pengembalian Buku */}
      {returnModalLoan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in no-print">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[28px]">assignment_return</span>
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Konfirmasi Pengembalian Buku
                </h3>
                <p className="text-xs text-slate-600">
                  {returnModalLoan.pinjam_details?.length > 3
                    ? 'Peminjaman Paket Kelas (Kolektif)'
                    : 'Peminjaman Mandiri Siswa'}
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl space-y-2 border border-slate-200/80 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Peminjam:</span>
                <span className="font-bold text-slate-800">
                  {returnModalLoan.siswa?.nama} (NIS: {returnModalLoan.siswa?.nis})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Kelas / Rombel:</span>
                <span className="font-medium text-emerald-700">
                  Kelas{' '}
                  {returnModalLoan.siswa?.siswa_kelas?.[0]?.kelas_detail?.kelas?.kelas || 'Umum'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Jumlah Buku:</span>
                <span className="font-bold text-slate-900">
                  {returnModalLoan.pinjam_details?.length || 1} Eksemplar
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Batas Kembali:</span>
                <span className="font-semibold text-slate-700">
                  {formatDate(returnModalLoan.tgl_batas_kembali)}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              Apakah Anda yakin ingin menyelesaikan transaksi pengembalian ini? Stok tersedia pada katalog buku akan otomatis dipulihkan kembali ke sistem.
            </p>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setReturnModalLoan(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={submittingReturn}
                onClick={handleConfirmReturn}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 disabled:opacity-50 transition-all active:scale-[0.98]"
              >
                {submittingReturn && (
                  <span className="material-symbols-outlined text-[16px] animate-spin">
                    sync
                  </span>
                )}
                <span>Ya, Selesaikan Pengembalian</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Detail Transaksi Peminjaman */}
      {selectedLoan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in no-print">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-bold text-base text-slate-900">Detail Peminjaman Buku</h3>
                <span className="text-xs text-slate-500 font-mono">
                  ID Transaksi: TRX-{String(selectedLoan.idpinjam).padStart(5, '0')}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLoan(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl space-y-1.5 border border-slate-200/60">
                <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Informasi Peminjam
                </div>
                <div className="font-bold text-sm text-slate-900">{selectedLoan.siswa?.nama}</div>
                <div className="text-slate-600 font-mono">
                  NIS: {selectedLoan.siswa?.nis} | NISN: {selectedLoan.siswa?.nisn || '-'}
                </div>
                <div className="text-emerald-700 font-medium">
                  Rombel: Kelas{' '}
                  {selectedLoan.siswa?.siswa_kelas?.[0]?.kelas_detail?.kelas?.kelas || '-'}
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Buku yang Dipinjam ({selectedLoan.pinjam_details?.length || 0} Eksemplar)
                  </div>
                  {selectedLoan.pinjam_details?.length > 3 ? (
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 whitespace-nowrap">
                      Paket Per Kelas
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 whitespace-nowrap">
                      Mandiri
                    </span>
                  )}
                </div>

                <div className="max-h-48 overflow-y-auto space-y-2 pr-1 divide-y divide-slate-100">
                  {selectedLoan.pinjam_details?.map((d, i) => (
                    <div key={i} className="pt-2 first:pt-0">
                      <div className="font-semibold text-slate-800">
                        {d.buku_detail?.buku?.judul}
                      </div>
                      <div className="text-xs text-slate-600 flex items-center gap-2 mt-0.5">
                        <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">
                          Barcode: {d.buku_detail?.kodebukudetail}
                        </span>
                        <span>Kondisi: {d.buku_detail?.kondisi || 'baik'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-600 block text-xs">Tgl Peminjaman</span>
                  <span className="font-semibold text-slate-800">
                    {formatDate(selectedLoan.waktu)}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-600 block text-xs">Batas Pengembalian</span>
                  <span className="font-semibold text-slate-800">
                    {formatDate(selectedLoan.tgl_batas_kembali)}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-600 block text-xs">Tgl Dikembalikan</span>
                  <span className="font-semibold text-slate-800">
                    {formatDate(selectedLoan.tgl_dikembalikan)}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-600 block text-xs">Total Denda</span>
                  <span className="font-bold text-rose-600 font-mono">
                    {formatRupiah(selectedLoan.total_denda)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600">
                <span>
                  Petugas: <strong>{selectedLoan.petugas?.nama_user || 'Pustakawan'}</strong>
                </span>
                <span>Status: {getStatusBadge(selectedLoan.status)}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              {selectedLoan.status === 'dipinjam' ? (
                <button
                  type="button"
                  onClick={() => {
                    setReturnModalLoan(selectedLoan)
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[16px]">assignment_return</span>
                  <span>Kembalikan Buku Sekarang</span>
                </button>
              ) : (
                <div></div>
              )}

              <button
                type="button"
                onClick={() => setSelectedLoan(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
