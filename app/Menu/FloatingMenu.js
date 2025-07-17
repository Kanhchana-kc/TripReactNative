import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FloatingMenu = ({ onTripPlan, onGuide }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      {open && (
        <View style={styles.optionsContainer}>
          {/* Trip Plan */}
          <TouchableOpacity style={styles.option} onPress={onTripPlan}>
            <Ionicons name="globe-outline" size={24} color="#000" />
            <Text style={styles.optionText}>Trip plan</Text>
          </TouchableOpacity>

          {/* Guide */}
          <TouchableOpacity style={styles.option} onPress={onGuide}>
            <Ionicons name="compass-outline" size={24} color="#000" />
            <Text style={styles.optionText}>Guide</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Main FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setOpen((prev) => !prev)}
      >
        <Ionicons name={open ? 'close' : 'add'} size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingMenu;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  fab: {
    backgroundColor: '#dc2626', // red
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  option: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    flexDirection: 'row',
  },
  optionText: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
