const fs = require('fs');
const path = require('path');

const checklist = [
  { file: 'package.json', desc: 'Archivo package.json' },
  { file: 'App.js', desc: 'Archivo App.js' },
  { file: 'app.json', desc: 'Archivo app.json' },
  { file: 'app.config.js', desc: 'Archivo app.config.js (opcional)' },
  { file: 'eas.json', desc: 'Archivo eas.json' },
  { file: 'index.js', desc: 'Archivo index.js (opcional)' },
  { file: 'assets', desc: 'Carpeta assets', isDir: true },
  { file: 'assets/icon.png', desc: 'Icono de la app' },
  { file: 'assets/splash.png', desc: 'Imagen de splash (opcional)' },
  { file: 'android', desc: 'Carpeta android (opcional)', isDir: true },
  { file: 'ios', desc: 'Carpeta ios (opcional)', isDir: true },
  { file: 'README.md', desc: 'Archivo README.md (opcional)' },
  { file: '__tests__', desc: 'Carpeta de tests (opcional)', isDir: true },
  { file: 'android/app/src/main/res/mipmap-hdpi/ic_launcher.png', desc: 'Icono Android hdpi (opcional)' }
];

console.log('Checklist de archivos y carpetas importantes:\n');

let allOk = true;

checklist.forEach(item => {
  const fullPath = path.join(__dirname, item.file);
  let exists = false;
  try {
    const stat = fs.statSync(fullPath);
    exists = item.isDir ? stat.isDirectory() : stat.isFile();
  } catch (e) {
    exists = false;
  }
  if (exists) {
    console.log(`✅ ${item.desc} (${item.file})`);
  } else {
    console.log(`❌ Falta: ${item.desc} (${item.file})`);
    if (!item.desc.includes('(opcional)')) allOk = false;
  }
});

console.log('\nDependencias principales en package.json:\n');

let pkg;
try {
  pkg = require('./package.json');
} catch (e) {
  console.log('No se pudo leer package.json');
  process.exit(1);
}

const deps = [
  'expo',
  'react',
  'react-native',
  '@react-navigation/native',
  '@react-navigation/bottom-tabs',
  'react-native-maps'
];

deps.forEach(dep => {
  if ((pkg.dependencies && pkg.dependencies[dep]) || (pkg.devDependencies && pkg.devDependencies[dep])) {
    console.log(`✅ ${dep}`);
  } else {
    console.log(`❌ Falta dependencia: ${dep}`);
    allOk = false;
  }
});

console.log('\nScripts útiles en package.json:\n');
const scripts = ['start', 'android', 'ios', 'test'];
scripts.forEach(script => {
  if (pkg.scripts && pkg.scripts[script]) {
    console.log(`✅ Script "${script}"`);
  } else {
    console.log(`❌ Falta script: "${script}"`);
    if (script === 'start') allOk = false;
  }
});

// Busca archivos de test
console.log('\nArchivos de test (.test.js):\n');
function findTestFiles(dir, foundFiles = []) {
  if (!fs.existsSync(dir)) return foundFiles;
  let files;
  try {
    files = fs.readdirSync(dir);
  } catch (e) {
    return foundFiles;
  }
  files.forEach(file => {
    if (
      file.startsWith('.') ||
      file === 'node_modules' ||
      file === 'android' ||
      file === 'ios'
    ) {
      return;
    }
    const full = path.join(dir, file);
    try {
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        findTestFiles(full, foundFiles);
      } else if (file.endsWith('.test.js')) {
        foundFiles.push(full);
      }
    } catch (e) {
      // Ignora errores de acceso
    }
  });
  return foundFiles;
}
const testFiles = findTestFiles(__dirname, []);
if (testFiles.length > 0) {
  testFiles.forEach(f => console.log(`✅ ${f}`));
  console.log(`Total archivos de test encontrados: ${testFiles.length}`);
} else {
  console.log('❌ No se encontraron archivos .test.js');
}

console.log('\nResultado general:');
if (allOk) {
  console.log('✅ Todo lo esencial está en orden.');
} else {
  console.log('❌ Hay elementos esenciales faltantes. Revisa los puntos marcados.');
}