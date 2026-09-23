import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import guruBg from '../assets/gurustaf.jpg'
import useScrollReveal, { useStaggerReveal } from '../hooks/useScrollReveal'

// Female name detection for photo matching
const femaleNames = [
  'AI', 'CUCU', 'ENTIN', 'EULIS', 'FARIZ', 'JAMILATUL',
  'KIKI NURAFRILIYANTI', 'MARDIANA', 'NADILA', 'NENDEN',
  'NURAENI', 'PENI', 'SALSA', 'SINTA', 'SORAYA', 'SYANINDITA',
  'TRI', 'SITI', 'NUR', 'DEWI', 'FATIMAH', 'AMINAH'
]

const isFemale = (name = '') => {
  const upper = name.toUpperCase()
  return (
    femaleNames.some((fn) => upper.includes(fn)) ||
    upper.includes('USTZ') ||
    upper.includes('HJ')
  )
}

// Real photos uploaded by the user
const realFemalePhotos = [
  '/teachers/guru_real_1.jpg',
  '/teachers/guru_real_3.jpg',
  '/teachers/guru_real_4.jpg',
  '/teachers/guru_real_5.jpg',
]

const realMalePhotos = [
  '/teachers/guru_real_2.jpg',
  '/teachers/guru_pria_2.jpg',
  '/teachers/guru_pria_1.jpg',
]

const getTeacherPhoto = (teacher, idx = 0) => {
  if (teacher.foto) return teacher.foto
  const female = isFemale(teacher.nama_guru)
  const idNum = Math.abs((teacher.idguru || 0) + idx)
  if (female) {
    return realFemalePhotos[idNum % realFemalePhotos.length]
  } else {
    return realMalePhotos[idNum % realMalePhotos.length]
  }
}

const getTeacherSubject = (teacher) => {
  if (teacher.subject) return teacher.subject
  if (teacher.kelas_details && teacher.kelas_details.length > 0) {
    const kName = teacher.kelas_details.map((kd) => kd.kelas?.kelas).filter(Boolean).join(', ')
    return `Wali Kelas ${kName} • Tematik & Karakter`
  }
  const name = (teacher.nama_guru || '').toUpperCase()
  if (name.includes('S.PD.I') || name.includes('S.AG') || name.includes('S.SOS.I') || name.includes('LC')) {
    return 'Pendidikan Agama Islam & Tahfidz Al-Qur\'an'
  }
  if (name.includes('S.KOM') || name.includes('SE')) {
    return 'Layanan Sistem & Tata Usaha'
  }
  if (name.includes('S.PD')) {
    return 'Guru Tematik & Literasi Numerasi'
  }
  return 'Pendidik Madrasah & Pembina Karakter'
}

const getBadgeLabel = (teacher) => {
  if (teacher.badge) return teacher.badge
  if (teacher.is_kepala) return 'KEPALA MADRASAH'
  if (teacher.kelas_details && teacher.kelas_details.length > 0) {
    const kName = teacher.kelas_details[0]?.kelas?.kelas
    return kName ? `WALI KELAS ${kName}` : 'WALI KELAS'
  }
  return 'GURU'
}

// Teacher Portrait Card matching the reference design
function TeacherCard({ teacher, idx }) {
  const photoUrl = getTeacherPhoto(teacher, idx)
  const badgeLabel = getBadgeLabel(teacher)
  const subject = getTeacherSubject(teacher)

  return (
    <div className="relative rounded-[24px] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 aspect-[3/4] group bg-slate-900 flex flex-col justify-end">
      {/* Background Teacher Photo */}
      <img
        src={photoUrl}
        alt={teacher.nama_guru}
        className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
        loading="lazy"
      />

      {/* Deep Gradient Shadow Overlay at Bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent pointer-events-none" />

      {/* Card Content at Bottom */}
      <div className="relative p-5 sm:p-6 z-10">
        {/* Yellow Badge */}
        <div className="mb-2">
          <span className="inline-block px-3 py-0.5 rounded-md text-[11px] font-bold tracking-wider uppercase bg-amber-400 text-slate-950 shadow-xs">
            {badgeLabel}
          </span>
        </div>

        {/* Teacher Name in Bold Serif */}
        <h3 className="font-serif font-bold text-white text-lg sm:text-xl leading-snug drop-shadow-sm group-hover:text-amber-300 transition-colors">
          {teacher.nama_guru}
        </h3>

        {/* Role / Subject */}
        <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1.5 leading-snug line-clamp-2">
          {subject}
        </p>

        {/* NIP or WhatsApp (Optional micro-info) */}
        {teacher.nip && teacher.nip !== '0000000000000000' && (
          <p className="text-[10px] text-slate-400 font-mono mt-1.5 tracking-tight">
            NIP. {teacher.nip}
          </p>
        )}
      </div>
    </div>
  )
}

