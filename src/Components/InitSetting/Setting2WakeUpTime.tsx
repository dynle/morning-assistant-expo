import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

export default function Setting2WakeUpTime() {
    return (
        <View style={styles.container}>
            <Text style={{ color: "white" }}>Second Component</Text>
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
