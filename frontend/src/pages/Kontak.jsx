import { useState } from 'react'
import { Link } from 'react-router-dom'
import kontakBg from '../assets/kontak.jpg'
import useScrollReveal, { useStaggerReveal } from '../hooks/useScrollReveal'

export default function Kontak() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: 'Pertanyaan PPDB & Biaya',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  const infoCardsRef = useStaggerReveal({ staggerMs: 90 })
  const mapHeadingRef = useScrollReveal()
  const mapGridRef = useScrollReveal({ threshold: 0.08 })
  const formSectionRef = useScrollReveal({ threshold: 0.08 })

  const fullAddress = "Jl. Raya Barat No. 363, Desa Batujajar Barat, Kec. Batujajar, Kab. Bandung Barat, Jawa Barat 40561"
  const mapsUrl = "https://maps.app.goo.gl/UHoHr6d1mxSNtSbh7"
  const embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.835!2d107.4906084!3d-6.9176927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e54f4decd15b%3A0x4976fc9dc2c0b90d!2sMI%20Roudotutta'lim!5e0!3m2!1sid!2sid!4v1"

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const waText = encodeURIComponent(
      `Assalamu'alaikum, saya ${formData.name}. Saya ingin menanyakan tentang ${formData.category}:\n${formData.message}\nNo. HP: ${formData.phone}`
    )
    window.open(`https://wa.me/6289636058110?text=${waText}`, '_blank')
    setSubmitted(true)
  }

  return (
    <div className="w-full bg-ivory pt-24 pb-20">
      {/* Header Banner with Custom Photo Background */}
      <section className="relative text-white py-18 sm:py-24 lg:py-28 overflow-hidden bg-emerald-deep shadow-md">
        {/* Full-bleed Photo Background Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={kontakBg}
            alt="Suasana Santri MI Roudotutta'lim"
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
              Kontak &amp; Layanan Madrasah
            </h1>
            <p className="mt-4 text-base sm:text-lg text-emerald-50/90 font-body leading-relaxed max-w-2xl">
              Kami siap melayani kebutuhan informasi wali murid, pendaftaran siswa baru, maupun audiensi kunjungan silaturahmi ke lingkungan madrasah kami.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin mt-12 space-y-16">
        {/* 4 Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" ref={infoCardsRef}>
          <div className="reveal-child bg-white p-6 rounded-2xl border border-border shadow-xs hover:border-emerald-leaf/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-deep/10 text-emerald-deep flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[26px]">location_on</span>
            </div>
            <h3 className="font-heading font-bold text-base text-ink mb-1">Alamat Madrasah</h3>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              Jl. Raya Barat No. 363, Desa Batujajar Barat, Kec. Batujajar, Kab. Bandung Barat, Jawa Barat 40561
            </p>
          </div>

          <div className="reveal-child bg-white p-6 rounded-2xl border border-border shadow-xs hover:border-emerald-leaf/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-leaf/10 text-emerald-leaf flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[26px]">chat</span>
            </div>
            <h3 className="font-heading font-bold text-base text-ink mb-1">WhatsApp Resmi</h3>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              +62 896-3605-8110 (Bu Fariz)<br />
              <span className="text-xs text-emerald-leaf font-medium">Respon Cepat Jam Kerja</span>
            </p>
          </div>

          <div className="reveal-child bg-white p-6 rounded-2xl border border-border shadow-xs hover:border-emerald-leaf/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gold/15 text-emerald-deep flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[26px]">schedule</span>
            </div>
            <h3 className="font-heading font-bold text-base text-ink mb-1">Jam Pelayanan</h3>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              Senin – Kamis: 07.00 – 14.30<br />
              Jumat – Sabtu: 07.00 – 11.30 WIB
            </p>
          </div>

          <div className="reveal-child bg-white p-6 rounded-2xl border border-border shadow-xs hover:border-emerald-leaf/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-deep/10 text-emerald-deep flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[26px]">mail</span>
            </div>
            <h3 className="font-heading font-bold text-base text-ink mb-1">Email Resmi</h3>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              miroudotuttalim@gmail.com
            </p>
          </div>
        </div>

        {/* Interactive Maps Section (Matches LocationMap layout exactly) */}
        <section className="space-y-8" id="peta-lokasi">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto" ref={mapHeadingRef}>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-leaf">Titik Koordinat &amp; Panduan Arah</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-emerald-deep mt-1">
              Kunjungi Kampus MI Roudotutta'lim
            </h2>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed mt-2">
              Terletak strategis di jalur utama Batujajar Barat, kami siap menyambut silaturahmi Bapak/Ibu dan calon peserta didik ke lingkungan madrasah kami.
            </p>
          </div>

          {/* Content Grid: Left Info Card & Right Interactive Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" ref={mapGridRef}>
            {/* Left Column: Location Details & Contacts (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-white rounded-2xl border border-border p-6 sm:p-7 shadow-xs">
              <div className="flex flex-col gap-6">
                {/* Address Item */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-leaf/10 text-emerald-deep flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[24px]">apartment</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading font-bold text-base text-ink">
                      Alamat Lengkap
                    </span>
                    <p className="mt-1 font-body text-xs sm:text-sm text-ink-soft leading-relaxed">
                      {fullAddress}
                    </p>
                    <button
                      onClick={handleCopy}
                      type="button"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-leaf hover:text-emerald-deep transition-colors w-fit focus:outline-none"
                      aria-label="Salin alamat madrasah"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {copied ? 'check_circle' : 'content_copy'}
                      </span>
                      <span>{copied ? 'Alamat Berhasil Disalin!' : 'Salin Alamat'}</span>
                    </button>
                  </div>
                </div>

                {/* Contacts */}
                <div className="flex items-start gap-4 pt-5 border-t border-border/70">
                  <div className="w-11 h-11 rounded-xl bg-emerald-leaf/10 text-emerald-deep flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[24px]">contact_support</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading font-bold text-base text-ink">
                      Kontak Layanan
                    </span>
                    <div className="mt-2 flex flex-col gap-2.5 text-xs sm:text-sm">
                      <a
                        href="https://wa.me/6289636058110"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-emerald-leaf hover:text-emerald-deep font-medium transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">chat</span>
                        <span>+62 896-3605-8110 (WhatsApp)</span>
                      </a>
                      <a
                        href="mailto:miroudotuttalim@gmail.com"
                        className="inline-flex items-center gap-2 text-ink-soft hover:text-emerald-deep transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">mail</span>
                        <span>miroudotuttalim@gmail.com</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Action: Buka Google Maps */}
              <div className="pt-5 border-t border-border/80">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-deep text-white font-semibold text-sm hover:bg-emerald-leaf active:scale-[0.98] transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                  <span>Buka Google Maps</span>
                </a>
              </div>
            </div>

            {/* Right Column: Google Maps Interactive Embed (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col rounded-2xl border border-border bg-white overflow-hidden shadow-xs">
              {/* Map Top Bar */}
              <div className="px-5 py-3.5 bg-slate-50 border-b border-border flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-leaf animate-pulse"></span>
                  <span className="font-heading font-semibold text-sm text-ink">
                    Peta Titik Lokasi Madrasah
                  </span>
                </div>
              </div>

              {/* Map Iframe Container */}
              <div className="relative w-full flex-grow min-h-[380px] lg:min-h-[440px] bg-slate-100">
                <iframe
                  title="Peta Titik Lokasi Madrasah MI Roudotutta'lim"
                  src={embedUrl}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Map Bottom Caption */}
              <div className="px-5 py-3 bg-white border-t border-border/80 flex items-center justify-between text-xs text-ink-soft">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-gold">verified</span>
                  <span>MI Roudotutta'lim Batujajar</span>
                </span>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-leaf hover:underline font-medium inline-flex items-center gap-1"
                >
                  <span>Lihat peta lebih besar</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Guidance Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" ref={formSectionRef}>
          {/* Form Konsultasi */}
          <div className="lg:col-span-7 bg-white p-8 lg:p-10 rounded-2xl border border-border shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-leaf">Kirim Pertanyaan</span>
            <h2 className="text-2xl font-heading font-bold text-emerald-deep mt-1 mb-2">
              Formulir Konsultasi Online
            </h2>
            <p className="text-xs sm:text-sm text-ink-soft mb-6 leading-relaxed">
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
                  placeholder="Contoh: 089636058110"
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

          {/* Panduan Kunjungan Langsung */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-ivory-2 p-6 lg:p-8 rounded-2xl border border-border/80">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="material-symbols-outlined text-[24px] text-gold">verified</span>
                <h3 className="font-heading font-bold text-lg text-emerald-deep">
                  Panduan Kunjungan Langsung
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed mb-4">
                Wali murid dipersilakan berkunjung langsung pada jam dinas untuk melihat lingkungan kelas, sarana ibadah, dan fasilitas belajar madrasah.
              </p>

              <div className="space-y-3 border-t border-border/60 pt-4">
                <div className="flex items-start gap-2.5 text-xs text-ink-soft">
                  <span className="material-symbols-outlined text-emerald-leaf text-[18px] shrink-0 mt-0.5">check_circle</span>
                  <span>Berpakaian sopan dan menutup aurat sesuai norma lingkungan madrasah.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-ink-soft">
                  <span className="material-symbols-outlined text-emerald-leaf text-[18px] shrink-0 mt-0.5">check_circle</span>
                  <span>Melapor terlebih dahulu ke pos keamanan atau meja resepsionis Tata Usaha.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-ink-soft">
                  <span className="material-symbols-outlined text-emerald-leaf text-[18px] shrink-0 mt-0.5">check_circle</span>
                  <span>Area parkir kendaraan roda 2 dan roda 4 tersedia aman di lingkungan madrasah.</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-border shadow-xs">
              <h4 className="font-heading font-bold text-sm text-emerald-deep mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-emerald-leaf">support_agent</span>
                <span>Konfirmasi Sebelum Berkunjung</span>
              </h4>
              <p className="text-xs text-ink-soft leading-relaxed mb-4">
                Agar kunjungan Anda dapat didampingi dengan optimal oleh pimpinan atau dewan guru, disarankan untuk mengonfirmasi rencana kedatangan via WhatsApp terlebih dahulu.
              </p>
              <a
                href="https://wa.me/6289636058110?text=Assalamu'alaikum%20Bapak/Ibu,%20saya%20bermaksud%20mengagendakan%20kunjungan%20ke%20MI%20Roudotutta'lim"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl border border-emerald-deep/20 text-emerald-deep hover:bg-emerald-deep/5 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Konfirmasi Kunjungan via WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
