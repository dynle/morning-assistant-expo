import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
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

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delay_splash() {
    await SplashScreen.preventAutoHideAsync();
    await sleep(3000);
    await SplashScreen.hideAsync();
}

function App() {
    delay_splash();
    // IDEA: fade out으로 자연스럽게 넘어가도록
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <StatusBar style="light" />
                <LoginProvider></LoginProvider>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default registerRootComponent(App);
