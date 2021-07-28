import Constants from 'expo-constants'; //So we can read app.json extra
import * as Google from 'expo-google-app-auth'; //google auth libraries
import {auth, fbase} from '../fbase'

export default async function GoogleLogin() {
    try {
      //await GoogleSignIn.askForPlayServicesAsync();
      const result = await Google.logInAsync({ //return an object with result token and user
        iosClientId: Constants.manifest!.extra!.IOS_KEY, //From app.json
        androidClientId: Constants.manifest!.extra!.ANDROIUD_KEY, //From app.json
      });
      if (result.type === 'success') {
        console.log(result);
        // setIsLoading(true);
        const credential = fbase.auth.GoogleAuthProvider.credential( //Set the tokens to Firebase
          result.idToken,
          result.accessToken
        );
        auth
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
