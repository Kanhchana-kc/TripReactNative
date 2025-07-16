import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TripDetail from './tripdetail';
const featuredTrips = [
  {
    id: '1',
    title: 'Explore Angkor Wat',
    description: 'Discover the ancient temples of Angkor Wat in Cambodia.',
    image: '../../assets/ak1.jpg',
  },
  {
    id: '2',
    title: 'Beach Relaxation',
    description: 'Enjoy the pristine beaches of Sihanoukville.',
    image: 'https://example.com/sihanoukville.jpg',
  },
  {
    id: '3',
    title: 'Phnom Penh City Tour',
    description: 'Experience the vibrant culture of Cambodia’s capital.',
    image: 'https://example.com/phnom-penh.jpg',
  },
];

export default function Home() {
  const navigation = useNavigation(); 

  const renderTrip = ({ item }) => (
    <TouchableOpacity
      style={styles.tripCard}
      onPress={() => navigation.navigate('TripDetail', { tripId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.tripImage} />
      <View style={styles.tripInfo}>
        <Text style={styles.tripTitle}>{item.title}</Text>
        <Text style={styles.tripDesc}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Trip Planner!</Text>
      <Text style={styles.subHeader}>Featured Trips</Text>
      <FlatList
        data={featuredTrips}
        keyExtractor={(item) => item.id}
        renderItem={renderTrip}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tripList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  subHeader: { fontSize: 20, fontWeight: '600', marginBottom: 8, color: '#555' },
  tripList: { paddingVertical: 10 },
  tripCard: {
    width: 220,
    marginRight: 16,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fafafa',
    elevation: 3,
  },
  tripImage: { width: '100%', height: 120 },
  tripInfo: { padding: 10 },
  tripTitle: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  tripDesc: { fontSize: 14, color: '#666', marginTop: 4 },
});
