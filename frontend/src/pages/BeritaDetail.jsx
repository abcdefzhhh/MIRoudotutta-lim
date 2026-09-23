import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const fallbackNewsImg =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBePtJMaCotwUdo_WVJlOrgnrXRzFsC9mCFuCnJrbbzK08aZUjZ_F5K_BmIDAZKIFMKDQhJmVn3C8SiPobA44tHCsNDPD52AKiuutsgnrgBHo5gVVnFsZlFOVd11qSda7EjMzirIGi92dBE9dPD24vhJQ30BbUBeh91fZpeWcRJ_8Kqymu0Awmfth_MEAkC_xsX6vOBjSfYy1LUSYwIfY4FDLtuISJggPnPsMGAxDTLLiIJV1Fe9PslNA'

export default function BeritaDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fallbackArticles = {
    'memenangkan-porseni': {
      id_berita: 6,
      judul: 'MEMENANGKAN PORSENI',
      slug: 'memenangkan-porseni',
      isi_konten: `Alhamdulillah, Siswa MI Roudotutta'lim sukses menorehkan prestasi gemilang dengan memenangkan berbagai cabang perlombaan pada ajang Pekan Olahraga dan Seni (PORSENI) tingkat madrasah.\n\nDalam ajang bergengsi yang mempertemukan berbagai perwakilan sekolah dan madrasah ini, Siswa-Siswa MI Roudotutta'lim menunjukkan performa luar biasa, sportivitas tinggi, serta kekompakan tim yang solid.\n\nKepala Madrasah dan seluruh dewan guru menyampaikan apresiasi setinggi-tingginya kepada para Siswa juara dan pembimbing yang telah berjuang mengharumkan nama madrasah tercinta. Semoga prestasi ini terus memotivasi ananda untuk berprestasi di tingkat yang lebih tinggi.`,
      tgl_publish: '2026-09-23T00:00:00.000000Z',
      gambar_thumbnail_url: 'http://127.0.0.1:8000/uploads/berita/berita_1790127477_isKB2C.png',
    },
    'siswa-mi-roudotuttalim-sabet-medali-emas-lomba-tahfidz-kaligrafi': {
      id_berita: 3,
      judul: 'Siswa MI Roudotutta\'lim Sabet Medali Emas Lomba Tahfidz dan Kaligrafi Tingkat Kecamatan',
      slug: 'siswa-mi-roudotuttalim-sabet-medali-emas-lomba-tahfidz-kaligrafi',
      isi_konten: `Prestasi membanggakan kembali ditorehkan oleh Siswa MI Roudotutta'lim dalam ajang Festival Seni & Olahraga Madrasah (AKSIOMA). Muhammad Al-Fatih dan Aisyah Humaira sukses meraih Juara 1 Cabang Tahfidz Juz 30 dan Cabang Seni Khat Kaligrafi Islam.\n\nDalam perlombaan yang diikuti oleh puluhan peserta dari berbagai madrasah se-kecamatan ini, ananda Muhammad Al-Fatih tampil sangat prima dalam melantunkan ayat-ayat suci Al-Qur'an dengan makhraj huruf yang fasih serta irama tartil yang merdu. Dewan juri mengapresiasi ketepatan tajwid dan kekuatan hafalan yang ditunjukkan.\n\nSementara itu pada cabang seni kaligrafi khat naskhi, Aisyah Humaira menunjukkan ketelatenan tinggi dalam menggoreskan pena kaligrafi. Karya yang dihasilkan dinilai memiliki proporsi kaidah huruf yang sangat presisi dan estetika tata letak yang bersih.\n\nKepala Madrasah, Ust. H. Ahmad Syafi'i, M.Pd.I, menyampaikan rasa syukur mendalam atas capaian gemilang ini. "Alhamdulillah, keberhasilan ini adalah buah dari ketekunan Siswa, keikhlasan bimbingan para asatidz, serta doa tulus dari para orang tua. Semoga prestasi ini menjadi pemicu semangat bagi seluruh Siswa untuk terus mencintai Al-Qur'an dan mengasah potensi terbaiknya," tutur beliau.`,
      tgl_publish: '2026-09-08T02:10:52.000000Z',
      gambar_thumbnail_url:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBePtJMaCotwUdo_WVJlOrgnrXRzFsC9mCFuCnJrbbzK08aZUjZ_F5K_BmIDAZKIFMKDQhJmVn3C8SiPobA44tHCsNDPD52AKiuutsgnrgBHo5gVVnFsZlFOVd11qSda7EjMzirIGi92dBE9dPD24vhJQ30BbUBeh91fZpeWcRJ_8Kqymu0Awmfth_MEAkC_xsX6vOBjSfYy1LUSYwIfY4FDLtuISJggPnPsMGAxDTLLiIJV1Fe9PslNA',
    },
    'semarak-gerakan-gemar-membaca-dan-pojok-baca-digital': {
      id_berita: 2,
      judul: 'Semarak Gerakan Gemar Membaca dan Pojok Baca Digital di Perpustakaan Madrasah',
      slug: 'semarak-gerakan-gemar-membaca-dan-pojok-baca-digital',
      isi_konten: `Perpustakaan SIPERPUS MI Roudotutta'lim meresmikan sarana pojok baca interaktif yang dilengkapi tablet literasi digital dan ribuan buku ensiklopedia anak islami. Siswa-siswi sangat antusias mengikuti tantangan membaca 15 menit sebelum masuk kelas.\n\nProgram ini diinisiasi untuk menumbuhkan rasa cinta literasi sejak usia dini di tengah gempuran distraksi gawai non-edukatif. Setiap kelas dijadwalkan secara bergiliran mengunjungi perpustakaan untuk membaca buku cerita bergambar tentang sirah nabawiyah, kisah para sahabat, dan ensiklopedia sains populer.\n\nPustakawan madrasah menyediakan kartu rekam baca bagi setiap Siswa. Siswa yang berhasil menyelesaikan bacaan terbanyak dan mampu menceritakan kembali intisari buku akan mendapatkan sertifikat penghargaan Duta Literasi Madrasah setiap bulannya.`,
      tgl_publish: '2026-09-05T02:10:52.000000Z',
      gambar_thumbnail_url:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC9EaAXAgEgRHM7I0pOWNBY6650nNwDDvTv62FssczfGeNyObgQNSArCMN-AUhHSdWFxCnizXwyTGX5lRiYt02GPMnib8u1F_FqoNu-nmblRVuWaPa9URy6ZlAb9xZlu8dQbBfnB96tKFk9AyQJ8q7r17dFv3UQYhXVsonbDkmpNsbw3kE-P6ttsMsY29kKxO9UQcL2nWCrO-Q9awGwckooa8JaXMFvXWItaXp11WvVF2XyI1gKHwRUIw',
    },
    'peringatan-maulid-nabi-muhammad-saw-mi-roudotuttalim': {
      id_berita: 1,
      judul: 'Peringatan Maulid Nabi Muhammad SAW di MI Roudotutta\'lim Penuh Khidmat',
      slug: 'peringatan-maulid-nabi-muhammad-saw-mi-roudotuttalim',
      isi_konten: `Keluarga besar MI Roudotutta'lim menyelenggarakan peringatan Maulid Nabi Muhammad SAW 1447 H. Acara diisi dengan penampilan shalawat banjari para siswa, pembacaan qasidah Diba', santunan kepada anak yatim, serta tausiyah agama oleh Pengasuh Madrasah mengenai keteladanan akhlak Rasulullah.\n\nSuasana aula madrasah dipenuhi rasa khusyuk dan kehangatan saat alunan sholawat dilantunkan bersama oleh para Siswa, dewan guru, dan pengurus komite madrasah. Melalui peringatan ini, Siswa diajak meneladani sifat-sifat mulia Rasulullah: Shiddiq, Amanah, Tabligh, dan Fathonah dalam kehidupan sehari-hari.\n\nSebagai wujud kepedulian sosial, panitia kegiatan juga menyalurkan santunan uang saku dan paket sembako kepada anak-anak yatim piatu dan warga dhuafa di lingkungan sekitar madrasah.`,
      tgl_publish: '2026-08-31T02:10:52.000000Z',
      gambar_thumbnail_url:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA4VzSQGE_4bhbB4HxhFFqinNv4XO2ztu1Eru2hmwmuM2FRomloF6SuwQRiDwVtK50-tSyiBBviEBTRC0OKVvUyXwubH0o7W6up_-wipTHRa9Qun9XRXKajwdycYDsM7g_8zynYW-1FniiTTjxJ1PVtGi-uJ9bCeuIYiwhaGnRzDao2mzUFay1whz_bj3rq-S_NJ1SUKBvl_db8gOe3gE9eLP96ywP5CmphcPKiVekXvgUCgZzYyvTFMg',
    },
  }

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/berita/${slug}`)
        if (res.data && res.data.success && res.data.data) {
          setArticle(res.data.data)
        } else if (fallbackArticles[slug]) {
          setArticle(fallbackArticles[slug])
        } else {
          setError('Artikel tidak ditemukan.')
        }
      } catch {
        if (fallbackArticles[slug]) {
          setArticle(fallbackArticles[slug])
        } else {
          setError('Gagal memuat artikel atau artikel tidak ditemukan.')
        }
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchArticle()
    }
  }, [slug])

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
      {/* Top Breadcrumb Header */}
      <section className="bg-emerald-deep text-white py-12 relative overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-margin-mobile lg:px-margin relative z-10">
          <nav className="flex items-center gap-2 text-xs font-medium text-emerald-100/80 mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Beranda</Link>
            <span>/</span>
            <Link to="/berita" className="hover:text-gold transition-colors">Warta &amp; Berita</Link>
            <span>/</span>
            <span className="text-gold font-semibold truncate max-w-[200px] sm:max-w-xs">
              {article ? article.judul : 'Detail Warta'}
            </span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1000px] mx-auto px-margin-mobile lg:px-margin -mt-6">
        {loading && (
          <div className="bg-white rounded-2xl border border-border p-8 lg:p-12 space-y-6 shadow-sm animate-pulse">
            <div className="w-32 h-5 bg-slate-200 rounded"></div>
            <div className="w-full h-10 bg-slate-200 rounded"></div>
            <div className="w-full h-64 bg-slate-200 rounded-xl"></div>
            <div className="space-y-3">
              <div className="w-full h-4 bg-slate-200 rounded"></div>
              <div className="w-full h-4 bg-slate-200 rounded"></div>
              <div className="w-3/4 h-4 bg-slate-200 rounded"></div>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="bg-white rounded-2xl border border-border p-12 text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[32px]">error</span>
            </div>
            <h2 className="text-xl font-heading font-bold text-ink mb-2">Artikel Tidak Ditemukan</h2>
            <p className="text-sm text-ink-soft mb-6">{error}</p>
            <Link
              to="/berita"
              className="px-5 py-2.5 rounded-xl bg-emerald-deep text-white text-sm font-semibold hover:bg-emerald-leaf transition-colors inline-block"
            >
              Kembali ke Daftar Berita
            </Link>
          </div>
        )}

        {!loading && article && (
          <article className="bg-white rounded-2xl border border-border p-8 lg:p-12 shadow-sm animate-fade-in">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-ink-soft mb-4">
              <span className="font-semibold text-emerald-deep uppercase tracking-wider text-xs">
                Warta Resmi
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-ink-soft">
                <span className="material-symbols-outlined text-[16px] text-emerald-leaf">
                  calendar_today
                </span>
                {formatDate(article.tgl_publish)}
              </span>
              <span>•</span>
              <span>Oleh: Humas Madrasah</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-emerald-deep leading-tight mb-8">
              {article.judul}
            </h1>

            {/* Featured Image Cover */}
            <div className="w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden mb-8 shadow-xs relative bg-slate-100 border border-slate-200">
              <img
                src={article.gambar_thumbnail_url || article.gambar_thumbnail || fallbackNewsImg}
                alt={article.judul}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = fallbackNewsImg
                }}
              />
            </div>

            {/* Body Text */}
            <div className="prose prose-emerald max-w-none text-ink-soft font-body leading-relaxed space-y-5 text-sm sm:text-base">
              {article.isi_konten.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Footer and back navigation */}
            <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                to="/berita"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-ink hover:text-emerald-deep hover:bg-ivory text-sm font-semibold transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <span>Kembali ke Semua Warta</span>
              </Link>

              <div className="flex items-center gap-2 text-xs text-ink-soft">
                <span>Bagikan berita ini:</span>
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: article.judul, url: window.location.href })
                    } else {
                      navigator.clipboard.writeText(window.location.href)
                      alert('Tautan berita berhasil disalin ke papan klip!')
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-ivory border border-border hover:bg-emerald-leaf/10 hover:text-emerald-deep transition-colors font-medium flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">share</span>
                  <span>Salin Tautan</span>
                </button>
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  )
}
