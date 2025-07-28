import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface FeatureTileProps {
  title: string;
  color: string;
  onPress: () => void;
  isLong?: boolean;
}

const FeatureTile: React.FC<FeatureTileProps> = ({ title, color, onPress, isLong = false }) => (
  <TouchableOpacity 
    style={[
      isLong ? styles.longTile : styles.tile, 
      { backgroundColor: color }
    ]} 
    activeOpacity={0.8}
    onPress={onPress}
  >
    <Text style={[styles.tileText, isLong && styles.boldText]}>{title}</Text>
  </TouchableOpacity>
);

export default function ExploreScreen(): JSX.Element {
  const [searchText, setSearchText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('Explore');

  const handleFeaturePress = (feature: string) => {
    Alert.alert('Feature', `${feature} feature coming soon!`);
  };

  const handleTrialPress = () => {
    Alert.alert(
      'Free Trial', 
      'Start your 7-day free trial to unlock premium features!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Start Trial', onPress: () => console.log('Trial started') }
      ]
    );
  };

  const handleNavPress = (tab: string) => {
    setActiveTab(tab);
    
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#FFFFFF
" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
        
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#ccc" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchBar} 
            placeholder="Search Mindspace" 
            placeholderTextColor="#ccc"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={20} color="#ccc" />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Main Feature Tiles */}
        <View style={styles.row}>
          <FeatureTile 
            title="Meditate" 
            color="#f4a261" 
            onPress={() => handleFeaturePress('Meditate')}
          />
          <FeatureTile 
            title="Sleep" 
            color="#6c5ce7" 
            onPress={() => handleFeaturePress('Sleep')}
          />
        </View>
        
        <View style={styles.row}>
          <FeatureTile 
            title="Move" 
            color="#d291bc" 
            onPress={() => handleFeaturePress('Move')}
          />
          <FeatureTile 
            title="Music" 
            color="#00b4d8" 
            onPress={() => handleFeaturePress('Music')}
          />
        </View>
        
        {/* Podcasts Section */}
        <FeatureTile 
          title="Podcasts" 
          color="#f6c90e" 
          onPress={() => handleFeaturePress('Podcasts')}
          isLong={true}
        />
        
        {/* Premium Library Section */}
        <View style={styles.bookshelf}>
          <Ionicons name="library-outline" size={32} color="#fff" style={styles.libraryIcon} />
          <Text style={styles.libraryText}>Unlock the Mindspace Library</Text>
          <Text style={styles.librarySubtext}>
            Access 1000+ guided meditations, sleep stories, and exclusive content
          </Text>
          <TouchableOpacity style={styles.trialButton} activeOpacity={0.8} onPress={handleTrialPress}>
            <Text style={styles.trialText}>Start My Free Trial</Text>
          </TouchableOpacity>
          <Text style={styles.trialNote}>7 days free, then $12.99/month</Text>
        </View>
        
        {/* Additional Features */}
        <FeatureTile 
          title="Ask Mindspace" 
          color="#f4a261" 
          onPress={() => handleFeaturePress('Ask Mindspace')}
          isLong={true}
        />
        
        <FeatureTile 
          title="Kids & Family" 
          color="#a29bfe" 
          onPress={() => handleFeaturePress('Kids & Family')}
          isLong={true}
        />
        
        <FeatureTile 
          title="Videos and More" 
          color="#6c757d" 
          onPress={() => handleFeaturePress('Videos and More')}
          isLong={true}
        />
        
        {/* Bottom Navigation */}
        <View style={styles.navbar}>
          {['Today', 'Explore', 'Profile'].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => handleNavPress(tab)}>
              <Text style={[
                styles.navItem, 
                activeTab === tab && styles.selectedNav
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F3FF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    color: '#000',
    fontSize: 28,
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F3FF',
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c2d3c',
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    color: '#fff',
    padding: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tile: {
    flex: 0.48,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tileText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  boldText: {
    fontWeight: '700',
    fontSize: 18,
  },
  longTile: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookshelf: {
    backgroundColor: '#2d2e3e',
    padding: 24,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a3b4c',
  },
  libraryIcon: {
    marginBottom: 12,
  },
  libraryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  librarySubtext: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  trialButton: {
    backgroundColor: '#3a0ca3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#3a0ca3',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    marginBottom: 8,
  },
  trialText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  trialNote: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#121212',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: '#333',
    marginTop: 20,
    borderRadius: 12,
  },
  navItem: {
    color: '#888',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedNav: {
    color: '#fff',
    fontWeight: '700',
  },
});