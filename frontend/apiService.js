import { Platform } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

const TU_IP_LOCAL = '192.168.1.36';
const DEV_PORT = 3001;

const API_BASE_URL = (() => {
  // iOS físico -> siempre usar IP local
  if (Platform.OS === 'ios' && Constants.isDevice) {
    return `http://${TU_IP_LOCAL}:${DEV_PORT}/api`;
  }
  
  // Android físico -> también necesita IP
  if (Platform.OS === 'android' && Constants.isDevice) {
    return `http://${TU_IP_LOCAL}:${DEV_PORT}/api`;
  }
  
  // Simuladores y web
  return `http://localhost:${DEV_PORT}/api`;
})();

console.log('🌐 Conectando a API:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const notaService = {
  async obtenerTodas() {
    try {
      console.log('📡 Obteniendo notas desde API...');
      const response = await api.get('/notas');
      console.log(`✅ Recibidas ${response.data.length} notas`);
      return response.data;
    } catch (error) {
      console.error('❌ Error obteniendo notas:', error.message);
      throw new Error('No se pudieron cargar las notas. Verifica que el servidor esté corriendo.');
    }
  },

  async crear(nota) {
    try {
      console.log('📝 Creando nueva nota...');
      const response = await api.post('/notas', nota);
      console.log('✅ Nota creada exitosamente');
      return response.data;
    } catch (error) {
      console.error('❌ Error creando nota:', error.message);
      throw new Error('No se pudo crear la nota.');
    }
  },

  async actualizar(id, nota) {
    try {
      console.log(`✏️ Actualizando nota ${id}...`);
      const response = await api.put(`/notas/${id}`, nota);
      console.log('✅ Nota actualizada exitosamente');
      return response.data;
    } catch (error) {
      console.error('❌ Error actualizando nota:', error.message);
      throw new Error('No se pudo actualizar la nota.');
    }
  },

  async eliminar(id) {
    try {
      console.log(`🗑️ Eliminando nota ${id}...`);
      const response = await api.delete(`/notas/${id}`);
      console.log('✅ Nota eliminada exitosamente');
      return response.data;
    } catch (error) {
      console.error('❌ Error eliminando nota:', error.message);
      throw new Error('No se pudo eliminar la nota.');
    }
  },
};
