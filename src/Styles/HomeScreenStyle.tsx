import React from 'react';
import { Dimensions, StyleSheet } from "react-native"
import { LinearGradient } from "expo-linear-gradient";

export const homescreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222221",
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
    },
    containerTop: {
        flex: 1,
        justifyContent: "flex-end",
    },
    containerTopText: {
        color: "#DFCA96",
        fontSize: 50,
        textAlign: "center",
        lineHeight: 60,
        marginBottom: "6%",
    },
    containerTopTextS:{
        fontSize:40
    },
    containerBottom: {
        flex: 4,
        justifyContent: "center",
    },
})

export function BackgroundCircle(){
    return(
        <LinearGradient
                colors={["#9E9884", "#222221"]}
                style={{
                    position: "absolute",
                    height: "50%",
                    width: "110%",
                    top: "-20%",
                    borderRadius: 180,
                }}
            ></LinearGradient>
    )
}