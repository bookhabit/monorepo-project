import Constants from 'expo-constants';

// Metro 번들러 호스트(PC IP)를 그대로 사용 → 에뮬레이터/실제 기기 모두 동작
const DEV_HOST = Constants.expoConfig?.hostUri?.split(':')[0] ?? 'localhost';

export const WEB_URL = __DEV__
  ? `http://${DEV_HOST}:3010`
  : 'https://guide-app.example.com';
