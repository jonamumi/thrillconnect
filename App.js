import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantallaLogin from './screens/PantallaLogin';
import PantallaRegistro from './screens/PantallaRegistro';
import HomeScreen from './screens/HomeScreen';
import { onAuthChange } from './firebase/auth';

const Stack = createNativeStackNavigator();

export default function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthChange(setUsuario);
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {usuario ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={PantallaLogin} />
            <Stack.Screen name="Registro" component={PantallaRegistro} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
