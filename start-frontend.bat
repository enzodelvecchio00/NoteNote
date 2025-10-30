@echo off
echo 🚀 Iniciando aplicación frontend NoteNote...
echo.
cd frontend
echo 📦 Instalando dependencias...
call npm install
echo.
echo 📱 Iniciando aplicación Expo...
echo ⚠️  Asegúrate de que el backend esté corriendo en puerto 3001
echo.
call npm start
pause

