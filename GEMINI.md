# 🤖 GEMINI.MD — ARCHITECTURAL, CODING & DESIGN GUIDELINES

**Project:** Central RESTful API & Frontend — Web MI Roudotutta'lim & Mobile SIPERPUS
**Stack:** Laravel (RESTful API) · MySQL · Laravel Sanctum · Maatwebsite/Excel · ReactJS (Vite) · Tailwind CSS v3

> **Cara pakai file ini:** Setiap kali Agent (AI) mengerjakan task di repo ini, Agent WAJIB membaca dan patuh pada seluruh section di file ini SEBELUM menulis kode. Jika sebuah instruksi user bertentangan dengan aturan di sini, Agent harus menandai konflik tersebut dan bertanya, bukan diam-diam mengabaikan salah satunya.

---

## 0. PRINSIP UTAMA (BACA DULU)

Tiga prinsip ini menaungi semua section di bawah:

1. **Konsisten > Kreatif.** Ikuti pola yang sudah ada di codebase (naming, struktur folder, gaya response) daripada menciptakan pola baru yang "kelihatan lebih rapi" menurut Agent.
2. **Eksplisit > Asumsi.** Kalau requirement ambigu (nama kolom, aturan bisnis, urutan proses), Agent harus berhenti dan bertanya — bukan menebak lalu menulis kode berdasarkan tebakan.
3. **Tidak ada "boilerplate default AI".** Semua daftar di Section 6 (Anti-Slop) itu wajib, bukan saran. Ini yang membedakan output Agent yang terarah vs output generik yang terlihat "AI-made".

---

## 1. PROJECT ARCHITECTURE & ROLE BOUNDARIES

Backend ini melayani dua platform klien dengan tujuan berbeda — jangan mencampur logic keduanya:

| Platform | Tipe Klien | Fungsi Utama |
|---|---|---|
| **Web MI Roudotutta'lim** | ReactJS (Vite), browser | Public landing page (profil madrasah, program unggulan, feed berita `tbl_berita`); Admin Panel TU (CRUD master data, import/export Excel multi-sheet, cetak QR Card siswa) |
| **Mobile SIPERPUS** | React Native Android | Khusus Pustakawan meja layanan: login scanner, 2-step verification pinjam/kembali, kalkulasi denda |

**Aturan lintas platform:**
- Endpoint yang dipakai Web ADMIN tidak boleh diakses role `pustakawan`, dan sebaliknya endpoint sirkulasi tidak diekspos ke public landing page. Selalu cek middleware/role guard sebelum menambah route baru.
- Web menggunakan sesi berbasis Sanctum (SPA cookie-based, `SANCTUM_STATEFUL_DOMAINS` + `SESSION_DOMAIN`), sedangkan Mobile menggunakan Sanctum token-based (`Authorization: Bearer <token>`). **Jangan asumsikan kedua klien pakai mekanisme auth yang sama** — cek `config/sanctum.php` dan `config/cors.php` setiap kali menyentuh kode autentikasi.

---

## 2. DATABASE SCHEMA CONVENTIONS (12 TABLES)

Semua migration wajib nama tabel berawalan `tbl_`. Jangan mengubah nama kolom PK/FK di bawah ini tanpa konfirmasi eksplisit dari user — banyak controller sirkulasi bergantung pada nama-nama ini persis.

- **`tbl_users`**: `id_user` (PK), `username` (unique), `password`, `nama_user`, `role` (enum: `admin_web`, `pustakawan`)
- **`tbl_siswa`**: `idsiswa` (PK), `nis` (string, unique, index), `nisn` (string), `nama` (string)
- **`tbl_guru`**: `idguru` (PK), `nip` (string, unique, index), `nama_guru` (string), `no_hp` (string)
- **`tbl_buku`**: `idbuku` (PK), `isbn` (string, unique, index), `kodebuku` (string), `judul`, `penulis`, `penerbit`, `stok` (int), `stok_tersedia` (int)
- **`tbl_buku_detail`**: `idbukudetail` (PK), `idbuku` (FK), `kodebukudetail` (string, unique, index), `kondisi` (enum: `baik`, `rusak`, `hilang`)
- **`tbl_kelas`**: `idkelas` (PK), `kelas` (string), `tingkat` (int 1–6)
- **`tbl_tahun_ajaran`**: `idthnajaran` (PK), `thnajaran` (string, contoh `2025/2026`), `tglmulai` (date)
- **`tbl_kelas_detail`**: `idkelasdetail` (PK), `idkelas` (FK), `idguru` (FK wali kelas), `idtahunajaran` (FK)
- **`tbl_siswa_kelas`**: `idsiswakelas` (PK), `idsiswa` (FK), `idkelasdetail` (FK)
- **`tbl_pinjam`**: `idpinjam` (PK), `idsiswa` (FK), `idpetugas` (FK → `tbl_users`), `waktu` (datetime), `tgl_batas_kembali` (date), `tgl_dikembalikan` (date, nullable), `status` (enum: `dipinjam`, `dikembalikan`, `terlambat`), `total_denda` (decimal 10,2)
- **`tbl_pinjam_detail`**: `idpinjamdetail` (PK), `idpinjam` (FK), `idbukudetail` (FK)
- **`tbl_berita`**: `id_berita` (PK), `judul`, `slug` (unique), `gambar_thumbnail`, `isi_konten` (text), `tgl_publish` (date)

