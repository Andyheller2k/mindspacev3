import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SleepStory {
  id: string;
  title: string;
  narrator: string;
  duration: string;
  description: string;
  category: string;
  isPremium: boolean;
  rating: number;
  plays: string;
}

interface AmbientSound {
  id: string;
  title: string;
  description: string;
  duration: string;
  isPremium: boolean;
  category: string;
}

const sleepStories: SleepStory[] = [
  {
    id: '1',
    title: 'Rainforest Journey',
    narrator: 'Matthew McConaughey',
    duration: '45 min',
    description: 'A peaceful walk through a tropical rainforest with gentle rain and nature sounds.',
    category: 'Nature',
    isPremium: false,
    rating: 4.8,
    plays: '2.3M',
  },
  {
    id: '2',
    title: 'The Midnight Library',
    narrator: 'Emma Stone',
    duration: '52 min',
    description: 'Explore a magical library where every book holds a different story of peaceful dreams.',
    category: 'Fantasy',
    isPremium: true,
    rating: 4.9,
    plays: '1.8M',
  },
  {
    id: '3',
    title: 'Ocean Waves at Sunset',
    narrator: 'Morgan Freeman',
    duration: '38 min',
    description: 'Drift away to the sound of gentle waves lapping against a peaceful shore.',
    category: 'Nature',
    isPremium: false,
    rating: 4.7,
    plays: '3.1M',
  },
  {
    id: '4',
    title: 'Mountain Cabin Retreat',
    narrator: 'Benedict Cumberbatch',
    duration: '41 min',
    description: 'Escape to a cozy mountain cabin surrounded by snow and silence.',
    category: 'Nature',
    isPremium: true,
    rating: 4.6,
    plays: '1.5M',
  },
];

const ambientSounds: AmbientSound[] = [
  {
    id: '1',
    title: 'Rain on Leaves',
    description: 'Gentle rainfall through forest canopy',
    duration: '8 hours',
    isPremium: false,
    category: 'Rain',
  },
  {
    id: '2',
    title: 'Ocean Waves',
    description: 'Rhythmic waves on a peaceful beach',
    duration: '8 hours',
    isPremium: false,
    category: 'Water',
  },
  {
    id: '3',
    title: 'Crackling Fireplace',
    description: 'Warm fire with gentle crackling sounds',
    duration: '8 hours',
    isPremium: true,
    category: 'Fire',
  },
  {
    id: '4',
    title: 'Forest Birds',
    description: 'Peaceful bird songs in a quiet forest',
    duration: '8 hours',
    isPremium: false,
    category: 'Nature',
  },
];

