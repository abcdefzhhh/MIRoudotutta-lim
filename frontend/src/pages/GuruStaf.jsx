import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import guruBg from '../assets/gurustaf.jpg'
import useScrollReveal from '../hooks/useScrollReveal'

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

// Real photos uploaded for teachers
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

// Special assignment data for Leadership & Staff
const leadershipMap = {
  'NENDEN RENNY SITTI NURAENI': {
    category: 'pimpinan',
    title: 'Kepala Madrasah',
    badge: 'KEPALA MADRASAH',
    badgeColor: 'bg-amber-400 text-slate-950',
    subject: 'Kepala Madrasah • Pembina Utama Pendidikan',
    order: 1,
  },
  'AHMAD HAIDAR ILYAS': {
    category: 'pimpinan',
    title: 'Wakil Kepala Madrasah',
    badge: 'WAKIL KEPALA MADRASAH',
    badgeColor: 'bg-amber-400 text-slate-950',
    subject: 'Wakil Kepala Madrasah • Bidang Kurikulum & Kesiswaan',
    order: 2,
  },
}

const staffMap = {
  'YOSEP SETIYADI SE': {
    category: 'staf',
    title: 'Kepala Tata Usaha',
    badge: 'TATA USAHA',
    badgeColor: 'bg-purple-600 text-white',
    subject: 'Kepala Urusan Tata Usaha & Administrasi Keuangan',
  },
  'SINTA LISTIAWATI': {
    category: 'staf',
    title: 'Operator Madrasah',
    badge: 'OPERATOR MADRASAH',
    badgeColor: 'bg-indigo-600 text-white',
    subject: 'Operator Madrasah & Pengelola Data EMIS / Simpatika',
  },
  'NURAENI': {
    category: 'staf',
    title: 'Pengelola Perpustakaan',
    badge: 'PERPUSTAKAAN',
    badgeColor: 'bg-teal-600 text-white',
    subject: 'Pengelola Perpustakaan & Pojok Literasi Madrasah',
  },
  'TRI HAZARIYANTI': {
    category: 'staf',
    title: 'Administrasi Persuratan',
    badge: 'ADMINISTRASI',
    badgeColor: 'bg-purple-600 text-white',
    subject: 'Staf Administrasi Persuratan, Kearsipan, & Humas',
  },
  'MARDIANA RAHAYU': {
    category: 'staf',
    title: 'Sarana & Prasarana',
    badge: 'SARPRAS',
    badgeColor: 'bg-teal-600 text-white',
    subject: 'Staf Layanan Inventaris, Logistik, & Fasilitas Belajar',
  },
  'KIKI SETIADI': {
    category: 'staf',
    title: 'Keamanan Lingkungan',
    badge: 'KEAMANAN & KEBERSIHAN',
    badgeColor: 'bg-slate-700 text-white',
    subject: 'Petugas Pengamanan, Ketertiban, & Lingkungan Madrasah',
  },
}

// Subject assignments for Subject Teachers
const subjectTeacherSubjects = {
  'A. YOGHA PRAMUDYA': 'Guru Pendidikan Jasmani, Olahraga & Kesehatan (PJOK)',
  'ABDUL ROJAK': 'Guru Bahasa Arab & Tahfidz Al-Qur\'an',
  'AGUNG GUNAWAN': 'Guru Pendidikan Jasmani & Pembina Olahraga Siswa',
  'ATANG SUHENDI': 'Guru Aqidah Akhlak & Pembiasaan Ibadah Praktis',
  'EKO JOKO SUSSANTO': 'Guru Fiqih Ibadah & Budi Pekerti Islami',
  'KIKI NURAFRILIYANTI': 'Guru Bahasa Inggris & Literasi Bahasa Asing',
  'NADILA ROWATUL ROHMAH': 'Guru Seni Budaya, Prakarya & Keterampilan',
  'RIDWAN MUSTOFA SURUR': 'Guru Al-Qur\'an Hadits & Tajwid Tartil',
  'SALSA MUTIAWATI RAMADHAN': 'Guru Matematika & Literasi Numerasi Terapan',
  'SANDI KURNIAWAN S.Pd': 'Guru Tematik & Pembinaan Prestasi Akademik',
}

