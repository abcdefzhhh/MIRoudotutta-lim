import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import useScrollReveal, { useStaggerReveal } from '../hooks/useScrollReveal'

const fallbackNewsImg =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBePtJMaCotwUdo_WVJlOrgnrXRzFsC9mCFuCnJrbbzK08aZUjZ_F5K_BmIDAZKIFMKDQhJmVn3C8SiPobA44tHCsNDPD52AKiuutsgnrgBHo5gVVnFsZlFOVd11qSda7EjMzirIGi92dBE9dPD24vhJQ30BbUBeh91fZpeWcRJ_8Kqymu0Awmfth_MEAkC_xsX6vOBjSfYy1LUSYwIfY4FDLtuISJggPnPsMGAxDTLLiIJV1Fe9PslNA'

export default function Berita() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const controlsRef = useScrollReveal()
  const newsGridRef = useStaggerReveal({ staggerMs: 100 })

  const fallbackNews = [
    {
      id_berita: 6,
      judul: 'MEMENANGKAN PORSENI',
      slug: 'memenangkan-porseni',
      isi_konten: 'siswa mi memenangkan porseni',
      tgl_publish: '2026-09-23T00:00:00.000000Z',
      kategori: 'Prestasi',
      gambar_thumbnail_url: 'http://127.0.0.1:8000/uploads/berita/berita_1790127477_isKB2C.png',
      gambar_thumbnail: 'uploads/berita/berita_1790127477_isKB2C.png',
    },
    {
      id_berita: 3,
      judul: 'Siswa MI Roudotutta\'lim Sabet Medali Emas Lomba Tahfidz dan Kaligrafi Tingkat Kecamatan',
      slug: 'siswa-mi-roudotuttalim-sabet-medali-emas-lomba-tahfidz-kaligrafi',
      isi_konten: 'Prestasi membanggakan kembali ditorehkan oleh Siswa MI Roudotutta\'lim dalam ajang Festival Seni & Olahraga Madrasah (AKSIOMA). Muhammad Al-Fatih dan Aisyah Humaira sukses meraih Juara 1 Cabang Tahfidz Juz 30 dan Cabang Seni Khat Kaligrafi Islam.',
      tgl_publish: '2026-09-08T02:10:52.000000Z',
      kategori: 'Prestasi',
      gambar_thumbnail_url:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBePtJMaCotwUdo_WVJlOrgnrXRzFsC9mCFuCnJrbbzK08aZUjZ_F5K_BmIDAZKIFMKDQhJmVn3C8SiPobA44tHCsNDPD52AKiuutsgnrgBHo5gVVnFsZlFOVd11qSda7EjMzirIGi92dBE9dPD24vhJQ30BbUBeh91fZpeWcRJ_8Kqymu0Awmfth_MEAkC_xsX6vOBjSfYy1LUSYwIfY4FDLtuISJggPnPsMGAxDTLLiIJV1Fe9PslNA',
    },
    {
      id_berita: 2,
      judul: 'Semarak Gerakan Gemar Membaca dan Pojok Baca Digital di Perpustakaan Madrasah',
      slug: 'semarak-gerakan-gemar-membaca-dan-pojok-baca-digital',
      isi_konten: 'Perpustakaan SIPERPUS MI Roudotutta\'lim meresmikan sarana pojok baca interaktif yang dilengkapi tablet literasi digital dan ribuan buku ensiklopedia anak islami. Siswa-siswi sangat antusias mengikuti tantangan membaca 15 menit sebelum masuk kelas.',
      tgl_publish: '2026-09-05T02:10:52.000000Z',
      kategori: 'Kegiatan',
      gambar_thumbnail_url:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC9EaAXAgEgRHM7I0pOWNBY6650nNwDDvTv62FssczfGeNyObgQNSArCMN-AUhHSdWFxCnizXwyTGX5lRiYt02GPMnib8u1F_FqoNu-nmblRVuWaPa9URy6ZlAb9xZlu8dQbBfnB96tKFk9AyQJ8q7r17dFv3UQYhXVsonbDkmpNsbw3kE-P6ttsMsY29kKxO9UQcL2nWCrO-Q9awGwckooa8JaXMFvXWItaXp11WvVF2XyI1gKHwRUIw',
    },
    {
      id_berita: 1,
      judul: 'Peringatan Maulid Nabi Muhammad SAW di MI Roudotutta\'lim Penuh Khidmat',
      slug: 'peringatan-maulid-nabi-muhammad-saw-mi-roudotuttalim',
      isi_konten: 'Keluarga besar MI Roudotutta\'lim menyelenggarakan peringatan Maulid Nabi Muhammad SAW 1447 H. Acara diisi dengan penampilan shalawat banjari para siswa, pembacaan qasidah Diba\', santunan kepada anak yatim, serta tausiyah agama oleh Pengasuh Madrasah mengenai keteladanan akhlak Rasulullah.',
      tgl_publish: '2026-08-31T02:10:52.000000Z',
      kategori: 'Pengumuman',
      gambar_thumbnail_url:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA4VzSQGE_4bhbB4HxhFFqinNv4XO2ztu1Eru2hmwmuM2FRomloF6SuwQRiDwVtK50-tSyiBBviEBTRC0OKVvUyXwubH0o7W6up_-wipTHRa9Qun9XRXKajwdycYDsM7g_8zynYW-1FniiTTjxJ1PVtGi-uJ9bCeuIYiwhaGnRzDao2mzUFay1whz_bj3rq-S_NJ1SUKBvl_db8gOe3gE9eLP96ywP5CmphcPKiVekXvgUCgZzYyvTFMg',
    },
  ]

  const fetchNews = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/berita')
      if (res.data && res.data.success && res.data.data?.data) {
        setNews(res.data.data.data)
      } else {
        setNews(fallbackNews)
      }
    } catch (err) {
      console.warn('API /api/berita unreachable, using curated data:', err)
      setError('Gagal memuat berita dari server. Menampilkan warta terbitan madrasah.')
      setNews(fallbackNews)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const categories = ['Semua', 'Prestasi', 'Kegiatan', 'Pengumuman']

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.judul?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.isi_konten?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCat =
      selectedCategory === 'Semua' || (item.kategori || 'Kegiatan') === selectedCategory
    return matchesSearch && matchesCat
  })

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Baru saja'
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  return (
    <div className="w-full bg-ivory pt-24 pb-20">
      {/* Header Banner */}
      <section className="bg-emerald-deep text-white py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D9A62B_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-tight">
              Warta &amp; Berita Madrasah
            </h1>
            <p className="mt-4 text-base sm:text-lg text-emerald-50/90 font-body leading-relaxed max-w-2xl">
              Informasi terkini mengenai dinamika pembelajaran Siswa, prestasi perlombaan, agenda madrasah, dan pengumuman resmi bagi wali murid.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin mt-10 space-y-10">
        {/* Controls: Search & Category Filter */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-border shadow-xs flex flex-col md:flex-row items-center justify-between gap-4" ref={controlsRef}>
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-emerald-deep text-white shadow-xs font-semibold'
                    : 'bg-ivory text-ink-soft hover:text-emerald-deep hover:bg-emerald-leaf/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berita..."
              className="w-full pl-10 pr-4 py-2 bg-ivory text-sm rounded-xl border border-border focus:ring-2 focus:ring-emerald-leaf/30 focus:border-emerald-leaf outline-none transition-all placeholder:text-ink-soft/60"
            />
          </div>
        </div>

        {/* Error Notice (Soft Rose Banner) */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-rose-600 text-[20px]">info</span>
              <span>{error}</span>
            </div>
            <button
              onClick={fetchNews}
              className="px-3 py-1 bg-white border border-rose-300 rounded-lg text-rose-700 font-semibold hover:bg-rose-100 text-xs shrink-0 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Loading State: Skeleton Loaders */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl border border-border p-6 space-y-4 animate-pulse"
              >
                <div className="w-full h-48 bg-slate-200 rounded-xl"></div>
                <div className="w-24 h-4 bg-slate-200 rounded"></div>
                <div className="w-full h-6 bg-slate-200 rounded"></div>
                <div className="w-4/5 h-4 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredNews.length === 0 && (
          <div className="bg-white rounded-2xl border border-border p-12 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-deep/10 text-emerald-deep flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[32px]">newspaper</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-ink">Tidak Ada Warta Ditemukan</h3>
            <p className="text-xs text-ink-soft mt-1">
              Tidak ada artikel yang cocok dengan kata kunci &quot;{searchQuery}&quot;. Coba cari dengan kata kunci lain.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('Semua')
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-emerald-deep text-white text-xs font-semibold hover:bg-emerald-leaf transition-colors"
            >
              Reset Pencarian
            </button>
          </div>
        )}

        {/* News Grid Cards */}
        {!loading && filteredNews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={newsGridRef}>
            {filteredNews.map((item, idx) => (
              <article
                key={item.id_berita || idx}
                className="reveal-child bg-white rounded-2xl border border-border overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-emerald-leaf/40 transform hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div>
                  {/* Photo Thumbnail */}
                  <div className="w-full h-52 relative overflow-hidden bg-slate-100">
                    <img
                      src={item.gambar_thumbnail_url || item.gambar_thumbnail || fallbackNewsImg}
                      alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = fallbackNewsImg
                      }}
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-ink-soft mb-2.5">
                      <span className="material-symbols-outlined text-[16px] text-emerald-leaf">
                        calendar_today
                      </span>
                      <span>{formatDate(item.tgl_publish)}</span>
                      {item.kategori && (
                        <>
                          <span>•</span>
                          <span className="font-semibold text-emerald-800">{item.kategori}</span>
                        </>
                      )}
                    </div>

                    <h2 className="font-heading font-bold text-lg text-ink group-hover:text-emerald-deep transition-colors line-clamp-2 leading-snug">
                      <Link to={`/berita/${item.slug}`}>
                        {item.judul}
                      </Link>
                    </h2>

                    <p className="font-body text-xs sm:text-sm text-ink-soft mt-2.5 line-clamp-3 leading-relaxed">
                      {item.isi_konten}
                    </p>
                  </div>
                </div>

                {/* Footer link */}
                <div className="px-6 pb-6 pt-2">
                  <Link
                    to={`/berita/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-leaf hover:text-emerald-deep group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Baca Selengkapnya</span>
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
