import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ServicioCard({
  titulo,
  descripcion,
  descripcionDetallada,
  imagen,
  etiqueta,
  id,
  onReservar,
  onAgendar,
  precio,
}) {
  const [expandido, setExpandido] = useState(false);
  const imagenAnimada = useRef(new Animated.Value(160)).current;

  const toggleExpandir = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);


    Animated.timing(imagenAnimada, {
      toValue: expandido ? 160 : 450,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setExpandido(!expandido);
  };

  // Función para guardar en el historial
  const guardarEnHistorial = async (item) => {
    try {
      const historialActual = await AsyncStorage.getItem("historial");
      const historial = historialActual ? JSON.parse(historialActual) : [];
      historial.push(item);
      await AsyncStorage.setItem("historial", JSON.stringify(historial));
      console.log("Reserva guardada en el historial:", item); 
    } catch (error) {
      console.error("Error al guardar en el historial:", error);
    }
  };

  // acción de agendar
  const handleAgendar = () => {
    const fechaActual = new Date();
    const reserva = {
      id,
      nombre: titulo,
      precio,
      fecha: fechaActual.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }), 
      hora: fechaActual.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }), 
    };
    onAgendar(reserva);
    guardarEnHistorial(reserva);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {etiqueta && (
        <View style={styles.etiqueta}>
          <Text style={styles.etiquetaTexto}>{etiqueta}</Text>
        </View>
      )}

      <TouchableOpacity
        onPress={toggleExpandir}
        activeOpacity={0.9}
        style={styles.card}
      >
        <Animated.Image
          source={imagen}
          style={[styles.imagen, { height: imagenAnimada }]}
          resizeMode="cover"
        />
        <Text style={styles.titulo}>{titulo}</Text>
        {expandido && (
          <Text style={styles.descripcionDetallada}>
            {descripcionDetallada}
          </Text>
        )}
      
        <TouchableOpacity style={styles.botonAgendar} onPress={handleAgendar}>
          <Text style={styles.textBotonAgendar}>Agendar Cita</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#1E1E1E",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  imagen: {
    width: "100%",
    borderRadius: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  botonAgendar: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 8,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  textBotonAgendar: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  botonReservar: {
    backgroundColor: "#0077b6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 12,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  textBoton: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});