
import nilaiKamiBg from '../assets/nilaikami.jpg'
import useScrollReveal, { useStaggerReveal } from '../hooks/useScrollReveal'

const values = [
  {
    num: "01",
    title: "Ikhlas",
    desc: "Bekerja, mendidik, dan menuntut ilmu semata mencari ridho Ilahi dan kemanfaatan ummat.",
    icon: "loyalty",
  },
  {
    num: "02",
    title: "Amanah",
    desc: "Menjaga titipan kepercayaan orang tua dengan integritas, transparansi, dan tanggung jawab penuh.",
    icon: "verified",
  },
  {
    num: "03",
    title: "Berakhlak",
    desc: "Menjadikan adab, sopan santun, dan keteladanan salafus shalih sebagai mahkota setiap tindakan.",
    icon: "spa",
  },
  {
    num: "04",
    title: "Berilmu",
    desc: "Mengobarkan semangat haus ilmu, kritis bernalar, serta gigih mengamalkan apa yang dipelajari.",
    icon: "auto_stories",
  },
  {
    num: "05",
    title: "Kebersamaan",
    desc: "Membangun ukhuwah islamiyah dan kehangatan rasa persaudaraan antar warga madrasah.",
    icon: "diversity_3",
  },
]

export default function ValuesBand() {
  const headingRef = useScrollReveal()
  const cardsRef = useStaggerReveal({ staggerMs: 120 })

  return (
    <section className="w-full py-space-xl lg:py-24 bg-emerald-deep text-white relative overflow-hidden" id="nilai-kami">
      {/* Photo Background Container with Dark Emerald Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={nilaiKamiBg}
          alt="Santri Berakhlak Mulia MI Roudotutta'lim"
          className="w-full h-full object-cover object-center filter brightness-50 transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/95 via-emerald-deep/92 to-emerald-deep/90"></div>
        <div className="absolute inset-0 bg-black/25"></div>
      </div>

      {/* Geometric subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-leaf/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-space-xl" ref={headingRef}>
          <span className="font-label-md text-label-md text-gold tracking-widest uppercase font-semibold">
            Pondasi Nilai Madrasah
          </span>
          <h2 className="font-heading font-bold text-headline-lg text-white mt-space-xs">
            Lima Nilai Luhur Budaya Sekolah
          </h2>
          <p className="font-body-md text-body-md text-emerald-100/90 mt-space-xs">
            Menjadi ruh penggerak bagi setiap guru, karyawan, santri, dan ikatan kekeluargaan madrasah setiap hari.
          </p>
        </div>

        {/* 5 Value Cards in responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md" ref={cardsRef}>
          {values.map((v, i) => (
            <div
              key={v.num}
              className={`reveal-child bg-ink/35 border border-emerald-leaf/25 backdrop-blur-sm rounded-2xl p-space-lg flex flex-col items-center text-center shadow-inner hover:bg-ink/50 transition-colors ${
                i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-emerald-leaf flex items-center justify-center text-gold mb-space-md shadow-sm">
                <span className="material-symbols-outlined text-[24px]">{v.icon}</span>
              </div>
              <span className="font-label-md text-label-md text-gold font-bold tracking-wider">
                {v.num}
              </span>
              <h3 className="font-heading font-semibold text-headline-sm text-white mt-1 mb-2">
                {v.title}
              </h3>
              <p className="font-body-sm text-body-sm text-emerald-100/80 leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
