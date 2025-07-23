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
import api from '../api/api';

export default function ContactList({ navigation }) {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await api.get('/contacts');
    setContacts(res.data);
  };

  const deleteContact = async (id) => {
    Alert.alert('Confirm', 'Are you sure you want to delete?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          await api.delete(`/contacts/${id}`);
          fetchContacts();
        },
      },
    ]);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchContacts);
    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <Button
        title="Add Contact"
        onPress={() => navigation.navigate('Create')}
      />
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail', { id: item.id })}
            style={styles.item}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Button title="Delete" onPress={() => deleteContact(item.id)} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  name: { fontSize: 16 },
});
