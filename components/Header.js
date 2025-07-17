import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = () => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://i.ibb.co/TtgX9LT/wanderlog-logo.png' }} // Replace with your local or remote logo
          style={styles.logo}
        />
        <Text style={styles.title}>wanderlog</Text>
      </View>

      {/* Search & Pro Icon */}
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Icon name="search" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.proIcon}>
          <Text style={styles.proStar}>★</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
container: {    
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 28,
    height: 28,
    marginRight: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f25c5c',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  proIcon: {
    backgroundColor: '#fcd34d',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
  },
  proStar: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
