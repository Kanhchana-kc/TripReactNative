import AsyncStorage from '@react-native-async-storage/async-storage';

const handleSubmit = async () => {
  try {
    const newTrip = {
      destination,
      start_date: startDate,
      end_date: endDate,
    };

    // Get existing trips from storage
    const existingTrips = await AsyncStorage.getItem('trips');
    const trips = existingTrips ? JSON.parse(existingTrips) : [];

    // Add new trip
    trips.push(newTrip);

    // Save back to storage
    await AsyncStorage.setItem('trips', JSON.stringify(trips));

    Alert.alert('Success', 'Trip saved locally!');
    setDestination('');
    setStartDate('');
    setEndDate('');
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Could not save trip');
  }
};
