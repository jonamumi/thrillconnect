import { View, Text, StyleSheet, Image } from 'react-native';

export default function DetalleAtraccion({ route }) {
  const { atraccion } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: atraccion.imagen }} style={styles.imagen} />
      <Text style={styles.nombre}>{atraccion.nombre}</Text>
      <Text style={styles.tipo}>🎢 Tipo: {atraccion.tipo}</Text>
      <Text style={styles.descripcion}>
        🚀 Descripción: Esta atracción ofrece emociones intensas y vistas impresionantes. ¡Una experiencia inolvidable!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff0f0'
  },
  imagen: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 20
  },
  nombre: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6a040f',
    marginBottom: 10
  },
  tipo: {
    fontSize: 18,
    color: '#370617'
  },
  descripcion: {
    fontSize: 16,
    marginTop: 20,
    lineHeight: 22
  }
});
