import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#cbd5e1', '#94a3b8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#ffffffcc" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <View style={styles.glassCard}>
            <Text style={styles.title}>About This App</Text>

            <Text style={styles.paragraph}>
              Welcome to MindSpace – your personal sanctuary for mental clarity, emotional reflection, and inner peace.
            </Text>

            <Text style={styles.sectionTitle}>🧠 What is MindSpace?</Text>
            <Text style={styles.paragraph}>
              MindSpace is a carefully crafted mental health companion designed to help you:
              {"\n"}• Reflect on emotions
              {"\n"}• Practice mindfulness
              {"\n"}• Set emotional goals
              {"\n"}• Understand patterns in your mood
              {"\n"}• Connect with your inner self
            </Text>

            <Text style={styles.sectionTitle}>💡 Key Features</Text>
            <Text style={styles.paragraph}>
              • Emotional check-ins with AI{"\n"}
              • Guided grounding and breathing tools{"\n"}
              • Mood analytics and trends{"\n"}
              • Personality-based AI companions{"\n"}
              • Customizable journaling prompts
            </Text>

            <Text style={styles.sectionTitle}>🔐 Your Privacy</Text>
            <Text style={styles.paragraph}>
              All your data is stored locally or securely encrypted. We value your emotional safety and do not share your personal reflections with anyone.
            </Text>

            <Text style={styles.sectionTitle}>✨ Version</Text>
            <Text style={styles.paragraph}>MindSpace v1.0.0</Text>

            <Text style={styles.sectionTitle}>👨‍💻 Developer</Text>
            <Text style={styles.paragraph}>
              Created with ❤️ by Group 59 – on a mission to build tools that bring clarity, kindness, and connection to human lives.
            </Text>
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'flex-start',
    padding: 8,
    backgroundColor: '#ffffff22',
    borderRadius: 12,
    backdropFilter: 'blur(10px)',
  },
  backText: {
    color: '#f8fafc',
    fontSize: 16,
    marginLeft: 6,
  },
  glassCard: {
    backgroundColor: '#ffffff22',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    backdropFilter: 'blur(12px)',
    borderColor: '#ffffff33',
    borderWidth: 1,
  },
  title: {
    fontSize: 26,
    color: '#f1f5f9',
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#e0e7ff',
    fontWeight: '600',
    marginTop: 18,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
    color: '#f8fafc',
    lineHeight: 22,
    fontWeight: '300',
  },
});
