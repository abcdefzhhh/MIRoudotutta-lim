import { useState } from 'react'
import { Link } from 'react-router-dom'
import useScrollReveal, { useStaggerReveal } from '../hooks/useScrollReveal'

export default function Kontak() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: 'Pertanyaan PPDB',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const infoCardsRef = useStaggerReveal({ staggerMs: 100 })
  const formRef = useScrollReveal()
  const mapRef = useScrollReveal({ threshold: 0.08 })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Open WhatsApp with pre-filled message
    const waText = encodeURIComponent(
      `Assalamu'alaikum, saya ${formData.name}. Saya ingin menanyakan tentang ${formData.category}: ${formData.message}`
    )
    window.open(`https://wa.me/628123456789?text=${waText}`, '_blank')
    setSubmitted(true)
  }

  return (
    <div className="w-full bg-ivory pt-24 pb-20">
      {/* Header Banner */}
      <section className="bg-emerald-deep text-white py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D9A62B_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin relative z-10">
          <nav className="flex items-center gap-2 text-xs font-medium text-emerald-100/80 mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-gold font-semibold">Kontak &amp; Lokasi</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-tight">
              Kontak &amp; Layanan Madrasah
            </h1>
            <p className="mt-4 text-base sm:text-lg text-emerald-50/90 font-body leading-relaxed max-w-2xl">
              Kami siap melayani kebutuhan informasi wali murid, pendaftaran Siswa baru, maupun audiensi kunjungan ke madrasah.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin mt-12 space-y-12">
        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" ref={infoCardsRef}>
          <div className="reveal-child bg-white p-6 rounded-2xl border border-border shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-deep/10 text-emerald-deep flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[26px]">location_on</span>
            </div>
            <h3 className="font-heading font-bold text-base text-ink mb-1">Alamat Madrasah</h3>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              Jl. KH. Hasyim Asy'ari No. 45, Roudotul Ilmi, Jawa Timur, Indonesia (65100)
            </p>
          </div>

          <div className="reveal-child bg-white p-6 rounded-2xl border border-border shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-leaf/10 text-emerald-leaf flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[26px]">chat</span>
            </div>
            <h3 className="font-heading font-bold text-base text-ink mb-1">WhatsApp Resmi</h3>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              +62 812-3456-7890<br />
              <span className="text-xs text-emerald-leaf font-medium">Respon Cepat Jam Kerja</span>
            </p>
          </div>

          <div className="reveal-child bg-white p-6 rounded-2xl border border-border shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-gold/15 text-emerald-deep flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[26px]">schedule</span>
            </div>
            <h3 className="font-heading font-bold text-base text-ink mb-1">Jam Pelayanan</h3>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              Senin – Kamis: 07.00 – 14.30<br />
              Jumat – Sabtu: 07.00 – 11.30 WIB
            </p>
          </div>

          <div className="reveal-child bg-white p-6 rounded-2xl border border-border shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-deep/10 text-emerald-deep flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[26px]">mail</span>
            </div>
            <h3 className="font-heading font-bold text-base text-ink mb-1">Email Resmi</h3>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              info@miroudotuttalim.sch.id<br />
              tatausaha@miroudotuttalim.sch.id
            </p>
          </div>
        </div>

        {/* Contact Form & Map split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 lg:p-10 rounded-2xl border border-border shadow-sm" ref={formRef}>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-leaf">Kirim Pertanyaan</span>
            <h2 className="text-2xl font-heading font-bold text-emerald-deep mt-1 mb-2">
              Formulir Konsultasi Online
            </h2>
            <p className="text-xs sm:text-sm text-ink-soft mb-6">
              Silakan tuliskan nama dan pertanyaan Anda. Sistem akan menghubungkan Anda langsung dengan layanan Tata Usaha dan Humas via WhatsApp resmi madrasah.
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-600 text-[24px]">check_circle</span>
                <div>
                  <span className="font-semibold block">Pesan Berhasil Disiapkan!</span>
                  Jendela WhatsApp madrasah telah dibuka. Anda dapat langsung mengirimkan pesan tersebut.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Nama Lengkap Orang Tua / Wali *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Bapak Hendra Kusuma"
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-emerald-leaf/30 focus:border-emerald-leaf outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Nomor Telepon / WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Contoh: 081234567890"
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-emerald-leaf/30 focus:border-emerald-leaf outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Topik Pertanyaan
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-emerald-leaf/30 focus:border-emerald-leaf outline-none transition-all bg-white"
                >
                  <option>Pertanyaan PPDB &amp; Biaya</option>
                  <option>Program Tahfidz &amp; Kurikulum</option>
                  <option>Jadwal Kunjungan Madrasah</option>
                  <option>Administrasi / Legalisir Dokumen</option>
                  <option>Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Isi Pesan / Pertanyaan *
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tuliskan pertanyaan atau informasi yang ingin Anda ketahui..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-emerald-leaf/30 focus:border-emerald-leaf outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-deep text-white font-semibold text-sm hover:bg-emerald-leaf transition-colors active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
                <span>Kirim Pesan ke WhatsApp Madrasah</span>
              </button>
            </form>
          </div>

          {/* Map Preview & Details */}
          <div className="lg:col-span-5 space-y-6" ref={mapRef}>
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
              <h3 className="font-heading font-bold text-lg text-emerald-deep mb-3">
                Denah Lokasi Kampus
              </h3>
              <div className="w-full h-64 bg-ivory-2 rounded-xl border border-border flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
                <div className="w-14 h-14 rounded-full bg-emerald-deep text-white flex items-center justify-center mb-3 shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">explore</span>
                </div>
                <h4 className="font-heading font-bold text-sm text-ink mb-1">
                  Kampus Asri MI Roudotutta'lim
                </h4>
                <p className="text-xs text-ink-soft max-w-xs mb-4">
                  Berlokasi strategis, tenang, bebas kebisingan jalan raya, dan mudah diakses transportasi umum.
                </p>
                <a
                  href="https://maps.google.com/?q=MI+Roudotutta'lim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-emerald-deep text-white text-xs font-semibold hover:bg-emerald-leaf transition-colors shadow-xs inline-flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  <span>Buka di Google Maps</span>
                </a>
              </div>
            </div>

            <div className="bg-ivory-2 p-6 rounded-2xl border border-border/80">
              <h4 className="font-heading font-bold text-sm text-emerald-deep mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-gold">verified</span>
                <span>Panduan Kunjungan Langsung</span>
              </h4>
              <p className="text-xs text-ink-soft leading-relaxed mb-3">
                Wali murid dipersilakan berkunjung langsung pada jam dinas untuk melihat lingkungan kelas dan fasilitas madrasah. Mohon berpakaian rapi dan menutup aurat sesuai tata tertib lingkungan madrasah.
              </p>
              <div className="text-[11px] font-semibold text-emerald-leaf">
                ✓ Parkir roda 2 &amp; roda 4 tersedia luas dan aman
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
