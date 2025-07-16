import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

async function loginWithFacebook() {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile']);
    if (result.isCancelled) {
      console.log('User cancelled login');
      return null;
    }

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      console.log('Failed to get access token');
      return null;
    }

    // Now you have the access token and can get profile info
    const userId = data.userID;
    return userId;

  } catch (error) {
    console.log('Login fail with error: ' + error);
    return null;
  }
}
