// import Constants from 'expo-constants'; //So we can read app.json extra
import * as Google from 'expo-google-app-auth'; //google auth libraries
import { Platform } from 'react-native';
import {authService, firebaseInstance} from '../fbase'

export const isAndroid = () => Platform.OS === 'android';

export default async function GoogleLogin() {
    try {
      //await GoogleSignIn.askForPlayServicesAsync();
      const result = await Google.logInAsync({ //return an object with result token and user
        clientId: isAndroid() ? '658921868833-p7hces6eae82gf82oajdbirv6en0946g.apps.googleusercontent.com' : '658921868833-uvf7tembr34o3e37k04jkkctsjhpps3m.apps.googleusercontent.com',
        // iosClientId: '658921868833-uvf7tembr34o3e37k04jkkctsjhpps3m.apps.googleusercontent.com', //From app.json
        // androidClientId: '658921868833-p7hces6eae82gf82oajdbirv6en0946g.apps.googleusercontent.com', //From app.json
      });
      if (result.type === 'success') {
        console.log(result);
        // setIsLoading(true);
        const credential = firebaseInstance.auth.GoogleAuthProvider.credential( //Set the tokens to Firebase
          result.idToken,
          result.accessToken
        );
        authService
          .signInWithCredential(credential) //Login to Firebase
          .catch((error) => {
            console.log(error);
          });
      } else {
        //CANCEL
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };
