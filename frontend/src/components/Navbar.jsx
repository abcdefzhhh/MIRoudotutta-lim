import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import schoolLogo from '../assets/logo.png'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [mobileProfileOpen, setMobileProfileOpen] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('beranda')

  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const dropdownRef = useRef(null)
  const dropdownTimeoutRef = useRef(null)

  const profileSubItems = [
    {
      name: 'Visi & Misi',
      href: '/visi-misi',
      desc: 'Arah & cita-cita luhur madrasah',
      icon: 'stars',
    },
    {
      name: 'Guru & Tenaga Kependidikan',
      href: '/guru-staf',
      desc: 'Pendidik berdedikasi & profesional',
      icon: 'school',
    },
    {
      name: 'Ekstrakurikuler',
      href: '/ekstrakurikuler',
      desc: 'Wadah bakat, minat & kreativitas',
      icon: 'sports_soccer',
    },
  ]

  const isProfileActive = profileSubItems.some((item) => location.pathname === item.href)

  // Navigation links targeting dedicated pages
  const navLinks = [
    { name: 'Beranda', href: '/', id: 'beranda' },
    // Profil is handled as dropdown
    { name: 'Program Unggulan', href: '/program', id: 'program' },
    { name: 'Berita', href: '/berita', id: 'berita' },
    { name: 'Kontak', href: '/kontak', id: 'kontak' },
  ]

  // Dropdown hover helpers with grace period buffer
  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
      dropdownTimeoutRef.current = null
    }
    setProfileDropdownOpen(true)
  }

  const handleDropdownMouseLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setProfileDropdownOpen(false)
    }, 200)
  }

  const handleDropdownToggle = (e) => {
    e.preventDefault()
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
      dropdownTimeoutRef.current = null
    }
    setProfileDropdownOpen((prev) => !prev)
  }

  // Track scroll position for elevated header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
        setProfileDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    }
  }, [])

  // Close menus on Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
        setMobileMenuOpen(false)
        setProfileDropdownOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close dropdown on route change
  useEffect(() => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setProfileDropdownOpen(false)
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-ivory/95 backdrop-blur-md shadow-sm border-b border-border/80 py-2.5'
            : 'bg-ivory/90 backdrop-blur-sm border-b border-border/40 py-3.5'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-margin-mobile lg:px-margin flex items-center justify-between gap-gutter">
          {/* Logo & School Branding */}
          <Link
            to="/"
            className="flex items-center gap-3.5 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-leaf rounded-xl p-1 -m-1"
          >
            <img
              alt="Logo Resmi MI Roudotutta'lim"
              className="h-11 w-auto object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-105"
              src={schoolLogo}
            />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg sm:text-xl text-emerald-deep tracking-tight leading-tight group-hover:text-emerald-leaf transition-colors">
                MI Roudotutta'lim
              </span>
              <span className="font-body text-xs text-ink-soft font-medium hidden sm:inline-block tracking-normal">
                Mendidik Generasi Shalih &amp; Berilmu
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-ivory-2/70 p-1.5 rounded-full border border-border/50">
            {/* Beranda */}
            <Link
              to="/"
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                location.pathname === '/'
                  ? 'bg-emerald-deep text-white shadow-sm font-semibold'
                  : 'text-ink-soft hover:text-emerald-deep hover:bg-emerald-leaf/10'
              }`}
            >
              {navLinks[0].name}
            </Link>

            {/* Profil Dropdown Trigger & Panel */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
            >
              <button
                type="button"
                onClick={handleDropdownToggle}
                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-leaf ${
                  isProfileActive
                    ? 'bg-emerald-deep text-white shadow-sm font-semibold'
                    : profileDropdownOpen
                    ? 'bg-emerald-leaf/10 text-emerald-deep'
                    : 'text-ink-soft hover:text-emerald-deep hover:bg-emerald-leaf/10'
                }`}
                aria-expanded={profileDropdownOpen}
                aria-haspopup="true"
              >
                <span>Profil</span>
                <span
                  className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                    profileDropdownOpen ? 'rotate-180 text-emerald-deep' : ''
                  }`}
                >
                  keyboard_arrow_down
                </span>
              </button>

              {/* Dropdown Menu Box */}
              {profileDropdownOpen && (
                <div
                  className="absolute top-full left-0 pt-2 w-72 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  {/* Invisible bridge element to ensure pointer never leaves hover boundary */}
                  <div className="absolute -top-2 left-0 right-0 h-4 bg-transparent" />
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-border/80 p-2 relative">
                    <div className="px-3 py-1.5 mb-1 text-[11px] font-bold uppercase tracking-wider text-emerald-leaf border-b border-border/40">
                      Profil Madrasah
                    </div>
                    <div className="flex flex-col gap-1">
                      {profileSubItems.map((sub) => {
                        const isCurrent = location.pathname === sub.href
                        return (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            onClick={() => {
                              if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
                              setProfileDropdownOpen(false)
                            }}
                            className={`flex items-start gap-3 p-2.5 rounded-xl transition-all duration-150 group ${
                              isCurrent
                                ? 'bg-emerald-deep text-white'
                                : 'hover:bg-ivory text-ink'
                            }`}
                          >
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                                isCurrent
                                  ? 'bg-white/20 text-white'
                                  : 'bg-emerald-deep/10 text-emerald-deep group-hover:bg-emerald-deep group-hover:text-white transition-colors'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                {sub.icon}
                              </span>
                            </div>
                            <div>
                              <span
                                className={`block text-sm font-heading font-semibold leading-tight ${
                                  isCurrent
                                    ? 'text-white'
                                    : 'text-ink group-hover:text-emerald-deep transition-colors'
                                }`}
                              >
                                {sub.name}
                              </span>
                              <span
                                className={`block text-xs mt-0.5 leading-snug ${
                                  isCurrent
                                    ? 'text-emerald-100'
                                    : 'text-ink-soft'
                                }`}
                              >
                                {sub.desc}
                              </span>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Remaining nav links */}
            {navLinks.slice(1).map((item) => {
              const isActive =
                location.pathname === item.href ||
                (item.href === '/berita' && location.pathname.startsWith('/berita'))
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-deep text-white shadow-sm font-semibold'
                      : 'text-ink-soft hover:text-emerald-deep hover:bg-emerald-leaf/10'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Right Area: Direct CTA (PPDB) & Mobile Toggle */}
          <div className="flex items-center gap-3">

            <Link
              to="/ppdb"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-deep text-white text-sm font-semibold shadow-sm hover:bg-emerald-leaf active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-leaf focus-visible:ring-offset-2"
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
              <span>Info PPDB</span>
              <span className="material-symbols-outlined text-[16px] hidden sm:inline-block transition-transform group-hover:translate-x-0.5">
                arrow_forward
              </span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="lg:hidden p-2.5 text-emerald-deep hover:bg-emerald-deep/10 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-leaf"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className="material-symbols-outlined text-[26px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 lg:hidden bg-ivory border-b border-border shadow-xl pt-24 pb-6 px-margin-mobile transition-all duration-300 transform max-h-[90vh] overflow-y-auto ${
          mobileMenuOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-1.5">
          {/* Mobile Beranda */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
              location.pathname === '/'
                ? 'bg-emerald-deep text-white font-semibold shadow-xs'
                : 'text-ink hover:text-emerald-deep hover:bg-emerald-leaf/10'
            }`}
          >
            <span>{navLinks[0].name}</span>
            <span className="material-symbols-outlined text-[18px] opacity-70">
              chevron_right
            </span>
          </Link>

          {/* Mobile Profil Accordion */}
          <div className="rounded-xl border border-border/60 overflow-hidden bg-ivory-2/60">
            <button
              type="button"
              onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 text-base font-medium transition-colors ${
                isProfileActive
                  ? 'text-emerald-deep font-semibold bg-emerald-leaf/10'
                  : 'text-ink hover:text-emerald-deep'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>Profil</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gold/20 text-emerald-deep">
                  3 Menu
                </span>
              </div>
              <span
                className={`material-symbols-outlined text-[20px] transition-transform duration-200 text-ink-soft ${
                  mobileProfileOpen ? 'rotate-180 text-emerald-deep' : ''
                }`}
              >
                keyboard_arrow_down
              </span>
            </button>

            {/* Mobile Sub-items */}
            {mobileProfileOpen && (
              <div className="px-3 pb-3 pt-1 flex flex-col gap-1.5 border-t border-border/40">
                {profileSubItems.map((sub) => {
                  const isCurrent = location.pathname === sub.href
                  return (
                    <Link
                      key={sub.name}
                      to={sub.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isCurrent
                          ? 'bg-emerald-deep text-white font-semibold shadow-xs'
                          : 'text-ink hover:bg-emerald-leaf/10'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px] shrink-0 opacity-80">
                        {sub.icon}
                      </span>
                      <span>{sub.name}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* Remaining Mobile Nav Links */}
          {navLinks.slice(1).map((item) => {
            const isActive =
              location.pathname === item.href ||
              (item.href === '/berita' && location.pathname.startsWith('/berita'))
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-deep text-white font-semibold shadow-xs'
                    : 'text-ink hover:text-emerald-deep hover:bg-emerald-leaf/10'
                }`}
              >
                <span>{item.name}</span>
                <span className="material-symbols-outlined text-[18px] opacity-70">
                  chevron_right
                </span>
              </Link>
            )
          })}

          {/* CTAs */}
          <div className="pt-3 mt-2 border-t border-border/60 flex flex-col gap-2.5">
            <Link
              to="/ppdb"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-deep text-white font-semibold shadow-sm hover:bg-emerald-leaf transition-colors active:scale-[0.98]"
            >
              <span className="w-2 h-2 rounded-full bg-gold"></span>
              <span>Info &amp; Persyaratan PPDB</span>
            </Link>

            <a
              href="https://wa.me/6289636058110"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-emerald-deep/20 text-emerald-deep hover:bg-emerald-leaf/10 font-medium text-sm transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Konsultasi via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
