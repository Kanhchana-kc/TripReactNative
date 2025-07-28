import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import api from '../../api/api'; // Adjust the import path as necessary

export default function CreateTrips({ navigation }) {
  const [form, setForm] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    privacy: 'Public', // default
  });

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onChangeDate = (event, selectedDate, type) => {
    if (Platform.OS === 'android') {
      if (type === 'start') setShowStartPicker(false);
      else setShowEndPicker(false);
    }

    if (selectedDate) {
      const formatted = formatDate(selectedDate);
      if (type === 'start') handleChange('startDate', formatted);
      else handleChange('endDate', formatted);
    }
  };

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

      Alert.alert(
        'Success',
        'Trip created successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('TripList'),
          },
        ],
        { cancelable: false }
      );
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

      <Text style={styles.label}>Start Date</Text>
      <Pressable onPress={() => setShowStartPicker(true)} style={styles.input}>
        <Text>{form.startDate || 'Select Start Date'}</Text>
      </Pressable>
      {showStartPicker && (
        <DateTimePicker
          value={form.startDate ? new Date(form.startDate) : new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => onChangeDate(event, date, 'start')}
        />
      )}

      <Text style={styles.label}>End Date</Text>
      <Pressable onPress={() => setShowEndPicker(true)} style={styles.input}>
        <Text>{form.endDate || 'Select End Date'}</Text>
      </Pressable>
      {showEndPicker && (
        <DateTimePicker
          value={form.endDate ? new Date(form.endDate) : new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => onChangeDate(event, date, 'end')}
        />
      )}

      <Text style={styles.label}>Privacy</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={form.privacy}
          onValueChange={(itemValue) => handleChange('privacy', itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Public" value="Public" />
          <Picker.Item label="Friends" value="Friends" />
          <Picker.Item label="Private" value="Private" />
        </Picker>
      </View>

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
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
