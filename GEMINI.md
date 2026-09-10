# 🤖 GEMINI.MD — ARCHITECTURAL, CODING & DESIGN GUIDELINES
**Project:** Central RESTful API & Frontend — Web MI Roudotutta'lim & Mobile SIPERPUS
**Stack:** Laravel (RESTful API), MySQL, Laravel Sanctum, Maatwebsite/Excel, ReactJS (Vite), Tailwind CSS v3

---

## 1. PROJECT ARCHITECTURE & ROLE BOUNDARIES
Backend ini melayani dua platform klien yang berbeda tujuan:
1. **Web MI Roudotutta'lim (ReactJS):**
   - Public Landing Page (profil madrasah, program unggulan, feed berita via `tbl_berita`).
   - Admin Panel TU (CRUD master data akademik, import/export Excel multi-sheet, cetak QR Card siswa).
2. **Mobile SIPERPUS (React Native Android):**
   - Khusus Pustakawan Meja Layanan (login scanner, 2-step verification pinjam/kembali, kalkulasi denda).

---

## 2. DATABASE SCHEMA CONVENTIONS (12 TABLES)
Semua migration wajib menggunakan nama tabel berawalan `tbl_` dengan tipe data dan kunci relasi berikut:

- **`tbl_users`**: `id_user` (PK), `username` (unique), `password`, `nama_user`, `role` (enum: `admin_web`, `pustakawan`).
- **`tbl_siswa`**: `idsiswa` (PK), `nis` (string, unique, index), `nisn` (string), `nama` (string).
- **`tbl_guru`**: `idguru` (PK), `nip` (string, unique, index), `nama_guru` (string), `no_hp` (string).
- **`tbl_buku`**: `idbuku` (PK), `isbn` (string, unique, index), `kodebuku` (string), `judul` (string), `penulis` (string), `penerbit` (string), `stok` (int), `stok_tersedia` (int).
- **`tbl_buku_detail`**: `idbukudetail` (PK), `idbuku` (FK -> `tbl_buku`), `kodebukudetail` (string, unique, index), `kondisi` (enum: `baik`, `rusak`, `hilang`).
- **`tbl_kelas`**: `idkelas` (PK), `kelas` (string), `tingkat` (int 1-6).
- **`tbl_tahun_ajaran`**: `idthnajaran` (PK), `thnajaran` (string, contoh: '2025/2026'), `tglmulai` (date).
- **`tbl_kelas_detail`**: `idkelasdetail` (PK), `idkelas` (FK), `idguru` (FK Wali Kelas), `idtahunajaran` (FK).
- **`tbl_siswa_kelas`**: `idsiswakelas` (PK), `idsiswa` (FK), `idkelasdetail` (FK).
- **`tbl_pinjam`**: `idpinjam` (PK), `idsiswa` (FK), `idpetugas` (FK -> `tbl_users`), `waktu` (datetime), `tgl_batas_kembali` (date), `tgl_dikembalikan` (date, nullable), `status` (enum: `dipinjam`, `dikembalikan`, `terlambat`), `total_denda` (decimal 10,2).
- **`tbl_pinjam_detail`**: `idpinjamdetail` (PK), `idpinjam` (FK), `idbukudetail` (FK).
- **`tbl_berita`**: `id_berita` (PK), `judul` (string), `slug` (string, unique), `gambar_thumbnail` (string), `isi_konten` (text), `tgl_publish` (date).

---

## 3. BUSINESS LOGIC & SIRKULASI RULES
Setiap Agent yang memodifikasi controller sirkulasi wajib mematuhi aturan transaksi ini:

1. **Peminjaman (Borrow Flow):**
   - Request wajib menerima: `nis` siswa, `kodebukudetail[]` (array barcode fisik), dan `idpetugas`.
   - Validasi: Pastikan buku fisik berstatus kondisi `baik` dan tidak sedang terikat pada transaksi berstatus `dipinjam`.
   - Kurangi `stok_tersedia` pada tabel `tbl_buku` sesuai jumlah eksemplar yang dipinjam.
   - Buat entri pada `tbl_pinjam` dan `tbl_pinjam_detail` di dalam `DB::transaction()`.

2. **Pengembalian (Return Flow):**
   - Set `tgl_dikembalikan = now()`.
   - Hitung selisih hari jika `tgl_dikembalikan > tgl_batas_kembali`. Jika terlambat, kalikan nominal denda per hari (default: Rp 1.000/hari per buku) dan catat ke `total_denda`.
   - Update status menjadi `dikembalikan` (atau `terlambat` jika ada denda).
   - Kembalikan angka `stok_tersedia` di `tbl_buku`.

---

## 4. EXCEL MULTI-SHEET ENGINE GUIDELINES (`maatwebsite/excel`)
Fitur Excel berpusat pada 1 workbook `.xlsx` yang memuat 3 sheet sekaligus:

