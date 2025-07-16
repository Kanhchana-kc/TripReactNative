import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DiscoverScreen from './discover';
import MyTripScreen from './mytrip';
import ProfileScreen from './profile';
import Home from './home';

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabContainer}>
      {/* Home */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate('home')}
      >
        <Ionicons
          name="home-outline"
          size={24}
          color={state.index === 0 ? '#673ab7' : '#222'}
        />
        <Text style={state.index === 0 ? styles.active : styles.inactive}>Home</Text>
      </TouchableOpacity>

      {/* Discover */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate('Discover')}
      >
        <Ionicons
          name="search-outline"
          size={24}
          color={state.index === 1 ? '#673ab7' : '#222'}
        />
        <Text style={state.index === 1 ? styles.active : styles.inactive}>Discover</Text>
      </TouchableOpacity>

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          console.log('Add pressed!');
          // Open modal or navigate
        }}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      {/* MyTrip */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate('MyTrip')}
      >
        <Ionicons
          name="briefcase-outline"
          size={24}
          color={state.index === 2 ? '#673ab7' : '#222'}
        />
        <Text style={state.index === 2 ? styles.active : styles.inactive}>MyTrip</Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Ionicons
          name="person-outline"
          size={24}
          color={state.index === 3 ? '#673ab7' : '#222'}
        />
        <Text style={state.index === 3 ? styles.active : styles.inactive}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="MyTrip" component={MyTripScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#f00',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 10,
  },
  active: {
    color: '#673ab7',
    fontWeight: 'bold',
    fontSize: 12,
  },
  inactive: {
    color: '#222',
    fontSize: 12,
  },
});
