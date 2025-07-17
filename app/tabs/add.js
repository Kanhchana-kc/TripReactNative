import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import FloatingMenu from '../Menu/FloatingMenu'; // correct path

const Add = () => {
  return (
    <View style={styles.container}>
      {/* Your main screen content */}
      <FloatingMenu
        onTripPlan={() => Alert.alert('Trip plan')}
        onGuide={() => Alert.alert('Guide')}
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
