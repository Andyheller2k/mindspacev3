import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SummaryScreen = () => {
  const [userPurpose, setUserPurpose] = useState<string | null>(null);
  const [userHobbies, setUserHobbies] = useState<string[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const purpose = await AsyncStorage.getItem('userPurpose');
      const hobbies = await AsyncStorage.getItem('userHobbies');
      const profile = await AsyncStorage.getItem('userProfile');
      const avatar = await AsyncStorage.getItem('selectedAvatar');

      setUserPurpose(purpose);
      setUserHobbies(hobbies ? JSON.parse(hobbies) : []);
      setUserProfile(profile ? JSON.parse(profile) : null);
      setSelectedAvatar(avatar);
    };

    loadData();
  }, []);

  const handleDone = async () => {
  try {
    const summary = {
      purpose: userPurpose,
      hobbies: userHobbies,
      profile: userProfile,
      avatar: selectedAvatar,
    };
    await AsyncStorage.setItem('userSummary', JSON.stringify(summary));
    Alert.alert('Success', 'Summary saved!');
    router.push('/(tabs)/session');  // Change '/home' to your desired route
  } catch (error) {
    console.error('Error saving summary:', error);
    Alert.alert('Error', 'Failed to save summary.');
  }
};


  const handleRestart = async () => {
    try {
      await AsyncStorage.multiRemove([
        'userPurpose',
        'userHobbies',
        'userProfile',
        'selectedAvatar',
        'userSummary',
      ]);
      router.replace('../onboarding/Welcome');
    } catch (error) {
      console.error('Error restarting:', error);
      Alert.alert('Error', 'Failed to restart.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>📝 Your Unique Profile</Text>
      </View>

      <BlurView intensity={60} tint="dark" style={styles.card}>
        {selectedAvatar && (
          <View style={styles.avatarContainer}>
            <Image source={{ uri: selectedAvatar }} style={styles.avatar} />
          </View>
        )}

        {userProfile && (
          <>
            <Text style={styles.label}>👤 Name</Text>
            <Text style={styles.value}>{userProfile.name || 'N/A'}</Text>

            <Text style={styles.label}>🧠 Bio</Text>
            <Text style={styles.value}>{userProfile.bio || 'N/A'}</Text>

            <Text style={styles.label}>⚧ Gender</Text>
            <Text style={styles.value}>{userProfile.gender || 'N/A'}</Text>

            <Text style={styles.label}>🎂 Age</Text>
            <Text style={styles.value}>{userProfile.age || 'N/A'}</Text>
          </>
        )}

        <Text style={styles.label}>🎯 Purpose</Text>
        <Text style={styles.value}>{userPurpose || 'Not selected yet'}</Text>

        <Text style={styles.label}>🎨 Hobbies</Text>
        {userHobbies.length > 0 ? (
          userHobbies.map((hobby, index) => (
            <Text key={index} style={styles.value}>• {hobby}</Text>
          ))
        ) : (
          <Text style={styles.value}>No hobbies selected</Text>
        )}
      </BlurView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
          <Text style={styles.buttonText}>Restart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#000033', // deep blue
    flexGrow: 1,
  },
  headerWrapper: {
    marginTop: Platform.OS === 'ios' ? 60 : 40,
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700', // yellow
    textAlign: 'center',
  },
  card: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: Platform.OS === 'android' ? 'rgba(0,0,0,0.4)' : 'transparent',
    overflow: 'hidden',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    color: '#FFD700', // yellow
  },
  value: {
    fontSize: 16,
    marginTop: 6,
    color: '#fff',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  doneButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  restartButton: {
    backgroundColor: '#FF4D4D', // red
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000033',
    fontSize: 16,
  },
});

export default SummaryScreen;
