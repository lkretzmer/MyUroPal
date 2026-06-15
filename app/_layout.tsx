import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '../constants/theme';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: theme.colors.background },
            headerShadowVisible: false,
            headerTintColor: theme.colors.text,
            headerTitleStyle: { fontWeight: '600' },
            headerBackTitle: 'Index',
            contentStyle: { backgroundColor: theme.colors.background },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="reminder/index" options={{ title: 'Reminder' }} />
          <Stack.Screen name="reminder/qr" options={{ title: 'Reminder QR Code' }} />
          <Stack.Screen name="leaflets/index" options={{ title: 'BAUS Leaflets' }} />
          <Stack.Screen name="leaflets/qr" options={{ title: 'Leaflet QR Code' }} />
          <Stack.Screen name="guidelines/index" options={{ title: 'Guideline Search' }} />
          <Stack.Screen name="scoring/index" options={{ title: 'Scoring Systems' }} />
          <Stack.Screen name="scoring/mimic" options={{ title: 'MIMIC Calculator' }} />
          <Stack.Screen name="scoring/cpg" options={{ title: 'Cambridge Prognostic Groups' }} />
          <Stack.Screen name="scoring/eortc" options={{ title: 'EORTC Calculator' }} />
          <Stack.Screen name="scoring/identify" options={{ title: 'IDENTIFY Calculator' }} />
          <Stack.Screen name="emergency/index" options={{ title: 'Emergency Reference' }} />
          <Stack.Screen name="emergency/priapism" options={{ title: 'Priapism' }} />
          <Stack.Screen name="emergency/penile-fracture" options={{ title: 'Penile Fracture' }} />
          <Stack.Screen name="favorites/index" options={{ title: 'Favorites' }} />
          <Stack.Screen name="auth/login" options={{ title: 'Sign In' }} />
          <Stack.Screen name="onboarding/index" options={{ title: 'Complete Profile' }} />
          <Stack.Screen name="analytics/index" options={{ title: 'Analytics' }} />
          <Stack.Screen name="privacy-policy" options={{ title: 'Privacy Policy' }} />
          <Stack.Screen name="settings/index" options={{ title: 'Settings' }} />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
