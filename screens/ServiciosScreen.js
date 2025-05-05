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
  const [fechaAgendada, setFechaAgendada] = useState(new Date()); // Almacena la fecha y hora seleccionada
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null); // Para guardar el servicio a agendar
  const [step, setStep] = useState(null); // 'date' o 'time' para controlar qué picker mostrar

  const handleReservar = (servicio) => {
    agregarAlCarrito(servicio);
  };

  // (handleAgendar) para mostrar el picker y guardar el servicio
  const handleAgendar = (servicio) => {
    setServicioSeleccionado(servicio); // Guarda el servicio
    setFechaAgendada(new Date()); // Reinicia la fecha/hora al abrir
    setStep('date'); // Empieza seleccionando la fecha
    setMostrarPicker(true); // Muestra el selector de fecha/hora
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
        return; // Detiene la ejecución si la hora está fuera de rango
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
          hour12: true, // Muestra en formato AM/PM
      })}`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Oculta el panel y limpia los estados después de confirmar
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
          descripcionDetallada="Incluye lavado, corte y peinado personalizado. El barbero te asesorará según la forma de tu rostro."
          etiqueta='🔥 Popular'
          onReservar={(servicio) => agregarAlCarrito(servicio)}
          onAgendar={(servicio) => handleAgendar(servicio)}
        />
        <ServicioCard
          id="servicio2"
          titulo="Barba"
          precio={15000}
          imagen={require('../assets/barba.png')}
          descripcionDetallada="Contamos con productos especializados y técnica para lograr el mejor look en tu barba."
          onReservar={(servicio) => agregarAlCarrito(servicio)}
          onAgendar={(servicio) => handleAgendar(servicio)}
        />
        <ServicioCard
          id="servicio3"
          titulo="Limpieza Facial"
          precio={25000}
          imagen={require('../assets/facial.png')}
          descripcionDetallada="Ideal para eliminar impurezas, hidratar tu piel y dejar un rostro fresco."
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
               minimumDate={new Date()} // No permitir agendar en el pasado
               maximumDate={getMaxDate()} // Permitir hasta 30 días en el futuro
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
