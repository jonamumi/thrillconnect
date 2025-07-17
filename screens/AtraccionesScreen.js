import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firestore';

export default function AtraccionesScreen() {
  const [atracciones, setAtracciones] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const querySnapshot = await getDocs(collection(db, 'atracciones'));
      const datos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAtracciones(datos);
    };
    obtenerDatos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagen }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.tipo}>🎢 Tipo: {item.tipo}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🎠 Atracciones del Parque</Text>
      <FlatList
        data={atracciones}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff8f0', paddingTop: 20 },
  titulo: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#6a040f' },
  lista: { paddingHorizontal: 20 },
  card: { backgroundColor: '#fcd5ce', borderRadius: 16, marginBottom: 15, overflow: 'hidden', elevation: 3 },
  image: { height: 180, width: '100%' },
  info: { padding: 10 },
  nombre: { fontSize: 20, fontWeight: 'bold', color: '#370617' },
  tipo: { fontSize: 16, color: '#6c757d' }
});
