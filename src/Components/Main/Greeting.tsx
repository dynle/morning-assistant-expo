import React, { useEffect, useRef } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function Greeting() {
    return (
        <View style={styles.container}>
            <View style={styles.containerTop}>
                <Text style={styles.text}>좋은 아침입니다.</Text>
            </View>
            <View style={styles.containerBottom}>
                <Text style={styles.text}>
                    당신을 위해 준비한 {"\n"} 오늘의 아침입니다.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#343537",
        width: Dimensions.get('window').width
    },
    containerTop: {
        flex: 1,
        justifyContent:'flex-end',
        alignItems:'center',
        width: Dimensions.get('window').width
    },
    containerBottom: {
        flex: 2,
        justifyContent:'center',
        alignItems:'center',
        width: Dimensions.get('window').width,
    },
    text: {
        color: "#AEAC99",
        fontSize: RFPercentage(6),
        fontWeight: "bold",
        lineHeight:RFPercentage(10)
    },
});