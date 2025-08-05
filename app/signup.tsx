// Signup.js (refactored with two-tone layout)
import { Ionicons } from '@expo/vector-icons';
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
import api from './api.js';


const { height } = Dimensions.get('window');

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState('');
   const [name2, setName2] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
const handleSignUp = async () => {
  // --- 1. CONSOLIDATED VALIDATION ---
  // We define all regex patterns and trimmed values once at the top.

  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[\w.-]+@(gmail|yahoo|outlook)\.com$/i;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]).{8,}$/;

  const trimmedFirstName = name.trim();
  const trimmedLastName = name2.trim(); // Assuming name2 is for the last name
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();
  const trimmedConfirmPassword = confirmPassword.trim();

  // Perform all validation checks sequentially.
  if (!trimmedFirstName || !trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
    Alert.alert('Error', 'Please fill in all required fields.');
    return;
  }
  if (!nameRegex.test(trimmedFirstName)) {
    Alert.alert('Invalid First Name', 'Name should contain only letters and spaces.');
    return;
  }
  // Allow last name to be empty, but if it's not, validate it.
  if (trimmedLastName && !nameRegex.test(trimmedLastName)) {
    Alert.alert('Invalid Last Name', 'Name should contain only letters and spaces.');
    return;
  }
  if (!emailRegex.test(trimmedEmail)) {
    Alert.alert('Invalid Email', 'Only Gmail, Yahoo, or Outlook emails are allowed.');
    return;
  }
  if (!passwordRegex.test(trimmedPassword)) {
    Alert.alert('Invalid Password', 'Password must be at least 8 characters and include letters, numbers, and symbols.');
    return;
  }
  if (trimmedPassword !== trimmedConfirmPassword) {
    Alert.alert('Error', 'Passwords do not match.');
    return;
  }

  // --- 2. API CALL WITH CORRECTED LOGIC ---
  setIsLoading(true);
  try {
    // Call the backend to create the unverified user and send the email.
    // This endpoint no longer returns a login token.
    await api.post('/api/v1/auth/register', {
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      email: trimmedEmail,
      password: trimmedPassword,
    });

    // --- 3. NAVIGATE TO THE VERIFY SCREEN ---
    // Show a success message to the user.
    Alert.alert(
      'Registration Successful!',
      'We have sent a verification token to your email. Please check your inbox to complete your registration.'
    );

    // Navigate the user to the new "Verify" screen.
    // This is where they will enter the token from their email.
    // Make sure you have a screen located at `app/verify.tsx` or similar.
    router.push({
      pathname: '/verify',
      params: { email: trimmedEmail } // Pass the email to pre-fill it on the next screen
    });

  } catch (error) {
    // --- 4. IMPROVED ERROR HANDLING ---
    // Check if the error is a 409 Conflict from our backend (email in use).
    if (error.response && error.response.status === 409) {
      Alert.alert('Sign Up Failed', 'This email address is already in use.');
    } else {
      // Handle other potential errors (e.g., network down, server error).
      console.error('Sign up error:', error);
      Alert.alert('Sign Up Failed', 'An unexpected error occurred. Please try again later.');
    }
  } finally {
    setIsLoading(false);
  }
};
  
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]).{8,}$/;


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
            
            <TextInput style={styles.input} placeholder="First Name" value={name} onChangeText={setName} />
            {name.length > 0 && !/^[A-Za-z\s]+$/.test(name) && (
  <Text style={{ color: 'red', fontSize: 12, marginBottom: 10 }}>
    Name should contain only letters and spaces.
  </Text>
  
)}   

          <TextInput style={styles.input} placeholder="Last Name" value={name2} onChangeText={setName2} />
            {name.length > 0 && !/^[A-Za-z\s]+$/.test(name) && (
  <Text style={{ color: 'red', fontSize: 12, marginBottom: 10 }}>
    Name should contain only letters and spaces.
  </Text>
  
)}


            
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            {email.length > 0 && !/^[\w.-]+@(gmail|yahoo|outlook)\.com$/i.test(email) && (
  <Text style={{ color: 'red', fontSize: 12, marginBottom: 10 }}>
    Only Gmail or Yahoo emails are allowed.
  </Text>
)}
            <View style={styles.inputWrapper}>
            <TextInput style={styles.innerInput} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry ={!showPassword} />
            <TouchableOpacity  onPress={()=> setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? 'eye': 'eye-off'} size={24} color="gray"/>
              </TouchableOpacity>
              </View>
            {password.length > 0 && !passwordRegex.test(password) && (
  <Text style={{ color: 'red', fontSize: 12, marginBottom: 10 }}>
    Use 8+ characters, with letters, numbers & symbols.
  </Text>
)}

            <View style={styles.inputWrapper}>
            <TextInput style={styles.innerInput} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry ={!showConfirmPassword}/>
            <TouchableOpacity onPress={()=> setShowConfirmPassword(!showConfirmPassword)}
            style={styles.eyeIcon}>
              <Ionicons name ={showConfirmPassword? 'eye':'eye-off'} size={24} color="gray" />
            </TouchableOpacity>
            </View>

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
inputWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 10,
  backgroundColor: 'white',
  marginBottom: 15,
  paddingHorizontal: 10,
},

innerInput:{
flex:1,
height:50,
paddingHorizontal:10,
color:'black'
},

eyeIcon: {
  padding: 5,
},
  
  
});
