import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TiendaScreen from '../screens/TiendaScreen';
import CarritoScreen from '../screens/CarritoScreen';
import AgendarCitaScreen from '../screens/AgendarCitaScreen';
import { Stack } from 'expo-router';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Tienda" component={TiendaScreen} />
        <Tab.Screen name="Carrito" component={CarritoScreen} />
        <Stack.Screen
        name='AgendarCita'
        component={AgendarCitaScreen}
        options={{title: 'Agendar Cita'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
