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

export function BookQrLabel({ item }) {
  return (
    <div
      className="print-book-label-item bg-white relative flex flex-col overflow-hidden"
      style={{
        width: '8.5cm',
        height: '4.6cm',
        boxSizing: 'border-box',
        borderRadius: '8px',
        border: '1px dashed #cbd5e1',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        flexShrink: 0,
        background: '#ffffff',
      }}
    >
      {/* Header Label: Logo + Madrasah + Perpustakaan */}
      <div
        style={{
          borderTopLeftRadius: '7px',
          borderTopRightRadius: '7px',
          backgroundImage: LATTICE_BG,
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <img
          src={schoolLogo}
          alt="Logo MI"
          style={{ width: '18px', height: '18px', objectFit: 'contain', flexShrink: 0 }}
        />
        <div style={{ flex: 1, lineHeight: 1.15 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: '7.5px', textTransform: 'uppercase', letterSpacing: '0.02em', color: '#ffffff' }}>
            MI ROUDOTUTTA'LIM BATUJAJAR
          </div>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: '6px', color: 'rgba(167,243,208,0.95)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            PERPUSTAKAAN MADRASAH &middot; SIPERPUS
          </div>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '3px',
          padding: '1px 4px',
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 700, fontSize: '6px', color: '#a7f3d0' }}>
            {item.kodebuku}
          </span>
        </div>
      </div>

      {/* Body Label: Book Info (Left) + QR Code (Right) */}
      <div style={{ flex: 1, display: 'flex', padding: '6px 8px 4px', gap: '8px', alignItems: 'center', overflow: 'hidden' }}>
        {/* Left column: Judul, Penulis, ISBN, Kode Eksemplar */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2px', overflow: 'hidden' }}>
          <div>
            <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '5.5px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Judul Buku
            </div>
            <div style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '8.5px',
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {item.judul}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '5.5px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              Penulis:
            </span>
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '7px', color: '#334155', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {item.penulis || '-'}
            </span>
          </div>

          <div style={{ height: '1px', background: '#e2e8f0', margin: '1px 0' }} />

          {/* Highlight ISBN Resmi */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '4px',
              padding: '1.5px 4px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
            }}>
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '5.5px', fontWeight: 800, color: '#166534', textTransform: 'uppercase' }}>
                ISBN:
              </span>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '7.5px', fontWeight: 700, color: '#065f46', letterSpacing: '0.02em' }}>
                {item.isbn || '-'}
              </span>
            </div>
          </div>

          {/* No. Registrasi Eksemplar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '5.5px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              No. Reg:
            </span>
            <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '7.5px', fontWeight: 700, color: '#0f172a' }}>
              {item.kodebukudetail}
            </span>
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '5.5px', color: '#64748b' }}>
              (Salinan #{item.copyIndex})
            </span>
          </div>
        </div>

        {/* Right column: QR Code */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', flexShrink: 0 }}>
          <div style={{ padding: '3px', background: '#ffffff', border: '1.5px solid #065f46', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <QRCodeSVG
              value={`BUKU-${item.isbn || ''}-${item.kodebukudetail}`}
              size={50}
              level="M"
              style={{ display: 'block' }}
            />
          </div>
          <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '6px', fontWeight: 700, color: '#065f46', letterSpacing: '0.03em' }}>
            {item.kodebukudetail}
          </span>
        </div>
      </div>

      {/* Footer strip */}
      <div style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '2px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '5px', color: '#64748b', letterSpacing: '0.02em' }}>
          Inventaris Resmi MI Roudotutta'lim
        </span>
        <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '5px', fontWeight: 700, color: '#065f46', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          Kondisi: {item.kondisi || 'Baik'}
        </span>
      </div>
    </div>
  )
}

