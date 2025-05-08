import React, { useContext, useState, useEffect } from 'react';
import ServicioCard from '../components/ServicioCard';
import { CarritoContext } from '../context/CarritoContext';
import { View, Text, ScrollView, StyleSheet, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function ServiciosScreen() {
  const imagenesServicios = {
    "Corte básico": require("../assets/corte.png"),
    "Barba": require("../assets/barba.png"),
    "Limpieza facial": require("../assets/facial.png"),
  };

  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const getBaseUrl = () => {
    const localIp = "192.168.x.x"; // Reemplaza con la IP de tu máquina
    const localhostUrl = "http://localhost/barberapp/api/servicios";
    const localIpUrl = `http://${localIp}/barberapp/api/servicios`;

    if (Platform.OS === "android") {
      return localIpUrl; // Android no puede usar localhost
    }
    return localhostUrl; // iOS o navegador pueden usar localhost
  };

  const fetchServicios = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/obtener.php`);
      if (!response.ok) {
        throw new Error("Error al obtener los servicios");
      }
      const data = await response.json();

      // Asigna las imágenes a los servicios
      const serviciosConImagenes = data.map((servicio) => ({
        ...servicio,
        imagen: imagenesServicios[servicio.nombre] || require("../assets/default.png"), // Usa una imagen por defecto si no hay mapeo
      }));

      setServicios(serviciosConImagenes);
    } catch (error) {
      console.error("Error al obtener los servicios:", error);
      Alert.alert("Error", "No se pudieron cargar los servicios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicios();
  }, []);

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

      {loading ? (
        <Text style={style.loadingText}>Cargando servicios...</Text>
      ) : (
        <ScrollView>
          {servicios.map((servicio) => (
            <ServicioCard
              key={servicio.id}
              id={servicio.id}
              titulo={servicio.nombre}
              precio={servicio.precio}
              imagen={servicio.imagen}
              descripcionDetallada={servicio.descripcion}
              onReservar={(servicio) => agregarAlCarrito(servicio)}
              onAgendar={(servicio) => handleAgendar(servicio)}
            />
          ))}
        </ScrollView>
      )}

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
