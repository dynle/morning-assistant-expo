import { StatusBar } from "expo-status-bar";
import React from "react";
import {
    Button,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import LoginProvider from "./src/Utils/LoginProvider";

export default function App() {
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
