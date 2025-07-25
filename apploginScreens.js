// app/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Completa todos los campos.");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Usuario autenticado correctamente
      })
      .catch((error) => {
        Alert.alert("Error de inicio de sesión", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ThrillConnect</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
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
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
});
