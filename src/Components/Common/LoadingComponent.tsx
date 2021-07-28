import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Loading() {
    return (
        <View style={styles.container}>
            {/* <StatusBar barStyle="dark-content"></StatusBar> */}
            {/* <Text style={styles.text}></Text> */}
            <View>
                <ActivityIndicator
                    color="#000"
                    size="large"
                ></ActivityIndicator>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    // text: {
    //     color: "#2c2c2c",
    //     fontSize: 30,
    // },
});
