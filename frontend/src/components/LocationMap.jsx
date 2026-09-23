import { useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

export default function LocationMap() {
  const [copied, setCopied] = useState(false)
  const headingRef = useScrollReveal()
  const contentRef = useScrollReveal({ threshold: 0.08 })
  const fullAddress = "Jl. Raya Barat No. 363, Desa Batujajar Barat, Kec. Batujajar, Kab. Bandung Barat, Jawa Barat 40561"
  const mapsUrl = "https://maps.app.goo.gl/UHoHr6d1mxSNtSbh7"
  const embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.835!2d107.4906084!3d-6.9176927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e54f4decd15b%3A0x4976fc9dc2c0b90d!2sMI%20Roudotutta'lim!5e0!3m2!1sid!2sid!4v1"

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section className="w-full py-space-xl lg:py-space-2xl bg-ivory-2 border-t border-border/50 scroll-mt-20 relative" id="lokasi">
      <span id="kontak" className="scroll-mt-24 absolute -top-24"></span>
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-space-xl" ref={headingRef}>
          <h2 className="font-heading font-bold text-headline-md md:text-headline-lg text-emerald-deep tracking-tight">
            Kunjungi Kampus MI Roudotutta'lim
          </h2>
          <p className="mt-space-xs font-body text-body-md text-ink-soft leading-relaxed">
            Terletak strategis di jalur utama Batujajar Barat, kami siap menyambut silaturahmi Bapak/Ibu dan calon peserta didik ke lingkungan madrasah kami.
          </p>
        </div>

        {/* Content Grid: Left Info Card & Right Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch" ref={contentRef}>
          {/* Left Column: Location Details & Contacts (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-space-lg bg-white rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex flex-col gap-space-md">
              {/* Address Item */}
              <div className="flex items-start gap-space-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-leaf/10 text-emerald-deep flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[22px]">apartment</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-headline-sm text-ink">
                    Alamat Lengkap
                  </span>
                  <p className="mt-1 font-body text-body-sm text-ink-soft leading-relaxed">
                    {fullAddress}
                  </p>
                  <button
                    onClick={handleCopy}
                    className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-leaf hover:text-emerald-deep transition-colors w-fit focus:outline-none"
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
              <div className="flex items-start gap-space-sm pt-space-md border-t border-border/60">
                <div className="w-10 h-10 rounded-xl bg-emerald-leaf/10 text-emerald-deep flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[22px]">contact_support</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-headline-sm text-ink">
                    Kontak Layanan
                  </span>
                  <div className="mt-2 flex flex-col gap-2 text-body-sm">
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
            <div className="pt-space-md border-t border-border/80">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-deep text-white font-label-md text-label-md hover:bg-emerald-leaf active:scale-[0.98] transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                <span>Buka Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Embed (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl border border-border bg-white overflow-hidden shadow-sm">
            {/* Map Top Bar */}
            <div className="px-5 py-3 bg-slate-50 border-b border-border flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-leaf animate-pulse"></span>
                <span className="font-heading font-semibold text-headline-sm text-ink text-sm">
                  Peta Titik Lokasi Madrasah
                </span>
              </div>
            </div>

            {/* Map Iframe Container */}
            <div className="relative w-full flex-grow min-h-[380px] lg:min-h-[440px] bg-slate-100">
              <iframe
                title="Peta Lokasi MI Roudotutta'lim Batujajar"
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
      </div>
    </section>
  )
}
