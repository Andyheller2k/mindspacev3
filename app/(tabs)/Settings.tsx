import { IconSymbol } from '@/components/ui/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();

  const settings = [
    { label: 'Account', icon: 'paperplane.fill', onPress: () => {} },
    { label: 'Notifications', icon: 'chevron.right', onPress: () => {} },
    { label: 'Privacy & Security', icon: 'chevron.left.forwardslash.chevron.right', onPress: () => {} },
    { label: 'About', icon: 'house.fill', onPress: () => router.push('/about') },
    {
      label: 'Logout',
      icon: 'gearshape.fill',
      onPress: () => {
        Alert.alert(
          'Confirm Logout',
          'Are you sure you want to logout?',
          [
            {
              text: 'No',
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => {
                router.replace('/welcome');
              },
              style: 'destructive',
            },
          ],
          { cancelable: true }
        );
      },
    },
  ];

  return (
    <LinearGradient
      colors={['#cbd5e1', '#94a3b8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.header}>Settings</Text>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.glassCard}>
            {settings.map((item, index) => (
              <TouchableOpacity key={index} style={styles.item} onPress={item.onPress}>
                <IconSymbol name={item.icon as any} size={22} color="#f1f5f9" />
                <Text style={styles.label}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
    fontSize: 30,
    fontWeight: '700',
    color: '#f1f5f9',
    paddingTop: 40,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  glassCard: {
    backgroundColor: '#ffffff22',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderColor: '#ffffff33',
    borderWidth: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b55',
    padding: 14,
    marginVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ffffff20',
  },
  label: {
    color: '#f1f5f9',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '400',
  },
});
