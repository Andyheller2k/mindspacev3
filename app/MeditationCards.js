import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Modal from 'react-native-modal';

const MeditationCard = ({ id, title, duration, image, description, url, category }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleShare = async () => {
    try {
      await Sharing.shareAsync(url || null, {
        dialogTitle: `Share this meditation: ${title}`,
      });
    } catch (error) {
      console.log('Error sharing:', error.message);
    }
    setModalVisible(false);
  };

  const handleCardPress = () => {
    const itemData = JSON.stringify({ id, title, duration, image, description, url });
    router.push({
      pathname: '/detail',
      params: { item: itemData },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
      {/* Header with lock icon and title */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons name="lock-closed" size={16} color="#fff" style={styles.lockIcon} />
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
        </View>

        {/* More Options Icon */}
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Category and Duration */}
      <View style={styles.metaContainer}>
        <View style={styles.categoryRow}>
          <Ionicons name="volume-medium" size={14} color="#B8B8B8" />
          <Text style={styles.category}>{category || 'Mindful Activity'}</Text>
        </View>
        <Text style={styles.duration}>{duration}</Text>
      </View>

      {/* Image/Illustration Section */}
      {image && (
        <View style={styles.imageContainer}>
          <Image
            source={typeof image === 'string' ? { uri: image } : image}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      )}

      {/* Bottom Sheet Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        style={styles.modal}
        swipeDirection="down"
        onSwipeComplete={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Choose an action</Text>

          <TouchableOpacity style={styles.modalButton} onPress={handleShare}>
            <View style={styles.modalRow}>
              <Ionicons name="share-outline" size={24} color="#000" />
              <Text style={styles.modalButtonText}>Share</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2A2359',
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    position: 'relative',
    minHeight: 160,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  lockIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
    lineHeight: 24,
  },
  moreButton: {
    padding: 4,
  },
  metaContainer: {
    marginBottom: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#B8B8B8',
    marginLeft: 6,
  },
  duration: {
    fontSize: 14,
    color: '#B8B8B8',
  },
  imageContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 80,
    height: 60,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalButton: {
    paddingVertical: 12,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default MeditationCard;
