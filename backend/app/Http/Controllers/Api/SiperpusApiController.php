<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Buku;
use App\Models\BukuDetail;
use App\Models\Pinjam;
use App\Models\PinjamDetail;
use App\Models\Siswa;
use App\Models\Kunjungan;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SiperpusApiController extends Controller
{
    /**
     * Scan kartu siswa berdasarkan NIS / NISN / ID.
     */
    public function scanSiswa(string $nis): JsonResponse
    {
        $rawNis = trim($nis);
        $cleanNis = preg_replace('/^(siswa[-_:]?)/i', '', $rawNis);

        $siswa = Siswa::with(['siswaKelas.kelasDetail.kelas'])
            ->where(function ($q) use ($rawNis, $cleanNis) {
                $q->where('nis', $rawNis)
                  ->orWhere('nisn', $rawNis)
                  ->orWhere('idsiswa', $rawNis)
                  ->orWhere('nis', $cleanNis)
                  ->orWhere('nisn', $cleanNis)
                  ->orWhere('idsiswa', $cleanNis);
            })
            ->first();

        if (!$siswa) {
            return response()->json([
                'success' => false,
                'message' => "Siswa dengan nomor identitas/NIS '$nis' tidak terdaftar di sistem madrasah.",
            ], 404);
        }

        $kelasNama = $siswa->siswaKelas->first()?->kelasDetail?->kelas?->kelas ?? 'Umum';
        $pinjamanAktifCount = Pinjam::where('idsiswa', $siswa->idsiswa)
            ->where('status', 'dipinjam')
            ->count();

        return response()->json([
            'success' => true,
            'message' => 'Data siswa berhasil ditemukan.',
            'data' => [
                'id' => $siswa->idsiswa,
                'nis' => $siswa->nis,
                'nama' => $siswa->nama,
                'kelas' => $kelasNama,
                'rombel' => $kelasNama,
                'foto' => null,
                'pinjaman_aktif_count' => $pinjamanAktifCount,
                'status_anggota' => 'Aktif',
            ],
        ]);
    }

    /**
     * Scan barcode buku berdasarkan kode eksemplar (kodebukudetail).
     */
    /**
     * Helper untuk mencari BukuDetail dari berbagai format kode:
     * - Format cetak barcode/QR: BUKU-{isbn}-{kodebukudetail} (e.g. BUKU-978-623-01-0101-1-BK-AA1-002)
     * - Format kode register: BK-AA1-002
     * - ID buku detail: 2
     */
    private function findBukuDetail(string $kode): ?BukuDetail
    {
        $rawKode = trim($kode);
        $cleanKode = preg_replace('/^buku-([0-9xX-]+-)?/i', '', $rawKode);

        return BukuDetail::with('buku')
            ->where('kodebukudetail', $rawKode)
            ->orWhere('idbukudetail', $rawKode)
            ->orWhere('kodebukudetail', $cleanKode)
            ->orWhere('idbukudetail', $cleanKode)
            ->orWhereRaw('? LIKE CONCAT("%", kodebukudetail)', [$rawKode])
            ->first();
    }

    public function scanBuku(string $kode): JsonResponse
    {
        $bukuDetail = $this->findBukuDetail($kode);

        if (!$bukuDetail) {
            return response()->json([
                'success' => false,
                'message' => "Eksemplar buku dengan kode '$kode' tidak ditemukan di katalog.",
            ], 404);
        }

        $buku = $bukuDetail->buku;

        // Cek apakah buku sedang dipinjam
        $isDipinjam = PinjamDetail::where('idbukudetail', $bukuDetail->idbukudetail)
            ->whereHas('pinjam', function ($q) {
                $q->where('status', 'dipinjam');
            })
            ->exists();

        $status = $isDipinjam ? 'dipinjam' : 'tersedia';

        return response()->json([
            'success' => true,
            'message' => 'Buku berhasil ditemukan.',
            'data' => [
                'id' => $bukuDetail->idbukudetail,
                'kodebukudetail' => $bukuDetail->kodebukudetail,
                'judul' => $buku->judul ?? 'Buku Perpustakaan',
                'pengarang' => $buku->penulis ?? '-',
                'penerbit' => $buku->penerbit ?? '-',
                'tahun' => (string) ($buku->tahun_terbit ?? '2024'),
                'kondisi' => $bukuDetail->kondisi ?? 'baik',
                'status' => $status,
                'rak' => $buku->kodebuku ?? 'Rak Utama',
            ],
        ]);
    }

    /**
     * Submit peminjaman buku (multi-buku).
     */
    public function submitPeminjaman(Request $request): JsonResponse
    {
        $request->validate([
            'nis' => 'required|string',
            'kodebukudetail' => 'required|array|min:1|max:3',
            'kodebukudetail.*' => 'required|string',
        ]);

        $rawNis = trim($request->nis);
        $cleanNis = preg_replace('/^(siswa[-_:]?)/i', '', $rawNis);

        $siswa = Siswa::where(function ($q) use ($rawNis, $cleanNis) {
            $q->where('nis', $rawNis)
              ->orWhere('nisn', $rawNis)
              ->orWhere('idsiswa', $rawNis)
              ->orWhere('nis', $cleanNis)
              ->orWhere('nisn', $cleanNis)
              ->orWhere('idsiswa', $cleanNis);
        })->first();

        if (!$siswa) {
            return response()->json([
                'success' => false,
                'message' => 'Siswa tidak ditemukan.',
            ], 404);
        }

        // Cek kuota pinjaman aktif (maks 3 buku)
        $pinjamanAktifCount = Pinjam::where('idsiswa', $siswa->idsiswa)
            ->where('status', 'dipinjam')
            ->count();

        if ($pinjamanAktifCount + count($request->kodebukudetail) > 3) {
            return response()->json([
                'success' => false,
                'message' => "Maksimal peminjaman adalah 3 buku. Siswa masih memiliki $pinjamanAktifCount buku yang belum dikembalikan.",
            ], 422);
        }

        // Cari semua eksemplar buku
        $bukuDetails = collect();
        foreach ($request->kodebukudetail as $kodeItem) {
            $found = $this->findBukuDetail($kodeItem);
            if ($found && !$bukuDetails->contains('idbukudetail', $found->idbukudetail)) {
                $bukuDetails->push($found);
            }
        }

        if ($bukuDetails->count() !== count($request->kodebukudetail)) {
            return response()->json([
                'success' => false,
                'message' => 'Salah satu kode eksemplar buku tidak valid atau tidak terdaftar.',
            ], 422);
        }

        // Cek apakah ada yang sedang dipinjam
        foreach ($bukuDetails as $detail) {
            $isDipinjam = PinjamDetail::where('idbukudetail', $detail->idbukudetail)
                ->whereHas('pinjam', function ($q) {
                    $q->where('status', 'dipinjam');
                })
                ->exists();

            if ($isDipinjam) {
                return response()->json([
                    'success' => false,
                    'message' => "Buku '{$detail->buku?->judul}' ({$detail->kodebukudetail}) sedang dipinjam orang lain.",
                ], 422);
            }
        }

        $idPetugas = auth('sanctum')->id() ?? 2;
        $now = Carbon::now();
        $jatuhTempo = Carbon::now()->addDays(7);

        DB::beginTransaction();
        try {
            $pinjam = Pinjam::create([
                'idsiswa' => $siswa->idsiswa,
                'idpetugas' => $idPetugas,
                'waktu' => $now,
                'tgl_batas_kembali' => $jatuhTempo->toDateString(),
                'status' => 'dipinjam',
                'total_denda' => 0,
            ]);

            $bukuList = [];
            foreach ($bukuDetails as $detail) {
                PinjamDetail::create([
                    'idpinjam' => $pinjam->idpinjam,
                    'idbukudetail' => $detail->idbukudetail,
                ]);

                // Kurangi stok tersedia pada buku master
                if ($detail->buku && $detail->buku->stok_tersedia > 0) {
                    $detail->buku->decrement('stok_tersedia');
                }

                $bukuList[] = [
                    'id' => $detail->idbukudetail,
                    'kodebukudetail' => $detail->kodebukudetail,
                    'judul' => $detail->buku?->judul ?? 'Buku',
                    'pengarang' => $detail->buku?->penulis ?? '-',
                    'penerbit' => $detail->buku?->penerbit ?? '-',
                    'tahun' => (string) ($detail->buku?->tahun_terbit ?? '2024'),
                    'kondisi' => $detail->kondisi ?? 'baik',
                    'status' => 'dipinjam',
                    'rak' => $detail->buku?->kodebuku ?? 'Rak',
                ];
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Peminjaman berhasil disimpan ke sistem.',
                'data' => [
                    'id_transaksi' => 'TRX-' . str_pad($pinjam->idpinjam, 5, '0', STR_PAD_LEFT),
                    'nis' => $siswa->nis,
                    'nama_siswa' => $siswa->nama,
                    'tanggal_pinjam' => $now->toDateString(),
                    'jatuh_tempo' => $jatuhTempo->toDateString(),
                    'buku' => $bukuList,
                ],
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal memproses peminjaman: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Scan buku untuk pengembalian & kalkulasi denda otomatis.
     */
    public function scanPengembalian(string $kode): JsonResponse
    {
        $bukuDetail = $this->findBukuDetail($kode);

        if (!$bukuDetail) {
            return response()->json([
                'success' => false,
                'message' => "Buku dengan kode '$kode' tidak ditemukan.",
            ], 404);
        }

        // Cari transaksi peminjaman aktif untuk buku ini
        $pinjamDetail = PinjamDetail::with(['pinjam.siswa.siswaKelas.kelasDetail.kelas'])
            ->where('idbukudetail', $bukuDetail->idbukudetail)
            ->whereHas('pinjam', function ($q) {
                $q->where('status', 'dipinjam');
            })
            ->latest('idpinjamdetail')
            ->first();

        if (!$pinjamDetail || !$pinjamDetail->pinjam) {
            return response()->json([
                'success' => false,
                'message' => "Buku '{$bukuDetail->buku?->judul}' ({$bukuDetail->kodebukudetail}) tidak dalam status dipinjam.",
            ], 422);
        }

        $pinjam = $pinjamDetail->pinjam;
        $siswa = $pinjam->siswa;
        $kelasNama = $siswa?->siswaKelas->first()?->kelasDetail?->kelas?->kelas ?? 'Umum';

        $today = Carbon::today();
        $batasKembali = Carbon::parse($pinjam->tgl_batas_kembali)->startOfDay();

        $hariTerlambat = 0;
        if ($today->greaterThan($batasKembali)) {
            $hariTerlambat = (int) $today->diffInDays($batasKembali);
        }

        $tarifDenda = 1000;
        $totalDenda = $hariTerlambat * $tarifDenda;

        return response()->json([
            'success' => true,
            'message' => 'Data pengembalian buku siap diproses.',
            'data' => [
                'kodebukudetail' => $bukuDetail->kodebukudetail,
                'judul' => $bukuDetail->buku?->judul ?? 'Buku',
                'peminjam' => [
                    'id' => $siswa?->idsiswa,
                    'nis' => $siswa?->nis ?? '-',
                    'nama' => $siswa?->nama ?? 'Siswa',
                    'kelas' => $kelasNama,
                    'rombel' => $kelasNama,
                    'foto' => null,
                    'pinjaman_aktif_count' => 1,
                    'status_anggota' => 'Aktif',
                ],
                'tanggal_pinjam' => Carbon::parse($pinjam->waktu)->toDateString(),
                'jatuh_tempo' => $batasKembali->toDateString(),
                'hari_terlambat' => $hariTerlambat,
                'tarif_denda_per_hari' => $tarifDenda,
                'total_denda' => $totalDenda,
                'id_peminjaman' => $pinjam->idpinjam,
            ],
        ]);
    }

    /**
     * Submit pengembalian buku.
     */
    public function submitPengembalian(Request $request): JsonResponse
    {
        $request->validate([
            'kodebukudetail' => 'required|string',
            'kondisi' => 'nullable|string|in:baik,rusak,hilang',
            'denda_dibayar' => 'nullable|numeric|min:0',
            'catatan' => 'nullable|string',
        ]);

        $bukuDetail = $this->findBukuDetail($request->kodebukudetail);

        if (!$bukuDetail) {
            return response()->json([
                'success' => false,
                'message' => 'Eksemplar buku tidak ditemukan.',
            ], 404);
        }

        $pinjamDetail = PinjamDetail::with('pinjam')
            ->where('idbukudetail', $bukuDetail->idbukudetail)
            ->whereHas('pinjam', function ($q) {
                $q->where('status', 'dipinjam');
            })
            ->latest('idpinjamdetail')
            ->first();

        if (!$pinjamDetail || !$pinjamDetail->pinjam) {
            return response()->json([
                'success' => false,
                'message' => 'Buku ini tidak sedang dipinjam.',
            ], 422);
        }

        $pinjam = $pinjamDetail->pinjam;
        $today = Carbon::today();
        $batasKembali = Carbon::parse($pinjam->tgl_batas_kembali)->startOfDay();
        $terlambat = $today->greaterThan($batasKembali);

        DB::beginTransaction();
        try {
            $pinjam->update([
                'status' => $terlambat ? 'terlambat' : 'dikembalikan',
                'tgl_dikembalikan' => $today->toDateString(),
                'total_denda' => $request->denda_dibayar ?? 0,
            ]);

            // Update kondisi buku
            if ($request->filled('kondisi')) {
                $bukuDetail->update(['kondisi' => $request->kondisi]);
            }

            // Kembalikan stok buku master
            if ($bukuDetail->buku) {
                $bukuDetail->buku->increment('stok_tersedia');
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Buku berhasil dikembalikan dan inventaris diperbarui.',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Gagal memproses pengembalian: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Statistik sirkulasi untuk dashboard mobile.
     */
    public function getStatistik(): JsonResponse
    {
        $today = Carbon::today();

        $bukuDipinjamAktif = PinjamDetail::whereHas('pinjam', function ($q) {
            $q->where('status', 'dipinjam');
        })->count();

        $transaksiHariIni = Pinjam::whereDate('waktu', $today)
            ->orWhereDate('tgl_dikembalikan', $today)
            ->count();

        $totalDenda = (int) Pinjam::sum('total_denda');
        $totalKoleksi = BukuDetail::count();

        return response()->json([
            'success' => true,
            'message' => 'Statistik berhasil dimuat.',
            'data' => [
                'buku_dipinjam_aktif' => $bukuDipinjamAktif,
                'transaksi_hari_ini' => $transaksiHariIni,
                'total_denda_himpun' => $totalDenda,
                'total_koleksi_buku' => $totalKoleksi,
            ],
        ]);
    }

    /**
     * Riwayat transaksi sirkulasi (peminjaman & pengembalian).
     */
    public function getRiwayat(): JsonResponse
    {
        $pinjams = Pinjam::with([
            'siswa.siswaKelas.kelasDetail.kelas',
            'pinjamDetails.bukuDetail.buku',
        ])
        ->latest('idpinjam')
        ->take(50)
        ->get();

        $list = [];
        foreach ($pinjams as $p) {
            $siswa = $p->siswa;
            $kelasNama = $siswa?->siswaKelas->first()?->kelasDetail?->kelas?->kelas ?? 'Umum';
            $firstDetail = $p->pinjamDetails->first();
            $buku = $firstDetail?->bukuDetail?->buku;
            $bukuDetail = $firstDetail?->bukuDetail;

            $statusText = match ($p->status) {
                'dipinjam' => 'Dipinjam',
                'dikembalikan' => 'Tepat Waktu',
                'terlambat' => 'Telat',
                default => ucfirst($p->status),
            };

            $tipe = $p->status === 'dipinjam' ? 'peminjaman' : 'pengembalian';

            $list[] = [
                'id' => 'TRX-' . str_pad($p->idpinjam, 5, '0', STR_PAD_LEFT),
                'tipe' => $tipe,
                'nis' => $siswa?->nis ?? '-',
                'nama_siswa' => $siswa?->nama ?? 'Siswa',
                'kelas' => $kelasNama,
                'kodebukudetail' => $bukuDetail?->kodebukudetail ?? '-',
                'judul_buku' => $buku?->judul ?? 'Buku Perpustakaan',
                'waktu' => Carbon::parse($p->waktu)->format('d M Y, H:i'),
                'status' => $statusText,
                'denda' => (int) $p->total_denda,
            ];
        }

        return response()->json([
            'success' => true,
            'message' => 'Riwayat transaksi berhasil dimuat.',
            'data' => $list,
        ]);
    }

    /**
     * Catat presensi kunjungan / izin masuk siswa perpustakaan via scan barcode.
     */
    public function recordKunjungan(Request $request): JsonResponse
    {
        $request->validate([
            'nis' => 'required|string',
            'keperluan' => 'nullable|string|max:100',
        ]);

        $rawNis = trim($request->nis);
        $cleanNis = preg_replace('/^(siswa[-_:]?)/i', '', $rawNis);

        $siswa = Siswa::with(['siswaKelas.kelasDetail.kelas'])
            ->where(function ($q) use ($rawNis, $cleanNis) {
                $q->where('nis', $rawNis)
                  ->orWhere('nisn', $rawNis)
                  ->orWhere('idsiswa', $rawNis)
                  ->orWhere('nis', $cleanNis)
                  ->orWhere('nisn', $cleanNis)
                  ->orWhere('idsiswa', $cleanNis);
            })
            ->first();

        if (!$siswa) {
            return response()->json([
                'success' => false,
                'message' => "Siswa dengan nomor identitas/NIS '{$request->nis}' tidak terdaftar di sistem madrasah.",
            ], 404);
        }

        $idPetugas = Auth::id() ?? 2;
        $now = Carbon::now();
        $keperluan = $request->input('keperluan', 'Membaca Buku');

        $kunjungan = Kunjungan::create([
            'idsiswa' => $siswa->idsiswa,
            'idpetugas' => $idPetugas,
            'waktu_kunjung' => $now,
            'keperluan' => $keperluan ?: 'Membaca Buku',
        ]);

        $kelasNama = $siswa->siswaKelas->first()?->kelasDetail?->kelas?->kelas ?? 'Umum';
        $totalKunjunganHariIni = Kunjungan::whereDate('waktu_kunjung', Carbon::today())->count();
        $totalKunjunganSiswa = Kunjungan::where('idsiswa', $siswa->idsiswa)->count();

        return response()->json([
            'success' => true,
            'message' => "Izin masuk dicatat. Selamat datang, {$siswa->nama}!",
            'data' => [
                'id_kunjungan' => $kunjungan->id_kunjungan,
                'idsiswa' => $siswa->idsiswa,
                'nis' => $siswa->nis,
                'nama' => $siswa->nama,
                'kelas' => $kelasNama,
                'keperluan' => $kunjungan->keperluan,
                'waktu_kunjung' => $now->format('H:i'),
                'tanggal' => $now->translatedFormat('d M Y'),
                'total_kunjungan_hari_ini' => $totalKunjunganHariIni,
                'total_kunjungan_siswa' => $totalKunjunganSiswa,
            ],
        ]);
    }

    /**
     * Ambil daftar riwayat kunjungan hari ini dan totalnya.
     */
    public function getKunjunganHariIni(): JsonResponse
    {
        $today = Carbon::today();
        $kunjunganList = Kunjungan::with(['siswa.siswaKelas.kelasDetail.kelas'])
            ->whereDate('waktu_kunjung', $today)
            ->orderBy('waktu_kunjung', 'desc')
            ->limit(50)
            ->get();

        $data = $kunjunganList->map(function ($k) {
            $siswa = $k->siswa;
            $kelasNama = $siswa?->siswaKelas->first()?->kelasDetail?->kelas?->kelas ?? 'Umum';
            return [
                'id_kunjungan' => $k->id_kunjungan,
                'idsiswa' => $k->idsiswa,
                'nis' => $siswa?->nis ?? '-',
                'nama' => $siswa?->nama ?? 'Siswa',
                'kelas' => $kelasNama,
                'keperluan' => $k->keperluan,
                'waktu' => $k->waktu_kunjung ? Carbon::parse($k->waktu_kunjung)->format('H:i') : '-',
                'tanggal' => $k->waktu_kunjung ? Carbon::parse($k->waktu_kunjung)->translatedFormat('d M Y') : '-',
            ];
        });

        return response()->json([
            'success' => true,
            'message' => 'Data kunjungan hari ini berhasil dimuat.',
            'data' => [
                'total_hari_ini' => $kunjunganList->count(),
                'list' => $data,
            ],
        ]);
    }


    /**
     * Update kondisi eksemplar buku (baik, rusak, hilang).
     */
    public function updateKondisiBuku(Request $request, string $kode): JsonResponse
    {
        $request->validate([
            'kondisi' => 'required|string|in:baik,rusak,hilang',
        ]);

        $bukuDetail = $this->findBukuDetail($kode);

        if (!$bukuDetail) {
            return response()->json([
                'success' => false,
                'message' => 'Eksemplar buku tidak ditemukan.',
            ], 404);
        }

        $bukuDetail->update(['kondisi' => $request->kondisi]);

        return response()->json([
            'success' => true,
            'message' => "Kondisi buku {$bukuDetail->kodebukudetail} berhasil diperbarui menjadi {$request->kondisi}.",
            'data' => [
                'kodebukudetail' => $bukuDetail->kodebukudetail,
                'kondisi' => $bukuDetail->kondisi,
            ],
        ]);
    }

}
