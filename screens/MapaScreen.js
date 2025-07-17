import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function MapaScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>🗺 Mapa del Parque</Text>

      <Image
        source={{ uri: 'https://i.imgur.com/kX8yU9j.png' }} // Puedes cambiar esta imagen por la del parque real
        style={styles.mapa}
        resizeMode="contain"
      />

      <Text style={styles.descripcion}>
        Explora las zonas temáticas, atracciones principales y rutas recomendadas. Próximamente podrás tocar cada zona para ver más información.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fefae0',
    alignItems: 'center'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a040f',
    marginBottom: 20
  },
  mapa: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 20
  },
  descripcion: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    color: '#333'
  }
});
