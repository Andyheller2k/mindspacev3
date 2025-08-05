// app/verify.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import api from './api'; // Assuming api.js is in the root or a shared folder

export default function VerifyScreen() {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Get the email passed from the signup screen using Expo Router's hook
  const { email } = useLocalSearchParams();

  const handleVerify = async () => {
    // Basic validation
    if (!token.trim()) {
      Alert.alert('Error', 'Please enter the verification token from your email.');
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Call the backend's verify endpoint.
      // The token is sent as a URL query parameter.
      const response = await api.get(`/api/v1/auth/verify-account?token=${token.trim()}`);

      // Step 2: If successful, the backend returns the JWT login token.
      const loginToken = response.data.token;

      if (!loginToken) {
        // Handle cases where the backend responds 200 OK but without a token
        throw new Error('No login token received.');
      }

      // Step 3: Store the new login token to log the user in.
      await AsyncStorage.setItem('userToken', loginToken);
      console.log('Account verified and user logged in!');

      router.replace('/onboarding/Welcome');

    } catch (error) {
      console.error('Verification failed:', error);
      Alert.alert(
        'Verification Failed',
        'The token is invalid or has expired. Please try signing up again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Verify Your Account</Text>
        <Text style={styles.subtitle}>
          We've sent a verification token to your email:
        </Text>
        <Text style={styles.emailText}>{email}</Text>
        <Text style={styles.subtitle}>
          Please enter it below to complete your registration.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Verification Token"
          value={token}
          onChangeText={setToken}
          autoCapitalize="none"
        />

        {isLoading ? (
          <ActivityIndicator size="large" color="#FFD700" />
        ) : (
          <TouchableOpacity onPress={handleVerify} style={styles.verifyButton}>
            <Text style={styles.verifyButtonText}>Verify & Log In</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity onPress={() => router.replace('/signup')}>
          <Text style={styles.resendText}>Didn't get a token? Sign up again.</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#000033', // Matching your theme
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700', // Highlight color
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  verifyButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#000033',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resendText: {
    marginTop: 20,
    color: '#FFD700',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});