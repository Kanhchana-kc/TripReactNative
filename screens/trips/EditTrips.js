import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import api from '../../api/api';

export default function EditTrip({ route, navigation }) {
  const { id } = route.params;
  const [form, setForm] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    privacy: 'Public',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/trips/${id}`);
        setForm(res.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to load trip data');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const isValidDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date);

  const updateTrip = async () => {
    const { destination, startDate, endDate, privacy } = form;

    if (!destination || !startDate || !endDate || !privacy) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      Alert.alert('Error', 'Dates must be in YYYY-MM-DD format');
      return;
    }
    if (!['Public', 'Friends', 'Private'].includes(privacy)) {
      Alert.alert('Error', 'Privacy must be Public, Friends, or Private');
      return;
    }

    setLoading(true);
    try {
      await api.put(`/trips/${id}`, form);
      Alert.alert('Success', 'Trip updated');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update trip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={form.destination}
        onChangeText={(text) => handleChange('destination', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Start Date (YYYY-MM-DD)"
        value={form.startDate}
        onChangeText={(text) => handleChange('startDate', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="End Date (YYYY-MM-DD)"
        value={form.endDate}
        onChangeText={(text) => handleChange('endDate', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Privacy (Public/Friends/Private)"
        value={form.privacy}
        onChangeText={(text) => handleChange('privacy', text)}
      />
      <Button
        title={loading ? 'Updating...' : 'Update Trip'}
        onPress={updateTrip}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    height: 45,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});
