import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#6EE7B7', '#3B82F6']} // You can adjust the colors
      style={{ flex: 1, padding: 24, justifyContent: 'center' }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Logo or Illustration */}
      <View style={{ alignItems: 'center', marginBottom: 40 }}>
        <Image
          source={require('../../assets/images/hello.png')}
          style={{ width: 400, height: 400, resizeMode: 'contain' }}
        />
      </View>

      {/* Welcome Text */}
      <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#fff', marginBottom: 16 }}>
        Welcome to MindSpace
      </Text>
      <Text style={{ fontSize: 16, color: '#F3F4F6', textAlign: 'center', marginBottom: 40 }}>
        Discover nature, enhance your mood, and find your balance through mindfulness.
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity
        onPress={() => router.push('/onboarding/Purpose')}
        style={{
          backgroundColor: '#10B981',
          paddingVertical: 16,
          borderRadius: 12,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
          Get Started
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
