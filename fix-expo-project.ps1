Write-Host "`n🚨 Limpieza de entorno..."
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm cache clean --force

Write-Host "`n📦 Reinstalando dependencias esenciales..."
npm install --legacy-peer-deps

Write-Host "`n🎯 Corrigiendo dependencias incompatibles..."
npm install expo-modules-autolinking@1.2.0 @expo/config-plugins@6.0.0 @expo/prebuild-config@6.0.0 --legacy-peer-deps

Write-Host "`n🧹 Eliminando sdkVersion de app.config.js si existe..."
(Get-Content .\app.config.js) -replace 'sdkVersion:.*?,', '' | Set-Content .\app.config.js

Write-Host "`n📦 Sincronizando dependencias con la SDK instalada..."
npx expo install --check

Write-Host "`n🚀 Ejecutando análisis final con expo-doctor..."
npx expo-doctor
