import { useState } from 'react'
import { Link } from 'react-router-dom'
import useScrollReveal, { useStaggerReveal } from '../hooks/useScrollReveal'

export default function Ppdb() {
  const waveRef = useScrollReveal()
  const stepsRef = useStaggerReveal({ staggerMs: 90 })
  const reqGridRef = useStaggerReveal({ staggerMs: 100 })
  const faqRef = useScrollReveal({ threshold: 0.08 })
  const ctaRef = useScrollReveal()

  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx)
  }

  const steps = [
    {
      num: '01',
      title: 'Persiapan Berkas Fisik',
      desc: 'Orang tua / wali murid menyiapkan seluruh dokumen persyaratan fisik seperti Akta Kelahiran, KK, KTP orang tua, dan pas foto.',
      icon: 'folder_open',
    },
    {
      num: '02',
      title: 'Kunjungan ke Madrasah',
      desc: 'Datang langsung ke Sekretariat PPDB MI Roudotutta\'lim untuk mengambil & mengisi formulir cetak serta menyerahkan kelengkapan berkas.',
      icon: 'location_on',
    },
    {
      num: '03',
      title: 'Observasi Ramah Anak',
      desc: 'Pendampingan observasi kognitif dasar, motorik, dan pengenalan huruf hijaiyah dalam suasana menyenangkan tanpa tes seleksi yang memberatkan.',
      icon: 'psychology',
    },
    {
      num: '04',
      title: 'Pengumuman & Daftar Ulang',
      desc: 'Pemberitahuan hasil kesiapan via WhatsApp resmi, pengukuran seragam, kelengkapan administrasi, dan pembagian jadwal Matsama.',
      icon: 'how_to_reg',
    },
  ]

  const physicalDocuments = [
    {
      name: 'Formulir Pendaftaran Fisik',
      desc: 'Disediakan dan diisi langsung di sekretariat madrasah saat berkunjung',
      qty: '1 Berkas Asli',
      required: true,
    },
    {
      name: 'Fotokopi Akta Kelahiran Calon Siswa',
      desc: 'Jelas dan terbaca, nama sesuai dengan kartu identitas keluarga',
      qty: '2 Lembar',
      required: true,
    },
    {
      name: 'Fotokopi Kartu Keluarga (KK) Terbaru',
      desc: 'Memuat nama calon siswa dan orang tua / wali yang bersangkutan',
      qty: '2 Lembar',
      required: true,
    },
    {
      name: 'Fotokopi KTP Kedua Orang Tua / Wali',
      desc: 'KTP elektronik bapak dan ibu atau wali yang bertanggung jawab',
      qty: 'Masing-masing 2 Lembar',
      required: true,
    },
    {
      name: 'Pas Foto Berwarna Terbaru Calon Siswa (3x4)',
      desc: 'Pas foto santai/resmi berlatar belakang merah atau biru',
      qty: '4 Lembar',
      required: true,
    },
    {
      name: 'Fotokopi Ijazah / SKL TK, RA, atau PAUD',
      desc: 'Surat Keterangan Lulus dari lembaga pendidikan sebelumnya (jika ada)',
      qty: '2 Lembar',
      required: false,
    },
    {
      name: 'Fotokopi Kartu KIP / PKH / KKS',
      desc: 'Khusus calon siswa pendaftar program beasiswa atau afirmasi bantuan',
      qty: '2 Lembar',
      required: false,
    },
  ]

  const ageRequirements = [
    {
      title: 'Usia Calon Siswa',
      desc: 'Berusia minimal 6 (enam) tahun pada tanggal 1 Juli tahun ajaran berjalan. Calon siswa berusia 5 tahun 6 bulan dapat dipertimbangkan dengan rekomendasi tertulis dari psikolog profesional atau dewan guru RA/TK asal.',
      icon: 'child_care',
    },
    {
      title: 'Kemandirian & Kesiapan Mental',
      desc: 'Calon siswa diharapkan sudah mampu berkomunikasi secara wajar, mandiri dalam kebutuhan dasar (toilet training mandiri), dan memiliki dorongan belajar di lingkungan sekolah dasar.',
      icon: 'sentiment_satisfied_alt',
    },
    {
      title: 'Komitmen Kemitraan Orang Tua',
      desc: 'Orang tua / wali murid bersedia bekerjasama dan berkomitmen mendukung pembiasaan adab islami, sholat dhuha/dzuhur berjamaah, hafalan Al-Qur\'an, dan tata tertib madrasah.',
      icon: 'handshake',
    },
  ]

  const serviceHours = [
    { day: 'Senin s/d Kamis', time: '08.00 – 13.00 WIB', note: 'Pelayanan berkas & formulir fisik' },
    { day: 'Jumat', time: '08.00 – 11.00 WIB', note: 'Pelayanan pagi sebelum ibadah sholat Jumat' },
    { day: 'Sabtu', time: '08.00 – 12.00 WIB', note: 'Pelayanan akhir pekan' },
    { day: 'Ahad & Libur Nasional', time: 'Tutup / Libur', note: 'Konsultasi pertanyaan tetap dilayani via WhatsApp' },
  ]

  const faqs = [
    {
      q: 'Apakah ada tes tertulis membaca, menulis, dan berhitung (Calistung)?',
      a: 'Tidak ada tes tertulis formal calistung. MI Roudotutta\'lim mengedepankan proses observasi ramah anak yang menyenangkan untuk memetakan kesiapan motorik, daya tangkap, dan kemandirian ananda tanpa menimbulkan kecemasan belajar.',
    },
    {
      q: 'Bagaimana jika ijazah TK/RA belum keluar saat ingin mendaftar?',
      a: 'Pendaftaran tetap dapat dilakukan. Anda cukup melampirkan Surat Keterangan Lulus (SKL) sementara atau Surat Keterangan Masih Aktif Belajar dari pihak TK/RA/PAUD asal.',
    },
    {
      q: 'Di mana orang tua bisa mendapatkan formulir pendaftaran?',
      a: 'Formulir pendaftaran fisik disediakan langsung di Ruang Sekretariat PPDB MI Roudotutta\'lim. Tidak ada pengisian formulir online di website, sehingga orang tua dapat langsung berkonsultasi tatap muka dengan panitia.',
    },
    {
      q: 'Warna map apa yang digunakan untuk menyerahkan berkas?',
      a: 'Berkas dimasukkan ke dalam map snelhechter kertas/plastik: Map berwarna Biru untuk calon siswa laki-laki dan Map berwarna Merah atau Hijau untuk calon siswa perempuan.',
    },
    {
      q: 'Apakah menerima siswa pindahan (mutasi) dari sekolah lain?',
      a: 'Ya, kami menerima mutasi masuk untuk jenjang kelas 2 sampai dengan kelas 5 selama kuota bangku di kelas yang dituju masih tersedia, dengan melampirkan surat mutasi resmi dan raport dari sekolah asal.',
    },
  ]

  return (
    <div className="w-full bg-ivory pt-24 pb-20">
      {/* Header Banner */}
      <section className="bg-emerald-deep text-white py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D9A62B_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin relative z-10">
          <div className="max-w-3xl animate-slide-up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-tight">
              Penerimaan Peserta Didik Baru (PPDB)
            </h1>
            <p className="mt-4 text-base sm:text-lg text-emerald-50/90 font-body leading-relaxed max-w-2xl">
              Informasi resmi, alur pendaftaran langsung di madrasah, dan kelengkapan berkas persyaratan calon peserta didik baru MI Roudotutta'lim Tahun Ajaran 2025/2026.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin mt-12 space-y-16">
        {/* Registration Wave Notification Banner */}
        <section className="bg-white rounded-2xl border border-border p-6 lg:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6" ref={waveRef}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/20 text-emerald-deep flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px] text-emerald-deep">verified</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-leaf/10 text-emerald-deep font-bold text-xs uppercase tracking-wider">
                  Gelombang 1 Dibuka
                </span>
                <span className="text-xs text-ink-soft">Tahun Ajaran 2025/2026</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-ink mt-1">
                Pendaftaran Langsung di Sekretariat Madrasah
              </h3>
              <p className="text-xs sm:text-sm text-ink-soft max-w-2xl">
                Kuota kelas terbatas (maksimal 28 siswa per rombel) demi efektivitas bimbingan adab dan pembelajaran ananda. Pengisian formulir dilakukan secara fisik di madrasah.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-3 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
            <a
              href="#persyaratan"
              className="flex-1 md:flex-none px-6 py-3 rounded-full bg-emerald-deep text-white text-xs sm:text-sm font-semibold hover:bg-emerald-leaf transition-colors active:scale-[0.98] shadow-sm text-center"
            >
              Lihat Persyaratan Berkas
            </a>
            <a
              href="https://wa.me/6289636058110?text=Assalamu'alaikum%20Panitia%20PPDB%20MI%20Roudotutta'lim,%20saya%20ingin%20konsultasi%20persyaratan%20pendaftaran"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none px-5 py-3 rounded-full border border-emerald-deep/20 text-emerald-deep hover:bg-emerald-deep/5 text-xs sm:text-sm font-semibold transition-colors active:scale-[0.98] flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Tanya Panitia</span>
            </a>
          </div>
        </section>

        {/* 4-Step Registration Flow */}
        <section>
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-leaf">Alur Pendaftaran</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-emerald-deep mt-1">
              4 Langkah Pendaftaran Masuk Madrasah
            </h2>
            <p className="text-sm text-ink-soft mt-1">
              Alur pendaftaran dirancang transparan, ramah anak, dan bebas tes seleksi yang membebani psikologis calon siswa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" ref={stepsRef}>
            {steps.map((st) => (
              <div
                key={st.num}
                className="reveal-child bg-white rounded-2xl border border-border p-6 shadow-xs flex flex-col justify-between hover:border-emerald-leaf/40 hover:-translate-y-1.5 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-deep/10 text-emerald-deep flex items-center justify-center">
                      <span className="material-symbols-outlined text-[22px]">{st.icon}</span>
                    </div>
                    <span className="font-heading text-2xl font-bold text-border">
                      {st.num}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-ink mb-1.5">
                    {st.title}
                  </h3>
                  <p className="font-body text-xs text-ink-soft leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Requirements Section Main Anchor */}
        <section id="persyaratan" className="space-y-10">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-leaf">Persyaratan Lengkap</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-emerald-deep mt-1">
              Dokumen &amp; Ketentuan Calon Siswa Baru
            </h2>
            <p className="text-sm text-ink-soft mt-1">
              Harap memastikan seluruh dokumen fisik telah dipersiapkan dengan baik sebelum hadir ke sekretariat madrasah.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" ref={reqGridRef}>
            {/* Column 1: Dokumen Berkas Fisik (7 cols) */}
            <div className="reveal-child lg:col-span-7 bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-5 border-b border-border/70 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-deep/10 text-emerald-deep flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">assignment</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-emerald-deep">
                      Berkas Fisik yang Wajib Diserahkan
                    </h3>
                    <p className="text-xs text-ink-soft">
                      Dimasukkan ke dalam Map Snelhechter (Biru: Putra | Merah/Hijau: Putri)
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-border/60">
                {physicalDocuments.map((doc, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-emerald-leaf text-[20px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-heading font-bold text-sm text-ink">
                            {doc.name}
                          </span>
                          {doc.required ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-600 border border-rose-200">
                              Wajib
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                              Jika Ada
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-ink-soft mt-0.5 leading-relaxed">
                          {doc.desc}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100 whitespace-nowrap">
                      {doc.qty}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-3">
                <span className="material-symbols-outlined text-amber-600 text-[20px] shrink-0 mt-0.5">info</span>
                <div>
                  <span className="font-semibold block mb-0.5">Catatan Penting Pengisian Formulir:</span>
                  Formulir pendaftaran resmi disediakan gratis langsung di sekretariat madrasah saat Anda berkunjung. Anda tidak perlu mencetak sendiri dari internet.
                </div>
              </div>
            </div>

            {/* Column 2: Syarat Usia & Jam Pelayanan (5 cols) */}
            <div className="reveal-child lg:col-span-5 space-y-6">
              {/* Syarat Usia & Kesiapan */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-xs">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border/70">
                  <div className="w-10 h-10 rounded-xl bg-gold/15 text-emerald-deep flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">child_care</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-emerald-deep">
                      Kriteria Usia &amp; Kesiapan
                    </h3>
                    <p className="text-xs text-ink-soft">Standar Kementerian Agama</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {ageRequirements.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-leaf flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-xs text-ink">
                          {item.title}
                        </h4>
                        <p className="text-xs text-ink-soft leading-relaxed mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Jadwal Pelayanan Sekretariat */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-xs">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/70">
                  <div className="w-10 h-10 rounded-xl bg-emerald-deep/10 text-emerald-deep flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">calendar_month</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-emerald-deep">
                      Waktu &amp; Tempat Pelayanan
                    </h3>
                    <p className="text-xs text-ink-soft">Ruang Sekretariat PPDB MI Roudotutta'lim</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {serviceHours.map((slot, sIdx) => (
                    <div key={sIdx} className="p-2.5 rounded-xl bg-ivory border border-border/70 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-semibold text-ink block">{slot.day}</span>
                        <span className="text-[11px] text-ink-soft">{slot.note}</span>
                      </div>
                      <span className="font-semibold text-emerald-deep bg-white px-2.5 py-1 rounded-lg border border-border/60 shrink-0">
                        {slot.time}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-xs text-ink-soft flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-emerald-deep shrink-0">pin_drop</span>
                  <span>Jl. Raya Barat No. 363, Batujajar Barat, Kec. Batujajar, Kab. Bandung Barat, Jawa Barat 40561</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ramah Anak Card Highlight */}
        <section className="bg-gradient-to-br from-emerald-deep to-emerald-leaf rounded-2xl text-white p-8 lg:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl">
            <span className="px-3 py-1 rounded-full bg-white/15 text-gold-soft text-xs font-semibold uppercase tracking-wider inline-block mb-3">
              Prinsip Edukasi MI Roudotutta'lim
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3">
              Observasi Ramah Anak: Menilai dengan Kasih Sayang
            </h3>
            <p className="text-sm sm:text-base text-emerald-50/90 leading-relaxed font-body mb-6">
              Kami meyakini setiap anak memiliki kecepatan berkembang yang istimewa. Observasi penerimaan bukan ujian seleksi eliminasi calistung yang kaku, melainkan ruang silaturahmi penuh kasih sayang untuk mengenal keunikan dan potensi ananda sejak dini.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15">
                <span className="material-symbols-outlined text-gold text-[22px] mb-2 block">mood</span>
                <span className="font-semibold text-xs block text-white">Tanpa Ujian Menakutkan</span>
                <span className="text-[11px] text-emerald-100/80 mt-1 block">Suasana ceria seperti bermain bersama guru ramah anak</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15">
                <span className="material-symbols-outlined text-gold text-[22px] mb-2 block">auto_stories</span>
                <span className="font-semibold text-xs block text-white">Pengenalan Hijaiyah Dasar</span>
                <span className="text-[11px] text-emerald-100/80 mt-1 block">Menakar dasar bacaan Iqro tanpa dituntut sudah lancar</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15">
                <span className="material-symbols-outlined text-gold text-[22px] mb-2 block">forum</span>
                <span className="font-semibold text-xs block text-white">Dialog Santun Orang Tua</span>
                <span className="text-[11px] text-emerald-100/80 mt-1 block">Menyelaraskan visi pendidikan adab keluarga dan madrasah</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section ref={faqRef} className="space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-leaf">Pertanyaan Umum</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-emerald-deep mt-1">
              Seputar Informasi &amp; Persyaratan PPDB
            </h2>
            <p className="text-sm text-ink-soft mt-1">
              Jawaban atas hal-hal yang sering ditanyakan oleh calon wali murid baru.
            </p>
          </div>

          <div className="space-y-3 max-w-3xl">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-border overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left font-heading font-semibold text-sm sm:text-base text-ink flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`material-symbols-outlined text-emerald-deep transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-ink-soft leading-relaxed border-t border-border/50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Direct Help & Contact Banner */}
        <section
          ref={ctaRef}
          className="bg-white rounded-2xl border border-border p-8 lg:p-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-leaf mb-2">
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
              <span>Layanan Informasi Panitia</span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-emerald-deep mb-2">
              Perlu Konsultasi Langsung dengan Panitia PPDB?
            </h3>
            <p className="text-sm text-ink-soft leading-relaxed">
              Tim panitia penerimaan kami dengan senang hati menjawab pertanyaan Anda mengenai rincian berkas, pembiayaan seragam, jadwal observasi, maupun panduan lokasi madrasah.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href="https://wa.me/6289636058110?text=Assalamu'alaikum%20Panitia%20PPDB%20MI%20Roudotutta'lim,%20saya%20ingin%20bertanya%20seputar%20informasi%20PPDB"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-deep text-white font-semibold text-sm hover:bg-emerald-leaf transition-colors active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>WhatsApp Panitia PPDB</span>
            </a>
            <Link
              to="/kontak"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-border bg-white text-ink font-semibold text-sm hover:bg-ivory hover:border-emerald-leaf/40 transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px] text-emerald-deep">pin_drop</span>
              <span>Lokasi Madrasah</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
