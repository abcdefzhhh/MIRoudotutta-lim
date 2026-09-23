-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: mi_roudotuttalim
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache` (
  `key` varchar(191) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache_locks` (
  `key` varchar(191) NOT NULL,
  `owner` varchar(191) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contacts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `extracurriculars`
--

DROP TABLE IF EXISTS `extracurriculars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `extracurriculars` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `schedule` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extracurriculars`
--

LOCK TABLES `extracurriculars` WRITE;
/*!40000 ALTER TABLE `extracurriculars` DISABLE KEYS */;
INSERT INTO `extracurriculars` VALUES (1,'Pramuka','Melatih kemandirian dan kedisiplinan siswa.',NULL,NULL,NULL,'2026-09-03 00:05:22','2026-09-03 00:05:22'),(2,'Tahfidz Quran','Program menghafal Al-Quran.',NULL,NULL,NULL,'2026-09-03 00:05:22','2026-09-03 00:05:22'),(3,'Drumband','Mengembangkan bakat musik dan kerjasama.',NULL,NULL,NULL,'2026-09-03 00:05:22','2026-09-03 00:05:22'),(4,'Seni Kaligrafi','Mengasah keterampilan seni Islami.',NULL,NULL,NULL,'2026-09-03 00:05:22','2026-09-03 00:05:22'),(5,'Olahraga','Futsal dan senam untuk kesehatan fisik.',NULL,NULL,NULL,'2026-09-03 00:05:22','2026-09-03 00:05:22');
/*!40000 ALTER TABLE `extracurriculars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facilities`
--

DROP TABLE IF EXISTS `facilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facilities` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facilities`
--

LOCK TABLES `facilities` WRITE;
/*!40000 ALTER TABLE `facilities` DISABLE KEYS */;
INSERT INTO `facilities` VALUES (1,'Masjid/Musholla','Tempat ibadah yang nyaman untuk siswa dan guru.',NULL,NULL,'2026-09-03 00:05:22','2026-09-03 00:05:22'),(2,'Ruang Kelas','Ruang kelas yang bersih dan kondusif.',NULL,NULL,'2026-09-03 00:05:22','2026-09-03 00:05:22'),(3,'Lab Komputer','Laboratorium komputer untuk pembelajaran TIK.',NULL,NULL,'2026-09-03 00:05:22','2026-09-03 00:05:22'),(4,'Perpustakaan','Koleksi buku lengkap untuk menunjang literasi.',NULL,NULL,'2026-09-03 00:05:22','2026-09-03 00:05:22'),(5,'Lapangan Olahraga','Fasilitas untuk kegiatan fisik dan olahraga.',NULL,NULL,'2026-09-03 00:05:22','2026-09-03 00:05:22'),(6,'UKS','Unit Kesehatan Sekolah untuk pertolongan pertama.',NULL,NULL,'2026-09-03 00:05:22','2026-09-03 00:05:22');
/*!40000 ALTER TABLE `facilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gallery` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
INSERT INTO `gallery` VALUES (1,'Kegiatan Sekolah 1','gallery/sample1.jpg','Akademik','Deskripsi untuk kegiatan sekolah 1','2026-09-03 00:05:22','2026-09-03 00:05:22'),(2,'Kegiatan Sekolah 2','gallery/sample2.jpg','Kegiatan','Deskripsi untuk kegiatan sekolah 2','2026-09-03 00:05:22','2026-09-03 00:05:22'),(3,'Kegiatan Sekolah 3','gallery/sample3.jpg','Akademik','Deskripsi untuk kegiatan sekolah 3','2026-09-03 00:05:22','2026-09-03 00:05:22'),(4,'Kegiatan Sekolah 4','gallery/sample4.jpg','Prestasi','Deskripsi untuk kegiatan sekolah 4','2026-09-03 00:05:22','2026-09-03 00:05:22'),(5,'Kegiatan Sekolah 5','gallery/sample5.jpg','Prestasi','Deskripsi untuk kegiatan sekolah 5','2026-09-03 00:05:22','2026-09-03 00:05:22'),(6,'Kegiatan Sekolah 6','gallery/sample6.jpg','Akademik','Deskripsi untuk kegiatan sekolah 6','2026-09-03 00:05:22','2026-09-03 00:05:22'),(7,'Kegiatan Sekolah 7','gallery/sample7.jpg','Akademik','Deskripsi untuk kegiatan sekolah 7','2026-09-03 00:05:22','2026-09-03 00:05:22'),(8,'Kegiatan Sekolah 8','gallery/sample8.jpg','Kegiatan','Deskripsi untuk kegiatan sekolah 8','2026-09-03 00:05:22','2026-09-03 00:05:22');
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_batches` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'2026_01_01_000001_create_news_table',1),(3,'2026_01_01_000002_create_ppdb_registrations_table',1),(4,'2026_01_01_000003_create_facilities_table',1),(5,'2026_01_01_000004_create_extracurriculars_table',1),(6,'2026_01_01_000005_create_contacts_table',1),(7,'2026_01_01_000006_create_gallery_table',1),(8,'0001_01_01_000001_create_cache_table',2),(9,'0001_01_01_000002_create_jobs_table',2),(10,'2026_09_10_014546_create_personal_access_tokens_table',2),(11,'2026_09_10_020001_create_tbl_siswa_table',2),(12,'2026_09_10_020002_create_tbl_guru_table',2),(13,'2026_09_10_020003_create_tbl_buku_table',2),(14,'2026_09_10_020004_create_tbl_buku_detail_table',2),(15,'2026_09_10_020005_create_tbl_kelas_table',2),(16,'2026_09_10_020006_create_tbl_tahun_ajaran_table',2),(17,'2026_09_10_020007_create_tbl_kelas_detail_table',2),(18,'2026_09_10_020008_create_tbl_siswa_kelas_table',2),(19,'2026_09_10_020009_create_tbl_pinjam_table',3),(20,'2026_09_10_020010_create_tbl_pinjam_detail_table',3),(21,'2026_09_10_020011_create_tbl_berita_table',3);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `excerpt` text NOT NULL,
  `category` varchar(255) NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `author_id` bigint(20) unsigned NOT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 0,
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `news_slug_unique` (`slug`),
  KEY `news_author_id_foreign` (`author_id`),
  CONSTRAINT `news_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'Penerimaan Peserta Didik Baru Tahun Ajaran 2026/2027','penerimaan-peserta-didik-baru-tahun-ajaran-20262027','Ini adalah konten lengkap untuk berita Penerimaan Peserta Didik Baru Tahun Ajaran 2026/2027. Madrasah Ibtidaiyah Roudotutta\'lim selalu berupaya memberikan yang terbaik untuk siswa-siswi.','Ringkasan berita tentang Penerimaan Peserta Didik Baru Tahun Ajaran 2026/2027','Informasi',NULL,1,1,'2026-09-03 00:05:22','2026-09-03 00:05:22','2026-09-03 00:05:22'),(2,'Siswa MI Roudotutta\'lim Raih Juara 1 Lomba Tahfidz Tingkat Kabupaten','siswa-mi-roudotuttalim-raih-juara-1-lomba-tahfidz-tingkat-kabupaten','Ini adalah konten lengkap untuk berita Siswa MI Roudotutta\'lim Raih Juara 1 Lomba Tahfidz Tingkat Kabupaten. Madrasah Ibtidaiyah Roudotutta\'lim selalu berupaya memberikan yang terbaik untuk siswa-siswi.','Ringkasan berita tentang Siswa MI Roudotutta\'lim Raih Juara 1 Lomba Tahfidz Tingkat Kabupaten','Informasi',NULL,1,1,'2026-09-01 00:05:22','2026-09-03 00:05:22','2026-09-03 00:05:22'),(3,'Kegiatan Maulid Nabi Muhammad SAW 1448 H','kegiatan-maulid-nabi-muhammad-saw-1448-h','Ini adalah konten lengkap untuk berita Kegiatan Maulid Nabi Muhammad SAW 1448 H. Madrasah Ibtidaiyah Roudotutta\'lim selalu berupaya memberikan yang terbaik untuk siswa-siswi.','Ringkasan berita tentang Kegiatan Maulid Nabi Muhammad SAW 1448 H','Informasi',NULL,1,1,'2026-08-30 00:05:22','2026-09-03 00:05:22','2026-09-03 00:05:22'),(4,'Pembagian Rapor Semester Ganjil 2025/2026','pembagian-rapor-semester-ganjil-20252026','Ini adalah konten lengkap untuk berita Pembagian Rapor Semester Ganjil 2025/2026. Madrasah Ibtidaiyah Roudotutta\'lim selalu berupaya memberikan yang terbaik untuk siswa-siswi.','Ringkasan berita tentang Pembagian Rapor Semester Ganjil 2025/2026','Informasi',NULL,1,1,'2026-08-28 00:05:22','2026-09-03 00:05:22','2026-09-03 00:05:22'),(5,'Pelatihan Guru dalam Penggunaan Teknologi Pembelajaran','pelatihan-guru-dalam-penggunaan-teknologi-pembelajaran','Ini adalah konten lengkap untuk berita Pelatihan Guru dalam Penggunaan Teknologi Pembelajaran. Madrasah Ibtidaiyah Roudotutta\'lim selalu berupaya memberikan yang terbaik untuk siswa-siswi.','Ringkasan berita tentang Pelatihan Guru dalam Penggunaan Teknologi Pembelajaran','Informasi',NULL,1,1,'2026-08-26 00:05:22','2026-09-03 00:05:22','2026-09-03 00:05:22');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ppdb_registrations`
--

DROP TABLE IF EXISTS `ppdb_registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ppdb_registrations` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `student_name` varchar(255) NOT NULL,
  `birth_date` date NOT NULL,
  `birth_place` varchar(255) NOT NULL,
  `gender` enum('L','P') NOT NULL,
  `parent_name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `previous_school` varchar(255) DEFAULT NULL,
  `registration_year` varchar(255) NOT NULL,
  `status` enum('pending','accepted','rejected') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ppdb_registrations`
--

LOCK TABLES `ppdb_registrations` WRITE;
/*!40000 ALTER TABLE `ppdb_registrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `ppdb_registrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_berita`
--

DROP TABLE IF EXISTS `tbl_berita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_berita` (
  `id_berita` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `judul` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `gambar_thumbnail` varchar(255) DEFAULT NULL,
  `isi_konten` text NOT NULL,
  `tgl_publish` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_berita`),
  UNIQUE KEY `tbl_berita_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_berita`
--

LOCK TABLES `tbl_berita` WRITE;
/*!40000 ALTER TABLE `tbl_berita` DISABLE KEYS */;
INSERT INTO `tbl_berita` VALUES (1,'Peringatan Maulid Nabi Muhammad SAW di MI Roudotutta\'lim Penuh Khidmat','peringatan-maulid-nabi-muhammad-saw-mi-roudotuttalim','berita/maulid_nabi_2025.jpg','Keluarga besar MI Roudotutta\'lim menyelenggarakan peringatan Maulid Nabi Muhammad SAW 1447 H. Acara diisi dengan penampilan shalawat banjari para siswa, pembacaan qasidah Diba\', santunan kepada anak yatim, serta tausiyah agama oleh Pengasuh Madrasah mengenai keteladanan akhlak Rasulullah.','2026-09-07 01:28:53','2026-09-16 18:28:53','2026-09-16 18:28:53'),(2,'Semarak Gerakan Gemar Membaca dan Pojok Baca Digital di Perpustakaan Madrasah','semarak-gerakan-gemar-membaca-dan-pojok-baca-digital','berita/pojok_baca_digital.jpg','Perpustakaan SIPERPUS MI Roudotutta\'lim meresmikan sarana pojok baca interaktif yang dilengkapi tablet literasi digital dan ribuan buku ensiklopedia anak islami. Siswa-siswi sangat antusias mengikuti tantangan membaca 15 menit sebelum masuk kelas.','2026-09-12 01:28:53','2026-09-16 18:28:53','2026-09-16 18:28:53'),(3,'Siswa MI Roudotutta\'lim Sabet Medali Emas Lomba Tahfidz dan Kaligrafi Tingkat Kecamatan','siswa-mi-roudotuttalim-sabet-medali-emas-lomba-tahfidz-kaligrafi','berita/prestasi_tahfidz_2025.jpg','Prestasi membanggakan kembali ditorehkan oleh santri MI Roudotutta\'lim dalam ajang Festival Seni & Olahraga Madrasah (AKSIOMA). Muhammad Al-Fatih dan Aisyah Humaira sukses meraih Juara 1 Cabang Tahfidz Juz 30 dan Cabang Seni Khat Kaligrafi Islam.','2026-09-15 01:28:53','2026-09-16 18:28:53','2026-09-16 18:28:53');
/*!40000 ALTER TABLE `tbl_berita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_buku`
--

DROP TABLE IF EXISTS `tbl_buku`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_buku` (
  `idbuku` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `isbn` varchar(50) NOT NULL,
  `kodebuku` varchar(50) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `penulis` varchar(150) NOT NULL,
  `penerbit` varchar(150) NOT NULL,
  `stok` int(11) NOT NULL DEFAULT 0,
  `stok_tersedia` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idbuku`),
  UNIQUE KEY `tbl_buku_isbn_unique` (`isbn`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_buku`
--

LOCK TABLES `tbl_buku` WRITE;
/*!40000 ALTER TABLE `tbl_buku` DISABLE KEYS */;
INSERT INTO `tbl_buku` VALUES (1,'978-623-01-0101-1','BK-AA1','Akidah Akhlak Pendekatan Saintifik Kurikulum Madrasah MI Kelas 1','Drs. H. Masrun, M.Pd.I','Kementerian Agama RI',3,2,'2026-09-16 18:28:53','2026-09-16 18:28:53'),(2,'978-623-01-0102-8','BK-FQ2','Fiqih Ibadah Dasar MI Kelas 2','Dr. H. Sulaiman, M.Ag','Kementerian Agama RI',3,2,'2026-09-16 18:28:53','2026-09-16 18:28:53'),(3,'978-623-01-0103-5','BK-SKI3','Sejarah Kebudayaan Islam: Jejak Kenabian MI Kelas 3','Ahmad Syarifuddin, M.A','Penerbit Erlangga',3,3,'2026-09-16 18:28:53','2026-09-16 18:28:53'),(4,'978-623-01-0104-2','BK-QH4','Al-Qur\'an Hadis Pedoman Hidup MI Kelas 4','Ustadz Muhammad Zainuri','Tiga Serangkai',2,2,'2026-09-16 18:28:53','2026-09-16 18:28:53'),(5,'978-623-01-0105-9','BK-BA5','Bahasa Arab MI Kelas 5: Belajar Komunikasi Qur\'ani','Farhan Mansyur, M.Pd','Kementerian Agama RI',3,3,'2026-09-16 18:28:53','2026-09-16 18:28:53'),(6,'978-623-01-0106-6','BK-MTK6','Mahir Matematika MI & SD Kelas 6 Kurikulum Merdeka','Prof. Dr. Wahyudi, M.Sc','Yudhistira Media',2,2,'2026-09-16 18:28:53','2026-09-16 18:28:53'),(7,'978-623-01-0107-3','BK-IPAS4','Ilmu Pengetahuan Alam dan Sosial (IPAS) MI Kelas 4','Dra. Endang Lestari','Grafindo Media Pratama',3,3,'2026-09-16 18:28:53','2026-09-16 18:28:53'),(8,'978-623-01-0108-0','BK-ENS01','Ensiklopedia Sains Islam untuk Anak Pintar','Tim Penulis Mizan Kids','Mizan Pustaka',2,2,'2026-09-16 18:28:53','2026-09-16 18:28:53'),(9,'978-623-01-0109-7','BK-KS25','Kisah Teladan 25 Nabi dan Rasul Bergambar','Kak Nurul Ihsan','Gema Insani Press',3,3,'2026-09-16 18:28:53','2026-09-16 18:28:53'),(10,'978-623-01-0110-3','BK-KMS03','Kamus Bergambar 3 Bahasa (Indonesia - Arab - Inggris) Madrasah Cilik','Dr. H. M. Bahruddin','Kanisius Edukasi',2,2,'2026-09-16 18:28:53','2026-09-16 18:28:53');
/*!40000 ALTER TABLE `tbl_buku` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_buku_detail`
--

DROP TABLE IF EXISTS `tbl_buku_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_buku_detail` (
  `idbukudetail` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `idbuku` bigint(20) unsigned NOT NULL,
  `kodebukudetail` varchar(50) NOT NULL,
  `kondisi` enum('baik','rusak','hilang') NOT NULL DEFAULT 'baik',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idbukudetail`),
  UNIQUE KEY `tbl_buku_detail_kodebukudetail_unique` (`kodebukudetail`),
  KEY `tbl_buku_detail_idbuku_foreign` (`idbuku`),
  CONSTRAINT `tbl_buku_detail_idbuku_foreign` FOREIGN KEY (`idbuku`) REFERENCES `tbl_buku` (`idbuku`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_buku_detail`
--

LOCK TABLES `tbl_buku_detail` WRITE;
/*!40000 ALTER TABLE `tbl_buku_detail` DISABLE KEYS */;
INSERT INTO `tbl_buku_detail` VALUES (1,1,'BK-AA1-001','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(2,1,'BK-AA1-002','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(3,1,'BK-AA1-003','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(4,2,'BK-FQ2-001','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(5,2,'BK-FQ2-002','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(6,2,'BK-FQ2-003','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(7,3,'BK-SKI3-001','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(8,3,'BK-SKI3-002','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(9,3,'BK-SKI3-003','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(10,4,'BK-QH4-001','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(11,4,'BK-QH4-002','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(12,5,'BK-BA5-001','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(13,5,'BK-BA5-002','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(14,5,'BK-BA5-003','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(15,6,'BK-MTK6-001','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(16,6,'BK-MTK6-002','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(17,7,'BK-IPAS4-001','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(18,7,'BK-IPAS4-002','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(19,7,'BK-IPAS4-003','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(20,8,'BK-ENS01-001','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(21,8,'BK-ENS01-002','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(22,9,'BK-KS25-001','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(23,9,'BK-KS25-002','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(24,9,'BK-KS25-003','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(25,10,'BK-KMS03-001','baik','2026-09-16 18:28:53','2026-09-16 18:28:53'),(26,10,'BK-KMS03-002','baik','2026-09-16 18:28:53','2026-09-16 18:28:53');
/*!40000 ALTER TABLE `tbl_buku_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_guru`
--

DROP TABLE IF EXISTS `tbl_guru`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_guru` (
  `idguru` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nip` varchar(50) NOT NULL,
  `nama_guru` varchar(150) NOT NULL,
  `no_hp` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idguru`),
  UNIQUE KEY `tbl_guru_nip_unique` (`nip`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_guru`
--

LOCK TABLES `tbl_guru` WRITE;
/*!40000 ALTER TABLE `tbl_guru` DISABLE KEYS */;
INSERT INTO `tbl_guru` VALUES (1,'197805122005011002','Ahmad Fauzi, S.Pd.I','081234567890','2026-09-16 18:28:52','2026-09-16 18:28:52'),(2,'198203152008012004','Siti Nurhaliza, S.Pd','081234567891','2026-09-16 18:28:52','2026-09-16 18:28:52'),(3,'198509202010011003','Muhammad Ridwan, M.Pd','081234567892','2026-09-16 18:28:52','2026-09-16 18:28:52'),(4,'198901102015022001','Nurul Hidayah, S.Ag','081234567893','2026-09-16 18:28:52','2026-09-16 18:28:52'),(5,'199107252019031005','Agus Setiawan, S.Pd','081234567894','2026-09-16 18:28:52','2026-09-16 18:28:52'),(6,'197005152003122001','EULIS JULAEHA S.Pd.I','082218258310','2026-09-22 22:02:16','2026-09-22 22:02:16'),(7,'4342754657200023','AMIN SHOLIHIN S.Sos.I','0895346158641','2026-09-22 22:02:16','2026-09-22 22:02:16'),(8,'9241760662300033','CUCU MARFU\'AH','081320241027','2026-09-22 22:02:16','2026-09-22 22:02:16'),(9,'1360754654300003','NENDEN RENNY SITTI NURAENI','087822820058','2026-09-22 22:02:16','2026-09-22 22:02:16'),(10,'197404082007102002','NURAENI','085220903005','2026-09-22 22:02:16','2026-09-22 22:02:16'),(11,'0020207267185002','SINTA LISTIAWATI','081287223293','2026-09-22 22:02:16','2026-09-22 22:02:16'),(12,'6937748652200022','ATANG SUHENDI','087822057227','2026-09-22 22:02:16','2026-09-22 22:02:16'),(13,'197608092007102003','JAMILATUL SAFITRI','087822153530','2026-09-22 22:02:16','2026-09-22 22:02:16'),(14,'8234764665200033','EKO JOKO SUSSANTO','085294225866','2026-09-22 22:02:16','2026-09-22 22:02:16'),(15,'4049748650200033','AHMAD HAIDAR ILYAS','081320734102','2026-09-22 22:02:16','2026-09-22 22:02:16'),(16,'8935757659300032','AI MAFTUHAH','082317098119','2026-09-22 22:02:16','2026-09-22 22:02:16'),(17,'6047764666210083','FARIZ JAMILAH S.Pd.I','089636058110','2026-09-22 22:02:16','2026-09-22 22:02:16'),(18,'0020207267183001','ENTIN PRIHANTINI','085220419416','2026-09-22 22:02:16','2026-09-22 22:02:16'),(19,'5241742643300043','TRI HAZARIYANTI','081573074863','2026-09-22 22:02:16','2026-09-22 22:02:16'),(20,'197112292007101001','NAZARUDIN','081214183943','2026-09-22 22:02:16','2026-09-22 22:02:16'),(21,'5945761663320001','RIDWAN MUSTOFA SURUR','085778258221','2026-09-22 22:02:16','2026-09-22 22:02:16'),(22,'20267335','MIRWAN SHOFIA','083821800038','2026-09-22 22:02:16','2026-09-22 22:02:16'),(23,'7839760662200012','MUKHTAR YUNUS SAEPUL MUKMIN','083865587273','2026-09-22 22:02:16','2026-09-22 22:02:16'),(24,'197808232007101001','SUGIMAN','085220209878','2026-09-22 22:02:16','2026-09-22 22:02:16'),(25,'0020207267196001','AI NENDEN MUSTAKIMAH','081221456520','2026-09-22 22:02:16','2026-09-22 22:02:16'),(26,'0020207267192004','SANDI KURNIAWAN S.Pd','081311436859','2026-09-22 22:02:16','2026-09-22 22:02:16'),(27,'3217105006980021','ARTI MUNAWAROH','087764593607','2026-09-22 22:02:16','2026-09-22 22:02:16'),(28,'3217095105980001','MARDIANA RAHAYU','089682917092','2026-09-22 22:02:16','2026-09-22 22:02:16'),(29,'0000000000000000','ZAINI ARJAB','089603546055','2026-09-22 22:02:16','2026-09-22 22:02:16'),(30,'2020726719200600','PENI NOVALIA','0895343569729','2026-09-22 22:02:16','2026-09-22 22:02:16'),(31,'3217095210990008','SYANINDITA NURULIZA','081224725743','2026-09-22 22:02:16','2026-09-22 22:02:16'),(32,'3217090603960012','FUAD MUBAROK THOLIB','0895320069887','2026-09-22 22:02:16','2026-09-22 22:02:16'),(33,'3217131408970009','SORAYA ANZALANI SA\'IDAH DAROINI','0882001178491','2026-09-22 22:02:16','2026-09-22 22:02:16'),(34,'3217090408790010','YOSEP SETIYADI SE','081222425610','2026-09-22 22:02:16','2026-09-22 22:02:16'),(35,'3217092004850028','KIKI SETIADI',NULL,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(36,'3217097004920009','KIKI NURAFRILIYANTI','085795466720','2026-09-22 22:02:16','2026-09-22 22:02:16'),(37,'3217160204970006','AGUNG GUNAWAN',NULL,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(38,'5663766668200002','A. YOGHA PRAMUDYA','081910304140','2026-09-22 22:02:16','2026-09-22 22:02:16'),(39,'3217090210970008','ABDUL ROJAK',NULL,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(40,'3217097011000004','SALSA MUTIAWATI RAMADHAN',NULL,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(41,'3217094810030007','NADILA ROWATUL ROHMAH',NULL,'2026-09-22 22:02:16','2026-09-22 22:02:16');
/*!40000 ALTER TABLE `tbl_guru` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_kelas`
--

DROP TABLE IF EXISTS `tbl_kelas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_kelas` (
  `idkelas` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `kelas` varchar(50) NOT NULL,
  `tingkat` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idkelas`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_kelas`
--

LOCK TABLES `tbl_kelas` WRITE;
/*!40000 ALTER TABLE `tbl_kelas` DISABLE KEYS */;
INSERT INTO `tbl_kelas` VALUES (1,'1A',1,'2026-09-16 18:28:52','2026-09-16 18:28:52'),(2,'2A',2,'2026-09-16 18:28:52','2026-09-16 18:28:52'),(3,'3A',3,'2026-09-16 18:28:52','2026-09-16 18:28:52'),(4,'4A',4,'2026-09-16 18:28:52','2026-09-16 18:28:52'),(5,'5A',5,'2026-09-16 18:28:52','2026-09-16 18:28:52'),(6,'6A',6,'2026-09-16 18:28:52','2026-09-16 18:28:52'),(7,'1B',1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(8,'1C',1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(9,'2B',2,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(10,'2C',2,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(11,'3B',3,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(12,'3C',3,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(13,'4B',4,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(14,'4C',4,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(15,'5B',5,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(16,'5C',5,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(17,'6B',6,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(18,'6C',6,'2026-09-22 22:02:16','2026-09-22 22:02:16');
/*!40000 ALTER TABLE `tbl_kelas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_kelas_detail`
--

DROP TABLE IF EXISTS `tbl_kelas_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_kelas_detail` (
  `idkelasdetail` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `idkelas` bigint(20) unsigned NOT NULL,
  `idguru` bigint(20) unsigned NOT NULL,
  `idthahunajaran` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idkelasdetail`),
  KEY `tbl_kelas_detail_idkelas_foreign` (`idkelas`),
  KEY `tbl_kelas_detail_idguru_foreign` (`idguru`),
  KEY `tbl_kelas_detail_idthahunajaran_foreign` (`idthahunajaran`),
  CONSTRAINT `tbl_kelas_detail_idguru_foreign` FOREIGN KEY (`idguru`) REFERENCES `tbl_guru` (`idguru`) ON DELETE CASCADE,
  CONSTRAINT `tbl_kelas_detail_idkelas_foreign` FOREIGN KEY (`idkelas`) REFERENCES `tbl_kelas` (`idkelas`) ON DELETE CASCADE,
  CONSTRAINT `tbl_kelas_detail_idthahunajaran_foreign` FOREIGN KEY (`idthahunajaran`) REFERENCES `tbl_tahun_ajaran` (`idthnajaran`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_kelas_detail`
--

LOCK TABLES `tbl_kelas_detail` WRITE;
/*!40000 ALTER TABLE `tbl_kelas_detail` DISABLE KEYS */;
INSERT INTO `tbl_kelas_detail` VALUES (1,1,6,1,'2026-09-16 18:28:52','2026-09-22 22:02:16'),(2,2,13,1,'2026-09-16 18:28:52','2026-09-22 22:02:16'),(3,3,18,1,'2026-09-16 18:28:52','2026-09-22 22:02:16'),(4,4,23,1,'2026-09-16 18:28:52','2026-09-22 22:02:16'),(5,5,27,1,'2026-09-16 18:28:52','2026-09-22 22:02:16'),(6,6,31,1,'2026-09-16 18:28:52','2026-09-22 22:02:16'),(7,7,7,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(8,8,8,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(9,9,16,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(10,10,17,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(11,11,20,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(12,12,22,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(13,13,24,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(14,14,25,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(15,15,29,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(16,16,30,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(17,17,32,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(18,18,33,1,'2026-09-22 22:02:16','2026-09-22 22:02:16');
/*!40000 ALTER TABLE `tbl_kelas_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_pinjam`
--

DROP TABLE IF EXISTS `tbl_pinjam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_pinjam` (
  `idpinjam` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `idsiswa` bigint(20) unsigned NOT NULL,
  `idpetugas` bigint(20) unsigned NOT NULL,
  `waktu` datetime NOT NULL,
  `tgl_batas_kembali` date NOT NULL,
  `tgl_dikembalikan` date DEFAULT NULL,
  `status` enum('dipinjam','dikembalikan','terlambat') NOT NULL DEFAULT 'dipinjam',
  `total_denda` decimal(12,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idpinjam`),
  KEY `tbl_pinjam_idsiswa_foreign` (`idsiswa`),
  KEY `tbl_pinjam_idpetugas_foreign` (`idpetugas`),
  CONSTRAINT `tbl_pinjam_idpetugas_foreign` FOREIGN KEY (`idpetugas`) REFERENCES `tbl_users` (`id_user`) ON DELETE CASCADE,
  CONSTRAINT `tbl_pinjam_idsiswa_foreign` FOREIGN KEY (`idsiswa`) REFERENCES `tbl_siswa` (`idsiswa`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_pinjam`
--

LOCK TABLES `tbl_pinjam` WRITE;
/*!40000 ALTER TABLE `tbl_pinjam` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_pinjam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_pinjam_detail`
--

DROP TABLE IF EXISTS `tbl_pinjam_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_pinjam_detail` (
  `idpinjamdetail` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `idpinjam` bigint(20) unsigned NOT NULL,
  `idbukudetail` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idpinjamdetail`),
  KEY `tbl_pinjam_detail_idpinjam_foreign` (`idpinjam`),
  KEY `tbl_pinjam_detail_idbukudetail_foreign` (`idbukudetail`),
  CONSTRAINT `tbl_pinjam_detail_idbukudetail_foreign` FOREIGN KEY (`idbukudetail`) REFERENCES `tbl_buku_detail` (`idbukudetail`) ON DELETE CASCADE,
  CONSTRAINT `tbl_pinjam_detail_idpinjam_foreign` FOREIGN KEY (`idpinjam`) REFERENCES `tbl_pinjam` (`idpinjam`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_pinjam_detail`
--

LOCK TABLES `tbl_pinjam_detail` WRITE;
/*!40000 ALTER TABLE `tbl_pinjam_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_pinjam_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_siswa`
--

DROP TABLE IF EXISTS `tbl_siswa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_siswa` (
  `idsiswa` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nis` varchar(50) NOT NULL,
  `nisn` varchar(50) DEFAULT NULL,
  `nama` varchar(150) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idsiswa`),
  UNIQUE KEY `tbl_siswa_nis_unique` (`nis`)
) ENGINE=InnoDB AUTO_INCREMENT=641 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_siswa`
--

LOCK TABLES `tbl_siswa` WRITE;
/*!40000 ALTER TABLE `tbl_siswa` DISABLE KEYS */;
INSERT INTO `tbl_siswa` VALUES (21,'2501001','3203835528','DHIAURRAHMA AISH HAIBA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(22,'2501002',NULL,'MUHAMMAD ABIYA ASH SHIDDIQ','2026-09-22 22:02:16','2026-09-22 22:02:16'),(23,'2501003',NULL,'QIANA GEMPITA RAMADHANI','2026-09-22 22:02:16','2026-09-22 22:02:16'),(24,'2501004',NULL,'GAVIN ARFAN ALHUSAYN','2026-09-22 22:02:16','2026-09-22 22:02:16'),(25,'2501005',NULL,'ZAHIRA AQILLA ROBBY','2026-09-22 22:02:16','2026-09-22 22:02:16'),(26,'2501006',NULL,'DEVANKA ATHALLA ENDARU','2026-09-22 22:02:16','2026-09-22 22:02:16'),(27,'2501007',NULL,'MUHAMMAD ZAKI ABDULLAH','2026-09-22 22:02:16','2026-09-22 22:02:16'),(28,'2501008',NULL,'RAIQA SHEZA AQILA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(29,'2501009','3190564217','AZRIL RASHDAN SHAZIYA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(30,'2501010','3198721913','MUHAMMAD RAFFASYA ARFAN','2026-09-22 22:02:16','2026-09-22 22:02:16'),(31,'2501011','3195517288','MUHAMMAD NAUFAL ABDURRAHMAN','2026-09-22 22:02:16','2026-09-22 22:02:16'),(32,'2501012','3195612996','ALULA RAMANIA HERDIANA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(33,'2501013','3190381992','HAFIDZAN RASID ABDILLAH','2026-09-22 22:02:16','2026-09-22 22:02:16'),(34,'2501014','3197218215','SYAFIQ AZ DZIKRI','2026-09-22 22:02:16','2026-09-22 22:02:16'),(35,'2501015','3191565357','ASSYIFA TALITHA AZAHRA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(36,'2501016','3196035901','ZIYAD UWAIS AL QORNI','2026-09-22 22:02:16','2026-09-22 22:02:16'),(37,'2501017','3199485314','NADHIRA AULIA IZZATUNNISA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(38,'2501018','3207879778','RUMAISHA ASAFA MEDINA DAUD','2026-09-22 22:02:16','2026-09-22 22:02:16'),(39,'2501019','3207587697','Latisya Shaqueena Afshen Romeesa','2026-09-22 22:02:16','2026-09-22 22:02:16'),(40,'2501020','3194293595','Annisa Zahira','2026-09-22 22:02:16','2026-09-22 22:02:16'),(41,'2501021','3193800993','GHANIA AFRIN FAHIMA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(42,'2501022','3191002072','FREYA QUEENATHA ALESHA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(43,'2501023','3202335743','Raiqa Ibnatu Munira','2026-09-22 22:02:16','2026-09-22 22:02:16'),(44,'2501024','3193805169','ASHIMA DINILLAH RUSTANDI','2026-09-22 22:02:16','2026-09-22 22:02:16'),(45,'2501025','3194657273','RATU DESSTIYANTI YULIANA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(46,'2501026','3196022535','ABREAL RAFARDHAN MOKODOMPIT','2026-09-22 22:02:16','2026-09-22 22:02:16'),(47,'2501027','3194964494','AFRAZ DANEER ASWADI','2026-09-22 22:02:16','2026-09-22 22:02:16'),(48,'2501028','3198264448','DIAZ ILYASA MUHARAM','2026-09-22 22:02:16','2026-09-22 22:02:16'),(49,'2501029','3195131107','Muhammad Ikram Nurfadhlan','2026-09-22 22:02:16','2026-09-22 22:02:16'),(50,'2501030','3204117373','Azkie Elmeer Syiami','2026-09-22 22:02:16','2026-09-22 22:02:16'),(51,'2501031','3199487405','QAIS GHAZI GHAIYYAS RIZKI','2026-09-22 22:02:16','2026-09-22 22:02:16'),(52,'2501032','3190970950','Adhitama Rahman Khair','2026-09-22 22:02:16','2026-09-22 22:02:16'),(53,'2501033','3198865410','ALMAIRA SHAFA KHADIJAH','2026-09-22 22:02:16','2026-09-22 22:02:16'),(54,'2501034','3201791835','SENAVIA DZAKIRA TSANI','2026-09-22 22:02:16','2026-09-22 22:02:16'),(55,'2501035','3194779995','MUHAMMAD DZAKIANDRA SYAHPUTRA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(56,'2501036','3203139738','AINUR SHANUM SHALIHAH','2026-09-22 22:02:16','2026-09-22 22:02:16'),(57,'2501037','3201618605','Akhtar Rafiq Saputra','2026-09-22 22:02:16','2026-09-22 22:02:16'),(58,'2501038','3198205188','NOURIL NAJWAN','2026-09-22 22:02:16','2026-09-22 22:02:16'),(59,'2501039',NULL,'NABILA PUTRI ADZKIYA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(60,'2501040',NULL,'ABIDZAR GANDHI KUSWANTORO','2026-09-22 22:02:16','2026-09-22 22:02:16'),(61,'2501041',NULL,'NADHIRA CHANDRA MAIZA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(62,'2501042',NULL,'MUHAMMAD SAYYID BILAL','2026-09-22 22:02:16','2026-09-22 22:02:16'),(63,'2501043','3192542551','SALWA KHUMAIRA RAMADHANI','2026-09-22 22:02:16','2026-09-22 22:02:16'),(64,'2501044','3193565342','MUHAMAD SAEPUL AKBAR','2026-09-22 22:02:16','2026-09-22 22:02:16'),(65,'2501045','3199516559','MUHAMAD BAYU NUGRAHA SANJAYA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(66,'2501046','3194922327','SAKINA KHAIRA PUTRI','2026-09-22 22:02:16','2026-09-22 22:02:16'),(67,'2501047','3200953500','ELVANO PARVIZ PUTRA NUGROHO','2026-09-22 22:02:16','2026-09-22 22:02:16'),(68,'2501048','3197392585','BUNGA FEISYA RIZHANI','2026-09-22 22:02:16','2026-09-22 22:02:16'),(69,'2501049','3195882173','SYAFIRA NOOR ASYIFA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(70,'2501050',NULL,'ASHEEQA FARZANA HUMAIRA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(71,'2501051','3203329363','SRI YULIA ASSYAKIR','2026-09-22 22:02:16','2026-09-22 22:02:16'),(72,'2501052','3204075468','RIFKI ADI PUTRA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(73,'2501053','3192901984','Nayyara Ayska Almahyra','2026-09-22 22:02:16','2026-09-22 22:02:16'),(74,'2501054','3191759049','KHALISA NUR MAULIDA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(75,'2501055','3190105149','KEYRA AZZURA VIOLYTA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(76,'2501056','3209137974','Ayesha Azka Azizah','2026-09-22 22:02:16','2026-09-22 22:02:16'),(77,'2501057','3200152080','Elshanum Dhiya Sabhira','2026-09-22 22:02:16','2026-09-22 22:02:16'),(78,'2501058','3192795320','NADIA NUR AMIRAH','2026-09-22 22:02:16','2026-09-22 22:02:16'),(79,'2501059','3204180580','ALIF AL FATHIR AL HAQ','2026-09-22 22:02:16','2026-09-22 22:02:16'),(80,'2501060','3196629060','ALMEERA AZZAHRA ALFATHUNNISA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(81,'2501061','3199947060','M. Shaqeel Uwais Al Qorny','2026-09-22 22:02:16','2026-09-22 22:02:16'),(82,'2501062','3197475850','M Farid Atallah','2026-09-22 22:02:16','2026-09-22 22:02:16'),(83,'2501063','3199907162','ALFATIH YUSUF ANGGARA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(84,'2501064','3195089698','GANINDRA ADELARD MARKOS','2026-09-22 22:02:16','2026-09-22 22:02:16'),(85,'2501065','3196130831','RAFFASYA ATHAFARIZ SYAKEIL','2026-09-22 22:02:16','2026-09-22 22:02:16'),(86,'2501066','3191781091','Ahmad Kamil Musyaffa','2026-09-22 22:02:16','2026-09-22 22:02:16'),(87,'2501067','3205647233','Muhammad Mufassir Al Quran','2026-09-22 22:02:16','2026-09-22 22:02:16'),(88,'2501068','3196249737','GUNTUR SEPTIAN AKBAR','2026-09-22 22:02:16','2026-09-22 22:02:16'),(89,'2501069','3199341829','ELFATHAN ALTEZZA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(90,'2501070','3193674105','MUHAMMAD LATIEF AL BARRA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(91,'2501071','3191202322','KANZA AZMIATUL FADZLAH','2026-09-22 22:02:16','2026-09-22 22:02:16'),(92,'2501072','3204236463','BILAL AZKANDRA HERMAWAN','2026-09-22 22:02:16','2026-09-22 22:02:16'),(93,'2501073','3190365734','MUHAMMAD ARKHAN AL FATIH','2026-09-22 22:02:16','2026-09-22 22:02:16'),(94,'2501074','3194698360','MUHAMMAD DENIANSYAH SAPUTRA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(95,'2501075',NULL,'PUTRA SATRIA WIRAUTAMA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(96,'2501076',NULL,'DHEA ASYIFA NURZAKYATUNISA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(97,'2501077',NULL,'M. FAWAZ SHABIR FIRDAUS','2026-09-22 22:02:16','2026-09-22 22:02:16'),(98,'2501078','3197030917','MUHAMMAD FATIH ARRASYID','2026-09-22 22:02:16','2026-09-22 22:02:16'),(99,'2501079',NULL,'SENJA KIRANA KHOIRUNNISA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(100,'2501080',NULL,'AURELINO OKTARA SANJAYA PUTRA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(101,'2501081',NULL,'ABID ZAKI MARWAN','2026-09-22 22:02:16','2026-09-22 22:02:16'),(102,'2501082',NULL,'MUHAMAD ZIA ABQORI','2026-09-22 22:02:16','2026-09-22 22:02:16'),(103,'2501083',NULL,'SYAUQI SINAN HAFIZHAN','2026-09-22 22:02:16','2026-09-22 22:02:16'),(104,'2501084','3199228136','ZIVANI KHANZA SEVAN','2026-09-22 22:02:16','2026-09-22 22:02:16'),(105,'2501085','3195505894','MUHAMAD ARKAN PAMUNGKAS','2026-09-22 22:02:16','2026-09-22 22:02:16'),(106,'2501086','3190483311','MULKAH NABILA NURSYIFA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(107,'2501087','3190225127','ALIFA NAHDA AZ ZAHRA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(108,'2501088','3194936665','NAUFAL HANIF AL FATIH','2026-09-22 22:02:16','2026-09-22 22:02:16'),(109,'2501089','3192336278','MUHAMMAD SHEENAN ZIAMAQIEL','2026-09-22 22:02:16','2026-09-22 22:02:16'),(110,'2501090','3202289602','ZAIN NURI RATNA FATIMAH','2026-09-22 22:02:16','2026-09-22 22:02:16'),(111,'2501091','3195762818','KHALISA AMILA SHALIHA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(112,'2501092','3209810083','KIANDRA ZIO ALZETHA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(113,'2501093','3192489310','HAIDAR YUDHA AIRLANGGA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(114,'2501094','3190908444','HUMAIRA GRIZELLE AZKADINA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(115,'2501095','3194872620','KEENAN DEAN ARRIZKY','2026-09-22 22:02:16','2026-09-22 22:02:16'),(116,'2501096','3191680283','PANJI HILMI KHOIRUDDIN','2026-09-22 22:02:16','2026-09-22 22:02:16'),(117,'2501097','3190397521','ADZKIA GHINA KHAIRUNNISA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(118,'2501098','3206953377','JASMINE CASTARICA ZEA HASMY','2026-09-22 22:02:16','2026-09-22 22:02:16'),(119,'2501099','3209038479','Reyhan Alfarizqi','2026-09-22 22:02:16','2026-09-22 22:02:16'),(120,'2501100','3194629304','Muhammad Rifki Abdus Solihin','2026-09-22 22:02:16','2026-09-22 22:02:16'),(121,'2501101','3180532897','RAZKA MUHAMMAD FATHURRAHMAN','2026-09-22 22:02:16','2026-09-22 22:02:16'),(122,'2501102','3198599297','KHAYRA NAUREEN MARLIANTI','2026-09-22 22:02:16','2026-09-22 22:02:16'),(123,'2501103','3206804138','MUHAMMAD EMIRHAN ALFATIH','2026-09-22 22:02:16','2026-09-22 22:02:16'),(124,'2501104','3192463604','Rahmah Hanin Aqila','2026-09-22 22:02:16','2026-09-22 22:02:16'),(125,'2501105','3199274062','AZRIL AL HAFIZH HERIYADI','2026-09-22 22:02:16','2026-09-22 22:02:16'),(126,'2501106','3193202418','Syahira Fitri Qirani','2026-09-22 22:02:16','2026-09-22 22:02:16'),(127,'2501107','3196955089','GHIFARRY ADHITAMA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(128,'2501108','3196841387','Jihan Muthmainnah','2026-09-22 22:02:16','2026-09-22 22:02:16'),(129,'2501109','3192585562','SYAIDAH NUR ASYIFA','2026-09-22 22:02:16','2026-09-22 22:02:16'),(130,'2501110','3190406521','CLARISSA SHERYL AULIA PUTRI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(131,'2402001','3192091262','RAFIF AFKARI KHELIANTO','2026-09-22 22:02:17','2026-09-22 22:02:17'),(132,'2402002','3188534199','OMAR ALXAIN BUDIMAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(133,'2402003','3187819864','TIARA AISYAH RANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(134,'2402004','3183116499','ASHALINA ZAHRANY SAPUTRI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(135,'2402005','3196197011','MUHAMMAD ARFAN MAULANA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(136,'2402006','3183893356','AMEENA ZAHRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(137,'2402007','3197867376','NUHA NASYITA SHAFWATUNNISA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(138,'2402008','3189622781','HALIFA SAFA AISYAH HADIWANTO','2026-09-22 22:02:17','2026-09-22 22:02:17'),(139,'2402009','3198483291','ABIL DAFFA MUWAFFAQ','2026-09-22 22:02:17','2026-09-22 22:02:17'),(140,'2402010','3186944705','QEISYA CITRA LESTARI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(141,'2402011','3186390002','RAFANIA AULIA KAMAYEL','2026-09-22 22:02:17','2026-09-22 22:02:17'),(142,'2402012','3185694861','YASHBI SALAMA MARZIA FAKHIROH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(143,'2402013','3188698880','AROFAH ALZAHRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(144,'2402014','3193519631','RAINA DEWI JELITA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(145,'2402015','3184475138','ZAYN ATHAR ABZARI SIDIK','2026-09-22 22:02:17','2026-09-22 22:02:17'),(146,'2402016','3193068549','RAFARDHAN ATHALLA NURROHMAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(147,'2402017','3181213471','SYAFINA QOTRUNNADA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(148,'2402018','3189435513','ZHAFIRA MILLA RAFANI KARTOLO','2026-09-22 22:02:17','2026-09-22 22:02:17'),(149,'2402019','3183084134','KYNARA NEVA GALISHA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(150,'2402020','3181445116','AZKAYRA FATHIYATURAHMA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(151,'2402021','3187137426','VANESSA CHESSY','2026-09-22 22:02:17','2026-09-22 22:02:17'),(152,'2402022','3199245346','NADIRA AYU SALZABILLA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(153,'2402023','3188386219','NAFISHA RAZITA RIZKIANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(154,'2402024','3181602913','MUHAMMAD DAFFA ALFARIZI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(155,'2402025','3189691226','GHAITSAA FATHIYYATURAHMA RAINDRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(156,'2402026','3189569559','MOHAMMAD DEVAN AL JABBAR','2026-09-22 22:02:17','2026-09-22 22:02:17'),(157,'2402027','3180591555','ALUNA NIRMALA AYUSITA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(158,'2402028','3184840158','AMANAH RASA KHODIMA ROBBA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(159,'2402029','3188840664','HANA ALZHEA NURSYIFA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(160,'2402030','3194361464','ALI ALFAREZEL DANIYAL BAHRI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(161,'2402031','3197806097','ARFADHIA RAFISQY MALIK','2026-09-22 22:02:17','2026-09-22 22:02:17'),(162,'2402032','3186758764','ADZKIYA KAMILA WANDANA PUTRI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(163,'2402033','3187235433','MUHAMMAD ILHAM','2026-09-22 22:02:17','2026-09-22 22:02:17'),(164,'2402034','3193774889','NAYYARA ELSHANUM MAZAYA GIRI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(165,'2402035','3182692268','AYSHA NAILA MUHTAR','2026-09-22 22:02:17','2026-09-22 22:02:17'),(166,'2402036','3194048012','RABBANI ABYAN MUSTHAFA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(167,'2402037','3180896112','ARSAN AL AKBAR','2026-09-22 22:02:17','2026-09-22 22:02:17'),(168,'2402038','3189693297','KAHLA ANISA TSABITA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(169,'2402039','3197461545','MUHAMAD YUSUF HAMDANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(170,'2402040','3181126675','FARAH SITI AYUNDA YASMIN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(171,'2402041','3199715165','ARINDRA QONITA HENDRAWAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(172,'2402042','3180436044','SHAQUEENA ARETHA IYOBA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(173,'2402043','3187337525','MUHAMMAD SYABIL PRATAMA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(174,'2402044','3189029577','YUMNAA ZAQIRA ANJANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(175,'2402045','3195738082','AJENG RISKA PEBIYANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(176,'2402046','3197940352','HUMAIRA ASHEEQA INARA PUTRI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(177,'2402047','3198484286','MUHAMMAD FAQIH HASANUDIN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(178,'2402048','3181805449','NADIA DAFIRA TRESNA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(179,'2402049','3183948350','NAISYA FITRI YASIRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(180,'2402050','3193067819','ARSYILA SHANUM MEIDINA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(181,'2402051','3186008020','ADRIKNI RATU CLARADHIA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(182,'2402052','3191856264','ALENA SHABIRA RAMADHANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(183,'2402053','3193933618','ANNISA NUR HAFIDZAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(184,'2402054','3186295220','SHOFI NAURA DZAKIYAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(185,'2402055','3195819571','FELISHA RAFANIA BUDIMAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(186,'2402056','3180775861','RAFKA ARYAPUTRA PRATAMA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(187,'2402057','3187881575','GHAITSA ZAHIRA SHOFA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(188,'2402058','3196164195','LATISHA SHAFALUNA NUGRAHA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(189,'2402059','3188384868','AKIO ALTHAF RAFISQY','2026-09-22 22:02:17','2026-09-22 22:02:17'),(190,'2402060','3192387219','LOVA IBTISAM RANIAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(191,'2402061','3188227899','SITI HILYATUSSADIYAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(192,'2402062','3183753272','RAFIF FAEYZA HANDHONO','2026-09-22 22:02:17','2026-09-22 22:02:17'),(193,'2402063','3188223454','ATTHAR ABQORI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(194,'2402064','3186636590','HAFSHAH HANANIA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(195,'2402065','3185387174','ALESHA MUTIARA ZAHIRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(196,'2402066','3197189726','FAIZAR HAFIZ KURNIAWAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(197,'2402067','3188328600','NOVITA NUR HANDAYANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(198,'2402068','3199965776','MIKAILA HASNA WAHYUDI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(199,'2402069','3191136208','AGATHA DYLHA PUTRI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(200,'2402070','3193003894','KHANZA AZKADINA AZZAHRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(201,'2402071','3180174344','NABILA AZKAYRA HASMY','2026-09-22 22:02:17','2026-09-22 22:02:17'),(202,'2402072','3182492658','AYYASH MUHAMMAD HASSAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(203,'2402073','3192273137','MUHAMMAD ARFAN JUNIARKA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(204,'2402074','3180511644','JHIOSIN MEGAMI NUGRAHA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(205,'2402075','3187781783','MUHAMMAD AZAM PUTRA SYARROFA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(206,'2402076','3182951182','RIFAN MAULANA ARIANTO','2026-09-22 22:02:17','2026-09-22 22:02:17'),(207,'2303001','3185144014','MUHAMMAD NAZBI AL FARIZI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(208,'2303002','3171807739','MUHAMAD HAFIZH AL PAJRI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(209,'2303003','3186943244','QIANZI ADEEVA PUTRI FADILLAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(210,'2303004','3174827643','DEFINA APRIANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(211,'2303005','3176872065','YAFI ALIFUDDIN AFWU','2026-09-22 22:02:17','2026-09-22 22:02:17'),(212,'2303006','3174647367','INARA KHAMANIA ALFIYAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(213,'2303007','3172766902','SHAKIRA SYIFA AULIYA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(214,'2303008','3183076534','AZLAN FAHREZA RAHMAN AL HAFIZ','2026-09-22 22:02:17','2026-09-22 22:02:17'),(215,'2303009','3171345375','HAMIZAN MANAF RAYYAN KURNIAWAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(216,'2303010','3171011863','ABIMANYU ANGKA WIJAYA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(217,'2303011','3186795082','MUHAMMAD ZAYD ASADULLAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(218,'2303012','3181757638','NANDRA GIANLUCA AZZAMY','2026-09-22 22:02:17','2026-09-22 22:02:17'),(219,'2303013','3171972091','GENNA BENADEIR ALMUTAIRI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(220,'2303014','3175060869','MUHAMMAD LATAMA ADIA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(221,'2303015','3182874895','ALENDRA KEVIN SUNANDAR','2026-09-22 22:02:17','2026-09-22 22:02:17'),(222,'2303016','3189415769','MALIKA RIHADATUL AISY','2026-09-22 22:02:17','2026-09-22 22:02:17'),(223,'2303017','3177955851','WAFA ADZKIYA SOBANA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(224,'2303018','3179889324','HIZAM PUTERA ANUGRAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(225,'2303019','3179880890','FELISHA KHANSA RAFANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(226,'2303020','3173378054','SALWAA ALIIFAH WINDIANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(227,'2303021','3171682241','MALIK HAKIM ALHABI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(228,'2303022','3188866226','ALFARIZA RAFARDHAN ATHALLA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(229,'2303023','3177060748','ZANKHA ALENDRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(230,'2303024','3179046172','MUHAMMAD RIZIEQ AR RAYYAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(231,'2303025','3172727410','MYSHA JEHAN ARASELY','2026-09-22 22:02:17','2026-09-22 22:02:17'),(232,'2303026','3170387315','FARIZA PUTRI ASWADI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(233,'2303027','3173418570','AFIF MUHAMMAD TARIM','2026-09-22 22:02:17','2026-09-22 22:02:17'),(234,'2303028','3172460395','ARSHAD TAUFIK MUGHNIANA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(235,'2303029','3178929688','ILHAM ZAYN ATHARRAYHAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(236,'2303030','3189060186','SRI NUR SAKILA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(237,'2303031','3174768092','AISHA YAQINA SHANUM','2026-09-22 22:02:17','2026-09-22 22:02:17'),(238,'2303032','3175879584','HAIDAR FATIH MUHAMMAD','2026-09-22 22:02:17','2026-09-22 22:02:17'),(239,'2303033','3178693538','NADA FITRIYA RAMADHANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(240,'2303034','3177809078','FEBRI ARFAN HASHIF','2026-09-22 22:02:17','2026-09-22 22:02:17'),(241,'2303035','3176655031','MALIQ FELIYAN ABRISAM','2026-09-22 22:02:17','2026-09-22 22:02:17'),(242,'2303036','3186913592','KAISYHA PUTRI RAMADHANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(243,'2303037','3173140945','NAYLA AGHISNA IBNATY SAKHI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(244,'2303038','3182527039','MUHAMMAD NAUFAL RIZKI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(245,'2303039','3172793258','ADHAM WASIM','2026-09-22 22:02:17','2026-09-22 22:02:17'),(246,'2303040','3174166525','ABIZAR FAUNDRA ALGHIFARI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(247,'2303041','3170110116','NAYYARA KHANZA RAMADANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(248,'2303042','3172820516','RAISYA AMANDA PUTRI RAMADANSYAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(249,'2303043','3179479944','FATHIYYAH YUMNA SHIDQI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(250,'2303044','3184432834','MUHAMMAD IHSAN SYAMIL RAMDANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(251,'2303045','3183304182','MUHAMMAD HANIF AISY','2026-09-22 22:02:17','2026-09-22 22:02:17'),(252,'2303046','3186349425','ALMEERA ALEESHA AHZA INARA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(253,'2303047','3172622405','NAIFA ZIA ALMAHYRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(254,'2303048','3172756113','MUHAMMAD SYABILL AKBARIEQ','2026-09-22 22:02:17','2026-09-22 22:02:17'),(255,'2303049','3182695988','FANY AZHAR AZIZA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(256,'2303050','3179385212','CALYA ISMA RAFFANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(257,'2303051','3175927594','PUTRI ASYHA DHIANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(258,'2303052','3172747218','MUHAMMAD ZAYN HAMZAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(259,'2303053','3179430606','MUHAMMAD AHSAN AL HASANIE','2026-09-22 22:02:17','2026-09-22 22:02:17'),(260,'2303054','3185580046','MUHAMMAD ZAID KURNIA ZIAULHAQ','2026-09-22 22:02:17','2026-09-22 22:02:17'),(261,'2303055','3175731450','RUZAIN ZOLA FIRDAUS','2026-09-22 22:02:17','2026-09-22 22:02:17'),(262,'2303056','3180881914','MUHAMMAD FATHAN ZAKARIA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(263,'2303057','3172687909','AMELIA ZIA SAIDAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(264,'2303058','3179574700','ALGHANY FAQIHUL MALIK','2026-09-22 22:02:17','2026-09-22 22:02:17'),(265,'2303059','3184872643','AISYAH JENNAIRA SIDIQ','2026-09-22 22:02:17','2026-09-22 22:02:17'),(266,'2303060','3175369710','GANES ALDIFA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(267,'2303061','3174073554','ALVINO KEENAN JUNIARTA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(268,'2303062','3179886191','ASYIFA NUR FITRIA LESMANA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(269,'2303063','3176127466','RANFI MUHAMMAD AL FATIH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(270,'2303064','3171110099','KEYSHA NURUL AZHAR','2026-09-22 22:02:17','2026-09-22 22:02:17'),(271,'2303065','3183627014','AZKA RAFA RABBANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(272,'2303066','3176995717','ABDULLAH KHOIRUL AZZAM','2026-09-22 22:02:17','2026-09-22 22:02:17'),(273,'2303067','3172063359','MUHAMMAD ARFADHIA MALIK IBRAHIM','2026-09-22 22:02:17','2026-09-22 22:02:17'),(274,'2303068','3180124865','YUSUF AL HOERUDIN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(275,'2303069','3188000561','NIDA AYU RAMADHANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(276,'2303070','3180347075','ANDRE HANAN ADYATAMA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(277,'2303071','3175724545','AZRINA LAVENIA QOTRUNNADA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(278,'2303072','3180233461','FAHRA HUMAIRA AQMARINA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(279,'2303073','3171977051','ADRIAN PRADIPTA AMZARI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(280,'2303074','3170143922','MUHAMMAD NAUFAL JAMIL','2026-09-22 22:02:17','2026-09-22 22:02:17'),(281,'2303075','3171413624','ALENA ZEA ALMAIRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(282,'2303076','3179304431','AZZAM KHALIF ANANDA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(283,'2303077','3172015183','MUHAMMAD SONJAYA AL BANTANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(284,'2303078','3172598460','MUHAMMAD ZALFA AL MUTTAQIN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(285,'2303079','3173567464','ALESHA KHALILUNA NASREEN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(286,'2303080','3173635312','NAFISAH DWI SYIFA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(287,'2303081','3165752480','ALFIAN NIZAM ABQARI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(288,'2303082','3187479934','ILHAM BAGUS SUGIARTO','2026-09-22 22:02:17','2026-09-22 22:02:17'),(289,'2303083','3171334571','WENI ZAHIRAH FADHILAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(290,'2303084','3175650781','CYNTIARA ALFATHUNNISA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(291,'2303085','3173635327','REYNAND MALIK ATHARIANDI DAUD','2026-09-22 22:02:17','2026-09-22 22:02:17'),(292,'2303086','3186941263','AYANA SIMRA SAUQIA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(293,'2303087','3181365948','MUHAMMAD AFNAN ALGHOZALI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(294,'2303088','3174768087','DZAKI ALMERZADA ALYKHANSA SOFYAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(295,'2303089','3172489599','MUHAMAD SAHALUDIN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(296,'2303090','3189332320','LAVINA EMBUN HAFIZHAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(297,'2303091','3172425114','ELEANOR SCARLET NATANIA MANONGKO','2026-09-22 22:02:17','2026-09-22 22:02:17'),(298,'2303092','3189292446','KEISHA ANINDYA PUTRY ARDANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(299,'2303093','3177812001','ARJUNA GANEENDRA NUSANTARA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(300,'2303094','3189130720','RAFISQY AIMAR AL RASYID','2026-09-22 22:02:17','2026-09-22 22:02:17'),(301,'2303095','3176474718','PUTRI RIFANA RINDIANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(302,'2303096','3171729544','MOHAMMAD ARGA PRATAMA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(303,'2303097','3178359655','AL BARA BIN MALIK ABDULLAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(304,'2303098','3175420620','NAZZA VIQA ROMAHESA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(305,'2303099','3170116520','KHAIRA HAZEL PITALOKA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(306,'2303100','3182744038','M ABDUL QODIR AS-SHIDDIQ','2026-09-22 22:02:17','2026-09-22 22:02:17'),(307,'2303101','3176615786','NIZAAR RUSMAWAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(308,'2303102','3177487562','SYAIKHAN JUMHUR ULUM','2026-09-22 22:02:17','2026-09-22 22:02:17'),(309,'2303103','3178827996','ARSY SINARA KAULA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(310,'2303104','3177054920','NOVAL ARDIANSYAH WANDANA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(311,'2303105','3179979816','GHAIDA NAJLA MASYURAH RIZKI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(312,'2204001','3168007557','MUTIARA RAMADANI NUR ALIPAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(313,'2204002','3162004817','MUHAMMAD DEXSA GUMILAR','2026-09-22 22:02:17','2026-09-22 22:02:17'),(314,'2204003','3171832909','AQILLA ZIDNA ILMA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(315,'2204004','3171878474','ALLURA SEVANIA PANGESTU','2026-09-22 22:02:17','2026-09-22 22:02:17'),(316,'2204005','3177277453','ARSILA MUFIA NATHANIA PUTRI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(317,'2204006','3162424589','QUDWAH NAILUL FADLILAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(318,'2204007','3161592351','ALVINO ZAFRAN MUKHLIS PUTRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(319,'2204008','3162964145','MUHAMMAD ILHAM NURAHMAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(320,'2204009','3166919170','AZKIA SYIFA KHOERUNISA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(321,'2204010','3161422120','MUHAMMAD DZIKRI HAMDILLAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(322,'2204011','3160904572','FAWWAZ MAULANA AGNI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(323,'2204012','3166617040','MUHAMMAD YAZDANIAR ASSIROJI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(324,'2204013','3178916554','HAISHA NUR LATIFAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(325,'2204014','3165167991','MUHAMAD ADZKA ALKHAFARIZI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(326,'2204015','3168342815','DEDE SOFIYAN SOLEHUDIN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(327,'2204016','3167350483','NAUFAL RIFQI HAMIZAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(328,'2204017','3177794363','JIHAN PUTRI YUWONO','2026-09-22 22:02:17','2026-09-22 22:02:17'),(329,'2204018','3172960600','MUYASSARO','2026-09-22 22:02:17','2026-09-22 22:02:17'),(330,'2204019','3168245281','NADHIFAH SALSABILA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(331,'2204020','3176056712','ADREENA RUMAISHA ARDIANTI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(332,'2204021','3166526409','MOCH RAFIKI FAJAR PRATAMA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(333,'2204022','3173035480','RASHAFA IRSYAD PERMANA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(334,'2204023','3167761688','ANNASYA ADREENA SAILA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(335,'2204024','3166982475','MUHAMMAD AZAM AKBAR','2026-09-22 22:02:17','2026-09-22 22:02:17'),(336,'2204025','3166380785','MUHAMAD EL ARSYAD RAMADANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(337,'2204026','3165673427','KANZIA ANNASYA SHAZFA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(338,'2204027','3161286939','AGHNIYA HAUNA SOFYAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(339,'2204028','3164869307','MUHAMMAD TUBAGUS FAZA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(340,'2204029','3175686538','MUHAMMAD ZAIN ABDUL AZIZ','2026-09-22 22:02:17','2026-09-22 22:02:17'),(341,'2204030','3161904200','RAFFASYA SAKHA RAJENDRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(342,'2204031','3160638967','MAZAYA NAZIA AKMAL','2026-09-22 22:02:17','2026-09-22 22:02:17'),(343,'2204032','3178461691','AZMYA AZKADINA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(344,'2204033','3160941027','MUHAMMAD FAHRI SYAHPUTRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(345,'2204034','3178260525','KEIZHA MAILIANI PUTRI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(346,'2204035','3161734592','SUCI HERLINA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(347,'2204036','3173717937','MUHAMMAD SAEBAN ALI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(348,'2204037','3167214833','MUHAMAD RASYID SYAZANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(349,'2204038','3175981132','RICHI KAILI MUHAMMAD','2026-09-22 22:02:17','2026-09-22 22:02:17'),(350,'2204039','3166063344','RAFFI FADILLAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(351,'2204040','3169003972','RAJENDRA ARSENIO FADHIL','2026-09-22 22:02:17','2026-09-22 22:02:17'),(352,'2204041','3169296254','RAJA GHANI AL ZAYYAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(353,'2204042','3167688480','KYLA SABIA ARAFIAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(354,'2204043','3175912581','ALANA KAHILA RAY FIRMANSYAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(355,'2204044','3167869394','KINANTI SYAUQI HUNNA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(356,'2204045','3172468693','RANIA HILYAH NAFISAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(357,'2204046','3163897163','BIRU PRATAMA SABIAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(358,'2204047','3164485311','ANISA PUTRI NUR ADELIA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(359,'2204048','3174972030','MUHAMMAD ZAIN ARSYIL ZAIDAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(360,'2204049','3162841473','YUDHA FATHAN MUHAMMAD RIDWAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(361,'2204050','3170324609','ALIFA AZKADINA SIMANJUNTAK','2026-09-22 22:02:17','2026-09-22 22:02:17'),(362,'2204051','3162765261','BERLIAN RATU ALZAHIRRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(363,'2204052','3169616736','NAYRA MYESHA ENDISAPUTRI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(364,'2204053','3163948385','MIZANNUL KHOIRI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(365,'2204054','3168434443','FAREZA MUHAMMAD ZHAFRAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(366,'2204055','3169417337','MALIHA DHIYA NUGRAHA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(367,'2204056','3163881935','FAYZA ALYA AZIZA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(368,'2204057','3175352303','MUHAMMAD RIZAL MARTADINATA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(369,'2204058','3172210773','ALYA AZIZAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(370,'2204059','3166758583','ZAHIRAN TALITA SAKHI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(371,'2204060','3170623173','HANUM QURROTA A\'YUN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(372,'2204061','3163555416','ARKAN ALFATIH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(373,'2204062','3167908315','RAFA DZAKIANDRA AZHAR','2026-09-22 22:02:17','2026-09-22 22:02:17'),(374,'2204063','3162171249','ELZIRA LABIBA NURGANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(375,'2204064','3167797289','DHEA ANANDA IRAWAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(376,'2204065','3172588426','RAFANDRA ATHALLA GUMILAR','2026-09-22 22:02:17','2026-09-22 22:02:17'),(377,'2204066','3165848705','MUHAMMAD KEANU AR SHAKA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(378,'2204067','3168489916','GAFAR ARIFAI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(379,'2204068','3154404202','SHAKILLA RAHMA KURNIA PUTRI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(380,'2204069','3164544990','AFIFA NAHDA RAFANDA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(381,'2204070','3171059941','DZAKIRA TALITA ZAHRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(382,'2204071','0161956024','ZISKIND FAIRUL HAFIDZAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(383,'2204072','3161020833','DEVANO JULIAN ABRAR','2026-09-22 22:02:17','2026-09-22 22:02:17'),(384,'2204073','3165998873','MUHAMAD RIVALDI NURDIANSAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(385,'2204074','3178604230','ATIKAH BALQIS HUMAIRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(386,'2204075','3176218187','MOCHAMMAD FACHRI RASDHAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(387,'2204076','3164701932','NAUREEN ADREENA ALFATHUNISSA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(388,'2204077','3179226277','SALSABILA NADHIFA AZZAHRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(389,'2204078','3163192154','AZKA ADHYATSA PRADIPTA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(390,'2204079','3173530892','FATHAN RAFISQY AFKARI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(391,'2204080','3171797098','ADITYA WIGUNA HAMZAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(392,'2204081','3165095120','MOZA RAFANIA AYSHA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(393,'2204082','3163881686','FARREL AHMAD GIBRAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(394,'2204083','3173259338','ARSYAL NAZHIRUL ASROFI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(395,'2204084','3177906792','ZEA ADENIA ATTAYA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(396,'2204085','3179531596','NADA ZIALOVA LUQYANA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(397,'2204086','3167889274','AQEELA BILQIS MAMANGKEY','2026-09-22 22:02:17','2026-09-22 22:02:17'),(398,'2204087','3164384606','ALGIFARI KHOIRUL INSAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(399,'2204088','3167632647','HANIN NUR LATHIFAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(400,'2204089','3154005815','FARIS KHOIRUL GIBRAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(401,'2204090','3160214862','FADHLAN ARKHAN FATURRAHMAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(402,'2204091','3160992166','KHAYLA VARISHA SYAFIQHA PERMANA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(403,'2204092','3164137440','NIA MUFLIHATUS SAADAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(404,'2204093','3164322212','NAUFAL ARGA ADHYASTA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(405,'2204094','3173854680','MUHAMMAD AKMA AL HAZMI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(406,'2204095','3164492354','ARISSA NAFISHA SHAREEN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(407,'2204096','3165231436','YAFI GHANIM MA\'RUF','2026-09-22 22:02:17','2026-09-22 22:02:17'),(408,'2204097','3168737674','RIFQI MUHAMAD SYARIF','2026-09-22 22:02:17','2026-09-22 22:02:17'),(409,'2204098','3162504436','ZAINA RAMADHAN ALFATHUNISA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(410,'2204099','3167572256','NATHANIA AYESHA MUMTAZAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(411,'2204100','3168397692','SHAYLA ATQIYA FADILLAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(412,'2204101','3160563428','NASREEN AZBAH SHOFIYYA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(413,'2204102','3164039982','MUHAMMAD ZAIDAN ALGHIFARI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(414,'2204103','3178125879','AZMI MAULIDA RUBI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(415,'2204104','3176739433','ALFAR REZAL','2026-09-22 22:02:17','2026-09-22 22:02:17'),(416,'2204105','3169939339','MUHAMAD RIYAD JINAN FAYI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(417,'2204106','3178602111','ALLESYA SHAQUEENA ALMAHIRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(418,'2204107','3166103950','ZIDAN ARSENIO RAFIF','2026-09-22 22:02:17','2026-09-22 22:02:17'),(419,'2204108','3170313934','DHEFITA NIZZA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(420,'2204109','3173119596','MASHEL AZHAR ALRESCHA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(421,'2204110','3172345711','ARFAN ALFARIZI WIDADI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(422,'2204111','3166337153','SHEIRA MAULIDA AHMAD','2026-09-22 22:02:17','2026-09-22 22:02:17'),(423,'2204112','3156859470','DIKI MAULANA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(424,'2105001','3161394420','ABDI MUHAMMAD ADZAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(425,'2105002','3158631284','AQIFA DZAKIYA ENDISAPUTRI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(426,'2105003','3152006143','GHINA SYAKIRA NOVIANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(427,'2105004','3166586045','NAVISA NURLIANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(428,'2105005','3158615351','JUNNA NOVANDANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(429,'2105006','3157836399','IBNU ARAZKA FATURRAHMAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(430,'2105007','3156199831','FAIZ NAUFAL RABBANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(431,'2105008','3146681002','M. SHAKEEL PERTALA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(432,'2105009','3158216819','HASNA FAIZA RAHMILAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(433,'2105010','3165170912','REAGAN ATTHARIZ GHAITSAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(434,'2105011','3167067468','ZHAFIRA DZAQUEENA KHAIRANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(435,'2105012','3174417315','NAHDA HAFIDZAH RAMADHINA R','2026-09-22 22:02:17','2026-09-22 22:02:17'),(436,'2105013','3153917415','RAKHA ADITYA RAMADHAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(437,'2105014','3159613314','KENJI ALWAAN NURROHIM','2026-09-22 22:02:17','2026-09-22 22:02:17'),(438,'2105015','3151768301','HASBY NAZRUL ASYROF','2026-09-22 22:02:17','2026-09-22 22:02:17'),(439,'2105016','3152703033','NADYA AZKIA PUTRI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(440,'2105017','3154606979','CLARISA FATHIYYATURAHMA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(441,'2105018','3153940854','HAIDAR AL MAIRI MUHAMAD JAELANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(442,'2105019','3150341029','DANIS ALIF FAUZHAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(443,'2105020','3151019537','ADIBA AZZAHRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(444,'2105021','3169614951','ZALFHA KHAIRRA SOFWHA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(445,'2105022','0159914453','SHAFIRA NUR HASANAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(446,'2105023','3154742191','NAURA SHAKILA HASNA ANNIDA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(447,'2105024','3153490673','BILQIS FA\'IHA RIFDA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(448,'2105025','3150460152','MIKHAILA RAFANDA NUGRAHA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(449,'2105026','3153275660','GAIZKA AKMAL KAELAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(450,'2105027','3163849838','ALIFA NAZMIA MARIA ULFA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(451,'2105028','3150396110','NADINE KHAIRA PUTRI SURYADI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(452,'2105029','3160289172','M FAIZ ABDUL RASYID','2026-09-22 22:02:17','2026-09-22 22:02:17'),(453,'2105030','3151306490','RIZQI LANGIT RAMADHAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(454,'2105031','3168085755','AYASHA LATISHA AQUINA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(455,'2105032','3151877721','NIZAM KHAIRY AL-GHIFARI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(456,'2105033','3150386448','AINAYYA IZZATUNNISA MAULANA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(457,'2105034','3150050462','CANTIKA ANJANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(458,'2105035','3158781449','KANIA LISMA APRIYANTI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(459,'2105036','3154607208','HADI WASLI AKMAL','2026-09-22 22:02:17','2026-09-22 22:02:17'),(460,'2105037','3160525564','FAWWAZA AGNIA KHOERUNNISWA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(461,'2105038','3157922525','MUHAMMAD DAFFA SUPRIADI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(462,'2105039','3160984598','ALTAN IRFANI AZIZ','2026-09-22 22:02:17','2026-09-22 22:02:17'),(463,'2105040','3155714678','HABIBI MIKAIL AL GHANI GUNARAHARJA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(464,'2105041','3152213910','HAFSA ALIQA KHUMAIRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(465,'2105042','3168625544','PUTRI MIKEYLA SETIAWAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(466,'2105043','3156740298','ZAHIRA SHAFA ASSYABIYA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(467,'2105044','3154828249','SAYYID AHMAD YUSUF FARHAAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(468,'2105045','3154266456','ANINDYA NUR FAUZIAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(469,'2105046','3160877530','GHANIA RAZKA ZEINA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(470,'2105047','3160525312','MUHAMMAD ADNAN AL HAFIDZ','2026-09-22 22:02:17','2026-09-22 22:02:17'),(471,'2105048','3163592144','KENZIE ARSYANA SYIFA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(472,'2105049','3166710952','ALEA ZAINA NUR MEDINA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(473,'2105050','3164495487','AINNAYA FATHIYYA TURAHMA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(474,'2105051','3166856807','NAUFAL ADHYASTHA ARYASATYA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(475,'2105052','3155530611','MUHAMMAD RAFA RASENDRYA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(476,'2105053','3161301192','REIKHANZA DEANISHSYAM','2026-09-22 22:02:17','2026-09-22 22:02:17'),(477,'2105054','3169077664','KHOIRUNNISSA NUR SOPIAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(478,'2105055','0151772543','GEULISHA NUR WULAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(479,'2105056','3153089323','NISA NUR KAMILAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(480,'2105057','3159124594','ARUSHI SAFIYA RAMADITHA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(481,'2105058','3159538846','MUHAMMAD RASYA ARIF ATHAYA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(482,'2105059','3158395806','MUHAMMAD ZIYYAD ALQORNI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(483,'2105060','3146323150','ATHIFAH YASMIN BAHRI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(484,'2105061','3152500586','MUHAMMAD ABYAN NABIL WIBOWO','2026-09-22 22:02:17','2026-09-22 22:02:17'),(485,'2105062','3150053094','ALESHA CORDELIA RAFANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(486,'2105063','3158659951','CALLISTA PUTRI AZZAHRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(487,'2105064','3152823891','MIRZA PRADANA HERYADI PUTRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(488,'2105065','3165851837','ALEXSHIO PUTRA PRATOMO','2026-09-22 22:02:17','2026-09-22 22:02:17'),(489,'2105066','3169905482','NAFEEZA NUR SYAKIRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(490,'2105067','3151356255','REGIANA SYABILLA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(491,'2105068','3155961554','ALULA HANUN AYUNNINDYA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(492,'2105069','3151271987','ALMAIRA QISYA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(493,'2105070','3158938292','MUHAMMAD ARSYAD ALFATIH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(494,'2105071','3151895737','DAFNI APRILYA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(495,'2105072','3152615250','MUHAMAD RYUKI FIRMANSYAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(496,'2105073','3156431933','GIANT ADITYA ARDANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(497,'2105074','3158914693','ZAMZAM ALINURDIN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(498,'2105075','3164164206','LEMBAYUNG SENJA INDAH RIYANA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(499,'2105076','3158925329','NAFISAH PUTRI SOLEH HASANAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(500,'2105077','3151324439','KHIRANI PUTRI MARYAM','2026-09-22 22:02:17','2026-09-22 22:02:17'),(501,'2105078','3150804027','MUHAMMAD NAFISUL ISLAM','2026-09-22 22:02:17','2026-09-22 22:02:17'),(502,'2105079','3159534042','AINUN SYALWA KUSWANTORO','2026-09-22 22:02:17','2026-09-22 22:02:17'),(503,'2105080','0153535229','NAYLA MUAZARA ULFA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(504,'2105081','0156836726','ADITYA NAUFAL DARY ABIYYU','2026-09-22 22:02:17','2026-09-22 22:02:17'),(505,'2105082','3159545404','MUHAMMAD IKHSAN RAMDHANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(506,'2105083','3166068974','MUHAMMAD FAUZI NURZAMAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(507,'2105084','3169775984','MIKHAYLA BEYZA KIANDRA AKBAR','2026-09-22 22:02:17','2026-09-22 22:02:17'),(508,'2105085','3152006096','QUTHBIE HADZIQ EL SAKHI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(509,'2105086','3157224646','SHOFWAN NURSHOBAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(510,'2105087','0152969124','SABINA NABILIA AL ZAHSY','2026-09-22 22:02:17','2026-09-22 22:02:17'),(511,'2105088','3163258739','SABIYA ANDRIYANA YASMIN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(512,'2105089','3151852118','ADISTIA PUTRI AFRIN NURHASANAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(513,'2105090','3169019904','NIDA KHOIRYAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(514,'2105091','3156418478','AISY TSABITHA AFSHEEN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(515,'2105092','3156884724','SITI ZAHIRA RAMADHANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(516,'2105093','3155241679','FIKRI AISAR ARROZAQ','2026-09-22 22:02:17','2026-09-22 22:02:17'),(517,'2105094','3152294157','AZKA IFTIKHAR HAWARI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(518,'2105095','3160249927','NAISYLA NAZWA DOLONSEDING','2026-09-22 22:02:17','2026-09-22 22:02:17'),(519,'2105096','3160015237','SHAQUEENA MEYZZA HAFLASEA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(520,'2105097','3152733205','MUHAMMAD SATRIA ARDHANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(521,'2105098','3162463904','IQBAL KHOIRUDIN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(522,'2105099','3151432760','NADHIRA RINJANI MAULANA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(523,'2105100','3157805766','FATHAN RIZKY BUDIMAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(524,'2105101','3155598216','HAVIKA YUMNA WIDAYANTI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(525,'2105102','3166738195','DIFA FATIHAH PUTRI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(526,'2105103','3159625878','HAMIZAN RAMADHAN FIRMANSYAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(527,'2105104','3151583040','ZAIDLI MALIK FAUZI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(528,'2105105','3156973791','SALMA HANUM AZIZAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(529,'2105106','3156484225','MUHAMMAD ALRAJ ALGHANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(530,'2105107','3151945549','BERLIAN NADA ZHAFIRAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(531,'2105108','3158522672','SITI MULYAMAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(532,'2105109','3159212674','MUHAMMAD  GHAZY GHALIBIE','2026-09-22 22:02:17','2026-09-22 22:02:17'),(533,'2006001','0141183953','ALIFAH KHAIRUNNISA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(534,'2006002','3153833423','ATQIYA MAULIDA MUTHMAINNAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(535,'2006003','3146132336','ALGIS AL GHIFARY MAULANA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(536,'2006004','3152907711','FATWA ADAM MALIK','2026-09-22 22:02:17','2026-09-22 22:02:17'),(537,'2006005','0147759973','SYAFIK KHAIRY NASYWAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(538,'2006006','0133250720','MUHAMMAD ALWI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(539,'2006007','3146197568','AZKYA MEYDINA SUKMA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(540,'2006008','3149418686','AZIZAH GALUH AL KHANSA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(541,'2006009','3145609020','KESTIARA NURSIDQIYA GUNAWAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(542,'2006010','3144345525','LATISYA EPI AZALIA KARTIWI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(543,'2006011','3148779134','KIARA ANINDYA FAUZIAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(544,'2006012','0142022126','FAQIH AZZAM PRAMUDYA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(545,'2006013','3147481720','KEENAN ARKANA MU\'AFFA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(546,'2006014','3152049420','NABILA HASNA FADILAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(547,'2006015','3150389131','GAZHAN DZAKY AUMAE','2026-09-22 22:02:17','2026-09-22 22:02:17'),(548,'2006016','3148742647','ALFARO HISYAM ATHAYAFI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(549,'2006017','3149644081','AUFABIYYA QIANA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(550,'2006018','0142673297','ALFIRA BELLVANIA AZZALEA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(551,'2006019','0142800281','MUHAMMAD ZAFRAN AL QAWIY','2026-09-22 22:02:17','2026-09-22 22:02:17'),(552,'2006020','3143257991','TSUROYA MUNA MUNIFAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(553,'2006021','3155039433','RANIA FATWAH EPRILIA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(554,'2006022','3145082292','DANESWARA FAYYADHI ZHAFAR','2026-09-22 22:02:17','2026-09-22 22:02:17'),(555,'2006023','3147565727','KHANZA USWATUN HASANAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(556,'2006024','3148743470','AZHAR HUSNA ALIFAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(557,'2006025','3147729965','NUGIE AL FARIDZI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(558,'2006026','3142574126','ALVIAN MIFZAN SIDDIQ','2026-09-22 22:02:17','2026-09-22 22:02:17'),(559,'2006027','3152353573','MUHAMMAD KEVIN ANANDIKA AL FARISI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(560,'2006028','3153791976','UNAISAH SYAKIRA HUSNA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(561,'2006029','0146731502','AULIA AGUSTINI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(562,'2006030','0147622467','ZALDI ALIYUDIN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(563,'2006031','0147761284','AIRA SYAHRAINI WIEDAN PUTRI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(564,'2006032','0149074495','NAUFAL SYAMIL ADZ DZAKI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(565,'2006033','3157982128','NINDY  MIKAYLA SAFA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(566,'2006034','0141942067','RIDWAN NUR ANGGARA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(567,'2006035','3158943568','ASHAFA RUMAISHA DHIBA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(568,'2006036','3140360139','RUMMI NUR RIYANTI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(569,'2006037','3153978916','MUHAMMAD HAMZY SYARIF JAMALY','2026-09-22 22:02:17','2026-09-22 22:02:17'),(570,'2006038','0142106235','MEIKA ARTHA MEVIANA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(571,'2006039','0144992514','WAFA AURA CANTIKA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(572,'2006040','3145282680','HANAFI RASYID THALIB HADIWANTO','2026-09-22 22:02:17','2026-09-22 22:02:17'),(573,'2006041','3149170441','SYAKIRA KHANZA AZZAHRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(574,'2006042','3141205522','RAFIDAN ATHARI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(575,'2006043','0145264434','MUHAMAD NIZZAR KURNIAWAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(576,'2006044','3142052476','RATNA HASANATUL MARYAM','2026-09-22 22:02:17','2026-09-22 22:02:17'),(577,'2006045','3145365358','ABDUL AZIZ','2026-09-22 22:02:17','2026-09-22 22:02:17'),(578,'2006046','3155394688','AZHNIE MAULIDA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(579,'2006047','3146219934','YOHANNA VANIA AZZAHRA DAELI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(580,'2006048','3157354442','MUHAMAD DAFHIN AL FAKHRY','2026-09-22 22:02:17','2026-09-22 22:02:17'),(581,'2006049','3142318643','ADZKIA SAMHA SAUFA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(582,'2006050','3148698100','AULIYA AGUSTIN ZANATI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(583,'2006051','0159806758','PUTRI AUDYNA SARAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(584,'2006052','0145710006','SANY SEFTIYA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(585,'2006053','3157534771','ARSYA ADNAN AL AZZAM','2026-09-22 22:02:17','2026-09-22 22:02:17'),(586,'2006054','3141118197','ADITYA HIDAYAT','2026-09-22 22:02:17','2026-09-22 22:02:17'),(587,'2006055','3140219270','AHMAD HABIBI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(588,'2006056','3140571135','NAJMAH ELVY ANJANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(589,'2006057','0146971434','DAIFA AFNAN AR RAZIQ','2026-09-22 22:02:17','2026-09-22 22:02:17'),(590,'2006058','3142914366','SHELLA AGNI SALMA KHUMAIRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(591,'2006059','0148390219','MUHAMAD SUPYAN ASSAURY','2026-09-22 22:02:17','2026-09-22 22:02:17'),(592,'2006060','3146834066','QIANDRA ZAHRA ANDARI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(593,'2006061','3141416260','MUHAMAD WILDAN ARYATAMA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(594,'2006062','0145115371','SHAKILA QAIREEN KHANSAIRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(595,'2006063','3140407930','KHANSA MECCA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(596,'2006064','0142496879','RAFFA FARHAN PRADIPTA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(597,'2006065','0142758032','MUHAMMAD FHAREL AL REEZQY','2026-09-22 22:02:17','2026-09-22 22:02:17'),(598,'2006066','3144054022','MUHAMMAD RAIHAN SURYAKUSUMA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(599,'2006067','3155683414','ZAHWA NUR AZIZAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(600,'2006068','0147331647','KIANA ALMAIRA AZARINE','2026-09-22 22:02:17','2026-09-22 22:02:17'),(601,'2006069','0146175871','SYAKEELA AZZALEA QAIREEN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(602,'2006070','3140159855','MUHAMMAD SULTHAN NAZHIRUL ASROFI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(603,'2006071','0149129410','MUHAMMAD FAHRIL RAMADHAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(604,'2006072','0142127546','PRANAJA ADELARD MURIZ DZIKRI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(605,'2006073','3140292870','FAHRI ALZAM ARRASYID','2026-09-22 22:02:17','2026-09-22 22:02:17'),(606,'2006074','3159029831','SYAFA DWI CAHYANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(607,'2006075','3141122725','RAIHAN AZKA ARRASYID','2026-09-22 22:02:17','2026-09-22 22:02:17'),(608,'2006076','0141833736','SHAFIRA SALSABILLA SYAKILA SHALEHAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(609,'2006077','0146081112','SABRINA SAKHI RAMADHANI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(610,'2006078','3148154434','ZAIN ZIDAN IBRAHIM','2026-09-22 22:02:17','2026-09-22 22:02:17'),(611,'2006079','3152536267','SYAFIQ KAFI HARISUL HAQ','2026-09-22 22:02:17','2026-09-22 22:02:17'),(612,'2006080','3158589747','VIKRI MAULANA ARIANTO','2026-09-22 22:02:17','2026-09-22 22:02:17'),(613,'2006081','0142563613','SIENNA ADZKIA QUEENAIRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(614,'2006082','3155874575','AMIRA NADHMI ADDIN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(615,'2006083','3154831247','ALYA RAFA RAMDAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(616,'2006084','3144392179','KHAIRAATUN HISAAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(617,'2006085','3144768523','M FIQRI HAMIZAN ALI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(618,'2006086','3148000233','MUHAMMAD ZUL FAZZAR','2026-09-22 22:02:17','2026-09-22 22:02:17'),(619,'2006087','0146644492','AHMAD HANAFIAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(620,'2006088','3151365276','MAHIRA DELISHA NUGRAHA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(621,'2006089','3145068145','MUHAMMAD LUTHFI SAPUTRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(622,'2006090','3152809878','MEYSHA AMANDA RATU SAKIRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(623,'2006091','0146995513','GHAISAN AHMAD ATHARIZZ','2026-09-22 22:02:17','2026-09-22 22:02:17'),(624,'2006092','3144808503','SARAH AZNIA NOVIYANTI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(625,'2006093','0144226044','AYVA NURKAMILA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(626,'2006094','3145893610','MUHAMMAD REIHAN ARDIANSYAH RAMADHAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(627,'2006095','3151605205','RAFIQI JAMIL HAMLAN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(628,'2006096','0146386185','ZHAFIR TRYSTAN MUDZAKIR','2026-09-22 22:02:17','2026-09-22 22:02:17'),(629,'2006097','3146057857','MUHAMAD KHAERUL ABADI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(630,'2006098','3140840776','SHAKIRA PUTRI NUGRAHA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(631,'2006099','3148482964','ARYA MUHAMMAD ZAHRONI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(632,'2006100','3141826901','ELGYA HENDRIK PUTRA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(633,'2006101','3145947174','MUHAMMAD REZKY ADITYA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(634,'2006102','3150190211','ZAINA ALMAHYRA KARTOLO PUTRI','2026-09-22 22:02:17','2026-09-22 22:02:17'),(635,'2006103','3147204736','RAFFA MUHAMMAD ABDILLAH','2026-09-22 22:02:17','2026-09-22 22:02:17'),(636,'2006104','3145638978','FAIDHAN IRHAB NABIL','2026-09-22 22:02:17','2026-09-22 22:02:17'),(637,'2006105','3149078333','AQILLA MAURA NAJWA','2026-09-22 22:02:17','2026-09-22 22:02:17'),(638,'2006106','0154247265','MUHAMMAD HANIF ALMUNDZIR','2026-09-22 22:02:17','2026-09-22 22:02:17'),(639,'2006107','3151457095','AKIFA NAILA FALAHUDIN','2026-09-22 22:02:17','2026-09-22 22:02:17'),(640,'2006108','3141211286','MUTIARA ALMIRA SALSABILA','2026-09-22 22:02:17','2026-09-22 22:02:17');
/*!40000 ALTER TABLE `tbl_siswa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_siswa_kelas`
--

DROP TABLE IF EXISTS `tbl_siswa_kelas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_siswa_kelas` (
  `idsiswakelas` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `idsiswa` bigint(20) unsigned NOT NULL,
  `idkelasdetail` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idsiswakelas`),
  KEY `tbl_siswa_kelas_idsiswa_foreign` (`idsiswa`),
  KEY `tbl_siswa_kelas_idkelasdetail_foreign` (`idkelasdetail`),
  CONSTRAINT `tbl_siswa_kelas_idkelasdetail_foreign` FOREIGN KEY (`idkelasdetail`) REFERENCES `tbl_kelas_detail` (`idkelasdetail`) ON DELETE CASCADE,
  CONSTRAINT `tbl_siswa_kelas_idsiswa_foreign` FOREIGN KEY (`idsiswa`) REFERENCES `tbl_siswa` (`idsiswa`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=641 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_siswa_kelas`
--

LOCK TABLES `tbl_siswa_kelas` WRITE;
/*!40000 ALTER TABLE `tbl_siswa_kelas` DISABLE KEYS */;
INSERT INTO `tbl_siswa_kelas` VALUES (21,21,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(22,22,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(23,23,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(24,24,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(25,25,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(26,26,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(27,27,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(28,28,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(29,29,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(30,30,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(31,31,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(32,32,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(33,33,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(34,34,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(35,35,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(36,36,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(37,37,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(38,38,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(39,39,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(40,40,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(41,41,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(42,42,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(43,43,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(44,44,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(45,45,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(46,46,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(47,47,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(48,48,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(49,49,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(50,50,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(51,51,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(52,52,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(53,53,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(54,54,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(55,55,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(56,56,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(57,57,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(58,58,1,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(59,59,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(60,60,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(61,61,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(62,62,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(63,63,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(64,64,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(65,65,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(66,66,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(67,67,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(68,68,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(69,69,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(70,70,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(71,71,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(72,72,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(73,73,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(74,74,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(75,75,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(76,76,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(77,77,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(78,78,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(79,79,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(80,80,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(81,81,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(82,82,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(83,83,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(84,84,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(85,85,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(86,86,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(87,87,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(88,88,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(89,89,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(90,90,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(91,91,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(92,92,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(93,93,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(94,94,7,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(95,95,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(96,96,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(97,97,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(98,98,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(99,99,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(100,100,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(101,101,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(102,102,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(103,103,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(104,104,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(105,105,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(106,106,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(107,107,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(108,108,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(109,109,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(110,110,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(111,111,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(112,112,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(113,113,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(114,114,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(115,115,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(116,116,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(117,117,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(118,118,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(119,119,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(120,120,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(121,121,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(122,122,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(123,123,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(124,124,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(125,125,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(126,126,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(127,127,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(128,128,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(129,129,8,'2026-09-22 22:02:16','2026-09-22 22:02:16'),(130,130,8,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(131,131,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(132,132,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(133,133,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(134,134,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(135,135,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(136,136,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(137,137,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(138,138,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(139,139,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(140,140,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(141,141,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(142,142,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(143,143,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(144,144,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(145,145,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(146,146,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(147,147,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(148,148,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(149,149,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(150,150,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(151,151,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(152,152,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(153,153,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(154,154,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(155,155,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(156,156,2,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(157,157,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(158,158,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(159,159,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(160,160,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(161,161,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(162,162,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(163,163,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(164,164,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(165,165,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(166,166,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(167,167,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(168,168,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(169,169,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(170,170,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(171,171,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(172,172,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(173,173,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(174,174,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(175,175,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(176,176,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(177,177,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(178,178,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(179,179,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(180,180,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(181,181,9,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(182,182,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(183,183,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(184,184,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(185,185,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(186,186,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(187,187,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(188,188,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(189,189,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(190,190,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(191,191,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(192,192,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(193,193,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(194,194,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(195,195,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(196,196,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(197,197,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(198,198,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(199,199,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(200,200,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(201,201,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(202,202,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(203,203,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(204,204,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(205,205,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(206,206,10,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(207,207,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(208,208,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(209,209,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(210,210,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(211,211,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(212,212,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(213,213,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(214,214,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(215,215,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(216,216,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(217,217,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(218,218,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(219,219,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(220,220,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(221,221,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(222,222,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(223,223,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(224,224,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(225,225,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(226,226,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(227,227,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(228,228,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(229,229,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(230,230,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(231,231,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(232,232,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(233,233,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(234,234,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(235,235,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(236,236,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(237,237,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(238,238,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(239,239,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(240,240,3,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(241,241,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(242,242,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(243,243,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(244,244,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(245,245,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(246,246,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(247,247,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(248,248,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(249,249,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(250,250,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(251,251,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(252,252,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(253,253,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(254,254,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(255,255,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(256,256,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(257,257,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(258,258,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(259,259,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(260,260,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(261,261,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(262,262,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(263,263,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(264,264,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(265,265,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(266,266,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(267,267,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(268,268,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(269,269,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(270,270,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(271,271,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(272,272,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(273,273,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(274,274,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(275,275,11,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(276,276,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(277,277,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(278,278,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(279,279,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(280,280,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(281,281,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(282,282,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(283,283,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(284,284,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(285,285,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(286,286,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(287,287,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(288,288,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(289,289,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(290,290,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(291,291,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(292,292,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(293,293,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(294,294,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(295,295,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(296,296,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(297,297,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(298,298,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(299,299,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(300,300,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(301,301,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(302,302,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(303,303,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(304,304,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(305,305,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(306,306,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(307,307,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(308,308,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(309,309,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(310,310,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(311,311,12,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(312,312,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(313,313,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(314,314,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(315,315,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(316,316,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(317,317,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(318,318,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(319,319,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(320,320,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(321,321,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(322,322,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(323,323,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(324,324,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(325,325,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(326,326,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(327,327,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(328,328,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(329,329,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(330,330,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(331,331,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(332,332,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(333,333,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(334,334,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(335,335,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(336,336,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(337,337,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(338,338,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(339,339,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(340,340,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(341,341,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(342,342,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(343,343,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(344,344,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(345,345,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(346,346,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(347,347,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(348,348,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(349,349,4,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(350,350,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(351,351,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(352,352,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(353,353,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(354,354,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(355,355,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(356,356,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(357,357,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(358,358,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(359,359,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(360,360,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(361,361,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(362,362,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(363,363,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(364,364,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(365,365,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(366,366,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(367,367,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(368,368,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(369,369,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(370,370,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(371,371,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(372,372,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(373,373,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(374,374,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(375,375,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(376,376,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(377,377,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(378,378,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(379,379,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(380,380,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(381,381,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(382,382,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(383,383,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(384,384,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(385,385,13,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(386,386,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(387,387,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(388,388,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(389,389,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(390,390,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(391,391,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(392,392,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(393,393,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(394,394,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(395,395,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(396,396,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(397,397,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(398,398,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(399,399,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(400,400,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(401,401,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(402,402,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(403,403,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(404,404,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(405,405,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(406,406,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(407,407,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(408,408,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(409,409,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(410,410,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(411,411,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(412,412,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(413,413,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(414,414,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(415,415,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(416,416,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(417,417,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(418,418,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(419,419,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(420,420,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(421,421,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(422,422,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(423,423,14,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(424,424,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(425,425,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(426,426,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(427,427,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(428,428,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(429,429,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(430,430,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(431,431,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(432,432,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(433,433,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(434,434,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(435,435,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(436,436,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(437,437,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(438,438,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(439,439,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(440,440,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(441,441,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(442,442,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(443,443,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(444,444,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(445,445,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(446,446,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(447,447,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(448,448,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(449,449,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(450,450,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(451,451,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(452,452,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(453,453,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(454,454,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(455,455,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(456,456,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(457,457,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(458,458,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(459,459,5,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(460,460,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(461,461,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(462,462,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(463,463,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(464,464,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(465,465,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(466,466,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(467,467,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(468,468,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(469,469,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(470,470,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(471,471,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(472,472,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(473,473,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(474,474,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(475,475,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(476,476,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(477,477,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(478,478,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(479,479,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(480,480,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(481,481,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(482,482,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(483,483,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(484,484,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(485,485,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(486,486,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(487,487,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(488,488,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(489,489,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(490,490,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(491,491,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(492,492,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(493,493,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(494,494,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(495,495,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(496,496,15,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(497,497,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(498,498,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(499,499,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(500,500,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(501,501,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(502,502,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(503,503,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(504,504,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(505,505,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(506,506,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(507,507,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(508,508,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(509,509,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(510,510,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(511,511,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(512,512,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(513,513,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(514,514,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(515,515,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(516,516,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(517,517,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(518,518,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(519,519,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(520,520,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(521,521,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(522,522,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(523,523,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(524,524,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(525,525,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(526,526,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(527,527,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(528,528,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(529,529,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(530,530,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(531,531,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(532,532,16,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(533,533,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(534,534,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(535,535,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(536,536,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(537,537,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(538,538,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(539,539,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(540,540,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(541,541,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(542,542,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(543,543,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(544,544,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(545,545,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(546,546,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(547,547,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(548,548,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(549,549,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(550,550,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(551,551,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(552,552,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(553,553,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(554,554,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(555,555,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(556,556,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(557,557,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(558,558,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(559,559,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(560,560,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(561,561,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(562,562,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(563,563,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(564,564,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(565,565,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(566,566,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(567,567,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(568,568,6,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(569,569,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(570,570,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(571,571,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(572,572,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(573,573,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(574,574,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(575,575,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(576,576,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(577,577,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(578,578,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(579,579,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(580,580,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(581,581,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(582,582,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(583,583,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(584,584,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(585,585,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(586,586,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(587,587,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(588,588,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(589,589,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(590,590,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(591,591,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(592,592,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(593,593,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(594,594,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(595,595,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(596,596,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(597,597,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(598,598,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(599,599,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(600,600,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(601,601,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(602,602,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(603,603,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(604,604,17,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(605,605,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(606,606,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(607,607,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(608,608,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(609,609,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(610,610,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(611,611,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(612,612,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(613,613,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(614,614,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(615,615,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(616,616,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(617,617,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(618,618,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(619,619,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(620,620,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(621,621,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(622,622,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(623,623,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(624,624,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(625,625,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(626,626,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(627,627,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(628,628,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(629,629,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(630,630,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(631,631,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(632,632,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(633,633,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(634,634,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(635,635,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(636,636,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(637,637,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(638,638,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(639,639,18,'2026-09-22 22:02:17','2026-09-22 22:02:17'),(640,640,18,'2026-09-22 22:02:17','2026-09-22 22:02:17');
/*!40000 ALTER TABLE `tbl_siswa_kelas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tahun_ajaran`
--

DROP TABLE IF EXISTS `tbl_tahun_ajaran`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_tahun_ajaran` (
  `idthnajaran` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `thnajaran` varchar(50) NOT NULL,
  `tglmulai` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idthnajaran`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tahun_ajaran`
--

LOCK TABLES `tbl_tahun_ajaran` WRITE;
/*!40000 ALTER TABLE `tbl_tahun_ajaran` DISABLE KEYS */;
INSERT INTO `tbl_tahun_ajaran` VALUES (1,'2025/2026','2025-07-14','2026-09-16 18:28:52','2026-09-16 18:28:52');
/*!40000 ALTER TABLE `tbl_tahun_ajaran` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_users` (
  `id_user` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nama_user` varchar(150) NOT NULL,
  `role` enum('admin_web','pustakawan') NOT NULL DEFAULT 'pustakawan',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_users`
--

LOCK TABLES `tbl_users` WRITE;
/*!40000 ALTER TABLE `tbl_users` DISABLE KEYS */;
INSERT INTO `tbl_users` VALUES (1,'admin','$2y$12$tyWJFrANj.Tl/maBo.g2nOgpEIX0V6/9L7nPOR869oF9DSymiRgaO','Administrator SIPERPUS','admin_web',NULL,'2026-09-16 18:28:52','2026-09-16 18:28:52'),(2,'pustakawan','$2y$12$j9wcgWfAg.qvK3EyqQ1yZ.yKz5n.1HQOYg/nktPcIj/6jIA7Q8F0S','Hj. Siti Aminah, S.Pd.I','pustakawan',NULL,'2026-09-16 18:28:52','2026-09-16 18:28:52');
/*!40000 ALTER TABLE `tbl_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','staff') NOT NULL DEFAULT 'admin',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Administrator','admin@miroudotuttalim.sch.id',NULL,'$2y$12$94gyglqX9/JTEFqijxj3QOrOj9RXkZi57HWrlHo82OxEoy0s7HfZq','admin',NULL,'2026-09-03 00:05:22','2026-09-03 00:05:22');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-23 12:02:32
