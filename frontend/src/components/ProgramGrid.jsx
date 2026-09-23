
import { Link } from 'react-router-dom'
import { useStaggerReveal } from '../hooks/useScrollReveal'

const programs = [
  {
    title: "One Day One Ayat (Tahfidz Juz 'Amma)",
    desc: "Program unggulan hafalan Al-Qur'an terstruktur kelas 1-6 Juz 'Amma dan QS. Al-Mulk dengan metode talaqqi 4 langkah, muraja'ah, dan ujian tasmi'.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC11OoNNfMTQw4KSD1t0JIbMBmFD0yY_fYTGQSNdI2_OXOovTFAG4kVZtABk4-S_SJ0Sh03bCYnCAsj-02468km3QdO5pUlC0JZdejW7lDMuIAW6CKeHS4SGZIArSZGWTGXHJCfKwZkeVJTO-f3kK-xgPlNYyp8US4OqVunHJb9vmnwIFouc7U3x8wRbD4D2NfSYPbJ90MgeXaSjmj1AGTMtSm8zmRaB2COp6FITjdSatV-4KISBdwKuA",
    alt: "Santri menghafal Al-Qur'an Program One Day One Ayat",
  },
  {
    title: "Pembiasaan Adab & Nilai MARHAMAH",
    desc: "Pembudayaan kalimat thayyibah harian, salat dhuha & zuhur berjamaah, kemandirian belajar, dan penguatan 5 nilai luhur budaya madrasah.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMfA40JMXuQgp9jqUFuIyzt8Ah6vescFvm2a9kxx7yhMNvbmaZyLwI962eX1izD2ZHMs2e6ekXiCW7_d3Y5gyr54PZUmA5tPxBCk2RgTur3luPy4nakBoe4kjQRag00qkPoWTSNQzA1vSFC51lNpJtIqqce1Fx0Haam9yq1LgBHtyfs81o-webTOAZ1PHROloNUhJY4-mC6HOntuWMYAEVp24USUeycFdYIV8nbZhXEEIBZ8_bzBHwtg",
    alt: "Pembiasaan Akhlak dan Sholat Berjamaah",
  },
  {
    title: "Dwi-Bahasa: Arab & Inggris",
    desc: "Pengenalan kosakata tematik harian, percakapan ringan interaktif, dan lagu edukatif untuk menumbuhkan keberanian komunikasi dwibahasa sejak kecil.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCP5bV2Z483NJLeR1f-8BzMeD-GnCxwJ-qAaJsljLEeUp2zNMpVlzH-weyFUA5Hs3xFHkIBl-LxSZU45FW3Sp0S5C2zgwHPcG1jS7oY5MkImZIj_nYRzyohWiYjz72irVVpTDcGcu0o45Wjrf5Mwd5ARLgZwMSuB5YATXDQttaft8Z96_G3fGix78rFy86gSSsTDS_VS42X-uGI07Xa7n3WkvgCiOqB0qAjYRgc0fUFlvd2KxcBdr6rmw",
    alt: "Pembelajaran Bahasa Arab dan Inggris",
  },
  {
    title: "Sains & Numerasi Terapan",
    desc: "Eksperimen laboratorium alam sederhana, matematika kontekstual, dan pengenalan logika coding dasar untuk melatih cara berpikir analitis.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5zfyUe4aeo7HYLh_CS6TobN1j36Rca2USFuwtFIP8aA8rN6y-MWiSm6e8pIEsDs9C2uICpEF1_qpD5bodTVhwl4tjLCKaGKPGOKXn4hAIIwQjDrQvXBsW23xcMyVJhg7lEr09kj13ZGXUhnht5WRR8LGYHVnCrpgQO0haOTDDWtvmcy5PXkAoS4kKawNGlOpuNssiYGewGO9PBVA3pXS698v_AeXirbw0pqU5gxbZtRR73QnnCt5NeA",
    alt: "Eksperimen Sains & Praktik",
  },
  {
    title: "Ekstrakurikuler Seni & Pramuka",
    desc: "Pramuka madrasah, kaligrafi Islam (khat), grup rebana/hadroh, tapak suci pencak silat, dan sanggar pidato cilik (da'i cilik).",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCA4o7tQc_3UGxAt48VYKJUiwAPUnuPCUFrHYMn6BhhpADVIOnLz8-lu16siVDRF-8QL5N0EPzy8Js2IU0p2sRFkwbNmOEMLVdLloymwBIZ1YczqPC9yY8fAeAHM8N_d7VX14f6H4wqzZPIYiGyEEVXDyjXuuXH8b77w0GlpUfFArlv8Sf0CtwpJuf5eu-S0_Sq4r5J-oFvJFPFvnYLMtl120sRLh2E2XKajTzkVk9_gt0tjGIijb_LeQ",
    alt: "Ekstrakurikuler Pramuka dan Seni",
  },
  {
    title: "Kepedulian Lingkungan & Sosial",
    desc: "Program Jum'at Berkah berbagi, kebun edukasi hijau madrasah, pembiasaan pilah sampah sejak dini, dan infak peduli sesama.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBRxxJhxL9RioMcZMwJWMawOqI-CYLO4HqpWy_fuzyKV5yclmOIDD-vYJSrRBiW5-hMwv_QbrTkrqZ6zmaqeGJ_mSNEM7i2GCNVB1txVjdKEFaTezDUzNk7w0IqJ0hXZ5BVQDmfY24TxRYxDibmwXIFOGMStMpH6lq87xkKXOAJyEk5evq9ha3bx8AHFf6wHFmT3s_UzL3mh4c7Fg7ENqjZrbK3WVRIwUK5Fo3GSvLpIXbUloXp5_PEw",
    alt: "Kegiatan Menanam dan Kepedulian Lingkungan",
  },
]

export default function ProgramGrid() {
  const gridRef = useStaggerReveal({ staggerMs: 100 })

  return (
    <section className="w-full py-space-xl bg-ivory" id="program">
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div>
            <span className="font-label-md text-label-md text-emerald-leaf tracking-widest uppercase font-semibold">
              Kurikulum &amp; Pembiasaan
            </span>
            <h2 className="font-heading font-bold text-headline-lg text-emerald-deep mt-space-xs">
              6 Program Unggulan Madrasah
            </h2>
            <p className="font-body-md text-body-md text-ink-soft max-w-xl mt-space-xs">
              Dirancang secara berjenjang untuk memastikan keseimbangan antara spiritualitas Islam, kecerdasan akademis, dan kemandirian sosial.
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-emerald-leaf hover:text-emerald-deep transition-colors font-semibold"
            to="/program"
          >
            <span>Lihat silabus lengkap</span>
            <span className="material-symbols-outlined text-[18px]">north_east</span>
          </Link>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter" ref={gridRef}>
          {programs.map((item, index) => (
            <div
              key={index}
              className="reveal-child group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between border border-border/60"
            >
              <div>
                <Link to="/program" className="block relative w-full aspect-[16/10] overflow-hidden">
                  <img
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={item.image}
                  />
                </Link>
                <div className="p-space-lg flex flex-col gap-space-sm">
                  <h3 className="font-heading font-semibold text-headline-sm text-emerald-deep group-hover:text-emerald-leaf transition-colors">
                    <Link to="/program">{item.title}</Link>
                  </h3>
                  <p className="font-body-md text-body-md text-ink-soft leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
              <div className="px-space-lg pb-space-lg pt-0">
                <Link
                  className="inline-flex items-center gap-1 font-label-lg text-label-lg text-emerald-leaf group-hover:text-emerald-deep transition-colors font-semibold"
                  to="/program"
                >
                  <span>Pelajari selengkapnya</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