**Sebelum bikin migration baru:** cek dulu apakah kolom yang dibutuhkan sudah ada di tabel manapun di atas. Jangan bikin tabel/kolom duplikat dengan nama beda hanya karena Agent tidak menemukan definisinya.

---

## 3. BUSINESS LOGIC & SIRKULASI RULES

Wajib dipatuhi setiap kali memodifikasi controller sirkulasi:

### 3.1 Peminjaman (Borrow Flow)
- Request wajib menerima: `nis` siswa, `kodebukudetail[]` (array barcode fisik), `idpetugas`.
- **Validasi wajib sebelum insert:** buku fisik berstatus kondisi `baik` DAN tidak sedang terikat transaksi berstatus `dipinjam`. Tolak request dengan HTTP 422 jika salah satu gagal — jangan silent-skip item yang tidak valid.
- Kurangi `stok_tersedia` di `tbl_buku` sesuai jumlah eksemplar dipinjam.
- Insert ke `tbl_pinjam` + `tbl_pinjam_detail` di dalam satu `DB::transaction()`. Jika satu detail gagal, seluruh transaksi rollback.

### 3.2 Pengembalian (Return Flow)
- Set `tgl_dikembalikan = now()`.
- Jika `tgl_dikembalikan > tgl_batas_kembali`: hitung selisih hari, kalikan denda per hari (default **Rp 1.000/hari/buku** — nilai ini harus jadi config/constant, bukan angka hardcoded tersebar di banyak file), catat ke `total_denda`.
- Update `status` → `dikembalikan` (atau `terlambat` jika ada denda).
- Kembalikan `stok_tersedia` di `tbl_buku`.

**Anti-slop check untuk section ini:** kalau Agent menulis ulang kalkulasi denda, pastikan angka Rp 1.000/hari diambil dari satu sumber (config/env), bukan disalin-tempel di beberapa controller.

---

## 4. EXCEL MULTI-SHEET ENGINE (`maatwebsite/excel`)

Satu workbook `.xlsx` = 3 sheet sekaligus.

**Export** (`WithMultipleSheets`):
1. `SiswaExport` → `nis`, `nisn`, `nama`, `kelas`
2. `GuruExport` → `nip`, `nama_guru`, `no_hp`
3. `BukuExport` → `isbn`, `kodebuku`, `judul`, `penulis`, `penerbit`, `stok`, `stok_tersedia`

**Import:**
- Wajib `DB::beginTransaction()` / `DB::commit()` / `DB::rollBack()` — mencakup ketiga sheet sekaligus, bukan per-sheet.
- Jika ada error validasi atau duplikat (`nis`, `nip`, `isbn`) di sheet manapun: **rollback seluruh workbook**, jangan partial-commit sheet yang "lolos".
- Baris buku baru di Sheet Buku wajib auto-generate baris `tbl_buku_detail` sejumlah `stok`, dengan kode unik format `BK-[idbuku]-[urutan]`.

---

## 5. API RESPONSE STANDARDS & HTTP CODES

Format JSON wajib konsisten di SEMUA controller — jangan biarkan satu endpoint punya struktur beda sendiri:

```json
// Success (HTTP 200 / 201)
{
  "success": true,
  "message": "Pesan operasional sukses.",
  "data": { }
}

// Error (HTTP 400 / 404 / 422 / 500)
{
  "success": false,
  "message": "Deskripsi kendala atau error validasi.",
  "errors": { }
}
```

- Gunakan Laravel API Resource class (`JsonResource`) untuk `data`, jangan `return $model` mentah.
- Gunakan Form Request class untuk validasi (`StoreXxxRequest`, `UpdateXxxRequest`), jangan validasi inline bertumpuk di controller.

---

## 6. NAMING CONVENTIONS

Supaya Agent tidak menciptakan nama baru yang tidak konsisten:

