import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#000',
      }}
    >
      <Tabs.Screen
        name="session"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <Ionicons name="paper-plane-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Today"
        options={{
          title: 'Eco',
          tabBarIcon: ({ color }) => (
            <Ionicons name="sparkles-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="SleepStories"
        options={{
          title: 'Stories',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mindfulcoursses"
        options={{
          title: 'Mindfulness',
          tabBarIcon: ({ color }) => (
            <Ionicons name="book-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="subscription"
        options={{
          title: 'Subscription',
          tabBarIcon: ({ color }) => (
            <Ionicons name="card-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
