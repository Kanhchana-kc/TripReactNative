import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/welcomeScreen'; // match file name case
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import TabsLayout from './app/tabs/_layout';
import TripDetail from './app/tabs/TripDetail';

// import Tabs from './(tabs)/_layout';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="tabs" component={TabsLayout} />
         <Stack.Screen name="TripDetail" component={TripDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
