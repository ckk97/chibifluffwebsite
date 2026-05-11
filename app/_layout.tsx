import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { useBudgetStore } from '../store/useBudgetStore';
import { useEffect } from 'react';

export default function RootLayout() {
  const loadState = useBudgetStore(s => s.loadPersistedState);
  
  useEffect(() => {
    loadState();
  }, []);

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
