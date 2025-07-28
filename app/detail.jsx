import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const { width: screenWidth } = Dimensions.get('window');

export default function DetailScreen() {
  const { item } = useLocalSearchParams();
  const parsed = JSON.parse(item);
  const router = useRouter();
  

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);
  const [positionMillis, setPositionMillis] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const downloadResumable = useRef(null);
  
  // Create a safe filename for the download
  const createSafeFilename = (title) => {
    return title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.mp3';
  };
  
  const localUri = FileSystem.documentDirectory + createSafeFilename(parsed.title);
  

  useEffect(() => {
    // Setup audio mode
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.log('Audio setup error:', error);
      }
    };

    setupAudio();

    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();

    const checkFile = async () => {
      try {
        const info = await FileSystem.getInfoAsync(localUri);
        console.log('File check:', info);
        if (info.exists) {
          setDownloaded(true);
          console.log('File already downloaded:', localUri);
        }
      } catch (error) {
        console.log('File check error:', error);
      }
    };

    checkFile();

    return () => {
      // Cancel any ongoing download
      if (downloadResumable.current) {
        downloadResumable.current.pauseAsync();
      }
      cleanupAudio();
    };
  }, []);

  const cleanupAudio = async () => {
    try {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }
    } catch (error) {
      console.log('Cleanup error:', error);
    }
  };


  const playPauseAudio = async () => {
    try {
      if (!sound) {
        console.log('Creating new sound...');
        const audioUri = downloaded ? localUri : parsed.url;
        console.log('Audio URI:', audioUri);
        
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUri },
          { 
            shouldPlay: false,
            isLooping: false,
            isMuted: false,
            volume: 1.0,
          }
        );
        
        setSound(newSound);
        
        // Set up status update listener
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            setPositionMillis(status.positionMillis || 0);
            setDurationMillis(status.durationMillis || 0);
            setIsPlaying(status.isPlaying || false);
            
            if (status.durationMillis && status.positionMillis) {
              const fill = (status.positionMillis / status.durationMillis) * 100;
              setProgress(fill);
              if (progressRef.current) {
                progressRef.current.animate(fill, 300);
              }
            }
            
            // Auto stop when finished
            if (status.didJustFinish) {
              setIsPlaying(false);
              setProgress(0);
              if (progressRef.current) {
                progressRef.current.animate(0, 300);
              }
            }
          }
        });
        
        // Start playing
        await newSound.playAsync();
        setIsPlaying(true);
        
      } else {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          if (status.isPlaying) {
            await sound.pauseAsync();
            setIsPlaying(false);
          } else {
            await sound.playAsync();
            setIsPlaying(true);
          }
        }
      }
    } catch (error) {
      console.error('Audio playback error:', error);
      Alert.alert('Playback Error', 'Unable to play audio. Please try again.');
    }
  };

  // Remove the old updateProgress function since we're using the status update listener now

  const skipTime = async (seconds) => {
    if (sound) {
      try {
        const status = await sound.getStatusAsync();
        if (status.isLoaded && status.durationMillis) {
          const newPosition = Math.max(0, Math.min(status.positionMillis + (seconds * 1000), status.durationMillis));
          await sound.setPositionAsync(newPosition);
          setPositionMillis(newPosition);
        }
      } catch (error) {
        console.error('Skip error:', error);
      }
    }
  };

  const downloadAudio = async () => {
    if (!parsed.url) {
      Alert.alert('❌ Download Error', 'No audio URL available for download.');
      return;
    }

    setIsDownloading(true);
    setDownloadProgress(0);
    
    try {
      // Check if file already exists
      const fileInfo = await FileSystem.getInfoAsync(localUri);
      if (fileInfo.exists) {
        Alert.alert('📱 Already Downloaded', 'This audio is already saved on your device.');
        setIsDownloading(false);
        return;
      }

      console.log('Starting download from:', parsed.url);
      console.log('Saving to:', localUri);

      // Create resumable download with progress tracking
      downloadResumable.current = FileSystem.createDownloadResumable(
        parsed.url,
        localUri,
        {},
        (downloadProgress) => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
          setDownloadProgress(Math.round(progress * 100));
          console.log('Download progress:', Math.round(progress * 100) + '%');
        }
      );

      const result = await downloadResumable.current.downloadAsync();
      
      if (result && result.uri) {
        console.log('Download completed:', result.uri);
        setDownloaded(true);
        setDownloadProgress(100);
        Alert.alert(
          '✅ Download Complete', 
          'Audio has been saved to your device and is now available offline!',
          [{ text: 'OK', style: 'default' }]
        );
      } else {
        throw new Error('Download failed - no result URI');
      }
      
    } catch (error) {
      console.error('Download error:', error);
      
      // Clean up partial download
      try {
        const fileInfo = await FileSystem.getInfoAsync(localUri);
        if (fileInfo.exists) {
          await FileSystem.deleteAsync(localUri);
        }
      } catch (cleanupError) {
        console.log('Cleanup error:', cleanupError);
      }
      
      Alert.alert(
        '❌ Download Failed', 
        `Unable to download audio: ${error.message}. Please check your internet connection and try again.`,
        [{ text: 'OK', style: 'default' }]
      );
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
      downloadResumable.current = null;
    }
  };

  const deleteDownload = async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(localUri);
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(localUri);
        setDownloaded(false);
        Alert.alert('🗑️ File Deleted', 'Downloaded audio has been removed from your device.');
      }
    } catch (error) {
      console.error('Delete error:', error);
      Alert.alert('❌ Delete Failed', 'Unable to delete the downloaded file.');
    }
  };

  const handleDownloadPress = () => {
    if (downloaded) {
      Alert.alert(
        'Manage Download',
        'This audio is already downloaded. What would you like to do?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete Download', style: 'destructive', onPress: deleteDownload },
          { text: 'Play Offline', style: 'default', onPress: () => {
            if (!isPlaying) playPauseAudio();
          }}
        ]
      );
    } else {
      downloadAudio();
    }
  };

  const generateShareMessage = () => {
    return `🧘 Check out this meditation: "${parsed.title}"\n\n📝 ${parsed.description}\n⏱️ Duration: ${parsed.duration}\n\n🎧 Listen here: ${parsed.url}\n\nShared via Meditation App`;
  };

  const handleGeneralShare = async () => {
    try {
      const message = generateShareMessage();
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(parsed.url, {
          dialogTitle: `Share ${parsed.title}`,
          mimeType: 'text/plain',
        });
      } else {
        // Fallback for devices without native sharing
        Alert.alert('Share', message, [
          { text: 'Copy to Clipboard', onPress: () => {
            // You would need to install @react-native-clipboard/clipboard for this
            Alert.alert('Message copied to clipboard!');
          }},
          { text: 'Cancel', style: 'cancel' }
        ]);
      }
    } catch (error) {
      console.error('Share error:', error);
      Alert.alert('Share Failed', 'Unable to share at this time.');
    }
  };

  const shareToWhatsApp = async (phoneNumber = null) => {
    try {
      const message = generateShareMessage();
      const encodedMessage = encodeURIComponent(message);
      
      let whatsappUrl;
      if (phoneNumber) {
        // Remove any non-digit characters and ensure proper format
        const cleanNumber = phoneNumber.replace(/\D/g, '');
        whatsappUrl = `whatsapp://send?phone=${cleanNumber}&text=${encodedMessage}`;
      } else {
        whatsappUrl = `whatsapp://send?text=${encodedMessage}`;
      }

      const supported = await Linking.canOpenURL(whatsappUrl);
      if (supported) {
        await Linking.openURL(whatsappUrl);
      } else {
        Alert.alert(
          'WhatsApp Not Available',
          'WhatsApp is not installed on this device. Please install WhatsApp or choose another sharing option.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('WhatsApp share error:', error);
      Alert.alert('Share Failed', 'Unable to share to WhatsApp.');
    }
  };

  const shareViaSMS = async (phoneNumber) => {
    try {
      const message = generateShareMessage();
      const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
      
      const supported = await Linking.canOpenURL(smsUrl);
      if (supported) {
        await Linking.openURL(smsUrl);
      } else {
        Alert.alert('SMS Not Available', 'SMS is not available on this device.');
      }
    } catch (error) {
      console.error('SMS share error:', error);
      Alert.alert('Share Failed', 'Unable to send SMS.');
    }
  };

  const loadContacts = async () => {
    setLoadingContacts(true);
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
          sort: Contacts.SortTypes.FirstName,
        });
        
        // Filter contacts that have phone numbers
        const contactsWithNumbers = data.filter(contact => 
          contact.phoneNumbers && contact.phoneNumbers.length > 0
        ).slice(0, 50); // Limit to first 50 contacts for performance
        
        setContacts(contactsWithNumbers);
      } else {
        Alert.alert(
          'Permission Required',
          'Contact access is needed to share with your contacts. Please enable it in your device settings.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Contacts loading error:', error);
      Alert.alert('Error', 'Unable to load contacts.');
    } finally {
      setLoadingContacts(false);
    }
  };

  const handleSharePress = () => {
    Alert.alert(
      'Share Meditation',
      'How would you like to share this meditation?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'General Share', onPress: handleGeneralShare },
        { text: 'WhatsApp', onPress: () => shareToWhatsApp() },
        { text: 'Choose Contact', onPress: () => {
          setShowShareModal(true);
          loadContacts();
        }},
      ]
    );
  };

  const handleContactShare = (contact) => {
    if (!contact.phoneNumbers || contact.phoneNumbers.length === 0) {
      Alert.alert('No Phone Number', 'This contact has no phone number available.');
      return;
    }

    const phoneNumber = contact.phoneNumbers[0].number;
    const contactName = contact.name || 'Unknown';

    Alert.alert(
      `Share with ${contactName}`,
      'How would you like to share?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'WhatsApp', onPress: () => {
          setShowShareModal(false);
          shareToWhatsApp(phoneNumber);
        }},
        { text: 'SMS', onPress: () => {
          setShowShareModal(false);
          shareViaSMS(phoneNumber);
        }},
      ]
    );
  };

  const formatMillis = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const getImageSource = () => {
    return typeof parsed.image === 'string'
      ? require('../assets/images/fb.png')
      : parsed.image;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Now Playing</Text>
        
      </View>

      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ]
          }
        ]}
      >
        {/* Album Art */}
        <View style={styles.imageContainer}>
          <Image source={getImageSource()} style={styles.image} />
          <View style={styles.imageOverlay} />
        </View>

        {/* Track Info */}
        <View style={styles.trackInfo}>
          <Text style={styles.title}>{parsed.title}</Text>
          <Text style={styles.description}>{parsed.description}</Text>
          <View style={styles.durationBadge}>
            <Ionicons name="time-outline" size={16} color="#4CAF50" />
            <Text style={styles.durationText}>{parsed.duration}</Text>
          </View>
        </View>

        {/* Progress Circle */}
        <View style={styles.progressContainer}>
          <AnimatedCircularProgress
            ref={progressRef}
            size={200}
            width={8}
            fill={progress}
            tintColor="#4CAF50"
            backgroundColor="#2A2359"
            rotation={0}
            lineCap="round"
          >
            {() => (
              <TouchableOpacity onPress={playPauseAudio} style={styles.playButton}>
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={50}
                  color="#4CAF50"
                />
              </TouchableOpacity>
            )}
          </AnimatedCircularProgress>
        </View>

        {/* Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={() => skipTime(-15)} style={styles.skipButton}>
            <Ionicons name="play-back" size={28} color="#fff" />
            <Text style={styles.skipText}>15s</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={playPauseAudio} style={styles.mainPlayButton}>
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={32}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => skipTime(15)} style={styles.skipButton}>
            <Ionicons name="play-forward" size={28} color="#fff" />
            <Text style={styles.skipText}>15s</Text>
          </TouchableOpacity>
        </View>

        {/* Time Slider */}
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={durationMillis}
            value={positionMillis}
            minimumTrackTintColor="#4CAF50"
            maximumTrackTintColor="#2A2359"
            thumbTintColor="#4CAF50"
            onSlidingComplete={async (value) => {
              if (sound) {
                try {
                  await sound.setPositionAsync(value);
                  setPositionMillis(value);
                } catch (error) {
                  console.error('Slider error:', error);
                }
              }
            }}
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatMillis(positionMillis)}</Text>
            <Text style={styles.timeText}>{formatMillis(durationMillis)}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            onPress={handleDownloadPress}
            style={[
              styles.actionButton,
              downloaded && styles.downloadedButton
            ]}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <View style={styles.downloadProgress}>
                <ActivityIndicator color="#fff" size="small" />
                <Text style={styles.actionButtonText}>{downloadProgress}%</Text>
              </View>
            ) : (
              <>
                <Ionicons
                  name={downloaded ? 'checkmark-circle' : 'download-outline'}
                  size={20}
                  color="#fff"
                />
                <Text style={styles.actionButtonText}>
                  {downloaded ? 'Downloaded' : 'Download'}
                </Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0627',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 30,
  },
  image: {
    width: screenWidth - 80,
    height: 240,
    borderRadius: 20,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.3))',
  },
  trackInfo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#B8B8B8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  durationText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  progressContainer: {
    marginBottom: 40,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 40,
  },
  skipButton: {
    alignItems: 'center',
  },
  skipText: {
    color: '#B8B8B8',
    fontSize: 12,
    marginTop: 4,
  },
  mainPlayButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    width: '100%',
    marginBottom: 40,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  timeText: {
    color: '#B8B8B8',
    fontSize: 14,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 40,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2359',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  downloadedButton: {
    backgroundColor: '#4CAF50',
  },
  downloadProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});