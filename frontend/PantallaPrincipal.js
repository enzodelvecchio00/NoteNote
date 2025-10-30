import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { notaService } from './apiService'; // NUEVA IMPORTACIÓN

export default function PantallaPrincipal({ navigation }) {
  const [notas, setNotas] = useState([]);
  const [cargando, setCargando] = useState(true); // NUEVO ESTADO
  const [eliminando, setEliminando] = useState(false); // NUEVO ESTADO PARA ELIMINACIÓN

  // NUEVO: Cargar notas al iniciar
  useEffect(() => {
    cargarNotas();
  }, []);

  const cargarNotas = async () => {
    try {
      setCargando(true);
      console.log('🔄 Cargando notas desde servidor...');
      
      const notasData = await notaService.obtenerTodas();
      console.log('📋 Notas recibidas del servidor:', notasData);
      setNotas(notasData);
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  // MODIFICADO: Guardar nota
  const onGuardarNota = async (nota) => {
    try {
      if (notas.find(n => n.id === nota.id)) {
        await notaService.actualizar(nota.id, nota);
      } else {
        await notaService.crear(nota);
      }
      // Recargar la lista después de guardar
      await cargarNotas();
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error(error);
    }
  };

  // MODIFICADO: Borrar nota
  const borrarNota = async (id) => {
    console.log('🗑️ Intentando eliminar nota con ID:', id);
    const isWeb = typeof document !== 'undefined';

    // En Web, usar window.confirm porque Alert.alert no soporta callbacks
    if (isWeb) {
      const confirmar = window.confirm('¿Estás seguro de que quieres eliminar esta nota?');
      if (!confirmar) return;
      
      try {
        setEliminando(true);
        console.log('🗑️ Confirmado: eliminando nota...');
        await notaService.eliminar(id);
        console.log('✅ Nota eliminada exitosamente');
        
        // Esperar un momento y recargar
        await new Promise(resolve => setTimeout(resolve, 300));
        await cargarNotas();
      } catch (error) {
        console.error('❌ Error en borrarNota:', error);
        alert('Error al eliminar: ' + error.message);
      } finally {
        setEliminando(false);
      }
      return;
    }

    // En móvil nativo, usar Alert.alert
    Alert.alert(
      'Eliminar nota',
      '¿Estás seguro de que quieres eliminar esta nota?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              setEliminando(true);
              console.log('🗑️ Confirmado: eliminando nota...');
              await notaService.eliminar(id);
              console.log('✅ Nota eliminada exitosamente');
              
              await new Promise(resolve => setTimeout(resolve, 300));
              await cargarNotas();
            } catch (error) {
              console.error('❌ Error en borrarNota:', error);
              Alert.alert('Error', error.message);
            } finally {
              setEliminando(false);
            }
          },
        },
      ]
    );
  };

  // NUEVO: Pantalla de carga
  if (cargando) {
    return (
      <View style={[styles.container, styles.centrado]}>
        <ActivityIndicator size="large" color="#4caf50" />
        <Text style={styles.textoCarga}>Cargando notas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>NoteNote - Mis Notas</Text>
      <Text style={styles.contador}>Total: {notas.length} notas</Text>

      <View style={styles.botonesHeader}>
        <TouchableOpacity
          style={styles.botonCrear}
          onPress={() =>
            navigation.navigate('Nota', {
              onGoBack: onGuardarNota,
            })
          }
        >
          <Text style={styles.textoBoton}>+ Nueva Nota</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.botonRefrescar}
          onPress={async () => {
            console.log('🔄 Botón refrescar presionado');
            console.log('📋 Estado actual de notas:', notas);
            await cargarNotas();
          }}
        >
          <MaterialIcons name="refresh" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.notasContainer}>
        {notas.length === 0 ? (
          <View style={styles.sinNotas}>
            <Text style={styles.textoSinNotas}>No hay notas aún.{'\n'}¡Crea tu primera nota!</Text>
          </View>
        ) : (
          notas.map((nota) => (
            <View
              key={nota.id}
              style={[styles.nota, { backgroundColor: nota.color }]}
            >
              <ScrollView style={styles.textoContainer} showsVerticalScrollIndicator={true}>
                <Text style={styles.textoNota}>{nota.texto}</Text>
              </ScrollView>
              <View style={styles.botones}>
                <TouchableOpacity
                  style={styles.boton}
                  onPress={() =>
                    navigation.navigate('Nota', {
                      nota,
                      onGoBack: onGuardarNota,
                    })
                  }
                >
                  <MaterialIcons name="edit" size={30} color="#252525ff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.boton}
                  onPress={() => borrarNota(nota.id)}
                  disabled={eliminando}
                >
                  {eliminando ? (
                    <ActivityIndicator size="small" color="red" />
                  ) : (
                    <MaterialIcons name="delete" size={30} color="#a01010ff" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textoNota: {
    fontSize: 18, // Aumentado de 16 a 18
    marginBottom: 10,
    lineHeight: 24, // Añadido para mejor espaciado
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  centrado: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCarga: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  sinNotas: {
    alignItems: 'center',
    padding: 40,
  },
  textoSinNotas: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contador: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  botonesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  botonCrear: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  botonRefrescar: {
    backgroundColor: '#2196f3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  notasContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
},
nota: {
  width: '35%',  // Cambia este valor para ajustar el ancho
  padding: 15,
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 10,
  marginBottom: 15,
  marginHorizontal: 15,  // Agrega este para separación horizontal
  elevation: 4,
},
  textoNota: {
    fontSize: 22,
    marginBottom: 10,
    lineHeight: 28,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
   boton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#ffffffff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoContainer: {
    maxHeight: 120,
  },
});
