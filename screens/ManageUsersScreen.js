import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ManageUsersScreen({ navigation }) {
  // Datos simulados de usuarios
  const [usuarios, setUsuarios] = useState([
    {
      id: "1",
      nombre: "user02",
      email: "user02@ej.com",
    },

  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleSaveUser = () => {
    if (!selectedUser.nombre || !selectedUser.email) {
      Alert.alert(
        "Error",
        "El nombre y el correo electrónico son obligatorios."
      );
      return;
    }

    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((user) =>
        user.id === selectedUser.id ? selectedUser : user
      )
    );
    setModalVisible(false);
  };

  const handleDeleteUser = (id) => {
    Alert.alert(
      "Eliminar Usuario",
      "¿Estás seguro de que deseas eliminar este usuario?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            setUsuarios((prevUsuarios) =>
              prevUsuarios.filter((user) => user.id !== id)
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Botón para regresar al Panel de Administración */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#DAA520" />
        <Text style={styles.backButtonText}>Regresar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Gestionar Usuarios</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <View>
              <Text style={styles.userName}>{item.nombre}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
              <Text style={styles.userPhone}>Tel: {item.telefono}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEditUser(item)}>
                <Text style={styles.editButton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
                <Text style={styles.deleteButton}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay usuarios disponibles.</Text>
        }
      />

      {/* Modal para editar usuario */}
      {selectedUser && (
        <Modal visible={isModalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Usuario</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                value={selectedUser.nombre}
                onChangeText={(text) =>
                  setSelectedUser({ ...selectedUser, nombre: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={selectedUser.email}
                onChangeText={(text) =>
                  setSelectedUser({ ...selectedUser, email: text })
                }
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="Teléfono"
                value={selectedUser.telefono}
                onChangeText={(text) =>
                  setSelectedUser({ ...selectedUser, telefono: text })
                }
                keyboardType="phone-pad"
              />
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveUser}
                >
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
    backgroundColor: "#1E1E1E",
    padding: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  backButtonText: {
    color: "#DAA520",
    fontSize: 16,
    marginLeft: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#DAA520",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 5,
  },
  userItem: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    color: "#ccc",
    fontSize: 14,
  },
  userPhone: {
    color: "#ccc",
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  editButton: {
    color: "#0077b6",
    fontSize: 16,
    marginRight: 10,
  },
  deleteButton: {
    color: "#dc3545",
    fontSize: 16,
  },
  emptyText: {
    color: "#ccc",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DAA520",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    color: "#333",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#0077b6",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
