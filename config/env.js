import Constants from 'expo-constants';

const entorno = Constants.expoConfig?.extra?.environment || 'development';

const CONFIG = {
  development: {
    apiUrl: 'https://dev.api.thrillconnect.com',
    environment: entorno,
    mostrarBanner: true,
    activarLogsDebug: true
  },
  preview: {
    apiUrl: 'https://preview.api.thrillconnect.com',
    environment: entorno,
    mostrarBanner: true,
    activarLogsDebug: false
  },
  production: {
    apiUrl: 'https://api.thrillconnect.com',
    environment: entorno,
    mostrarBanner: false,
    activarLogsDebug: false
  }
};

export const ENV = CONFIG[entorno];
export const ENVIRONMENT = entorno;
