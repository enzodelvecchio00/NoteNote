import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function PantallaPrincipal({ navigation }) {
  const paletaColores = [
    '#FFF176', // amarillo pastel
    '#FFCC80', // naranja pastel
    '#90CAF9', // azul pastel
    '#A5D6A7', // verde pastel
    '#CE93D8', // violeta pastel
  ];

  const [notas, setNotas] = useState([
    { id: '1', texto: 'Estudiar React Native', color: '#FFF176' },
    { id: '2', texto: 'Ir al gimnasio', color: '#FFCC80' },
    { id: '3', texto: 'Preparar entrega del parcial', color: '#90CAF9' },
  ]);

  // Función para agregar o actualizar nota
  const onGuardarNota = (nota) => {
    setNotas((prevNotas) => {
      const index = prevNotas.findIndex(n => n.id === nota.id);
      if (index > -1) {
        // Actualizar nota existente
        const nuevasNotas = [...prevNotas];
        nuevasNotas[index] = nota;
        return nuevasNotas;
      } else {
        // Agregar nota nueva con color asignado si no tiene
        const colorAsignado = paletaColores[prevNotas.length % paletaColores.length];
        return [...prevNotas, { ...nota, color: nota.color || colorAsignado }];
      }
    });
  };

  // Función para borrar nota
  const borrarNota = (id) => {
    setNotas((prevNotas) => prevNotas.filter(n => n.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>NoteNote - Mis Notas</Text>

      {/* Botón Nueva Nota */}
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

      <ScrollView contentContainerStyle={styles.notasContainer}>
        {notas.map((nota) => (
          <View
            key={nota.id}
            style={[styles.nota, { backgroundColor: nota.color }]}
          >
            <Text style={styles.textoNota}>{nota.texto}</Text>
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
                <MaterialIcons name="edit" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.boton}
                onPress={() => borrarNota(nota.id)}
              >
                <MaterialIcons name="delete" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDE7',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  botonCrear: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
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
    justifyContent: 'space-between',
  },
  nota: {
    width: '48%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 4,
  },
  textoNota: {
    fontSize: 16,
    marginBottom: 10,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boton: {
    padding: 4,
  },
});
