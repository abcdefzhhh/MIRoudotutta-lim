import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import beritaHeaderImg from '../assets/berita-header.jpg'
import useScrollReveal, { useStaggerReveal } from '../hooks/useScrollReveal'

const fallbackNewsImg =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBePtJMaCotwUdo_WVJlOrgnrXRzFsC9mCFuCnJrbbzK08aZUjZ_F5K_BmIDAZKIFMKDQhJmVn3C8SiPobA44tHCsNDPD52AKiuutsgnrgBHo5gVVnFsZlFOVd11qSda7EjMzirIGi92dBE9dPD24vhJQ30BbUBeh91fZpeWcRJ_8Kqymu0Awmfth_MEAkC_xsX6vOBjSfYy1LUSYwIfY4FDLtuISJggPnPsMGAxDTLLiIJV1Fe9PslNA'

const fallbackNews = [
  {
    id_berita: 6,
    judul: 'MEMENANGKAN PORSENI',
    slug: 'memenangkan-porseni',
    isi_konten:
      'Alhamdulillah, Siswa MI Roudotutta\'lim sukses menorehkan prestasi gemilang dengan memenangkan berbagai cabang perlombaan pada ajang Pekan Olahraga dan Seni (PORSENI) tingkat madrasah se-kecamatan.',
    tgl_publish: '2026-09-23T00:00:00.000000Z',
    kategori: 'Prestasi',
    gambar_thumbnail_url: 'http://127.0.0.1:8000/uploads/berita/berita_1790127477_isKB2C.png',
    gambar_thumbnail: 'uploads/berita/berita_1790127477_isKB2C.png',
  },
  {
    id_berita: 3,
    judul: 'Siswa MI Roudotutta\'lim Sabet Medali Emas Lomba Silat dan Kaligrafi Tingkat Kecamatan',
    slug: 'siswa-mi-roudotuttalim-sabet-medali-emas-lomba-silat-dan-kaligrafi-tingkat-kecamatan',
    isi_konten:
      'Prestasi membanggakan kembali ditorehkan oleh santri MI Roudotutta\'lim dalam ajang Festival Seni & Olahraga Madrasah (AKSIOMA). Muhammad Al-Fatih dan Aisyah Humaira sukses meraih Juara 1 Cabang Silat Bela Diri dan Cabang Seni Khat Kaligrafi Islam.',
    tgl_publish: '2026-09-08T02:10:52.000000Z',
    kategori: 'Prestasi',
    gambar_thumbnail_url: 'http://127.0.0.1:8000/uploads/berita/berita_1790148860_CGUewW.jpg',
    gambar_thumbnail: 'uploads/berita/berita_1790148860_CGUewW.jpg',
  },
  {
    id_berita: 2,
    judul: 'Semarak Gerakan Gemar Membaca dan Pojok Baca Digital di Perpustakaan Madrasah',
    slug: 'semarak-gerakan-gemar-membaca-dan-pojok-baca-digital',
    isi_konten:
      'Perpustakaan SIPERPUS MI Roudotutta\'lim meresmikan sarana pojok baca interaktif yang dilengkapi tablet literasi digital dan ribuan buku ensiklopedia anak islami. Siswa-siswi sangat antusias mengikuti tantangan membaca 15 menit sebelum masuk kelas.',
    tgl_publish: '2026-09-05T02:10:52.000000Z',
    kategori: 'Kegiatan',
    gambar_thumbnail_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC9EaAXAgEgRHM7I0pOWNBY6650nNwDDvTv62FssczfGeNyObgQNSArCMN-AUhHSdWFxCnizXwyTGX5lRiYt02GPMnib8u1F_FqoNu-nmblRVuWaPa9URy6ZlAb9xZlu8dQbBfnB96tKFk9AyQJ8q7r17dFv3UQYhXVsonbDkmpNsbw3kE-P6ttsMsY29kKxO9UQcL2nWCrO-Q9awGwckooa8JaXMFvXWItaXp11WvVF2XyI1gKHwRUIw',
  },
  {
    id_berita: 1,
    judul: 'Peringatan Maulid Nabi Muhammad SAW di MI Roudotutta\'lim Penuh Khidmat',
    slug: 'peringatan-maulid-nabi-muhammad-saw-mi-roudotuttalim',
    isi_konten:
      'Keluarga besar MI Roudotutta\'lim menyelenggarakan peringatan Maulid Nabi Muhammad SAW 1447 H. Acara diisi dengan penampilan shalawat hadrah para siswa, pembacaan qasidah Diba\', santunan kepada anak yatim, serta tausiyah agama mengenai keteladanan budi pekerti Rasulullah.',
    tgl_publish: '2026-08-31T02:10:52.000000Z',
    kategori: 'Pengumuman',
    gambar_thumbnail_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA4VzSQGE_4bhbB4HxhFFqinNv4XO2ztu1Eru2hmwmuM2FRomloF6SuwQRiDwVtK50-tSyiBBviEBTRC0OKVvUyXwubH0o7W6up_-wipTHRa9Qun9XRXKajwdycYDsM7g_8zynYW-1FniiTTjxJ1PVtGi-uJ9bCeuIYiwhaGnRzDao2mzUFay1whz_bj3rq-S_NJ1SUKBvl_db8gOe3gE9eLP96ywP5CmphcPKiVekXvgUCgZzYyvTFMg',
  },
]

