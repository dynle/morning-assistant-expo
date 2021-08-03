import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { signOutUtil } from "../../Utils/AuthUtil";

export default function Setting6AlarmSet() {
    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <View style={styles.container1}>
                    <Text style={styles.container1Text}>알람 설정</Text>
                </View>
            </View>
            <View style={styles.containerRemainer}>
                <View style={styles.container2}>
                    <Text>언어</Text>
                </View>
                <View style={styles.container3}>
                    <Text>커스텀 알람</Text>
                </View>
                <View style={styles.container4}>
                    <Text>시작 설정</Text>
                </View>
            </View>
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
    containerTitle: {
        flex: 1,
    },
    containerRemainer: {
        flex: 2,
    },
    container1: {
        flex: 1.2,
        justifyContent: "center",
        alignItems: "center",
    },
    container1Text:{
        fontSize:30,
    },
    container2: {
        flex: 1,
    },
    container3: {
        flex: 1.5,
    },
    container4: {
        flex: 1.5,
    },
});
