import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabsNavigator from "./BottomTabsNavigator";
import UserProfileScreen from "../screens/UserProfileScreen";
import HistorialScreen from "../screens/HistorialScreen";
import PagoScreen from "../screens/PagoScreen";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import ManageUsersScreen from "../screens/ManageUsersScreen";
import ManageServicesScreen from "../screens/ManageServicesScreen";
import ViewReservationsScreen from "../screens/ViewReservationsScreen";
import StatisticsScreen from "../screens/StatisticsScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function AdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Stack.Screen name="ManageUsers" component={ManageUsersScreen} />
      <Stack.Screen name="ManageServices" component={ManageServicesScreen} />
      <Stack.Screen
        name="ViewReservations"
        component={ViewReservationsScreen}
      />
      <Stack.Screen name="Statistics" component={StatisticsScreen} />
    </Stack.Navigator>
  );
}

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
      {/* Pantalla de pago */}
      <Drawer.Screen
        name="Pago"
        component={PagoScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
      {/* Pantalla de administrador */}
      <Drawer.Screen name="AdminDashboard" component={AdminStack} />
    </Drawer.Navigator>
  );
}
