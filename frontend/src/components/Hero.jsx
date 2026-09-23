
export default function Hero() {
  return (
    <>
      {/* SECTION 1: HERO (Full-bleed Background Image with Dark Tint Overlay) */}
      <section id="beranda" className="relative w-full overflow-hidden bg-emerald-deep min-h-[580px] lg:min-h-[640px] flex flex-col justify-center">
        {/* Full-bleed School Building Background */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Gedung MI Roudotutta'lim"
            className="w-full h-full object-cover object-center filter brightness-90"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxMR2fdmOgkkLfWIunJ8ftmjloCy53YtTTukH4zLdzTKLTHp8llQ0JR-X0-roeZIa_a7Pc0mpiNEkuguXUsDRAsWtRzIzbOYo2u0vklqxKxLbg-v_jaDgjyjEzYXwmMtJzII4eQYpYZX1x-Y3z0glc6qMYUSCO0bqKGMkTTjSxzzl21SsD7mvHifr-X0CtAe9YfQ2CahvT3nhLrSsIxu8seEDm9-4qehUTeQMVOgOAD6sgiCSPcz41WQG-MOph5R3Abuo"
          />
          {/* Dark green elegant translucent gradient overlay for high contrast readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-emerald-deep/90 to-emerald-deep/80"></div>
          <div className="absolute inset-0 bg-black/25"></div>
        </div>

        <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin relative z-10 py-16 lg:py-24 w-full">
          <div className="max-w-3xl flex flex-col items-start gap-space-md animate-slide-up">
            {/* Main Title: Elegant White Serif */}
            <h1 className="text-headline-lg lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.18] drop-shadow-sm font-heading">
              Menumbuhkan Generasi Berakhlak Mulia, Cerdas, dan{' '}
              <span className="text-gold font-bold">Berhati Qur'ani</span>
            </h1>

            {/* Warm Editorial Subtitle: Soft Ivory */}
            <p className="font-body-lg text-body-lg text-emerald-50/90 max-w-2xl leading-relaxed">
              Selamat datang di MI Roudotutta'lim. Kami hadir menyemai benih kebaikan, mengintegrasikan adab mulia, cinta Al-Qur'an, dan kurikulum nasional terpadu dalam atmosfer belajar yang penuh kasih sayang dan asri bagi ananda tercinta.
            </p>

            {/* CTAs: Gold Primary & White Outline Secondary */}
            <div className="flex flex-wrap items-center gap-space-md pt-space-sm w-full sm:w-auto">
              <a
                className="inline-flex items-center justify-center gap-space-sm font-label-lg text-label-lg px-8 py-3.5 rounded-full bg-gold text-ink font-bold shadow-lg hover:bg-gold-soft active:scale-[0.98] transition-all transform hover:-translate-y-1 hover:shadow-xl"
                href="#ppdb"
              >
                <span>Daftar PPDB Online</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
              <a
                className="inline-flex items-center justify-center gap-space-sm font-label-lg text-label-lg px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md active:scale-[0.98] transition-all transform hover:-translate-y-0.5"
                href="#tentang-kami"
              >
                <span className="material-symbols-outlined text-[18px] text-gold">explore</span>
                <span>Kenali Madrasah Kami</span>
              </a>
            </div>

            {/* Micro Badge Trust */}
            <div className="flex items-center gap-space-sm pt-space-xs text-emerald-100/85 animate-fade-in">
              <span
                className="material-symbols-outlined text-gold-soft text-[20px] animate-pulse-subtle"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="font-label-md text-label-md">
                Terakreditasi A (Unggul) oleh Badan Akreditasi Nasional Sekolah/Madrasah
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Metric Bar Section (Key Metrics) */}
      <section className="relative z-20 -mt-10 lg:-mt-12 max-w-[1240px] mx-auto px-margin-mobile lg:px-margin w-full animate-slide-up">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter bg-white rounded-2xl p-space-lg shadow-xl border border-border/60">
          {/* Metric 1 */}
          <div className="flex flex-col items-center sm:items-start p-space-sm rounded-xl hover:bg-emerald-50/40 transition-all duration-300 transform hover:-translate-y-1 cursor-default">
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-headline-lg text-emerald-deep tracking-tight font-bold">600</span>
              <span className="font-heading text-headline-md text-emerald-leaf font-bold">+</span>
            </div>
            <span className="font-label-lg text-label-lg text-ink mt-1 font-semibold">Siswa Aktif</span>
            <span className="font-body-sm text-[0.8rem] text-ink-soft">Putra &amp; Putri Shalih</span>
          </div>

          {/* Metric 2 */}
          <div className="flex flex-col items-center sm:items-start p-space-sm rounded-xl hover:bg-emerald-50/40 transition-all duration-300 transform hover:-translate-y-1 cursor-default">
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-headline-lg text-emerald-deep tracking-tight font-bold">36 </span>
              <span className="font-heading text-headline-md text-emerald-leaf font-bold">+</span>
            </div>
            <span className="font-label-lg text-label-lg text-ink mt-1 font-semibold">Guru & Tenaga Pendidik</span>
            <span className="font-body-sm text-[0.8rem] text-ink-soft">Pendampingan Intensif</span>
          </div>

          {/* Metric 3 */}
          <div className="flex flex-col items-center sm:items-start p-space-sm rounded-xl hover:bg-emerald-50/40 transition-all duration-300 transform hover:-translate-y-1 cursor-default">
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-headline-lg text-emerald-leaf tracking-tight font-bold">A</span>
              <span className="font-heading text-headline-sm text-gold font-bold">Unggul</span>
            </div>
            <span className="font-label-lg text-label-lg text-ink mt-1 font-semibold">Akreditasi BAN-S/M</span>
            <span className="font-body-sm text-[0.8rem] text-ink-soft">Standar Mutu Nasional</span>
          </div>

          {/* Metric 4 */}
          <div className="flex flex-col items-center sm:items-start p-space-sm rounded-xl hover:bg-emerald-50/40 transition-all duration-300 transform hover:-translate-y-1 cursor-default">
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-headline-lg text-emerald-deep tracking-tight font-bold">25</span>
              <span className="font-heading text-headline-md text-emerald-leaf font-bold">+</span>
            </div>
            <span className="font-label-lg text-label-lg text-ink mt-1 font-semibold">Tahun Mengabdi</span>
            <span className="font-body-sm text-[0.8rem] text-ink-soft">Khidmah Pendidikan Islam</span>
          </div>
        </div>
      </section>
    </>
  )
}
