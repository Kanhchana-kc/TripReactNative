import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

function openCamera() {
  launchCamera({mediaType: 'photo', saveToPhotos: true}, (response) => {
    if (response.didCancel) return;
    if (response.errorCode) {
      console.log('Camera error: ', response.errorMessage);
      return;
    }
    const photoUri = response.assets[0].uri;
    // Use photoUri (upload or display)
  });
}

function openGallery() {
  launchImageLibrary({mediaType: 'photo'}, (response) => {
    if (response.didCancel) return;
    if (response.errorCode) {
      console.log('Gallery error: ', response.errorMessage);
      return;
    }
    const photoUri = response.assets[0].uri;
    // Use photoUri
  });
}
