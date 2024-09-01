
import { AuthenticationProvider } from '@/context/AuthContext';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { useEffect } from 'react';
SplashScreen.preventAutoHideAsync();


export default function Root() {
  useEffect(() => {
      SplashScreen.hideAsync();
  }, []);

  return (
    <>
      <StatusBar style='dark'/>
        <AuthenticationProvider>
          <Slot/>
        </AuthenticationProvider>
    </>   
  );
}
