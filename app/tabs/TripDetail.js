import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TripDetail({ route }) {
  const { trip } = route.params;
  const navigation = useNavigation();

  const categories = [
    { title: 'Restaurants', icon: '🍽️' },
    { title: 'Attractions', icon: '📍' },
    { title: 'Cafes', icon: '☕' },
    { title: 'Photo spots', icon: '📸' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: trip.image }} style={styles.image} />
      <Text style={styles.title}>{trip.title}</Text>
      <Text style={styles.description}>{trip.description}</Text>

      {/* Categories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesContainer}>
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryBox}
              onPress={() => navigation.navigate('CategoryDetail', { category: item.title })}
            >
              <Text style={styles.categoryIcon}>{item.icon}</Text>
              <Text style={styles.categoryText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Attractions Section */}
      {trip.attractions && trip.attractions.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Attractions</Text>
          {trip.attractions.map((place) => (
            <View key={place.id} style={styles.attractionCard}>
              <Image source={{ uri: place.image }} style={styles.attractionImage} />
              <Text style={styles.attractionName}>{place.name}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginHorizontal: 16,
  },
  description: {
    fontSize: 16,
    marginHorizontal: 16,
    marginTop: 8,
    color: '#555',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryBox: {
    width: '48%',
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
  },
  attractionCard: {
    marginBottom: 12,
    backgroundColor: '#fafafa',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  attractionImage: {
    width: '100%',
    height: 150,
  },
  attractionName: {
    fontSize: 16,
    fontWeight: '500',
    padding: 10,
  },
});