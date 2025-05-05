import React from 'react';
import { View, FlatList, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import ProductoCard from '../components/ProductoCard';  // Asegúrate de que este componente esté correctamente implementado

const productos = [
  {
    id: '1',
    nombre: 'Aceite Grave',
    precio: 22000,
    descripcion: 'La crema o loción para barba ofrece excelentes propiedades hidratantes.',
    imagen: require('../assets/aceitebarba.png'),
    etiqueta: '🔥 Popular',
  },
  {
    id: '2',
    nombre: 'Balsamo Grave',
    precio: 24000,
    descripcion: 'Esta mantequilla suaviza y moldea la barba, ejerciendo un efecto reparador.',
    imagen: require('../assets/balsamo.png'),
    etiqueta: '🧼 Nuevo',
  },
  {
    id: '3',
    nombre: 'Minofoam',
    precio: 42000,
    descripcion: 'Es una espuma tópica que contiene minoxidil al 5%, utilizada para tratar la alopecia.',
    imagen: require('../assets/minofoam.png'),
    etiqueta: '⭐ Recomendado',
  },
  {
    id: '4',
    nombre: 'Reelance Cejas',
    precio: 25000,
    descripcion: 'Tratamiento para estimular el crecimiento del vello en las cejas.',
    imagen: require('../assets/reelancecejas.png'),
    etiqueta: null,
  },
  {
    id: '5',
    nombre: 'Reelance Capilar',
    precio: 30000,
    descripcion: 'Detiene la caída de cabello y estimula el crecimiento de cabello nuevo.',
    imagen: require('../assets/reelance.png'),
    etiqueta: null,
  },
];

export default function TiendaScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>🛍️ Tienda</Text>
      </View>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductoCard
            nombre={item.nombre}
            precio={item.precio}
            descripcion={item.descripcion}
            imagen={item.imagen}
            etiqueta={item.etiqueta}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  lista: {
    padding: 10,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
