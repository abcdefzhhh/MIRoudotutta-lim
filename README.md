# SIPERPUS MI Roudotutta'lim - Backend RESTful API

Backend RESTful API Sistem Informasi Perpustakaan (SIPERPUS) Madrasah Ibtidaiyah Roudotutta'lim berbasis Laravel 11, Laravel Sanctum, dan Maatwebsite Excel.

---

## 🚀 Fitur Utama

1. **Autentikasi API**: Menggunakan Laravel Sanctum dengan token-based authentication.
2. **Manajemen Data Master**:
   - Master Pengguna (`tbl_users`) dengan role `admin_web` dan `pustakawan`
   - Master Guru (`tbl_guru`)
   - Master Siswa & Rombel Kelas (`tbl_siswa`, `tbl_kelas`, `tbl_tahun_ajaran`, `tbl_kelas_detail`, `tbl_siswa_kelas`)
   - Katalog Buku & Eksemplar Fisik (`tbl_buku`, `tbl_buku_detail`)
3. **Sirkulasi Peminjaman**: Transaksi peminjaman dan pengembalian buku (`tbl_pinjam`, `tbl_pinjam_detail`) dilengkapi status dan perhitungan denda.
4. **Portal Berita Madrasah**: Berita dan publikasi kegiatan madrasah (`tbl_berita`).
5. **Multi-Sheet Excel Integration**:
   - **Export**: Menghasilkan 1 file `.xlsx` berisi 3 sheet (`Siswa`, `Guru`, `Buku`).
   - **Import**: Mengunggah 1 file `.xlsx` multi-sheet secara atomik dalam `DB::transaction()`.

---

## 🗄️ Struktur Database (12 Tabel)

| Nama Tabel | Primary Key | Keterangan & Relasi |
| :--- | :--- | :--- |
| `tbl_users` | `id_user` | Akun pengguna (`admin_web`, `pustakawan`) |
| `tbl_siswa` | `idsiswa` | Data induk siswa (`nis`, `nisn`, `nama`) |
| `tbl_guru` | `idguru` | Data guru madrasah (`nip`, `nama_guru`, `no_hp`) |
| `tbl_buku` | `idbuku` | Katalog buku per judul (`isbn`, `kodebuku`, `stok`, `stok_tersedia`) |
| `tbl_buku_detail` | `idbukudetail` | Eksemplar fisik buku (`idbuku`, `kodebukudetail`, `kondisi`) |
| `tbl_kelas` | `idkelas` | Nama rombel dan tingkatan (1A - 6A) |
| `tbl_tahun_ajaran` | `idthnajaran` | Tahun ajaran (contoh: 2025/2026) |
| `tbl_kelas_detail` | `idkelasdetail` | Relasi kelas, guru wali kelas, dan tahun ajaran |
| `tbl_siswa_kelas` | `idsiswakelas` | Penempatan siswa pada rombel kelas tertentu |
| `tbl_pinjam` | `idpinjam` | Header transaksi peminjaman siswa & petugas |
| `tbl_pinjam_detail` | `idpinjamdetail` | Detail eksemplar buku yang dipinjam |
| `tbl_berita` | `id_berita` | Artikel dan publikasi berita madrasah |

---

## 🔑 Kredensial Akun Dummy Default (Database Seeder)

- **Admin Web**:
  - Username: `admin`
  - Password: `password123`
  - Role: `admin_web`
- **Pustakawan**:
  - Username: `pustakawan`
  - Password: `password123`
  - Role: `pustakawan`

---

## 📡 Daftar Endpoint API

### 1. Sistem & Autentikasi
- `GET  /api/status` : Cek health / status API
- `POST /api/login` : Login user (body: `username`, `password`)
- `GET  /api/me` : Profil user saat ini (Header: `Authorization: Bearer <token>`)
- `POST /api/logout` : Logout dan mencabut token aktif

### 2. Multi-Sheet Excel
- `GET  /api/excel/export` : Download 1 file Excel `.xlsx` berisi 3 sheet (Siswa, Guru, Buku)
- `POST /api/excel/import` : Upload file Excel `.xlsx` (multipart/form-data: `file`). Diproses atomik via `DB::transaction()`.

### 3. Katalog Buku
- `GET  /api/buku` : Daftar katalog buku (support query parameter `?search=`)
- `GET  /api/buku/{id}` : Detail buku beserta daftar eksemplar fisik
- `POST /api/buku` : Tambah buku baru

### 4. Sirkulasi Peminjaman
- `GET  /api/pinjam` : Riwayat peminjaman (support query parameter `?status=dipinjam|dikembalikan|terlambat`)
- `GET  /api/pinjam/{id}` : Detail peminjaman beserta eksemplar buku yang dipinjam

### 5. Berita Madrasah
- `GET  /api/berita` : Daftar publikasi berita
- `GET  /api/berita/{slug}` : Baca isi berita berdasarkan slug

---

## 🛠️ Cara Menjalankan Project

1. **Migrasi & Dummy Data**:
   ```bash
   php artisan migrate:fresh --seed
   ```

2. **Jalankan Server Lokal**:
   ```bash
   php artisan serve
   ```
   Server akan berjalan di `http://localhost:8000`
