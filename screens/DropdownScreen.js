import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { cambodiaProvinces, aseanCountries } from '../app/data/locations';

export default function DropdownScreen() {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select a Province in Cambodia</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedProvince(value)}
        placeholder={{ label: 'Select Province', value: null }}
        items={cambodiaProvinces.map((p) => ({ label: p, value: p }))}
        style={pickerSelectStyles}
      />

      <Text style={styles.label}>Select an ASEAN Country</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedCountry(value)}
        placeholder={{ label: 'Select Country', value: null }}
        items={aseanCountries.map((c) => ({ label: c, value: c }))}
        style={pickerSelectStyles}
      />

      <Text style={styles.result}>
        Selected Province: {selectedProvince || 'None'}
      </Text>
      <Text style={styles.result}>
        Selected Country: {selectedCountry || 'None'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
});
