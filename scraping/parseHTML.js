import cheerio from 'cheerio';

/**
 * Parsea el HTML de parques y devuelve un array de atracciones
 * @param {string} html - HTML en formato string
 * @returns {Array<Object>} - Lista de atracciones
 */
export function parseHTML(html) {
  const $ = cheerio.load(html);
  const atracciones = [];

  $('.atraccion').each((_, el) => {
    const nombre = $(el).find('.nombre').text().trim();
    const descripcion = $(el).find('.descripcion').text().trim();
    const imagen = $(el).find('img').attr('src');
    const tipo = $(el).find('.tipo').text().trim();

    if (nombre) {
      atracciones.push({
        nombre,
        descripcion,
        imagen,
        tipo
      });
    }
  });

  return atracciones;
}
