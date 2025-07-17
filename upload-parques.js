import fetch from 'node-fetch';
import { parseHTML } from './parseHTML.js';
import { ENV } from '../env.js';
import { db } from '../firebase/firestore.js';
import { setDoc, doc } from 'firebase/firestore';

async function ejecutarScrapingYSubida() {
  const url = `${ENV.apiUrl}/parques.html`;
  const res = await fetch(url);
  const html = await res.text();
  const atracciones = parseHTML(html);
  const coleccion = ENV.environment === 'production' ? 'atracciones' : 'atracciones-preview';

  for (const atraccion of atracciones) {
    const id = atraccion.nombre.toLowerCase().replace(/\s+/g, '-');
    await setDoc(doc(db, coleccion, id), atraccion);
    console.log(`✅ Subida: ${atraccion.nombre}`);
  }

  console.log('🎉 Subida completa');
}

ejecutarScrapingYSubida();
