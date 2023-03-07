import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'theworkout.io',
  appName: 'TheWorkout',
  webDir: 'out',
  bundledWebRuntime: false,
  android: {
    allowMixedContent: true
  },
  server: {
    cleartext: true,
    hostname: "localhost",
    url: "https://staging-the-workout.vercel.app/",
    allowNavigation: [
      'localhost',
      'https://staging-the-workout.vercel.app/',
      'staging-the-workout.vercel.app',
      'http://192.168.1.133:3000/'
    ]
  }
};

export default config;
