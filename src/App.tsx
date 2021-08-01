import { StatusBar } from "expo-status-bar";
import React from "react";
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

function App() {
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