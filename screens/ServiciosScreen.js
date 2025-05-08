// screens/ServiciosScreen.js
import React, { useContext, useState } from 'react';
import ServicioCard from '../components/ServicioCard';
import { CarritoContext } from '../context/CarritoContext';
import { View, Text, ScrollView, StyleSheet, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function ServiciosScreen() {
  const { agregarAlCarrito } = useContext(CarritoContext);
  const navigation = useNavigation();

  // Estados para el selector de fecha/hora, el servicio seleccionado y el paso actual
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [fechaAgendada, setFechaAgendada] = useState(new Date()); 
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null); 
  const [step, setStep] = useState(null); 

  const handleReservar = (servicio) => {
    agregarAlCarrito(servicio);
  };

  // (handleAgendar) para mostrar el picker y guardar el servicio
  const handleAgendar = (servicio) => {
    setServicioSeleccionado(servicio); 
    setFechaAgendada(new Date()); 
    setStep('date'); 
    setMostrarPicker(true); 
  };

  // Función para manejar el cambio en el DateTimePicker
  const onChangePicker = (event, selectedValue) => {
    if (event.type === 'dismissed') {
      // Si el usuario cancela el picker nativo (ej. botón atrás en Android)
      setMostrarPicker(false);
      setServicioSeleccionado(null);
      setStep(null);
      return;
    }

    const currentValue = selectedValue || fechaAgendada;
    setFechaAgendada(currentValue);
    // Si estamos seleccionando la hora, cerrar el picker automáticamente
     if (step === 'time') {
      setMostrarPicker(false); 
    } else {
      setStep('time'); 
    }

  };

  

  // Función para pasar de la selección de fecha a la de hora
  const pasarASelccionHora = () => {
      const ahora = new Date();
      const hoySinHora = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
      const fechaSeleccionadaSinHora = new Date(fechaAgendada.getFullYear(), fechaAgendada.getMonth(), fechaAgendada.getDate());

      if (fechaSeleccionadaSinHora < hoySinHora) {
          Alert.alert('Fecha inválida', 'No puedes agendar citas en el pasado.');
          return;
      }

      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 30);
      maxDate.setHours(23, 59, 59, 999);

      if (fechaAgendada > maxDate) {
          Alert.alert('Fecha inválida', 'Solo puedes agendar citas hasta con 30 días de anticipación.');
          return;
      }

      setStep('time');
  };


  // Función para confirmar la cita
  const confirmarCita = () => {
    if (!servicioSeleccionado || !fechaAgendada) {
      Alert.alert('Error', 'No se ha seleccionado un servicio o fecha/hora.');
      return;
    }

    // Validación de Rango de Hora (7 AM a 11 PM) 
    const hours = fechaAgendada.getHours();
    if (hours < 7 || hours > 23) {
        Alert.alert('Hora inválida', 'Por favor, selecciona una hora entre las 7 AM y las 11 PM.');
        return; 
    }

    // Si todas las validaciones son exitosas, muestra la alerta de confirmación 
    Alert.alert(
      'Cita Agendada',
      `Tu cita para "${servicioSeleccionado.nombre}" ha sido agendada para:\n${fechaAgendada.toLocaleString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true, 
      })}`,
      [
        {
          text: 'OK',
          onPress: () => {
            setMostrarPicker(false);
            setServicioSeleccionado(null);
            setStep(null);
          },
        },
      ]
    );
  };

  // Calcula la fecha máxima permitida (hoy + 30 días)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate;
  };


  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.headerTitle}>Nuestros Servicios</Text>
      </View>

      <ScrollView >
        <ServicioCard
          id="servicio1"
          titulo="Corte de Cabello"
          precio={20000}
          imagen={require('../assets/corte.png')}
          descripcionDetallada="Incluye un lavado relajante con productos premium para preparar tu cabello, seguido de un corte personalizado adaptado a la forma de tu rostro y estilo deseado. Nuestros barberos están capacitados en las últimas tendencias, como el corte fade (degradado), undercut, crop texturizado, y estilos clásicos como el pompadour o el side part. Además, ofrecemos personalización completa para que el corte refleje tu personalidad, ya sea un look moderno, casual o profesional. Finalizamos con un peinado estilizado utilizando productos de alta calidad para garantizar un acabado impecable."
          onReservar={(servicio) => agregarAlCarrito(servicio)}
          onAgendar={(servicio) => handleAgendar(servicio)}
        />
        <ServicioCard
          id="servicio2"
          titulo="Barba"
          precio={15000}
          imagen={require('../assets/barba.png')}
          descripcionDetallada="Transforma tu barba con nuestro servicio especializado que incluye un diseño y perfilado personalizado adaptado a la forma de tu rostro. Utilizamos productos premium para hidratar y suavizar el vello facial, asegurando un acabado impecable. Nuestros barberos están capacitados en las técnicas más modernas, como el perfilado con navaja para líneas definidas, degradados en la barba (beard fade) y estilos clásicos como la barba completa o el estilo Van Dyke. Además, ofrecemos personalización completa para lograr un look que refleje tu personalidad, ya sea un estilo rústico, elegante o moderno. Finalizamos con aceites y bálsamos de alta calidad para nutrir tu barba y dejarla con un aroma fresco y masculino."
          onReservar={(servicio) => agregarAlCarrito(servicio)}
          onAgendar={(servicio) => handleAgendar(servicio)}
        />
        <ServicioCard
          id="servicio3"
          titulo="Limpieza Facial"
          precio={25000}
          imagen={require('../assets/facial.png')}
          descripcionDetallada="Ideal para eliminar impurezas, hidratar tu piel y revitalizar tu rostro. Nuestro servicio de limpieza facial incluye una exfoliación profunda para remover células muertas, extracción de puntos negros y tratamiento hidratante con productos de alta calidad. Además, aplicamos mascarillas personalizadas según tu tipo de piel (seca, grasa o mixta) para garantizar un cuidado óptimo. Finalizamos con un masaje relajante que estimula la circulación y deja tu piel fresca, suave y rejuvenecida. Perfecto para combatir los efectos del estrés, la contaminación y el envejecimiento prematuro."
          onReservar={(servicio) => agregarAlCarrito(servicio)}
          onAgendar={(servicio) => handleAgendar(servicio)}
        />
      </ScrollView>

      {/* Renderiza el panel de selección condicionalmente */}
      {mostrarPicker && (
        <View style={style.pickerContainer}>
           <Text style={style.pickerTitle}>
             {step === 'date' ? 'Selecciona la fecha' : 'Selecciona la hora'} para:
           </Text>
           <Text style={style.servicioNombre}>{servicioSeleccionado?.nombre}</Text>

           {/* Renderiza el picker de fecha si step es 'date' */}
           {step === 'date' && (
             <DateTimePicker
               value={fechaAgendada}
               mode="date" // Modo fecha
               display={Platform.OS === 'ios' ? 'spinner' : 'default'}
               onChange={onChangePicker}
               minimumDate={new Date()} 
               maximumDate={getMaxDate()} 
             />
           )}

           {/* Renderiza el picker de hora si step es 'time' */}
           {step === 'time' && (
             <DateTimePicker
               value={fechaAgendada} 
               mode="time" 
               display={Platform.OS === 'ios' ? 'spinner' : 'default'}
               onChange={onChangePicker}
             />
           )}

            {/* Muestra la fecha y hora seleccionadas */}
           {step === 'time' && (
             <>
                <Text style={style.fechaSeleccionadaTexto}>
                   Fecha: {fechaAgendada.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                </Text>
                 <Text style={style.horaSeleccionadaTexto}>
                   Hora: {fechaAgendada.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true })}
                </Text>
             </>
           )}


           {/* Botones de navegación entre pasos y confirmar */}
           {step === 'date' && (
               <TouchableOpacity onPress={pasarASelccionHora} style={style.botonConfirmarCita}>
                 <Text style={style.textoBotonConfirmar}>Seleccionar Hora</Text>
               </TouchableOpacity>
           )}

           {step === 'time' && (
               <TouchableOpacity onPress={confirmarCita} style={style.botonConfirmarCita}>
                 <Text style={style.textoBotonConfirmar}>Confirmar Cita</Text>
               </TouchableOpacity>
           )}

           {/* Botón para cancelar */}
           <TouchableOpacity onPress={() => {
              setMostrarPicker(false);
              setServicioSeleccionado(null);
              setStep(null); // Reinicia el paso al cancelar
           }} style={style.botonCancelar}>
             <Text style={style.textoBotonCancelar}>Cancelar</Text>
           </TouchableOpacity>
        </View>
      )}

    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  header: {
    paddingTop: 25,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    color: '#DAA520',
    fontSize: 24,
    fontWeight: 'bold',
    top: 5,
  },
  scrollContainer: {
    padding: 10,
  },
  
  pickerContainer: {
    position: 'absolute', 
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  servicioNombre: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
    textAlign: 'center',
  },
  fechaSeleccionadaTexto: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  horaSeleccionadaTexto: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  botonConfirmarCita: { 
    backgroundColor: '#28a745', 
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 15,
    alignItems: 'center',
  },
  textoBotonConfirmar: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
   botonCancelar: {
    backgroundColor: '#dc3545', 
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
    alignItems: 'center',
  },
  textoBotonCancelar: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
