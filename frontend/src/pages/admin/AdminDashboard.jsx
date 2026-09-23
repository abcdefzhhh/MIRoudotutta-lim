import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total_siswa: 0,
    total_guru: 0,
    total_kelas: 0,
    total_rombel: 0,
    total_buku: 0,
    total_eksemplar: 0,
    total_berita: 0,
    pinjam_aktif: 0,
  })
  const [recentNews, setRecentNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchDashboardData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [statsRes, newsRes] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/stats'),
        axios.get('http://127.0.0.1:8000/api/berita'),
      ])

      if (statsRes.data?.success && statsRes.data.data) {
        setStats(statsRes.data.data)
      }

      if (newsRes.data?.success && newsRes.data.data?.data) {
        setRecentNews(newsRes.data.data.data.slice(0, 5))
      }
    } catch (err) {
      console.error(err)
      setError('Gagal menghubungkan ke backend API. Pastikan server Laravel aktif.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const statCards = [
    {
      title: 'Total Siswa Aktif',
      value: stats.total_siswa,
      unit: 'Siswa',
      icon: 'school',
      color: 'bg-emerald-500/10 text-emerald-700 border-emerald-200',
      href: '/admin/siswa',
    },
    {
      title: 'Rombongan Belajar',
      value: stats.total_rombel,
      unit: 'Rombel',
      icon: 'groups',
      color: 'bg-teal-500/10 text-teal-700 border-teal-200',
      href: '/admin/rombel',
    },
    {
      title: 'Master Ruang Kelas',
      value: stats.total_kelas,
      unit: 'Ruangan',
      icon: 'meeting_room',
      color: 'bg-blue-500/10 text-blue-700 border-blue-200',
      href: '/admin/kelas',
    },
    {
      title: 'Dewan Asatidz & Guru',
      value: stats.total_guru,
      unit: 'Pendidik',
      icon: 'badge',
      color: 'bg-indigo-500/10 text-indigo-700 border-indigo-200',
      href: '/admin/guru',
    },
    {
      title: 'Judul Koleksi Buku',
      value: stats.total_buku,
      unit: 'Judul',
      icon: 'menu_book',
      color: 'bg-amber-500/10 text-amber-700 border-amber-200',
      href: '/admin/buku',
    },
    {
      title: 'Eksemplar Buku Fisik',
      value: stats.total_eksemplar,
      unit: 'Buku Bertiket',
      icon: 'qr_code_scanner',
      color: 'bg-purple-500/10 text-purple-700 border-purple-200',
      href: '/admin/buku',
    },
    {
      title: 'Warta Terpublikasi',
      value: stats.total_berita,
      unit: 'Artikel',
      icon: 'newspaper',
      color: 'bg-rose-500/10 text-rose-700 border-rose-200',
      href: '/admin/berita',
    },
    {
      title: 'Buku Sedang Dipinjam',
      value: stats.pinjam_aktif,
      unit: 'Sirkulasi Aktif',
      icon: 'sync_alt',
      color: 'bg-cyan-500/10 text-cyan-700 border-cyan-200',
      href: '/admin/buku',
    },
  ]

  const quickActions = [
    {
      title: 'Kelola Rombel & Siswa',
      desc: 'Atur pembagian Siswa ke rombel dan tentukan wali kelas.',
      icon: 'groups',
      href: '/admin/rombel',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
    {
      title: 'Data Ruang & Kelas',
      desc: 'Daftar jenjang tingkat 1–6 dan penamaan ruang kelas.',
      icon: 'meeting_room',
      href: '/admin/kelas',
      btnColor: 'bg-teal-600 hover:bg-teal-700 text-white',
    },
    {
      title: 'Cetak Kartu Siswa (QR)',
      desc: 'Cetak kartu pelajar standar 8.5x5.3cm dengan barcode QR.',
      icon: 'print',
      href: '/admin/siswa',
      btnColor: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    },
    {
      title: 'Tulis Warta Baru',
      desc: 'Publikasikan kabar madrasah atau prestasi Siswa.',
      icon: 'edit_document',
      href: '/admin/berita',
      btnColor: 'bg-slate-800 hover:bg-slate-900 text-white',
    },
    {
      title: 'Report Peminjaman',
      desc: 'Rekapitulasi sirkulasi Siswa, status pengembalian, & denda.',
      icon: 'receipt_long',
      href: '/admin/report',
      btnColor: 'bg-emerald-800 hover:bg-emerald-900 text-white',
    },
    {
      title: 'Impor & Ekspor Excel',
      desc: 'Unggah atau unduh data master sekolah 3 sheet (.xlsx).',
      icon: 'table_view',
      href: '/admin/excel',
      btnColor: 'bg-slate-700 hover:bg-slate-800 text-white',
    },
  ]

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

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-8 shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Selamat Datang di Panel MI Roudotutta'lim
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Kelola master data madrasah, cetak kartu Siswa dengan kode QR terpadu, dan sinkronkan publikasi warta madrasah langsung ke website publik.
          </p>
        </div>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">error</span>
            <span>{error}</span>
          </div>
          <button
            onClick={fetchDashboardData}
            className="px-3 py-1 bg-white border border-rose-300 rounded-lg text-rose-700 font-semibold hover:bg-rose-100 text-xs"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, idx) => (
          <Link
            key={idx}
            to={card.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {card.title}
              </span>
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${card.color}`}
              >
                <span className="material-symbols-outlined text-[20px]">{card.icon}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900 tracking-tight">
                {loading ? '...' : card.value}
              </span>
              <span className="text-xs text-slate-500 font-medium">{card.unit}</span>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-emerald-700 transition-colors">
              <span>Buka modul data</span>
              <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-1">Aksi Cepat</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, idx) => (
            <Link
              key={idx}
              to={action.href}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-100/80 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-lg bg-slate-200/80 text-slate-700 flex items-center justify-center mb-2.5">
                  <span className="material-symbols-outlined text-[20px]">{action.icon}</span>
                </div>
                <h4 className="font-semibold text-sm text-slate-900">{action.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{action.desc}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 mt-4">
                <span>Buka</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent News Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900">Publikasi Warta Terbaru</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              5 artikel terakhir yang dipublikasikan ke landing page publik.
            </p>
          </div>
          <Link
            to="/admin/berita"
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
          >
            <span>Kelola Semua Berita</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200 text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 w-12 text-center">ID</th>
                <th className="py-3 px-4">Judul Berita</th>
                <th className="py-3 px-4 w-44">Tanggal Terbit</th>
                <th className="py-3 px-4 w-32 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {recentNews.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-xs text-slate-500">
                    Belum ada berita terpublikasi.
                  </td>
                </tr>
              ) : (
                recentNews.map((item) => (
                  <tr key={item.id_berita} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 text-center font-mono text-xs text-slate-500">
                      {item.id_berita}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-900 line-clamp-1">
                        {item.judul}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600">
                      {formatDate(item.tgl_publish)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Link
                        to={`/berita/${item.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                      >
                        <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                        <span>Lihat Web</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
