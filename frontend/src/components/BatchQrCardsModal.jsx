import { useState, useMemo } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import schoolLogo from '../assets/logo.png'

const LATTICE_BG = [
  'repeating-linear-gradient(60deg, transparent 0px, transparent 9px, rgba(255,255,255,0.05) 9px, rgba(255,255,255,0.05) 10px)',
  'repeating-linear-gradient(-60deg, transparent 0px, transparent 9px, rgba(255,255,255,0.05) 9px, rgba(255,255,255,0.05) 10px)',
  'linear-gradient(135deg, #064e3b 0%, #065f46 55%, #047857 100%)',
].join(', ')

const MODAL_HEADER_BG = [
  'repeating-linear-gradient(45deg, transparent 0px, transparent 18px, rgba(255,255,255,0.025) 18px, rgba(255,255,255,0.025) 19px)',
  'repeating-linear-gradient(-45deg, transparent 0px, transparent 18px, rgba(255,255,255,0.025) 18px, rgba(255,255,255,0.025) 19px)',
  'linear-gradient(135deg, #022c22 0%, #064e3b 60%, #065f46 100%)',
].join(', ')

export function StudentQrCard({ student, rombelName }) {
  return (
    <div
      className="print-card-item bg-white relative flex flex-col overflow-hidden"
      style={{
        width: '8.5cm',
        height: '5.3cm',
        boxSizing: 'border-box',
        borderRadius: '12px',
        border: '1px solid #cbd5e1',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          borderTopLeftRadius: '11px',
          borderTopRightRadius: '11px',
          backgroundImage: LATTICE_BG,
          padding: '5px 10px 5px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
        }}
      >
        <img
          src={schoolLogo}
          alt="Logo MI"
          style={{ width: '22px', height: '22px', objectFit: 'contain', flexShrink: 0, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
        />
        <div style={{ flex: 1, lineHeight: 1.2 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.02em', color: '#fff' }}>
            MI Roudotutta'lim Batujajar
          </div>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 500, fontSize: '6.5px', color: 'rgba(167,243,208,0.9)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Kartu Tanda Pelajar &amp; Anggota Perpustakaan
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', padding: '6px 8px 5px', gap: '7px', alignItems: 'stretch' }}>
        <div style={{
          width: '42px',
          height: '52px',
          minWidth: '42px',
          alignSelf: 'flex-start',
          border: '1.5px dashed #94a3b8',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8fafc',
          gap: '2px',
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#94a3b8' }}>person</span>
          <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '5px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>2x3cm</span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '3px', overflow: 'hidden' }}>
          <div>
            <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '5.5px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1px' }}>
              Nama Siswa
            </div>
            <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '9px', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>
              {student?.nama || 'N/A'}
            </div>
          </div>
          <div style={{ height: '1px', background: '#e2e8f0' }} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <div>
              <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '5.5px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>NIS</div>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '8px', fontWeight: 700, color: '#065f46', letterSpacing: '0.03em' }}>
                {student?.nis || 'N/A'}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '5.5px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Kelas</div>
              <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '8px', fontWeight: 700, color: '#0f172a' }}>
                {rombelName || 'N/A'}
              </div>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '5.5px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>NISN</div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '7px', color: '#475569' }}>
              {student?.nisn || 'N/A'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px', flexShrink: 0 }}>
          <div style={{ padding: '4px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <QRCodeSVG
              value={`SISWA-${student?.nis || 'UNKNOWN'}`}
              size={52}
              level="M"
              style={{ display: 'block' }}
            />
          </div>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '5.5px', color: '#64748b', fontWeight: 600, letterSpacing: '0.03em' }}>
            {student?.nis}
          </div>
        </div>
      </div>

      <div style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '2.5px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '5.5px', color: '#065f46', letterSpacing: '0.03em' }}>
          Berlaku selama menjadi Siswa aktif
        </span>
        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '5.5px', fontWeight: 700, color: '#065f46', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          SIPERPUS CARD
        </span>
      </div>
    </div>
  )
}

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

  const filteredStudents = useMemo(() => {
    if (!students || !Array.isArray(students)) return []
    if (!searchFilter) return students
    const q = searchFilter.toLowerCase()
    return students.filter(
      (s) =>
        (s.nama && s.nama.toLowerCase().includes(q)) ||
        (s.nis && s.nis.toLowerCase().includes(q)) ||
        (s.nisn && s.nisn.toLowerCase().includes(q))
    )
  }, [students, searchFilter])

  const CARDS_PER_PAGE = 8
  const studentPages = useMemo(() => {
    const pages = []
    for (let i = 0; i < filteredStudents.length; i += CARDS_PER_PAGE) {
      pages.push(filteredStudents.slice(i, i + CARDS_PER_PAGE))
    }
    return pages
  }, [filteredStudents])

  const pageCount = studentPages.length
  const handlePrint = () => { window.print() }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fade-in"
      style={{ background: 'rgba(2,6,23,0.82)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl shadow-2xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] flex flex-col overflow-hidden my-auto animate-modal-pop"
        style={{ background: '#f1f5f9', border: '1px solid #e2e8f0' }}
      >
        {/* COMMAND PANEL HEADER */}
        <div className="no-print shrink-0" style={{ backgroundImage: MODAL_HEADER_BG, padding: '20px 24px 16px' }}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '8px', border: '1px solid rgba(255,255,255,0.15)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'rgba(167,243,208,1)' }}>qr_code_2</span>
              </div>
              <div>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '16px', color: '#fff', lineHeight: 1.2 }}>
                  Cetak Kartu QR Massal
                </h3>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '12px', color: 'rgba(167,243,208,0.75)', marginTop: '2px' }}>
                  Format lembar A4 · 8.5cm x 5.3cm per kartu · 8 kartu/lembar
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="no-print"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '6px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {[
              { icon: 'school', label: `Kelas ${selectedClass}`, accent: true },
              { icon: 'badge', label: `${filteredStudents.length} Siswa` },
              { icon: 'description', label: `${pageCount} Lembar A4` },
            ].map(({ icon, label, accent }) => (
              <div key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: accent ? 'rgba(167,243,208,0.15)' : 'rgba(255,255,255,0.08)', border: `1px solid ${accent ? 'rgba(167,243,208,0.35)' : 'rgba(255,255,255,0.12)'}`, borderRadius: '8px', padding: '4px 10px 4px 8px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '14px', color: accent ? 'rgba(167,243,208,1)' : 'rgba(255,255,255,0.6)' }}>{icon}</span>
                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: '12px', color: accent ? 'rgba(167,243,208,1)' : 'rgba(255,255,255,0.85)' }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
              <span className="material-symbols-outlined" style={{ position: 'absolute', left: '9px', fontSize: '14px', color: 'rgba(167,243,208,0.7)', pointerEvents: 'none' }}>class</span>
              <select
                value={selectedClass}
                onChange={(e) => onChangeClass(e.target.value)}
                style={{ paddingLeft: '28px', paddingRight: '28px', paddingTop: '7px', paddingBottom: '7px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff', fontSize: '12px', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, cursor: 'pointer', outline: 'none', appearance: 'none' }}
              >
                {classList.map((cls) => (
                  <option key={cls} value={cls} style={{ background: '#064e3b', color: '#fff' }}>Kelas {cls}</option>
                ))}
              </select>
              <span className="material-symbols-outlined" style={{ position: 'absolute', right: '8px', fontSize: '14px', color: 'rgba(167,243,208,0.7)', pointerEvents: 'none' }}>expand_more</span>
            </div>

            <div style={{ position: 'relative', flex: '1 1 180px', minWidth: '160px' }}>
              <span className="material-symbols-outlined" style={{ position: 'absolute', left: '9px', top: '50%', transform: 'translateY(-50%)', fontSize: '15px', color: 'rgba(255,255,255,0.45)', pointerEvents: 'none' }}>search</span>
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Cari nama / NIS..."
                style={{ width: '100%', paddingLeft: '30px', paddingRight: '12px', paddingTop: '7px', paddingBottom: '7px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', fontSize: '12px', fontFamily: 'Plus Jakarta Sans, sans-serif', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => { e.target.style.borderColor = 'rgba(167,243,208,0.5)'; e.target.style.background = 'rgba(255,255,255,0.12)' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.background = 'rgba(255,255,255,0.08)' }}
              />
            </div>

            <button
              type="button"
              disabled={loading || filteredStudents.length === 0}
              onClick={handlePrint}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '7px 16px', background: (loading || filteredStudents.length === 0) ? 'rgba(167,243,208,0.2)' : 'rgba(167,243,208,1)', border: 'none', borderRadius: '8px', color: (loading || filteredStudents.length === 0) ? 'rgba(6,79,58,0.5)' : '#064e3b', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '12px', cursor: (loading || filteredStudents.length === 0) ? 'not-allowed' : 'pointer', transition: 'all 0.15s', flexShrink: 0 }}
              onMouseEnter={e => { if (!e.currentTarget.disabled) e.currentTarget.style.background = '#6ee7b7' }}
              onMouseLeave={e => { if (!e.currentTarget.disabled) e.currentTarget.style.background = 'rgba(167,243,208,1)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>print</span>
              <span>Cetak {filteredStudents.length} Kartu</span>
            </button>
          </div>
        </div>

        {/* CARD GALLERY */}
        <div className="flex-1 overflow-y-auto" style={{ background: '#f1f5f9' }}>
          {loading ? (
            <div className="no-print flex flex-col items-center justify-center py-20 gap-3">
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #e2e8f0', borderTopColor: '#065f46', animation: 'spin 0.8s linear infinite' }} />
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', color: '#64748b' }}>
                Memuat data Siswa Kelas {selectedClass}...
              </span>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="no-print flex flex-col items-center justify-center py-20 gap-3">
              <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#94a3b8' }}>person_search</span>
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', color: '#64748b' }}>
                {searchFilter ? 'Tidak ada Siswa yang cocok dengan pencarian.' : `Tidak ada data Siswa untuk Kelas ${selectedClass}.`}
              </span>
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '12px', color: '#065f46', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Hapus filter
                </button>
              )}
            </div>
          ) : (
            <div
              id="printable-cards"
              className="print-area p-4 sm:p-5"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '12px', justifyItems: 'center' }}
            >
              {studentPages.map((pageStudents, pageIdx) => (
                <div key={pageIdx} className="print-sheet">
                  <div className="print-sheet-grid" style={{ display: 'contents' }}>
                    {pageStudents.map((st, idx) => {
                      const rombelName = st.siswa_kelas?.[0]?.kelas_detail?.kelas?.kelas || selectedClass
                      return (
                        <div
                          key={st.idsiswa || idx}
                          style={{ transition: 'transform 0.15s, box-shadow 0.15s' }}
                          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(6,79,58,0.12)' }}
                          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
                        >
                          <StudentQrCard student={st} rombelName={rombelName} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER BAR */}
        <div className="no-print shrink-0" style={{ background: '#fff', borderTop: '1px solid #e2e8f0', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '12px', color: '#64748b' }}>
            {filteredStudents.length > 0
              ? <><strong style={{ color: '#0f172a' }}>{filteredStudents.length} Siswa</strong>{' '}&middot;{' '}{pageCount} lembar A4{' '}&middot; Aktifkan <em>Background graphics</em> di dialog cetak</>
              : 'Pilih kelas untuk melihat preview kartu.'
            }
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ padding: '6px 16px', background: 'transparent', border: '1px solid #e2e8f0', borderRadius: '8px', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: '12px', color: '#475569', cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#e2e8f0' }}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}
