import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FloatingMenu from '../Menu/FloatingMenu';

const Add = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What would you like to create?</Text>

      <FloatingMenu
        onTripPlan={() => navigation.navigate('Trips')}
        onGuide={() => navigation.navigate('Guides')}
      />
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
});
