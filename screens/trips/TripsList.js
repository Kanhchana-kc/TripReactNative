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

export default function TripList({ navigation }) {
  const [trips, setTrips] = useState([]);

  const fetchTrips = async () => {
    try {
      const res = await api.get('/trips');
      setTrips(res.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch trips');
    }
  };

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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchTrips);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', { id: item.id })}
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
      <Button title="Add Trip" onPress={() => navigation.navigate('Create')} />
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No trips found.</Text>
        }
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
