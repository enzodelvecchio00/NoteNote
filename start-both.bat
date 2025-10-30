@echo off
echo 🚀 Iniciando NoteNote - Backend y Frontend
echo.
echo ⚠️  IMPORTANTE: Asegúrate de que MySQL esté corriendo y la base de datos 'notenote_db' exista
echo.
echo 📋 Pasos para configurar la base de datos:
echo    1. Abre MySQL Workbench o phpMyAdmin
echo    2. Crea una base de datos llamada 'notenote_db'
echo    3. Usuario: root, Contraseña: 2001
echo.
pause
echo.
echo 🗄️ Iniciando Backend...
start "Backend NoteNote" cmd /k "cd backend && npm install && node server.js"
echo.
timeout /t 3 /nobreak >nul
echo.
echo 📱 Iniciando Frontend...
start "Frontend NoteNote" cmd /k "cd frontend && npm install && npm start"
echo.
echo ✅ Ambos servicios iniciados. Revisa las ventanas que se abrieron.
echo.
pause
