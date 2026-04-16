@echo off
setlocal
cd /d "%~dp0"

if exist ".\start-local-server.env.bat" (
  call ".\start-local-server.env.bat"
)

if not defined BAIDU_OCR_API_KEY (
  echo.
  echo Baidu OCR API key is not set.
  set /p BAIDU_OCR_API_KEY=Enter BAIDU_OCR_API_KEY ^(leave blank to start without OCR^): 
)

if not defined BAIDU_OCR_SECRET_KEY (
  echo.
  echo Baidu OCR secret key is not set.
  set /p BAIDU_OCR_SECRET_KEY=Enter BAIDU_OCR_SECRET_KEY ^(leave blank to start without OCR^): 
)

echo.
if defined BAIDU_OCR_API_KEY if defined BAIDU_OCR_SECRET_KEY (
  echo Starting local server with Baidu OCR enabled...
) else (
  echo Starting local server without OCR credentials...
)

powershell -NoProfile -ExecutionPolicy Bypass -File ".\scripts\serve-local.ps1" -Port 8000
