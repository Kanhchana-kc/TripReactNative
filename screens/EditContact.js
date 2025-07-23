import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import api from '../api/api';
export default function EditContact({ route, navigation }) {
  const { id } = route.params;
  const [form, setForm] = useState({ name: '', phone: '', email: '' });

  useEffect(() => {
    api.get(`/contacts/${id}`).then((res) => setForm(res.data));
  }, []);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const updateContact = async () => {
    await api.put(`/contacts/${id}`, form);
    Alert.alert('Success', 'Contact updated');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={form.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={form.phone}
        onChangeText={(text) => handleChange('phone', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
      />

      <Button title="Update Contact" onPress={updateContact} />
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
