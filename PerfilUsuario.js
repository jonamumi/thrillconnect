import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const usuario = {
  id: "usuario123",
  nombre: "Roberto",
  email: "roberto@email.com",
  fotoPerfil: "https://i.imgur.com/wvxPV9S.png", // reemplaza con tu imagen real
  visitados: {
    parques: ["Parque Mágico", "Aventura Extrema"],
    coasters: ["Dragón Volador", "Tormenta de Acero"]
  },
  ranking: 12
};

export default function PerfilUsuario() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: usuario.fotoPerfil }} style={styles.imagen} />
      <Text style={styles.nombre}>{usuario.nombre}</Text>
      <Text style={styles.email}>{usuario.email}</Text>
      <Text style={styles.ranking}>🎖 Ranking: {usuario.ranking}</Text>

      <Text style={styles.seccion}>🌍 Parques visitados:</Text>
      {usuario.visitados.parques.map((p, i) => (
        <Text key={i}>🏞 {p}</Text>
      ))}

      <Text style={styles.seccion}>🎢 Montañas rusas:</Text>
      {usuario.visitados.coasters.map((c, i) => (
        <Text key={i}>🎠 {c}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fefae0'
  },
  imagen: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15
  },
  nombre: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#001858'
  },
  email: {
    fontSize: 16,
    color: '#555'
  },
  ranking: {
    fontSize: 18,
    marginVertical: 10
  },
  seccion: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8e1c26',
    alignSelf: 'flex-start'
  }
});
