import { useEffect } from 'react';
import { Stack, SplashScreen, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { supabase } from '@/utils/supabase';
import { View } from 'react-native';

export default function RootLayout() {
  useFrameworkReady();

  // Load fonts
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
  });

  useEffect(() => {
    // Prevent splash screen from auto-hiding
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/login');
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return loading screen while fonts load
  if (!fontsLoaded && !fontError) {
    return <View />;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' }
        }}
      >
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
            animation: 'none'
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            animation: 'none'
          }}
        />
        <Stack.Screen
          name="note/[id]"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom'
          }}
        />
        <Stack.Screen
          name="+not-found"
          options={{
            presentation: 'modal'
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}