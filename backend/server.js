const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware - CORS configurado para soportar DELETE
const corsOptions = {
  origin: '*', // Permitir cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Habilitar preflight para DELETE
app.use(express.json());

// Conexión simple a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2001', // Tu contraseña
  database: 'notenote_db'
});

// Conectar a MySQL
connection.connect((err) => {
  if (err) {
    console.error('❌ Error conectando a MySQL:', err);
    console.error('🔧 Verifica que:');
    console.error('   1. MySQL esté corriendo');
    console.error('   2. La base de datos "notenote_db" exista');
    console.error('   3. Las credenciales sean correctas (usuario: root, contraseña: 2001)');
    console.error('   4. El puerto 3306 esté disponible');
    process.exit(1);
  }
  console.log('✅ Conectado a MySQL correctamente');
  console.log('📊 Base de datos: notenote_db');
  
  // Crear tabla si no existe
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS notas (
      id VARCHAR(255) PRIMARY KEY,
      texto TEXT NOT NULL,
      color VARCHAR(7) DEFAULT '#FFF59D',
      fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;
  
  connection.query(createTableQuery, (error) => {
    if (error) {
      console.error('❌ Error creando tabla:', error);
      process.exit(1);
    } else {
      console.log('✅ Tabla "notas" creada/verificada');
      console.log('🚀 Servidor listo para recibir peticiones');
    }
  });
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Servidor NoteNote funcionando correctamente!',
    status: 'OK'
  });
});

// Obtener todas las notas
app.get('/api/notas', (req, res) => {
  connection.query('SELECT * FROM notas ORDER BY fecha_creacion DESC', (error, results) => {
    if (error) {
      console.error('❌ Error en GET /api/notas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    console.log(`📋 Enviando ${results.length} notas al cliente`);
    res.json(results);
  });
});

// Crear nueva nota
app.post('/api/notas', (req, res) => {
  const { id, texto, color } = req.body;
  
  if (!id || !texto) {
    res.status(400).json({ error: 'ID y texto son requeridos' });
    return;
  }

  const query = 'INSERT INTO notas (id, texto, color) VALUES (?, ?, ?)';
  const values = [id, texto, color || '#FFF59D'];
  
  connection.query(query, values, (error, results) => {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(409).json({ error: 'Ya existe una nota con este ID' });
      } else {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
      return;
    }
    res.json({ id, texto, color: color || '#FFF59D' });
  });
});

// Actualizar nota existente
app.put('/api/notas/:id', (req, res) => {
  const { texto, color } = req.body;
  const id = req.params.id;
  
  if (!texto) {
    res.status(400).json({ error: 'Texto es requerido' });
    return;
  }

  const query = 'UPDATE notas SET texto = ?, color = ? WHERE id = ?';
  const values = [texto, color || '#FFF59D', id];
  
  connection.query(query, values, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Nota no encontrada' });
      return;
    }
    
    res.json({ id, texto, color: color || '#FFF59D' });
  });
});

// Eliminar nota
app.delete('/api/notas/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM notas WHERE id = ?';
  
  connection.query(query, [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Nota no encontrada' });
      return;
    }
    
    res.json({ message: 'Nota eliminada correctamente', id });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
