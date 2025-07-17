import fetch from 'node-fetch';
import { parseHTML } from './parseHTML.js';
import { ENV } from '../env.js';
import { db } from '../firebase/firestore.js';
import { setDoc, doc } from 'firebase/firestore';

async function ejecutarScrapingYSubida() {
  try {
    const url = `${ENV.apiUrl}/parques.html`;
    const res = await fetch(url);
    const html = await res.text();

    const atracciones = parseHTML(html);
    const coleccion = ENV.environment === 'production' ? 'atracciones' : 'atracciones-preview';

    let contador = 0;

    for (const atraccion of atracciones) {
      if (!atraccion.nombre) {
        console.warn('⚠️ Atracción sin nombre, omitida');
        continue;
      }

      const id = atraccion.nombre.toLowerCase().replace(/\s+/g, '-');
      await setDoc(doc(db, coleccion, id), atraccion);
      console.log(`✅ Subida: ${atraccion.nombre} (ID: ${id})`);
      contador++;
    }

    console.log(`🎉 Subida completa: ${contador} atracciones cargadas en "${coleccion}"`);
  } catch (error) {
    console.error('❌ Error en el scraping:', error.message);
  }
}

ejecutarScrapingYSubida();
