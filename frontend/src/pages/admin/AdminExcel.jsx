import { useState, useEffect } from 'react'
import axios from 'axios'

export default function AdminExcel() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [importResult, setImportResult] = useState(null)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/stats')
      .then((res) => {
        if (res.data?.success && res.data.data) {
          setStats(res.data.data)
        }
      })
      .catch(() => {})
  }, [])

  const handleExport = async () => {
    setDownloading(true)
    setError(null)
    try {
      // Trigger browser download via direct link / blob
      const res = await axios.get('http://127.0.0.1:8000/api/excel/export', {
        responseType: 'blob',
      })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `report_rekapitulasi_madrasah_${new Date().toISOString().slice(0, 10)}.xlsx`)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
    } catch (err) {
      console.error(err)
      setError('Gagal mengunduh berkas report Excel dari server backend.')
    } finally {
      setDownloading(false)
    }
  }

  const handleImportSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Silakan pilih berkas Excel (.xlsx / .xls) terlebih dahulu.')
      return
    }

    setUploading(true)
    setError(null)
    setImportResult(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/excel/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (res.data?.success) {
        setImportResult(res.data)
        setFile(null)
      } else {
        setError(res.data?.message || 'Gagal mengimpor berkas Excel.')
      }
    } catch (err) {
      console.error(err)
      setError(
        err.response?.data?.message ||
          'Terjadi kesalahan saat memproses impor Excel. Seluruh transaksi di-rollback untuk menjaga keutuhan data.'
      )
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Pusat Report &amp; Rekapitulasi Data
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Unduh rekapitulasi data resmi madrasah terpadu (.xlsx multi-sheet) dan fasilitas sinkronisasi data master.
        </p>
      </div>

      {/* Live Data Summary Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">Siswa Aktif</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {stats ? stats.total_siswa : '620'} <span className="text-xs font-normal text-slate-500">Siswa</span>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">GTK (Guru &amp; Staf)</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {stats ? stats.total_guru : '36'} <span className="text-xs font-normal text-slate-500">Pendidik</span>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">Rombel Siswa</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {stats ? stats.total_rombel : '18'} <span className="text-xs font-normal text-slate-500">Rombel</span>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">Katalog Buku</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {stats ? stats.total_buku : '10'} <span className="text-xs font-normal text-slate-500">Judul</span>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      {importResult && (
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm animate-fade-in space-y-2">
          <div className="flex items-center gap-2 font-bold text-base text-emerald-900">
            <span className="material-symbols-outlined text-[24px] text-emerald-600">
              check_circle
            </span>
            <span>{importResult.message}</span>
          </div>
          <p className="text-xs text-emerald-700">
            Seluruh data berhasil disinkronkan ke database MySQL tanpa ada konflik atau data ganda.
          </p>
          {importResult.data && (
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-200 text-center font-mono text-xs">
              <div className="bg-white/80 p-2 rounded-lg">
                <span className="text-slate-500 block text-[10px]">Total Siswa</span>
                <span className="font-bold text-slate-900">{importResult.data.total_siswa}</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg">
                <span className="text-slate-500 block text-[10px]">Total Guru</span>
                <span className="font-bold text-slate-900">{importResult.data.total_guru}</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg">
                <span className="text-slate-500 block text-[10px]">Total Buku</span>
                <span className="font-bold text-slate-900">{importResult.data.total_buku}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start justify-between gap-3 animate-fade-in">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[20px] text-rose-600 shrink-0 mt-0.5">
              error
            </span>
            <div>
              <span className="font-bold block">Gagal Memproses File</span>
              <span className="text-xs leading-relaxed">{error}</span>
            </div>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-slate-400 hover:text-slate-600 text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* Two Column Grid: Export Card & Import Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* EXPORT CARD */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">summarize</span>
            </div>
            <h3 className="font-bold text-lg text-slate-900">Unduh Report Master (.xlsx)</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Unduh rekapitulasi data lengkap sekolah yang terbagi dalam 3 lembar kerja (*sheet*) terstruktur secara otomatis:
            </p>

            <ul className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span><strong>Sheet 1: Siswa</strong> ({stats ? stats.total_siswa : '620'} Siswa lengkap NIS, NISN, Nama, &amp; Rombel)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span><strong>Sheet 2: Guru</strong> ({stats ? stats.total_guru : '36'} GTK lengkap NIP/NUPTK/NIK, Nama, &amp; No HP)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span><strong>Sheet 3: Buku</strong> (Katalog koleksi buku perpustakaan &amp; stok eksemplar)</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            disabled={downloading}
            onClick={handleExport}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {downloading ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                <span>Menyiapkan Berkas Report...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">file_download</span>
                <span>Unduh Report Excel Terpadu (.xlsx)</span>
              </>
            )}
          </button>
        </div>

        {/* IMPORT CARD */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">upload_file</span>
            </div>
            <h3 className="font-bold text-lg text-slate-900">Impor Multi-Sheet (.xlsx)</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Unggah file Excel hasil perbaruan data. Sistem menggunakan <strong>transaksi database atomik</strong>; jika ada satu baris data duplikat atau salah di sheet mana pun, seluruh file di-rollback demi integritas data.
            </p>

            <form onSubmit={handleImportSubmit} className="space-y-3 pt-1">
              <label
                htmlFor="excel-file-input"
                className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50"
              >
                <span className="material-symbols-outlined text-[32px] text-slate-400 mb-1">
                  cloud_upload
                </span>
                <span className="text-xs font-semibold text-slate-700">
                  {file ? file.name : 'Klik untuk memilih file .xlsx / .xls'}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">
                  Maksimal ukuran file 10 MB
                </span>
                <input
                  id="excel-file-input"
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>

              <button
                type="submit"
                disabled={uploading || !file}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {uploading ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                    <span>Memproses &amp; Memvalidasi 3 Sheet...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">publish</span>
                    <span>Proses Impor ke Database</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
            <span className="material-symbols-outlined text-[16px] text-amber-600 shrink-0 mt-0.5">
              shield
            </span>
            <span>
              <strong>Keamanan Transaksi:</strong> Sistem otomatis menolak proses impor dan tidak ada data yang tersimpan jika ditemukan NIS, NIP, atau ISBN yang sudah ada di database.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
