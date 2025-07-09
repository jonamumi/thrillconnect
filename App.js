import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PerfilUsuario from './screens/PerfilUsuario';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Perfil"
          component={PerfilUsuario}
          options={{ title: 'Perfil de Usuario 🎡' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
