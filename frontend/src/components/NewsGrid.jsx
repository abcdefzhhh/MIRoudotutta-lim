
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const fallbackNews = [
  {
    id_berita: 6,
    slug: 'memenangkan-porseni',
    tgl_publish: '2026-09-23',
    judul: 'MEMENANGKAN PORSENI',
    isi_konten: 'siswa mi memenangkan porseni',
    gambar_thumbnail_url: 'http://127.0.0.1:8000/uploads/berita/berita_1790127477_isKB2C.png',
    gambar_thumbnail: 'uploads/berita/berita_1790127477_isKB2C.png',
  },
  {
    id_berita: 3,
    slug: 'siswa-mi-roudotuttalim-sabet-medali-emas-lomba-tahfidz-kaligrafi',
    tgl_publish: '2026-09-08',
    judul: 'Siswa MI Roudotutta\'lim Sabet Medali Emas Lomba Tahfidz dan Kaligrafi Tingkat Kecamatan',
    isi_konten: 'Prestasi membanggakan kembali ditorehkan oleh santri MI Roudotutta\'lim dalam ajang Festival Seni & Olahraga Madrasah (AKSIOMA). Muhammad Al-Fatih dan Aisyah Humaira sukses meraih Juara 1.',
    gambar_thumbnail_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBePtJMaCotwUdo_WVJlOrgnrXRzFsC9mCFuCnJrbbzK08aZUjZ_F5K_BmIDAZKIFMKDQhJmVn3C8SiPobA44tHCsNDPD52AKiuutsgnrgBHo5gVVnFsZlFOVd11qSda7EjMzirIGi92dBE9dPD24vhJQ30BbUBeh91fZpeWcRJ_8Kqymu0Awmfth_MEAkC_xsX6vOBjSfYy1LUSYwIfY4FDLtuISJggPnPsMGAxDTLLiIJV1Fe9PslNA',
    gambar_thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBePtJMaCotwUdo_WVJlOrgnrXRzFsC9mCFuCnJrbbzK08aZUjZ_F5K_BmIDAZKIFMKDQhJmVn3C8SiPobA44tHCsNDPD52AKiuutsgnrgBHo5gVVnFsZlFOVd11qSda7EjMzirIGi92dBE9dPD24vhJQ30BbUBeh91fZpeWcRJ_8Kqymu0Awmfth_MEAkC_xsX6vOBjSfYy1LUSYwIfY4FDLtuISJggPnPsMGAxDTLLiIJV1Fe9PslNA',
  },
  {
    id_berita: 2,
    slug: 'semarak-gerakan-gemar-membaca-dan-pojok-baca-digital',
    tgl_publish: '2026-09-05',
    judul: 'Semarak Gerakan Gemar Membaca dan Pojok Baca Digital di Perpustakaan Madrasah',
    isi_konten: 'Perpustakaan SIPERPUS MI Roudotutta\'lim meresmikan sarana pojok baca interaktif yang dilengkapi tablet literasi digital dan ribuan buku ensiklopedia anak islami.',
    gambar_thumbnail_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9EaAXAgEgRHM7I0pOWNBY6650nNwDDvTv62FssczfGeNyObgQNSArCMN-AUhHSdWFxCnizXwyTGX5lRiYt02GPMnib8u1F_FqoNu-nmblRVuWaPa9URy6ZlAb9xZlu8dQbBfnB96tKFk9AyQJ8q7r17dFv3UQYhXVsonbDkmpNsbw3kE-P6ttsMsY29kKxO9UQcL2nWCrO-Q9awGwckooa8JaXMFvXWItaXp11WvVF2XyI1gKHwRUIw',
    gambar_thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC9EaAXAgEgRHM7I0pOWNBY6650nNwDDvTv62FssczfGeNyObgQNSArCMN-AUhHSdWFxCnizXwyTGX5lRiYt02GPMnib8u1F_FqoNu-nmblRVuWaPa9URy6ZlAb9xZlu8dQbBfnB96tKFk9AyQJ8q7r17dFv3UQYhXVsonbDkmpNsbw3kE-P6ttsMsY29kKxO9UQcL2nWCrO-Q9awGwckooa8JaXMFvXWItaXp11WvVF2XyI1gKHwRUIw',
  },
]