export default function BatchBookLabelsModal({
  isOpen,
  onClose,
  books = [],
  initialSelectedBookId = 'all',
}) {
  const [selectedBookId, setSelectedBookId] = useState(initialSelectedBookId || 'all')
  const [searchFilter, setSearchFilter] = useState('')

  // Flatten all physical copies into printable items
  const allLabelItems = useMemo(() => {
    if (!books || !Array.isArray(books)) return []
    const items = []

    books.forEach((book) => {
      // If a specific book filter is active and doesn't match, skip
      if (selectedBookId !== 'all' && String(book.idbuku) !== String(selectedBookId)) {
        return
      }

      if (book.details && book.details.length > 0) {
        book.details.forEach((copy, idx) => {
          items.push({
            bookId: book.idbuku,
            judul: book.judul,
            penulis: book.penulis,
            penerbit: book.penerbit,
            isbn: book.isbn,
            kodebuku: book.kodebuku,
            kodebukudetail: copy.kodebukudetail,
            kondisi: copy.kondisi,
            copyIndex: idx + 1,
            totalCopies: book.details.length,
          })
        })
      } else {
        // Fallback if details not eager-loaded, generate by stock
        const total = book.stok || 1
        for (let i = 1; i <= total; i++) {
          items.push({
            bookId: book.idbuku,
            judul: book.judul,
            penulis: book.penulis,
            penerbit: book.penerbit,
            isbn: book.isbn,
            kodebuku: book.kodebuku,
            kodebukudetail: `BK-${book.idbuku}-${String(i).padStart(3, '0')}`,
            kondisi: 'baik',
            copyIndex: i,
            totalCopies: total,
          })
        }
      }
    })

    return items
  }, [books, selectedBookId])

  // Filter by search query
  const filteredLabels = useMemo(() => {
    if (!searchFilter) return allLabelItems
    const q = searchFilter.toLowerCase()
    return allLabelItems.filter(
      (item) =>
        (item.judul && item.judul.toLowerCase().includes(q)) ||
        (item.isbn && item.isbn.toLowerCase().includes(q)) ||
        (item.kodebuku && item.kodebuku.toLowerCase().includes(q)) ||
        (item.kodebukudetail && item.kodebukudetail.toLowerCase().includes(q)) ||
        (item.penulis && item.penulis.toLowerCase().includes(q))
    )
  }, [allLabelItems, searchFilter])

  // Chunk items: 10 stickers per A4 page (2 columns x 5 rows)
  const LABELS_PER_PAGE = 10
  const labelPages = useMemo(() => {
    const pages = []
    for (let i = 0; i < filteredLabels.length; i += LABELS_PER_PAGE) {
      pages.push(filteredLabels.slice(i, i + LABELS_PER_PAGE))
    }
    return pages
  }, [filteredLabels])

  const pageCount = labelPages.length
  const handlePrint = () => {
    window.print()
  }

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
                <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'rgba(167,243,208,1)' }}>label</span>
              </div>
              <div>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '16px', color: '#fff', lineHeight: 1.2 }}>
                  Cetak Label Stiker QR &amp; ISBN Buku
                </h3>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '12px', color: 'rgba(167,243,208,0.75)', marginTop: '2px' }}>
                  Format lembar A4 · 8.5cm x 4.6cm per stiker · 10 stiker/lembar · Memuat ISBN resmi &amp; Barcode SIPERPUS
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

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {[
              { icon: 'menu_book', label: selectedBookId === 'all' ? 'Semua Judul Buku' : '1 Judul Terpilih', accent: true },
              { icon: 'qr_code_2', label: `${filteredLabels.length} Stiker Eksemplar` },
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
            <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', flex: '1 1 240px', maxWidth: '320px' }}>
              <span className="material-symbols-outlined" style={{ position: 'absolute', left: '9px', fontSize: '14px', color: 'rgba(167,243,208,0.7)', pointerEvents: 'none' }}>filter_alt</span>
              <select
                value={selectedBookId}
                onChange={(e) => setSelectedBookId(e.target.value)}
                style={{ width: '100%', paddingLeft: '28px', paddingRight: '28px', paddingTop: '7px', paddingBottom: '7px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: '#fff', fontSize: '12px', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, cursor: 'pointer', outline: 'none', appearance: 'none' }}
              >
                <option value="all" style={{ background: '#064e3b', color: '#fff' }}>Semua Judul Buku ({books.length} Judul)</option>
                {books.map((b) => (
                  <option key={b.idbuku} value={b.idbuku} style={{ background: '#064e3b', color: '#fff' }}>
                    {b.kodebuku} - {b.judul.slice(0, 35)}... (ISBN: {b.isbn})
                  </option>
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
                placeholder="Cari judul / ISBN / No. Reg..."
                style={{ width: '100%', paddingLeft: '30px', paddingRight: '12px', paddingTop: '7px', paddingBottom: '7px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: '#fff', fontSize: '12px', fontFamily: 'Plus Jakarta Sans, sans-serif', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => { e.target.style.borderColor = 'rgba(167,243,208,0.5)'; e.target.style.background = 'rgba(255,255,255,0.12)' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.background = 'rgba(255,255,255,0.08)' }}
              />
            </div>

            <button
              type="button"
              disabled={filteredLabels.length === 0}
              onClick={handlePrint}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '7px 16px', background: (filteredLabels.length === 0) ? 'rgba(167,243,208,0.2)' : 'rgba(167,243,208,1)', border: 'none', borderRadius: '8px', color: (filteredLabels.length === 0) ? 'rgba(6,79,58,0.5)' : '#064e3b', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '12px', cursor: (filteredLabels.length === 0) ? 'not-allowed' : 'pointer', transition: 'all 0.15s', flexShrink: 0 }}
              onMouseEnter={e => { if (!e.currentTarget.disabled) e.currentTarget.style.background = '#6ee7b7' }}
              onMouseLeave={e => { if (!e.currentTarget.disabled) e.currentTarget.style.background = 'rgba(167,243,208,1)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>print</span>
              <span>Cetak {filteredLabels.length} Stiker</span>
            </button>
          </div>
        </div>

        {/* STICKER GALLERY PREVIEW */}
        <div className="flex-1 overflow-y-auto" style={{ background: '#f1f5f9' }}>
          {filteredLabels.length === 0 ? (
            <div className="no-print flex flex-col items-center justify-center py-20 gap-3">
              <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#94a3b8' }}>search_off</span>
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', color: '#64748b' }}>
                {searchFilter ? 'Tidak ada stiker buku yang cocok dengan pencarian.' : 'Belum ada eksemplar buku yang terdaftar.'}
              </span>
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '12px', color: '#065f46', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Hapus filter pencarian
                </button>
              )}
            </div>
          ) : (
            <div
              id="printable-book-labels"
              className="print-area p-4 sm:p-5"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '12px', justifyItems: 'center' }}
            >
              {labelPages.map((pageLabels, pageIdx) => (
                <div key={pageIdx} className="print-sheet">
                  <div className="print-book-label-grid" style={{ display: 'contents' }}>
                    {pageLabels.map((item, idx) => (
                      <div
                        key={`${item.kodebukudetail}-${idx}`}
                        style={{ transition: 'transform 0.15s, box-shadow 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(6,79,58,0.12)' }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
                      >
                        <BookQrLabel item={item} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER BAR */}
        <div className="no-print shrink-0" style={{ background: '#fff', borderTop: '1px solid #e2e8f0', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyBetween: 'space-between' }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '12px', color: '#64748b' }}>
            {filteredLabels.length > 0
              ? <><strong style={{ color: '#0f172a' }}>{filteredLabels.length} Stiker Buku</strong>{' '}&middot;{' '}{pageCount} lembar A4{' '}&middot; Aktifkan <em>Background graphics</em> pada dialog cetak kertas stiker</>
              : 'Pilih buku untuk melihat preview stiker.'
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
