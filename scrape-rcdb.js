const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrapeRCDB() {
  const url = 'https://rcdb.com/r.htm?ot=3&mo=8203'; // Parques de España
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const parques = [];
  // Cada fila de la tabla representa un parque
  $('table.stdTbl tr').each((i, el) => {
    // Saltar la cabecera
    if (i === 0) return;
    const cols = $(el).find('td');
    if (cols.length < 4) return; // Evita filas incompletas

    const nombre = $(cols[0]).text().trim();
    const enlaceTag = $(cols[0]).find('a');
    const enlace = enlaceTag.length ? 'https://rcdb.com' + enlaceTag.attr('href') : '';
    const ciudad = $(cols[1]).text().trim();
    const estado = $(cols[2]).text().trim();
    const pais = $(cols[3]).text().trim();

    if (nombre) {
      parques.push({
        nombre,
        enlace,
        ciudad,
        estado,
        pais
      });
    }
  });

  fs.writeFileSync('parques.json', JSON.stringify(parques, null, 2));
  console.log('Datos guardados en parques.json');
}

scrapeRCDB();