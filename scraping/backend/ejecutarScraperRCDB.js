import fetch from 'node-fetch';
import cheerio from 'cheerio';
import { db } from './firebase/firestore.js';
import { setDoc, doc } from 'firebase/firestore';
import fs from 'fs';

const BASE_URL = 'https://rcdb.com/';
const RANGO_POR_SEMANA = 500;
const ESTADO_PATH = './estado.json';

function obtenerRango() {
  let estado = { ultimoID: 0 };
  if (fs.existsSync(ESTADO_PATH)) {
    estado = JSON.parse(fs.readFileSync(ESTADO_PATH, 'utf-8'));
  }

  const inicio = estado.ultimoID + 1;
  const fin = inicio + RANGO_POR_SEMANA - 1;
  estado.ultimoID = fin;
  fs.writeFileSync(ESTADO_PATH, JSON.stringify(estado));
  return { inicio, fin };
}

export async function ejecutarScraperRCDB() {
  const { inicio, fin } = obtenerRango();
  const coasters = [];

  for (let id = inicio; id <= fin; id++) {
    try {
      const url = `${BASE_URL}${id}.htm`;
      const res = await fetch(url);
      if (res.status !== 200) continue;

      const html = await res.text();
      const $ = cheerio.load(html);

      const name = $('h1').first().text().trim();
      const park = $('h1 ~ a').first().text().trim();
      const location = $('h1 ~ a').eq(1).text().trim();
      const stats = {};

      $('.statstable td').each((_, el) => {
        const label = $(el).text().trim().toLowerCase();
        const value = $(el).next().text().trim();
        if (label.includes('type')) stats.type = value;
        if (label.includes('design')) stats.design = value;
        if (label.includes('height')) stats.height = value;
        if (label.includes('speed')) stats.speed = value;
        if (label.includes('length')) stats.length = value;
        if (label.includes('duration')) stats.duration = value;
        if (label.includes('inversions')) stats.inversions = value;
        if (label.includes('drop')) stats.angle = value;
        if (label.includes('manufacturer')) stats.manufacturer = value;
      });

      const image = $('img[src*="/pictures/"]').first().attr('src');
      const coaster = {
        name,
        park,
        location,
        ...stats,
        image: image ? `${BASE_URL}${image}` : null,
        fuente: 'RCDB'
      };

      const idDoc = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      await setDoc(doc(db, 'atracciones', idDoc), coaster);
      console.log(`🎢 Subido: ${name} (ID: ${idDoc})`);
      coasters.push(coaster);
    } catch (err) {
      console.warn(`⚠️ Error en ID ${id}: ${err.message}`);
    }
  }

  console.log(`✅ Subida semanal completa: ${coasters.length} coasters (${inicio}–${fin})`);
  return coasters;
}
