import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { signOutUtil } from "../../Utils/AuthUtil";

export default function Setting5Customizing() {
    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <View style={styles.containerTop}>
                    <Text style={styles.containerTopText}>
                        커스터마이즈 {"&"} 연동
                    </Text>
                </View>
            </View>
            <View style={styles.containerRemainer}>
                <View style={styles.containerMiddle}>
                    <Text>연동하기</Text>
                </View>
                <View style={styles.containerBottom}>
                    <Text>테마</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EDB13D",
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
    containerTop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    containerTopText: {
        fontSize: 30,
    },
    containerMiddle: {
        flex: 1,
    },
    containerBottom: {
        flex: 1,
    },
});
