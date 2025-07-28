import { IconSymbol } from '@/components/ui/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();

  const settings = [
    { label: 'Profile', icon: 'person.crop.circle', onPress: () => router.push('/profile') },
    { label: 'Account', icon: 'paperplane.fill', onPress: () => {} },
    { label: 'Notifications', icon: 'chevron.right', onPress: () => {} },
    { label: 'Privacy & Security', icon: 'chevron.left.forwardslash.chevron.right', onPress: () => {} },
    { label: 'About', icon: 'house.fill', onPress: () => router.push('/about') },
    { label: 'Logout', icon: 'gearshape.fill', onPress: () => { router.replace('/welcome') } },
  ];

  return (
    <LinearGradient colors={['#D0F0FD', '#F5F3FF']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.header}>Settings</Text>
        <ScrollView contentContainerStyle={styles.scroll}>
          {settings.map((item, index) => (
            <TouchableOpacity key={index} style={styles.item} onPress={item.onPress}>
              <IconSymbol name={item.icon as any} size={24} color="#B3E5FC" />
              <Text style={styles.label}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    paddingTop: 40,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293bAA',
    padding: 15,
    marginVertical: 8,
    borderRadius: 14,
  },
  label: {
    color: '#B3E5FC',
    fontSize: 18,
    marginLeft: 12,
    fontWeight: '500',
  },
});
