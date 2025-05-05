// components/ServicioCard.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

if (Platform.OS === 'android') {
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

    // Animar la imagen al expandir
    Animated.timing(imagenAnimada, {
      toValue: expandido ? 160 : 450, // tamaño normal : expandido
      duration: 300,
      useNativeDriver: false,
    }).start();

    setExpandido(!expandido);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {etiqueta && (
  <View style={styles.etiqueta}>
    <Text style={styles.etiquetaTexto}>{etiqueta}</Text>
  </View>
)}

    <TouchableOpacity onPress={toggleExpandir} activeOpacity={0.9} style={styles.card}>
      <Animated.Image
        source={imagen}
        style={[styles.imagen, { height: imagenAnimada }]}
        resizeMode="cover"
      />
      <Text style={styles.titulo}>{titulo}</Text>
      {expandido && (
        <Text style={styles.descripcionDetallada}>{descripcionDetallada}</Text>
      )}
      <TouchableOpacity 
        style={styles.botonReservar}
         onPress={() =>
            onReservar({
              id,
              nombre: titulo,
              precio,
            })

         }
      >
      <Text style={styles.textBoton}>Comprar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.botonAgendar}
        onPress={() =>
          onAgendar({
          id,
          nombre: titulo,
          precio,
          })
          }
      >
      <Text style={styles.textBotonAgendar}>Agendar Cita</Text>
       </TouchableOpacity>

    </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:{
  backgroundColor: '#1E1E1E',
 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  imagen: {
    width: '100%',
    borderRadius: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  botonAgendar: {
    backgroundColor: '#28a745', // verde bonito para agendar
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 8,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  textBotonAgendar: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  

  botonReservar:{
    backgroundColor: '#0077b6',
    paddingVertical: 10,
    paddingHorizontal:20,
    borderRadius: 20,
    marginTop: 12,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,

  },
  textBoton: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descripcionDetallada: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
  },
  etiqueta: {
    backgroundColor: '#FF5252',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  etiquetaTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
});

