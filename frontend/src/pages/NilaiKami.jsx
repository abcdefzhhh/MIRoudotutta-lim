import { Link } from 'react-router-dom'
import nilaiKamiBg from '../assets/nilaikami.jpg'
import useScrollReveal, { useStaggerReveal } from '../hooks/useScrollReveal'

export default function NilaiKami() {
  const cardsRef = useStaggerReveal({ staggerMs: 150 })
  const ctaRef = useScrollReveal()

  const values = [
    {
      num: '01',
      title: 'Ikhlas',
      latin: 'Al-Ikhlas',
      tagline: 'Ketulusan Niat dalam Beribadah dan Menuntut Ilmu',
      arabic: 'وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ',
      meaning: '“Padahal mereka hanya diperintahkan menyembah Allah dengan ikhlas menaati-Nya semata-mata karena (menjalankan) agama...” (QS. Al-Bayyinah: 5)',
      desc: 'Mendidik Siswa untuk beramal, belajar, dan berbuat kebaikan semata-mata mengharap ridha Allah SWT, bukan demi pujian atau popularitas semu.',
      practices: [
        'Membiasakan niat belajar sebelum membuka buku',
        'Menolong teman tanpa pamrih atau imbalan',
        'Berbuat jujur dalam ujian meski tanpa pengawasan',
      ],
      icon: 'volunteer_activism',
    },
    {
      num: '02',
      title: 'Amanah',
      latin: 'Al-Amanah',
      tagline: 'Integritas, Kejujuran Moral, dan Tanggung Jawab Pribadi',
      arabic: 'إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا',
      meaning: '“Sungguh, Allah menyuruhmu menyampaikan amanat kepada yang berhak menerimanya...” (QS. An-Nisa: 58)',
      desc: 'Menanamkan rasa tanggung jawab atas setiap tugas, perkataan, dan barang titipan. Siswa dibimbing menjadi pribadi yang dapat dipercaya oleh keluarga dan masyarakat.',
      practices: [
        'Menjaga dan mengembalikan buku perpustakaan tepat waktu',
        'Menyelesaikan tugas sekolah dengan penuh tanggung jawab',
        'Menjaga rahasia dan amanah dari guru serta orang tua',
      ],
      icon: 'verified_user',
    },
    {
      num: '03',
      title: 'Berakhlak',
      latin: 'Al-Akhlaqul Karimah',
      tagline: 'Keluhuran Budi Pekerti, Sopan Santun, dan Adab Islami',
      arabic: 'إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ',
      meaning: '“Sesungguhnya aku diutus hanyalah untuk menyempurnakan kemuliaan akhlak.” (HR. Ahmad)',
      desc: 'Adab diletakkan mendahului ilmu. Siswa diajarkan memuliakan orang tua, menghormati guru, mengasihi yang lebih muda, dan menghargai teman sebaya.',
      practices: [
        'Mencium tangan guru dan orang tua dengan santun',
        'Menjaga lisan dari perkataan kotor dan ejekan',
        'Mendahulukan adab saat berbicara, makan, dan berjalan',
      ],
      icon: 'diversity_3',
    },
    {
      num: '04',
      title: 'Berilmu',
      latin: 'Al-\'Ilm',
      tagline: 'Kecakapan Nalar Kritis, Semangat Literasi, dan Sains',
      arabic: 'يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ',
      meaning: '“...Allah akan mengangkat (derajat) orang-orang yang beriman di antaramu dan orang-orang yang diberi ilmu beberapa derajat.” (QS. Al-Mujadilah: 11)',
      desc: 'Mendorong rasa ingin tahu ilmiah Siswa melalui pembelajaran aktif, nalar kritis, kecintaan membaca, dan pemahaman sains yang komprehensif.',
      practices: [
        'Rutin membaca 15 menit setiap pagi di pojok baca',
        'Aktif bertanya dan mengeksplorasi fenomena alam',
        'Menghubungkan sains dengan kebesaran ciptaan Allah',
      ],
      icon: 'auto_stories',
    },
    {
      num: '05',
      title: 'Kebersamaan',
      latin: 'Al-Ukhuwwah',
      tagline: 'Persaudaraan, Gotong Royong, dan Empati Sosial',
      arabic: 'إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ',
      meaning: '“Sesungguhnya orang-orang mukmin itu bersaudara...” (QS. Al-Hujurat: 10)',
      desc: 'Membangun suasana madrasah yang hangat, inklusif, dan saling menguatkan. Menolak segala bentuk diskriminasi dan perundungan (bullying).',
      practices: [
        'Berbagi bekal dan peduli kepada kawan yang membutuhkan',
        'Bekerjasama dalam piket kelas dan kegiatan pramuka',
        'Saling memaafkan jika terjadi perselisihan',
      ],
      icon: 'handshake',
    },
  ]

  return (
    <div className="w-full bg-ivory pt-24 pb-20">
      {/* Header Banner with nilaikami.jpg Background (Hanya di Judul) */}
      <section className="relative text-white py-18 sm:py-24 lg:py-28 overflow-hidden bg-emerald-deep shadow-md">
        {/* Full-bleed Photo Background Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={nilaiKamiBg}
            alt="Siswa Berakhlak Mulia MI Roudotutta'lim"
            className="w-full h-full object-cover object-center filter brightness-90 transform scale-105 transition-transform duration-1000"
          />
          {/* Multi-layered dark gradient overlay for optimal readability & Islamic emerald aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-emerald-deep/90 to-emerald-deep/80"></div>
          <div className="absolute inset-0 bg-black/25"></div>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D9A62B_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin relative z-10">
          <nav className="flex items-center gap-2 text-xs font-medium text-emerald-100/80 mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-gold font-semibold">Nilai Kami</span>
          </nav>

          <div className="max-w-3xl animate-slide-up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-tight drop-shadow-sm">
              5 Nilai Utama MI Roudotutta'lim
            </h1>
            <p className="mt-4 text-base sm:text-lg text-emerald-50/90 font-body leading-relaxed max-w-2xl">
              Lima pilar nilai yang dihidupkan setiap hari di ruang kelas, masjid madrasah, dan lapangan sekolah untuk membentuk kepribadian Siswa seutuhnya.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin mt-12 space-y-12">
        {/* Values Cards List */}
        <div className="space-y-8" ref={cardsRef}>
          {values.map((v) => (
            <div
              key={v.num}
              className="reveal-child bg-white rounded-2xl border border-border p-6 lg:p-10 shadow-xs hover:border-emerald-leaf/40 transition-colors"
            >
              <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
                {/* Left Header */}
                <div className="lg:w-2/5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-heading text-2xl font-bold text-emerald-leaf">
                      {v.num}
                    </span>
                    <div className="h-4 w-[1px] bg-border"></div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-ink-soft">
                      {v.latin}
                    </span>
                  </div>

                  <h2 className="text-2xl lg:text-3xl font-heading font-bold text-emerald-deep">
                    {v.title}
                  </h2>
                  <p className="text-sm font-semibold text-emerald-leaf mt-1 mb-3">
                    {v.tagline}
                  </p>
                  <p className="text-sm text-ink-soft leading-relaxed font-body">
                    {v.desc}
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-deep/10 text-emerald-deep flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]">{v.icon}</span>
                    </div>
                    <span className="text-xs font-semibold text-ink-soft">
                      Diterapkan dalam aktivitas harian
                    </span>
                  </div>
                </div>

                {/* Right Quran/Hadith and Practices */}
                <div className="lg:w-3/5 w-full bg-ivory-2 p-6 lg:p-7 rounded-xl border border-border/80 flex flex-col justify-between">
                  {/* Arabic Quote */}
                  <div className="mb-6 pb-6 border-b border-border/60">
                    <p className="text-right text-lg sm:text-xl font-heading font-semibold text-emerald-deep leading-loose" dir="rtl">
                      {v.arabic}
                    </p>
                    <p className="text-xs text-ink-soft italic mt-2 leading-relaxed">
                      {v.meaning}
                    </p>
                  </div>

                  {/* Concrete Daily Practices */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-deep block mb-2.5">
                      Penerapan Konkret di Madrasah:
                    </span>
                    <div className="space-y-2">
                      {v.practices.map((practice, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-soft">
                          <span className="material-symbols-outlined text-gold text-[18px] shrink-0 mt-0.5">
                            check_circle
                          </span>
                          <span>{practice}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <section className="bg-emerald-deep rounded-2xl text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm" ref={ctaRef}>
          <div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Tumbuh Bersama Ekosistem Positif Madrasah
            </h3>
            <p className="text-sm text-emerald-100/90 mt-1 max-w-xl">
              Kami menyambut ananda untuk bertumbuh dalam atmosfer pendidikan yang mengedepankan ketulusan akhlak dan kejayaan ilmu.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/#ppdb"
              className="px-6 py-3 rounded-full bg-gold text-ink font-semibold text-sm hover:bg-gold-soft transition-colors shadow-sm active:scale-[0.98]"
            >
              Daftar PPDB Online
            </Link>
            <Link
              to="/program"
              className="px-5 py-3 rounded-full border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors"
            >
              Lihat Program Unggulan
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
