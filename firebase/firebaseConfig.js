import Constants from 'expo-constants';

const entorno = Constants.expoConfig?.extra?.environment || 'development';

const firebaseConfigs = {
  development: {
    apiKey: 'DEV_API_KEY',
    authDomain: 'thrillconnect-dev.firebaseapp.com',
    projectId: 'thrillconnect-dev',
    storageBucket: 'thrillconnect-dev.appspot.com',
    messagingSenderId: 'DEV_SENDER_ID',
    appId: 'DEV_APP_ID'
  },
  preview: {
    apiKey: 'PREVIEW_API_KEY',
    authDomain: 'thrillconnect-preview.firebaseapp.com',
    projectId: 'thrillconnect-preview',
    storageBucket: 'thrillconnect-preview.appspot.com',
    messagingSenderId: 'PREVIEW_SENDER_ID',
    appId: 'PREVIEW_APP_ID'
  },
  production: {
    apiKey: 'PROD_API_KEY',
    authDomain: 'thrillconnect.firebaseapp.com',
    projectId: 'thrillconnect',
    storageBucket: 'thrillconnect.appspot.com',
    messagingSenderId: 'PROD_SENDER_ID',
    appId: 'PROD_APP_ID'
  }
};

const firebaseConfig = firebaseConfigs[entorno];
export default firebaseConfig;
