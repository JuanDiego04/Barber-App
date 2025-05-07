import React, { useRef, useEffect, useContext } from "react";
import {
  Text,
  Image,
  StyleSheet,
  Animated,
  Pressable,
  View,
} from "react-native";

import { CarritoContext } from "../context/CarritoContext";

export default function ProductoCard({
  nombre,
  precio,
  descripcion,
  imagen,
  etiqueta,
  onAgregar,
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { agregarAlCarrito } = useContext(CarritoContext);

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      friction: 5,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.card,
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <Pressable
        onPress={() => {
          agregarAlCarrito({
            id: Math.random().toString(),
            nombre,
            precio,
            descripcion,
            imagen,
            etiqueta,
          });
        }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.pressable}
      >
        <Image source={imagen} style={styles.imagen} />
        <Text style={styles.nombre}>{nombre}</Text>
        <Text style={styles.descripcion}>{descripcion}</Text>
        <Text style={styles.precio}>${precio}</Text>
        {etiqueta && (
          <View style={styles.etiquetaContenedor}>
            <Text style={styles.etiqueta}>{etiqueta}</Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    margin: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  nombre: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  descripcion: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },
  precio: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
  },
  etiquetaContenedor: {
    marginTop: 6,
    backgroundColor: "#fdecef",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  etiqueta: {
    fontSize: 12,
    color: "#E91E63",
    fontWeight: "bold",
  },
  pressable: {
    alignItems: "center",
  },
});
