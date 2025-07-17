import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsLayout from '../tabs/_layout'; // your bottom tabs
import Trips from '../tabs/Trips';
import Guides from '../tabs/Guides';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabsLayout} />
      <Stack.Screen name="Trips" component={Trips} />
      <Stack.Screen name="Guides" component={Guides} />
    </Stack.Navigator>
  );
}

