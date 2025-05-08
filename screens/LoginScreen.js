import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Platform, // Asegúrate de importar Platform
} from "react-native";
import { useAuth } from "../context/AuthContext";

// Función para obtener la URL base
const getBaseUrl = () => {
  const localIp = "186.1.185.15"; // Reemplaza con la IP de tu máquina
  const localhostUrl = "http://localhost/barberapp/api/usuarios";
  const localIpUrl = `http://${localIp}/barberapp/api/usuarios`;

  if (Platform.OS === "android") {
    return localIpUrl; // Android no puede usar localhost
  }
  return localhostUrl; // iOS o navegador pueden usar localhost
};

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await fetch(`${getBaseUrl()}/login.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('user', JSON.stringify(data.usuario)); 
        login(data.usuario); // Pasa los datos del usuario al contexto
        Alert.alert("Inicio de sesión exitoso", `Bienvenido de nuevo, ${data.usuario.nombre}!`);
      } else {
        Alert.alert("Error", data.mensaje || "Error al iniciar sesión.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/login.jpg")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Bienvenido</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>¿No tienes una cuenta? Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0077b6",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    color: "#333",
  },
  button: {
    backgroundColor: "#0077b6",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#0077b6",
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
});
