import React from "react";
import { Dimensions,ActivityIndicator, StyleSheet, Text, View, Image } from "react-native";

export default function Loading() {
    return (
        <View style={styles.container}>
            {/* <StatusBar barStyle="dark-content"></StatusBar> */}
            {/* <Text style={styles.text}></Text> */}
            <View>
                {/* <Image
                    source={require("../../../assets/adaptive-icon.png")}
                    style={{width:100,height:100}}
                ></Image> */}
                <ActivityIndicator
                    color="white"
                    size="large"
                    // style={{position:'absolute'}}
                ></ActivityIndicator>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#222323",
        width:Dimensions.get("window").width
    },
    // text: {
    //     color: "white",
    //     fontSize: 30,
    // },
});
