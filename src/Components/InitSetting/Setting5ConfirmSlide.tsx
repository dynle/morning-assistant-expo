import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import HomeScreen from "../../Screens/HomeScreen";
import { signOutUtil } from "../../Utils/AuthUtil";

export default function Setting5ConfirmSlide() {
    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <Text style={styles.containerTitleText}>슬라이드 확인</Text>
            </View>
            <View style={styles.containerRemainer}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6EBCE",
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
    },
    containerTitle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    containerRemainer: {
        flex: 2,
    },
    containerTitleText:{
        fontSize:30,
    }
});
