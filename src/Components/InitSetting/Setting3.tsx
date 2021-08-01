import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { signOutUtil } from "../../Utils/AuthUtil";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from 'moment';

export default function Setting3() {
    return (
        <View style={styles.container}>
            <Text style={{ color: "white" }}>Second Component</Text>
            <Button title="Sign Out" onPress={signOutUtil}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#CBCBC5",
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
    },
});
