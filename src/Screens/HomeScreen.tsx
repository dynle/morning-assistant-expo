import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions, Platform } from "react-native";
import { Button } from "react-native-elements";
import { signOutUtil } from "../Utils/AuthUtil";
import { UserType } from "../fbase";

export default function HomeScreen(props: { user: UserType }) {

    return (
        <View style={styles.container}>
            <Text style={{ color: "white" }}>Home Screen</Text>
            <Text>Hello {props.user.displayName}</Text>
            <Button title="Sign Out" onPress={signOutUtil}></Button>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DC7E47",
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
    },
});
