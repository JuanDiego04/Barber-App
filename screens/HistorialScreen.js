import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HistorialScreen() {
  const [historial, setHistorial] = useState([]);
  const [nuevaFecha, setNuevaFecha] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        const historialData = await AsyncStorage.getItem('historial');
        if (historialData) {
          setHistorial(JSON.parse(historialData));
        }
      } catch (error) {
        console.error('Error al cargar el historial:', error);
      }
    };

    cargarHistorial();
  }, []);

  const eliminarReserva = async (id) => {
    try {
      const historialActual = await AsyncStorage.getItem('historial');
      if (historialActual) {
        const historial = JSON.parse(historialActual);
        const nuevoHistorial = historial.filter((item, index) => index !== id);
        await AsyncStorage.setItem('historial', JSON.stringify(nuevoHistorial));
        setHistorial(nuevoHistorial);
      }
    } catch (error) {
      console.error('Error al eliminar la reserva:', error);
    }
  };

  const aplazarReserva = async (id) => {
    if (!nuevaFecha) {
      Alert.alert('Error', 'Por favor ingresa una nueva fecha.');
      return;
    }

    try {
      const historialActual = await AsyncStorage.getItem('historial');
      if (historialActual) {
        const historial = JSON.parse(historialActual);
        historial[id].fecha = nuevaFecha;
        await AsyncStorage.setItem('historial', JSON.stringify(historial));
        setHistorial(historial);
        setNuevaFecha(''); // Limpiar el campo de fecha
      }
    } catch (error) {
      console.error('Error al aplazar la reserva:', error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.titulo}>{item.nombre}</Text>
      <Text style={styles.detalle}>Precio: ${item.precio}</Text>
      {item.fecha && <Text style={styles.detalle}>Fecha: {item.fecha}</Text>}

      {/* Botón para eliminar */}
      <TouchableOpacity
        style={styles.botonEliminar}
        onPress={() => eliminarReserva(index)}
      >
        <Text style={styles.textBoton}>Eliminar</Text>
      </TouchableOpacity>

      {/* Campo para aplazar */}
      <TextInput
        style={styles.input}
        placeholder="Nueva fecha"
        value={nuevaFecha}
        onChangeText={setNuevaFecha}
      />
      <TouchableOpacity
        style={styles.botonAplazar}
        onPress={() => aplazarReserva(index)}
      >
        <Text style={styles.textBoton}>Aplazar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#DAA520" />
        </TouchableOpacity>
        <Text style={styles.header}>Historial</Text>
      </View>

      {historial.length > 0 ? (
        <FlatList
          data={historial}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noData}>No hay historial disponible.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DAA520',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  detalle: {
    fontSize: 14,
    color: '#555',
  },
  noData: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  botonEliminar: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  botonAplazar: {
    backgroundColor: '#0077b6',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  textBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
});