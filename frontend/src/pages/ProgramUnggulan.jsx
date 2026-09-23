import { Link } from 'react-router-dom'
import programUnggulanBg from '../assets/programunggulan.jpg'
import useScrollReveal, { useStaggerReveal } from '../hooks/useScrollReveal'

export default function ProgramUnggulan() {
  const gridRef = useStaggerReveal({ staggerMs: 120 })
  const valuesRef = useScrollReveal()
  const valuesGridRef = useStaggerReveal({ staggerMs: 120 })
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

  const programs = [
    {
      id: 'tahfidz',
      title: 'Tahfidz & Tahsin Qur\'an Terpadu',
      subtitle: 'Target Minimal 1 - 3 Juz dengan Makhraj & Tajwid Bersanad',
      category: 'Keagamaan Utama',
      icon: 'menu_book',
      badgeColor: 'bg-gold text-ink font-semibold',
      desc: 'Program harian pembinaan tilawah dan hafalan Al-Qur\'an dengan metode talaqqi dan tartil terstandarisasi. Dilengkapi buku mutaba\'ah harian untuk memantau perkembangan hafalan ananda di madrasah dan rumah.',
      features: [
        'Halaqah pagi 30 menit sebelum memulai KBM inti',
        'Bimbingan tajwid fashahah dan makharijul huruf',
        'Ujian kenaikan juz (tasmi\') sekali duduk di hadapan dewan asatidz',
        'Wisuda Tahfidz (Khotmil Qur\'an) tahunan dan sertifikat capaian hafalan',
      ],
      target: 'Lulusan hafal minimal Juz 30 (plus Juz 29 & surat pilihan bagi kelas akselerasi).',
    },
    {
      id: 'akhlak',
      title: 'Pembiasaan Adab & Akhlakul Karimah',
      subtitle: 'Menanamkan Nilai Islam dalam Perilaku Sehari-hari',
      category: 'Karakter & Spiritual',
      icon: 'verified_user',
      badgeColor: 'bg-emerald-deep text-white',
      desc: 'Pendidikan karakter yang tidak hanya diajarkan secara teoritis, melainkan dibiasakan secara nyata melalui rutinitas harian di madrasah berlandaskan akhlak Ahlussunnah wal Jama\'ah.',
      features: [
        'Sholat Dhuha bersama dan Sholat Dzuhur berjamaah setiap hari',
        'Budaya 5S: Senyum, Salam, Sapa, Sopan, dan Santun',
        'Makan dan minum dengan adab sunnah (duduk, tangan kanan, membaca doa)',
        'Tadabbur kisah keteladanan Nabi dan para sahabat setiap pekan',
      ],
      target: 'Melahirkan Siswa yang berbakti pada orang tua, jujur, santun, dan mandiri.',
    },
    {
      id: 'bilingual',
      title: 'Bahasa Arab & Inggris Praktis (Bilingual Habit)',
      subtitle: 'Komunikasi Dwibahasa Sehari-hari yang Ramah & Menyenangkan',
      category: 'Bahasa & Wawasan Global',
      icon: 'translate',
      badgeColor: 'bg-emerald-leaf text-white',
      desc: 'Membekali Siswa keberanian dan kecakapan berkomunikasi dalam bahasa Arab (bahasa Al-Qur\'an) dan bahasa Inggris melalui pendekatan interaktif, percakapan tematik, dan kosa kata harian.',
      features: [
        'Yaumul Lughah (Hari Berbahasa) bertahap setiap pekan',
        'Mufradat & Vocabulary harian terintegrasi dengan aktivitas kelas',
        'Muhadhoroh (latihan pidato dan kultum dwibahasa) Siswa',
        'Lomba bercerita islami (Storytelling) dan pidato bahasa Arab/Inggris',
      ],
      target: 'Siswa percaya diri melafalkan kosa kata dan percakapan dasar sehari-hari.',
    },
    {
      id: 'sains-numerasi',
      title: 'Sains Terapan & Literasi Numerasi',
      subtitle: 'Mengasah Nalar Kritis Melalui Eksperimen Nyata',
      category: 'Akademik & Nalar Ilmiah',
      icon: 'science',
      badgeColor: 'bg-emerald-leaf-soft text-white',
      desc: 'Pembelajaran sains dan matematika berbasis pemecahan masalah dan eksperimen visual. Menumbuhkan rasa takjub Siswa terhadap keteraturan alam semesta sebagai bukti kebesaran Allah SWT.',
      features: [
        'Laboratorium alam mini dan sudut observasi sains madrasah',
        'Matematika kontekstual berbasis studi kasus kehidupan nyata',
        'Eksperimen sains sederhana tiap bab tematik',
        'Bimbingan olimpiade sains dan matematika madrasah (KSM)',
      ],
      target: 'Siswa gemar berfikir logis, analitis, dan memiliki fondasi numerasi yang kokoh.',
    },
    {
      id: 'ekskul',
      title: 'Pengembangan Minat, Bakat & Kepanduan',
      subtitle: 'Wadah Potensi Seni, Kebugaran Jasmani & Kepemimpinan',
      category: 'Pengembangan Diri',
      icon: 'sports_soccer',
      badgeColor: 'bg-gold text-ink font-semibold',
      desc: 'Kegiatan ko-kurikuler terarah yang memberi ruang bagi setiap Siswa untuk menemukan potensi terpendamnya dalam bidang seni islami, kepanduan, dan olahraga.',
      features: [
        'Pramuka Siaga & Penggalang dengan penanaman kemandirian',
        'Seni Hadrah/Rebana dan Seni Kaligrafi Islam (Khat)',
        'Klub Futsal & pembinaan kebugaran jasmani teratur',
        'Pentas Seni & Kreasi Siswa pada peringatan hari besar',
      ],
      target: 'Siswa sehat jasmani, memiliki mental percaya diri, dan berjiwa kepemimpinan.',
    },
    {
      id: 'sosial-lingkungan',
      title: 'Kepedulian Sosial & Madrasah Ramah Lingkungan',
      subtitle: 'Menumbuhkan Empati dan Tanggung Jawab Ekologis',
      category: 'Sosial & Ekologi',
      icon: 'eco',
      badgeColor: 'bg-emerald-deep text-white',
      desc: 'Mengajarkan Siswa pentingnya bersedekah, empati terhadap sesama yang membutuhkan, serta menjaga kelestarian lingkungan sekolah yang hijau, bersih, dan bebas sampah plastik.',
      features: [
        'Gerakan Infaq Jumat Berkah untuk santunan yatim dan dhuafa',
        'Program Adiwiyata: pilah sampah dan pemanfaatan daur ulang organik',
        'Aksi penanaman pohon hias dan kebun edukasi Siswa',
        'Kantin sehat madrasah yang higienis dan bersertifikat halal',
      ],
      target: 'Siswa memiliki kepekaan sosial tinggi dan kepedulian menjaga keasrian lingkungan.',
    },
  ]

  return (
    <div className="w-full bg-ivory pt-24 pb-20">
      {/* Header Banner with programunggulan.jpg Background (Hanya di Judul) */}
      <section className="relative text-white py-18 sm:py-24 lg:py-28 overflow-hidden bg-emerald-deep shadow-md">
        {/* Full-bleed Photo Background Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={programUnggulanBg}
            alt="Program Unggulan MI Roudotutta'lim"
            className="w-full h-full object-cover object-center filter brightness-90 transform scale-105 transition-transform duration-1000"
          />
          {/* Multi-layered dark gradient overlay for optimal readability & Islamic emerald aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-emerald-deep/90 to-emerald-deep/80"></div>
          <div className="absolute inset-0 bg-black/25"></div>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D9A62B_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin relative z-10">
          <div className="max-w-3xl animate-slide-up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-tight drop-shadow-sm">
              Program Unggulan Madrasah
            </h1>
            <p className="mt-4 text-base sm:text-lg text-emerald-50/90 font-body leading-relaxed max-w-2xl">
              Enam pilar kurikulum terpadu yang dirancang menyeluruh untuk mendidik intelektual, memperkokoh aqidah, dan membentuk kehalusan budi pekerti setiap Siswa.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin mt-12 space-y-16">
        {/* Detailed Program Cards Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8" ref={gridRef}>
          {programs.map((item, idx) => (
            <div
              key={item.id}
              className="reveal-child bg-white rounded-2xl border border-border p-8 hover:shadow-xl hover:border-emerald-leaf/40 transform hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-deep/10 text-emerald-deep flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[28px]">{item.icon}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${item.badgeColor}`}>
                    {item.category}
                  </span>
                </div>

                <h2 className="font-heading font-bold text-xl text-ink">
                  {item.title}
                </h2>
                <p className="text-xs font-semibold text-emerald-leaf uppercase tracking-wider mt-1 mb-3">
                  {item.subtitle}
                </p>
                <p className="text-sm text-ink-soft leading-relaxed mb-6 font-body">
                  {item.desc}
                </p>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-deep block">
                    Poin Utama Kegiatan:
                  </span>
                  {item.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-soft">
                      <span className="material-symbols-outlined text-emerald-leaf text-[18px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* SECTION: 5 NILAI LUHUR BUDAYA MADRASAH */}
        <section id="nilai-kami" className="scroll-mt-24 space-y-8" ref={valuesRef}>
          {/* Header Section */}
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-leaf">
              Fondasi Karakter &amp; Adab
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-emerald-deep mt-1">
              5 Nilai Luhur Budaya Madrasah
            </h2>
            <p className="text-xs sm:text-sm text-ink-soft mt-1 leading-relaxed">
              Program unggulan akademik madrasah bersandar kokoh pada lima pilar nilai budaya islami yang dibiasakan dalam keseharian setiap Siswa.
            </p>
          </div>

          {/* 5 Values Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={valuesGridRef}>
            {values.map((v, vIdx) => (
              <div
                key={v.num}
                className={`reveal-child bg-white rounded-2xl border border-border p-6 shadow-xs flex flex-col justify-between hover:shadow-lg hover:border-emerald-leaf/40 hover:-translate-y-1.5 transition-all duration-300 ${vIdx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-emerald-deep/10 text-emerald-deep flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]">{v.icon}</span>
                    </div>
                    <span className="font-heading text-2xl font-bold text-border">
                      {v.num}
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-heading font-bold text-xl text-ink">
                        {v.title}
                      </h3>
                      <span className="text-xs font-semibold text-emerald-leaf">
                        ({v.latin})
                      </span>
                    </div>
                    <p className="text-xs text-ink-soft font-medium mt-0.5">
                      {v.tagline}
                    </p>
                  </div>

                  {/* Ayat / Hadits Box */}
                  <div className="bg-ivory-2 rounded-xl p-3.5 border border-border/70 mb-4">
                    <p className="text-right font-serif text-sm font-semibold text-emerald-deep leading-relaxed mb-1.5">
                      {v.arabic}
                    </p>
                    <p className="text-[11px] text-ink-soft italic leading-relaxed">
                      {v.meaning}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-ink-soft leading-relaxed mb-4">
                    {v.desc}
                  </p>

                  <div className="space-y-1.5 border-t border-border/50 pt-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-deep block">
                      Wujud Pembiasaan di Madrasah:
                    </span>
                    {v.practices.map((pr, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-ink-soft">
                        <span className="material-symbols-outlined text-emerald-leaf text-[15px] shrink-0 mt-0.5">
                          check
                        </span>
                        <span>{pr}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-emerald-deep rounded-2xl text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm" ref={ctaRef}>
          <div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Siap Mendaftarkan Putra-Putri Anda?
            </h3>
            <p className="text-sm text-emerald-100/90 mt-1 max-w-xl">
              Kunjungi sekretariat madrasah kami untuk informasi dan penyerahan berkas penerimaan Siswa baru.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/ppdb"
              className="px-6 py-3 rounded-full bg-gold text-ink font-semibold text-sm hover:bg-gold-soft transition-colors shadow-sm active:scale-[0.98]"
            >
              Informasi &amp; Persyaratan PPDB
            </Link>
            <Link
              to="/visi-misi"
              className="px-5 py-3 rounded-full border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors"
            >
              Lihat Visi &amp; Misi
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
