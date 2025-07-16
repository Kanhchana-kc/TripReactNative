import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TripDetail({ route }) {
  const { tripId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip Detail</Text>
      <Text style={styles.tripId}>Trip ID: {tripId}</Text>
      {/* Add more trip details here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  tripId: { fontSize: 18 },
});
