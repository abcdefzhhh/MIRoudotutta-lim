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
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Filters
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
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

  // Selected for detail modal
  const [selectedLoan, setSelectedLoan] = useState(null)

  const fetchLoans = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/pinjam', {
        params: {
          search: search || undefined,
          status: statusFilter || undefined,
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
  }, [search, statusFilter, tglMulai, tglSelesai, page])

  const handleResetFilter = () => {
    setSearch('')
    setStatusFilter('')
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
      return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'dipinjam':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Sedang Dipinjam
          </span>
        )
      case 'dikembalikan':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
            Sudah Kembali
          </span>
        )
      case 'terlambat':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Terlambat
          </span>
        )
      default:
        return (
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
            {status}
          </span>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Print-only Header */}
      <div className="hidden print:block mb-6 border-b-2 border-slate-900 pb-4 text-center">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          MADRASAH IBTIDAIYAH ROUDOTUTTA'LIM
        </h1>
        <p className="text-xs text-slate-600">
          LAPORAN SIRKULASI &amp; REKAPITULASI PEMINJAMAN BUKU PERPUSTAKAAN
        </p>
        <p className="text-[11px] text-slate-500 mt-1">
          Dicetak pada: {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}
        </p>
      </div>

      {/* Screen Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Laporan Data Peminjaman
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Rekapitulasi transaksi sirkulasi buku Siswa, batas waktu pengembalian, status operasional, dan kalkulasi denda.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Cetak Laporan</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 no-print">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">receipt_long</span>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
              Total Transaksi
            </span>
            <span className="text-xl font-bold text-slate-900">{metrics.total_transaksi}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">menu_book</span>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
              Aktif Dipinjam
            </span>
            <span className="text-xl font-bold text-slate-900">{metrics.dipinjam_aktif}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
              Sudah Kembali
            </span>
            <span className="text-xl font-bold text-slate-900">{metrics.sudah_kembali}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">timer_off</span>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
              Terlambat
            </span>
            <span className="text-xl font-bold text-slate-900">{metrics.terlambat}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3 col-span-2 sm:col-span-1">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">payments</span>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
              Total Denda
            </span>
            <span className="text-base font-bold text-slate-900 font-mono">
              {formatRupiah(metrics.total_denda)}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs p-4 sm:p-5 no-print space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
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
              placeholder="Cari Siswa, NIS, kode/judul buku..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setPage(1)
              }}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            >
              <option value="">Semua Status Transaksi</option>
              <option value="dipinjam">Sedang Dipinjam</option>
              <option value="dikembalikan">Sudah Dikembalikan</option>
              <option value="terlambat">Terlambat / Denda</option>
            </select>
          </div>

          {/* Tanggal Mulai */}
          <div>
            <input
              type="date"
              value={tglMulai}
              onChange={(e) => {
                setTglMulai(e.target.value)
                setPage(1)
              }}
              title="Dari Tanggal Pinjam"
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            />
          </div>

          {/* Tanggal Selesai */}
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={tglSelesai}
              onChange={(e) => {
                setTglSelesai(e.target.value)
                setPage(1)
              }}
              title="Sampai Tanggal Pinjam"
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            />
            {(search || statusFilter || tglMulai || tglSelesai) && (
              <button
                type="button"
                onClick={handleResetFilter}
                className="px-2.5 py-2 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold shrink-0"
                title="Reset Filter"
              >
                Reset
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

      {/* Main Table Card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden print:border-none print:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200 text-xs uppercase tracking-wider print:bg-slate-100">
              <tr>
                <th className="py-3 px-4 w-12 text-center">No</th>
                <th className="py-3 px-4">Peminjam (Siswa)</th>
                <th className="py-3 px-4">Buku &amp; Barcode</th>
                <th className="py-3 px-4 w-28">Tgl Pinjam</th>
                <th className="py-3 px-4 w-28">Batas Kembali</th>
                <th className="py-3 px-4 w-28">Tgl Kembali</th>
                <th className="py-3 px-4 w-32 text-center">Status</th>
                <th className="py-3 px-4 w-28 text-right font-mono">Denda</th>
                <th className="py-3 px-4 w-36 no-print">Petugas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
              {loading && (
                <tr>
                  <td colSpan="9" className="py-12 text-center text-xs text-slate-500">
                    <span className="material-symbols-outlined text-[24px] animate-spin text-emerald-600 block mb-1">
                      sync
                    </span>
                    Memuat laporan peminjaman...
                  </td>
                </tr>
              )}

              {!loading && loans.length === 0 && (
                <tr>
                  <td colSpan="9" className="py-14 text-center text-xs text-slate-500">
                    <span className="material-symbols-outlined text-[36px] text-slate-300 block mb-2">
                      inbox
                    </span>
                    Tidak ada data peminjaman yang cocok dengan filter.
                  </td>
                </tr>
              )}

              {!loading &&
                loans.map((item, idx) => {
                  const rombel =
                    item.siswa?.siswa_kelas?.[0]?.kelas_detail?.kelas?.kelas || '-'
                  const details = item.pinjam_details || []
                  const fine = Number(item.total_denda) || 0

                  return (
                    <tr
                      key={item.idpinjam}
                      onClick={() => setSelectedLoan(item)}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-4 text-center text-xs text-slate-400">
                        {(pagination.from || 1) + idx}
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">
                          {item.siswa?.nama || 'Siswa Umum'}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono">NIS: {item.siswa?.nis || '-'}</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-medium">Kelas {rombel}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        {details.map((d, dIdx) => (
                          <div key={dIdx} className="mb-1 last:mb-0">
                            <span className="font-medium text-slate-800 line-clamp-1">
                              {d.buku_detail?.buku?.judul || 'Buku Perpustakaan'}
                            </span>
                            <span className="font-mono text-[11px] text-slate-500 block">
                              [{d.buku_detail?.kodebukudetail || '-'}]
                            </span>
                          </div>
                        ))}
                      </td>

                      <td className="py-3 px-4 text-xs text-slate-600">
                        {formatDate(item.waktu)}
                      </td>

                      <td className="py-3 px-4 text-xs font-medium text-slate-700">
                        {formatDate(item.tgl_batas_kembali)}
                      </td>

                      <td className="py-3 px-4 text-xs text-slate-600">
                        {formatDate(item.tgl_dikembalikan)}
                      </td>

                      <td className="py-3 px-4 text-center">
                        {getStatusBadge(item.status)}
                      </td>

                      <td className="py-3 px-4 text-right font-mono text-xs font-semibold">
                        {fine > 0 ? (
                          <span className="text-rose-600">{formatRupiah(fine)}</span>
                        ) : (
                          <span className="text-slate-400">Rp 0</span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-xs text-slate-600 no-print">
                        {item.petugas?.nama_user || 'Pustakawan'}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {!loading && pagination.total > 0 && (
          <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 no-print">
            <div>
              Menampilkan <span className="font-semibold text-slate-900">{pagination.from || 0}</span>–<span className="font-semibold text-slate-900">{pagination.to || 0}</span> dari <span className="font-semibold text-slate-900">{pagination.total || 0}</span> transaksi
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

      {/* DETAIL MODAL */}
      {selectedLoan && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in no-print">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-600 text-[22px]">
                  receipt
                </span>
                <h3 className="font-bold text-base text-slate-900">
                  Rincian Transaksi #{selectedLoan.idpinjam}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLoan(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl space-y-1.5 border border-slate-200/60">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Informasi Peminjam
                </div>
                <div className="font-bold text-sm text-slate-900">{selectedLoan.siswa?.nama}</div>
                <div className="text-slate-500 font-mono">
                  NIS: {selectedLoan.siswa?.nis} | NISN: {selectedLoan.siswa?.nisn || '-'}
                </div>
                <div className="text-emerald-700 font-medium">
                  Rombel: Kelas{' '}
                  {selectedLoan.siswa?.siswa_kelas?.[0]?.kelas_detail?.kelas?.kelas || '-'}
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-3.5 space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Buku yang Dipinjam ({selectedLoan.pinjam_details?.length || 0} Eksemplar)
                </div>
                {selectedLoan.pinjam_details?.map((d, i) => (
                  <div key={i} className="pb-2 border-b border-slate-100 last:border-b-0 last:pb-0">
                    <div className="font-semibold text-slate-800">
                      {d.buku_detail?.buku?.judul}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                      <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">
                        Barcode: {d.buku_detail?.kodebukudetail}
                      </span>
                      <span>Kondisi: {d.buku_detail?.kondisi}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 block text-[10px]">Tgl Peminjaman</span>
                  <span className="font-semibold text-slate-800">
                    {formatDate(selectedLoan.waktu)}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 block text-[10px]">Batas Pengembalian</span>
                  <span className="font-semibold text-slate-800">
                    {formatDate(selectedLoan.tgl_batas_kembali)}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 block text-[10px]">Tgl Dikembalikan</span>
                  <span className="font-semibold text-slate-800">
                    {formatDate(selectedLoan.tgl_dikembalikan)}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 block text-[10px]">Total Denda</span>
                  <span className="font-bold text-rose-600 font-mono">
                    {formatRupiah(selectedLoan.total_denda)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                <span>Petugas: <strong>{selectedLoan.petugas?.nama_user}</strong></span>
                <span>Status: {getStatusBadge(selectedLoan.status)}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedLoan(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
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
