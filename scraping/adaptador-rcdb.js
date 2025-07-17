import { db } from '../firebase/firestore.js';
import { ENV } from '../env.js';
import { setDoc, doc } from 'firebase/firestore';
import fs from 'fs';

// Carga datos scrapeados desde archivo JSON
const rawData = JSON.parse(fs.readFileSync('./rcdb-coasters.json', 'utf-8'));

// Define colección según entorno
const coleccion = ENV.environment === 'production' ? 'atracciones' : 'atracciones-preview';

async function subirCoasters() {
  let contador = 0;

  for (const coaster of rawData) {
    if (!coaster.name || !coaster.park) continue;

    const id = coaster.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const docData = {
      nombre: coaster.name,
      parque: coaster.park,
      ubicacion: coaster.location,
      tipo: coaster.type,
      diseño: coaster.design,
      altura: coaster.height,
      velocidad: coaster.speed,
      longitud: coaster.length,
      duración: coaster.duration,
      inversiones: coaster.inversions,
      ángulo: coaster.angle,
      fabricante: coaster.manufacturer,
      imagen: coaster.image || null,
      fuente: 'RCDB'
    };

    await setDoc(doc(db, coleccion, id), docData);
    console.log(`🎢 Subido: ${coaster.name} (ID: ${id})`);
    contador++;
  }

  console.log(`✅ Subida completa: ${contador} coasters cargados en "${coleccion}"`);
}

subirCoasters();
