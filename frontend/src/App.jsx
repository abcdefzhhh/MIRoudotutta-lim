import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import VisiMisi from './pages/VisiMisi'
import GuruStaf from './pages/GuruStaf'
import Ekstrakurikuler from './pages/Ekstrakurikuler'
import ProgramUnggulan from './pages/ProgramUnggulan'
import NilaiKami from './pages/NilaiKami'
import Berita from './pages/Berita'
import BeritaDetail from './pages/BeritaDetail'
import Kontak from './pages/Kontak'
import Ppdb from './pages/Ppdb'
import Login from './pages/Login'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminBerita from './pages/admin/AdminBerita'
import AdminSiswa from './pages/admin/AdminSiswa'
import AdminGuru from './pages/admin/AdminGuru'
import AdminKelas from './pages/admin/AdminKelas'
import AdminRombel from './pages/admin/AdminRombel'
import AdminBuku from './pages/admin/AdminBuku'
import AdminExcel from './pages/admin/AdminExcel'
import AdminReportPinjam from './pages/admin/AdminReportPinjam'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function AppContent() {
  const location = useLocation()
  const hideHeaderFooter =
    location.pathname.startsWith('/admin') || location.pathname === '/login'

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-ink font-body">
      {!hideHeaderFooter && <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visi-misi" element={<VisiMisi />} />
          <Route path="/guru-staf" element={<GuruStaf />} />
          <Route path="/ekstrakurikuler" element={<Ekstrakurikuler />} />
          <Route path="/program" element={<ProgramUnggulan />} />
          <Route path="/program-unggulan" element={<ProgramUnggulan />} />
          <Route path="/nilai-kami" element={<NilaiKami />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/berita/:slug" element={<BeritaDetail />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/ppdb" element={<Ppdb />} />

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Nested Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="berita" element={<AdminBerita />} />
            <Route path="siswa" element={<AdminSiswa />} />
            <Route path="guru" element={<AdminGuru />} />
            <Route path="kelas" element={<AdminKelas />} />
            <Route path="rombel" element={<AdminRombel />} />
            <Route path="buku" element={<AdminBuku />} />
            <Route path="report" element={<AdminReportPinjam />} />
            <Route path="excel" element={<AdminExcel />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      {!hideHeaderFooter && <Footer />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App


