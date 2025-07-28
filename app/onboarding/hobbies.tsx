import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const hobbiesList = [
  'Meditation',
  'Yoga',
  'Reading',
  'Journaling',
  'Walking',
  'Art',
  'Music',
  'Gardening',
  'Breathing Exercises',
  'Digital Detox',
  'Gaming',
  'Singing',
];

export default function HobbiesScreen() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleHobby = (hobby: string) => {
    setSelected((prev) =>
      prev.includes(hobby)
        ? prev.filter((h) => h !== hobby)
        : [...prev, hobby]
    );
  };

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('userHobbies', JSON.stringify(selected));
      router.push('/onboarding/profile');
    } catch (error) {
      console.error('Error saving hobbies:', error);
    }
  };

  const renderHobby = ({ item }: { item: string }) => (
    <TouchableOpacity
      onPress={() => toggleHobby(item)}
      style={{
        paddingVertical: 14,
        paddingHorizontal: 12,
        margin: 8,
        backgroundColor: selected.includes(item) ? '#0077B6' : '#FFFACD',
        borderRadius: 12,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          color: selected.includes(item) ? '#fff' : '#000',
          fontSize: 16,
        }}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E0FFFF' /* light sea */ }}>
      <View style={{ alignItems: 'center', paddingTop: 60 }}>
        <Image
          source={require('../../assets/images/hobbies.png')}
          style={{
            width: 200,
            height: 240,
            resizeMode: 'cover',
            borderRadius: 20,
          }}
        />
      </View>

      <ScrollView contentContainerStyle={{ paddingTop: 90, paddingBottom: 50 }}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
            What hobbies help you relax?
          </Text>

          <FlatList
            data={hobbiesList}
            renderItem={renderHobby}
            keyExtractor={(item) => item}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingBottom: 10 }}
            scrollEnabled={false}
          />

          <TouchableOpacity
            onPress={handleContinue}
            disabled={selected.length === 0}
            style={{
              backgroundColor: selected.length === 0 ? '#ccc' : '#0077B6',
              padding: 16,
              marginTop: 8,
              borderRadius: 12,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 18 }}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
