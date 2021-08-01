import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { signOutUtil } from "../Utils/AuthUtil";


export default function Setting2WakeUpTime() {
    return (
        <View style={styles.container}>
            <Text style={{ color: "white" }}>Home Screen</Text>
            <Button title='Sign Out'onPress={signOutUtil}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#48473D",
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
    },
});
