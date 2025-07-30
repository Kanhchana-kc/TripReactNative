import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import api from '../../api/api';
import { auth } from '../../firebase';  // Adjust path to your firebase config

export default function TripList({ navigation }) {
  const [trips, setTrips] = useState([]);
  const [userId, setUserId] = useState(null);

  // Get current user ID on mount
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
    } else {
      setUserId(null);
    }
  }, []);

  // Fetch trips filtered by userId
  const fetchTrips = async () => {
    if (!userId) return; // wait for userId

    try {
      const res = await api.get(`/trips?userId=${userId}`); // pass userId to API
      setTrips(res.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch trips');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchTrips);
    return unsubscribe;
  }, [navigation, userId]); // refetch when userId changes

  const deleteTrip = async (id) => {
    Alert.alert('Confirm', 'Are you sure you want to delete?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/trips/${id}`);
            fetchTrips();
          } catch (error) {
            Alert.alert('Error', 'Failed to delete trip');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => navigation.navigate('TripsDetail', { id: item.id })}
        style={{ flex: 1 }}
      >
        <Text style={styles.destination}>{item.destination}</Text>
        <Text style={styles.date}>
          {item.startDate} - {item.endDate}
        </Text>
        <Text style={styles.privacy}>Privacy: {item.privacy}</Text>
      </TouchableOpacity>

      <Button title="Delete" color="red" onPress={() => deleteTrip(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Add Trip" onPress={() => navigation.navigate('CreateTrips')} />
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No trips found.</Text>}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  destination: { fontSize: 18, fontWeight: 'bold' },
  date: { fontSize: 14, color: '#555' },
  privacy: { fontSize: 12, color: '#888' },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});
