import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

export default function PantallaImportacion() {
  const [progreso, setProgreso] = useState('');
  const [cargando, setCargando] = useState(false);

  const lanzarImportacion = async () => {
    setCargando(true);
    setProgreso('🚀 Comenzando importación desde RCDB...');

    try {
      const res = await fetch('https://tu-backend.com/api/importar-coasters');
      const resultado = await res.json();
      setProgreso(`✅ Importación completa: ${resultado.subidos} coasters subidos`);
    } catch (error) {
      setProgreso(`❌ Error: ${error.message}`);
    }

    setCargando(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎢 Importar coasters desde RCDB</Text>
      <Button title="💥 Lanzar importación" onPress={lanzarImportacion} disabled={cargando} />
      {cargando && <ActivityIndicator size="large" color="#f00" style={{ marginTop: 16 }} />}
      <Text style={styles.log}>{progreso}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FEF9F2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    textAlign: 'center'
  },
  log: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#444'
  }
});