export default function GuruStaf() {
  const staffRef = useScrollReveal()
  const ctaRef = useScrollReveal()

  // Teachers State from API
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'wali_kelas' | 'guru'

  const fetchTeachers = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/guru', {
        params: { per_page: 100 },
      })
      if (res.data?.success && res.data.data?.data) {
        setTeachers(res.data.data.data)
      } else {
        setTeachers([])
      }
    } catch (err) {
      console.error(err)
      setError('Gagal memuat data dewan guru dari server.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeachers()
  }, [])

  // Filtered teachers list based on search and tab
  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      const isWali = t.kelas_details && t.kelas_details.length > 0
      if (activeTab === 'wali_kelas' && !isWali) return false
      if (activeTab === 'guru' && isWali) return false

      if (searchTerm.trim() !== '') {
        const q = searchTerm.toLowerCase()
        const matchName = t.nama_guru?.toLowerCase().includes(q)
        const matchNip = t.nip?.toLowerCase().includes(q)
        const matchKelas = t.kelas_details?.some((kd) =>
          kd.kelas?.kelas?.toLowerCase().includes(q)
        )
        return matchName || matchNip || matchKelas
      }
      return true
    })
  }, [teachers, activeTab, searchTerm])

  // Split into categories for structured viewing when activeTab === 'all' and no active search
  const waliKelasList = useMemo(() => {
    return filteredTeachers.filter((t) => t.kelas_details && t.kelas_details.length > 0)
  }, [filteredTeachers])

  const guruBiasaList = useMemo(() => {
    return filteredTeachers.filter((t) => !t.kelas_details || t.kelas_details.length === 0)
  }, [filteredTeachers])

  return (
    <div className="w-full bg-[#fbfbfa] pt-24 pb-20">
      {/* Header Banner with Custom Photo Background */}
      <section className="relative text-white py-18 sm:py-24 lg:py-28 overflow-hidden bg-emerald-deep shadow-md">
        {/* Full-bleed Photo Background Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={guruBg}
            alt="Dewan Guru & Tenaga Kependidikan MI Roudotutta'lim"
            className="w-full h-full object-cover object-center filter brightness-90 transform scale-105 transition-transform duration-1000"
          />
          {/* Multi-layered dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-emerald-deep/90 to-emerald-deep/80"></div>
          <div className="absolute inset-0 bg-black/25"></div>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D9A62B_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin relative z-10">
          <div className="max-w-3xl animate-slide-up">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gold/20 text-gold-soft border border-gold/30 mb-4 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
              Profil Pendidik &amp; Tenaga Kependidikan
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-tight drop-shadow-sm">
              Guru &amp; Tenaga Kependidikan
            </h1>
            <p className="mt-4 text-base sm:text-lg text-emerald-50/90 font-body leading-relaxed max-w-2xl">
              Mengenal seluruh dewan asatidz dan staf pengajar MI Roudotutta'lim yang membimbing putra-putri madrasah dengan penuh ketulusan, integritas, dan keteladanan budi pekerti.
            </p>

            {/* Quick Metrics Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15 flex items-center gap-2">
                <span className="material-symbols-outlined text-gold text-[20px]">groups</span>
                <span className="text-xs sm:text-sm font-medium text-white">
                  <strong>{teachers.length || 36}</strong> Dewan Guru &amp; Staf
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15 flex items-center gap-2">
                <span className="material-symbols-outlined text-gold text-[20px]">school</span>
                <span className="text-xs sm:text-sm font-medium text-white">
                  <strong>18</strong> Rombel Kelas (1A - 6C)
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15 flex items-center gap-2">
                <span className="material-symbols-outlined text-gold text-[20px]">verified</span>
                <span className="text-xs sm:text-sm font-medium text-white">
                  Kurikulum Merdeka Integratif
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin mt-12 space-y-14" ref={staffRef}>
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama guru, NIP, atau kelas..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-leaf/30 focus:border-emerald-leaf transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-sm p-1"
                aria-label="Hapus pencarian"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
              }`}
            >
              Semua ({teachers.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('wali_kelas')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === 'wali_kelas'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
              }`}
            >
              Wali Kelas ({teachers.filter((t) => t.kelas_details?.length > 0).length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('guru')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === 'guru'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
              }`}
            >
              Guru Mata Pelajaran ({teachers.filter((t) => !t.kelas_details?.length).length})
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="rounded-[24px] bg-slate-200 animate-pulse aspect-[3/4] p-6 flex flex-col justify-end gap-2"
              >
                <div className="h-4 bg-slate-300 rounded w-1/3 mb-1"></div>
                <div className="h-6 bg-slate-300 rounded w-3/4"></div>
                <div className="h-3 bg-slate-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center my-6">
            <span className="material-symbols-outlined text-rose-500 text-[36px] mb-2">
              error
            </span>
            <p className="text-sm font-semibold text-rose-800">{error}</p>
            <button
              type="button"
              onClick={fetchTeachers}
              className="mt-3 px-4 py-2 rounded-lg bg-rose-600 text-white text-xs font-medium hover:bg-rose-700 transition-colors shadow-xs active:scale-[0.98]"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredTeachers.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[32px]">person_search</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-800">Tidak ada guru ditemukan</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              {searchTerm
                ? `Tidak ada guru atau staf yang cocok dengan pencarian "${searchTerm}".`
                : 'Belum ada data guru pada kategori yang dipilih.'}
            </p>
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="mt-4 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors active:scale-[0.98]"
              >
                Reset Pencarian
              </button>
            )}
          </div>
        )}

        {/* Render Sections (Matching the Screenshot Layout) */}
        {!loading && !error && filteredTeachers.length > 0 && (
          <div className="space-y-12">
            {/* If user filtered by specific tab or searched, show a single uniform grid */}
            {activeTab !== 'all' || searchTerm ? (
              <div>
                {/* Section Header with pill count and divider line */}
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                    {activeTab === 'wali_kelas'
                      ? 'Wali Kelas'
                      : activeTab === 'guru'
                      ? 'Guru Mata Pelajaran & Tenaga Kependidikan'
                      : 'Hasil Pencarian Guru'}
                  </h2>
                  <span className="px-3 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200/80">
                    {filteredTeachers.length} orang
                  </span>
                  <div className="flex-1 h-px bg-slate-200 ml-2" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredTeachers.map((teacher, idx) => (
                    <TeacherCard key={teacher.idguru || idx} teacher={teacher} idx={idx} />
                  ))}
                </div>
              </div>
            ) : (
              /* If "all" and no search, display grouped sections with dividers like reference screenshot */
              <>
                {/* 1. Wali Kelas Section */}
                {waliKelasList.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                        Wali Kelas Madrasah
                      </h2>
                      <span className="px-3 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200/80">
                        {waliKelasList.length} orang
                      </span>
                      <div className="flex-1 h-px bg-slate-200 ml-2" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {waliKelasList.map((teacher, idx) => (
                        <TeacherCard key={teacher.idguru || idx} teacher={teacher} idx={idx} />
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Guru Mata Pelajaran & Staf Section */}
                {guruBiasaList.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                        Guru Mata Pelajaran &amp; Tenaga Kependidikan
                      </h2>
                      <span className="px-3 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200/80">
                        {guruBiasaList.length} orang
                      </span>
                      <div className="flex-1 h-px bg-slate-200 ml-2" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {guruBiasaList.map((teacher, idx) => (
                        <TeacherCard
                          key={teacher.idguru || idx}
                          teacher={teacher}
                          idx={idx + waliKelasList.length}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* CTA */}
        <section
          className="bg-emerald-deep rounded-2xl text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
          ref={ctaRef}
        >
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Ingin Berkonsultasi Mengenai Putra-Putri Anda?
            </h3>
            <p className="text-sm text-emerald-100/90 mt-1 max-w-xl">
              Kami menyambut hangat para orang tua yang ingin berdiskusi mengenai kurikulum, program tahfidz, dan lingkungan belajar di madrasah kami.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/kontak"
              className="px-6 py-3 rounded-full bg-gold text-ink font-semibold text-sm hover:bg-gold-soft transition-colors shadow-sm active:scale-[0.98]"
            >
              Hubungi Kami
            </Link>
            <Link
              to="/"
              className="px-5 py-3 rounded-full border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
