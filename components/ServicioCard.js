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
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importar AsyncStorage

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es obligatorio"),
  correo: Yup.string()
    .email("Correo inválido")
    .required("El correo es obligatorio"),
});

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
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const imagenAnimada = useRef(new Animated.Value(160)).current;

  const toggleExpandir = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    // Animar la imagen al expandir
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
    } catch (error) {
      console.error("Error al guardar en el historial:", error);
    }
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
        <TouchableOpacity
          style={styles.botonReservar}
          onPress={() => {
            const compra = { id, nombre: titulo, precio };
            onReservar(compra);
            guardarEnHistorial(compra); // Guardar en el historial
          }}
        >
          <Text style={styles.textBoton}>Comprar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonAgendar}
          onPress={() => setMostrarFormulario(!mostrarFormulario)}
        >
          <Text style={styles.textBotonAgendar}>Agendar Cita</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Formulario para agendar cita */}
      {mostrarFormulario && (
        <Formik
          initialValues={{ nombre: "", correo: "", fecha: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const reserva = { id, nombre: titulo, precio, ...values };
            onAgendar(reserva);
            guardarEnHistorial(reserva); // Guardar en el historial
            setMostrarFormulario(false); // Ocultar formulario después de enviar
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formulario}>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                onChangeText={handleChange("nombre")}
                onBlur={handleBlur("nombre")}
                value={values.nombre}
              />
              {touched.nombre && errors.nombre && (
                <Text style={styles.errorTexto}>{errors.nombre}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                onChangeText={handleChange("correo")}
                onBlur={handleBlur("correo")}
                value={values.correo}
              />
              {touched.correo && errors.correo && (
                <Text style={styles.errorTexto}>{errors.correo}</Text>
              )}

              <TouchableOpacity
                style={styles.botonEnviar}
                onPress={handleSubmit}
              >
                <Text style={styles.textBoton}>Enviar</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      )}
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
  formulario: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  errorTexto: {
    color: "#dc3545",
    fontSize: 12,
    marginBottom: 10,
  },
  botonEnviar: {
    backgroundColor: "#0077b6",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});
