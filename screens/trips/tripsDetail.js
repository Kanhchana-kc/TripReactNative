import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import api from '../../api/api';
import { useIsFocused } from '@react-navigation/native';

export default function TripDetail({ route, navigation }) {
  const [trip, setTrip] = useState(null);
  const { id } = route.params;
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/trips/${id}`);
        setTrip(res.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to load trip data');
        navigation.goBack();
      }
    };
    fetchTrip();
  }, [isFocused, id, navigation]);

  if (!trip)
    return (
      <View style={[styles.container, { justifyContent: 'center', flex: 1 }]}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Destination: {trip.destination}</Text>
      <Text style={styles.label}>Start Date: {trip.startDate}</Text>
      <Text style={styles.label}>End Date: {trip.endDate}</Text>
      <Text style={styles.label}>Privacy: {trip.privacy}</Text>
      <Button
        title="Edit"
        onPress={() => navigation.navigate('Edit', { id })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 18, marginBottom: 10 },
});
