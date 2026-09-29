import '../global.css';
import 'react-native-reanimated';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { requireOptionalNativeModule } from 'expo';
import { colors } from '@/constants/theme';

export default function RootLayout() {
  useEffect(() => {
    // Hide Expo dev menu floating action button (blue gear) from UI
    try {
      const DevMenuPreferences = requireOptionalNativeModule('DevMenuPreferences');
      DevMenuPreferences?.setPreferencesAsync({ showFloatingActionButton: false });
    } catch {
      // DevMenu not available in production or web
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'fade',
        }}
      />
    </GestureHandlerRootView>
  );
}
