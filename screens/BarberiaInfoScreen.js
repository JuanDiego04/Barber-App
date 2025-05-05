import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Linking, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const BarberiaInfoScreen = () => {
  const navigation = useNavigation();

  const handleReservar = () => {
    alert('Reserva realizada (esto es una demo)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Ícono para abrir el menú o navegar */}
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => navigation.toggleDrawer()} // Cambia 'UserProfile' por la pantalla deseada
        >
          <Ionicons name="menu" size={40} color="#0077b6" />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>BarberiaShop</Text>
        </View>

        {/* Cuerpo */}
        <ScrollView style={styles.body}>
          <Text style={styles.title}>¡Bienvenido a BarberiaShop!</Text>
          <Text style={styles.description}>
            En BarberiaShop encontrarás más que un simple corte de cabello. Somos un espacio pensado para tu estilo, comodidad y cuidado personal. Ofrecemos servicios profesionales de barbería, desde cortes clásicos y modernos, hasta afeitados con toalla caliente y cuidado de la barba. Además, podrás explorar nuestra tienda exclusiva de productos para el cuidado masculino.
          </Text>

          {/* ¿Por qué elegirnos? */}
          <Text style={styles.sectionTitle}>🌟 ¿Por qué elegirnos?</Text>
          <Text style={styles.description}>
            ✔️ Barberos con experiencia y pasión por su trabajo.{'\n'}
            ✔️ Ambiente cómodo y relajante.{'\n'}
            ✔️ Productos de alta calidad para el cuidado masculino.{'\n'}
            ✔️ Atención personalizada para cada cliente.
          </Text>

          {/* Nuestros Servicios */}
          <Text style={styles.sectionTitle}>💈 Nuestros Servicios</Text>
          <Text style={styles.description}>
            ✂️ Cortes clásicos y modernos{'\n'}
            🧔 Diseño y arreglo de barba{'\n'}
            🔥 Afeitado con toalla caliente{'\n'}
            🧼 Limpieza facial y cuidado de la piel{'\n'}
            💇 Atención personalizada para niños y adultos
          </Text>

          {/* Testimonios */}
          <Text style={styles.sectionTitle}>🗣️ Lo que dicen nuestros clientes</Text>
          <Text style={styles.description}>
            "¡El mejor corte de mi vida! El personal es muy amable y profesional."{'\n'}
            - Juan P.{'\n\n'}
            "Me encanta el ambiente y la atención personalizada. ¡Recomendado!"{'\n'}
            - María G.
          </Text>

          {/* Horarios de Atención */}
          <Text style={styles.sectionTitle}>🕒 Horarios de Atención</Text>
          <Text style={styles.description}>
            Lunes a Viernes: 8:00 AM - 11:00 PM{'\n'}
            Sabados y Domingos: 9:00 AM - 10:00 PM{'\n'}
          </Text>

          {/* Promociones */}
          <Text style={styles.sectionTitle}>🎉 Promociones</Text>
          <Text style={styles.description}>
            💵 10% de descuento en tu primera visita.{'\n'}
            👬 Trae a un amigo y ambos obtienen un 15% de descuento.{'\n'}
            🎁 Compra productos por más de $50,000 y recibe un regalo sorpresa.
          </Text>

          <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>
          <Text style={styles.description}>
            <Text style={{ fontWeight: 'bold' }}>¿Cuánto tiempo dura un corte de cabello?</Text>{'\n'}
            Un corte de cabello promedio dura entre 30 y 45 minutos.{'\n\n'}
            <Text style={{ fontWeight: 'bold' }}>¿Qué métodos de pago aceptan?</Text>{'\n'}
            Aceptamos efectivo, tarjetas de crédito/débito y pagos por transferencia.{'\n\n'}
            <Text style={{ fontWeight: 'bold' }}>¿Es necesario reservar con anticipación?</Text>{'\n'}
            Recomendamos reservar para garantizar tu lugar, pero también aceptamos clientes sin cita.
          </Text>

          <Text style={styles.sectionTitle}>⭐ Califica nuestros servicios</Text>
          <TouchableOpacity style={styles.ratingButton} onPress={() => alert('¡Gracias por tu calificación!')}>
            <Text style={styles.ratingButtonText}>Dejar una reseña</Text>
          </TouchableOpacity>

          {/* Botones */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.reserveButton} onPress={handleReservar}>
              <Text style={styles.reserveButtonText}>Reservar ahora</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.whatsappButton}
              onPress={() => Linking.openURL('https://wa.me/1234567890')}
            >
              <Text style={styles.whatsappButtonText}>Contáctanos por WhatsApp</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>📍 Calle Ficticia 123 | ☎ 123-456-7890</Text>
            <Text style={styles.footerText}>Síguenos en @BarberiaShop</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default BarberiaInfoScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  menuIcon: {
    position: 'absolute',
    top: 26, 
    left: 20, 
    zIndex: 10, 
  },
  header: {
    padding: 20,
    backgroundColor: '#222',
    alignItems: 'center',
  },
  headerText: {
    color: '#DAA520',
    fontSize: 22,
    fontWeight: 'bold',
    top: 10,
  },
  body: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
    color: '#DAA520',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#ddd',
    lineHeight: 22,
  },
  ratingButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
  },
  ratingButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginVertical: 20,
  },
  reserveButton: {
    backgroundColor: '#DAA520',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  whatsappButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    backgroundColor: '#2C2C2C',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#ffffff',
  },
});