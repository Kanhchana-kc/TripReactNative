import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function GoogleSignInScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '387521866583-coijascvof22m3u5dj87cdt5ij4taab0.apps.googleusercontent.com', // From Firebase Console
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      navigation.replace('Home'); // Go to your Home screen after sign-in
    } catch (error) {
      console.error('Google Sign-In Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in to continue</Text>
      <TouchableOpacity onPress={signInWithGoogle} style={styles.button}>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, marginBottom: 20 },
  button: {
    backgroundColor: '#4285F4',
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
