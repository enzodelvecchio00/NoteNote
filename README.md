# NoteNote - Aplicación de Notas

Aplicación de notas desarrollada con React Native (Expo) y Node.js con MySQL.

## 🚀 Inicio Rápido

### Opción 1: Iniciar todo automáticamente
```bash
start-both.bat
```

### Opción 2: Iniciar servicios por separado

#### Backend (Puerto 3001)
```bash
start-backend.bat
```

#### Frontend (Expo)
```bash
start-frontend.bat
```

## 📋 Configuración de Base de Datos

**IMPORTANTE**: Antes de iniciar la aplicación, debes configurar MySQL:

### Paso 1: Instalar MySQL (si no lo tienes)
- Descarga MySQL desde: https://dev.mysql.com/downloads/
### Paso 2: Configurar la base de datos
1. **Abrir MySQL Workbench**
2. **Conectarte a tu servidor local** (generalmente localhost:3306)
3. **Ejecutar el script de configuración**:
   - Abre el archivo `database-setup.sql` en este proyecto
   - Copia todo el contenido
   - Pégalo en MySQL Workbench
   - Ejecuta todo el script (Ctrl+Shift+Enter)

### Paso 3: Verificar configuración
- Debe aparecer la base de datos `notenote_db`
- Debe existir la tabla `notas`
- Debe aparecer una nota de prueba

### Credenciales por defecto:
- **Usuario**: `root`
- **Contraseña**: `2001`
- **Base de datos**: `notenote_db`

## 🛠️ Configuración Manual

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 📱 Uso de la Aplicación

1. **Pantalla Principal**: Muestra todas las notas guardadas
2. **Crear Nota**: Toca el botón "+ Nueva Nota"
3. **Editar Nota**: Toca el ícono de editar en cualquier nota
4. **Eliminar Nota**: Toca el ícono de eliminar en cualquier nota
5. **Cambiar Color**: En la pantalla de edición, selecciona un color

## 🔧 Solución de Problemas

### Error de conexión a MySQL
- Verifica que MySQL esté corriendo
- Confirma que la base de datos `notenote_db` existe
- Revisa las credenciales en `backend/server-simple.js`

### Error de conexión entre frontend y backend
- Verifica que el backend esté corriendo en puerto 3001
- Revisa la consola del navegador para errores de red

### Puerto ocupado
- Si el puerto 3001 está ocupado, cambia el puerto en `backend/server-simple.js` y `frontend/apiService.js`

## 📁 Estructura del Proyecto

```
NoteNote/
├── backend/           # Servidor Node.js
│   ├── server-simple.js
│   └── package.json
├── frontend/          # Aplicación React Native
│   ├── App.js
│   ├── PantallaPrincipal.js
│   ├── PantallaNota.js
│   ├── apiService.js
│   └── package.json
├── start-backend.bat  # Script para iniciar backend
├── start-frontend.bat # Script para iniciar frontend
└── start-both.bat     # Script para iniciar ambos
```

## Características

- ✅ Crear, editar y eliminar notas
- ✅ Colores personalizables para cada nota
- ✅ Interfaz intuitiva y moderna
- ✅ Sincronización con base de datos MySQL
- ✅ Navegación fluida entre pantallas

## Soporte

Si tienes problemas, revisa:
1. Los logs en la consola del backend
2. Los logs en la consola del frontend
3. La conexión a MySQL
4. Los puertos (3001 para backend)
