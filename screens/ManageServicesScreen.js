import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

// Datos simulados compartidos (puedes importarlos desde un archivo común)
const serviciosIniciales = [
  { id: '1', nombre: 'Corte de Cabello', descripcion: 'Corte clásico o moderno', precio: '$10' },
  { id: '2', nombre: 'Afeitado', descripcion: 'Afeitado con navaja y toalla caliente', precio: '$15' },
  { id: '3', nombre: 'Limpieza facial', descripcion: 'Limpieza facial y exfoliaciones', precio: '$20' },
];

export default function ManageServicesScreen({ navigation }) {
  const [servicios, setServicios] = useState(serviciosIniciales);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleEditService = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  const handleSaveService = () => {
    if (!selectedService.nombre || !selectedService.precio) {
      Alert.alert('Error', 'El nombre y el precio son obligatorios.');
      return;
    }

    setServicios((prevServicios) =>
      prevServicios.map((service) => (service.id === selectedService.id ? selectedService : service))
    );
    setModalVisible(false);
  };

  const handleDeleteService = (id) => {
    Alert.alert(
      'Eliminar Servicio',
      '¿Estás seguro de que deseas eliminar este servicio?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setServicios((prevServicios) => prevServicios.filter((service) => service.id !== id));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Botón para regresar al Panel de Administración */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#DAA520" />
        <Text style={styles.backButtonText}>Regresar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Gestionar Servicios</Text>
      <FlatList
        data={servicios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.serviceItem}>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{item.nombre}</Text>
              <Text style={styles.serviceDescription}>{item.descripcion}</Text>
              <Text style={styles.servicePrice}>{item.precio}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEditService(item)}>
                <Text style={styles.editButton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteService(item.id)}>
                <Text style={styles.deleteButton}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay servicios disponibles.</Text>}
      />

      {/* Modal para editar servicio */}
      {selectedService && (
        <Modal visible={isModalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Servicio</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre del servicio"
                value={selectedService.nombre}
                onChangeText={(text) => setSelectedService({ ...selectedService, nombre: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={selectedService.descripcion}
                onChangeText={(text) => setSelectedService({ ...selectedService, descripcion: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Precio"
                value={selectedService.precio}
                onChangeText={(text) => setSelectedService({ ...selectedService, precio: text })}
                keyboardType="numeric"
              />
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveService}>
                  <Text style={styles.saveButtonText}>Guardar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#DAA520',
    fontSize: 16,
    marginLeft: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DAA520',
    marginBottom: 20,
    marginTop: 5,
    textAlign: 'center',
  },
  serviceItem: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', 
  },
  serviceInfo: {
    flex: 1, 
    marginRight: 10, 
  },
  serviceName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  serviceDescription: {
    color: '#ccc',
    fontSize: 14,
    flexWrap: 'wrap', 
  },
  servicePrice: {
    color: '#DAA520',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  actions: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  editButton: {
    color: '#0077b6',
    fontSize: 16,
    marginBottom: 10,
  },
  deleteButton: {
    color: '#dc3545',
    fontSize: 16,
  },
  emptyText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DAA520',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    color: '#333',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#0077b6',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});