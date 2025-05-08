import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PagoScreen = ({ route, navigation }) => {
  const { total } = route.params;
  const [metodoPago, setMetodoPago] = useState(null);
  const [mostrarFormularioTarjeta, setMostrarFormularioTarjeta] =
    useState(false);
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [fechaExpiracion, setFechaExpiracion] = useState("");
  const [cvv, setCvv] = useState("");
  const [direccion, setDireccion] = useState("");
  const [recogerEnTienda, setRecogerEnTienda] = useState(false);
  const [telefono, setTelefono] = useState("");
  const [notas, setNotas] = useState("");


  const totalNumerico =
    typeof total === "string" ? parseFloat(total.replace(/,/g, "")) : total;

  const handleConfirmarPago = () => {
    if (!metodoPago) {
      Alert.alert("Error", "Por favor, selecciona un método de pago.");
      return;
    }

    if (
      metodoPago === "Tarjeta de Crédito" &&
      (!numeroTarjeta || !fechaExpiracion || !cvv)
    ) {
      Alert.alert(
        "Error",
        "Por favor, completa todos los datos de la tarjeta."
      );
      return;
    }

    if (!recogerEnTienda && !direccion) {
      Alert.alert("Error", "Por favor, ingresa una dirección o selecciona recoger en tienda.");
      return;
    }

    const detallesCompra = {
      metodoPago,
      direccion: recogerEnTienda ? "Recoger en tienda" : direccion,
      telefono,
      notas,
    };

    console.log("Detalles de la compra:", detallesCompra);
    Alert.alert(
      "Pago Confirmado",
      `Has pagado $${totalNumerico.toFixed(2)} usando ${metodoPago}. ¡Gracias por tu compra!`,
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("HomeTabs"),
        },
      ]
    );
  };

  const handleSeleccionarMetodoPago = (metodo) => {
    setMetodoPago(metodo);
    setMostrarFormularioTarjeta(metodo === "Tarjeta de Crédito");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#DAA520" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Pago</Text>
          </View>

          {/* Total */}
          <Text style={styles.totalText}>Total: ${totalNumerico.toFixed(2)}</Text>

          {/* Dirección */}
          {!recogerEnTienda && (
            <TextInput
              style={styles.input}
              placeholder="Dirección de envío"
              value={direccion}
              onChangeText={setDireccion}
            />
          )}

          {/* Recoger en tienda */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setRecogerEnTienda(!recogerEnTienda)}
          >
            <View
              style={[styles.checkbox, recogerEnTienda && styles.checkboxChecked]}
            />
            <Text style={styles.checkboxLabel}>Recoger en tienda física</Text>
          </TouchableOpacity>

          {/* Teléfono */}
          <TextInput
            style={styles.input}
            placeholder="Teléfono de contacto"
            keyboardType="phone-pad"
            value={telefono}
            onChangeText={setTelefono}
          />

          {/* Notas adicionales */}
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Notas adicionales (opcional)"
            value={notas}
            onChangeText={setNotas}
            multiline
          />

          {/* Métodos de pago */}
          <TouchableOpacity
            style={[
              styles.paymentOption,
              metodoPago === "Tarjeta de Crédito" && styles.selectedOption,
            ]}
            onPress={() => handleSeleccionarMetodoPago("Tarjeta de Crédito")}
          >
            <Text style={styles.paymentText}>Tarjeta de Crédito</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              metodoPago === "PayPal" && styles.selectedOption,
            ]}
            onPress={() => handleSeleccionarMetodoPago("PayPal")}
          >
            <Text style={styles.paymentText}>PayPal</Text>
          </TouchableOpacity>

          {/* Formulario para tarjeta de crédito */}
          {mostrarFormularioTarjeta && (
            <View style={styles.cardForm}>
              <TextInput
                style={styles.input}
                placeholder="Número de Tarjeta"
                keyboardType="numeric"
                value={numeroTarjeta}
                onChangeText={setNumeroTarjeta}
              />
              <TextInput
                style={styles.input}
                placeholder="Fecha de Expiración (MM/AA)"
                keyboardType="numeric"
                value={fechaExpiracion}
                onChangeText={setFechaExpiracion}
              />
              <TextInput
                style={styles.input}
                placeholder="CVV"
                keyboardType="numeric"
                secureTextEntry
                value={cvv}
                onChangeText={setCvv}
              />
            </View>
          )}

          {/* Botones de acción */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmarPago}
            >
              <Text style={styles.confirmButtonText}>Confirmar Compra</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PagoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#DAA520",
    top: 10,
  },
  totalText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  paymentOption: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#DAA520",
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "#1E1E1E",
  },
  selectedOption: {
    backgroundColor: "#DAA520",
  },
  paymentText: {
    fontSize: 18,
    color: "#fff",
  },
  cardForm: {
    marginTop: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 3,
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "#28a745",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#25D366",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 10,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});