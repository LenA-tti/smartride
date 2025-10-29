import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';

import { AppProvider } from '@/context/AppContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AppProvider>
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="passenger" options={{ headerShown: false }} />
          <Stack.Screen name="driver" options={{ headerShown: false }} />
          <Stack.Screen name="admin" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </AppProvider>
    </ThemeProvider>
  );
}
