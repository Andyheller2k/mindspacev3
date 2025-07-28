import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      try {
        const seenWelcome = await AsyncStorage.getItem('hasSeenWelcome');
        const userToken = await AsyncStorage.getItem('userToken');

        if (!seenWelcome) {
          router.replace('/welcome'); 
        } else if (userToken) {
          router.replace('/(tabs)/session'); 
        } else {
          router.replace('/welcome'); 
        }
      } catch (error) {
        console.error('Startup redirect failed:', error);
        router.replace('/login'); 
      }
    };

    initialize();
  }, []);

  return null;
}
