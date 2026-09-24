import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import eskulBg from '../assets/eskul.jpg'
import hadrahImg from '../assets/eskul-hadrah.jpg'
import futsalImg from '../assets/eskul-futsal.jpg'
import silatImg from '../assets/eskul-silat.jpg'
import paskibraImg from '../assets/eskul-paskibra.jpg'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          obs.unobserve(el)
        }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

const activities = [
  {
    title: "Tahfidz Club & Tilawah",
    category: "Keagamaan & Al-Qur'an",
    icon: 'menu_book',
    desc: "Penguatan muraja'ah Juz 'Amma, pendalaman makharijul huruf, dan pembelajaran irama tartil bersama dewan asatidz — menanamkan cinta Al-Qur'an sejak dini melalui hafalan yang mengalir dan indah.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC11OoNNfMTQw4KSD1t0JIbMBmFD0yY_fYTGQSNdI2_OXOovTFAG4kVZtABk4-S_SJ0Sh03bCYnCAsj-02468km3QdO5pUlC0JZdejW7lDMuIAW6CKeHS4SGZIArSZGWTGXHJCfKwZkeVJTO-f3kK-xgPlNYyp8US4OqVunHJb9vmnwIFouc7U3x8wRbD4D2NfSYPbJ90MgeXaSjmj1AGTMtSm8zmRaB2COp6FITjdSatV-4KISBdwKuA',
    alt: "Santri menghafal Al-Qur'an",
    accent: '#D9A62B',
    tag: "Al-Qur'an",
  },
  {
    title: 'Seni Hadroh & Rebana',
    category: 'Seni & Budaya Islam',
    icon: 'music_note',
    desc: 'Kecintaan pada sholawat nabi dihidupkan lewat irama hadrah klasik — latihan kepekaan ritme, kekompakan antar anggota, dan ekspresi seni islami yang merdu dan penuh keberkahan.',
    image: hadrahImg,
    alt: 'Siswa bermain hadrah rebana',
    accent: '#1E7A42',
    tag: 'Seni Islami',
  },
  {
    title: 'Pencak Silat',
    category: 'Bela Diri & Karakter',
    icon: 'sports_martial_arts',
    desc: 'Bela diri warisan leluhur nusantara — membekali siswa dengan kekuatan fisik, keberanian yang terlatih, dan mental pantang menyerah dalam bingkai sportivitas dan akhlak islami.',
    image: silatImg,
    alt: 'Siswa berlatih pencak silat',
    accent: '#0B4A2E',
    tag: 'Bela Diri',
  },
  {
    title: 'Futsal & Olahraga',
    category: 'Olahraga & Sportivitas',
    icon: 'sports_soccer',
    desc: 'Energi positif tersalur, tubuh sehat terbentuk — latihan futsal dan kebugaran melatih koordinasi motorik, kerjasama tim, dan semangat sportivitas di lapangan madrasah.',
    image: futsalImg,
    alt: 'Siswa bermain futsal di lapangan',
    accent: '#2C8F52',
    tag: 'Olahraga',
  },
  {
    title: 'Pramuka Siaga & Penggalang',
    category: 'Kepanduan & Karakter',
    icon: 'explore',
    desc: 'Kemandirian, kedisiplinan, kepedulian sosial, dan kecintaan pada alam dibangun melalui kegiatan pramuka yang penuh petualangan, tali-temali, dan semangat tolong-menolong.',
    image: eskulBg,
    alt: 'Kegiatan pramuka siswa',
    accent: '#0B4A2E',
    tag: 'Kepanduan',
  },
  {
    title: 'Paskibra',
    category: 'Nasionalisme & Kedisiplinan',
    icon: 'flag',
    desc: 'Jiwa patriot dan cinta tanah air tumbuh dalam disiplin baris-berbaris — siswa dilatih mengemban kehormatan pengibaran bendera Merah Putih dengan tegak dan penuh kebanggaan.',
    image: paskibraImg,
    alt: 'Siswa paskibra pengibaran bendera',
    accent: '#D9A62B',
    tag: 'Nasionalisme',
  },
]

