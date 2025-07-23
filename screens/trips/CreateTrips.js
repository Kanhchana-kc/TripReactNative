import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import api from '../../api/api';

export default function CreateTrip({ navigation }) {
  const [form, setForm] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    privacy: 'Public', // default
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  // Simple date validation: YYYY-MM-DD format
  const isValidDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date);

  const createTrip = async () => {
    const { destination, startDate, endDate, privacy } = form;

    if (!destination || !startDate || !endDate || !privacy) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      Alert.alert('Error', 'Dates must be in YYYY-MM-DD format.');
      return;
    }

    if (!['Public', 'Friends', 'Private'].includes(privacy)) {
      Alert.alert('Error', 'Privacy must be Public, Friends, or Private.');
      return;
    }

    try {
      await api.post('/trips', form);
      Alert.alert('Success', 'Trip created successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to create trip.');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Destination</Text>
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={form.destination}
        onChangeText={(text) => handleChange('destination', text)}
      />

      <Text style={styles.label}>Start Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="Start Date"
        value={form.startDate}
        onChangeText={(text) => handleChange('startDate', text)}
      />

      <Text style={styles.label}>End Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        placeholder="End Date"
        value={form.endDate}
        onChangeText={(text) => handleChange('endDate', text)}
      />

      <Text style={styles.label}>Privacy (Public / Friends / Private)</Text>
      <TextInput
        style={styles.input}
        placeholder="Privacy"
        value={form.privacy}
        onChangeText={(text) => handleChange('privacy', text)}
      />

      <Button title="Create Trip" onPress={createTrip} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
});