export default function Berita() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')

  const controlsRef = useScrollReveal()
  const spotlightRef = useScrollReveal()
  const newsGridRef = useStaggerReveal({ staggerMs: 80 })
  const ctaRef = useScrollReveal()

  const fetchNews = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/berita')
      if (res.data?.success && res.data.data) {
        const list = res.data.data.data || res.data.data
        setNews(list && list.length > 0 ? list : fallbackNews)
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
    let isMounted = true
    axios
      .get('http://127.0.0.1:8000/api/berita')
      .then((res) => {
        if (isMounted) {
          if (res.data?.success && res.data.data) {
            const list = res.data.data.data || res.data.data
            setNews(list && list.length > 0 ? list : fallbackNews)
          } else {
            setNews(fallbackNews)
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn('API /api/berita unreachable, using fallback:', err)
          setNews(fallbackNews)
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const categories = ['Semua', 'Prestasi', 'Kegiatan', 'Pengumuman']

  // Filtered news based on search and category
  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesSearch =
        item.judul?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.isi_konten?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCat =
        selectedCategory === 'Semua' || (item.kategori || 'Kegiatan') === selectedCategory
      return matchesSearch && matchesCat
    })
  }, [news, searchQuery, selectedCategory])

  // Count per category
  const categoryCounts = useMemo(() => {
    const counts = { Semua: news.length, Prestasi: 0, Kegiatan: 0, Pengumuman: 0 }
    news.forEach((item) => {
      const cat = item.kategori || 'Kegiatan'
      if (counts[cat] !== undefined) counts[cat]++
      else counts[cat] = 1
    })
    return counts
  }, [news])

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Warta Terbaru'
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

  const getEstimatedReadTime = (text = '') => {
    const words = text.trim().split(/\s+/).length
    const mins = Math.max(1, Math.ceil(words / 40))
    return `${mins} menit baca`
  }

  const getCategoryBadgeStyle = (category = '') => {
    switch (category) {
      case 'Prestasi':
        return 'bg-amber-400 text-slate-950 font-bold'
      case 'Pengumuman':
        return 'bg-sky-600 text-white font-semibold'
      case 'Kegiatan':
      default:
        return 'bg-emerald-600 text-white font-semibold'
    }
  }

  // Feature spotlight article (first item if no search active)
  const isDefaultView = searchQuery.trim() === '' && selectedCategory === 'Semua'
  const spotlightArticle = isDefaultView && filteredNews.length > 0 ? filteredNews[0] : null
  const gridArticles = spotlightArticle ? filteredNews.slice(1) : filteredNews

  return (
    <div className="w-full bg-[#fbfbfa] pt-24 pb-20">
      {/* Header Banner with Rich Full-Bleed Photo */}
      <section className="relative text-white py-18 sm:py-24 lg:py-28 overflow-hidden bg-emerald-deep shadow-md">
        <div className="absolute inset-0 z-0">
          <img
            src={beritaHeaderImg}
            alt="Warta & Informasi Madrasah MI Roudotutta'lim"
            className="w-full h-full object-cover object-center filter brightness-90 transform scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-emerald-deep/90 to-emerald-deep/80" />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D9A62B_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin relative z-10">
          <div className="max-w-3xl animate-slide-up">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gold/20 text-gold-soft border border-gold/30 mb-4 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              Pusat Informasi &amp; Kabar Madrasah
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-tight drop-shadow-sm">
              Warta &amp; Kabar Terkini Madrasah
            </h1>
            <p className="mt-4 text-base sm:text-lg text-emerald-50/90 font-body leading-relaxed max-w-2xl">
              Menyajikan kabar terkini mengenai prestasi santri, agenda kegiatan belajar mengajar, pengumuman resmi, dan kehangatan keluarga besar MI Roudotutta'lim.
            </p>

            {/* Quick Metrics Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15 flex items-center gap-2">
                <span className="material-symbols-outlined text-gold text-[20px]">newspaper</span>
                <span className="text-xs sm:text-sm font-medium text-white">
                  <strong>{news.length}</strong> Artikel Terbit
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15 flex items-center gap-2">
                <span className="material-symbols-outlined text-gold text-[20px]">emoji_events</span>
                <span className="text-xs sm:text-sm font-medium text-white">
                  Prestasi &amp; Prestasi Lomba
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15 flex items-center gap-2">
                <span className="material-symbols-outlined text-gold text-[20px]">verified</span>
                <span className="text-xs sm:text-sm font-medium text-white">
                  Informasi Resmi Terverifikasi
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin mt-12 space-y-12">
        {/* Controls: Search & Category Filter */}
        <div
          ref={controlsRef}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4"
        >
          {/* Categories Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const count = categoryCounts[cat] || 0
              const isActive = selectedCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul atau topik warta..."
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50/50 text-sm text-slate-800 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-leaf/30 focus:border-emerald-leaf outline-none transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-sm p-1"
                aria-label="Hapus kata kunci"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-rose-600 text-[20px]">info</span>
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={fetchNews}
              className="px-3 py-1 bg-white border border-rose-300 rounded-lg text-rose-700 font-semibold hover:bg-rose-100 text-xs shrink-0 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Loading State: Skeleton Loaders */}
        {loading && (
          <div className="space-y-8">
            <div className="w-full h-80 bg-slate-200 rounded-2xl animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 animate-pulse"
                >
                  <div className="w-full h-48 bg-slate-200 rounded-xl" />
                  <div className="w-24 h-4 bg-slate-200 rounded" />
                  <div className="w-full h-6 bg-slate-200 rounded" />
                  <div className="w-4/5 h-4 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredNews.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-emerald-deep/10 text-emerald-deep flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[32px]">newspaper</span>
            </div>
            <h3 className="font-serif font-bold text-xl text-slate-800">
              Tidak Ada Warta Ditemukan
            </h3>
            <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
              Tidak ada artikel yang cocok dengan kata kunci &quot;{searchQuery}&quot; pada kategori{' '}
              <strong>{selectedCategory}</strong>.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('Semua')
              }}
              className="mt-5 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors active:scale-[0.98]"
            >
              Reset Filter &amp; Pencarian
            </button>
          </div>
        )}

        {/* SPOTLIGHT FEATURED ARTICLE (Headline Utama) */}
        {!loading && spotlightArticle && (
          <section ref={spotlightRef} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-leaf animate-pulse" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-deep">
                  Berita Utama Pilihan
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-medium">Terbit Terkini</span>
            </div>

            <article className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 group">
              {/* Photo Area */}
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[280px] lg:min-h-[380px] overflow-hidden bg-slate-900">
                <img
                  src={
                    spotlightArticle.gambar_thumbnail_url ||
                    spotlightArticle.gambar_thumbnail ||
                    fallbackNewsImg
                  }
                  alt={spotlightArticle.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = fallbackNewsImg
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-amber-400 text-slate-950 shadow-sm">
                    BERITA UTAMA
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs tracking-wide uppercase shadow-sm ${getCategoryBadgeStyle(
                      spotlightArticle.kategori
                    )}`}
                  >
                    {spotlightArticle.kategori || 'Kegiatan'}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="lg:col-span-5 p-7 sm:p-9 lg:p-10 flex flex-col justify-between">
                <div>
                  {/* Meta date & read time */}
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-emerald-leaf">
                        calendar_today
                      </span>
                      <span>{formatDate(spotlightArticle.tgl_publish)}</span>
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-slate-400">
                        schedule
                      </span>
                      <span>{getEstimatedReadTime(spotlightArticle.isi_konten)}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 group-hover:text-emerald-deep transition-colors leading-snug">
                    <Link to={`/berita/${spotlightArticle.slug}`}>
                      {spotlightArticle.judul}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="font-sans text-sm sm:text-[0.95rem] text-slate-600 mt-4 leading-relaxed line-clamp-4">
                    {spotlightArticle.isi_konten}
                  </p>
                </div>

                {/* Read Button */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/berita/${spotlightArticle.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-deep text-white font-semibold text-xs sm:text-sm hover:bg-emerald-leaf transition-colors active:scale-[0.98] shadow-sm"
                  >
                    <span>Baca Berita Lengkap</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    MI Roudotutta'lim
                  </span>
                </div>
              </div>
            </article>
          </section>
        )}

        {/* ALL / REMAINING NEWS GRID */}
        {!loading && gridArticles.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">
                {isDefaultView ? 'Warta & Artikel Lainnya' : `Hasil Warta (${filteredNews.length})`}
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {gridArticles.length} warta ditampilkan
              </span>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
              ref={newsGridRef}
            >
              {gridArticles.map((item, idx) => (
                <article
                  key={item.id_berita || idx}
                  className="reveal-child bg-white rounded-2xl border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-emerald-leaf/40 hover:-translate-y-1.5 transition-all duration-300 group"
                >
                  <div>
                    {/* Photo Thumbnail */}
                    <div className="w-full aspect-[16/10] relative overflow-hidden bg-slate-900">
                      <img
                        src={item.gambar_thumbnail_url || item.gambar_thumbnail || fallbackNewsImg}
                        alt={item.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = fallbackNewsImg
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                      {/* Floating Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2.5 py-1 rounded-md text-[11px] uppercase tracking-wide shadow-xs ${getCategoryBadgeStyle(
                            item.kategori
                          )}`}
                        >
                          {item.kategori || 'Kegiatan'}
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-5 sm:p-6">
                      {/* Date & Read time */}
                      <div className="flex items-center gap-2.5 text-xs text-slate-400 mb-2.5">
                        <span className="inline-flex items-center gap-1 text-slate-500">
                          <span className="material-symbols-outlined text-[15px] text-emerald-leaf">
                            calendar_today
                          </span>
                          <span>{formatDate(item.tgl_publish)}</span>
                        </span>
                        <span>•</span>
                        <span>{getEstimatedReadTime(item.isi_konten)}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 group-hover:text-emerald-deep transition-colors line-clamp-2 leading-snug">
                        <Link to={`/berita/${item.slug}`}>{item.judul}</Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="font-sans text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                        {item.isi_konten}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Link */}
                  <div className="px-5 sm:px-6 pb-5 pt-0">
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-leaf group-hover:text-emerald-deep transition-colors">
                      <Link
                        to={`/berita/${item.slug}`}
                        className="inline-flex items-center gap-1.5 group-hover:underline"
                      >
                        <span>Baca Selengkapnya</span>
                        <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                          arrow_forward
                        </span>
                      </Link>
                      <span className="text-[11px] text-slate-400 font-normal">Kabar Madrasah</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* CTA Banner: Kirim Warta / Humas */}
        <section
          ref={ctaRef}
          className="relative overflow-hidden bg-emerald-deep rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 mt-16"
        >
          <div className="max-w-xl">
            <span className="text-gold text-xs font-bold uppercase tracking-wider">
              Publikasi &amp; Kemitraan
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-2">
              Punya Kabar Prestasi atau Agenda Madrasah?
            </h3>
            <p className="text-sm text-emerald-100/90 mt-2 leading-relaxed">
              Wali murid dan civitas madrasah dapat berbagi dokumentasi kegiatan santri untuk dipublikasikan pada portal warta resmi MI Roudotutta'lim.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/kontak"
              className="px-6 py-3 rounded-full bg-gold text-ink font-semibold text-sm hover:bg-gold-soft transition-colors shadow-sm active:scale-[0.98]"
            >
              Hubungi Tim Humas
            </Link>
            <Link
              to="/"
              className="px-5 py-3 rounded-full border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
