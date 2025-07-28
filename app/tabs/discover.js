// BottomTab/DiscoverScreen.js
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // ✅ import axios
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

export default function DiscoverScreen() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const response = await axios.get('http://192.168.100.168:3000/deals'); // ✅ correct endpoint
      setDeals(response.data);
    } catch (error) {
      console.error('Error fetching deals:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#F7941D" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Deals and Promos</Text>
      {deals.map((deal) => (
        <View key={deal.id} style={styles.card}>
          <Image source={{ uri: deal.logo }} style={styles.logo} />
          <View style={styles.info}>
            <Text style={styles.badge}>PRO ONLY DEAL</Text>
            <Text style={styles.headline}>{deal.description}</Text>
            <Text style={styles.subtext}>
              Pro users get an exclusive discount code on {deal.company}. Get Pro to unlock deal.
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  badge: {
    backgroundColor: '#F7941D',
    color: '#fff',
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  subtext: {
    color: '#555',
    fontSize: 13,
  },
});