function ActivityRow({ act, index }) {
  const ref = useReveal()
  const isEven = index % 2 === 0

  return (
    <article
      ref={ref}
      className="ekskul-reveal flex flex-col lg:flex-row rounded-2xl overflow-hidden border border-border/70 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 group"
    >
      {/* Photo side */}
      <div
        className={`relative w-full lg:w-[52%] aspect-[4/3] lg:aspect-auto lg:min-h-[360px] overflow-hidden shrink-0 ${
          isEven ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        <img
          src={act.image}
          alt={act.alt}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-4">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide text-white shadow-sm"
            style={{ backgroundColor: act.accent }}
          >
            <span className="material-symbols-outlined text-[13px]">{act.icon}</span>
            {act.tag}
          </span>
        </div>
      </div>

      {/* Content side */}
      <div
        className={`flex flex-col justify-center p-8 lg:p-10 xl:p-12 ${
          isEven ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        <p
          className="text-[11px] font-bold tracking-widest uppercase mb-3"
          style={{ color: act.accent }}
        >
          {act.category}
        </p>
        <h2 className="font-heading font-bold text-2xl lg:text-[1.85rem] text-ink leading-tight mb-4">
          {act.title}
        </h2>
        <div
          className="w-10 h-[3px] mb-5 rounded-full"
          style={{ backgroundColor: act.accent }}
        />
        <p className="font-body text-sm lg:text-[0.95rem] text-ink-soft leading-relaxed">
          {act.desc}
        </p>
        <div className="mt-6 pt-5 border-t border-border/50 flex items-center gap-2 text-xs text-ink-soft">
          <span className="material-symbols-outlined text-[16px] text-emerald-leaf">groups</span>
          <span>
            Terbuka untuk siswa{' '}
            <strong className="text-ink font-semibold">Kelas 1 - 6</strong>
          </span>
        </div>
      </div>
    </article>
  )
}

export default function Ekstrakurikuler() {
  const statsRef = useReveal()
  const introRef = useReveal()
  const ctaRef = useReveal()

  return (
    <div className="w-full bg-ivory">

      {/* HERO */}
      <section className="relative min-h-[72vh] flex items-end overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <img
            src={eskulBg}
            alt="Kegiatan Ekstrakurikuler MI Roudotutta'lim"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/15" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'radial-gradient(#D9A62B 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-[1240px] mx-auto px-margin-mobile lg:px-margin pt-40 pb-0">
          <div className="max-w-3xl">
            <p className="font-body text-gold text-xs font-bold tracking-widest uppercase mb-4">
              Pengembangan Diri Siswa
            </p>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-[3.5rem] text-white leading-[1.1] tracking-tight">
              Bakat Berkembang,
              <br />
              <span className="text-gold">Karakter Terbentuk</span>
            </h1>
            <p className="mt-5 font-body text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl">
              Enam kegiatan ekstrakurikuler yang dirancang untuk menyeimbangkan kecerdasan
              spiritual, fisik, seni, dan jiwa kepemimpinan siswa madrasah.
            </p>
          </div>

          {/* Stats strip */}
          <div
            ref={statsRef}
            className="ekskul-reveal mt-12 flex flex-wrap rounded-xl overflow-hidden border border-white/10"
          >
            {[
              { value: '6', label: 'Ekskul Aktif' },
              { value: '100%', label: 'Terbimbing Pengajar' },
              { value: 'Kelas 1 - 6', label: 'Semua Jenjang' },
              { value: 'Gratis', label: 'Tanpa Biaya Tambahan' },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`flex-1 min-w-[120px] bg-white/8 backdrop-blur-sm px-6 py-4 text-center border-white/10 ${
                  i > 0 ? 'border-l' : ''
                }`}
              >
                <p className="font-heading font-bold text-xl sm:text-2xl text-gold">{s.value}</p>
                <p className="font-body text-[11px] text-white/55 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO PROSE */}
      <div
        ref={introRef}
        className="ekskul-reveal max-w-[1240px] mx-auto px-margin-mobile lg:px-margin py-16 lg:py-20"
      >
        <div className="max-w-2xl">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-emerald-deep leading-snug">
            Lebih dari Sekadar Kegiatan Tambahan
          </h2>
          <p className="font-body text-base text-ink-soft leading-relaxed mt-4">
            Di MI Roudotutta'lim, setiap ekskul adalah bagian utuh dari proses pembentukan karakter
            — bukan pelengkap jadwal. Siswa belajar bekerja dalam tim, menemukan minat terdalam
            mereka, dan membangun kepercayaan diri yang berlandaskan nilai-nilai islami.
          </p>
        </div>
      </div>

      {/* ACTIVITY ROWS */}
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin pb-20 flex flex-col gap-6">
        {activities.map((act, i) => (
          <ActivityRow key={act.title} act={act} index={i} />
        ))}
      </div>

      {/* CTA */}
      <section
        ref={ctaRef}
        className="ekskul-reveal relative overflow-hidden bg-emerald-deep"
      >
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(#D9A62B 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10 max-w-[1240px] mx-auto px-margin-mobile lg:px-margin py-16 sm:py-20 flex flex-col sm:flex-row items-center gap-8 justify-between">
          <div className="max-w-xl">
            <p className="font-body text-gold text-xs font-bold tracking-widest uppercase mb-3">
              Pendaftaran Peserta Didik Baru
            </p>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white leading-snug">
              Ananda Termasuk yang Mana?
            </h2>
            <p className="font-body text-sm text-white/70 leading-relaxed mt-3">
              Daftarkan putra-putri Anda ke MI Roudotutta'lim dan biarkan bakat mereka berkembang
              dalam lingkungan madrasah yang hangat dan berwibawa.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/ppdb"
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gold text-ink font-semibold text-sm hover:bg-[#F0D68A] active:scale-[0.98] transition-all duration-200 shadow-sm"
            >
              Info &amp; Persyaratan PPDB
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
            <Link
              to="/kontak"
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/25 text-white font-medium text-sm hover:bg-white/10 transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .ekskul-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .ekskul-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}