const getTeacherMeta = (teacher) => {
  const upper = (teacher.nama_guru || '').trim().toUpperCase()

  // 1. Leadership
  for (const [key, val] of Object.entries(leadershipMap)) {
    if (upper.includes(key)) {
      return {
        category: 'pimpinan',
        badge: val.badge,
        badgeColor: val.badgeColor,
        subject: val.subject,
        order: val.order,
      }
    }
  }

  // 2. Wali Kelas
  if (teacher.kelas_details && teacher.kelas_details.length > 0) {
    const kName = teacher.kelas_details[0]?.kelas?.kelas || ''
    return {
      category: 'wali_kelas',
      badge: kName ? `WALI KELAS ${kName}` : 'WALI KELAS',
      badgeColor: 'bg-emerald-600 text-white',
      subject: kName ? `Wali Kelas ${kName} • Tematik & Karakter Santri` : 'Wali Kelas Madrasah',
      order: kName,
    }
  }

  // 3. Staff / Tenaga Kependidikan
  for (const [key, val] of Object.entries(staffMap)) {
    if (upper.includes(key)) {
      return {
        category: 'staf',
        badge: val.badge,
        badgeColor: val.badgeColor,
        subject: val.subject,
        order: 99,
      }
    }
  }

  // 4. Guru Mata Pelajaran
  let subject = 'Guru Mata Pelajaran & Pendidik Madrasah'
  for (const [key, val] of Object.entries(subjectTeacherSubjects)) {
    if (upper.includes(key)) {
      subject = val
      break
    }
  }

  return {
    category: 'guru',
    badge: 'GURU MAPEL',
    badgeColor: 'bg-sky-600 text-white',
    subject,
    order: 50,
  }
}

