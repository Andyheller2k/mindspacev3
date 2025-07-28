
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <LinearGradient
      colors={["#dbeafe", "#bfdbfe"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.profileCard}>
        <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="camera" size={30} color="#93c5fd" />
              <Text style={styles.placeholderText}>Select Photo</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.nameInput}
          placeholder="Enter your name"
          placeholderTextColor="#60a5fa"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.namePreview}>{name ? `Hello, ${name}!` : ''}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 50 : 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    width: '85%',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    backdropFilter: 'blur(10px)',
  },
  imageWrapper: {
    marginBottom: 20,
    borderRadius: 75,
    width: 120,
    height: 120,
    overflow: 'hidden',
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 12,
    color: '#60a5fa',
    marginTop: 5,
  },
  nameInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#60a5fa',
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#1e3a8a',
  },
  namePreview: {
    marginTop: 20,
    fontSize: 18,
    color: '#1e40af',
    fontWeight: 'bold',
  },
});
