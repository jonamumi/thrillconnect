import fs from 'fs';

const atracciones = [
  {
    nombre: 'Montaña Rusa Infernal',
    descripcion: 'Una experiencia extrema con giros de 360° y caídas verticales.',
    tipo: 'Adrenalina',
    imagen: 'https://i.imgur.com/roller1.jpg'
  },
  {
    nombre: 'Carrusel Mágico',
    descripcion: 'Ideal para niños y familias, con música encantadora.',
    tipo: 'Familiar',
    imagen: 'https://i.imgur.com/roller2.jpg'
  }
];

const generarHTML = (lista) => {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Parque Generado</title>
</head>
<body>
  <h1>🎡 Atracciones</h1>
  ${lista
    .map(
      (a) => `
  <div class="atraccion">
    <div class="nombre">${a.nombre}</div>
    <div class="descripcion">${a.descripcion}</div>
    <div class="tipo">${a.tipo}</div>
    <img src="${a.imagen}" alt="${a.nombre}" />
  </div>`
    )
    .join('')}
</body>
</html>`;
};

const html = generarHTML(atracciones);
fs.writeFileSync('parques-generado.html', html);
console.log('✅ HTML generado: parques-generado.html');
