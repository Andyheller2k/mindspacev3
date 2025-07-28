// Signup.js (refactored with two-tone layout)
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

const API_URL = 'http://10.36.12.105:8080';
const { height } = Dimensions.get('window');

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/register`, {
        firstName: name,
        lastName: '',
        email,
        password,
      });

      await AsyncStorage.setItem('userToken', response.data.token);
      router.replace('/onboarding/Welcome');
    } catch (error) {
      Alert.alert('Sign Up Failed', 'This email may already be in use.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.topSection}>
            <Image source={require('../assets/images/Serene Meditation in Nature.png')} style={styles.image} />
            <Text style={styles.welcomeText}>MindSpace</Text>
          </View>

          <View style={styles.bottomSection}>
            <Text style={styles.title}>Create An Account</Text>

            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
                <Text style={styles.signUpButtonText}>Sign up</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.switchText}>Already have an account? <Text onPress={() => router.replace('/login')} style={styles.link}>Log in</Text></Text>

            <Text style={styles.orText}>OR</Text>
            <Text style={styles.loginWithText}>Login with</Text>

            <TouchableOpacity style={styles.socialButtonOutline}>
              <Text style={styles.socialButtonText}>Login with Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButtonRed}>
              <Text style={styles.socialButtonText}>Login with Gmail</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#000033',
  },
  topSection: {
    backgroundColor: '#FFD700',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
    paddingVertical: 40,
  },
  image: {
    height: 250,
    width: 250,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop:20,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#001F54',
  },
  bottomSection: {
    padding: 20,
    backgroundColor: '#000033',
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  signUpButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: 'white',
  },
  link: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  loginWithText: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    color: 'lightgray',
  },
  socialButtonOutline: {
    borderColor: '#007AFF',
    borderWidth: 1.5,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
  },
  socialButtonRed: {
    borderColor: 'red',
    borderWidth: 1.5,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  socialButtonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 14,
  },
});
