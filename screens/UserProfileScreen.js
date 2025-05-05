import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; // Importar expo-image-picker
import { useAuth } from '../context/AuthContext';

export default function UserProfileScreen() {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // Estado para la imagen de perfil

  // Cargar datos del usuario desde AsyncStorage
  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setProfileImage(parsedUser.profileImage || null); // Cargar la imagen de perfil si existe
        }
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
      }
    };

    cargarUsuario();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('user');
            logout();
            navigation.navigate('Login');
          },
        },
      ]
    );
  };

  const handleSelectImage = async () => {
    // Pedir permisos para acceder a la galería
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la galería para seleccionar una imagen.');
      return;
    }

    // Abrir la galería para seleccionar una imagen
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      setProfileImage(selectedImage); // Actualizar el estado local
      await saveProfileImage(selectedImage); // Guardar la imagen en AsyncStorage
    }
  };

  const saveProfileImage = async (imageUri) => {
    try {
      const updatedUser = { ...user, profileImage: imageUri };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser)); // Guardar en AsyncStorage
      setUser(updatedUser); // Actualizar el estado local
      Alert.alert('Imagen actualizada', 'Tu imagen de perfil ha sido actualizada correctamente.');
    } catch (error) {
      console.error('Error al guardar la imagen de perfil:', error);
      Alert.alert('Error', 'No se pudo guardar la imagen de perfil.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header personalizado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#DAA520" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Perfil de Usuario</Text>
      </View>

      {/* Imagen de perfil y datos del usuario */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleSelectImage}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../assets/avatar.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        {user ? (
          <>
            <Text style={styles.nameText}>{user.nombre}</Text>
            <Text style={styles.emailText}>{user.email}</Text>
          </>
        ) : (
          <Text style={styles.loadingText}>Cargando datos del usuario...</Text>
        )}
      </View>

      {/* Opciones de perfil */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={() => setIsEditing(true)}>
          <Text style={styles.optionButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => setIsChangingPassword(true)}>
          <Text style={styles.optionButtonText}>Cambiar Contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
    marginTop: 22,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DAA520',
    marginTop: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    color: '#555',
  },
  loadingText: {
    fontSize: 16,
    color: '#555',
  },
  optionsContainer: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  optionButton: {
    backgroundColor: '#0077b6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});