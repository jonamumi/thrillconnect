import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Parque"
        screenOptions={{
          headerShown: true,
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen
          name="Parque"
          component={HomeScreen}
          options={{ title: '🎡 Bienvenido a ThrillConnect' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
<Stack.Screen
  name="Detalles"
  component={AttractionDetails}
  options={{ title: 'Detalles de la Atracción' }}
/>
