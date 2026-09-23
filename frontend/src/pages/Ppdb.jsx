import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Ppdb() {
  const [formData, setFormData] = useState({
    childName: '',
    childGender: 'Laki-laki',
    parentName: '',
    phone: '',
    previousSchool: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = encodeURIComponent(
      `Assalamu'alaikum Panitia PPDB MI Roudotutta'lim,\nSaya bermaksud mendaftarkan calon Siswa baru:\n- Nama Calon Siswa: ${formData.childName}\n- Jenis Kelamin: ${formData.childGender}\n- Asal Sekolah/TK: ${formData.previousSchool || '-'}\n- Nama Orang Tua/Wali: ${formData.parentName}\n- No. WhatsApp: ${formData.phone}\n- Catatan: ${formData.notes || '-'}`
    )
    window.open(`https://wa.me/628123456789?text=${text}`, '_blank')
    setSubmitted(true)
  }

  const steps = [
    {
      num: '01',
      title: 'Pengisian Formulir',
      desc: 'Orang tua mengisi biodata calon Siswa secara online atau datang langsung ke ruang panitia PPDB madrasah.',
      icon: 'edit_note',
    },
    {
      num: '02',
      title: 'Observasi & Wawancara',
      desc: 'Observasi ramah anak untuk memetakan kesiapan motorik, kognitif, dan pengenalan huruf hijaiyah tanpa tekanan ujian.',
      icon: 'psychology',
    },
    {
      num: '03',
      title: 'Pengumuman Hasil',
      desc: 'Pemberitahuan hasil penempatan kelas dan kesiapan belajar via WhatsApp resmi serta papan pengumuman madrasah.',
      icon: 'campaign',
    },
    {
      num: '04',
      title: 'Daftar Ulang & Orientasi',
      desc: 'Penyelesaian administrasi seragam, buku mutaba\'ah, dan pembagian jadwal Matsama (Masa Ta\'aruf Siswa Madrasah).',
      icon: 'how_to_reg',
    },
  ]

  const requirements = [
    'Mengisi Formulir Pendaftaran Lengkap',
    'Fotokopi Akta Kelahiran Calon Siswa (2 Lembar)',
    'Fotokopi Kartu Keluarga (KK) & KTP Kedua Orang Tua (2 Lembar)',
    'Pas Foto Berwarna Terbaru Ukuran 3x4 (4 Lembar, background merah/biru)',
    'Fotokopi Ijazah / Surat Keterangan Lulus dari TK / RA / PAUD (jika ada)',
    'Fotokopi Kartu KIP / PKH (khusus jalur beasiswa afirmasi jika memiliki)',
  ]

  return (
    <div className="w-full bg-ivory pt-24 pb-20">
      {/* Header Banner */}
      <section className="bg-emerald-deep text-white py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D9A62B_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin relative z-10">
          <nav className="flex items-center gap-2 text-xs font-medium text-emerald-100/80 mb-4">
            <Link to="/" className="hover:text-gold transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-gold font-semibold">Penerimaan Siswa Baru (PPDB)</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-tight">
              Penerimaan Peserta Didik Baru (PPDB)
            </h1>
            <p className="mt-4 text-base sm:text-lg text-emerald-50/90 font-body leading-relaxed max-w-2xl">
              Selamat datang calon wali murid. Mari bersama mendidik ananda menjadi pribadi yang shalih, berakhlak mulia, dan unggul dalam ilmu pengetahuan.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin mt-12 space-y-16">
        {/* Wave Banner */}
        <section className="bg-white rounded-2xl border border-border p-6 lg:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/20 text-emerald-deep flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px] text-emerald-deep">verified</span>
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-leaf/10 text-emerald-deep font-bold text-xs uppercase tracking-wider">
                Gelombang 1 Dibuka
              </span>
              <h3 className="font-heading font-bold text-lg text-ink mt-1">
                Pendaftaran Periode Awal Masih Tersedia
              </h3>
              <p className="text-xs sm:text-sm text-ink-soft">
                Kuota kelas terbatas (maksimal 28 Siswa per rombel) demi efektivitas pendampingan belajar ananda.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-4 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
            <a
              href="#formulir"
              className="px-6 py-3 rounded-full bg-emerald-deep text-white text-xs sm:text-sm font-semibold hover:bg-emerald-leaf transition-colors active:scale-[0.98] shadow-sm"
            >
              Isi Formulir Online
            </a>
          </div>
        </section>

        {/* 4-Step Registration Flow */}
        <section>
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-leaf">Alur Pendaftaran</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-emerald-deep mt-1">
              4 Langkah Mudah Masuk Madrasah
            </h2>
            <p className="text-sm text-ink-soft mt-1">
              Proses pendaftaran dirancang transparan, ramah anak, dan bebas tes seleksi yang memberatkan psikologis ananda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st) => (
              <div
                key={st.num}
                className="bg-white rounded-2xl border border-border p-6 shadow-xs flex flex-col justify-between hover:border-emerald-leaf/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-deep/10 text-emerald-deep flex items-center justify-center">
                      <span className="material-symbols-outlined text-[22px]">{st.icon}</span>
                    </div>
                    <span className="font-heading text-2xl font-bold text-border">
                      {st.num}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-ink mb-1.5">
                    {st.title}
                  </h3>
                  <p className="font-body text-xs text-ink-soft leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Requirements & Online Form Split */}
        <section id="formulir" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 lg:p-10 rounded-2xl border border-border shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-leaf">Formulir Cepat</span>
            <h2 className="text-2xl font-heading font-bold text-emerald-deep mt-1 mb-2">
              Daftar Siswa Baru Online
            </h2>
            <p className="text-xs sm:text-sm text-ink-soft mb-6">
              Isi data awal di bawah ini. Panitia PPDB akan langsung memproses dan menghubungi Anda melalui WhatsApp untuk jadwal verifikasi berkas fisik.
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-600 text-[24px]">check_circle</span>
                <div>
                  <span className="font-semibold block">Data Berhasil Disiapkan!</span>
                  Sistem telah menghubungkan data ananda ke WhatsApp resmi Panitia PPDB.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Nama Lengkap Calon Siswa *
                </label>
                <input
                  type="text"
                  required
                  value={formData.childName}
                  onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                  placeholder="Contoh: Muhammad Fatih Al-Faruq"
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-emerald-leaf/30 focus:border-emerald-leaf outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Jenis Kelamin *
                  </label>
                  <select
                    value={formData.childGender}
                    onChange={(e) => setFormData({ ...formData, childGender: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-emerald-leaf/30 focus:border-emerald-leaf outline-none transition-all bg-white"
                  >
                    <option>Laki-laki</option>
                    <option>Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Asal Sekolah / TK
                  </label>
                  <input
                    type="text"
                    value={formData.previousSchool}
                    onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                    placeholder="Contoh: RA Al-Ikhlas"
                    className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-emerald-leaf/30 focus:border-emerald-leaf outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    Nama Orang Tua / Wali *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="Contoh: Ahmad Fauzan"
                    className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-emerald-leaf/30 focus:border-emerald-leaf outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">
                    No. WhatsApp Aktif *
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
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Misal: hafalan yang sudah dimiliki ananda, riwayat kesehatan, dll."
                  className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-emerald-leaf/30 focus:border-emerald-leaf outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-deep text-white font-semibold text-sm hover:bg-emerald-leaf transition-colors active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                <span>Kirim Formulir Pendaftaran PPDB</span>
              </button>
            </form>
          </div>

          {/* Requirements List */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-ivory-2 p-6 lg:p-8 rounded-2xl border border-border/80">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-leaf block mb-1">
                Persyaratan Fisik
              </span>
              <h3 className="font-heading font-bold text-lg text-emerald-deep mb-4">
                Berkas yang Perlu Disiapkan
              </h3>
              <div className="space-y-3">
                {requirements.map((req, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-3 text-xs sm:text-sm text-ink-soft">
                    <span className="material-symbols-outlined text-emerald-leaf text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-border shadow-xs">
              <h4 className="font-heading font-bold text-sm text-emerald-deep mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-gold">help</span>
                <span>Butuh Bantuan Panitia PPDB?</span>
              </h4>
              <p className="text-xs text-ink-soft leading-relaxed mb-4">
                Panitia PPDB siap melayani pertanyaan seputar rincian administrasi, jadwal observasi Siswa, dan konsultasi lainnya.
              </p>
              <a
                href="https://wa.me/628123456789?text=Assalamu'alaikum%20Panitia%20PPDB"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl border border-emerald-deep/20 text-emerald-deep hover:bg-emerald-leaf/10 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Chat Panitia PPDB via WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
