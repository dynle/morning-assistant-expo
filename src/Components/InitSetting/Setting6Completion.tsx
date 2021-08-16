import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import HomeScreen from "../../Screens/HomeScreen";
import { commonStyle } from "../../Styles/CommonStyles";
import { signOutUtil } from "../../Utils/AuthUtil";

export default function Setting6Completion() {
    return (
        <View style={styles.container}>
            <View style={styles.containerTop}>
                <Text style={styles.containerTopText}>
                    당신의 아침이 {"\n"} 준비 되었습니다
                </Text>
            </View>
            <View style={styles.containerBottom}>
                {/* TODO: 설정들을 FB에 올리는 버튼 */}
                <Button
                    title="확인"
                    titleStyle={{ color: "black" }}
                    buttonStyle={commonStyle.buttonStyle}
                    onPress={() => {
                        console.log("셋팅 확인");
                        // TODO: User object를 useContext에 저장해서 HomeScreen에 주는 방법
                        // <HomeScreen></HomeScreen>
                    }}
                ></Button>
                <Button title="Sign Out" onPress={signOutUtil}></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3ECD0",
        width: Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
    },
    containerTop: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    containerTopText: {
        fontSize: 40,
        textAlign: "center",
        letterSpacing: 2,
        lineHeight: 70,
    },
    containerBottom: {
        flex: 1,
    },
});
