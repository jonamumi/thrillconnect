import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const attractions = [
  {
    id: '1',
    name: '🌀 Cyclone Rider',
    description: 'Montaña rusa invertida con loops extremos',
    image: require('../../assets/coaster1.png')
  },
  {
    id: '2',
    name: '🚀 Rocket Drop',
    description: 'Caída libre desde 70 metros de altura',
    image: require('../../assets/coaster2.png')
  },
  {
    id: '3',
    name: '🌊 Aqua Twist',
    description: 'Rafting intergaláctico en velocidad media',
    image: require('../../assets/coaster3.png')
  }
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎡 Bienvenido a ThrillConnect</Text>
      <FlatList
        data={attractions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    paddingTop: 60,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 4
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 8
  }
});
