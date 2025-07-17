import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function AttractionDetails({ route }) {
  const { attraction } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: attraction.image }} style={styles.image} />
      <Text style={styles.name}>{attraction.name}</Text>
      <Text style={styles.description}>{attraction.description}</Text>
    </View>
  );
}

const styles = { /* diseño similar, más amplio */ };
