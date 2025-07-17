# build.ps1

<#
.SYNOPSIS
  Limpia, configura y ejecuta EAS build para Android (preview).

.DESCRIPTION
  - Elimina carpetas de cache (.expo, .eas.json).
  - Instala/actualiza eas-cli globalmente.
  - Añade directorio global de npm al PATH.
  - Verifica tu sesión en Expo.
  - Define variables de entorno.
  - Ejecuta el build sin interacción.
#>

param(
  [string]$Environment = "preview",
  [string]$ProjectId   = "140ddd96-1229-4fc2-80d4-3e6119880583"
)

function Check-CommandOrExit($cmd) {
  if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
    Write-Error "$cmd no está instalado o no está en el PATH. Instala Node.js y asegúrate de que $cmd sea accesible."
    exit 1
  }
}

Write-Host "1) Limpiando entorno local (.expo, .eas.json)..." -ForegroundColor Cyan
Remove-Item -Recurse -Force .expo        -ErrorAction SilentlyContinue
Remove-Item      -Force .eas.json        -ErrorAction SilentlyContinue

Write-Host "2) Verificando Node.js y npm..." -ForegroundColor Cyan
Check-CommandOrExit "node"
Check-CommandOrExit "npm"

Write-Host "3) Instalando/actualizando eas-cli globalmente..." -ForegroundColor Cyan
& npm install -g eas-cli | Out-Null

Write-Host "4) Ajustando PATH para binarios npm globales..." -ForegroundColor Cyan
$npmPrefix = (& npm config get prefix).Trim()
$npmBin    = Join-Path $npmPrefix "node_modules\.bin"
$env:Path  = "$npmPrefix;$npmBin;$env:Path"

Write-Host "5) Verificando sesión en Expo..." -ForegroundColor Yellow
Check-CommandOrExit "eas"
$expoUser = & eas whoami
Write-Host "   Expo user: $expoUser" -ForegroundColor Yellow

Write-Host "6) Configurando variables de entorno para build..." -ForegroundColor Cyan
$env:EAS_NO_VCS     = "1"
$env:EAS_PROJECT_ID = $ProjectId
$env:ENVIRONMENT    = $Environment

Write-Host "7) Ejecutando EAS build (Android · perfil $Environment)..." -ForegroundColor Green
& eas build -p android --profile $Environment --clear-cache --non-interactive

Write-Host "✅ Build disparada. Revisa tu dashboard de Expo EAS para descargar el APK." -ForegroundColor Magenta
