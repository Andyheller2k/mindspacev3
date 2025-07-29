import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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
  View,
} from 'react-native';
import api from './api.js';



export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
  if (!email.trim() || !password.trim()) {
    Alert.alert('Error', 'Please enter both email and password.');
    return;
  }

  setIsLoading(true);
  try {
    const response = await api.post('/api/v1/auth/authenticate', {
      email,
      password,
    });

    await AsyncStorage.setItem('userToken', response.data.token);
    router.replace('/(tabs)/Today');
  } catch (error) {
    Alert.alert('Login Failed', 'Incorrect email or password.');
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
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.topSection}>
            <Image source={require('../assets/images/Serene Meditation in Nature.png')} style={styles.image} />
            <Text style={styles.welcomeText}>MindSpace</Text>
          </View>

          <View style={styles.bottomSection}>
            <Text style={styles.loginText}>Login to your Account</Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {isLoading ? (
              <ActivityIndicator size="large" color="#007AFF" />
            ) : (
              <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.switchText}>Don&apos;t have an Account?{' '}
              <Text style={styles.link} onPress={() => router.replace('/signup')}>Sign up</Text>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  topSection: {
    backgroundColor: '#FFD700', // yellow
    paddingVertical: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  image: {
    height: 250,
    width: 250,
    marginBottom: 10,
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000033', // dark blue text for contrast
    textAlign: 'center',
  },
  bottomSection: {
    backgroundColor: '#000033', // deep blue
    flex: 1,
    padding: 24,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -20,
  },
  loginText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#000033',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchText: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 14,
    color: 'white',
  },
  link: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
});
