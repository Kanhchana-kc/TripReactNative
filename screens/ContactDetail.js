import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Linking } from 'react-native';
import api from '../api/api';
import { useIsFocused } from '@react-navigation/native';
export default function ContactDetail({ route, navigation }) {
  const [contact, setContact] = useState(null);
  const { id } = route.params;
  const isFocused = useIsFocused();
  useEffect(() => {
    api.get(`/contacts/${id}`).then((res) => setContact(res.data));
  }, [isFocused]);
  const callNumber = () => {
    Linking.openURL(`tel:${contact.phone}`);
  };
  if (!contact) return <Text>Loading...</Text>;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name: {contact.name}</Text>
      <Text style={styles.label}>Phone: {contact.phone}</Text>
      <Text style={styles.label}>Email: {contact.email}</Text>
      <Button title="Call" onPress={callNumber} />
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
