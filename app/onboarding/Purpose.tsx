import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const purposeOptions = [
  'Reduce Stress',
  'Improve Focus',
  'Better Sleep',
  'Enhance Self-awareness',
  'Boost Creativity',
  'Emotional Balance',
];

export default function PurposeScreen() {
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const router = useRouter();

  const handleSelect = async (purpose: string) => {
    setSelectedPurpose(purpose === selectedPurpose ? null : purpose);
    await AsyncStorage.setItem('userPurpose', purpose);
    setTimeout(() => {
      router.push('/onboarding/hobbies');
    }, 300);
  };

  const renderPurpose = ({ item }: { item: string }) => {
    const isSelected = selectedPurpose === item;

    const buttonContent = (
      <Text
        style={{
          color: isSelected ? 'white' : '#111827',
          fontSize: 16,
          textAlign: 'center',
        }}
      >
        {item}
      </Text>
    );

    return (
      <TouchableOpacity
        onPress={() => handleSelect(item)}
        style={{
          marginVertical: 8,
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        {isSelected ? (
          <LinearGradient
            colors={['#3B82F6', '#EF4444']} // blue to red
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              padding: 16,
              borderRadius: 12,
            }}
          >
            {buttonContent}
          </LinearGradient>
        ) : (
          <View
            style={{
              padding: 16,
              backgroundColor: '#E5E7EB',
              borderRadius: 12,
            }}
          >
            {buttonContent}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#3B82F6', '#EF4444']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          source={require('../../assets/images/purpose.png')}
          style={{
            width: '100%',
            height: 300,
            resizeMode: 'contain',
            marginBottom: 8,
            marginTop: 70,
          }}
        />

        <FlatList
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
          data={purposeOptions}
          renderItem={renderPurpose}
          keyExtractor={(item) => item}
          ListHeaderComponent={
            <>
              <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 8,
                color: 'white' // Make text visible on gradient
              }}>
                What's your purpose here?
              </Text>
              <Text style={{
                fontSize: 16,
                color: '#F3F4F6',
                marginBottom: 16
              }}>
                Select the main reason you're using this app.
              </Text>
            </>
          }
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
