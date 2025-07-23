import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import api from "../api/api"; // Adjust the import path as necessary
export default function CreateContact({ navigation }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };
  const createContact = async () => {
    if (!form.name || !form.phone || !form.email) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    try {
      await api.post("/contacts", form);
      Alert.alert("Success", "Contact created");
      navigation.navigate("List"); // Go back to the contact list
    } catch (err) {
      Alert.alert("Error", "Something went wrong");
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={form.phone}
        onChangeText={(text) => handleChange("phone", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      <Button title="Create Contact" onPress={createContact} />
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
