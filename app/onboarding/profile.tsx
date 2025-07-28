import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';

import React, { useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';


const avatars = [
  require('../../assets/avatars/avatar1.jpeg'),
  require('../../assets/avatars/avatar2.jpeg'),
  require('../../assets/avatars/avatar3.jpeg'),
  require('../../assets/avatars/avatar4.jpeg'),

];

const countryOptions = [
  { label: 'Ghana', value: 'Ghana' },
  { label: 'United States', value: 'United States' },
  { label: 'United Kingdom', value: 'United Kingdom' },
  { label: 'Canada', value: 'Canada' },
  { label: 'Australia', value: 'Australia' },
  { label: 'Nigeria', value: 'Nigeria' },
  { label: 'Kenya', value: 'Kenya' },
  { label: 'South Africa', value: 'South Africa' },
  { label: 'India', value: 'India' },
  { label: 'Germany', value: 'Germany' },
  { label: 'France', value: 'France' },
  { label: 'Brazil', value: 'Brazil' },
  { label: 'Mexico', value: 'Mexico' },
  { label: 'Japan', value: 'Japan' },
  { label: 'China', value: 'China' },
  { label: 'Egypt', value: 'Egypt' },
  { label: 'Morocco', value: 'Morocco' },
  { label: 'United Arab Emirates', value: 'United Arab Emirates' },
  { label: 'Singapore', value: 'Singapore' },
  { label: 'New Zealand', value: 'New Zealand' },

  
];


const genderOptions = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  
];

const mbtiOptions = [
  { label: 'INFP', value: 'INFP' },
  { label: 'ENTJ', value: 'ENTJ' },
  { label: 'ISTP', value: 'ISTP' },
  { label: 'ENFP', value: 'ENFP' },
  { label: 'INTJ', value: 'INTJ' },
  { label: 'INFJ', value: 'INFJ' },
  { label: 'INTP', value: 'INTP' },
  { label: 'ENTP', value: 'ENTP' },
  { label: 'ISFP', value: 'ISFP' },
  { label: 'ESFP', value: 'ESFP' },
  { label: 'ISTJ', value: 'ISTJ' },
  { label: 'ESTJ', value: 'ESTJ' },
  { label: 'ISFJ', value: 'ISFJ' },
  { label: 'ESFJ', value: 'ESFJ' },
  { label: 'ENFJ', value: 'ENFJ' },
  { label: 'ESTP', value: 'ESTP' },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [mbti, setMbti] = useState('');
  const [uniqueDetail, setUniqueDetail] = useState('');

  const isFormComplete =
    selectedAvatar !== null &&
    name.trim() !== '' &&
    age.trim() !== '' &&
    country.trim() !== '' &&
    gender.trim() !== '' &&
    mbti.trim() !== '' &&
    uniqueDetail.trim() !== '';

    const handleContinue = async () => {
  if (!isFormComplete) return;

  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.error('No token found in AsyncStorage');
      return;
    }

    const response = await axios.post(
      'http://10.36.12.105:8080/api/user/profile',
      {
        avatarIndex: selectedAvatar,
        name,
        age: parseInt(age),
        country,
        gender,
        mbti,
        uniqueDetail,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        withCredentials: true,
      }
    );

    
    await AsyncStorage.setItem('userProfile', JSON.stringify({
      name,
      age,
      country,
      gender,
      mbti,
      uniqueDetail,
    }));

    await AsyncStorage.setItem(
      'selectedAvatar',
      Image.resolveAssetSource(avatars[selectedAvatar!]).uri
    );

    console.log('Profile saved:', response.data);
    router.push('/onboarding/summary');
  } catch (error) {
    console.error('Error saving profile:', error.response?.data || error.message);
  }
};


  return (
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 }}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.header}>
            You're almost there, just need to customize your experience
          </Text>

          {/* Avatar Selection */}
          <Text style={styles.subHeader}>Choose Your Avatar</Text>
          <View style={styles.avatarContainer}>
            {avatars.map((avatar, index) => (
              <TouchableOpacity key={index} onPress={() => setSelectedAvatar(index)}>
                <Image
                  source={avatar}
                  style={[
                    styles.avatar,
                    selectedAvatar === index && styles.selectedAvatar,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Input Fields */}
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            style={styles.input}
          />

          <RNPickerSelect
  onValueChange={setCountry}
  items={countryOptions}
  placeholder={{ label: 'Select your country', value: null }}
  value={country}
  style={pickerSelectStyles}
/>

<RNPickerSelect
  onValueChange={setGender}
  items={genderOptions}
  placeholder={{ label: 'Select your gender', value: null }}
  value={gender}
  style={pickerSelectStyles}
/>

<RNPickerSelect
  onValueChange={setMbti}
  items={mbtiOptions}
  placeholder={{ label: 'Select your MBTI', value: null }}
  value={mbti}
  style={pickerSelectStyles}
/>
           
          <TextInput
            placeholder="Tell us something unique about you"
            value={uniqueDetail}
            onChangeText={setUniqueDetail}
            style={styles.input}
          />

          {/* Continue Button */}
          <TouchableOpacity
            onPress={handleContinue}
            disabled={!isFormComplete}
            style={[
              styles.continueButton,
              { backgroundColor: isFormComplete ? '#4A90E2' : '#ccc' },
            ]}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

}

// ... existing imports remain the same
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    paddingTop: 70,
    backgroundColor: '#00274D', // Deep Blue
    flexGrow: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFEB3B', // Yellow text
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
    color: '#FFEB3B',
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 5,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedAvatar: {
    borderColor: '#FFEB3B',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FFEB3B',
    color: '#000',
  },
  continueButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#FFEB3B',
  },
  continueText: {
    color: '#00274D',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FFEB3B',
    fontSize: 16,
    color: '#000',
  },
  inputAndroid: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FFEB3B',
    fontSize: 16,
    color: '#000',
  },
};