export default function NewsGrid() {
  const [news, setNews] = useState(fallbackNews)

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/berita')
        if (res.data && res.data.success && res.data.data?.data && res.data.data.data.length > 0) {
          setNews(res.data.data.data.slice(0, 3))
        }
      } catch (err) {
        // Fallback remains active
      }
    }
    fetchLatestNews()
  }, [])

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

  const getThumbnail = (item, idx) => {
    if (item.gambar_thumbnail_url) {
      return item.gambar_thumbnail_url
    }
    if (item.gambar_thumbnail) {
      if (item.gambar_thumbnail.startsWith('http')) {
        return item.gambar_thumbnail
      }
      return `http://127.0.0.1:8000/${item.gambar_thumbnail.replace(/^\//, '')}`
    }
    const fallbacks = [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBePtJMaCotwUdo_WVJlOrgnrXRzFsC9mCFuCnJrbbzK08aZUjZ_F5K_BmIDAZKIFMKDQhJmVn3C8SiPobA44tHCsNDPD52AKiuutsgnrgBHo5gVVnFsZlFOVd11qSda7EjMzirIGi92dBE9dPD24vhJQ30BbUBeh91fZpeWcRJ_8Kqymu0Awmfth_MEAkC_xsX6vOBjSfYy1LUSYwIfY4FDLtuISJggPnPsMGAxDTLLiIJV1Fe9PslNA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC9EaAXAgEgRHM7I0pOWNBY6650nNwDDvTv62FssczfGeNyObgQNSArCMN-AUhHSdWFxCnizXwyTGX5lRiYt02GPMnib8u1F_FqoNu-nmblRVuWaPa9URy6ZlAb9xZlu8dQbBfnB96tKFk9AyQJ8q7r17dFv3UQYhXVsonbDkmpNsbw3kE-P6ttsMsY29kKxO9UQcL2nWCrO-Q9awGwckooa8JaXMFvXWItaXp11WvVF2XyI1gKHwRUIw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA4VzSQGE_4bhbB4HxhFFqinNv4XO2ztu1Eru2hmwmuM2FRomloF6SuwQRiDwVtK50-tSyiBBviEBTRC0OKVvUyXwubH0o7W6up_-wipTHRa9Qun9XRXKajwdycYDsM7g_8zynYW-1FniiTTjxJ1PVtGi-uJ9bCeuIYiwhaGnRzDao2mzUFay1whz_bj3rq-S_NJ1SUKBvl_db8gOe3gE9eLP96ywP5CmphcPKiVekXvgUCgZzYyvTFMg',
    ]
    return fallbacks[idx % fallbacks.length]
  }

  return (
    <section className="w-full py-space-xl bg-ivory" id="berita">
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <span className="font-label-md text-label-md text-emerald-leaf tracking-widest uppercase font-semibold">
              Kabar Madrasah
            </span>
            <h2 className="font-heading font-bold text-headline-lg text-emerald-deep mt-space-xs">
              Warta &amp; Prestasi Terkini
            </h2>
            <p className="font-body-md text-body-md text-ink-soft max-w-xl mt-space-xs">
              Mengabarkan dinamika kegiatan belajar, prestasi santri, dan kehangatan agenda keluarga besar MI Roudotutta'lim.
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-emerald-leaf hover:text-emerald-deep transition-colors font-semibold group"
            to="/berita"
          >
            <span>Lihat semua warta</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* News 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {news.map((item, idx) => (
            <article
              key={item.id_berita || idx}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-leaf/40 transform hover:-translate-y-1.5 transition-all duration-300 flex flex-col border border-border/60 animate-fade-in"
              style={{ animationDelay: `${idx * 120}ms` }}
            >
              <div className="relative w-full h-52 overflow-hidden bg-slate-100">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={item.judul}
                  src={getThumbnail(item, idx)}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBePtJMaCotwUdo_WVJlOrgnrXRzFsC9mCFuCnJrbbzK08aZUjZ_F5K_BmIDAZKIFMKDQhJmVn3C8SiPobA44tHCsNDPD52AKiuutsgnrgBHo5gVVnFsZlFOVd11qSda7EjMzirIGi92dBE9dPD24vhJQ30BbUBeh91fZpeWcRJ_8Kqymu0Awmfth_MEAkC_xsX6vOBjSfYy1LUSYwIfY4FDLtuISJggPnPsMGAxDTLLiIJV1Fe9PslNA'
                  }}
                  loading="lazy"
                />
              </div>
              <div className="p-space-lg flex flex-col flex-grow justify-between gap-space-md">
                <div>
                  <div className="flex items-center gap-space-xs text-ink-soft font-label-md text-label-md mb-2">
                    <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                    <span>{formatDate(item.tgl_publish)}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-headline-sm text-emerald-deep group-hover:text-emerald-leaf transition-colors line-clamp-2">
                    <Link to={`/berita/${item.slug || item.id_berita}`}>
                      {item.judul}
                    </Link>
                  </h3>
                  <p className="font-body-sm text-body-sm text-ink-soft mt-2 line-clamp-3 leading-relaxed">
                    {item.isi_konten}
                  </p>
                </div>
                <Link
                  className="inline-flex items-center gap-1 font-label-lg text-label-lg text-emerald-leaf group-hover:text-emerald-deep transition-colors font-semibold"
                  to={`/berita/${item.slug || item.id_berita}`}
                >
                  <span>Baca artikel</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    chevron_right
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
