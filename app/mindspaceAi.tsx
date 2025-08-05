import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const STORAGE_KEY = '@mindspace_ai_messages';

export default function MindspaceAiScreen() {
    const router = useRouter();

  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setMessages(parsed);
      } else {
        // No chat history? Show initial AI welcome message
        const welcomeMessage = {
          role: 'assistant',
          content: 'Hello there my wonderful Mindspace user \nHow can I assist you today?',
        };
        setMessages([welcomeMessage]);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([welcomeMessage]));
      }
    } catch (err) {
      console.warn('Failed to load chat history:', err);
    }
  };

  const saveMessages = async (msgs: typeof messages) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
    } catch (err) {
      console.warn('Failed to save chat history:', err);
    }
  };

const fetchAIResponse = async (userMessage: string) => {
  setLoading(true);
  try {
    const updatedMessages = [
      ...messages,
      { role: 'user', content: userMessage },
    ];

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer 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',
        'Content-Type': 'application/json',
      },



      
      body: JSON.stringify({
        model: 'qwen/qwen3-coder:free',
        messages: [
          {
            role: 'system',
            content:
              'You are a compassionate and mindful mental wellness assistant. Respond briefly (2–3 sentences), supportively, and gently with insight and emotional warmth. Always consider prior messages when responding.',
          },
          ...updatedMessages,
        ],
      }),
    });

    const data = await res.json();
    const aiReply =
      data.choices?.[0]?.message?.content ??
      'I’m here for you. Let’s take a breath and start again.';

    const finalMessages = [...updatedMessages, { role: 'assistant', content: aiReply }];
    setMessages(finalMessages);
    saveMessages(finalMessages);
  } catch (err) {
    const fallbackMsg = 'Sorry, I couldn’t connect. Let’s try again when you’re ready.';
    const fallback = [...messages, { role: 'assistant', content: fallbackMsg }];
    setMessages(fallback);
    saveMessages(fallback);
  } finally {
    setLoading(false);
  }
};


  const handleSend = () => {
    if (!input.trim()) return;
    fetchAIResponse(input.trim());
    setInput('');
  };

  const clearChat = async () => {
    Alert.alert('Clear Chat?', 'Are you sure you want to delete all messages?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: async () => {
          const welcomeMessage = {
            role: 'assistant',
            content: 'Hello there my wonderful Mindspace user 🌿\nHow can I assist you today?',
          };
          setMessages([welcomeMessage]);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([welcomeMessage]));
        },
      },
    ]);
  };

  return (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.headerText}>🧘 Ask Mindspace</Text>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <TouchableOpacity onPress={clearChat}>
          <Ionicons name="trash-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>

    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.chatArea}
          contentContainerStyle={{ paddingBottom: 16 }}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                msg.role === 'user' ? styles.userBubble : styles.aiBubble,
              ]}
            >
              <Text style={styles.messageText}>{msg.content}</Text>
            </View>
          ))}
          {loading && <ActivityIndicator size="large" color="#f4a261" />}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Ask something gentle..."
            placeholderTextColor="#999"
            style={styles.input}
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity onPress={handleSend} disabled={loading}>
            <Ionicons name="send" size={24} color={loading ? '#aaa' : '#00b4d8'} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>
);

}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fef6ec',
  },
  header: {
    backgroundColor: '#fffff',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#000',
    fontSize: 30,
    fontWeight: '700',
  },
  chatArea: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fef6ec',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    marginVertical: 6,
    borderRadius: 14,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#ffd699',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#cceeff',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
  backgroundColor: '#fff',
  flexDirection: 'row',
  padding: 12,
  alignItems: 'center',
  borderTopWidth: 1,
  borderColor: '#ccc',
},

  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginRight: 8,
    color: '#000',
  },
});
