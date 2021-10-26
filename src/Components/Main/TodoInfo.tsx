import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";

const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;

export default function TodoInfo() {
    return (
        <View style={styles.container}>
            <Text>TodoInfo</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: width,
        backgroundColor: "#797979",
    },
})
