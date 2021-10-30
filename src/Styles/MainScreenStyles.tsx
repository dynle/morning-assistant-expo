import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

const width=Dimensions.get("window").width

export const MainScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: width,
        // add background color
    },
    containerTop: {
        flex: 1,
        width: width,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    containerBottom: {
        flex: 5,
        width: width,
        alignItems: "center",
    },
    containerTopText: {
        fontSize: RFPercentage(6),
        // add color
    },
    dayofweekText: {
        fontSize: RFPercentage(5),
        marginTop: RFPercentage(3),
        // add color
    },
})