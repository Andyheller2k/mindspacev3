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
  const [activeTab, setActiveTab] = useState('Featured');

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemRow}>
      <Image source={item.image} style={styles.itemImage} />
      <View>
        <Text style={styles.itemTitle}>🔒 {item.title}</Text>
        <Text style={styles.itemSubtitle}>
          🎵 {item.type} · {item.duration}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Music</Text>

      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image source={require('../assets/images/music2.jpeg')} style={styles.bannerImage} />
      </View>

      {/* Featured Info */}
      <View style={styles.featuredBlock}>
        <Text style={styles.featuredLabel}>Featured</Text>
        <Text style={styles.featuredTitle}>Guide to Meditation</Text>
        <Text style={styles.featuredSubtitle}>🎵 Focus Music · 135 min</Text>
        <TouchableOpacity style={styles.playButton}>
          <Text style={styles.playText}>🔒 Play</Text>
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
        data={featuredTracks}
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
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginTop: 50,
    marginBottom: 8,
  },
  bannerContainer: {
    backgroundColor: '#FCD32D',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    paddingVertical: 24,
  },
  bannerImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
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
    backgroundColor: '#2979FF',
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
    width: 60,
    height: 60,
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: '#222',
    borderTopWidth: 1,
    paddingVertical: 10,
    backgroundColor: '#0D0D2B',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    color: '#888',
    fontSize: 12,
  },
  navActive: {
    color: 'white',
    fontWeight: '600',
  },
});

export default MusicScreen;