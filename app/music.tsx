import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const images = [
  require('../assets/images/music1.jpeg'),
  require('../assets/images/music3.jpeg'),
  require('../assets/images/music5.jpeg'),
];

const featuredTracks = [
  {
    title: 'Breathing through exams',
    image: require('../assets/images/music1.jpeg'),
    duration: '10 min',
    type: 'Meditation',
  },
  {
    title: 'Organizing Thoughts',
    image: require('../assets/images/music3.jpeg'),
    duration: '7 min',
    type: 'Meditation',
  },
  {
    title: 'Study Beats',
    image: require('../assets/images/music5.jpeg'),
    duration: '54 min',
    type: 'Focus Music',
  },
];

const MusicScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Featured');

  const renderItem = ({ item }) => (
    <BlurView intensity={100} tint="dark" style={styles.glassmorphicItemContainer}>
      <TouchableOpacity style={styles.itemRow}>
        <Image source={item.image} style={styles.itemImage} />
        <View>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemSubtitle}>
            {item.type} · {item.duration}
          </Text>
        </View>
      </TouchableOpacity>
    </BlurView>
  );

  return (
    <ImageBackground
      source={require('../assets/images/background.png')} // Make sure to have a background image
      style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Music</Text>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image source={require('../assets/images/music2.jpeg')} style={styles.bannerImage} />
        </View>

        {/* Featured Info with Glassmorphism */}
        <BlurView intensity={100} tint="dark" style={styles.glassmorphicContainer}>
          <View style={styles.featuredBlock}>
            <Text style={styles.featuredLabel}>Featured</Text>
            <Text style={styles.featuredTitle}>Guide to Meditation</Text>
            <Text style={styles.featuredSubtitle}>🎵 Focus Music · 135 min</Text>
            <TouchableOpacity style={styles.playButton}>
              <Text style={styles.playText}>Play Now</Text>
            </TouchableOpacity>
          </View>
        </BlurView>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <Text
            onPress={() => setActiveTab('Recent')}
            style={[styles.tabText, activeTab === 'Recent' && styles.activeTab]}>
            Recent
          </Text>
          <Text
            onPress={() => setActiveTab('Featured')}
            style={[styles.tabText, activeTab === 'Featured' && styles.activeTab]}>
            Featured
          </Text>
        </View>

        {/* List */}
        <FlatList
          data={featuredTracks}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
          <Text style={{ color: 'yellow', fontSize: 50 }}>←</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.3)', // Semi-transparent overlay
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'center',
  },
  bannerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerImage: {
    width: 160,
    height: 160,
    resizeMode: 'cover',
    borderRadius: 80,
  },
  glassmorphicContainer: {
    borderRadius: 20,
    overflow: 'hidden', // This is important for borderRadius to work on Android
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    marginBottom: 20,
  },
  featuredBlock: {
    padding: 20,
  },
  featuredLabel: {
    color: '#ccc',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  featuredTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  featuredSubtitle: {
    color: '#ddd',
    fontSize: 14,
    marginVertical: 8,
  },
  playButton: {
    backgroundColor: 'rgba(252, 211, 45, 0.8)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  playText: {
    color: '#0D0D2B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  tabText: {
    marginHorizontal: 16,
    fontSize: 16,
    color: '#aaa',
    fontWeight: '500',
  },
  activeTab: {
    color: 'white',
    fontWeight: 'bold',
    borderBottomColor: 'rgba(252, 211, 45, 0.8)',
    borderBottomWidth: 2,
  },
  glassmorphicItemContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 16,
  },
  itemTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  itemSubtitle: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 4,
  },
});

export default MusicScreen;