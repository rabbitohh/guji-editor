@echo off
setlocal
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File ".\scripts\serve-local.ps1" -Port 8000
