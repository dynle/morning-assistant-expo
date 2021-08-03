import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Button, Divider } from "react-native-elements";
import { signOutUtil } from "../../Utils/AuthUtil";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

export default function Setting4SlideSet() {
    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <View style={styles.containerTop}>
                    <Text style={styles.containerTopText}>아침 슬라이드</Text>
                </View>
            </View>
            <View style={styles.containerRemainer}>
                <View style={styles.containerMiddle}>
                    <Button title="Sign Out" onPress={signOutUtil}></Button>
                </View>
                <View style={styles.containerBottom}>
                    <Text>추가 슬라이드</Text>
                    <Divider
                        orientation="horizontal"
                        width={2}
                        color="black"
                    ></Divider>
                </View>
            </View>
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
    containerTitle:{
        flex:1
    },
    containerRemainer:{
        flex:2
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
        flex: 2,
        justifyContent:'center',
    },
    containerBottom: {
        flex: 1,
        width: Dimensions.get("window").width,
        maxWidth: "80%",
    },
});
