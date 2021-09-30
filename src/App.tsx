import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    // Dimensions
} from "react-native";
import { registerRootComponent } from "expo";
import LoginProvider from "./Utils/LoginProvider";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { setCustomText, setCustomTextInput } from "react-native-global-props";
import Test from "./Components/Main/test";
import * as Notifications from "expo-notifications";
import {registerNotificationUtil} from './Utils/NotificationUtil'
import MainScreen from "./Screens/MainScreen";

const customTextProps = {
    style: {
        fontFamily: "Cafe24Simplehae",
    },
};

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delay_splash() {
    await SplashScreen.preventAutoHideAsync();
    await sleep(3000);
    await SplashScreen.hideAsync();
}

function App() {
    // TODO: Use createContext, useContext here to manage current user info
    ////////////////////////// initial settings//////////////////////////
    let [fontsLoaded] = Font.useFonts({
        Cafe24Simplehae: require("../assets/fonts/Cafe24Simplehae.ttf"),
    });
    
    delay_splash();
    /////////////////////////////////////////////////////////////////////
    
    //////// Determine a user enters the app by notification or not. ////////
    const [isNoti,setIsNoti] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const notiHandler = (state:boolean) => {
        setIsNoti(state)
    }
    useEffect(() => {
        registerNotificationUtil();
        Notifications.addNotificationResponseReceivedListener((response) => {
            console.log("user tapped the noti");
            setIsNoti(true);
        });
        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current!
            );
            Notifications.removeNotificationSubscription(
                responseListener.current!
            );
        };
    },[]);
    ///////////////////////////////////////////////////////////////////////////

    // IDEA: fade out으로 자연스럽게 넘어가도록
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        setCustomText(customTextProps);
        setCustomTextInput(customTextProps);
        if (isNoti){
            return (
                <MainScreen handler={notiHandler}/>
            );
        }else{
            // return <Test/>
            return (
                // originial code
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.container}>
                        <StatusBar style="light" />
                        <LoginProvider/>
                    </View>
                </TouchableWithoutFeedback>
            );
        } 
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: "center",
        justifyContent: "center",
    },
});

export default registerRootComponent(App);
