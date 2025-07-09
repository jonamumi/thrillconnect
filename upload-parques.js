const admin = require('firebase-admin');
const fs = require('fs');

// Asegúrate de que el nombre del archivo coincida con tu archivo de credenciales
const serviceAccount = require('./firebase-credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const parques = JSON.parse(fs.readFileSync('parques.json', 'utf8'));

async function uploadParques() {
  for (const parque of parques) {
    await db.collection('parques').add(parque);
    console.log(`Subido: ${parque.nombre}`);
  }
  console.log('Todos los parques subidos.');
  process.exit();
}

uploadParques();