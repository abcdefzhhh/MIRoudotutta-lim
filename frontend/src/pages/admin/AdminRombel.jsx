import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import BatchQrCardsModal from '../../components/BatchQrCardsModal'

export default function AdminRombel() {
  const [rombelList, setRombelList] = useState([])
  const [kelasList, setKelasList] = useState([])
  const [guruList, setGuruList] = useState([])
  const [tahunList, setTahunList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [filterTahun, setFilterTahun] = useState('')
  const [filterTingkat, setFilterTingkat] = useState('Semua')
  const [toast, setToast] = useState(null)

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isAnggotaOpen, setIsAnggotaOpen] = useState(false)
  const [isTahunOpen, setIsTahunOpen] = useState(false)
  const [selectedRombel, setSelectedRombel] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // Batch QR Card per Class
  const [isBatchQrOpen, setIsBatchQrOpen] = useState(false)
  const [batchClass, setBatchClass] = useState('1A')
  const [batchStudents, setBatchStudents] = useState([])
  const [loadingBatch, setLoadingBatch] = useState(false)

  const classList = [
    '1A', '1B', '1C',
    '2A', '2B', '2C',
    '3A', '3B', '3C',
    '4A', '4B', '4C',
    '5A', '5B', '5C',
    '6A', '6B', '6C',
  ]

  const openBatchQrFromRombel = async (item) => {
    const clsName = item.kelas?.kelas || '1A'
    setBatchClass(clsName)
    setIsBatchQrOpen(true)
    setLoadingBatch(true)
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/siswa', {
        params: { rombel: clsName, per_page: 100 },
      })
      if (res.data?.success && res.data.data?.data) {
        setBatchStudents(res.data.data.data)
      } else {
        setBatchStudents([])
      }
    } catch (err) {
      console.error(err)
      showToast('Gagal memuat data Siswa untuk cetak kartu.', 'error')
    } finally {
      setLoadingBatch(false)
    }
  }

  const handleBatchClassChange = (newCls) => {
    setBatchClass(newCls)
    setLoadingBatch(true)
    axios
      .get('http://127.0.0.1:8000/api/siswa', {
        params: { rombel: newCls, per_page: 100 },
      })
      .then((res) => {
        if (res.data?.success && res.data.data?.data) {
          setBatchStudents(res.data.data.data)
        } else {
          setBatchStudents([])
        }
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoadingBatch(false)
      })
  }

  // Anggota Modal states
  const [anggotaSiswa, setAnggotaSiswa] = useState([])
  const [availableSiswa, setAvailableSiswa] = useState([])
  const [selectedSiswaId, setSelectedSiswaId] = useState('')
  const [loadingAnggota, setLoadingAnggota] = useState(false)
  const [searchAvailableSiswa, setSearchAvailableSiswa] = useState('')
  const [searchAnggotaQuery, setSearchAnggotaQuery] = useState('')
  const [addingSiswaId, setAddingSiswaId] = useState(null)

  // Form states (Rombel)
  const [formData, setFormData] = useState({
    idkelas: '',
    idguru: '',
    idthahunajaran: '',
  })

  // Form states (Tahun Ajaran)
  const [tahunForm, setTahunForm] = useState({
    thnajaran: '',
    tglmulai: new Date().toISOString().split('T')[0],
  })

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  // Fetch all dependencies (Tahun Ajaran, Kelas, Guru)
  const fetchDependencies = async () => {
    try {
      const [resTahun, resKelas, resGuru] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/tahun-ajaran'),
        axios.get('http://127.0.0.1:8000/api/kelas'),
        axios.get('http://127.0.0.1:8000/api/guru'),
      ])

      if (resTahun.data && resTahun.data.success) {
        setTahunList(resTahun.data.data)
        if (resTahun.data.data.length > 0 && !filterTahun) {
          setFilterTahun(String(resTahun.data.data[0].idthnajaran))
        }
      }
      if (resKelas.data && resKelas.data.success) {
        setKelasList(resKelas.data.data)
      }
      if (resGuru.data && resGuru.data.success) {
        setGuruList(resGuru.data.data?.data || resGuru.data.data || [])
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Fetch Rombel
  const fetchRombel = async () => {
    setLoading(true)
    setError(null)
    try {
      const url = filterTahun
        ? `http://127.0.0.1:8000/api/rombel?idthahunajaran=${filterTahun}`
        : 'http://127.0.0.1:8000/api/rombel'
      const res = await axios.get(url)
      if (res.data && res.data.success) {
        setRombelList(res.data.data)
      } else {
        setRombelList([])
      }
    } catch (err) {
      console.error(err)
      setError('Gagal menghubungkan ke backend API. Pastikan server Laravel aktif.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDependencies()
  }, [])

  useEffect(() => {
    fetchRombel()
  }, [filterTahun])

  // Open Create Modal
  const openCreateModal = () => {
    setFormData({
      idkelas: kelasList[0]?.idkelas || '',
      idguru: guruList[0]?.idguru || '',
      idthahunajaran: filterTahun || tahunList[0]?.idthnajaran || '',
    })
    setIsCreateOpen(true)
  }

  // Handle Create Submit
  const handleCreateSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/rombel', formData)
      if (res.data && res.data.success) {
        showToast('Rombongan belajar baru berhasil dibuat!', 'success')
        setIsCreateOpen(false)
        fetchRombel()
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal membuat rombel.'
      showToast(msg, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  // Open Edit Modal
  const openEditModal = (item) => {
    setSelectedRombel(item)
    setFormData({
      idkelas: item.idkelas,
      idguru: item.idguru,
      idthahunajaran: item.idthahunajaran,
    })
    setIsEditOpen(true)
  }

  // Handle Edit Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault()
    if (!selectedRombel) return
    setSubmitting(true)
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/rombel/${selectedRombel.idkelasdetail}`,
        formData
      )
      if (res.data && res.data.success) {
        showToast('Rombongan belajar berhasil diperbarui.', 'success')
        setIsEditOpen(false)
        setSelectedRombel(null)
        fetchRombel()
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal memperbarui rombel.'
      showToast(msg, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  // Open Delete Modal
  const openDeleteModal = (item) => {
    setSelectedRombel(item)
    setIsDeleteOpen(true)
  }

  // Handle Delete Confirm
  const handleDeleteConfirm = async () => {
    if (!selectedRombel) return
    setSubmitting(true)
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/rombel/${selectedRombel.idkelasdetail}`
      )
      if (res.data && res.data.success) {
        showToast('Rombel berhasil dihapus.', 'success')
        setIsDeleteOpen(false)
        setSelectedRombel(null)
        fetchRombel()
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal menghapus rombel.'
      showToast(msg, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  // Open Manage Anggota Modal
  const openAnggotaModal = async (item) => {
    setSelectedRombel(item)
    setIsAnggotaOpen(true)
    setLoadingAnggota(true)
    setSelectedSiswaId('')
    setSearchAvailableSiswa('')
    setSearchAnggotaQuery('')
    setAddingSiswaId(null)
    try {
      const [resDetail, resAvailable] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/api/rombel/${item.idkelasdetail}`),
        axios.get(`http://127.0.0.1:8000/api/rombel/${item.idkelasdetail}/available-siswa`),
      ])

      if (resDetail.data && resDetail.data.success) {
        setAnggotaSiswa(resDetail.data.data?.siswa_kelas || [])
      }
      if (resAvailable.data && resAvailable.data.success) {
        setAvailableSiswa(resAvailable.data.data || [])
      }
    } catch (err) {
      console.error(err)
      showToast('Gagal memuat anggota siswa rombel.', 'error')
    } finally {
      setLoadingAnggota(false)
    }
  }

  // Add Siswa to Rombel (supports 1-click direct add or form submit)
  const handleAddSiswa = async (e, directId = null, studentName = '') => {
    if (e && e.preventDefault) e.preventDefault()
    const targetId = directId || selectedSiswaId
    if (!selectedRombel || !targetId) return

    setAddingSiswaId(targetId)
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/rombel/${selectedRombel.idkelasdetail}/siswa`,
        { idsiswa: targetId }
      )
      if (res.data && res.data.success) {
        showToast(
          studentName
            ? `${studentName} berhasil dimasukkan ke rombel.`
            : 'Siswa berhasil ditambahkan ke rombel.',
          'success'
        )
        setSelectedSiswaId('')
        // Refresh data anggota & available secara paralel
        const [resDetail, resAvailable] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/api/rombel/${selectedRombel.idkelasdetail}`),
          axios.get(`http://127.0.0.1:8000/api/rombel/${selectedRombel.idkelasdetail}/available-siswa`),
        ])
        if (resDetail.data && resDetail.data.success) {
          setAnggotaSiswa(resDetail.data.data?.siswa_kelas || [])
        }
        if (resAvailable.data && resAvailable.data.success) {
          setAvailableSiswa(resAvailable.data.data || [])
        }
        fetchRombel()
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal menambahkan siswa.'
      showToast(msg, 'error')
    } finally {
      setAddingSiswaId(null)
    }
  }

  // Remove Siswa from Rombel
  const handleRemoveSiswa = async (idsiswa, namaSiswa) => {
    if (!window.confirm(`Keluarkan ${namaSiswa} dari rombel ini?`)) return
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/rombel/${selectedRombel.idkelasdetail}/siswa/${idsiswa}`
      )
      if (res.data && res.data.success) {
        showToast('Siswa berhasil dikeluarkan dari rombel.', 'success')
        openAnggotaModal(selectedRombel)
        fetchRombel()
      }
    } catch (err) {
      showToast('Gagal mengeluarkan siswa.', 'error')
    }
  }

  // Create Tahun Ajaran
  const handleCreateTahunSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/tahun-ajaran', tahunForm)
      if (res.data && res.data.success) {
        showToast('Tahun ajaran baru berhasil ditambahkan.', 'success')
        setTahunForm({
          thnajaran: '',
          tglmulai: new Date().toISOString().split('T')[0],
        })
        fetchDependencies()
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal menambahkan tahun ajaran.'
      showToast(msg, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  // Filter Rombel
  const filteredRombel = rombelList.filter((item) => {
    const namaKelas = item.kelas?.kelas || ''
    const namaWali = item.guru?.nama_guru || ''
    const matchesSearch =
      namaKelas.toLowerCase().includes(search.toLowerCase()) ||
      namaWali.toLowerCase().includes(search.toLowerCase())
    const matchesTingkat =
      filterTingkat === 'Semua' || String(item.kelas?.tingkat) === String(filterTingkat)
    return matchesSearch && matchesTingkat
  })

  // Filter siswa yang belum masuk rombel untuk fitur search pencarian cepat
  const filteredAvailableSiswa = useMemo(() => {
    if (!searchAvailableSiswa.trim()) return []
    const q = searchAvailableSiswa.toLowerCase().trim()
    return availableSiswa.filter(
      (s) =>
        s.nama?.toLowerCase().includes(q) ||
        s.nis?.toLowerCase().includes(q) ||
        (s.nisn && s.nisn.toLowerCase().includes(q))
    )
  }, [availableSiswa, searchAvailableSiswa])

  // Filter daftar siswa yang sudah terdaftar di rombel ini
  const filteredAnggotaSiswa = useMemo(() => {
    if (!searchAnggotaQuery.trim()) return anggotaSiswa
    const q = searchAnggotaQuery.toLowerCase().trim()
    return anggotaSiswa.filter((item) => {
      const nama = item.siswa?.nama?.toLowerCase() || ''
      const nis = item.siswa?.nis?.toLowerCase() || ''
      const nisn = item.siswa?.nisn?.toLowerCase() || ''
      return nama.includes(q) || nis.includes(q) || nisn.includes(q)
    })
  }, [anggotaSiswa, searchAnggotaQuery])

  const totalSiswaRombel = rombelList.reduce((acc, curr) => acc + (curr.total_siswa || 0), 0)

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`p-4 rounded-xl text-sm flex items-center justify-between gap-3 shadow-sm border animate-fade-in ${
            toast.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">
              {toast.type === 'error' ? 'error' : 'check_circle'}
            </span>
            <span className="font-medium">{toast.message}</span>
          </div>
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-slate-600 text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Rombongan Belajar (Rombel) &amp; Wali Kelas
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Kelola pembagian kelas, penugasan wali kelas, dan daftar siswa aktif per tahun ajaran.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              handleBatchClassChange(classList[0] || '1A')
              setIsBatchQrOpen(true)
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-teal-300 bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold text-xs sm:text-sm shadow-xs transition-colors"
            title="Cetak Seluruh Kartu Siswa Berdasarkan Kelas"
          >
            <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
            <span>Cetak QR per Kelas</span>
          </button>
          <button
            type="button"
            onClick={() => setIsTahunOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            <span>Tahun Ajaran</span>
          </button>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-all duration-200 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>+ Buka Rombel Baru</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Total Rombel Aktif
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-slate-900">{rombelList.length}</span>
            <span className="text-xs text-slate-500">Rombongan Belajar</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Total Siswa Terdaftar
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-emerald-600">{totalSiswaRombel}</span>
            <span className="text-xs text-slate-500">Siswa di Rombel</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Tahun Ajaran Terpilih
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-xl font-bold text-slate-800">
              {tahunList.find((t) => String(t.idthnajaran) === String(filterTahun))?.thnajaran ||
                'Semua Tahun'}
            </span>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
              Aktif
            </span>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        {/* Table Filters */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-60">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                search
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari kelas / wali..."
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Filter Tahun Ajaran */}
            <select
              value={filterTahun}
              onChange={(e) => setFilterTahun(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white text-slate-700 font-medium"
            >
              <option value="">Semua Tahun Ajaran</option>
              {tahunList.map((t) => (
                <option key={t.idthnajaran} value={t.idthnajaran}>
                  Tahun {t.thnajaran}
                </option>
              ))}
            </select>

            {/* Filter Tingkat */}
            <select
              value={filterTingkat}
              onChange={(e) => setFilterTingkat(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white text-slate-700 font-medium"
            >
              <option value="Semua">Semua Tingkat</option>
              {[1, 2, 3, 4, 5, 6].map((t) => (
                <option key={t} value={t}>
                  Tingkat {t}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 self-end sm:self-auto">
            <span>
              Menampilkan {filteredRombel.length} dari {rombelList.length} rombel
            </span>
            <button
              type="button"
              onClick={fetchRombel}
              className="p-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors"
              title="Refresh Data"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200 text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-14 text-center">ID</th>
                <th className="py-3.5 px-4">Kelas &amp; Tingkat</th>
                <th className="py-3.5 px-4">Wali Kelas</th>
                <th className="py-3.5 px-4 w-32 text-center">Tahun Ajaran</th>
                <th className="py-3.5 px-4 w-36 text-center">Anggota Siswa</th>
                <th className="py-3.5 px-4 w-48 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {/* Loading State */}
              {loading && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    <div className="flex flex-col items-center gap-2">
                      <span className="material-symbols-outlined text-[28px] animate-spin text-emerald-600">
                        sync
                      </span>
                      <span className="text-xs">Memuat data rombel...</span>
                    </div>
                  </td>
                </tr>
              )}

              {/* Error State */}
              {error && !loading && (
                <tr>
                  <td colSpan="6" className="py-8 text-center">
                    <div className="text-rose-600 text-sm font-medium mb-2">{error}</div>
                    <button
                      onClick={fetchRombel}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                    >
                      Coba Lagi
                    </button>
                  </td>
                </tr>
              )}

              {/* Empty State */}
              {!loading && !error && filteredRombel.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2 text-slate-400">
                      <span className="material-symbols-outlined text-[24px]">groups</span>
                    </div>
                    <p className="text-sm font-medium text-slate-700">
                      Belum ada rombel pada kriteria ini
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Klik tombol "+ Buka Rombel Baru" untuk menugaskan kelas dan wali kelas.
                    </p>
                  </td>
                </tr>
              )}

              {/* Rows */}
              {!loading &&
                !error &&
                filteredRombel.map((item) => (
                  <tr
                    key={item.idkelasdetail}
                    className="hover:bg-slate-50/70 transition-colors duration-150"
                  >
                    <td className="py-3.5 px-4 text-center font-mono text-xs text-slate-500">
                      {item.idkelasdetail}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-base">
                        Kelas {item.kelas?.kelas || '-'}
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mt-1">
                        Tingkat {item.kelas?.tingkat || '-'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">
                        {item.guru?.nama_guru || 'Belum ditugaskan'}
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">
                        NIP: {item.guru?.nip || '-'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-semibold text-slate-800 text-sm">
                        {item.tahun_ajaran?.thnajaran || '-'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-xs">
                        <span className="material-symbols-outlined text-[16px]">school</span>
                        <span>{item.total_siswa || 0} Siswa</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* Manage Anggota Siswa */}
                        <button
                          type="button"
                          onClick={() => openAnggotaModal(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold border border-emerald-200 transition-colors"
                          title="Kelola Siswa di Rombel"
                        >
                          <span className="material-symbols-outlined text-[16px]">group_add</span>
                          <span>Kelola Siswa</span>
                        </button>

                        {/* Cetak Kartu QR Kelas Ini */}
                        <button
                          type="button"
                          onClick={() => openBatchQrFromRombel(item)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-semibold border border-teal-200 transition-colors"
                          title={`Cetak Seluruh Kartu Siswa Kelas ${item.kelas?.kelas}`}
                        >
                          <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
                          <span>Kartu QR</span>
                        </button>

                        {/* Edit Rombel */}
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                          title="Edit Rombel"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>

                        {/* Delete Rombel */}
                        <button
                          type="button"
                          onClick={() => openDeleteModal(item)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Hapus Rombel"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: KELOLA ANGGOTA SISWA ROMBEL */}
      {isAnggotaOpen && selectedRombel && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3.5rem)] flex flex-col overflow-hidden my-auto animate-modal-pop">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-bold text-lg text-slate-900">
                  Anggota Siswa — Kelas {selectedRombel.kelas?.kelas}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Wali Kelas: <span className="font-semibold text-slate-700">{selectedRombel.guru?.nama_guru}</span> • Tahun: {selectedRombel.tahun_ajaran?.thnajaran}
                </p>
              </div>
              <button
                onClick={() => setIsAnggotaOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Form & Pencarian Tambah Siswa ke Rombel */}
              <div className="bg-slate-50/90 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[17px] text-emerald-600">person_search</span>
                    <span>Cari &amp; Masukkan Siswa ke Rombel</span>
                  </h4>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shrink-0">
                    {availableSiswa.length} Siswa Tersedia
                  </span>
                </div>

                {/* Input Pencarian Siswa */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined text-[20px]">search</span>
                  </div>
                  <input
                    type="text"
                    value={searchAvailableSiswa}
                    onChange={(e) => setSearchAvailableSiswa(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        if (filteredAvailableSiswa.length > 0 && !addingSiswaId) {
                          const topStudent = filteredAvailableSiswa[0]
                          handleAddSiswa(null, topStudent.idsiswa, topStudent.nama)
                        }
                      }
                    }}
                    placeholder={`Ketik nama atau NIS santri... (tersedia ${availableSiswa.length} siswa)`}
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-2xs"
                  />
                  {searchAvailableSiswa && (
                    <button
                      type="button"
                      onClick={() => setSearchAvailableSiswa('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                      title="Hapus pencarian"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  )}
                </div>

                {/* Hasil Pencarian Siswa yang Belum Ada di Rombel */}
                {searchAvailableSiswa.trim() ? (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                      <span>
                        Hasil Pencarian:{' '}
                        <strong className="text-slate-800 font-semibold">{filteredAvailableSiswa.length}</strong> siswa
                        {filteredAvailableSiswa.length > 8 && ' (menampilkan 8 teratas)'}
                      </span>
                      {filteredAvailableSiswa.length > 0 && (
                        <span className="text-[11px] text-slate-400 hidden sm:inline">
                          Tekan <kbd className="px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded text-[10px] font-mono">Enter</kbd> untuk langsung masukkan siswa teratas
                        </span>
                      )}
                    </div>

                    {filteredAvailableSiswa.length === 0 ? (
                      <div className="p-4 bg-white border border-dashed border-slate-200 rounded-xl text-center">
                        <span className="material-symbols-outlined text-[26px] text-slate-300">person_off</span>
                        <p className="text-xs font-semibold text-slate-600 mt-1">
                          Tidak ditemukan siswa dengan kata kunci "{searchAvailableSiswa}"
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Coba cari dengan NIS atau ejaan nama lain.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 max-h-56 overflow-y-auto shadow-2xs">
                        {filteredAvailableSiswa.slice(0, 8).map((s) => (
                          <div
                            key={s.idsiswa}
                            className="p-2.5 sm:px-3 flex items-center justify-between gap-2 hover:bg-emerald-50/50 transition-colors"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                                {s.nama ? s.nama.charAt(0).toUpperCase() : 'S'}
                              </div>
                              <div className="min-w-0">
                                <div className="font-semibold text-xs sm:text-sm text-slate-900 truncate">
                                  {s.nama}
                                </div>
                                <div className="text-[11px] text-slate-500 font-mono">
                                  NIS: {s.nis} {s.nisn ? `• NISN: ${s.nisn}` : ''}
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              disabled={addingSiswaId === s.idsiswa}
                              onClick={() => handleAddSiswa(null, s.idsiswa, s.nama)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-2xs transition-all active:scale-[0.98] disabled:opacity-50 shrink-0 flex items-center gap-1"
                              title={`Masukkan ${s.nama} ke rombel`}
                            >
                              {addingSiswaId === s.idsiswa ? (
                                <>
                                  <span className="material-symbols-outlined text-[14px] animate-spin">sync</span>
                                  <span>Menambahkan...</span>
                                </>
                              ) : (
                                <>
                                  <span className="material-symbols-outlined text-[15px]">person_add</span>
                                  <span>+ Masukkan</span>
                                </>
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-3 bg-white border border-slate-200/70 rounded-lg flex items-center gap-2.5 text-xs text-slate-500">
                    <span className="material-symbols-outlined text-[18px] text-emerald-600 shrink-0">lightbulb</span>
                    <span>
                      Ketik nama siswa atau nomor NIS di kolom pencarian di atas untuk memasukkan siswa ke rombel ini dengan cepat.
                    </span>
                  </div>
                )}
              </div>

              {/* Daftar Siswa Saat Ini */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Daftar Siswa Terdaftar ({anggotaSiswa.length} Siswa)
                    </h4>
                    <p className="text-xs text-slate-500">
                      {searchAnggotaQuery.trim() ? (
                        <span>Menampilkan {filteredAnggotaSiswa.length} dari {anggotaSiswa.length} siswa</span>
                      ) : (
                        <span>Urut berdasarkan nama</span>
                      )}
                    </p>
                  </div>

                  {anggotaSiswa.length > 5 && (
                    <div className="relative sm:w-56">
                      <span className="material-symbols-outlined text-[16px] text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                        search
                      </span>
                      <input
                        type="text"
                        value={searchAnggotaQuery}
                        onChange={(e) => setSearchAnggotaQuery(e.target.value)}
                        placeholder="Cari di rombel ini..."
                        className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                      />
                      {searchAnggotaQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchAnggotaQuery('')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                          title="Bersihkan filter"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {loadingAnggota ? (
                  <div className="py-8 text-center text-slate-500">
                    <span className="material-symbols-outlined text-[24px] animate-spin text-emerald-600">sync</span>
                    <p className="text-xs mt-1">Memuat daftar siswa...</p>
                  </div>
                ) : anggotaSiswa.length === 0 ? (
                  <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl">
                    <span className="material-symbols-outlined text-[28px] text-slate-400">group_off</span>
                    <p className="text-sm font-semibold text-slate-700 mt-1">Belum ada siswa di rombel ini</p>
                    <p className="text-xs text-slate-400 mt-0.5">Ketik nama atau NIS pada kotak pencarian di atas untuk memasukkan siswa pertama.</p>
                  </div>
                ) : filteredAnggotaSiswa.length === 0 ? (
                  <div className="p-6 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50">
                    <span className="material-symbols-outlined text-[24px] text-slate-400">search_off</span>
                    <p className="text-xs font-semibold text-slate-600 mt-1">
                      Tidak ada siswa di rombel ini yang cocok dengan "{searchAnggotaQuery}"
                    </p>
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200 max-h-72 overflow-y-auto">
                    {filteredAnggotaSiswa.map((item, idx) => (
                      <div
                        key={item.idsiswakelas || idx}
                        className="p-3 sm:px-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-slate-400 w-6 text-center">{idx + 1}</span>
                          <div>
                            <div className="font-semibold text-slate-900 text-sm">{item.siswa?.nama}</div>
                            <div className="text-xs text-slate-500 font-mono">
                              NIS: {item.siswa?.nis} • NISN: {item.siswa?.nisn || '-'}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveSiswa(item.idsiswa, item.siswa?.nama)}
                          className="px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors flex items-center gap-1"
                          title="Keluarkan dari Rombel"
                        >
                          <span className="material-symbols-outlined text-[16px]">person_remove</span>
                          <span className="hidden sm:inline">Keluarkan</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setIsAnggotaOpen(false)}
                className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs shadow-xs transition-colors"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: BUKA ROMBEL BARU */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-4 my-auto animate-modal-pop">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Buka Rombel Baru</h3>
                <p className="text-xs text-slate-500">Tentukan kelas, wali kelas, dan tahun ajaran.</p>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pilih Kelas *
                </label>
                <select
                  required
                  value={formData.idkelas}
                  onChange={(e) => setFormData({ ...formData, idkelas: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white"
                >
                  <option value="">-- Pilih Kelas --</option>
                  {kelasList.map((k) => (
                    <option key={k.idkelas} value={k.idkelas}>
                      Kelas {k.kelas} (Tingkat {k.tingkat})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Wali Kelas (Guru) *
                </label>
                <select
                  required
                  value={formData.idguru}
                  onChange={(e) => setFormData({ ...formData, idguru: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white"
                >
                  <option value="">-- Pilih Guru Wali Kelas --</option>
                  {guruList.map((g) => (
                    <option key={g.idguru} value={g.idguru}>
                      {g.nama_guru} (NIP: {g.nip})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tahun Ajaran *
                </label>
                <select
                  required
                  value={formData.idthahunajaran}
                  onChange={(e) => setFormData({ ...formData, idthahunajaran: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white"
                >
                  <option value="">-- Pilih Tahun Ajaran --</option>
                  {tahunList.map((t) => (
                    <option key={t.idthnajaran} value={t.idthnajaran}>
                      Tahun Ajaran {t.thnajaran}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium text-xs hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-1.5"
                >
                  {submitting && (
                    <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                  )}
                  <span>Buat Rombel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT ROMBEL */}
      {isEditOpen && selectedRombel && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-4 my-auto animate-modal-pop">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-bold text-lg text-slate-900">
                  Edit Rombel Kelas {selectedRombel.kelas?.kelas}
                </h3>
                <p className="text-xs text-slate-500">Perbarui penugasan wali kelas atau kelas.</p>
              </div>
              <button
                onClick={() => setIsEditOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pilih Kelas *
                </label>
                <select
                  required
                  value={formData.idkelas}
                  onChange={(e) => setFormData({ ...formData, idkelas: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white"
                >
                  {kelasList.map((k) => (
                    <option key={k.idkelas} value={k.idkelas}>
                      Kelas {k.kelas} (Tingkat {k.tingkat})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Wali Kelas (Guru) *
                </label>
                <select
                  required
                  value={formData.idguru}
                  onChange={(e) => setFormData({ ...formData, idguru: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white"
                >
                  {guruList.map((g) => (
                    <option key={g.idguru} value={g.idguru}>
                      {g.nama_guru} (NIP: {g.nip})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tahun Ajaran *
                </label>
                <select
                  required
                  value={formData.idthahunajaran}
                  onChange={(e) => setFormData({ ...formData, idthahunajaran: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white"
                >
                  {tahunList.map((t) => (
                    <option key={t.idthnajaran} value={t.idthnajaran}>
                      Tahun Ajaran {t.thnajaran}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium text-xs hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-1.5"
                >
                  {submitting && (
                    <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                  )}
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: HAPUS ROMBEL */}
      {isDeleteOpen && selectedRombel && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-4 my-auto animate-modal-pop">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[28px]">delete_forever</span>
            </div>

            <div className="text-center">
              <h3 className="font-bold text-base text-slate-900">Hapus Rombongan Belajar?</h3>
              <p className="text-xs text-slate-500 mt-1">Apakah Anda yakin ingin menghapus rombel:</p>
              <p className="text-base font-bold text-slate-800 mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                Kelas {selectedRombel.kelas?.kelas} ({selectedRombel.tahun_ajaran?.thnajaran})
              </p>
              <p className="text-[11px] text-rose-600 mt-2">
                Data penempatan siswa di rombel ini akan dibatalkan.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium text-xs hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleDeleteConfirm}
                className="px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-1.5"
              >
                {submitting && (
                  <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                )}
                <span>Ya, Hapus</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: KELOLA TAHUN AJARAN */}
      {isTahunOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-5 my-auto animate-modal-pop">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Kelola Tahun Ajaran</h3>
                <p className="text-xs text-slate-500">Daftar periode kalender akademik madrasah.</p>
              </div>
              <button
                onClick={() => setIsTahunOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Form Tambah Tahun Ajaran */}
            <form onSubmit={handleCreateTahunSubmit} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">add</span>
                <span>Tambah Tahun Ajaran Baru</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tahun Ajaran *
                  </label>
                  <input
                    type="text"
                    required
                    value={tahunForm.thnajaran}
                    onChange={(e) => setTahunForm({ ...tahunForm, thnajaran: e.target.value })}
                    placeholder="Contoh: 2026/2027"
                    className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tgl Mulai Berlaku *
                  </label>
                  <input
                    type="date"
                    required
                    value={tahunForm.tglmulai}
                    onChange={(e) => setTahunForm({ ...tahunForm, tglmulai: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">save</span>
                  <span>Simpan Periode</span>
                </button>
              </div>
            </form>

            {/* List Tahun Ajaran */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Tahun Ajaran Terdaftar ({tahunList.length})
              </h4>
              <div className="border border-slate-200 rounded-xl divide-y divide-slate-200 max-h-48 overflow-y-auto">
                {tahunList.map((t) => (
                  <div
                    key={t.idthnajaran}
                    className="p-3 flex items-center justify-between hover:bg-slate-50 text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{t.thnajaran}</span>
                      <span className="text-slate-400 block text-[11px]">
                        Mulai: {new Date(t.tglmulai).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold font-mono text-[11px]">
                      {t.total_rombel || 0} Rombel
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setIsTahunOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CETAK QR MASSAL PER KELAS */}
      <BatchQrCardsModal
        isOpen={isBatchQrOpen}
        onClose={() => setIsBatchQrOpen(false)}
        selectedClass={batchClass}
        onChangeClass={handleBatchClassChange}
        classList={classList}
        students={batchStudents}
        loading={loadingBatch}
      />
    </div>
  )
}
