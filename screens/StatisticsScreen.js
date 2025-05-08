import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import { TouchableOpacity } from "react-native";


const reservasIniciales = [
  {
    id: "1",
    cliente: "user02",
    servicio: "Corte basico",
    precio: 20,
    fecha: "2025-05-08",
  },
  
];

export default function StatisticsScreen({ navigation }) {
  const [reservas, setReservas] = useState(reservasIniciales);
  const [totalReservas, setTotalReservas] = useState(0);
  const [ingresosTotales, setIngresosTotales] = useState(0);
  const [serviciosPopulares, setServiciosPopulares] = useState([]);

  useEffect(() => {
    // Calcular estadísticas
    setTotalReservas(reservas.length);

    const ingresos = reservas.reduce(
      (total, reserva) => total + reserva.precio,
      0
    );
    setIngresosTotales(ingresos);

    const servicios = {};
    reservas.forEach((reserva) => {
      servicios[reserva.servicio] = (servicios[reserva.servicio] || 0) + 1;
    });

    const serviciosOrdenados = Object.entries(servicios)
      .sort((a, b) => b[1] - a[1])
      .map(([servicio, cantidad]) => ({ servicio, cantidad }));

    setServiciosPopulares(serviciosOrdenados);
  }, [reservas]);

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

      <Text style={styles.title}>Estadísticas</Text>

      {/* Total de Reservas */}
      <View style={styles.statCard}>
        <Text style={styles.statTitle}>Total de Reservas</Text>
        <Text style={styles.statValue}>{totalReservas}</Text>
      </View>

      {/* Ingresos Totales */}
      <View style={styles.statCard}>
        <Text style={styles.statTitle}>Ingresos Totales</Text>
        <Text style={styles.statValue}>${ingresosTotales}</Text>
      </View>

      {/* Servicios Más Solicitados */}
      <Text style={styles.sectionTitle}>Servicios Más Solicitados</Text>
      <FlatList
        data={serviciosPopulares}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.popularServiceItem}>
            <Text style={styles.popularServiceName}>{item.servicio}</Text>
            <Text style={styles.popularServiceCount}>
              {item.cantidad} reservas
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay datos disponibles.</Text>
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
  },
  statCard: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  statTitle: {
    color: "#ccc",
    fontSize: 16,
  },
  statValue: {
    color: "#DAA520",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  sectionTitle: {
    color: "#DAA520",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  popularServiceItem: {
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  popularServiceName: {
    color: "#fff",
    fontSize: 16,
  },
  popularServiceCount: {
    color: "#DAA520",
    fontSize: 16,
  },
  emptyText: {
    color: "#ccc",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
