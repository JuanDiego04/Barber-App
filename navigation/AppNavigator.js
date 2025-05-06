import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabsNavigator from './BottomTabsNavigator';
import UserProfileScreen from '../screens/UserProfileScreen';
import HistorialScreen from '../screens/HistorialScreen';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Pestañas principales */}
      <Drawer.Screen name="HomeTabs" component={BottomTabsNavigator} />
      {/* Pantalla de perfil */}
      <Drawer.Screen name="UserProfile" component={UserProfileScreen} />
      {/* Pantalla de historial */}
      <Drawer.Screen name="Historial" component={HistorialScreen} />
    </Drawer.Navigator>
  );
}