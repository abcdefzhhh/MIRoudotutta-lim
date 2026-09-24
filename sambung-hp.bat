@echo off
setlocal enabledelayedexpansion
title SIPERPUS - USB Port Forwarding (Auto Keep-Alive)
color 0A
cls

:: Tambahkan platform-tools Android ke PATH lokal sesi ini
if exist "%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe" (
    set "PATH=%LOCALAPPDATA%\Android\Sdk\platform-tools;%PATH%"
)

echo ======================================================================
echo           SIPERPUS - PENGHUBUNG HP KE BACKEND LAPTOP (USB)
echo ======================================================================
echo.
echo Mode: AUTO KEEP-ALIVE (Mendukung semua merk HP Android)
echo.

:check_device
adb devices | findstr /R /C:"[a-zA-Z0-9].*device$" >nul
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo [PERHATIAN] Belum ada HP yang terdeteksi via USB!
    echo.
    echo Pastikan di HP baru yang dicolokkan:
    echo 1. Fitur 'USB Debugging' sudah DIAKTIFKAN di Opsi Pengembang HP.
    echo 2. Jika muncul popup 'Izinkan USB Debugging', centang 'Selalu Izinkan' lalu klik OK.
    echo.
    echo Menunggu HP terhubung...
    ping 127.0.0.1 -n 3 >nul
    goto check_device
)

color 0A
cls
echo ======================================================================
echo           SIPERPUS - PENGHUBUNG HP KE BACKEND LAPTOP (USB)
echo ======================================================================
echo.
echo [DAFTAR HP TERHUBUNG]:
adb devices
echo.

:: Terapkan port forwarding ke setiap HP yang terhubung
for /f "tokens=1" %%d in ('adb devices ^| findstr /R /C:"[a-zA-Z0-9].*device$"') do (
    adb -s %%d reverse tcp:8000 tcp:8000 >nul 2>&1
    echo [OK] Port 8000 diteruskan ke perangkat ID: %%d
)

echo.
echo ======================================================================
echo   [SUKSES] SEMUA HP YANG TERCOLOK SUDAH TERSAMBUNG KE BACKEND LAPTOP!
echo ======================================================================
echo   * URL API di HP  : http://127.0.0.1:8000/api/
echo   * Pindah Wi-Fi manapun, koneksi TIDAK AKAN TERPUTUS.
echo   * Buka aplikasi SIPERPUS di HP dan langsung Login.
echo ======================================================================
echo.
echo (Jendela ini menjaga koneksi tetap aktif otomatis)
echo Tekan Ctrl+C untuk menutup jika sudah selesai.
echo.

:loop
ping 127.0.0.1 -n 4 >nul
for /f "tokens=1" %%d in ('adb devices ^| findstr /R /C:"[a-zA-Z0-9].*device$"') do (
    adb -s %%d reverse tcp:8000 tcp:8000 >nul 2>&1
)
goto loop
