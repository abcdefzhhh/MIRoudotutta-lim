import { useState, useId } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import schoolLogo from '../assets/logo.png'

export default function BatchQrCardsModal({
  isOpen,
  onClose,
  selectedClass,
  onChangeClass,
  classList = [],
  students = [],
  loading = false,
}) {
  const [searchFilter, setSearchFilter] = useState('')

  if (!isOpen) return null

  const filteredStudents = students.filter((s) => {
    if (!searchFilter) return true
    const q = searchFilter.toLowerCase()
    return (
      (s.nama && s.nama.toLowerCase().includes(q)) ||
      (s.nis && s.nis.toLowerCase().includes(q)) ||
      (s.nisn && s.nisn.toLowerCase().includes(q))
    )
  })

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      <div className="bg-slate-100 rounded-2xl border border-slate-200 shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 no-print shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-[24px]">
                qr_code_2
              </span>
              <h3 className="font-bold text-lg text-slate-900">
                Cetak Kartu QR Massal per Kelas
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Cetak seluruh kartu pelajar santri ber-QR Code sekaligus dalam format lembar A4 (dimensi kartu terkunci 8.5cm x 5.3cm).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Class Selector Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600">Pilih Kelas:</span>
              <select
                value={selectedClass}
                onChange={(e) => onChangeClass(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
              >
                {classList.map((cls) => (
                  <option key={cls} value={cls}>
                    Kelas {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Print Button */}
            <button
              type="button"
              disabled={loading || students.length === 0}
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span>Cetak {filteredStudents.length} Kartu (A4)</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="Tutup"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Toolbar & Print Notice Banner */}
        <div className="px-4 py-3 bg-emerald-50 border-b border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs no-print shrink-0">
          <div className="flex items-center gap-2 text-emerald-900 font-medium">
            <span className="material-symbols-outlined text-emerald-600 text-[18px]">
              info
            </span>
            <span>
              Siap cetak <strong>{filteredStudents.length} kartu</strong> untuk <strong>Kelas {selectedClass}</strong>. Pastikan opsi <em>Background graphics / Cetak gambar latar</em> dicentang pada dialog cetak.
            </span>
          </div>

          {/* Quick search input */}
          <div className="relative w-full sm:w-56">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[16px]">
              search
            </span>
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Cari nama / NIS..."
              className="w-full pl-8 pr-3 py-1 text-xs rounded-lg border border-slate-300 bg-white focus:ring-1 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* Scrollable Preview & Print Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 print:p-0 print:overflow-visible">
          {loading ? (
            <div className="py-20 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-2 no-print">
              <span className="material-symbols-outlined text-[32px] animate-spin text-emerald-600">
                sync
              </span>
              <span>Memuat data santri Kelas {selectedClass}...</span>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="py-20 text-center text-slate-500 text-xs no-print">
              Tidak ada data santri ditemukan untuk Kelas {selectedClass}.
            </div>
          ) : (
            <div
              id="printable-cards"
              className="print-area grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-4 print:m-0 justify-items-center"
            >
              {filteredStudents.map((st, idx) => {
                const rombelName =
                  st.siswa_kelas?.[0]?.kelas_detail?.kelas?.kelas || selectedClass
                return (
                  <div
                    key={st.idsiswa || idx}
                    className="print-card-item bg-white border border-slate-300 print:border-slate-400 rounded-xl shadow-xs print:shadow-none p-3 relative flex flex-col justify-between overflow-hidden"
                    style={{
                      width: '8.5cm',
                      height: '5.3cm',
                      boxSizing: 'border-box',
                    }}
                  >
                    {/* Header Card */}
                    <div className="flex items-center gap-2 border-b border-emerald-800/30 pb-1 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-white -m-3 mb-1.5 px-3 py-1">
                      <img
                        src={schoolLogo}
                        alt="Logo MI"
                        className="w-6 h-6 object-contain drop-shadow"
                      />
                      <div className="leading-tight">
                        <h4 className="font-heading font-bold text-[8.5px] uppercase tracking-tight text-white">
                          MI ROUDOTUTTA'LIM BATUJAJAR
                        </h4>
                        <p className="text-[7px] text-emerald-200 font-medium tracking-wide">
                          KARTU TANDA PELAJAR &amp; ANGGOTA PERPUSTAKAAN
                        </p>
                      </div>
                    </div>

                    {/* Body: Photo box, Info, and QR Code */}
                    <div className="flex items-center justify-between gap-2 my-auto">
                      {/* Avatar / Photo Box */}
                      <div className="w-14 h-18 bg-slate-50 border border-slate-300 rounded flex flex-col items-center justify-center text-slate-400 shrink-0">
                        <span className="material-symbols-outlined text-[24px]">person</span>
                        <span className="text-[6px] font-sans uppercase">2 x 3 cm</span>
                      </div>

                      {/* Student Details */}
                      <div className="flex-1 text-[8px] space-y-0.5 leading-snug">
                        <div>
                          <span className="text-slate-500 block text-[6.5px] uppercase font-bold">
                            Nama Santri:
                          </span>
                          <span className="font-bold text-slate-900 text-[9.5px] leading-tight block truncate">
                            {st.nama}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div>
                            <span className="text-slate-500 block text-[6.5px] uppercase font-bold">
                              NIS:
                            </span>
                            <span className="font-mono font-bold text-emerald-800 text-[8.5px]">
                              {st.nis}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[6.5px] uppercase font-bold">
                              Kelas:
                            </span>
                            <span className="font-bold text-slate-800 text-[8.5px]">
                              {rombelName}
                            </span>
                          </div>
                        </div>

                        <div>
                          <span className="text-slate-500 block text-[6.5px] uppercase font-bold">
                            NISN:
                          </span>
                          <span className="font-mono text-slate-700 text-[7.5px]">
                            {st.nisn || '-'}
                          </span>
                        </div>
                      </div>

                      {/* QR Code SVG for Scanner */}
                      <div className="flex flex-col items-center justify-center shrink-0 p-1 bg-white border border-slate-200 rounded">
                        <QRCodeSVG
                          value={`SISWA-${st.nis}`}
                          size={54}
                          level="M"
                        />
                        <span className="font-mono text-[6px] text-slate-600 mt-0.5 font-semibold">
                          {st.nis}
                        </span>
                      </div>
                    </div>

                    {/* Footer card line */}
                    <div className="border-t border-slate-200 pt-0.5 flex items-center justify-between text-[6px] text-slate-500 -mb-1">
                      <span>Berlaku selama menjadi santri aktif</span>
                      <span className="font-bold text-emerald-800">SIPERPUS Card</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 no-print shrink-0">
          <span>
            Total: <strong>{filteredStudents.length} santri</strong> siap cetak di Kelas {selectedClass}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition-colors"
            >
              Tutup
            </button>
            <button
              type="button"
              disabled={loading || filteredStudents.length === 0}
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Cetak Lembar A4</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
