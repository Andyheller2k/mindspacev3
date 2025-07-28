// components/Cards.js
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import meditationData from './Meditation';
import MeditationCard from './MeditationCards';

const Cards = () => {
  const router = useRouter(); 

  const handlePress = (item) => {
    router.push({
      pathname: '/detail',
      params: { item: JSON.stringify(item) },
    });
  };

  // Get today's date
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
  })(); // ✅ Immediately invoked

  return (
    <FlatList
      data={getDailyCards}
      renderItem={({ item, index }) => (
        <View>
          <MeditationCard
            id={item.id} // ✅ ADD THIS - Essential for favorites to work correctly
            title={item.title}
            duration={item.duration}
            image={item.image}
            description={item.description} // ✅ ADD THIS - Needed by favorites context
            url={item.url} // ✅ ADD THIS - Needed for sharing functionality
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
      contentContainerStyle={{ paddingHorizontal: 16 }}
    />
  );
};

const styles = StyleSheet.create({
  belowText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '300',
    marginTop: 8,
    marginBottom: 20,
    textAlign: 'left',
    paddingHorizontal: 20,
  },
});

export default Cards;