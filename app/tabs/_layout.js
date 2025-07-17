import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DiscoverScreen from './discover';
import MyTripScreen from './mytrip';
import ProfileScreen from './profile';
import Home from './home';
import Add from './add';

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  const currentRoute = state.routeNames[state.index];

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
          color={currentRoute === 'home' ? '#673ab7' : '#222'}
        />
        <Text style={currentRoute === 'home' ? styles.active : styles.inactive}>
          Home
        </Text>
      </TouchableOpacity>

      {/* Discover */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate('Discover')}
      >
        <Ionicons
          name="search-outline"
          size={24}
          color={currentRoute === 'Discover' ? '#673ab7' : '#222'}
        />
        <Text
          style={currentRoute === 'Discover' ? styles.active : styles.inactive}
        >
          Discover
        </Text>
      </TouchableOpacity>

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Add')} // <-- Add this screen to Tab.Navigator
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
          color={currentRoute === 'MyTrip' ? '#673ab7' : '#222'}
        />
        <Text
          style={currentRoute === 'MyTrip' ? styles.active : styles.inactive}
        >
          MyTrip
        </Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Ionicons
          name="person-outline"
          size={24}
          color={currentRoute === 'Profile' ? '#673ab7' : '#222'}
        />
        <Text
          style={currentRoute === 'Profile' ? styles.active : styles.inactive}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Add"
        component={Add}
        options={{
          headerShown: false,
          tabBarButton: () => null, // hide from tab bar
        }}
      />
      <Tab.Screen
        name="MyTrip"
        component={MyTripScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
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
