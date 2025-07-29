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

const sleepcasts = [
  {
    title: 'Harvest Inn',
    image: require('../assets/images/sleep2.jpeg'),
    duration: '45 min',
  },
  {
    title: 'Bengal Forest',
    image: require('../assets/images/music1.jpeg'),
    duration: '45 min',
  },
  {
    title: 'Midnight Launderette',
    image: require('../assets/images/sleep3.jpeg'),
    duration: '45 min',
  },
];

const SleepScreen = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('Featured');

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemRow}>
      <Image source={item.image} style={styles.itemImage} />
      <View>
        <Text style={styles.itemTitle}>🔒 {item.title}</Text>
        <Text style={styles.itemSubtitle}>Sleepcast · {item.duration}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Sleep</Text>

      {/* Banner */}
      <Image source={require('../assets/images/sleep1.jpeg')} style={styles.banner} />

      {/* Featured Block */}
      <View style={styles.featuredBlock}>
        <Text style={styles.featuredLabel}>Featured</Text>
        <Text style={styles.featuredTitle}>Star Wars™ X-wing Voyage</Text>
        <Text style={styles.featuredSubtitle}>Sleepcast · 45 min</Text>
        <TouchableOpacity style={styles.playButton}>
          <Text style={styles.playText}>🔒 Play</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('Recent')}>
          <Text style={[styles.tabText, activeTab === 'Recent' && styles.inactiveTab]}>
            Recent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Featured')}>
          <Text style={[styles.tabText, activeTab === 'Featured' && styles.activeTab]}>
            Featured
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={sleepcasts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
  <Text style={{ color: 'purple', fontSize: 50 }}>←</Text>
</TouchableOpacity>

    
      
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
  banner: {
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

export default SleepScreen;