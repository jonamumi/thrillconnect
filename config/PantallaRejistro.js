import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image } from 'react-native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import firebaseConfig from '../firebase/firebaseConfig';

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export default function PantallaRegistro({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState(null);

  const registrarUsuario = async () => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Guardar perfil en Firestore
      await setDoc(doc(db, 'usuarios', uid), {
        nombre,
        correo: email,
        foto: 'https://i.imgur.com/avatar.png', // puedes permitir que el usuario suba una imagen luego
        parqueFavorito: null
      });

      console.log('✅ Perfil guardado en Firestore');
      navigation.replace('Home');
    } catch (e) {
      setError('❌ Error al registrar: ' + e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/registro-banner.png')} style={styles.banner} />
      <Text style={styles.title}>🎠 Registro en ThrillConnect</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        onChangeText={setNombre}
        value={nombre}
      />
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

      <Button title="🎡 Crear cuenta" onPress={registrarUsuario} />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F0F8FF',
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
    borderColor: '#A0C4FF',
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center'
  }
});
