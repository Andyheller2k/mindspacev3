import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import React, { JSX, useEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Session {
  id: string;
  name: string;
  duration: number;
  category: string;
  description: string;
}

type ViewType = 'sessions' | 'timer' | 'custom';
type TimerState = 'idle' | 'running' | 'paused' | 'completed';

const sessions: Session[] = [
  {
    id: '1',
    name: 'Quick Relax',
    duration: 5,
    category: 'Relaxation',
    description: 'A short relaxation session to reset your mind'
  },
  {
    id: '2',
    name: 'Morning Calm',
    duration: 10,
    category: 'Morning',
    description: 'Start your day with peaceful mindfulness'
  },
  {
    id: '3',
    name: 'Deep Focus',
    duration: 15,
    category: 'Focus',
    description: 'Enhance concentration and mental clarity'
  },
  {
    id: '4',
    name: 'Sleep Preparation',
    duration: 20,
    category: 'Sleep',
    description: 'Wind down and prepare for restful sleep'
  },
];

export default function MeditationTimerEnhanced(): JSX.Element {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [view, setView] = useState<ViewType>('sessions');
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [selectedDuration, setSelectedDuration] = useState<number>(10);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerState === 'running' && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setTimerState('completed');
            Alert.alert('Session Complete', 'Great job! Your meditation session is complete.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState, timeLeft]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSessionStart = (session: Session) => {
    setCurrentSession(session);
    setTimeLeft(session.duration * 60);
    setView('timer');
    setTimerState('idle');
  };

  const startTimer = () => {
    if (timeLeft > 0) {
      setTimerState('running');
    }
  };

  const pauseTimer = () => {
    setTimerState('paused');
  };

  const stopTimer = () => {
    setTimerState('idle');
    if (currentSession) {
      setTimeLeft(currentSession.duration * 60);
    } else {
      setTimeLeft(selectedDuration * 60);
    }
  };

  const startCustomSession = () => {
    setCurrentSession(null);
    setTimeLeft(selectedDuration * 60);
    setView('timer');
    setTimerState('idle');
  };

  const renderSession = ({ item }: { item: Session }) => (
    <TouchableOpacity
      style={styles.sessionCard}
      onPress={() => handleSessionStart(item)}
      activeOpacity={0.8}
    >
      <View style={styles.sessionHeader}>
        <Text style={styles.sessionTitle}>{item.name}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
      <Text style={styles.sessionDescription}>{item.description}</Text>
      <View style={styles.sessionInfo}>
        <Ionicons name="time-outline" size={16} color="#6B7280" />
        <Text style={styles.sessionDuration}>{item.duration} min</Text>
        <Ionicons name="headset-outline" size={16} color="#6B7280" style={styles.headphoneIcon} />
      </View>
    </TouchableOpacity>
  );

  const renderTimerView = () => (
    <View style={styles.timerContainer}>
      <Text style={styles.sessionName}>
        {currentSession ? currentSession.name : 'Custom Session'}
      </Text>
      <View style={[
        styles.timerCircle,
        timerState === 'running' && styles.timerRunning,
        timerState === 'completed' && styles.timerCompleted
      ]}>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        <Text style={styles.timerStatus}>
          {timerState === 'running' ? 'Meditating...' :
           timerState === 'paused' ? 'Paused' :
           timerState === 'completed' ? 'Complete!' : 'Ready'}
        </Text>
      </View>
      <View style={styles.timerControls}>
        {timerState === 'idle' || timerState === 'paused' ? (
          <TouchableOpacity style={styles.controlButton} onPress={startTimer}>
            <Ionicons name="play" size={24} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.controlButton} onPress={pauseTimer}>
            <Ionicons name="pause" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.controlButton} onPress={stopTimer}>
          <Ionicons name="stop" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCustomView = () => (
    <View style={styles.customContainer}>
      <Text style={styles.customTitle}>Create Custom Session</Text>
      <Text style={styles.customSubtitle}>Select duration for your meditation</Text>
      <View style={styles.durationSelector}>
        {[5, 10, 15, 20, 30].map((duration) => (
          <TouchableOpacity
            key={duration}
            style={[
              styles.durationButton,
              selectedDuration === duration && styles.selectedDurationButton
            ]}
            onPress={() => setSelectedDuration(duration)}
          >
            <Text style={[
              styles.durationText,
              selectedDuration === duration && styles.selectedDurationText
            ]}>
              {duration}m
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.startCustomButton} onPress={startCustomSession}>
        <Text style={styles.startCustomText}>Start {selectedDuration} Minute Session</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F3FF" />

       <View style={[styles.safeArea, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
  <Ionicons name="arrow-back" size={24} color="#4F46E5" />
</TouchableOpacity>

          <Text style={styles.headerTitle}>Meditation</Text>

        </View>

        {/* Toggle Tabs */}
        <View style={styles.toggleHeader}>
          {(['sessions', 'timer', 'custom'] as ViewType[]).map((label) => (
            <TouchableOpacity
              key={label}
              onPress={() => setView(label)}
              style={[
                styles.toggleButton,
                view === label && styles.activeToggleButton
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  view === label && styles.activeToggle,
                ]}
              >
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content Views */}
        {view === 'sessions' && (
          <FlatList
            data={sessions}
            keyExtractor={(item) => item.id}
            renderItem={renderSession}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}

        {view === 'timer' && renderTimerView()}

        {view === 'custom' && renderCustomView()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F3FF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F3FF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  toggleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeToggleButton: {
    backgroundColor: '#4F46E5',
  },
  toggleText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeToggle: {
    color: '#fff',
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sessionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  sessionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  categoryBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '500',
  },
  sessionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionDuration: {
    marginLeft: 6,
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  headphoneIcon: {
    marginLeft: 16,
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sessionName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 40,
    textAlign: 'center',
  },
  timerCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  timerRunning: {
    backgroundColor: '#10B981',
  },
  timerCompleted: {
    backgroundColor: '#F59E0B',
  },
  timerText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  timerStatus: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  timerControls: {
    flexDirection: 'row',
    gap: 20,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  customTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  customSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  durationSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  durationButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  selectedDurationButton: {
    backgroundColor: '#4F46E5',
  },
  durationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
  },
  selectedDurationText: {
    color: '#fff',
  },
  startCustomButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startCustomText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
