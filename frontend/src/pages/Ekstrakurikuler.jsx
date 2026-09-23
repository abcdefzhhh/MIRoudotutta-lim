import { Link } from 'react-router-dom'
import eskulBg from '../assets/eskul.jpeg'
import useScrollReveal, { useStaggerReveal } from '../hooks/useScrollReveal'

export default function Ekstrakurikuler() {
  const introRef = useScrollReveal()
  const gridRef = useStaggerReveal({ staggerMs: 80 })
  const ctaRef = useScrollReveal()

  const activities = [
    {
      title: 'Pramuka Siaga & Penggalang',
      category: 'Kepanduan & Karakter',
      schedule: 'Setiap Jumat Sore',
      desc: 'Melatih kemandirian, kedisiplinan, tali-temali, pertolongan pertama, kepedulian sosial, dan kecintaan pada alam dalam bingkai adab islami.',
      icon: 'explore',
      badgeColor: 'bg-emerald-deep text-white',
    },
    {
      title: 'Tahfidz Club & Seni Tilawah',
      category: 'Keagamaan & Al-Qur\'an',
      schedule: 'Selasa & Kamis Sore',
      desc: 'Penguatan muraja\'ah juz amma, pendalaman makharijul huruf, dan pembelajaran nagham (irama tilawah tartil) untuk persiapan musabaqah/khotmil Qur\'an.',
      icon: 'menu_book',
      badgeColor: 'bg-gold text-ink font-semibold',
    },
    {
      title: 'Seni Rebana & Hadrah',
      category: 'Seni & Budaya Islam',
      schedule: 'Setiap Sabtu Pagi',
      desc: 'Mengenalkan kecintaan pada sholawat nabi melalui kesenian hadrah klasik, melatih kepekaan ritme, kekompakan tim, dan ekspresi seni islami.',
      icon: 'music_note',
      badgeColor: 'bg-emerald-leaf text-white',
    },
    {
      title: 'Futsal & Olahraga Kebugaran',
      category: 'Olahraga & Sportivitas',
      schedule: 'Setiap Sabtu Pagi',
      desc: 'Menyalurkan energi positif, melatih ketahanan fisik, koordinasi motorik, sportivitas, serta kerjasama tim di lapangan olahraga madrasah.',
      icon: 'sports_soccer',
      badgeColor: 'bg-emerald-leaf-soft text-white',
    },
    {
      title: 'Arabic & English Fun Club',
      category: 'Pengembangan Bahasa',
      schedule: 'Setiap Rabu Sore',
      desc: 'Membangun keberanian Siswa berbicara bahasa Arab dan Inggris melalui permainan interaktif, nyanyian edukatif, kosa kata harian, dan storytelling.',
      icon: 'translate',
      badgeColor: 'bg-emerald-deep text-white',
    },
    {
      title: 'Seni Kaligrafi Islam (Khat)',
      category: 'Seni Rupa & Estetika',
      schedule: 'Setiap Kamis Sore',
      desc: 'Melatih ketelitian, ketenangan, dan kesabaran Siswa dalam menggoreskan pena kaligrafi gaya Naskhi dan Tsuluts untuk menulis ayat-ayat suci.',
      icon: 'draw',
      badgeColor: 'bg-gold text-ink font-semibold',
    },
    {
      title: 'Sains Cilik & Eksperimen Alam',
      category: 'Sains & Teknologi',
      schedule: 'Setiap Sabtu Pagi',
      desc: 'Eksperimen ilmiah sederhana yang memantik rasa ingin tahu Siswa tentang hukum alam, daur ulang ramah lingkungan, dan logika sains dasar.',
      icon: 'biotech',
      badgeColor: 'bg-emerald-leaf text-white',
    },
  ]

  return (
    <div className="w-full bg-ivory pt-24 pb-20">
      {/* Header Banner with eskul.jpeg Background (Hanya di Judul) */}
      <section className="relative text-white py-18 sm:py-24 lg:py-28 overflow-hidden bg-emerald-deep shadow-md">
        {/* Full-bleed Photo Background Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={eskulBg}
            alt="Kegiatan Ekstrakurikuler Siswa MI Roudotutta'lim"
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
            <span className="text-emerald-200">Profil</span>
            <span>/</span>
            <span className="text-gold font-semibold">Ekstrakurikuler</span>
          </nav>

          <div className="max-w-3xl animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/20 border border-gold/40 text-gold-soft text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-xs">
              <span className="material-symbols-outlined text-[16px]">sports_kabaddi</span>
              <span>Aktivitas &amp; Pengembangan Bakat Siswa</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-tight drop-shadow-sm">
              Ekstrakurikuler &amp; Bakat Siswa
            </h1>
            <p className="mt-4 text-base sm:text-lg text-emerald-50/90 font-body leading-relaxed max-w-2xl">
              Wadah eksplorasi minat, pembentukan jiwa kepemimpinan, pengasahan keterampilan seni islami, dan kebugaran jasmani di luar jam belajar formal.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin mt-12 space-y-16">
        {/* Intro Highlight Banner */}
        <section className="bg-white rounded-2xl border border-border p-6 lg:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6" ref={introRef}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/20 text-emerald-deep flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px] text-emerald-deep">stars</span>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-emerald-deep">
                Pola Pembinaan Seimbang
              </h3>
              <p className="text-xs sm:text-sm text-ink-soft">
                Seluruh kegiatan ekstrakurikuler dirancang komplementer terhadap kegiatan akademik Siswa tanpa membebani rutinitas harian.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 shrink-0 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6 text-xs text-ink-soft">
            <div>
              <span className="block font-heading font-bold text-xl text-emerald-deep">7+</span>
              Pilihan Ekskul
            </div>
            <div>
              <span className="block font-heading font-bold text-xl text-emerald-deep">100%</span>
              Terbimbing Pengajar
            </div>
          </div>
        </section>

        {/* Activities Grid */}
        <section>
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-leaf">Ragam Pilihan Kegiatan</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-emerald-deep mt-1">
              Temukan Bakat Terbaik Ananda
            </h2>
            <p className="text-sm text-ink-soft mt-1">
              Siswa dapat memilih kegiatan ekstrakurikuler sesuai bakat alami dan minat yang ingin dikembangkan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={gridRef}>
            {activities.map((act, index) => (
              <div
                key={index}
                className="reveal-child bg-white rounded-2xl border border-border p-6 flex flex-col justify-between hover:shadow-xl hover:border-emerald-leaf/40 transform hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-deep/10 text-emerald-deep flex items-center justify-center group-hover:bg-emerald-deep group-hover:text-white transition-colors shrink-0">
                      <span className="material-symbols-outlined text-[26px]">{act.icon}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${act.badgeColor}`}>
                      {act.category}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-ink mb-1 group-hover:text-emerald-deep transition-colors">
                    {act.title}
                  </h3>

                  <p className="inline-flex items-center gap-1.5 text-xs text-emerald-leaf font-semibold mb-3">
                    <span className="material-symbols-outlined text-[15px]">schedule</span>
                    {act.schedule}
                  </p>

                  <p className="font-body text-sm text-ink-soft leading-relaxed">
                    {act.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-ink-soft">
                  <span className="text-emerald-deep font-semibold">Tingkat Kelas 1 - 6</span>
                  <span className="material-symbols-outlined text-[18px] text-border group-hover:text-emerald-leaf transition-colors">
                    arrow_forward
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-emerald-deep rounded-2xl text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm" ref={ctaRef}>
          <div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Siap Mengembangkan Potensi Buah Hati Anda?
            </h3>
            <p className="text-sm text-emerald-100/90 mt-1 max-w-xl">
              Bergabunglah bersama keluarga besar MI Roudotutta'lim. Dapatkan pendidikan yang memadukan kedalaman ilmu dan keluhuran akhlak.
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
