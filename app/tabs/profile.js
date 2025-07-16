import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Modal, ScrollView } from 'react-native';
import { auth } from '../../firebase';
import { Colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Guides from '../Guides';
import Trips from '../Trips';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('Trips');
  const [isSheetVisible, setSheetVisible] = useState(false);
  const navigation = useNavigation();

  const userPhotoURL = auth.currentUser?.photoURL || 'https://via.placeholder.com/80';
  const userName = auth.currentUser?.displayName || 'Your Name';
  const userHandle = auth.currentUser?.email?.split('@')[0] || 'username';

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => alert(error.message));
  };

  const handlePlanTrip = () => {
    navigation.navigate('Trips');
  };

  const handleCreateGuide = () => {
    navigation.navigate('Guides');
  };

  const handleEditProfilePicture = () => {
    setSheetVisible(true);
  };

  const closeSheet = () => {
    setSheetVisible(false);
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userPhotoURL }} style={styles.avatar} />
            <TouchableOpacity style={styles.editIcon} onPress={handleEditProfilePicture}>
              <Ionicons name="pencil" size={16} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.username}>@{userHandle}</Text>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab('Trips')}>
            <Text style={activeTab === 'Trips' ? styles.activeTab : styles.inactiveTab}>Trips</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Guides')}>
            <Text style={activeTab === 'Guides' ? styles.activeTab : styles.inactiveTab}>Guides</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {activeTab === 'Trips' && (
          <View style={styles.emptyState}>
            <Text>You haven't planned any trips yet.</Text>
            <TouchableOpacity style={styles.planTripButton} onPress={handlePlanTrip}>
              <Text style={styles.planTripText}>Start planning a trip</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'Guides' && (
          <View style={styles.emptyState}>
            <Text>You haven't created any guides yet.</Text>
            <TouchableOpacity style={styles.planTripButton} onPress={handleCreateGuide}>
              <Text style={styles.planTripText}>Create your first guide</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Sign out */}
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Sheet */}
      <Modal visible={isSheetVisible} transparent animationType="slide">
        <TouchableOpacity style={styles.sheetOverlay} activeOpacity={1} onPress={closeSheet}>
          <View style={styles.sheetContainer}>
            <Text style={styles.sheetTitle}>Change profile picture</Text>

            <TouchableOpacity style={styles.sheetButton} onPress={() => {
              // TODO: Facebook logic
              closeSheet();
            }}>
              <Text style={styles.facebookText}>Use Facebook profile picture</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sheetButton} onPress={() => {
              // TODO: Open camera
              closeSheet();
            }}>
              <Text>Take photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sheetButton} onPress={() => {
              // TODO: Open gallery
              closeSheet();
            }}>
              <Text>Choose from library</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.color02,
  },
  scrollContent: {
    alignItems: 'center',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    elevation: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  username: {
    color: '#666',
    marginBottom: 10,
  },
  stats: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  activeTab: {
    fontWeight: 'bold',
    color: '#673ab7',
    marginHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#673ab7',
  },
  inactiveTab: {
    color: '#666',
    marginHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 50,
  },
  planTripButton: {
    backgroundColor: Colors.color04,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  planTripText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
  button: {
    marginTop: 40,
    backgroundColor: Colors.color04,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.WHITE,
    fontWeight: '700',
    fontSize: 16,
  },
  sheetOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sheetContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 20,
  },
  sheetTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  sheetButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  facebookText: {
    color: '#1877F2',
    fontWeight: 'bold',
  },
});
