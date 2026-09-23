import { Link } from 'react-router-dom'
import visiBg from '../assets/nilaikami.jpg'
import useScrollReveal, { useStaggerReveal } from '../hooks/useScrollReveal'

export default function VisiMisi() {
  const visiRef = useScrollReveal()
  const misiGridRef = useStaggerReveal({ staggerMs: 90 })
  const tujuanRef = useScrollReveal({ threshold: 0.08 })
  const ctaRef = useScrollReveal()

  const misiList = [
    {
      num: '01',
      title: 'Membina Kemandirian Belajar',
      desc: 'Membina kemandirian peserta didik melalui kegiatan pembelajaran yang aktif, kreatif, dan menyenangkan agar menjadi pembelajar sepanjang hayat.',
      icon: 'psychology',
    },
    {
      num: '02',
      title: 'Budaya Kalimat Thayyibah',
      desc: 'Memajang dan membiasakan pengucapan kalimat-kalimat thayyibah dalam tutur kata santri sehari-hari di lingkungan madrasah.',
      icon: 'record_voice_over',
    },
    {
      num: '03',
      title: 'Harmoni Interaksi Agama & Sosial',
      desc: 'Menciptakan suasana interaksi antarsiswa dan warga madrasah yang berlandaskan nilai-nilai luhur agama Islam dan etika sosial yang harmonis.',
      icon: 'diversity_3',
    },
    {
      num: '04',
      title: 'Pembiasaan Perilaku Terpuji',
      desc: 'Menjadikan kegiatan-kegiatan pembiasaan ibadah harian dan akhlakul karimah sebagai fondasi utama dalam pembentukan karakter santri.',
      icon: 'verified_user',
    },
  ]

  const tujuanList = [
    {
      label: 'Budaya Madrasah yang Religi',
      detail: 'Mengembangkan budaya madrasah yang bernuansa religi melalui pembiasaan ibadah terpadu, salat berjamaah, dan tadarus harian.',
      icon: 'mosque',
      badge: 'Religius',
    },
    {
      label: 'Media Pembelajaran Keagamaan',
      detail: 'Memanfaatkan momen-momen dan peringatan hari besar keagamaan sebagai sarana dan media pembelajaran kontekstual yang bermakna.',
      icon: 'menu_book',
      badge: 'Pembelajaran',
    },
    {
      label: 'Silaturahmi dengan Stakeholder',
      detail: 'Menjalin silaturahmi yang erat dan transparan bersama orang tua murid serta segenap pemangku kepentingan demi kemajuan pendidikan.',
      icon: 'family_restroom',
      badge: 'Kemitraan',
    },
    {
      label: 'Pemberdayaan Potensi SDM',
      detail: 'Memberdayakan sumber daya manusia dewan asatidz dan tenaga kependidikan secara optimal sesuai kompetensi dan kapabilitasnya.',
      icon: 'groups',
      badge: 'SDM Unggul',
    },
    {
      label: 'Pendidikan Karakter & Sosial',
      detail: 'Menyelenggarakan berbagai kegiatan sosial yang menjadi bagian tak terpisahkan dari penguatan pendidikan karakter bangsa (PPK).',
      icon: 'volunteer_activism',
      badge: 'Sosial',
    },
    {
      label: 'Kerja Sama Antar-Lembaga',
      detail: 'Menjalin kemitraan dan kerja sama sinergis dengan berbagai lembaga pendidikan dan instansi dalam merealisasikan program madrasah.',
      icon: 'handshake',
      badge: 'Kolaborasi',
    },
  ]

  const visiTags = [
    'Mandiri dalam Belajar',
    'Terbiasa Kata-Kata Islami',
    'Keharmonisan Interaksi',
    'Perbuatan Terpuji Sehari-hari',
    'Cinta & Peduli Lingkungan',
  ]

  return (
    <div className="w-full bg-ivory pt-24 pb-20">
      {/* Header Banner with Custom Photo Background (Hanya di Judul) */}
      <section className="relative text-white py-18 sm:py-24 lg:py-28 overflow-hidden bg-emerald-deep shadow-md">
        {/* Full-bleed Photo Background Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={visiBg}
            alt="Santri dan Budaya Belajar MI Roudotutta'lim"
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
              Visi, Misi &amp; Arah Pendidikan
            </h1>
            <p className="mt-4 text-base sm:text-lg text-emerald-50/90 font-body leading-relaxed max-w-2xl">
              Panduan fundamental MI Roudotutta'lim dalam menyemai generasi muslim yang beriman teguh, berilmu luas, berakhlak mulia, dan berhati Qur'ani.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin mt-12 space-y-16">
        {/* VISI CARD SECTION */}
        <section
          className="bg-white rounded-2xl border border-border p-8 lg:p-12 shadow-xs relative overflow-hidden"
          ref={visiRef}
        >
          {/* Soft architectural glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-leaf/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch justify-between relative z-10">
            {/* Left Narrative */}
            <div className="lg:w-5/12 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl lg:text-3xl font-heading font-bold text-emerald-deep tracking-tight">
                  Cita-Cita Luhur Madrasah
                </h2>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                  Visi ini menjadi kompas seluruh pendidik, tenaga kependidikan, santri, dan orang tua dalam setiap langkah ikhtiar pendidikan di MI Roudotutta'lim.
                </p>

                <div className="mt-6 p-4 rounded-xl bg-ivory border border-border/70 flex items-start gap-3">
                  <span className="material-symbols-outlined text-gold text-[22px] shrink-0 mt-0.5">format_quote</span>
                  <p className="text-xs text-ink-soft italic leading-relaxed">
                    "Allah akan meninggikan orang-orang yang beriman di antaramu dan orang-orang yang diberi ilmu pengetahuan beberapa derajat."
                    <span className="block mt-1 font-semibold not-italic text-emerald-deep">— QS. Al-Mujadilah: 11</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-border/70 flex items-center gap-3 text-xs text-ink-soft">
                <span className="material-symbols-outlined text-emerald-leaf text-[20px]">verified</span>
                <span>Terakreditasi A (Unggul) oleh BAN-S/M</span>
              </div>
            </div>

            {/* Right Quote Panel */}
            <div className="lg:w-7/12 bg-ivory-2 p-7 lg:p-9 rounded-2xl border border-border/90 flex flex-col justify-between relative">
              <div>
                {/* Arabic Calligraphy Header */}
                <div className="text-center pb-4 mb-4 border-b border-border/60">
                  <span className="font-heading text-lg sm:text-xl text-emerald-deep font-bold tracking-wide">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </span>
                </div>

                <p className="font-heading text-xl sm:text-2xl text-ink font-bold leading-relaxed pt-1">
                  “Terwujudnya Generasi MARHAMAH (Mandiri, Religi, Harmoni, dan Berakhlakul Karimah)”
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-border/70">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-deep block mb-2.5">
                  5 Indikator Pencapaian Visi Madrasah:
                </span>
                <div className="flex flex-wrap gap-2">
                  {visiTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-white border border-border text-xs font-semibold text-emerald-deep shadow-2xs flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-leaf"></span>
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MISI SECTION */}
        <section>
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-emerald-deep">
              4 Misi Pokok Madrasah
            </h2>
            <p className="text-sm text-ink-soft mt-1">
              Ikhtiar konkrit dan terarah yang kami terapkan dalam kegiatan belajar mengajar serta pembiasaan karakter ananda sehari-hari.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" ref={misiGridRef}>
            {misiList.map((misi) => (
              <div
                key={misi.num}
                className="reveal-child bg-white rounded-2xl border border-border p-6 sm:p-7 shadow-xs hover:border-emerald-leaf/40 hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-deep/10 text-emerald-deep flex items-center justify-center group-hover:bg-emerald-deep group-hover:text-white transition-colors duration-300">
                      <span className="material-symbols-outlined text-[22px]">{misi.icon}</span>
                    </div>
                    <span className="font-heading text-2xl font-bold text-border group-hover:text-gold transition-colors duration-300">
                      {misi.num}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-heading font-bold text-ink mb-2">
                    {misi.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-soft leading-relaxed font-body">
                    {misi.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TUJUAN PENDIDIKAN / KOMPETENSI LULUSAN */}
        <section className="bg-ivory-2 rounded-2xl border border-border/80 p-8 lg:p-10 shadow-xs" ref={tujuanRef}>
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-emerald-deep">
              Tujuan Kelembagaan &amp; Pendidikan Madrasah
            </h2>
            <p className="text-sm text-ink-soft mt-1 leading-relaxed">
              Enam tujuan strategis MI Roudotutta'lim sebagai penjabaran visi dan misi dalam membentuk insan berilmu, bertakwa, dan berakhlakul karimah:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tujuanList.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-border shadow-2xs hover:border-emerald-leaf/40 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-leaf/10 text-emerald-deep flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-100">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-heading font-bold text-ink">
                    {item.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-soft mt-1 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Institutional Trust Strip */}
          <div className="mt-8 pt-6 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-soft">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-emerald-leaf">verified_user</span>
              <span>Ijazah Resmi Kementerian Agama RI &amp; Terdaftar di Sistem Informasi EMIS</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold text-emerald-deep">Kurikulum Merdeka Terintegrasi</span>
              <span>•</span>
              <span className="font-semibold text-emerald-deep">Tahfidz Juz 30 Bersanad</span>
            </div>
          </div>
        </section>

        {/* CTA TO PPDB / BERANDA */}
        <section
          className="bg-emerald-deep rounded-2xl text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm relative overflow-hidden"
          ref={ctaRef}
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Tertarik Menjadi Bagian dari Madrasah Kami?
            </h3>
            <p className="text-sm text-emerald-100/90 mt-1 leading-relaxed">
              Penerimaan Peserta Didik Baru (PPDB) telah dibuka. Silakan simak informasi berkas persyaratan atau konsultasikan kebutuhan ananda langsung ke sekretariat.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/ppdb"
              className="px-6 py-3.5 rounded-full bg-gold text-ink font-semibold text-sm hover:bg-gold-soft transition-colors shadow-sm active:scale-[0.98]"
            >
              Informasi &amp; Persyaratan PPDB
            </Link>
            <a
              href="https://wa.me/6289636058110?text=Assalamu'alaikum%20Panitia%20MI%20Roudotutta'lim,%20saya%20ingin%20konsultasi%20pendidikan"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-full border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors inline-flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Tanya Panitia</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
