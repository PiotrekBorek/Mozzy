import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';

import { AnimatedSplashOverlay } from '../shared/components/animated-icon';
import WelcomeScreen from '.';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    'SpaceGrotesk-Bold': require('@/assets/fonts/SpaceGrotesk-Bold.ttf'),
    'SpaceGrotesk-Light': require('@/assets/fonts/SpaceGrotesk-Light.ttf'),
    'SpaceGrotesk-Medium': require('@/assets/fonts/SpaceGrotesk-Medium.ttf'),
    'SpaceGrotesk-Regular': require('@/assets/fonts/SpaceGrotesk-Regular.ttf'),
    'SpaceGrotesk-SemiBold': require('@/assets/fonts/SpaceGrotesk-SemiBold.ttf'),
    'Inter': require('@/assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
    'IBM-Bold': require('@/assets/fonts/IBMPlexMono-Bold.ttf'),
    'IBM-ExtraLight': require('@/assets/fonts/IBMPlexMono-ExtraLight.ttf'),
    'IBM-Light': require('@/assets/fonts/IBMPlexMono-Light.ttf'),
    'IBM-Medium': require('@/assets/fonts/IBMPlexMono-Medium.ttf'),
    'IBM-Regular': require('@/assets/fonts/IBMPlexMono-Regular.ttf'),
    'IBM-SemiBold': require('@/assets/fonts/IBMPlexMono-SemiBold.ttf'),
    'IBM-Thin': require('@/assets/fonts/IBMPlexMono-Thin.ttf'),

  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <WelcomeScreen />
    </ThemeProvider>
  );
}
