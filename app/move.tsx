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

const workouts = [
  {
    title: 'Stress Release',
    image: require('../assets/images/work.jpeg'),
    duration: '29 min',
  },
  {
    title: 'Day 1',
    image: require('../assets/images/work1.jpeg'),
    duration: '22 min',
  },
  {
    title: 'Reframing Anxiety',
    image: require('../assets/images/workout2.jpeg'),
    duration: '21 min',
  },
];

const MoveScreen = () => {
  const [activeTab, setActiveTab] = useState('Featured');

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemRow}>
      <Image source={item.image} style={styles.itemImage} />
      <View>
        <Text style={styles.itemTitle}>🔒 {item.title}</Text>
        <Text style={styles.itemSubtitle}>🎬 Workout · {item.duration}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      

      {/* Main Image */}
      <View style={styles.imageBlock}>
        <Image source={require('../assets/images/Stress.jpeg')} style={styles.mainImage} />
      </View>

      {/* Featured Section */}
      <View style={styles.featuredBlock}>
        <Text style={styles.featuredLabel}>Featured</Text>
        <Text style={styles.featuredTitle}>Posture Strengthener</Text>
        <Text style={styles.featuredSubtitle}>🎬 Workout · 11 min</Text>
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
        data={workouts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Bottom Navigation */}
      
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
  imageBlock: {
    backgroundColor: '#F5F3F0',
    borderBottomLeftRadius: 70,
    borderTopLeftRadius:70,
    borderTopRightRadius:70,
    borderBottomRightRadius: 70,
    alignItems: 'center',
    paddingVertical: 50,
  },
  mainImage: {
    width: 160,
    height: 160,
    borderRadius: 20,
    resizeMode: 'cover',
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

export default MoveScreen;