1. **Multi-Sheet Export:**
   - Implementasikan class export utama dengan `WithMultipleSheets`.
   - Sheet 1: `SiswaExport` (`nis`, `nisn`, `nama`, `kelas`).
   - Sheet 2: `GuruExport` (`nip`, `nama_guru`, `no_hp`).
   - Sheet 3: `BukuExport` (`isbn`, `kodebuku`, `judul`, `penulis`, `penerbit`, `stok`, `stok_tersedia`).

2. **Multi-Sheet Import:**
   - Wajib menggunakan `DB::beginTransaction()` dan `DB::commit()` / `DB::rollBack()`.
   - Jika ada error validasi atau data duplikat (`nis`, `nip`, `isbn`), rollback seluruh sheet agar tidak ada data parsial.
   - Khusus baris data buku baru pada Sheet Buku, sistem wajib otomatis men-generate baris di `tbl_buku_detail` sejumlah nilai kolom `stok` dengan kode unik (contoh: `BK-[idbuku]-[urutan]`).

---

## 5. API RESPONSE STANDARDS & HTTP CODES
Semua Controller API harus mengembalikan format JSON konsisten:

```json
// Success Response (HTTP 200 / 201)
{
  "success": true,
  "message": "Pesan operasional sukses.",
  "data": { ... }
}

// Error Response (HTTP 400 / 404 / 422 / 500)
{
  "success": false,
  "message": "Deskripsi kendala atau error validasi.",
  "errors": { ... }
}

```
---

## 6. IMPECCABLE UI/UX & ANTI-SLOP GUARDRAILS

   ### A. Layout & Spacing
   - **Strict Tailwind Scale:** Dilarang keras menggunakan arbitrary value acak (seperti w-[342px] atau p-[13px]). Gunakan standar Tailwind CSS (p-4, p-6, gap-4).

   - **Whitespace First:** Container dashboard dan landing page wajib memiliki padding minimal p-6 atau p-8. Jangan memadatkan elemen visual secara berlebihan.

   ### B. Color Tokens & Visual Hierarchy
   - **Palette Control:** Gunakan warna netral slate/zinc (bg-slate-50, bg-white) dengan warna aksen Emerald/Teal untuk nuansa Islami modern, dan Indigo/Navy untuk aksen admin.

   - **Subtle Borders over Heavy Shadows:** Dilarang keras menggunakan shadow-2xl atau efek glow berlebihan. Gunakan border border-slate-200/80 dipadu shadow-sm yang halus.

   - **Card Design:** Setiap komponen Card wajib menggunakan rounded-xl border border-slate-200 bg-white p-5.

   ### C. Component States & Micro-Interactions
   - **Interactive Feedback:** Setiap tombol/link WAJIB memiliki transition-all duration-200, hover:bg-..., focus:ring-2, dan active:scale-[0.98].

   - **Mandatory 3 UI States:** Setiap komponen pemanggil API wajib menangani:

   **Loading State:** Wajib menggunakan Skeleton Loader (animate-pulse). DILARANG hanya menampilkan teks "Loading...".

   **Empty State:** Tampilkan ilustrasi SVG/Icon Lucide ringkas + pesan keterangan informatif jika data kosong.

   **Error State:** Banner berwarna soft rose/red lengkap dengan tombol "Coba Lagi".

   ### D. Typography Standards
   - **Judul Seksi/Card** wajib font-semibold atau font-bold dengan warna text-slate-900.

   - **Teks deskripsi/sekunder** wajib text-slate-500 atau text-slate-600 dengan ukuran text-sm.

   ### E. Data Table & Pagination Standards
   - **Table Polish:** Setiap tabel wajib menggunakan w-full text-left text-sm, header tabel bertema bg-slate-50 text-slate-700 font-medium border-b border-slate-200, dan row hover effect (hover:bg-slate-50/50).

   - **Pagination Component:** Wajib menyertakan indikator jumlah data (contoh: "Menampilkan 1-10 dari 50 data") dan navigasi halaman yang responsif.

   ### F. Modal & Form Controls
   - **Accessible Modals:** Modal dialog wajib memiliki latar belakang bg-slate-900/50 backdrop-blur-sm, animasi fade-in, serta tombol penutup (X) yang jelas di pojok kanan atas.

   - **Form Inputs:** Input teks, select, dan textarea wajib memiliki style rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all.

   ### G. Print & Scan Layout Rules (QR Card & Scanner)
   - **Print Dimensions:** Komponen cetak QR Card Siswa wajib terkunci secara ketat pada dimensi standar ID Card: 8.5cm x 5.3cm (3.35in x 2.1in) dengan utilitas @media print agar layout tidak terpotong saat dicetak via react-to-print.

   - **Scanner UI:** Komponen pemindai kamera pada SIPERPUS/Web wajib memiliki panduan visual overlay berbentuk kotak fokus dengan indikator animasi scan line