import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { signOutUtil } from "../../Utils/AuthUtil";

export default function Setting1Intro() {
    return (
        <View style={styles.container}>
            <Text style={{ color: "white" }}>First Component</Text>
            <Button
                title="Sign Out"
                onPress={() => {
                    signOutUtil();
                    console.log("Sign Out");
                }}
            >
                Sign Out
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222323",
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
    },
});
