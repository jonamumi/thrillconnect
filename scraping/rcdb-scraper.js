import fetch from 'node-fetch';
import cheerio from 'cheerio';
import fs from 'fs';

const BASE_URL = 'https://rcdb.com/';
const START_ID = 1;
const END_ID = 100; // ajusta según el rango que quieras scrapear

const coasters = [];

async function scrapeRCDB(id) {
  try {
    const url = `${BASE_URL}${id}.htm`;
    const res = await fetch(url);
    if (res.status !== 200) return;

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
      image: image ? `${BASE_URL}${image}` : null
    };

    coasters.push(coaster);
    console.log(`🎢 Scraped: ${name}`);
  } catch (err) {
    console.warn(`⚠️ Error en ID ${id}: ${err.message}`);
  }
}

async function main() {
  for (let id = START_ID; id <= END_ID; id++) {
    await scrapeRCDB(id);
  }

  fs.writeFileSync('./rcdb-coasters.json', JSON.stringify(coasters, null, 2));
  console.log(`✅ Guardado: rcdb-coasters.json (${coasters.length} coasters)`);
}

main();
