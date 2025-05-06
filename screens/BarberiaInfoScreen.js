import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  Linking, 
  TouchableOpacity, 
  Image, 
  Modal, 
  TextInput, 
  Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const BarberiaInfoScreen = () => {
  const navigation = useNavigation();

  // Estado para el modal, la reseña y la calificación
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleReservar = () => {
    navigation.navigate('Servicios'); 
  };

  const handleSubmitReview = () => {
    if (!review || rating === 0) {
      Alert.alert('Error', 'Por favor, completa la reseña y selecciona una calificación.');
      return;
    }
    Alert.alert('¡Gracias!', 'Tu reseña ha sido enviada.');
    setIsModalVisible(false);
    setReview('');
    setRating(0);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Ícono para abrir el menú */}
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => navigation.toggleDrawer()}
        >
          <Ionicons name="menu" size={40} color="#0077b6" />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>BarberiaShop</Text>
        </View>

        {/* Cuerpo */}
        <ScrollView style={styles.body}>
          {/* Imagen destacada */}
          <Image
            source={{ uri: 'https://estaticosgn-cdn.deia.eus/clip/c7db7ad6-a82d-4051-b106-81c071cd9aff_16-9-discover-aspect-ratio_default_0.jpg' }}
            style={styles.featuredImage}
          />

          {/* Título y descripción */}
          <Text style={styles.title}>¡Bienvenido a BarberiaShop!</Text>
          <Text style={styles.description}>
            En BarberiaShop encontrarás más que un simple corte de cabello. Somos un espacio pensado para tu estilo, comodidad y cuidado personal.
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

          <Text style={styles.sectionTitle}>📅 Horarios</Text>
          <Text style={styles.description}>
            Lunes a Viernes: 9:00 AM - 10:00 PM{'\n'}
            Sábados y Domingos: 9:00 AM - 1:00 PM
          </Text>

          {/* Botón para dejar una reseña */}
          <Text style={styles.sectionTitle}>⭐ Califica nuestros servicios</Text>
          <TouchableOpacity style={styles.ratingButton} onPress={() => setIsModalVisible(true)}>
            <Text style={styles.ratingButtonText}>Dejar una reseña</Text>
          </TouchableOpacity>

          {/* Modal para la reseña */}
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Deja tu reseña</Text>

                {/* Campo de texto para la reseña */}
                <TextInput
                  style={styles.input}
                  placeholder="Escribe tu reseña aquí..."
                  value={review}
                  onChangeText={setReview}
                  multiline
                />

                {/* Selección de calificación */}
                <Text style={styles.modalSubtitle}>Calificación:</Text>
                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => setRating(star)}>
                      <Ionicons
                        name={star <= rating ? 'star' : 'star-outline'}
                        size={30}
                        color="#FFD700"
                      />
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Botones del modal */}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
                  <Text style={styles.submitButtonText}>Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

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
  featuredImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
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

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#0077b6',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },

  cancelButtonText: {
    color: '#fff',
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