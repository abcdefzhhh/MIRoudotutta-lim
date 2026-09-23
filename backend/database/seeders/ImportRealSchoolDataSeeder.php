<?php

namespace Database\Seeders;

use App\Models\Guru;
use App\Models\Kelas;
use App\Models\KelasDetail;
use App\Models\Pinjam;
use App\Models\Siswa;
use App\Models\SiswaKelas;
use App\Models\TahunAjaran;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\IOFactory;

class ImportRealSchoolDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Cari folder DATA di root proyek, atau fallback ke database/
        $candidates = [
            base_path('../DATA'),
            base_path('../data'),
            base_path('database'),
        ];
        $dbPath = base_path('database');
        foreach ($candidates as $candidate) {
            if (file_exists($candidate . '/Daftar_GTK.xlsx') || file_exists($candidate . '/KELAS 1.xlsx')) {
                $dbPath = $candidate;
                break;
            }
        }

        DB::beginTransaction();

        try {
            $this->command->info("Memulai proses impor data sekolah asli dari {$dbPath}...");

            // -------------------------------------------------------------------------
            // 1. IMPORT GURU & TENAGA KEPENDIDIKAN (Daftar_GTK.xlsx)
            // -------------------------------------------------------------------------
            $gtkFile = $dbPath . '/Daftar_GTK.xlsx';
            if (!file_exists($gtkFile)) {
                throw new \Exception("File Daftar_GTK.xlsx tidak ditemukan di {$gtkFile}");
            }

            $gtkReader = IOFactory::createReaderForFile($gtkFile);
            $gtkReader->setReadDataOnly(true);
            $gtkSpreadsheet = $gtkReader->load($gtkFile);

            $gurus = [];
            $usedNips = [];
            $waliKelasCandidates = [];

            // A. Sheet Guru
            $guruSheet = $gtkSpreadsheet->getSheetByName('Guru');
            if ($guruSheet) {
                $guruRows = $guruSheet->toArray();
                for ($i = 1; $i < count($guruRows); $i++) {
                    $row = $guruRows[$i];
                    $nama = trim($row[0] ?? '');
                    if (empty($nama)) continue;

                    $nik = trim(str_replace("'", "", $row[1] ?? ''));
                    $nuptk = trim(str_replace("'", "", $row[2] ?? ''));
                    $nip = trim(str_replace("'", "", $row[4] ?? ''));
                    $nohp = trim(str_replace("'", "", $row[8] ?? ''));
                    $tugas = trim($row[12] ?? '');

                    // Select clean unique identifier for NIP column
                    $cleanNip = !empty($nip) ? $nip : (!empty($nuptk) ? $nuptk : $nik);
                    if (empty($cleanNip)) {
                        $cleanNip = 'GURU-' . str_pad($i, 4, '0', STR_PAD_LEFT);
                    }

                    if (isset($usedNips[$cleanNip])) {
                        $cleanNip = $cleanNip . '-' . $i;
                    }
                    $usedNips[$cleanNip] = true;

                    // Clean phone number format
                    $cleanNoHp = preg_replace('/[^0-9]/', '', $nohp);
                    if (str_starts_with($cleanNoHp, '62')) {
                        $cleanNoHp = '0' . substr($cleanNoHp, 2);
                    }

                    $guruModel = Guru::updateOrCreate(
                        ['nip' => $cleanNip],
                        [
                            'nama_guru' => $nama,
                            'no_hp' => !empty($cleanNoHp) ? substr($cleanNoHp, 0, 20) : null,
                        ]
                    );

                    $gurus[] = $guruModel;
                    if (stripos($tugas, 'Wali Kelas') !== false || stripos($tugas, 'Guru') !== false) {
                        $waliKelasCandidates[] = $guruModel;
                    }
                }
            }

            // B. Sheet Tenaga Kependidikan
            $tendikSheet = $gtkSpreadsheet->getSheetByName('Tenaga Kependidikan');
            if ($tendikSheet) {
                $tendikRows = $tendikSheet->toArray();
                for ($i = 1; $i < count($tendikRows); $i++) {
                    $row = $tendikRows[$i];
                    $nama = trim($row[0] ?? '');
                    if (empty($nama)) continue;

                    $nik = trim(str_replace("'", "", $row[1] ?? ''));
                    $nuptk = trim(str_replace("'", "", $row[2] ?? ''));
                    $nip = trim(str_replace("'", "", $row[4] ?? ''));
                    $nohp = trim(str_replace("'", "", $row[8] ?? ''));

                    $cleanNip = !empty($nip) ? $nip : (!empty($nuptk) ? $nuptk : $nik);
                    if (empty($cleanNip)) {
                        $cleanNip = 'TK-' . str_pad($i, 4, '0', STR_PAD_LEFT);
                    }

                    if (isset($usedNips[$cleanNip])) {
                        $cleanNip = $cleanNip . '-' . $i;
                    }
                    $usedNips[$cleanNip] = true;

                    $cleanNoHp = preg_replace('/[^0-9]/', '', $nohp);
                    if (str_starts_with($cleanNoHp, '62')) {
                        $cleanNoHp = '0' . substr($cleanNoHp, 2);
                    }

                    $tendikModel = Guru::updateOrCreate(
                        ['nip' => $cleanNip],
                        [
                            'nama_guru' => $nama,
                            'no_hp' => !empty($cleanNoHp) ? substr($cleanNoHp, 0, 20) : null,
                        ]
                    );

                    $gurus[] = $tendikModel;
                }
            }

            $this->command->info("Berhasil sinkronisasi " . count($gurus) . " GTK (Guru & Staf).");

            // -------------------------------------------------------------------------
            // 2. KELAS, TAHUN AJARAN & ROMBEL (18 Rombel: 1A-1C s/d 6A-6C)
            // -------------------------------------------------------------------------
            $tahunAjaran = TahunAjaran::firstOrCreate(
                ['thnajaran' => '2025/2026'],
                ['tglmulai' => '2025-07-14']
            );

            // Buat 18 Ruang Kelas & Rombel
            $kelasMap = [];
            $rombelMap = [];
            $allRombelNames = [
                1 => ['1A', '1B', '1C'],
                2 => ['2A', '2B', '2C'],
                3 => ['3A', '3B', '3C'],
                4 => ['4A', '4B', '4C'],
                5 => ['5A', '5B', '5C'],
                6 => ['6A', '6B', '6C'],
            ];

            $waliPool = !empty($waliKelasCandidates) ? $waliKelasCandidates : $gurus;
            $waliIdx = 0;

            foreach ($allRombelNames as $tingkat => $rombelList) {
                foreach ($rombelList as $namaKelas) {
                    $kelas = Kelas::updateOrCreate(
                        ['kelas' => $namaKelas],
                        ['tingkat' => $tingkat]
                    );
                    $kelasMap[$namaKelas] = $kelas;

                    // Assign Wali Kelas
                    $waliGuru = $waliPool[$waliIdx % count($waliPool)];
                    $waliIdx++;

                    $rombel = KelasDetail::updateOrCreate(
                        [
                            'idkelas' => $kelas->idkelas,
                            'idthahunajaran' => $tahunAjaran->idthnajaran,
                        ],
                        [
                            'idguru' => $waliGuru->idguru,
                        ]
                    );
                    $rombelMap[$namaKelas] = $rombel;
                }
            }

            $this->command->info("Berhasil menyiapkan 18 Ruang Kelas & Rombongan Belajar.");

            // -------------------------------------------------------------------------
            // 3. MEMBERSIHKAN DATA SISWA LAMA & ENROLMENT DUMMY
            // -------------------------------------------------------------------------
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            DB::table('tbl_pinjam_detail')->delete();
            DB::table('tbl_pinjam')->delete();
            DB::table('tbl_siswa_kelas')->delete();
            DB::table('tbl_siswa')->delete();
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');

            // -------------------------------------------------------------------------
            // 4. IMPORT 620 SISWA ASLI DARI KELAS 1.xlsx s/d KELAS 6.xlsx
            // -------------------------------------------------------------------------
            $classFiles = [
                1 => 'KELAS 1.xlsx',
                2 => 'KELAS 2.xlsx',
                3 => 'KELAS 3.xlsx',
                4 => 'KELAS 4.xlsx',
                5 => 'KELAS 5.xlsx',
                6 => 'KELAS 6.xlsx',
            ];

            $totalSiswaCount = 0;
            $enrolledCount = 0;

            foreach ($classFiles as $tingkat => $filename) {
                $filePath = $dbPath . '/' . $filename;
                if (!file_exists($filePath)) {
                    $this->command->warn("File {$filename} tidak ditemukan, dilewati.");
                    continue;
                }

                $reader = IOFactory::createReaderForFile($filePath);
                $reader->setReadDataOnly(true);
                $spreadsheet = $reader->load($filePath);

                $entryYear = 2026 - $tingkat;
                $yearPrefix = substr((string)$entryYear, 2, 2);
                $seqCounter = 1;

                foreach ($spreadsheet->getSheetNames() as $sheetName) {
                    if (stripos($sheetName, 'Tidak Aktif') !== false) {
                        continue;
                    }

                    // Deteksi nama rombel dari sheet name, misal "Kelas 1 - KELAS 1A" -> "1A"
                    preg_match('/KELAS\s*([1-6][A-Z])/i', $sheetName, $matches);
                    $namaKelas = isset($matches[1]) ? strtoupper($matches[1]) : ($tingkat . 'A');

                    $rombelModel = $rombelMap[$namaKelas] ?? null;

                    $sheet = $spreadsheet->getSheetByName($sheetName);
                    $rows = $sheet->toArray();

                    for ($i = 1; $i < count($rows); $i++) {
                        $row = $rows[$i];
                        $nama = trim($row[1] ?? '');
                        if (empty($nama)) continue;

                        $nisn = trim($row[2] ?? '');
                        if (empty($nisn)) $nisn = null;

                        // Clean NIS terstruktur: [YY][Tingkat][Seq 3-digit]
                        $nis = $yearPrefix . '0' . $tingkat . str_pad($seqCounter, 3, '0', STR_PAD_LEFT);
                        $seqCounter++;

                        $siswa = Siswa::create([
                            'nis' => $nis,
                            'nisn' => $nisn,
                            'nama' => $nama,
                        ]);
                        $totalSiswaCount++;

                        // Hubungkan siswa ke rombel
                        if ($rombelModel) {
                            SiswaKelas::create([
                                'idsiswa' => $siswa->idsiswa,
                                'idkelasdetail' => $rombelModel->idkelasdetail,
                            ]);
                            $enrolledCount++;
                        }
                    }
                }
            }

            DB::commit();

            $this->command->info("==================================================");
            $this->command->info("SUKSES BESAR! Data asli MI Roudotutta'lim tersimpan:");
            $this->command->info("- Total GTK (Guru & Tendik) : " . count($gurus));
            $this->command->info("- Total Ruang Kelas         : " . count($kelasMap));
            $this->command->info("- Total Rombongan Belajar   : " . count($rombelMap));
            $this->command->info("- Total Santri Aktif        : " . $totalSiswaCount);
            $this->command->info("- Total Penempatan Rombel   : " . $enrolledCount);
            $this->command->info("==================================================");

        } catch (\Throwable $e) {
            DB::rollBack();
            $this->command->error("Terjadi kegagalan saat import: " . $e->getMessage());
            throw $e;
        }
    }
}
