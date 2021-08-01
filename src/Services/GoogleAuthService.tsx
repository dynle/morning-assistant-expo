// import Constants from 'expo-constants'; //So we can read app.json extra
import * as Google from "expo-google-app-auth"; //google auth libraries
import { authService, dbService, firebaseInstance } from "../fbase";
import { CreateDBUtil } from "../Utils/CreateDBUtil";
// import { Platform } from "react-native";

// export const isAndroid = () => Platform.OS === "android";

export default async function GoogleLogin() {
    try {
        const result = await Google.logInAsync({
            iosClientId:
                "658921868833-cvcgo0mc31kdgoij31ajuignsljdddts.apps.googleusercontent.com",
            androidClientId:
                "658921868833-p7hces6eae82gf82oajdbirv6en0946g.apps.googleusercontent.com",
            // iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
            // androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`,
            // clientId: isAndroid() ? '' : '',
        });

        if (result.type === "success") {
            // console.log(result);
            const credential =
                firebaseInstance.auth.GoogleAuthProvider.credential(
                    //Set the tokens to Firebase
                    result.idToken,
                    result.accessToken
                );
            await authService
                .signInWithCredential(credential) //Login to Firebase
                .catch((error) => {
                    console.log(error);
                });
        }
    } catch ({ message }) {
        alert("Login Error: " + message);
    }
}
