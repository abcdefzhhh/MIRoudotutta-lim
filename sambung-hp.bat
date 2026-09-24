@echo off
title SIPERPUS - Sambungkan HP ke Laptop (Port Forwarding USB)
cls
echo ======================================================================
echo             SIPERPUS - HUBUNGKAN HP KE BACKEND LAPTOP
echo ======================================================================
echo.
echo Sedang memeriksa koneksi HP via USB...
echo.

set ADB="%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe"

if not exist %ADB% (
    set ADB=adb
)

%ADB% devices
echo.
echo Meneruskan port 8000 laptop ke port 8000 HP (adb reverse)...
%ADB% reverse tcp:8000 tcp:8000

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ======================================================================
    echo [SUKSES] HP Anda berhasil terhubung ke backend laptop!
    echo.
    echo * URL Backend : http://127.0.0.1:8000/api/
    echo * Pindah Wi-Fi manapun / tanpa internet, koneksi TIDAK AKAN TERPUTUS.
    echo ======================================================================
) else (
    echo.
    echo ======================================================================
    echo [PERHATIAN] Gagal meneruskan port.
    echo Pastikan:
    echo 1. HP sudah tercolok ke laptop dengan kabel data USB.
    echo 2. 'USB Debugging' sudah diaktifkan di Opsi Pengembang HP.
    echo 3. Izinkan popup 'Allow USB Debugging' di layar HP Anda jika muncul.
    echo ======================================================================
)

echo.
pause
