import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebase';
import { Colors } from '../constants/Colors';
const HomeScreen = () => {
  const router = useRouter();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        router.replace('/login');  // use Expo Router paths here
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.color04,
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: Colors.WHITE,
    fontWeight: '700',
    fontSize: 16,
  },
});

// import { useNavigation } from '@react-navigation/core';
// import React from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { auth } from '../../firebase';
// import { Colors } from '../../constants/Colors';

// const HomeScreen = () => {
//   const navigation = useNavigation();

//   const handleSignOut = () => {
//     auth
//       .signOut()
//       .then(() => {
//         navigation.replace('Login');
//       })
//       .catch((error) => alert(error.message));
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Email: {auth.currentUser?.email}</Text>
//       <TouchableOpacity onPress={handleSignOut} style={styles.button}>
//         <Text style={styles.buttonText}>Sign out</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: Colors.color04,
//     width: '60%',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 40,
//   },
//   buttonText: {
//     color: Colors.WHITE,
//     fontWeight: '700',
//     fontSize: 16,
//   },
// });
