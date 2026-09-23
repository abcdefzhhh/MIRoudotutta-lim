import { Link } from 'react-router-dom'
import guruBg from '../assets/gurustaf.jpg'
import useScrollReveal, { useStaggerReveal } from '../hooks/useScrollReveal'

export default function GuruStaf() {
  const valuesGridRef = useStaggerReveal({ staggerMs: 120 })
  const leaderGridRef = useStaggerReveal({ staggerMs: 150 })
  const staffRef = useScrollReveal()
  const ctaRef = useScrollReveal()

  const leadership = [
    {
      name: 'Ust. H. Ahmad Syafi\'i, M.Pd.I',
      role: 'Kepala Madrasah',
      desc: 'Berpengalaman lebih dari 18 tahun dalam kepemimpinan madrasah dan pengembangan kurikulum integratif berbasis Al-Qur\'an.',
      badge: 'Pimpinan',
      avatarColor: 'bg-emerald-deep',
    },
    {
      name: 'Ustz. Siti Aminah, S.Pd.',
      role: 'Wakil Kepala Bidang Kurikulum',
      desc: 'Fokus pada implementasi Kurikulum Merdeka Terintegrasi dan standarisasi mutu evaluasi belajar ananda.',
      badge: 'Kurikulum',
      avatarColor: 'bg-emerald-leaf',
    },
    {
      name: 'Ust. Muhammad Ridwan, S.Ag.',
      role: 'Wakil Kepala Bidang Kesiswaan & Tahfidz',
      desc: 'Mengkoordinasikan pembiasaan akhlak harian Siswa, monitoring halaqah tahfidz, serta pembinaan disiplin ibadah.',
      badge: 'Kesiswaan',
      avatarColor: 'bg-emerald-leaf-soft',
    },
  ]

  const educators = [
    {
      name: 'Ustz. Nur Hayati, S.Pd.I',
      role: 'Wali Kelas 1 & Guru Tematik Awal',
      expertise: 'Metode Membaca Cepat & Pendampingan Transisi PAUD-MI',
    },
    {
      name: 'Ust. Fauzan Azhim, Lc.',
      role: 'Koordinator Bahasa Arab & Tahfidz',
      expertise: 'Alumnus Al-Azhar Kairo, Pembina Percakapan Arab & Qiroah',
    },
    {
      name: 'Ustz. Dewi Sartika, S.Pd.',
      role: 'Wali Kelas 3 & Guru Sains Terapan',
      expertise: 'Pembelajaran Eksperimen Sains Menyenangkan & Literasi Numerasi',
    },
    {
      name: 'Ust. Budi Prakoso, S.Pd.',
      role: 'Guru PJOK & Pembina Pramuka',
      expertise: 'Kebugaran Siswa, Kepanduan Siaga/Penggalang & Futsal',
    },
    {
      name: 'Ustz. Fatimah Azzahra, S.Hum.',
      role: 'Guru Bahasa Inggris & Seni Budaya',
      expertise: 'English Fun Learning, Seni Kaligrafi & Kesenian Hadrah',
    },
    {
      name: 'Ust. Hendra Wijaya, S.Kom.',
      role: 'Staf Tata Usaha & Administrator Web/SIPERPUS',
      expertise: 'Layanan Administrasi Siswa, Data Pokok Pendidikan & Sistem Informasi',
    },
  ]

  const values = [
    {
      title: 'Keteladanan Sebelum Ucapan',
      desc: 'Guru mempraktikkan adab dan ketulusan terlebih dahulu sebelum mengajarkannya kepada para Siswa.',
      icon: 'psychology',
    },
    {
      title: 'Sabar & Ramah Anak',
      desc: 'Setiap anak memiliki kecepatan tumbuh kembang yang unik; pendampingan dilakukan dengan penuh empati tanpa perundungan.',
      icon: 'favorite',
    },
    {
      title: 'Kompetensi Berkelanjutan',
      desc: 'Rutin mengikuti pelatihan pedagogis modern, workshop Kurikulum Merdeka, dan tadabbur keagamaan berkala.',
      icon: 'workspace_premium',
    },
  ]

  return (
    <div className="w-full bg-ivory pt-24 pb-20">
      {/* Header Banner with Custom Photo Background (Hanya di Judul) */}
      <section className="relative text-white py-18 sm:py-24 lg:py-28 overflow-hidden bg-emerald-deep shadow-md">
        {/* Full-bleed Photo Background Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={guruBg}
            alt="Dewan Guru & Tenaga Kependidikan MI Roudotutta'lim"
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
              Guru &amp; Tenaga Kependidikan
            </h1>
            <p className="mt-4 text-base sm:text-lg text-emerald-50/90 font-body leading-relaxed max-w-2xl">
              Mengenal para ustaz, ustazah, dan tenaga kependidikan MI Roudotutta'lim yang membimbing siswa dengan ketulusan hati, ilmu yang mumpuni, dan keteladanan budi pekerti.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin mt-12 space-y-16">
        {/* Core Values of Educators */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6" ref={valuesGridRef}>
          {values.map((v, i) => (
            <div key={i} className="reveal-child bg-white rounded-xl border border-border p-6 shadow-xs flex items-start gap-4 hover:border-emerald-leaf/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-deep/10 text-emerald-deep flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[26px]">{v.icon}</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-ink mb-1">{v.title}</h3>
                <p className="font-body text-xs sm:text-sm text-ink-soft leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Leadership Team */}
        <section>
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-leaf">Struktur Kepemimpinan</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-emerald-deep mt-1">
              Pimpinan &amp; Pengelola Madrasah
            </h2>
            <p className="text-sm text-ink-soft mt-1">
              Mengawal visi pendidikan dan tata kelola madrasah yang profesional, amanah, dan berorientasi pada masa depan anak.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" ref={leaderGridRef}>
            {leadership.map((item, idx) => (
              <div
                key={idx}
                className="reveal-child bg-white rounded-2xl border border-border p-6 shadow-sm flex flex-col justify-between hover:border-emerald-leaf/40 hover:-translate-y-1.5 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-ivory text-emerald-deep border border-border">
                      {item.badge}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-gold"></span>
                  </div>

                  {/* Avatar Placeholder */}
                  <div className="w-16 h-16 rounded-full bg-emerald-deep/10 text-emerald-deep flex items-center justify-center mb-4 text-2xl font-bold font-heading border-2 border-emerald-deep/20">
                    {item.name.charAt(4) || item.name.charAt(0)}
                  </div>

                  <h3 className="text-lg font-heading font-bold text-ink mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-leaf uppercase tracking-wider mb-3">
                    {item.role}
                  </p>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Educators & Staff List */}
        <section className="bg-ivory-2 rounded-2xl border border-border/80 p-8 lg:p-10" ref={staffRef}>
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-leaf">Dewan Asatidz &amp; Karyawan</span>
            <h2 className="text-2xl font-heading font-bold text-emerald-deep mt-1">
              Wali Kelas, Guru Bidang Studi &amp; Tata Usaha
            </h2>
            <p className="text-sm text-ink-soft mt-1">
              Para pengajar berdedikasi yang menemani interaksi belajar, hafalan Qur'an, dan pembiasaan adab para Siswa setiap hari.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {educators.map((edu, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl border border-border hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-leaf/10 text-emerald-deep flex items-center justify-center font-bold text-sm shrink-0">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm sm:text-base text-ink">
                      {edu.name}
                    </h4>
                    <p className="text-xs font-medium text-emerald-deep mt-0.5">
                      {edu.role}
                    </p>
                    <p className="text-xs text-ink-soft mt-2 leading-relaxed bg-ivory p-2 rounded-lg border border-border/50">
                      💡 {edu.expertise}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-emerald-deep rounded-2xl text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm" ref={ctaRef}>
          <div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Ingin Berkonsultasi Mengenai Putra-Putri Anda?
            </h3>
            <p className="text-sm text-emerald-100/90 mt-1 max-w-xl">
              Kami menyambut hangat para orang tua yang ingin berdiskusi mengenai kurikulum, program tahfidz, dan lingkungan belajar di madrasah kami.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/kontak"
              className="px-6 py-3 rounded-full bg-gold text-ink font-semibold text-sm hover:bg-gold-soft transition-colors shadow-sm active:scale-[0.98]"
            >
              Hubungi Kami
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
