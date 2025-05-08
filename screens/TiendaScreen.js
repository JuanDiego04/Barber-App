import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Alert,
  Platform, // Asegúrate de importar Platform
} from "react-native";
import ProductoCard from "../components/ProductoCard";

const imagenesProductos = {
  "Aceite Grave": require("../assets/aceitebarba.png"),
  "Balsamo Grave": require("../assets/balsamo.png"),
  "Mimofoam": require("../assets/minofoam.png"),
  "Reelance Cejas": require("../assets/reelancecejas.png"),
  "Reelance Capilar": require("../assets/reelance.png"),
};

export default function TiendaScreen() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBaseUrl = () => {
    const localIp = "192.168.x.x"; // Reemplaza con la IP de tu máquina
    const localhostUrl = "http://localhost/barberapp/api/productos";
    const localIpUrl = `http://${localIp}/barberapp/api/productos`;

    if (Platform.OS === "android") {
      return localIpUrl;
    }
    return localhostUrl;
  };

  const fetchProductos = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/obtener.php`); // Método GET por defecto
      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }
      const data = await response.json();

      const productosConImagenes = data.map((producto) => ({
        ...producto,
        imagen: imagenesProductos[producto.nombre] || require("../assets/default.png"),
      }));

      setProductos(productosConImagenes);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      Alert.alert("Error", "No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>🛍️ Tienda</Text>
      </View>
      {loading ? (
        <Text style={styles.loadingText}>Cargando productos...</Text>
      ) : (
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductoCard
              nombre={item.nombre}
              precio={item.precio}
              descripcion={item.descripcion}
              imagen={item.imagen}
              etiqueta={item.categoria}
            />
          )}
          numColumns={2}
          contentContainerStyle={styles.lista}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  lista: {
    padding: 10,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#333",
  },
});