// Teacher Portrait Card Component
function TeacherCard({ teacher, idx, isLeader = false }) {
  const photoUrl = getTeacherPhoto(teacher, idx)
  const meta = getTeacherMeta(teacher)

  return (
    <div
      className={`relative rounded-[24px] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group bg-slate-900 flex flex-col justify-end ${
        isLeader
          ? 'aspect-[4/5] sm:aspect-[3/4] border-2 border-amber-400/40 shadow-amber-900/10'
          : 'aspect-[3/4]'
      }`}
    >
      {/* Background Teacher Photo */}
      <img
        src={photoUrl}
        alt={teacher.nama_guru}
        className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
        loading="lazy"
      />

      {/* Deep Gradient Shadow Overlay at Bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent pointer-events-none" />

      {/* Card Content at Bottom */}
      <div className="relative p-5 sm:p-6 z-10">
        {/* Role Badge */}
        <div className="mb-2">
          <span
            className={`inline-block px-3 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase shadow-xs ${meta.badgeColor}`}
          >
            {meta.badge}
          </span>
        </div>

        {/* Teacher Name */}
        <h3
          className={`font-serif font-bold text-white leading-snug drop-shadow-sm group-hover:text-amber-300 transition-colors ${
            isLeader ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
          }`}
        >
          {teacher.nama_guru}
        </h3>

        {/* Role / Subject */}
        <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1.5 leading-snug line-clamp-2">
          {meta.subject}
        </p>

        {/* NIP */}
        {teacher.nip && teacher.nip !== '0000000000000000' && (
          <p className="text-[10px] text-slate-400 font-mono mt-2 tracking-tight">
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
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'pimpinan' | 'wali_kelas' | 'guru' | 'staf'

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
    let isMounted = true
    axios
      .get('http://127.0.0.1:8000/api/guru', { params: { per_page: 100 } })
      .then((res) => {
        if (isMounted && res.data?.success && res.data.data?.data) {
          setTeachers(res.data.data.data)
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error(err)
          setError('Gagal memuat data dewan guru dari server.')
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  // Categorize and filter teachers
  const categorized = useMemo(() => {
    const pimpinan = []
    const waliKelas = []
    const guruMapel = []
    const staf = []

    teachers.forEach((t) => {
      const meta = getTeacherMeta(t)
      if (meta.category === 'pimpinan') {
        pimpinan.push(t)
      } else if (meta.category === 'wali_kelas') {
        waliKelas.push(t)
      } else if (meta.category === 'staf') {
        staf.push(t)
      } else {
        guruMapel.push(t)
      }
    })

    // Sort Pimpinan: Kepala Madrasah first (order 1), then Wakil (order 2)
    pimpinan.sort((a, b) => {
      const metaA = getTeacherMeta(a)
      const metaB = getTeacherMeta(b)
      return (metaA.order || 99) - (metaB.order || 99)
    })

    // Sort Wali Kelas: 1A, 1B, 1C ... 6C
    waliKelas.sort((a, b) => {
      const kA = a.kelas_details?.[0]?.kelas?.kelas || ''
      const kB = b.kelas_details?.[0]?.kelas?.kelas || ''
      return kA.localeCompare(kB, undefined, { numeric: true, sensitivity: 'base' })
    })

    return { pimpinan, waliKelas, guruMapel, staf }
  }, [teachers])

  // Filter based on active tab and search query
  const matchesSearch = (teacher, query) => {
    if (!query) return true
    const q = query.toLowerCase()
    const meta = getTeacherMeta(teacher)
    const matchName = teacher.nama_guru?.toLowerCase().includes(q)
    const matchNip = teacher.nip?.toLowerCase().includes(q)
    const matchSubject = meta.subject?.toLowerCase().includes(q)
    const matchBadge = meta.badge?.toLowerCase().includes(q)
    const matchKelas = teacher.kelas_details?.some((kd) =>
      kd.kelas?.kelas?.toLowerCase().includes(q)
    )
    return matchName || matchNip || matchSubject || matchBadge || matchKelas
  }

  const filteredPimpinan = useMemo(() => {
    return categorized.pimpinan.filter((t) => matchesSearch(t, searchTerm))
  }, [categorized.pimpinan, searchTerm])

  const filteredWali = useMemo(() => {
    return categorized.waliKelas.filter((t) => matchesSearch(t, searchTerm))
  }, [categorized.waliKelas, searchTerm])

  const filteredGuru = useMemo(() => {
    return categorized.guruMapel.filter((t) => matchesSearch(t, searchTerm))
  }, [categorized.guruMapel, searchTerm])

  const filteredStaf = useMemo(() => {
    return categorized.staf.filter((t) => matchesSearch(t, searchTerm))
  }, [categorized.staf, searchTerm])

  const totalFilteredCount = useMemo(() => {
    if (activeTab === 'pimpinan') return filteredPimpinan.length
    if (activeTab === 'wali_kelas') return filteredWali.length
    if (activeTab === 'guru') return filteredGuru.length
    if (activeTab === 'staf') return filteredStaf.length
    return (
      filteredPimpinan.length +
      filteredWali.length +
      filteredGuru.length +
      filteredStaf.length
    )
  }, [activeTab, filteredPimpinan, filteredWali, filteredGuru, filteredStaf])

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
              Struktur Pendidik &amp; Tenaga Kependidikan
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-tight drop-shadow-sm">
              Guru &amp; Tenaga Kependidikan
            </h1>
            <p className="mt-4 text-base sm:text-lg text-emerald-50/90 font-body leading-relaxed max-w-2xl">
              Mengenal pimpinan madrasah, dewan asatidz wali kelas, guru mata pelajaran, dan segenap tenaga kependidikan MI Roudotutta'lim yang membimbing putra-putri madrasah dengan ketulusan dan keteladanan.
            </p>

            {/* Quick Metrics Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15 flex items-center gap-2">
                <span className="material-symbols-outlined text-gold text-[20px]">groups</span>
                <span className="text-xs sm:text-sm font-medium text-white">
                  <strong>{teachers.length || 36}</strong> Total GTK Madrasah
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
                  4 Divisi Terstruktur
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin mt-12 space-y-14" ref={staffRef}>
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama guru, NIP, mapel, atau rombel..."
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
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
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
              onClick={() => setActiveTab('pimpinan')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === 'pimpinan'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
              }`}
            >
              Pimpinan ({categorized.pimpinan.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('wali_kelas')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === 'wali_kelas'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
              }`}
            >
              Wali Kelas ({categorized.waliKelas.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('guru')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === 'guru'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
              }`}
            >
              Guru Mapel ({categorized.guruMapel.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('staf')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === 'staf'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
              }`}
            >
              Tenaga Kerja &amp; Staf ({categorized.staf.length})
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
        {!loading && !error && totalFilteredCount === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center my-6">
            <span className="material-symbols-outlined text-slate-300 text-[54px] mb-3">
              person_search
            </span>
            <h3 className="font-serif font-bold text-lg text-slate-800">Tidak ada guru atau staf ditemukan</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              {searchTerm
                ? `Tidak ada data yang cocok dengan pencarian "${searchTerm}".`
                : 'Belum ada data pada kategori yang dipilih.'}
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

        {/* Structured Sections Render */}
        {!loading && !error && totalFilteredCount > 0 && (
          <div className="space-y-16">
            {/* 1. SEKSI PIMPINAN MADRASAH (Kepsek & Wakepsek) */}
            {(activeTab === 'all' || activeTab === 'pimpinan') && filteredPimpinan.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">award_star</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                        Pimpinan Madrasah
                      </h2>
                      <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                        {filteredPimpinan.length} orang
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Kepala Madrasah &amp; Wakil Kepala Madrasah penanggung jawab mutu pendidikan.
                    </p>
                  </div>
                  <div className="flex-1 h-px bg-slate-200 hidden sm:block ml-4" />
                </div>

                {/* 2 Prominent Centered Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-6 sm:gap-8 pt-2">
                  {filteredPimpinan.map((teacher, idx) => (
                    <TeacherCard
                      key={teacher.idguru || idx}
                      teacher={teacher}
                      idx={idx}
                      isLeader={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 2. SEKSI WALI KELAS (18 Rombel 1A - 6C) */}
            {(activeTab === 'all' || activeTab === 'wali_kelas') && filteredWali.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">school</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                        Wali Kelas Madrasah
                      </h2>
                      <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {filteredWali.length} Rombel (1A - 6C)
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Membimbing perkembangan belajar, karakter, dan pemantauan santri per rombel.
                    </p>
                  </div>
                  <div className="flex-1 h-px bg-slate-200 hidden sm:block ml-4" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredWali.map((teacher, idx) => (
                    <TeacherCard
                      key={teacher.idguru || idx}
                      teacher={teacher}
                      idx={idx + 10}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 3. SEKSI GURU MATA PELAJARAN */}
            {(activeTab === 'all' || activeTab === 'guru') && filteredGuru.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">menu_book</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                        Guru Mata Pelajaran
                      </h2>
                      <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-300">
                        {filteredGuru.length} orang
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Pendidik bidang studi keagamaan Islam, keolahragaan, bahasa, sains, dan seni budaya.
                    </p>
                  </div>
                  <div className="flex-1 h-px bg-slate-200 hidden sm:block ml-4" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredGuru.map((teacher, idx) => (
                    <TeacherCard
                      key={teacher.idguru || idx}
                      teacher={teacher}
                      idx={idx + 30}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 4. SEKSI TENAGA KEPENDIDIKAN & TENAGA KERJA */}
            {(activeTab === 'all' || activeTab === 'staf') && filteredStaf.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">badge</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                        Tenaga Kependidikan &amp; Tenaga Kerja
                      </h2>
                      <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-300">
                        {filteredStaf.length} orang
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Staf tata usaha, operator sistem EMIS, perpustakaan, sarana prasarana, dan keamanan lingkungan.
                    </p>
                  </div>
                  <div className="flex-1 h-px bg-slate-200 hidden sm:block ml-4" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                  {filteredStaf.map((teacher, idx) => (
                    <TeacherCard
                      key={teacher.idguru || idx}
                      teacher={teacher}
                      idx={idx + 50}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CTA Banner */}
        <section
          ref={ctaRef}
          className="relative overflow-hidden bg-emerald-deep rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 mt-16"
        >
          <div className="max-w-xl">
            <span className="text-gold text-xs font-bold uppercase tracking-wider">
              Keluarga Besar Madrasah
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-2">
              Ingin Mengenal Lebih Dekat Dewan Pendidik Kami?
            </h3>
            <p className="text-sm text-emerald-100/90 mt-2 leading-relaxed">
              Silaturahmi dan konsultasi pendidikan putra-putri Anda terbuka luas. Hubungi layanan tata usaha madrasah pada jam operasional sekolah.
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
