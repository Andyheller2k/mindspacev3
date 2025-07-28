import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import meditationData from '../Meditation';
import MeditationCard from '../MeditationCards';

const Cards = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [bgColor, setBgColor] = useState('#ffffff');

  const handlePress = (item) => {
    router.push({
      pathname: '/detail',
      params: { item: JSON.stringify(item) },
    });
  };

 

  const today = new Date();
  const daySeed = today.getFullYear() + today.getMonth() + today.getDate();

  const seededRandom = (seed) => {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const getDailyCards = (() => {
    const shuffled = [...meditationData];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom(daySeed + i) * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 7);
  })();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bgColor }]}>
       <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      
      </View>

      <FlatList
        data={getDailyCards}
        renderItem={({ item, index }) => (
          <View>
            <MeditationCard
              id={item.id}
              title={item.title}
              duration={item.duration}
              image={item.image}
              description={item.description}
              url={item.url}
              onPress={() => handlePress(item)}
            />
            {index === 2 && (
              <Text style={styles.belowText}>🌱 Your afternoon lift.</Text>
            )}
            {index === 4 && (
              <Text style={styles.belowText}>✨ At night.</Text>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16, // spacing from top of screen
    paddingBottom: 32,
  },
  belowText: {
    color: '#000',
    fontSize: 25,
    fontWeight: '300',
    marginTop: 8,
    marginBottom: 20,
    textAlign: 'left',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
});

export default Cards;
