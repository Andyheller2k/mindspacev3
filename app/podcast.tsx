import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const podcasts = [
  {
    title: 'Radio Mindspace',
    subtitle: 'Brighten your day with podcasts your mind will love.',
    image: require('../assets/images/Radio-Mindspace.jpeg'),
  },
  {
    title: 'Radio Mindspace: Special Guests',
    subtitle: 'Some of our favorite faces drop by Radio Mindspace.',
    image: require('../assets/images/best.jpg'),
  },
  {
    title: 'Sunday Scaries by Mindspace',
    subtitle: 'Start Monday more present and refreshed.',
    image: require('../assets/images/Sleep lab.jpeg'),
  },
  {
    title: 'Dear Mindspace',
    subtitle: 'Mindspace’s teachers answer questions from members like you.',
    image: require('../assets/images/Dear mindspace.jpeg'),
  },
  {
    title: 'Sleep Lab',
    subtitle: 'A crash-course guide to better sleep.',
    image: require('../assets/images/Sunday Scaries.jpeg'),
  },
  {
    title: 'Goodnight, World!',
    subtitle: 'Join our friends from Sesame Street on new adventures.',
    image: require('../assets/images/grif.png'),
  },
];

const PodcastScreen = () => {
    const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
  <Ionicons name="arrow-back" size={30} color="#fff" />
</TouchableOpacity>

      <Text style={styles.header}>Podcasts</Text>
      <FlatList
        data={podcasts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D2B',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    width: CARD_WIDTH,
    margin: 8,
    backgroundColor: '#1E1E3F',
    borderRadius: 10,
    padding: 8,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 4,
  },
  backButton: {
  position: 'absolute',
  top: 80,
  left: 16,
  zIndex: 1,
},

});

export default PodcastScreen;