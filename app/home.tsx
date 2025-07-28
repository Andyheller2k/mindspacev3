import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>You are successfully logged in.</Text>
      <View style={{ marginTop: 20 }}>
        <Button title="Logout" onPress={handleLogout} color="blue" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: 'gray',
  },
});
