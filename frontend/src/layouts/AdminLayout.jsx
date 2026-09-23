import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import schoolLogo from '../assets/logo.png'

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const navSections = [
    {
      title: 'RINGKASAN',
      items: [
        {
          name: 'Dashboard',
          href: '/admin',
          icon: 'dashboard',
          exact: true,
        },
      ],
    },
    {
      title: 'KONTEN PUBLIK',
      items: [
        {
          name: 'Warta & Berita',
          href: '/admin/berita',
          icon: 'newspaper',
        },
      ],
    },
    {
      title: 'DATA MASTER',
      items: [
        {
          name: 'Data Siswa & QR Card',
          href: '/admin/siswa',
          icon: 'school',
        },
        {
          name: 'Data Guru & Staf',
          href: '/admin/guru',
          icon: 'badge',
        },
        {
          name: 'Data Kelas',
          href: '/admin/kelas',
          icon: 'meeting_room',
        },
        {
          name: 'Rombel Siswa',
          href: '/admin/rombel',
          icon: 'groups',
        },
        {
          name: 'Katalog Buku & Barcode',
          href: '/admin/buku',
          icon: 'menu_book',
        },
      ],
    },
    {
      title: 'PELAPORAN & ALAT',
      items: [
        {
          name: 'Report Peminjaman',
          href: '/admin/report',
          icon: 'receipt_long',
        },
        {
          name: 'Impor & Ekspor Excel',
          href: '/admin/excel',
          icon: 'table_view',
        },
      ],
    },
  ]

  const handleLogout = async () => {
    if (window.confirm('Apakah Anda yakin ingin keluar dari panel admin?')) {
      await logout()
      navigate('/login')
    }
  }

  // Determine current page title
  const getPageTitle = () => {
    const p = location.pathname
    if (p === '/admin') return 'Ringkasan Dashboard'
    if (p.startsWith('/admin/berita')) return 'Manajemen Warta & Berita'
    if (p.startsWith('/admin/siswa')) return 'Master Data Siswa & Cetak Kartu QR'
    if (p.startsWith('/admin/guru')) return 'Master Data Guru & Wali Kelas'
    if (p.startsWith('/admin/kelas')) return 'Master Data Ruang & Jenjang Kelas'
    if (p.startsWith('/admin/rombel')) return 'Rombongan Belajar (Rombel) & Wali Kelas'
    if (p.startsWith('/admin/buku')) return 'Katalog Buku Perpustakaan'
    if (p.startsWith('/admin/report')) return 'Laporan Data Peminjaman & Sirkulasi'
    if (p.startsWith('/admin/excel')) return 'Impor & Ekspor Excel Multi-Sheet'
    return 'Panel Administrasi'
  }

  return (
    <div className="min-h-screen bg-slate-100 flex font-body text-slate-800">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden no-print"
        ></div>
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 no-print ${
          mobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800 bg-slate-950/60">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 p-1 flex items-center justify-center border border-white/15 shadow-sm">
              <img
                src={schoolLogo}
                alt="Logo MI"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-heading font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                <span>MI Roudotutta'lim</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-medium tracking-wide uppercase">
                Panel Admin
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navSections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                {sec.title}
              </div>
              <div className="space-y-0.5">
                {sec.items.map((item) => {
                  const isActive = item.exact
                    ? location.pathname === item.href
                    : location.pathname.startsWith(item.href)

                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      end={item.exact}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 ${
                        isActive
                          ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Card & Logout Bottom */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40">
          <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                TU
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">
                  {user?.nama_user || 'Staf Tata Usaha'}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">
                    {user?.role || 'admin_web'}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors shrink-0"
              title="Keluar dari Panel Admin"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Sticky Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shadow-xs no-print">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">menu</span>
            </button>

            <div>
              <h1 className="font-bold text-base sm:text-lg text-slate-900 tracking-tight">
                {getPageTitle()}
              </h1>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
                <Link to="/admin" className="hover:text-slate-600">Admin</Link>
                <span>/</span>
                <span className="text-slate-600 font-medium">{getPageTitle()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Buka Website Publik Madrasah"
            >
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              <span className="hidden sm:inline">Web Publik</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </header>

        {/* Dynamic Nested Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
