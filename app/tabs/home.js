import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchScreen from '../../screens/SearchScreen';
// Removed unused import of CreateTrips

export default function Home() {
  const navigation = useNavigation();
  const [featuredTrips, setFeaturedTrips] = useState([]);
  const [popularTrips, setPopularTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('CreateTrips'); // fixed typo here

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const [featuredRes, popularRes] = await Promise.all([
          fetch('http://192.168.100.168:3000/featuredTrips'),
          fetch('http://192.168.100.168:3000/popularTrips'),
        ]);

        const featuredData = await featuredRes.json();
        const popularData = await popularRes.json();

        setFeaturedTrips(featuredData);
        setPopularTrips(popularData);
      } catch (err) {
        console.error('API error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // Remove duplicates by id for use in SearchScreen
  const allTrips = [
    ...new Map(
      [...featuredTrips, ...popularTrips].map((item) => [item.id, item])
    ).values(),
  ];

  const TripCard = ({ item }) => (
    <TouchableOpacity
      style={styles.tripCard}
      onPress={() => navigation.navigate('TripDetail', { trip: item })}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.tripImage} />
      ) : (
        <View style={[styles.tripImage, { backgroundColor: '#ddd' }]} />
      )}
      <View style={styles.tripInfo}>
        <Text style={styles.tripTitle}>{item.title}</Text>
        <Text style={styles.tripDesc}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF6347" />
      </View>
    );
  }

  return (
    <FlatList
      nestedScrollEnabled
      data={popularTrips}
      keyExtractor={(item) => `popular-${item.id}`}
      renderItem={({ item }) => <TripCard item={item} />}
      ListHeaderComponent={
        <View>
          {/* Hero Section */}
          <View style={styles.heroContainer}>
            <Image
              source={require('../../assets/pic01.jpg')}
              style={styles.heroImage}
            />
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Plan your next adventure</Text>
              <TouchableOpacity
                style={styles.createTripButton}
                onPress={() => navigation.navigate('CreateTrips')} // fixed screen name here
              >
                <Text style={styles.createTripButtonText}>
                  Create new trip plan
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.header}>Welcome to Trip Planner!</Text>

          <Text style={styles.subHeader}>Featured Trips</Text>
          <FlatList
            data={featuredTrips}
            keyExtractor={(item) => `featured-${item.id}`}
            renderItem={({ item }) => <TripCard item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tripList}
          />

          <SearchScreen data={allTrips} />

          <Text style={styles.subHeader}>Popular Trips</Text>
        </View>
      }
      contentContainerStyle={styles.tripList}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    position: 'relative',
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    height: 200,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 16,
    height: '100%',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  createTripButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  createTripButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#333',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 8,
    color: '#555',
  },
  tripList: {
    paddingVertical: 10,
  },
  tripCard: {
    width: 220,
    marginRight: 16,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fafafa',
    elevation: 3,
    marginBottom: 12,
  },
  tripImage: {
    width: '100%',
    height: 120,
  },
  tripInfo: {
    padding: 10,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  tripDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
