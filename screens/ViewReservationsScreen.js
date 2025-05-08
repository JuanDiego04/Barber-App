import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const reservasIniciales = [
  {
    id: "1",
    cliente: "user02",
    servicio: "Corte basico",
    fecha: "2025-05-08",
    hora: "11:00 AM",
  },

];

export default function ViewReservationsScreen({ navigation }) {
  const [reservas, setReservas] = useState(reservasIniciales);

  const handleDeleteReservation = (id) => {
    Alert.alert(
      "Eliminar Reserva",
      "¿Estás seguro de que deseas eliminar esta reserva?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            setReservas((prevReservas) =>
              prevReservas.filter((reserva) => reserva.id !== id)
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
  
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack("AdminDashboard")}
      >
        <Ionicons name="arrow-back" size={24} color="#DAA520" />
        <Text style={styles.backButtonText}>Regresar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Ver Reservas</Text>
      <FlatList
        data={reservas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reservationItem}>
            <View style={styles.reservationInfo}>
              <Text style={styles.reservationClient}>{item.cliente}</Text>
              <Text style={styles.reservationService}>{item.servicio}</Text>
              <Text style={styles.reservationDate}>
                {item.fecha} - {item.hora}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteReservation(item.id)}>
              <Text style={styles.deleteButton}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay reservas disponibles.</Text>
        }
      />
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
    marginTop: 8,
  },
  reservationItem: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reservationInfo: {
    flex: 1,
    marginRight: 10,
  },
  reservationClient: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  reservationService: {
    color: "#ccc",
    fontSize: 14,
  },
  reservationDate: {
    color: "#DAA520",
    fontSize: 14,
    marginTop: 5,
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
});
