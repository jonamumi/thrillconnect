import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const env = process.env.ENVIRONMENT || 'preview';
  const apiUrls = {
    preview: 'https://preview.thrillconnect.com',
    production: 'https://api.thrillconnect.com'
  };

  return {
    ...config,
    owner: 'joning',              // tu username de Expo
    slug: 'thrillconnect',
    name: 'ThrillConnect',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    scheme: 'thrillconnect',
    extra: {
      ENVIRONMENT: env,
      API_URL: apiUrls[env]
    },
    android: {
      package: 'com.thrillconnect.app'
    },
    ios: {
      bundleIdentifier: 'com.thrillconnect.app'
    }
  };
};
