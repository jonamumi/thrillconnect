import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image } from 'react-native';
import { login, onAuthChange } from '../firebase/auth';

export default function PantallaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    onAuthChange((user) => {
      if (user) {
        navigation.replace('Home');
      }
    });
  }, []);

  const iniciarSesion = async () => {
    try {
      setError(null);
      await login(email, password);
    } catch (e) {
      setError('Credenciales inválidas o usuario no registrado.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/login-banner.png')} style={styles.banner} />
      <Text style={styles.title}>🎟️ Acceso a ThrillConnect</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Button title="🎢 Entrar al parque" onPress={iniciarSesion} />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FFF8ED',
    flex: 1,
    justifyContent: 'center'
  },
  banner: {
    width: '100%',
    height: 140,
    resizeMode: 'contain',
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600'
  },
  input: {
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#DABF9E',
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center'
  }
});
<Button title="¿No tienes cuenta? Regístrate" onPress={() => navigation.navigate('Registro')} />
