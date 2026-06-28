@echo off
cd /d "%~dp0"

:: Matar servidor previo si existia
for /f "tokens=5" %%p in ('netstat -aon 2^>nul ^| findstr ":8765 "') do (
    taskkill /f /pid %%p >nul 2>&1
)

:: Obtener IP local para la tablet
for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /i "IPv4" ^| findstr /v "127"') do (
    set IP=%%i
)
set IP=%IP: =%

:: Arrancar servidor en segundo plano
start "" /min python -m http.server 8765

:: Esperar un momento
timeout /t 2 /nobreak >nul

:: Abrir Chrome en este PC
start "" "http://localhost:8765"

:: Mostrar instrucciones para la tablet
echo.
echo =========================================
echo   Luna Magica - Servidor activo
echo =========================================
echo.
echo   Este PC:   http://localhost:8765
echo   Tablet:    http://%IP%:8765
echo.
echo   Abre esa direccion en Chrome de la tablet.
echo   Puedes instalarla como app desde el menu
echo   de Chrome: "Agregar a pantalla de inicio"
echo.
echo   Cierra esta ventana para APAGAR el servidor.
echo =========================================
pause >nul
taskkill /f /im python.exe >nul 2>&1
