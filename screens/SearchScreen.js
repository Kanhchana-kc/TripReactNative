import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Combine all trips for searching
// const allTrips = [
//   {
//     id: '1',
//     title: 'Explore Angkor Wat',
//     description: 'Discover the ancient temples of Angkor Wat in Cambodia.',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuyWzdAhaR-gbnxtzz59-yofcnvneO8IKUVL3NHD6Htdqk9zeTOVi8wcnmITCwu-JfdFA&usqp=CAU',
//   },
//   {
//     id: '2',
//     title: 'Beach Relaxation',
//     description: 'Enjoy the pristine beaches of Sihanoukville.',
//     image: 'https://example.com/sihanoukville.jpg',
//   },
//   {
//     id: '3',
//     title: 'Phnom Penh City Tour',
//     description: 'Experience the vibrant culture of Cambodia’s capital.',
//     image: 'https://example.com/phnom-penh.jpg',
//   },
//   {
//     id: '4',
//     title: 'Battambang Adventure',
//     description: 'Explore Cambodia’s countryside and ancient temples.',
//     image: 'https://example.com/battambang.jpg',
//   },
//   // add all trips from featuredTrips and popularTrips here...
// ];

export default function SearchScreen({ data }) {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');

  const filteredTrips = data.filter((trip) => {
    const words = trip.title.toLowerCase();
    return words.includes(query.trim().toLowerCase());
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultCard}
      onPress={() => navigation.navigate('TripDetail', { trip: item })}
    >
      <Image source={{ uri: item.image }} style={styles.resultImage} />
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <Text style={styles.resultDesc} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search trips..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />

      {filteredTrips.length === 0 ? (
        <Text style={styles.noResults}>
          No trips found. Try another search.
        </Text>
      ) : (
        <FlatList
          style={styles.listContainer}
          data={filteredTrips}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center', // vertically align content
    backgroundColor: '#fafafa',
    marginBottom: 12,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    minHeight: 80, // ✅ ensure it has a minimum height
  },
  resultImage: {
    width: 100, // ✅ fixed width
    height: 80, // ✅ fixed height
    resizeMode: 'cover',
  },
  resultInfo: {
    flex: 1, // ✅ take remaining space
    padding: 10,
    justifyContent: 'center',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  resultDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  noResults: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 16,
  },
  listContainer: {
    // backgroundColor: 'blue',
    height: "10px", // ✅ fixed height for the list
  },
});
