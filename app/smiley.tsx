import { Feather } from '@expo/vector-icons'; // Checklist icon
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  const checklist = [
    'You took the first step by downloading Mindspace',
    'You opened yourself to something better',
    'You let us know what matters to you',
    'You’ve set an intention to grow',
    'You’re now ready to begin your journey ✨',
    'And always remember,dedication to your mental health is priceless ✨',
  ];

  return (
    <View style={styles.container}>
      {/* Top Yellow Section */}
      <View style={styles.topSection}>
        <Image
          source={require('../assets/images/smiley_bounce_pulse.gif')}
          style={styles.smileyGif}
          resizeMode="cover"
        />
      </View>

      {/* Bottom Blue Section with curved top */}
      <View style={styles.bottomSection}>
        <ScrollView contentContainerStyle={styles.checklistContainer}>
          <Text style={styles.title}>Welcome to Mindspace</Text>

          {checklist.map((item, index) => (
            <View key={index} style={styles.checkItem}>
              <Feather name="check-circle" size={20} color="#FFD700" style={{ marginRight: 10 }} />
              <Text style={styles.checkText}>{item}</Text>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/Today')}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F3F',
  },
  topSection: {
    backgroundColor: '#FFD700', // Deep Yellow
    alignItems: 'center',
    justifyContent: 'center',
    height: '40%',
    paddingTop: 40,
  },
  smileyGif: {
  width: 400,
  height: 400,
  backgroundColor: 'transparent',
},

  bottomSection: {
  flex: 1,
  backgroundColor: '#001F3F', // Deep Blue
  borderTopLeftRadius: 40,
  borderTopRightRadius: 40,
  marginTop: -40, 
  padding: 24,
  justifyContent: 'space-between',
},

  checklistContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  checkItem: {
    marginBottom: 15,
  },
  checkText: {
    fontSize: 18,
    color: 'white',
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#001F3F',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
