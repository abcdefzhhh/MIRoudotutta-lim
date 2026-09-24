@echo off
setlocal enabledelayedexpansion
title SIPERPUS - USB Port Forwarding (Auto Keep-Alive)
color 0A
cls

set "ADB_PATH=%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe"
if exist "%ADB_PATH%" (
    set "ADB=%ADB_PATH%"
) else (
    set "ADB=adb"
)

echo ======================================================================
echo           SIPERPUS - PENGHUBUNG HP KE BACKEND LAPTOP (USB)
echo ======================================================================
echo.
echo Mode: AUTO KEEP-ALIVE (Biarkan jendela ini tetap terbuka saat coding/testing)
echo.

:check_device
echo [1/2] Memeriksa koneksi perangkat HP...
"%ADB%" devices | findstr /R /C:"[a-zA-Z0-9].*device$" >nul
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo.
    echo [PERHATIAN] HP belum terdeteksi!
    echo 1. Pastikan kabel data USB sudah tercolok ke laptop dan HP.
    echo 2. Aktifkan 'USB Debugging' di Pengaturan -^> Opsi Pengembang di HP Anda.
    echo 3. Izinkan popup 'Allow USB Debugging' di layar HP Anda jika muncul.
    echo.
    echo Menunggu HP tercolok...
    timeout /t 3 >nul
    goto check_device
)

color 0A
echo [OK] HP terdeteksi!
echo.
echo [2/2] Mengaktifkan jalur USB: Port 8000 HP -^> Port 8000 Laptop...
"%ADB%" reverse tcp:8000 tcp:8000 >nul 2>&1

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ======================================================================
    echo   [SUKSES] HP DAN BACKEND LAPTOP BERHASIL TERSAMBUNG!
    echo ======================================================================
    echo   * URL API di HP : http://127.0.0.1:8000/api/
    echo   * Pindah Wi-Fi mana pun, koneksi TIDAK AKAN PERNAH TERPUTUS.
    echo   * Silakan buka aplikasi SIPERPUS di HP Anda dan tekan Login.
    echo ======================================================================
    echo.
    echo (Jendela ini menjaga koneksi tetap aktif jika kabel dicabut/pasang kembali)
    echo Tekan Ctrl+C untuk menutup jika sudah selesai.
    echo.
) else (
    color 0E
    echo [INFO] Gagal setting reverse port, mencoba lagi...
)

:loop
timeout /t 3 >nul
"%ADB%" reverse tcp:8000 tcp:8000 >nul 2>&1
goto loop
