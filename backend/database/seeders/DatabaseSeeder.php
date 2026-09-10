<?php

namespace Database\Seeders;

use App\Models\Berita;
use App\Models\Buku;
use App\Models\BukuDetail;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\KelasDetail;
use App\Models\Pinjam;
use App\Models\PinjamDetail;
use App\Models\Siswa;
use App\Models\SiswaKelas;
use App\Models\TahunAjaran;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Data User (Admin & Pustakawan)
        $admin = User::updateOrCreate(
            ['username' => 'admin'],
            [
                'password' => Hash::make('password123'),
                'nama_user' => 'Administrator SIPERPUS',
                'role' => 'admin_web',
            ]
        );

        $pustakawan = User::updateOrCreate(
            ['username' => 'pustakawan'],
            [
                'password' => Hash::make('password123'),
                'nama_user' => 'Hj. Siti Aminah, S.Pd.I',
                'role' => 'pustakawan',
            ]
        );

        // 2. Data 5 Guru MI
        $guruData = [
            [
                'nip' => '197805122005011002',
                'nama_guru' => 'Ahmad Fauzi, S.Pd.I',
                'no_hp' => '081234567890',
            ],
            [
                'nip' => '198203152008012004',
                'nama_guru' => 'Siti Nurhaliza, S.Pd',
                'no_hp' => '081234567891',
            ],
            [
                'nip' => '198509202010011003',
                'nama_guru' => 'Muhammad Ridwan, M.Pd',
                'no_hp' => '081234567892',
            ],
            [
                'nip' => '198901102015022001',
                'nama_guru' => 'Nurul Hidayah, S.Ag',
                'no_hp' => '081234567893',
            ],
            [
                'nip' => '199107252019031005',
                'nama_guru' => 'Agus Setiawan, S.Pd',
                'no_hp' => '081234567894',
            ],
        ];

        $gurus = [];
        foreach ($guruData as $g) {
            $gurus[] = Guru::updateOrCreate(['nip' => $g['nip']], $g);
        }

        // 3. Tahun Ajaran & 6 Rombel Kelas (1A s/d 6A)
        $tahunAjaran = TahunAjaran::updateOrCreate(
            ['thnajaran' => '2025/2026'],
            ['tglmulai' => '2025-07-14']
        );

        $kelasDetails = [];
        for ($i = 1; $i <= 6; $i++) {
            $kelas = Kelas::updateOrCreate(
                ['kelas' => $i . 'A'],
                ['tingkat' => $i]
            );

            // Assign wali kelas bergiliran dari daftar 5 guru
            $waliKelas = $gurus[($i - 1) % count($gurus)];

            $kelasDetails[$i] = KelasDetail::updateOrCreate(
                [
                    'idkelas' => $kelas->idkelas,
                    'idthahunajaran' => $tahunAjaran->idthnajaran,
                ],
                [
                    'idguru' => $waliKelas->idguru,
                ]
            );
        }

        // 4. Data 20 Siswa Dummy & Pendaftaran Siswa ke Rombel Kelas
        $siswaData = [
            ['nis' => '2501001', 'nisn' => '0123456701', 'nama' => 'Muhammad Al-Fatih Pratama', 'tingkat' => 1],
            ['nis' => '2501002', 'nisn' => '0123456702', 'nama' => 'Aisyah Humaira Az-Zahra', 'tingkat' => 1],
            ['nis' => '2501003', 'nisn' => '0123456703', 'nama' => 'Bilal Habibi Ramadhan', 'tingkat' => 1],
            ['nis' => '2501004', 'nisn' => '0123456704', 'nama' => 'Fatimah Nayla Putri', 'tingkat' => 2],
            ['nis' => '2501005', 'nisn' => '0123456705', 'nama' => 'Zaidan Zafarullah', 'tingkat' => 2],
            ['nis' => '2501006', 'nisn' => '0123456706', 'nama' => 'Khadijah Maryam Shaliha', 'tingkat' => 2],
            ['nis' => '2501007', 'nisn' => '0123456707', 'nama' => 'Hamzah Rayhan Perkasa', 'tingkat' => 3],
            ['nis' => '2501008', 'nisn' => '0123456708', 'nama' => 'Salma Aqila Jasmine', 'tingkat' => 3],
            ['nis' => '2501009', 'nisn' => '0123456709', 'nama' => 'Umar Farouq Al-Banjari', 'tingkat' => 3],
            ['nis' => '2501010', 'nisn' => '0123456710', 'nama' => 'Zahra Anindita Salsabila', 'tingkat' => 4],
            ['nis' => '2501011', 'nisn' => '0123456711', 'nama' => 'Ali bin Abi Shiddiq', 'tingkat' => 4],
            ['nis' => '2501012', 'nisn' => '0123456712', 'nama' => 'Ruqayyah Dian Utami', 'tingkat' => 4],
            ['nis' => '2501013', 'nisn' => '0123456713', 'nama' => 'Tariq Ziyad Al-Ghazi', 'tingkat' => 5],
            ['nis' => '2501014', 'nisn' => '0123456714', 'nama' => 'Hafshah Nur Azizah', 'tingkat' => 5],
            ['nis' => '2501015', 'nisn' => '0123456715', 'nama' => 'Salman Al-Farisi Ilham', 'tingkat' => 5],
            ['nis' => '2501016', 'nisn' => '0123456716', 'nama' => 'Safiyyah Maulida Hasan', 'tingkat' => 5],
            ['nis' => '2501017', 'nisn' => '0123456717', 'nama' => 'Usman Harun Ar-Rasyid', 'tingkat' => 6],
            ['nis' => '2501018', 'nisn' => '0123456718', 'nama' => 'Zubaidah Annisa Fitri', 'tingkat' => 6],
            ['nis' => '2501019', 'nisn' => '0123456719', 'nama' => 'Ibrahim Khalilurrahman', 'tingkat' => 6],
            ['nis' => '2501020', 'nisn' => '0123456720', 'nama' => 'Halimah As-Sa\'diyah', 'tingkat' => 6],
        ];

        $createdSiswa = [];
        foreach ($siswaData as $s) {
            $siswa = Siswa::updateOrCreate(
                ['nis' => $s['nis']],
                [
                    'nisn' => $s['nisn'],
                    'nama' => $s['nama'],
                ]
            );
            $createdSiswa[] = $siswa;

            $rombel = $kelasDetails[$s['tingkat']];
            SiswaKelas::updateOrCreate(
                [
                    'idsiswa' => $siswa->idsiswa,
                    'idkelasdetail' => $rombel->idkelasdetail,
                ]
            );
        }

        // 5. Data 10 Katalog Buku MI & Eksemplar Fisik
        $katalogBuku = [
            [
                'isbn' => '978-623-01-0101-1',
                'kodebuku' => 'BK-AA1',
                'judul' => 'Akidah Akhlak Pendekatan Saintifik Kurikulum Madrasah MI Kelas 1',
                'penulis' => 'Drs. H. Masrun, M.Pd.I',
                'penerbit' => 'Kementerian Agama RI',
                'copies' => 3,
            ],
            [
                'isbn' => '978-623-01-0102-8',
                'kodebuku' => 'BK-FQ2',
                'judul' => 'Fiqih Ibadah Dasar MI Kelas 2',
                'penulis' => 'Dr. H. Sulaiman, M.Ag',
                'penerbit' => 'Kementerian Agama RI',
                'copies' => 3,
            ],
            [
                'isbn' => '978-623-01-0103-5',
                'kodebuku' => 'BK-SKI3',
                'judul' => 'Sejarah Kebudayaan Islam: Jejak Kenabian MI Kelas 3',
                'penulis' => 'Ahmad Syarifuddin, M.A',
                'penerbit' => 'Penerbit Erlangga',
                'copies' => 3,
            ],
            [
                'isbn' => '978-623-01-0104-2',
                'kodebuku' => 'BK-QH4',
                'judul' => 'Al-Qur\'an Hadis Pedoman Hidup MI Kelas 4',
                'penulis' => 'Ustadz Muhammad Zainuri',
                'penerbit' => 'Tiga Serangkai',
                'copies' => 2,
            ],
            [
                'isbn' => '978-623-01-0105-9',
                'kodebuku' => 'BK-BA5',
                'judul' => 'Bahasa Arab MI Kelas 5: Belajar Komunikasi Qur\'ani',
                'penulis' => 'Farhan Mansyur, M.Pd',
                'penerbit' => 'Kementerian Agama RI',
                'copies' => 3,
            ],
            [
                'isbn' => '978-623-01-0106-6',
                'kodebuku' => 'BK-MTK6',
                'judul' => 'Mahir Matematika MI & SD Kelas 6 Kurikulum Merdeka',
                'penulis' => 'Prof. Dr. Wahyudi, M.Sc',
                'penerbit' => 'Yudhistira Media',
                'copies' => 2,
            ],
            [
                'isbn' => '978-623-01-0107-3',
                'kodebuku' => 'BK-IPAS4',
                'judul' => 'Ilmu Pengetahuan Alam dan Sosial (IPAS) MI Kelas 4',
                'penulis' => 'Dra. Endang Lestari',
                'penerbit' => 'Grafindo Media Pratama',
                'copies' => 3,
            ],
            [
                'isbn' => '978-623-01-0108-0',
                'kodebuku' => 'BK-ENS01',
                'judul' => 'Ensiklopedia Sains Islam untuk Anak Pintar',
                'penulis' => 'Tim Penulis Mizan Kids',
                'penerbit' => 'Mizan Pustaka',
                'copies' => 2,
            ],
            [
                'isbn' => '978-623-01-0109-7',
                'kodebuku' => 'BK-KS25',
                'judul' => 'Kisah Teladan 25 Nabi dan Rasul Bergambar',
                'penulis' => 'Kak Nurul Ihsan',
                'penerbit' => 'Gema Insani Press',
                'copies' => 3,
            ],
            [
                'isbn' => '978-623-01-0110-3',
                'kodebuku' => 'BK-KMS03',
                'judul' => 'Kamus Bergambar 3 Bahasa (Indonesia - Arab - Inggris) Madrasah Cilik',
                'penulis' => 'Dr. H. M. Bahruddin',
                'penerbit' => 'Kanisius Edukasi',
                'copies' => 2,
            ],
        ];

        $allEksemplar = [];
        $createdBuku = [];

        foreach ($katalogBuku as $b) {
            $buku = Buku::updateOrCreate(
                ['isbn' => $b['isbn']],
                [
                    'kodebuku' => $b['kodebuku'],
                    'judul' => $b['judul'],
                    'penulis' => $b['penulis'],
                    'penerbit' => $b['penerbit'],
                    'stok' => $b['copies'],
                    'stok_tersedia' => $b['copies'],
                ]
            );
            $createdBuku[] = $buku;

            for ($k = 1; $k <= $b['copies']; $k++) {
                $kodeDetail = sprintf('%s-%03d', $b['kodebuku'], $k);
                $eksemplar = BukuDetail::updateOrCreate(
                    ['kodebukudetail' => $kodeDetail],
                    [
                        'idbuku' => $buku->idbuku,
                        'kondisi' => 'baik',
                    ]
                );
                $allEksemplar[] = $eksemplar;
            }
        }

        // 6. Data 3 Transaksi Peminjaman (Dipinjam, Terlambat, Selesai/Dikembalikan)
        // Transaksi 1: Status 'dipinjam' (peminjaman aktif)
        $pinjam1 = Pinjam::create([
            'idsiswa' => $createdSiswa[0]->idsiswa,
            'idpetugas' => $pustakawan->id_user,
            'waktu' => Carbon::now()->subDays(2),
            'tgl_batas_kembali' => Carbon::now()->addDays(5)->toDateString(),
            'tgl_dikembalikan' => null,
            'status' => 'dipinjam',
            'total_denda' => 0,
        ]);
        PinjamDetail::create([
            'idpinjam' => $pinjam1->idpinjam,
            'idbukudetail' => $allEksemplar[0]->idbukudetail,
        ]);
        // Kurangi stok_tersedia buku bersangkutan
        $allEksemplar[0]->buku->decrement('stok_tersedia');

        // Transaksi 2: Status 'terlambat' (dengan denda Rp 8.000)
        $pinjam2 = Pinjam::create([
            'idsiswa' => $createdSiswa[1]->idsiswa,
            'idpetugas' => $pustakawan->id_user,
            'waktu' => Carbon::now()->subDays(15),
            'tgl_batas_kembali' => Carbon::now()->subDays(8)->toDateString(),
            'tgl_dikembalikan' => null,
            'status' => 'terlambat',
            'total_denda' => 8000.00,
        ]);
        PinjamDetail::create([
            'idpinjam' => $pinjam2->idpinjam,
            'idbukudetail' => $allEksemplar[3]->idbukudetail,
        ]);
        $allEksemplar[3]->buku->decrement('stok_tersedia');

        // Transaksi 3: Status 'dikembalikan' (selesai tepat waktu tanpa denda)
        $pinjam3 = Pinjam::create([
            'idsiswa' => $createdSiswa[2]->idsiswa,
            'idpetugas' => $pustakawan->id_user,
            'waktu' => Carbon::now()->subDays(10),
            'tgl_batas_kembali' => Carbon::now()->subDays(3)->toDateString(),
            'tgl_dikembalikan' => Carbon::now()->subDays(4)->toDateString(),
            'status' => 'dikembalikan',
            'total_denda' => 0,
        ]);
        PinjamDetail::create([
            'idpinjam' => $pinjam3->idpinjam,
            'idbukudetail' => $allEksemplar[6]->idbukudetail,
        ]);

        // 7. Data 3 Berita Sekolah Kontekstual MI Roudotutta'lim
        $beritaData = [
            [
                'judul' => 'Peringatan Maulid Nabi Muhammad SAW di MI Roudotutta\'lim Penuh Khidmat',
                'slug' => 'peringatan-maulid-nabi-muhammad-saw-mi-roudotuttalim',
                'gambar_thumbnail' => 'berita/maulid_nabi_2025.jpg',
                'isi_konten' => 'Keluarga besar MI Roudotutta\'lim menyelenggarakan peringatan Maulid Nabi Muhammad SAW 1447 H. Acara diisi dengan penampilan shalawat banjari para siswa, pembacaan qasidah Diba\', santunan kepada anak yatim, serta tausiyah agama oleh Pengasuh Madrasah mengenai keteladanan akhlak Rasulullah.',
                'tgl_publish' => Carbon::now()->subDays(10),
            ],
            [
                'judul' => 'Semarak Gerakan Gemar Membaca dan Pojok Baca Digital di Perpustakaan Madrasah',
                'slug' => 'semarak-gerakan-gemar-membaca-dan-pojok-baca-digital',
                'gambar_thumbnail' => 'berita/pojok_baca_digital.jpg',
                'isi_konten' => 'Perpustakaan SIPERPUS MI Roudotutta\'lim meresmikan sarana pojok baca interaktif yang dilengkapi tablet literasi digital dan ribuan buku ensiklopedia anak islami. Siswa-siswi sangat antusias mengikuti tantangan membaca 15 menit sebelum masuk kelas.',
                'tgl_publish' => Carbon::now()->subDays(5),
            ],
            [
                'judul' => 'Siswa MI Roudotutta\'lim Sabet Medali Emas Lomba Tahfidz dan Kaligrafi Tingkat Kecamatan',
                'slug' => 'siswa-mi-roudotuttalim-sabet-medali-emas-lomba-tahfidz-kaligrafi',
                'gambar_thumbnail' => 'berita/prestasi_tahfidz_2025.jpg',
                'isi_konten' => 'Prestasi membanggakan kembali ditorehkan oleh santri MI Roudotutta\'lim dalam ajang Festival Seni & Olahraga Madrasah (AKSIOMA). Muhammad Al-Fatih dan Aisyah Humaira sukses meraih Juara 1 Cabang Tahfidz Juz 30 dan Cabang Seni Khat Kaligrafi Islam.',
                'tgl_publish' => Carbon::now()->subDays(2),
            ],
        ];

        foreach ($beritaData as $b) {
            Berita::updateOrCreate(['slug' => $b['slug']], $b);
        }
    }
}
