import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';

export default function AboutScreen() {
  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll}>
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
          <Text style={styles.paragraph}>Created with ❤️ by Group 49? – on a mission to build tools that bring clarity, kindness, and connection to human lives.</Text>
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
  title: {
    fontSize: 32,
    color: '#facc15',
    fontWeight: '800',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#38bdf8',
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: '#e2e8f0',
    lineHeight: 24,
  },
});
