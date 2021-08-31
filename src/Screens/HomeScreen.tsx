import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions, Platform } from "react-native";
import { Button } from "react-native-elements";
import { signOutUtil } from "../Utils/AuthUtil";
import { UserType } from "../fbase";
import { SafeAreaView } from "react-native-safe-area-context";

// delete props: { user: UserType } for test
export default function HomeScreen(props: { user: UserType }) {
    console.log("homescreen")
    return (
        <SafeAreaView>
        <View style={styles.container}>
            <Text style={{ color: "white" }}>Home Screen</Text>
            <Text>Hello</Text>
            <Button title="Sign Out" onPress={signOutUtil}></Button>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222221",
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
    },
});
