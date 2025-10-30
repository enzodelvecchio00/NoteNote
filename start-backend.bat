@echo off
echo 🚀 Iniciando servidor backend NoteNote...
echo.
cd backend
echo 📦 Instalando dependencias...
call npm install
echo.
echo 🗄️ Iniciando servidor en puerto 3001...
echo ⚠️  Asegúrate de que MySQL esté corriendo y la base de datos 'notenote_db' exista
echo.
echo Ejecutando: node server.js
node server.js
pause
