import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/welcomeScreen'; // match file name case
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import TabsLayout from './app/tabs/_layout';
import TripDetail from './app/tabs/TripDetail';
import Trips from './screens/Trips';   
import Guides from './screens/Guides';  
import Search from './screens/SearchScreen'; 

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
           <Stack.Screen name="Trips" component={Trips} />
  <Stack.Screen name="Guides" component={Guides} />
  <Stack.Screen name='Search' component={Search} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
