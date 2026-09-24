<?php

namespace Tests\Feature;

use App\Models\Buku;
use App\Models\BukuDetail;
use App\Models\Kelas;
use App\Models\KelasDetail;
use App\Models\Pinjam;
use App\Models\Siswa;
use App\Models\SiswaKelas;
use App\Models\TahunAjaran;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PinjamKolektifTest extends TestCase
{
    use RefreshDatabase;

    private User $petugas;
    private Siswa $siswa;
    private Buku $buku;

    protected function setUp(): void
    {
        parent::setUp();

        $this->petugas = User::create([
            'username' => 'petugas_test',
            'password' => bcrypt('password123'),
            'nama_user' => 'Petugas Pustaka Test',
            'role' => 'pustakawan',
        ]);

        $this->siswa = Siswa::create([
            'nis' => '10001',
            'nisn' => '0098765432',
            'nama' => 'Ahmad Ketua Kelas',
        ]);

        $guru = \App\Models\Guru::create([
            'nip' => '198501012010011001',
            'nama_guru' => 'Siti Wali Kelas',
            'no_hp' => '081234567890',
        ]);

        $kelas = Kelas::create([
            'kelas' => '4A',
            'tingkat' => 4,
        ]);

        $ta = TahunAjaran::create([
            'thnajaran' => '2025/2026',
            'tglmulai' => '2025-07-01',
        ]);

        $kelasDetail = KelasDetail::create([
            'idkelas' => $kelas->idkelas,
            'idguru' => $guru->idguru,
            'idthahunajaran' => $ta->idthnajaran,
        ]);

        SiswaKelas::create([
            'idsiswa' => $this->siswa->idsiswa,
            'idkelasdetail' => $kelasDetail->idkelasdetail,
        ]);

        // Buat master buku dengan 10 eksemplar fisik
        $this->buku = Buku::create([
            'isbn' => '978-602-1234-56-7',
            'kodebuku' => 'PAKET-IPA-4',
            'judul' => 'Ilmu Pengetahuan Alam Kelas 4',
            'penulis' => 'Kemdikbud',
            'penerbit' => 'Balai Pustaka',
            'stok' => 10,
            'stok_tersedia' => 10,
        ]);

        for ($i = 1; $i <= 10; $i++) {
            BukuDetail::create([
                'idbuku' => $this->buku->idbuku,
                'kodebukudetail' => 'IPA4-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'kondisi' => 'baik',
            ]);
        }
    }

    public function test_get_buku_kolektif_katalog_success(): void
    {
        $response = $this->getJson('/api/siperpus/buku/kolektif?search=IPA');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonPath('data.data.0.judul', 'Ilmu Pengetahuan Alam Kelas 4');
    }

    public function test_submit_peminjaman_kolektif_success(): void
    {
        $payload = [
            'nis' => '10001',
            'idbuku' => $this->buku->idbuku,
            'jumlah' => 5,
            'keperluan' => 'Pelajaran IPA Jam Ke-3',
        ];

        $response = $this->actingAs($this->petugas)->postJson('/api/siperpus/pinjam/kolektif', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Peminjaman kolektif sekelas berhasil dicatat (5 buku).',
            ])
            ->assertJsonPath('data.penanggung_jawab.nama', 'Ahmad Ketua Kelas')
            ->assertJsonPath('data.buku.jumlah', 5)
            ->assertJsonPath('data.buku.sisa_stok_tersedia', 5);

        // Assert database updates
        $this->assertEquals(5, $this->buku->fresh()->stok_tersedia);
        $this->assertDatabaseHas('tbl_pinjam', [
            'idsiswa' => $this->siswa->idsiswa,
            'status' => 'dipinjam',
        ]);
        $this->assertEquals(5, Pinjam::first()->pinjamDetails()->count());
    }

    public function test_submit_peminjaman_kolektif_gagal_jika_stok_tidak_cukup(): void
    {
        $payload = [
            'nis' => '10001',
            'idbuku' => $this->buku->idbuku,
            'jumlah' => 15, // Stok cuma 10
        ];

        $response = $this->actingAs($this->petugas)->postJson('/api/siperpus/pinjam/kolektif', $payload);

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
            ]);
    }

    public function test_submit_peminjaman_kolektif_gagal_jika_siswa_tidak_ada(): void
    {
        $payload = [
            'nis' => '99999999',
            'idbuku' => $this->buku->idbuku,
            'jumlah' => 3,
        ];

        $response = $this->actingAs($this->petugas)->postJson('/api/siperpus/pinjam/kolektif', $payload);

        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
            ]);
    }

    public function test_get_pinjam_kolektif_aktif(): void
    {
        // Pinjamkan dulu 5 buku
        $this->actingAs($this->petugas)->postJson('/api/siperpus/pinjam/kolektif', [
            'nis' => '10001',
            'idbuku' => $this->buku->idbuku,
            'jumlah' => 5,
        ]);

        $response = $this->getJson('/api/siperpus/pinjam/kolektif/aktif');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonPath('data.total_peminjaman_aktif', 1)
            ->assertJsonPath('data.list.0.jumlah_buku', 5)
            ->assertJsonPath('data.list.0.penanggung_jawab.nama', 'Ahmad Ketua Kelas');
    }

    public function test_submit_pengembalian_kolektif_success(): void
    {
        // 1. Pinjam 6 buku
        $pinjamRes = $this->actingAs($this->petugas)->postJson('/api/siperpus/pinjam/kolektif', [
            'nis' => '10001',
            'idbuku' => $this->buku->idbuku,
            'jumlah' => 6,
        ]);
        $idpinjam = $pinjamRes->json('data.idpinjam');

        $this->assertEquals(4, $this->buku->fresh()->stok_tersedia);

        // 2. Kembalikan seluruh paket kelas
        $kembaliRes = $this->actingAs($this->petugas)->postJson("/api/siperpus/kembali/kolektif/{$idpinjam}");

        $kembaliRes->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'idpinjam' => $idpinjam,
                    'jumlah_dikembalikan' => 6,
                    'status' => 'dikembalikan',
                ],
            ]);

        // 4. Status di tabel pinjam berubah menjadi dikembalikan
        $this->assertDatabaseHas('tbl_pinjam', [
            'idpinjam' => $idpinjam,
            'status' => 'dikembalikan',
        ]);
    }

    public function test_submit_peminjaman_kolektif_via_sample_copy_code(): void
    {
        // Pustakawan scan barcode salah satu eksemplar fisik: 'IPA4-001'
        $payload = [
            'nis' => '10001',
            'kode_buku' => 'IPA4-001', // Scan sample eksemplar
            'jumlah' => 4,
            'keperluan' => 'Belajar Kelompok IPA',
        ];

        $response = $this->actingAs($this->petugas)->postJson('/api/siperpus/pinjam/kolektif', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonPath('data.buku.idbuku', $this->buku->idbuku)
            ->assertJsonPath('data.buku.jumlah', 4);

        $this->assertEquals(6, $this->buku->fresh()->stok_tersedia);
    }

    public function test_scan_pengembalian_detects_collective_loan(): void
    {
        // Pinjam 5 buku secara kolektif
        $this->actingAs($this->petugas)->postJson('/api/siperpus/pinjam/kolektif', [
            'nis' => '10001',
            'idbuku' => $this->buku->idbuku,
            'jumlah' => 5,
        ]);

        // Pustakawan scan salah satu buku yang sedang dipinjam: 'IPA4-002'
        $response = $this->getJson('/api/siperpus/scan/kembali/IPA4-002');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'kodebukudetail' => 'IPA4-002',
                    'is_kolektif' => true,
                    'total_buku_pinjaman' => 5,
                ],
            ]);
    }

    public function test_submit_pengembalian_kolektif_via_copy_barcode(): void
    {
        // 1. Pinjam 4 buku
        $this->actingAs($this->petugas)->postJson('/api/siperpus/pinjam/kolektif', [
            'nis' => '10001',
            'idbuku' => $this->buku->idbuku,
            'jumlah' => 4,
        ]);

        $this->assertEquals(6, $this->buku->fresh()->stok_tersedia);

        // 2. Kembalikan paket kelas cukup dengan scan salah satu barcode buku ('IPA4-003')
        $response = $this->actingAs($this->petugas)->postJson('/api/siperpus/kembali/kolektif', [
            'kodebukudetail' => 'IPA4-003',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'jumlah_dikembalikan' => 4,
                    'status' => 'dikembalikan',
                ],
            ]);

        // 3. Stok kembali normal
        $this->assertEquals(10, $this->buku->fresh()->stok_tersedia);
    }
}
