import React from 'react';
import { Colors } from '../constants/Colors';
import { useFonts } from 'expo-font';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Martian: require('../assets/fonts/MartianMono-VariableFont_wdth,wght.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/Angkor_Wat_with_its_reflection_(cropped).jpg')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Trip Planner</Text>
        <Text style={styles.title_01}>
          Welcome to Trip Planner!{'\n'}
          Plan your adventures, explore new places, and create memories.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.color02,
  },
  imageContainer: {
    flex: 2,
    width: '100%',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    aspectRatio: 1.7, // Adjust as needed for your image
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f2f2f2',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
  },
  title: {
    fontSize: 27,
    fontFamily: 'Martian',
    fontWeight: '700',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  title_01: {
    padding: 10,
    textAlign: 'center',
    color: Colors.color02,
  },
  button: {
    backgroundColor: Colors.color04,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});