export default function SleepStoriesScreen(): JSX.Element {
  const insets = useSafeAreaInsets();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [playingStory, setPlayingStory] = useState<string | null>(null);
  const [playingSound, setPlayingSound] = useState<string | null>(null);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const handlePlayStory = (story: SleepStory) => {
    if (story.isPremium) {
      Alert.alert(
        'Premium Content',
        'This story requires a premium subscription. Would you like to upgrade?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Upgrade', onPress: () => console.log('Upgrade pressed') }
        ]
      );
      return;
    }
    
    setPlayingStory(playingStory === story.id ? null : story.id);
    setPlayingSound(null);
    console.log(`Playing story: ${story.title}`);
  };

  const handlePlaySound = (sound: AmbientSound) => {
    if (sound.isPremium) {
      Alert.alert(
        'Premium Content',
        'This ambient sound requires a premium subscription. Would you like to upgrade?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Upgrade', onPress: () => console.log('Upgrade pressed') }
        ]
      );
      return;
    }
    
    setPlayingSound(playingSound === sound.id ? null : sound.id);
    setPlayingStory(null);
    console.log(`Playing sound: ${sound.title}`);
  };

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      Nature: '#10b981',
      Fantasy: '#8b5cf6',
      Rain: '#3b82f6',
      Water: '#06b6d4',
      Fire: '#f59e0b',
    };
    return colors[category] || '#6b7280';
  };

  const renderStoryCard = (story: SleepStory) => (
    <View key={story.id} style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardContent}>
          <View style={styles.titleRow}>
            <Text style={styles.cardTitle}>{story.title}</Text>
            {story.isPremium && (
              <View style={styles.premiumBadge}>
                <Ionicons name="diamond" size={12} color="#f59e0b" />
                <Text style={styles.premiumText}>Premium</Text>
              </View>
            )}
          </View>
          <Text style={styles.cardMeta}>Narrated by {story.narrator}</Text>
          <Text style={styles.cardDesc}>{story.description}</Text>
          
          <View style={styles.cardStats}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={14} color="#6b7280" />
              <Text style={styles.statText}>{story.duration}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="star" size={14} color="#facc15" />
              <Text style={styles.statText}>{story.rating}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="headset-outline" size={14} color="#6b7280" />
              <Text style={styles.statText}>{story.plays}</Text>
            </View>
            <View style={[styles.categoryBadge, { backgroundColor: `${getCategoryColor(story.category)}20` }]}>
              <Text style={[styles.categoryText, { color: getCategoryColor(story.category) }]}>
                {story.category}
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          onPress={() => toggleFavorite(story.id)}
          style={styles.favoriteButton}
        >
          <Ionicons
            name={favorites.includes(story.id) ? 'heart' : 'heart-outline'}
            size={24}
            color={favorites.includes(story.id) ? '#ef4444' : '#9ca3af'}
          />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={[
          styles.playButton,
          playingStory === story.id && styles.playingButton
        ]}
        onPress={() => handlePlayStory(story)}
        activeOpacity={0.8}
      >
        <Ionicons 
          name={playingStory === story.id ? 'pause' : 'play'} 
          size={16} 
          color="#fff" 
        />
        <Text style={styles.playButtonText}>
          {playingStory === story.id ? 'Pause Story' : 'Play Story'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderSoundCard = (sound: AmbientSound) => (
    <View key={sound.id} style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardContent}>
          <View style={styles.titleRow}>
            <Text style={styles.cardTitle}>{sound.title}</Text>
            {sound.isPremium && (
              <View style={styles.premiumBadge}>
                <Ionicons name="diamond" size={12} color="#f59e0b" />
                <Text style={styles.premiumText}>Premium</Text>
              </View>
            )}
          </View>
          <Text style={styles.cardDesc}>{sound.description}</Text>
          
          <View style={styles.cardStats}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={14} color="#6b7280" />
              <Text style={styles.statText}>{sound.duration}</Text>
            </View>
            <View style={[styles.categoryBadge, { backgroundColor: `${getCategoryColor(sound.category)}20` }]}>
              <Text style={[styles.categoryText, { color: getCategoryColor(sound.category) }]}>
                {sound.category}
              </Text>
            </View>
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        style={[
          styles.playButton, 
          styles.soundButton,
          playingSound === sound.id && styles.playingSoundButton
        ]}
        onPress={() => handlePlaySound(sound)}
        activeOpacity={0.8}
      >
        <Ionicons 
          name={playingSound === sound.id ? 'pause' : 'volume-high'} 
          size={16} 
          color="#fff" 
        />
        <Text style={styles.playButtonText}>
          {playingSound === sound.id ? 'Pause Sound' : 'Play Sound'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
          <View style={[styles.safeArea, { paddingTop: insets.top }]}>
          <Text style={styles.title}>Sleep Stories & Sounds</Text>
          <Text style={styles.subtitle}>Drift off to sleep with relaxing stories and sounds</Text>
        </View>

        {/* Sleep Stories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sleep Stories</Text>
            <Ionicons name="book-outline" size={24} color="#7c3aed" />
          </View>
          {sleepStories.map(renderStoryCard)}
        </View>

        {/* Ambient Sounds Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ambient Sounds</Text>
            <Ionicons name="musical-notes-outline" size={24} color="#2563eb" />
          </View>
          {ambientSounds.map(renderSoundCard)}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1e293b',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  cardContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    flex: 1,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  premiumText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#f59e0b',
    marginLeft: 2,
  },
  cardMeta: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  cardDesc: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardStats: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  favoriteButton: {
    padding: 4,
  },
  playButton: {
    backgroundColor: '#7c3aed',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7c3aed',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  playingButton: {
    backgroundColor: '#10b981',
  },
  soundButton: {
    backgroundColor: '#2563eb',
  },
  playingSoundButton: {
    backgroundColor: '#10b981',
  },
  playButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
  bottomSpacing: {
    height: 20,
  },
});