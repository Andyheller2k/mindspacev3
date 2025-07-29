import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const featuredMovies = [
  {
    title: 'Into the Multiverse',
    image: require('../assets/images/movie1.jpeg'),
    duration: '2h 12m',
    type: 'Sci-Fi',
  },
  {
    title: 'Laugh Out Loud',
    image: require('../assets/images/movie2.jpeg'),
    duration: '1h 45m',
    type: 'Comedy',
  },
  {
    title: 'Chasing Legends',
    image: require('../assets/images/movie3.jpeg'),
    duration: '2h 8m',
    type: 'Adventure',
  },
];

const MoviesEntertainmentScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Featured');

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemRow}>
      <Image source={item.image} style={styles.itemImage} />
      <View>
        <Text style={styles.itemTitle}>🎬 {item.title}</Text>
        <Text style={styles.itemSubtitle}>
          🍿 {item.type} · {item.duration}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
        <Text style={{ color: 'yellow', fontSize: 50 }}>←</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Movies & Entertainment</Text>

      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image source={require('../assets/images/movie4.jpeg')} style={styles.bannerImage} />
      </View>

      {/* Featured Info */}
      <View style={styles.featuredBlock}>
        <Text style={styles.featuredLabel}>Tonight’s Spotlight</Text>
        <Text style={styles.featuredTitle}>Edge of Reality</Text>
        <Text style={styles.featuredSubtitle}>🎬 Thriller · 1h 58m</Text>
        <TouchableOpacity style={styles.playButton}>
          <Text style={styles.playText}>▶️ Watch</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <Text
          onPress={() => setActiveTab('Recent')}
          style={[styles.tabText, activeTab === 'Recent' && styles.inactiveTab]}>
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
        data={featuredMovies}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D2B',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    marginTop: 10,
    marginBottom: 8,
  },
  bannerContainer: {
    backgroundColor: '#0D0D2B',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 24,
  },
   bannerImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  featuredBlock: {
    marginTop: 20,
    marginBottom: 20,
  },
  featuredLabel: {
    color: '#999',
    fontSize: 12,
    marginBottom: 4,
  },
  featuredTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  featuredSubtitle: {
    color: '#999',
    fontSize: 14,
    marginVertical: 4,
  },
  playButton: {
    backgroundColor: '#E50914',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  playText: {
    color: 'white',
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tabText: {
    marginRight: 24,
    fontSize: 16,
    color: '#aaa',
  },
  activeTab: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  inactiveTab: {
    color: '#555',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  itemTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  itemSubtitle: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
  },
});

export default MoviesEntertainmentScreen;
