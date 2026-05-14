import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'react-native-reanimated';
import '../global.css';

import { useBudgetStore } from '../store/useBudgetStore';
import { useEffect } from 'react';

const GOOGLE_CLIENT_ID = "797538988114-5r6fpc2d8scgnlg8aebj19onfm8o9c4f.apps.googleusercontent.com";

export default function RootLayout() {
  const loadState = useBudgetStore(s => s.loadPersistedState);
  
  useEffect(() => {
    loadState();
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}
