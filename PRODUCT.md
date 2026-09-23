# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Calon Orang Tua & Wali Murid (Publik)**: Mengakses melalui perangkat ponsel dan desktop untuk mencari informasi kredibel mengenai mutu pendidikan, program unggulan (Tahfidz, Akhlak, Kurikulum), kegiatan madrasah, biaya/jadwal PPDB (Penerimaan Peserta Didik Baru), dan lokasi madrasah.
- **Masyarakat & Komunitas Madrasah (Publik)**: Membaca publikasi berita, pengumuman kegiatan, dan prestasi siswa/guru.
- **Staf Tata Usaha / Admin Madrasah (Operasional)**: Mengakses admin panel via desktop browser untuk mengelola master data siswa, guru, kelas, publikasi berita, ekspor/impor data via Excel multi-sheet terpadu, dan mencetak kartu QR siswa berdimensi standar.

## Product Purpose

Platform digital terpadu MI Roudotutta'lim yang menghubungkan madrasah dengan calon wali murid dan masyarakat, sekaligus menyediakan sistem administrasi sekolah yang rapi, akurat, dan efisien.

Bagi publik, sukses berarti calon orang tua mendapatkan keyakinan penuh dan kemudahan dalam mendaftarkan putra-putrinya ke MI Roudotutta'lim. Bagi staf TU, sukses berarti pengelolaan data induk siswa, guru, dan publikasi madrasah berjalan cepat, bebas inkonsistensi data, dan terstandardisasi.

## Positioning

Madrasah Ibtidaiyah ramah anak berakar nilai-nilai Ahlussunnah wal Jama'ah yang memadukan keteladanan akhlak dan tahfidz Al-Qur'an dengan penguatan sains terapan dan literasi modern. 

Bukan sekadar website sekolah ber-template generik atau aplikasi SaaS korporat yang kaku, melainkan etalase institusi pendidikan Islam yang hangat, berwibawa, dan mencerminkan kehidupan nyata komunitas madrasah.

## Operating Context

- **Area Publik (Landing Page)**: Lingkungan penelusuran mobile-first dan desktop kasual. Pengunjung membutuhkan informasi cepat dan meyakinkan tanpa hambatan visual, teks bertele-tele, ataupun bahasa pendaftaran yang agresif.
- **Area Admin (TU Panel)**: Lingkungan kerja kantor madrasah di meja kerja desktop, membutuhkan antarmuka operasional yang presisi, pemuatan tabel data yang efisien, umpan balik validasi yang jelas, serta kompatibilitas cetak kartu fisik (dimensi kartu 8.5cm x 5.3cm).
- **Relasi Sirkulasi Perpustakaan**: Batas peran tegas; operasional peminjaman dan denda buku fisik dikhususkan bagi meja pustakawan melalui aplikasi klien pendukung (Mobile SIPERPUS), sementara Web fokus pada landing page dan tata usaha.

## Capabilities and Constraints

- **Teknologi**: Frontend React 19 (Vite) + Tailwind CSS v3, Backend Laravel 11 RESTful API dengan Laravel Sanctum.
- **Fitur Publik**:
  - Navbar responsif dengan navigasi cepat dan tautan pendaftaran PPDB.
  - Hero section dengan narasi visi, statistik utama (akreditasi, rasio guru-siswa, jumlah siswa), dan visual identitas madrasah.
  - Paparan naratif "Tentang Kami" & "Visi Misi".
  - Grid program unggulan (Tahfidz Qur'an, Pembiasaan Akhlak, Bahasa Arab/Inggris, Pramuka/Seni, Sains Terapan, Aksi Sosial).
  - Pita 5 Nilai Utama (Ikhlas, Amanah, Berakhlak, Berilmu, Kebersamaan).
  - Feed publikasi berita dari `tbl_berita`.
  - Peta lokasi madrasah interaktif & informasi kontak terverifikasi.
  - Banner ajakan pendaftaran PPDB.
- **Fitur Admin TU**:
  - Autentikasi berbasis sesi/cookie Sanctum untuk role `admin_web`.
  - CRUD master data: Siswa (`tbl_siswa`), Guru (`tbl_guru`), Kelas & Rombel (`tbl_kelas`, `tbl_tahun_ajaran`, `tbl_siswa_kelas`), Berita (`tbl_berita`).
  - Impor dan ekspor multi-sheet Excel atomik (`DB::transaction()` 3 sheet: Siswa, Guru, Buku).
  - Cetak kartu QR siswa dengan format cetak presisi `@media print`.
- **Standar API**: Response konsisten format `{success, message, data}` / `{success, message, errors}`.

## Brand Commitments

- **Identitas & Palet**:
  - Warna utama terinspirasi logo resmi: Hijau Daun Dalam (`#0B4A2E`), Hijau Daun (`#1E7A42`), Emas (`#D9A62B`), serta latar hangat Gading/Ivory (`#F7F4EC`) dan teks Tinta Gelap (`#12261B`).
  - Aksen emas dipakai hemat dan strategis, tidak dominan.
- **Tipografi**: Kombinasi Playfair Display (heading serif yang klasik, berwibawa, dan institusional) dengan Plus Jakarta Sans (body sans-serif yang bersih, terbaca jelas, dan modern).
- **Tone of Voice**: Bahasa Indonesia yang hangat, bersahaja, tulus, dan menghormati calon wali murid ("Anda"), tanpa jargon korporat yang dingin dan tanpa retorika "hard-sell".

## Evidence on Hand

- Komponen visual landing page terpasang di `frontend/src/components/`:
  - `Hero.jsx`, `AboutVision.jsx`, `ProgramGrid.jsx`, `ValuesBand.jsx`, `NewsGrid.jsx`, `LocationMap.jsx`, `CtaBanner.jsx`, `Navbar.jsx`, `Footer.jsx`.
- Token desain dan panduan gaya visual terdokumentasi di `frontend/DESIGN.md` dan `frontend/tailwind.config.js`.
- Skema 12 tabel database dan kontrak endpoint RESTful API teruji di `backend/` dan `GEMINI.md`.
- Aset logo madrasah di `frontend/src/assets/logo.png` dan icon `frontend/public/favicon.svg`.

## Product Principles

1. **Keikhlasan & Kehangatan Komunitas**: Sampaikan karakter madrasah melalui narasi yang tulus, berwibawa, dan membumi — membedakan madrasah dari sekolah komersial biasa.
2. **Keseimbangan Nilai Islami & Sains Terapan**: Berikan porsi seimbang antara penguatan aqidah/tahfidz dengan kecakapan akademik, teknologi, dan karakter sosial.
3. **Kejelasan Informasi & Orientasi Tindakan**: Buat alur informasi calon wali murid (PPDB, program, kontak) sejelas dan senyaman mungkin di perangkat apapun.
4. **Disiplin Data & Keandalan Operasional**: Pastikan pengelolaan data di area admin terlindungi validasi yang ketat, transaksi atomik, dan tata letak yang mendukung produktivitas TU.
