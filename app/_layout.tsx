import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Welcome screen first */}
        <Stack.Screen name="welcome" />
        <Stack.Screen name="index" />
        <Stack.Screen name="about"/>

        
        {/* Onboarding flow */}
        <Stack.Screen name="onboarding/Welcome" />
        <Stack.Screen name="onboarding/goal" />
        <Stack.Screen name="onboarding/profile" />
        
        {/* Main app tabs */}
        <Stack.Screen name="(tabs)" />
        
        {/* Fallback screen */}
        <Stack.Screen name="+not-found" options={{ headerShown: true }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}