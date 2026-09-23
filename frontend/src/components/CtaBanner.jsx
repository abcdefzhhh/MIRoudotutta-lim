
import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'

export default function CtaBanner() {
  const sectionRef = useScrollReveal()

  return (
    <section
      className="w-full py-space-xl lg:py-24 bg-gradient-to-br from-emerald-deep via-emerald-deep to-emerald-leaf text-white relative overflow-hidden"
      id="ppdb"
      ref={sectionRef}
    >
      {/* Atmospheric glows */}
      <div className="absolute top-0 right-10 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-leaf/30 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-[1100px] mx-auto px-margin-mobile lg:px-margin relative z-10 text-center flex flex-col items-center">
        {/* Headline */}
        <h2 className="font-heading font-bold text-headline-lg lg:text-display-lg text-white max-w-3xl leading-tight">
          Penerimaan Peserta Didik Baru (PPDB) Telah Dibuka
        </h2>

        {/* Description */}
        <p className="font-body-lg text-body-lg text-emerald-100/90 max-w-2xl mt-space-md leading-relaxed">
          Kuota terbatas untuk 3 rombongan belajar. Mari persiapkan masa depan putra-putri Anda dalam ekosistem pendidikan yang menyeimbangkan ilmu dunia dan akhirat. Daftarkan segera atau konsultasikan kebutuhan pendidikan ananda bersama tim penerimaan kami.
        </p>

        {/* Action Buttons */}
        <div className="mt-space-xl flex flex-wrap items-center justify-center gap-space-md w-full">
          {/* Main Gold CTA Button */}
          <Link
            className="inline-flex items-center justify-center gap-space-sm font-label-lg text-label-lg px-8 py-4 rounded-full bg-gold text-ink font-bold shadow-lg hover:bg-gold-soft active:scale-[0.98] transition-all transform hover:-translate-y-0.5"
            to="/ppdb"
          >
            <span className="material-symbols-outlined text-[20px] text-ink">assignment</span>
            <span>Informasi &amp; Persyaratan PPDB</span>
          </Link>

          {/* Secondary WhatsApp Button */}
          <a
            className="inline-flex items-center justify-center gap-space-sm font-label-lg text-label-lg px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md active:scale-[0.98] transition-all"
            href="https://wa.me/6289636058110"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span>Tanya via WhatsApp</span>
          </a>
        </div>

        {/* Supporting Guarantee / Notice */}
        <div className="mt-space-lg flex items-center justify-center gap-space-lg text-emerald-100/95 font-label-md text-label-md flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-gold text-[18px]">check_circle</span>
            <span>Beasiswa Prestasi &amp; Tahfidz Tersedia</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-gold text-[18px]">check_circle</span>
            <span>Proses Seleksi Edukatif &amp; Ramah Anak</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-gold text-[18px]">check_circle</span>
            <span>Fasilitas Lengkap &amp; Bebas Uang Gedung Tambahan</span>
          </div>
        </div>
      </div>
    </section>
  )
}
