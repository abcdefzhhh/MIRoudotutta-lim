import { Link } from 'react-router-dom'
import useScrollReveal, { useStaggerReveal } from '../hooks/useScrollReveal'

export default function VisiMisi() {
  const misiList = [
    {
      num: '01',
      title: 'Pendidikan Aqidah & Akhlakul Karimah',
      desc: 'Menyelenggarakan pendidikan karakter berlandaskan aqidah yang lurus, adab islami sehari-hari, dan pembiasaan sholat berjamaah serta doa harian sejak dini.',
      icon: 'verified_user',
    },
    {
      num: '02',
      title: 'Tahfidz & Tartil Al-Qur\'an',
      desc: 'Membimbing ananda mencintai, membaca dengan makhraj dan tajwid yang benar (tahsin), serta menghafal Al-Qur\'an minimal Juz 30 dan surat-surat pilihan.',
      icon: 'menu_book',
    },
    {
      num: '03',
      title: 'Kurikulum Integratif & Berpusat Pada Anak',
      desc: 'Memadukan Kurikulum Nasional (Merdeka) dengan muatan keagamaan madrasah secara seimbang, bermakna, dan menyenangkan bagi tumbuh kembang Siswa.',
      icon: 'auto_stories',
    },
    {
      num: '04',
      title: 'Penguatan Literasi, Numerasi & Sains Terapan',
      desc: 'Membekali Siswa dengan nalar kritis, kemampuan berbahasa (Arab & Inggris), kecakapan numerasi, dan pemahaman sains melalui eksperimen langsung.',
      icon: 'science',
    },
    {
      num: '05',
      title: 'Lingkungan Madrasah yang Asri & Inklusif',
      desc: 'Mewujudkan ekosistem sekolah yang bersih, hijau, ramah anak, bebas perundungan, dan menumbuhkan rasa persaudaraan serta kepedulian sosial.',
      icon: 'diversity_3',
    },
  ]

  const tujuanList = [
    {
      label: 'Karakter & Spiritual',
      detail: 'Lulusan memiliki kebiasaan ibadah mandiri, berbakti kepada orang tua, dan bertutur kata santun.',
    },
    {
      label: 'Capaian Al-Qur\'an',
      detail: 'Minimal hafal Juz 30 dengan tartil yang terstandarisasi sebelum menyelesaikan jenjang madrasah.',
    },
    {
      label: 'Kesiapan Akademik',
      detail: 'Mampu melanjutkan ke jenjang MTs / SMP unggulan dengan fondasi nalar ilmiah dan bahasa yang kokoh.',
    },
    {
      label: 'Bakat & Kepemimpinan',
      detail: 'Memiliki kepercayaan diri mengekspresikan bakat seni, kepanduan pramuka, dan olahraga.',
    },
  ]

  const visiRef = useScrollReveal()
  const misiGridRef = useStaggerReveal({ staggerMs: 100 })
  const tujuanRef = useScrollReveal()
  const ctaRef = useScrollReveal()

  return (
    <div className="w-full bg-ivory pt-24 pb-20">
      {/* Breadcrumb & Header Banner */}
      <section className="bg-emerald-deep text-white py-14 relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D9A62B_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin relative z-10">
          <nav className="flex items-center gap-2 text-xs font-medium text-emerald-100/80 mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-emerald-200">Profil</span>
            <span>/</span>
            <span className="text-gold font-semibold">Visi &amp; Misi</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-tight">
              Visi, Misi &amp; Arah Pendidikan
            </h1>
            <p className="mt-4 text-base sm:text-lg text-emerald-50/90 font-body leading-relaxed max-w-2xl">
              Panduan fundamental MI Roudotutta'lim dalam menyemai generasi penerus yang beriman teguh, berilmu luas, dan berkepribadian luhur.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin mt-12 space-y-16">
        {/* VISI CARD */}
        <section className="bg-white rounded-2xl border border-border p-8 lg:p-12 shadow-sm relative overflow-hidden" ref={visiRef}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-leaf/5 rounded-bl-full pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between relative z-10">
            <div className="lg:w-1/3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-leaf mb-2">
                <span className="material-symbols-outlined text-[20px]">stars</span>
                Visi Utama
              </div>
              <h2 className="text-2xl lg:text-3xl font-heading font-bold text-emerald-deep tracking-tight">
                Cita-Cita Luhur MI Roudotutta'lim
              </h2>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                Visi ini menjadi kompas seluruh pendidik, tenaga kependidikan, Siswa, dan orang tua dalam setiap langkah pendidikan kami.
              </p>
            </div>

            <div className="lg:w-2/3 bg-ivory-2 p-6 lg:p-8 rounded-xl border border-border/80 relative">
              <span className="text-5xl text-gold/30 font-heading font-bold absolute -top-4 left-4 select-none">“</span>
              <p className="font-heading text-xl lg:text-2xl text-ink font-semibold italic leading-relaxed pt-2">
                Terwujudnya Generasi Muslim yang Bertaqwa, Berakhlakul Karimah, Unggul dalam Ilmu Pengetahuan, Berwawasan Lingkungan, dan Berlandaskan Al-Qur'an serta As-Sunnah.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Bertaqwa', 'Berakhlak Mulia', 'Unggul Sains & Adab', 'Qur\'ani', 'Ramah Lingkungan'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white border border-border text-xs font-medium text-emerald-deep"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MISI SECTION */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-leaf">Langkah Nyata Kami</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-emerald-deep mt-1">
              5 Misi Pokok Madrasah
            </h2>
            <p className="text-sm text-ink-soft mt-2">
              Strategi konkrit yang kami terapkan dalam kegiatan belajar mengajar dan pembiasaan Siswa sehari-hari.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={misiGridRef}>
            {misiList.map((misi) => (
              <div
                key={misi.num}
                className="reveal-child bg-white rounded-xl border border-border p-6 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-lg bg-emerald-deep/10 text-emerald-deep flex items-center justify-center group-hover:bg-emerald-deep group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[24px]">{misi.icon}</span>
                    </div>
                    <span className="font-heading text-2xl font-bold text-border group-hover:text-gold transition-colors">
                      {misi.num}
                    </span>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-ink mb-2">
                    {misi.title}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed font-body">
                    {misi.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Extra summary card */}
            <div className="reveal-child bg-gradient-to-br from-emerald-deep to-emerald-leaf rounded-xl p-6 text-white flex flex-col justify-between shadow-sm">
              <div>
                <span className="material-symbols-outlined text-[32px] text-gold mb-3">auto_awesome</span>
                <h3 className="text-lg font-heading font-bold text-white mb-2">
                  Komitmen Mutu &amp; Integritas
                </h3>
                <p className="text-xs text-emerald-50/90 leading-relaxed">
                  Kami meyakini bahwa pendidikan dasar adalah pondasi utama pembentukan jiwa. Setiap Siswa dididik dengan penuh ketulusan, kesabaran, dan keteladanan.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-xs">
                <span className="text-gold font-semibold">MI Roudotutta'lim</span>
                <span className="text-emerald-100">Sejak 2012</span>
              </div>
            </div>
          </div>
        </section>

        {/* TUJUAN SECTION */}
        <section className="bg-ivory-2 rounded-2xl border border-border/80 p-8 lg:p-10" ref={tujuanRef}>
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-leaf">Capaian &amp; Target</span>
            <h2 className="text-2xl font-heading font-bold text-emerald-deep mt-1">
              Tujuan Pendidikan Lulusan
            </h2>
            <p className="text-sm text-ink-soft mt-1">
              Standar kompetensi dan karakter yang dimiliki oleh setiap lulusan setelah menempuh pendidikan 6 tahun di MI Roudotutta'lim:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tujuanList.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-border flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-emerald-leaf/15 text-emerald-leaf flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">check</span>
                </div>
                <div>
                  <h4 className="text-base font-heading font-semibold text-emerald-deep">
                    {item.label}
                  </h4>
                  <p className="text-xs sm:text-sm text-ink-soft mt-1 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA TO PPDB / BERANDA */}
        <section className="bg-emerald-deep rounded-2xl text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm" ref={ctaRef}>
          <div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Tertarik Menjadi Bagian dari Madrasah Kami?
            </h3>
            <p className="text-sm text-emerald-100/90 mt-1 max-w-xl">
              Penerimaan Peserta Didik Baru (PPDB) telah dibuka. Daftarkan putra-putri Anda untuk masa depan berakhlak dan berilmu.
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
