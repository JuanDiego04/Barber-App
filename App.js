import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './context/AuthContext';
import { CarritoProvider } from './context/CarritoContext';
import AuthNavigator from './navigation/AuthNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <CarritoProvider>
          <NavigationContainer>
            <AuthNavigator />
          </NavigationContainer>
        </CarritoProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}