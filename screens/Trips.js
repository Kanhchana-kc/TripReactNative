import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Trips() {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const data = await AsyncStorage.getItem('trips');
      const tripsArray = data ? JSON.parse(data) : [];
      setTrips(tripsArray);
    } catch {
      setTrips([]);
    }
  };

  const handleSubmit = async () => {
    if (!destination || !startDate || !endDate) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    try {
      const newTrip = {
        id: Date.now(), // optional unique ID
        destination,
        start_date: startDate,
        end_date: endDate,
      };

      const updatedTrips = [...trips, newTrip];

      await AsyncStorage.setItem('trips', JSON.stringify(updatedTrips));
      setTrips(updatedTrips);

      Alert.alert('Success', 'Trip saved locally!');
      setDestination('');
      setStartDate('');
      setEndDate('');
      Keyboard.dismiss();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not save trip');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plan a new trip</Text>
      <Text style={styles.subtitle}>
        Build an itinerary and map out your upcoming travel plans
      </Text>

      <TextInput
        placeholder="e.g., Paris, Hawaii, Japan"
        style={styles.input}
        value={destination}
        onChangeText={setDestination}
      />

      <View style={styles.dateRow}>
        <TextInput
          placeholder="Start date"
          style={[styles.dateInput, { marginRight: 8 }]}
          value={startDate}
          onChangeText={setStartDate}
        />
        <TextInput
          placeholder="End date"
          style={styles.dateInput}
          value={endDate}
          onChangeText={setEndDate}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Start planning</Text>
      </TouchableOpacity>

      {trips.length > 0 && (
        <>
          <Text style={styles.savedTitle}>Saved Trips:</Text>
          <FlatList
            data={trips}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={({ item }) => (
              <View style={styles.tripItem}>
                <Text style={styles.tripText}>
                  📍 {item.destination} ({item.start_date} → {item.end_date})
                </Text>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 60, backgroundColor: '#fff' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
  },
  button: {
    backgroundColor: '#FF5A5F',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  savedTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  tripItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  tripText: {
    fontSize: 16,
  },
});
