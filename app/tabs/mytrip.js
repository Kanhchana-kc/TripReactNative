import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function TripList() {
  const [trips, setTrips] = useState([]);

  const API_URL = 'http://192.168.8.193:3000/trips'; // Replace with your local IP

  const fetchTrips = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTrips(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const deleteTrip = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchTrips();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.dest}>{item.destination}</Text>
      <Text>{item.startDate} → {item.endDate}</Text>
      <Text>{item.privacy}</Text>
      <TouchableOpacity onPress={() => deleteTrip(item.id)}>
        <Text style={styles.delete}>🗑 Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Trips</Text>
      <FlatList data={trips} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: {
    padding: 15,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
    borderRadius: 8,
  },
  dest: { fontSize: 18, fontWeight: 'bold' },
  delete: { color: 'red', marginTop: 5 },
});
