Write-Host "🚮 Eliminando node_modules, locks y caché..."

Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Force yarn.lock -ErrorAction SilentlyContinue

npm cache clean --force

Write-Host "`n📦 Reinstalando dependencias..."
npm install --legacy-peer-deps

Write-Host "`n🔍 Verificando instalación del paquete expo..."
$expoInstalled = npm list expo --depth=0 | Select-String "expo@"

if (-not $expoInstalled) {
  Write-Host "`n❗ El paquete 'expo' no está instalado. Instalándolo..."
  npm install expo
} else {
  Write-Host "✅ 'expo' ya está instalado."
}

Write-Host "`n🚀 Lanzando proyecto..."
Start-Process "cmd.exe" -ArgumentList "/c", "npm start"
