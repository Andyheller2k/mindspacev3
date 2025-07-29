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

const featuredTracks = [
  {
    title: 'Bedtime Story: The Magic Forest',
    image: require('../assets/images/kids1.jpeg'),
    duration: '8 min',
    type: 'Story',
  },
  {
    title: 'Happy Dance Break',
    image: require('../assets/images/kids3.jpeg'),
    duration: '5 min',
    type: 'Music',
  },
  {
    title: 'Breathe with Teddy',
    image: require('../assets/images/kids2.jpeg'),
    duration: '3 min',
    type: 'Mindfulness',
  },
];

const KidsFamilyScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Featured');

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemRow}>
      <Image source={item.image} style={styles.itemImage} />
      <View>
        <Text style={styles.itemTitle}>🔒 {item.title}</Text>
        <Text style={styles.itemSubtitle}>
          👨‍👩‍👧‍👦 {item.type} · {item.duration}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      

      <Text style={styles.header}>Kids & Family</Text>

      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image source={require('../assets/images/kids.jpeg')} style={styles.bannerImage} />
      </View>

      {/* Featured Info */}
      <View style={styles.featuredBlock}>
        <Text style={styles.featuredLabel}>Today&apos;s Pick</Text>
        <Text style={styles.featuredTitle}>The Rainbow Explorer</Text>
        <Text style={styles.featuredSubtitle}>👨‍👩‍👧‍👦 Story · 12 min</Text>
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
      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
        <Text style={{ color: 'yellow', fontSize: 50 }}>←</Text>
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
    marginTop: 10,
    marginBottom: 8,
  },
  bannerContainer: {
    backgroundColor: '#0D0D2B',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
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
  
});

export default KidsFamilyScreen;
