import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const dummyPosts = [
  { id: 1, user: '@coasterfan92', avatar: '🎢', content: '¡Hoy he montado 5 veces seguidas en Red Force! 😱' },
  { id: 2, user: '@adrenalinejunkie', avatar: '🎠', content: 'PortAventura sigue siendo mi parque favorito. ¿Y el vuestro?' },
];

function FeedScreen() {
  const [posts, setPosts] = useState(dummyPosts);
  const [newPost, setNewPost] = useState('');

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post = { id: Date.now(), user: '@thrilluser', avatar: '🎡', content: newPost };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎢 ThrillConnect</Text>
      <TextInput style={styles.input} placeholder="¿Qué experiencia quieres compartir?" value={newPost} onChangeText={setNewPost} />
      <Button title="Publicar" onPress={handlePost} />
      {posts.map((post) => (
        <View key={post.id} style={styles.postCard}>
          <Text style={styles.postUser}>{post.avatar} {post.user}</Text>
          <Text>{post.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

function MapScreen() {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{ latitude: 41.1150, longitude: 1.1616, latitudeDelta: 10, longitudeDelta: 10 }}
    >
      <Marker coordinate={{ latitude: 41.1150, longitude: 1.1616 }} title="PortAventura" description="Parque de atracciones en Tarragona, España" />
      <Marker coordinate={{ latitude: 40.5463, longitude: -3.6429 }} title="Parque Warner" description="Parque temático en Madrid, España" />
    </MapView>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎡 @thrilluser</Text>
      <Text style={styles.subtitle}>Fan de los parques temáticos y las emociones fuertes</Text>
      <Text style={styles.section}>🎯 Parques favoritos:</Text>
      <Text>- PortAventura</Text>
      <Text>- Ferrari Land</Text>
      <Text>- Six Flags Magic Mountain</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Mapa" component={MapScreen} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: 'gray', marginBottom: 10 },
  input: { borderColor: '#ccc', borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  postCard: { backgroundColor: '#f1f1f1', padding: 10, marginVertical: 5, borderRadius: 5 },
  postUser: { fontWeight: 'bold', marginBottom: 3 },
  section: { marginTop: 10, fontWeight: 'bold' },
});