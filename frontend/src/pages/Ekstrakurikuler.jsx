import { Link } from 'react-router-dom'
import eskulBg from '../assets/eskul.jpg'
import hadrahImg from '../assets/eskul-hadrah.jpg'
import futsalImg from '../assets/eskul-futsal.jpg'
import silatImg from '../assets/eskul-silat.jpg'
import paskibraImg from '../assets/eskul-paskibra.jpg'
import useScrollReveal, { useStaggerReveal } from '../hooks/useScrollReveal'

export default function Ekstrakurikuler() {
  const introRef = useScrollReveal()
  const gridRef = useStaggerReveal({ staggerMs: 90 })
  const ctaRef = useScrollReveal()

  const activities = [
    {
      title: 'Tahfidz Club & Tilawah',
      category: 'Keagamaan & Al-Qur\'an',
      schedule: 'Selasa & Kamis Sore',
      desc: 'Penguatan muraja\'ah Juz \'Amma, pendalaman makharijul huruf, dan pembelajaran irama tartil untuk persiapan tasmi\' dan khotmil Qur\'an bersama dewan asatidz.',
      icon: 'menu_book',
      badgeColor: 'bg-gold text-ink font-semibold',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC11OoNNfMTQw4KSD1t0JIbMBmFD0yY_fYTGQSNdI2_OXOovTFAG4kVZtABk4-S_SJ0Sh03bCYnCAsj-02468km3QdO5pUlC0JZdejW7lDMuIAW6CKeHS4SGZIArSZGWTGXHJCfKwZkeVJTO-f3kK-xgPlNYyp8US4OqVunHJb9vmnwIFouc7U3x8wRbD4D2NfSYPbJ90MgeXaSjmj1AGTMtSm8zmRaB2COp6FITjdSatV-4KISBdwKuA',
      alt: 'Santri menghafal Al-Qur\'an dan seni tilawah',
    },
    {
      title: 'Futsal & Olahraga',
      category: 'Olahraga & Sportivitas',
      schedule: 'Setiap Sabtu Pagi',
      desc: 'Menyalurkan energi positif, melatih ketahanan fisik, koordinasi motorik, sportivitas, serta kerjasama tim yang solid di lapangan olahraga madrasah.',
      icon: 'sports_soccer',
      badgeColor: 'bg-emerald-leaf-soft text-white',
      image: futsalImg,
      alt: 'Anak-anak bermain futsal di lapangan sekolah',
    },
    {
      title: 'Pencak Silat',
      category: 'Bela Diri & Karakter',
      schedule: 'Setiap Sabtu Pagi',
      desc: 'Membekali siswa dengan kemampuan bela diri khas nusantara, melatih kedisiplinan, keberanian, kekuatan fisik, dan mental pantang menyerah dalam bingkai sportivitas islami.',
      icon: 'sports_martial_arts',
      badgeColor: 'bg-emerald-deep text-white',
      image: silatImg,
      alt: 'Siswa berlatih pencak silat di halaman madrasah',
    },
    {
      title: 'Seni Hadroh & Rebana',
      category: 'Seni & Budaya Islam',
      schedule: 'Setiap Sabtu Pagi',
      desc: 'Mengenalkan kecintaan pada sholawat nabi melalui kesenian hadrah klasik, melatih kepekaan ritme, kekompakan tim, dan ekspresi seni islami yang merdu.',
      icon: 'music_note',
      badgeColor: 'bg-emerald-leaf text-white',
      image: hadrahImg,
      alt: 'Siswa bermain hadrah rebana di madrasah',
    },
    {
      title: 'Pramuka Siaga & Penggalang',
      category: 'Kepanduan & Karakter',
      schedule: 'Setiap Jumat Sore',
      desc: 'Melatih kemandirian, kedisiplinan, tali-temali, pertolongan pertama, kepedulian sosial, dan kecintaan pada alam dalam bingkai semangat kepanduan dan adab islami.',
      icon: 'explore',
      badgeColor: 'bg-emerald-deep text-white',
      image: eskulBg,
      alt: 'Kegiatan Pramuka Siswa MI Roudotutta\'lim',
    },
    {
      title: 'Paskibra',
      category: 'Nasionalisme & Kedisiplinan',
      schedule: 'Setiap Jumat Sore',
      desc: 'Membentuk siswa berjiwa patriot, penuh rasa cinta tanah air, dan berkedisiplinan tinggi melalui latihan baris-berbaris, pengibaran bendera, dan upacara resmi madrasah.',
      icon: 'flag',
      badgeColor: 'bg-gold text-ink font-semibold',
      image: paskibraImg,
      alt: 'Siswa paskibra berlatih pengibaran bendera',
    },
  ]

  return (
    <div className="w-full bg-ivory pt-24 pb-20">
      {/* Header Banner with eskul Background */}
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
          <div className="max-w-3xl animate-slide-up">
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
              <span className="block font-heading font-bold text-xl text-emerald-deep">6 Pilihan</span>
              Ekskul Aktif
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
                className="reveal-child bg-white rounded-2xl border border-border/80 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-emerald-leaf/40 transform hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div>
                  {/* Photo Cover with Category Badge & Schedule */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={act.image}
                      alt={act.alt || act.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

                    {/* Floating Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide shadow-xs ${act.badgeColor}`}>
                        {act.category}
                      </span>
                    </div>

                    {/* Floating Schedule Pill */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-[11px] font-medium bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md">
                      <span className="material-symbols-outlined text-[14px] text-gold">schedule</span>
                      <span>{act.schedule}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-deep/10 text-emerald-deep flex items-center justify-center shrink-0 group-hover:bg-emerald-deep group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-[20px]">{act.icon}</span>
                      </div>
                      <h3 className="font-heading font-bold text-lg text-ink group-hover:text-emerald-deep transition-colors leading-tight">
                        {act.title}
                      </h3>
                    </div>

                    <p className="font-body text-sm text-ink-soft leading-relaxed mt-2.5">
                      {act.desc}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 sm:px-6 pb-5 pt-0">
                  <div className="pt-3.5 border-t border-border/60 flex items-center justify-between text-xs text-ink-soft">
                    <span className="inline-flex items-center gap-1.5 text-emerald-deep font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-leaf" />
                      Tingkat Kelas 1 - 6
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-border group-hover:text-emerald-leaf group-hover:translate-x-1 transition-all">
                      arrow_forward
                    </span>
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
              Siap Mengembangkan Potensi Buah Hati Anda?
            </h3>
            <p className="text-sm text-emerald-100/90 mt-1 max-w-xl">
              Bergabunglah bersama keluarga besar MI Roudotutta'lim. Dapatkan pendidikan yang memadukan kedalaman ilmu dan keluhuran akhlak.
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
