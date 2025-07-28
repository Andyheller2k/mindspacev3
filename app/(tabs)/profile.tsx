import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const summary = await AsyncStorage.getItem('userSummary');
      if (summary) {
        setProfileData(JSON.parse(summary));
      }
    };
    fetchProfile();
  }, []);

  if (!profileData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  const { avatar, profile, purpose, hobbies } = profileData;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        {avatar && (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        )}
        <TouchableOpacity>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{profile?.name || 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>About</Text>
        <Text style={styles.value}>{profile?.bio || 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Gender</Text>
        <Text style={styles.value}>{profile?.gender || 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Age</Text>
        <Text style={styles.value}>{profile?.age || 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Purpose</Text>
        <Text style={styles.value}>{purpose || 'Not set'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Hobbies</Text>
        {hobbies && hobbies.length > 0 ? (
          hobbies.map((hobby: string, index: number) => (
            <Text key={index} style={styles.value}>• {hobby}</Text>
          ))
        ) : (
          <Text style={styles.value}>None selected</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  edit: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 16,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    color: '#999',
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default ProfileScreen;
