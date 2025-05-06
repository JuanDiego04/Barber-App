import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import { CarritoContext } from '../context/CarritoContext';

export default function CarritoScreen({ navigation }) {
  const { carrito, vaciarCarrito, actualizarCantidad, eliminarDelCarrito } = useContext(CarritoContext);
  const [modalVisible, setModalVisible] = useState(false);

  // Incrementar cantidad del producto
  const incrementarCantidad = (index) => {
    const nuevaCantidad = carrito[index].cantidad + 1;
    actualizarCantidad(index, nuevaCantidad);
  };

  // Decrementar cantidad del producto (mínimo 1)
  const decrementarCantidad = (index) => {
    const nuevaCantidad = carrito[index].cantidad > 1 ? carrito[index].cantidad - 1 : 1;
    actualizarCantidad(index, nuevaCantidad);
  };

  // Calcular el total del carrito
  const calcularTotal = () => {
    return carrito
      .reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)
      .toLocaleString('es-CO'); // Formato colombiano
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛒 Mi Carrito</Text>
      </View>

      {/* Lista de productos */}
      {carrito.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Tu carrito está vacío. ¡Agrega productos!</Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate('Tienda')}
          >
            <Text style={styles.exploreButtonText}>Explorar Servicios</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={carrito}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <Image source={item.imagen} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.nombre}</Text>
                <Text style={styles.cardPrice}>${item.precio.toLocaleString()}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => decrementarCantidad(index)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.cantidad}</Text>
                  <TouchableOpacity onPress={() => incrementarCantidad(index)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => eliminarDelCarrito(item.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Resumen del carrito */}
      {carrito.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total: ${calcularTotal()}</Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => navigation.navigate('Pago', { total: calcularTotal() })}
          >
            <Text style={styles.checkoutButtonText}>Ir a Pagar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.clearButtonText}>Vaciar Carrito</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal de confirmación para vaciar el carrito */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>¿Estás seguro de que deseas vaciar el carrito?</Text>
          <TouchableOpacity
            onPress={() => {
              vaciarCarrito();
              setModalVisible(false);
            }}
            style={styles.modalButton}
          >
            <Text style={styles.modalButtonText}>Sí, Vaciar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCancelButton}>
            <Text style={styles.modalCancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#DAA520',
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    top: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  exploreButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  exploreButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 3,
    padding: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardPrice: {
    fontSize: 14,
    color: '#555',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: '#FFB800',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  checkoutButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#FF4C4C',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#FF4C4C',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalCancelButton: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 10,
  },
  modalCancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});