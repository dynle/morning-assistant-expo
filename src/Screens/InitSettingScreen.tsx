import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import PagerView from "react-native-pager-view";
import Setting1Intro from "../Components/InitSetting/Setting1Intro";
import Setting2WakeUpTime from "../Components/InitSetting/Setting2WakeUpTime";

export default function InitSettingScreen() {
    return (
        <View style={styles.container}>
            <PagerView style={styles.viewPager} initialPage={0}>
                <View style={styles.page} key="1">
                    <Setting1Intro />
                </View>
                <View style={styles.page} key="2">
                    <Setting2WakeUpTime />
                </View>
                <View style={styles.page} key="3">
                    <Text>Third page</Text>
                </View>
            </PagerView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: "#222323" },
    viewPager: {
        flex: 1,
        // justifyContent: "center",
        width: Dimensions.get("window").width,
    },
    page: {
        justifyContent: "center",
        alignItems: "center",
    },
});
