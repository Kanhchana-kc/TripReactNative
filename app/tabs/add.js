import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FloatingMenu from '../Menu/FloatingMenu'; // correct path

const Add = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
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
  },
});
