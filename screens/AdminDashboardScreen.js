import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AdminDashboardScreen({ navigation }) {
  const opciones = [
    { id: "1", titulo: "Gestionar Usuarios", screen: "ManageUsers" },
    { id: "2", titulo: "Gestionar Servicios", screen: "ManageServices" },
    { id: "3", titulo: "Ver Reservas", screen: "ViewReservations" },
    { id: "4", titulo: "Estadísticas", screen: "Statistics" },
  ];

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#DAA520" />
        <Text style={styles.backButtonText}>Regresar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Panel de Administración</Text>
      <FlatList
        data={opciones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleNavigate(item.screen)}
          >
            <Text style={styles.optionText}>{item.titulo}</Text>
          </TouchableOpacity>
        )}
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
    marginTop: 5,
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "#0077b6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  optionText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