| Jenis | Pola | Contoh |
|---|---|---|
| Controller | `{Entitas}Controller` (PascalCase, singular) | `BukuController`, `PinjamController` |
| Form Request | `Store{Entitas}Request`, `Update{Entitas}Request` | `StorePinjamRequest` |
| API Resource | `{Entitas}Resource` | `BukuResource` |
| Route name | `{platform}.{entitas}.{aksi}` | `admin.buku.index`, `siperpus.pinjam.store` |
| Migration | `tbl_{nama}` sesuai Section 2, urut sesuai dependency FK | — |
| Export/Import class | `{Entitas}Export`, `{Entitas}Import` | `SiswaExport` |

Jika Agent perlu bikin class di luar pola ini, tulis alasannya di komentar/PR description — jangan diam-diam menyimpang.

---

## 7. TESTING CONVENTIONS

- Setiap endpoint sirkulasi (borrow/return) WAJIB punya Feature Test yang mengecek: kondisi sukses, kondisi validasi gagal (buku rusak/sedang dipinjam), dan kalkulasi denda.
- Test file: `tests/Feature/{Entitas}Test.php`, gunakan `RefreshDatabase` trait.
- Jangan tulis test yang cuma assert `status(200)` tanpa mengecek isi `data` — itu termasuk kategori "test slop" yang tidak benar-benar memverifikasi logic.

---

## 8. IMPECCABLE UI/UX & ANTI-SLOP GUARDRAILS

### A. Layout & Spacing
- Dilarang arbitrary value acak (`w-[342px]`, `p-[13px]`). Gunakan skala standar Tailwind (`p-4`, `p-6`, `gap-4`).
- Container dashboard/landing page wajib padding minimal `p-6` atau `p-8`. Jangan memadatkan elemen visual.

### B. Color Tokens & Visual Hierarchy
- Palet netral `slate`/`zinc` (`bg-slate-50`, `bg-white`) + aksen Emerald/Teal (nuansa Islami modern) untuk area publik, Indigo/Navy untuk area admin.
- Dilarang `shadow-2xl` atau efek glow berlebihan. Gunakan `border border-slate-200/80` + `shadow-sm` yang halus.
- Setiap Card: `rounded-xl border border-slate-200 bg-white p-5`.

### C. Component States & Micro-Interactions
- Setiap tombol/link wajib: `transition-all duration-200`, `hover:bg-...`, `focus:ring-2`, `active:scale-[0.98]`.
- Setiap komponen pemanggil API wajib menangani 3 state — tidak boleh skip satupun:
  - **Loading:** Skeleton Loader (`animate-pulse`). Dilarang hanya teks "Loading...".
  - **Empty:** ilustrasi SVG/Icon Lucide ringkas + pesan informatif.
  - **Error:** banner soft rose/red + tombol "Coba Lagi".

### D. Typography
- Judul seksi/card: `font-semibold`/`font-bold`, `text-slate-900`.
- Teks deskripsi/sekunder: `text-slate-500`/`text-slate-600`, `text-sm`.

### E. Data Table & Pagination
- Tabel: `w-full text-left text-sm`, header `bg-slate-50 text-slate-700 font-medium border-b border-slate-200`, row hover `hover:bg-slate-50/50`.
- Pagination wajib indikator jumlah data ("Menampilkan 1–10 dari 50 data") + navigasi responsif.

### F. Modal & Form Controls
- Modal: `bg-slate-900/50 backdrop-blur-sm`, animasi fade-in, tombol close (X) jelas di kanan atas.
- Input/select/textarea: `rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all`.

### G. Print & Scan Layout
- QR Card Siswa: dimensi terkunci 8.5cm x 5.3cm (3.35in x 2.1in), gunakan `@media print` agar tidak terpotong saat dicetak via `react-to-print`.
- Scanner UI (kamera): overlay kotak fokus + indikator animasi scan line.

---

## 9. AGENT SELF-CHECK SEBELUM MENYERAHKAN OUTPUT

Sebelum Agent menyatakan task selesai, jawab dulu (secara internal) pertanyaan ini — kalau ada yang "tidak", perbaiki dulu:

- [ ] Apakah response API mengikuti format Section 5 persis?
- [ ] Apakah nama class/route mengikuti pola Section 6?
- [ ] Apakah komponen baru menangani 3 UI state (loading/empty/error) di Section 8C?
- [ ] Apakah ada angka bisnis (denda, dimensi cetak, dsb) yang di-hardcode berulang, padahal harusnya satu sumber?
- [ ] Kalau ada asumsi yang diambil karena requirement ambigu — apakah itu sudah disebutkan eksplisit ke user, bukan didiamkan?