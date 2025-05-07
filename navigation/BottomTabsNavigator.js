import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import BarberiaInfoScreen from "../screens/BarberiaInfoScreen";
import ServiciosScreen from "../screens/ServiciosScreen";
import TiendaScreen from "../screens/TiendaScreen";
import CarritoScreen from "../screens/CarritoScreen";
import { useCarrito } from "../context/CarritoContext";

const Tab = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  const { carrito } = useCarrito(); // Obtén el estado del carrito

  // Calcula la cantidad total de productos en el carrito
  const obtenerCantidadTotal = () => {
    return carrito.reduce((total, producto) => total + producto.cantidad, 0);
  };

  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Inicio") {
            iconName = "home";
          } else if (route.name === "Servicios") {
            iconName = "cut";
          } else if (route.name === "Tienda") {
            iconName = "cart";
          } else if (route.name === "Carrito") {
            iconName = "cart-outline";
          }

          return (
            <View>
              <Ionicons name={iconName} size={size} color={color} />
              {route.name === "Carrito" && obtenerCantidadTotal() > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{obtenerCantidadTotal()}</Text>
                </View>
              )}
            </View>
          );
        },
        tabBarActiveTintColor: "#0077b6",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Inicio" component={BarberiaInfoScreen} />
      <Tab.Screen name="Servicios" component={ServiciosScreen} />
      <Tab.Screen name="Tienda" component={TiendaScreen} />
      <Tab.Screen name="Carrito" component={CarritoScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -10,
    top: -5,
    backgroundColor: "#dc3545",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
