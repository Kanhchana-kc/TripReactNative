// tripsDetail.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from '../../api/api';

export default function tripsDetail({ route }) {
  const { id } = route.params;
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/trips/${id}`);
        setTrip(res.data);
      } catch (error) {
        console.error('Failed to load trip', error);
      }
    };

    fetchTrip();
  }, [id]);

  if (!trip) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{trip.destination}</Text>
      <Text>Date: {trip.startDate} - {trip.endDate}</Text>
      <Text>Privacy: {trip.privacy}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});
