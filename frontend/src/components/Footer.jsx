import { Link } from 'react-router-dom'
import schoolLogo from '../assets/logo.png'

export default function Footer() {
  return (
    <footer className="w-full bg-emerald-deep text-white pt-space-xl pb-space-lg" id="kontak">
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin grid grid-cols-1 gap-gutter mb-space-xl md:grid-cols-3">
        {/* Col 1: Identity & Socials */}
        <div className="flex flex-col gap-space-md">
          <div className="flex items-center gap-space-sm">
            <img
              src={schoolLogo}
              alt="Logo MI Roudotutta'lim"
              className="h-10 w-auto object-contain drop-shadow-sm"
            />
            <span className="font-heading font-bold text-headline-sm text-white tracking-tight">
              MI Roudotutta'lim
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-emerald-100/85 leading-relaxed">
            Lembaga pendidikan dasar Islam yang mengintegrasikan kurikulum nasional dengan pembinaan akidah, akhlak mulia, serta hafalan Al-Qur'an.
          </p>
          <div className="flex items-center gap-space-sm pt-space-xs">
            <a
              className="w-9 h-9 rounded-full bg-ink/60 border border-emerald-leaf/30 flex items-center justify-center text-white hover:bg-emerald-leaf transition-colors"
              href="#"
              aria-label="Instagram"
            >
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            </a>
            <a
              className="w-9 h-9 rounded-full bg-ink/60 border border-emerald-leaf/30 flex items-center justify-center text-white hover:bg-emerald-leaf transition-colors"
              href="#"
              aria-label="YouTube"
            >
              <span className="material-symbols-outlined text-[18px]">smart_display</span>
            </a>
            <a
              className="w-9 h-9 rounded-full bg-ink/60 border border-emerald-leaf/30 flex items-center justify-center text-white hover:bg-emerald-leaf transition-colors"
              href="https://wa.me/6289636058110"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
            </a>
          </div>
        </div>

        {/* Col 2: Navigasi Madrasah */}
        <div className="flex flex-col gap-space-sm">
          <span className="font-heading font-semibold text-headline-sm text-gold">
            Navigasi Madrasah
          </span>
          <ul className="flex flex-col gap-space-xs">
            <li className="font-body-sm text-body-sm text-emerald-100/80 hover:text-white transition-colors">
              <Link to="/visi-misi">Profil &amp; Visi Misi</Link>
            </li>
            <li className="font-body-sm text-body-sm text-emerald-100/80 hover:text-white transition-colors">
              <Link to="/guru-staf">Guru &amp; Tenaga Kependidikan</Link>
            </li>
            <li className="font-body-sm text-body-sm text-emerald-100/80 hover:text-white transition-colors">
              <Link to="/program">Tahfidz &amp; Program Unggulan</Link>
            </li>
            <li className="font-body-sm text-body-sm text-emerald-100/80 hover:text-white transition-colors">
              <Link to="/program#nilai-kami">Nilai &amp; Budaya Sekolah</Link>
            </li>
            <li className="font-body-sm text-body-sm text-emerald-100/80 hover:text-white transition-colors">
              <Link to="/ekstrakurikuler">Ekstrakurikuler &amp; Bakat</Link>
            </li>
            <li className="font-body-sm text-body-sm text-emerald-100/80 hover:text-white transition-colors">
              <Link to="/berita">Warta &amp; Berita</Link>
            </li>
            <li className="font-body-sm text-body-sm text-emerald-100/80 hover:text-white transition-colors">
              <Link to="/kontak">Peta &amp; Kontak Madrasah</Link>
            </li>
            <li className="font-body-sm text-body-sm text-emerald-100/80 hover:text-white transition-colors">
              <Link to="/ppdb" className="text-gold font-semibold hover:underline">Penerimaan Siswa Baru (PPDB)</Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Kontak & Lokasi */}
        <div className="flex flex-col gap-space-sm">
          <span className="font-heading font-semibold text-headline-sm text-gold">
            Kontak &amp; Lokasi
          </span>
          <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-emerald-100/80">
            <p className="flex items-start gap-space-xs leading-relaxed">
              <span className="material-symbols-outlined text-[18px] text-gold shrink-0 mt-0.5">
                location_on
              </span>
              <a
                href="https://maps.app.goo.gl/GdjG1K8tnA83nMzQ8"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Jl. Raya Barat No. 363, Desa Batujajar Barat, Kec. Batujajar, Kab. Bandung Barat, Jawa Barat 40561
              </a>
            </p>
            <p className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[18px] text-gold shrink-0">call</span>
              <span>+62 896-3605-8110 (Bu Fariz) </span>
            </p>
            <p className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[18px] text-gold shrink-0">mail</span>
              <span>miroudotuttalim@gmail.com</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin pt-space-md border-t border-emerald-leaf/30 flex flex-col sm:flex-row items-center justify-between gap-space-sm font-body-sm text-body-sm text-emerald-100/80">
        <p>© 2026 MI Roudotutta'lim. Hak cipta dilindungi.</p>
        <p className="font-label-md text-label-md">
          Madrasah Ibtidaiyah Unggul &amp; Berkarakter Islami
        </p>
      </div>
    </footer>
  )
}
