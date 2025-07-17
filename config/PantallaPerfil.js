import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { auth, logout } from '../firebase/auth';
import { db } from '../firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';

export default function PantallaPerfil({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUsuario(user);
      obtenerPerfil(user.uid);
    }
  }, []);

  const obtenerPerfil = async (uid) => {
    try {
      const docRef = doc(db, 'usuarios', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPerfil(docSnap.data());
      }
    } catch (error) {
      console.error('❌ Error al obtener perfil:', error.message);
    }
  };

  const cerrarSesion = async () => {
    await logout();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: perfil?.foto || 'https://i.imgur.com/placeholder.png' }}
        style={styles.avatar}
      />
      <Text style={styles.nombre}>{perfil?.nombre || 'Visitante'}</Text>
      <Text style={styles.correo}>{usuario?.email}</Text>

      <Button title="🚪 Cerrar sesión" onPress={cerrarSesion} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F5F5F5',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16
  },
  nombre: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8
  },
  correo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24
  }
});
